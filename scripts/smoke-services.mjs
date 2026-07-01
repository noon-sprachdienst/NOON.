import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';

const langs = ['de', 'en', 'ar', 'tr', 'ru', 'fr', 'uk'];

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

let failures = 0;

try {
  const { I18nProvider } = await server.ssrLoadModule('/src/hooks/useI18n.jsx');
  const { default: Services } = await server.ssrLoadModule('/src/components/Services.jsx');
  const { getServiceNavigation } = await server.ssrLoadModule('/src/data/serviceContent.js');

  for (const lang of langs) {
    globalThis.localStorage = {
      getItem: () => lang,
      setItem: () => {},
      removeItem: () => {},
    };

    const ids = ['fachuebersetzung-overview', ...getServiceNavigation(lang).map((item) => item.id)];

    for (const id of ids) {
      try {
        renderToString(
          React.createElement(
            I18nProvider,
            null,
            React.createElement(Services, { initialActiveId: id }),
          ),
        );
      } catch (error) {
        failures += 1;
        console.error(`FAIL ${lang} ${id}: ${error?.message || error}`);
      }
    }
  }
} finally {
  await server.close();
}

if (failures > 0) {
  console.error(`Service smoke test failed: ${failures} render error(s).`);
  process.exit(1);
}

console.log('Service smoke test passed for all languages and service points.');

