import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';

const langs = ['de', 'en', 'ar', 'tr', 'ru', 'fr', 'uk'];
const targetLangs = langs.filter((l) => l !== 'de');

// Strings that are allowed to be identical to German (brands, acronyms, cities, etc.)
const WHITELIST = new Set([
  'NOON', 'NOON. Sprachdienst', 'ISO 17100', 'ISO', 'PDF', 'XML', 'JSON', 'API',
  'CAD/CAM', 'CAD', 'CAM', 'DevOps', 'DSGVO', 'GDPR', 'WhatsApp', 'E-Mail', 'FAQ',
  'CAT', 'SDL Trados', 'memoQ', 'i', '✓', 'UI', 'UX', 'SEO', 'HTML', 'CSS', 'SDK',
  'Osnabrück', 'Stuttgart', 'Berlin', 'Bielefeld', 'Mainz', 'Kiel', 'Deutschland',
  '190+', '24/7', 'Trados', 'App', 'Apps', 'Software', 'IT', 'IT & Software',
]);

const CITY_RE = /^(Osnabrück|Stuttgart|Berlin|Bielefeld|Mainz|Kiel)/;

function ignorable(text) {
  const t = text.trim();
  if (t.length < 4) return true;
  if (WHITELIST.has(t)) return true;
  if (/^[\d\s+.,%–—-]+$/.test(t)) return true;         // numbers / symbols only
  if (/^\d+\+?\s/.test(t) && /Sprachen|languages/i.test(t) === false && t.length < 10) return true;
  if (CITY_RE.test(t) && t.length < 20) return true;
  return false;
}

function extractStrings(html) {
  const out = [];
  const re = />([^<>]+)</g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const text = m[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
    if (text) out.push(text);
  }
  return out;
}

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

const report = {};

try {
  const { I18nProvider } = await server.ssrLoadModule('/src/hooks/useI18n.jsx');
  const { default: Services } = await server.ssrLoadModule('/src/components/Services.jsx');
  const { getServiceNavigation } = await server.ssrLoadModule('/src/data/serviceContent.js');

  const renderService = (lang, id) => {
    globalThis.localStorage = { getItem: () => lang, setItem: () => {}, removeItem: () => {} };
    return renderToString(
      React.createElement(I18nProvider, null, React.createElement(Services, { initialActiveId: id })),
    );
  };

  // Build the German string sets per service id.
  const ids = ['fachuebersetzung-overview', ...getServiceNavigation('de').map((i) => i.id)];
  const germanByService = {};
  for (const id of ids) {
    germanByService[id] = new Set(extractStrings(renderService('de', id)));
  }

  let totalLeaks = 0;
  for (const lang of targetLangs) {
    report[lang] = {};
    for (const id of ids) {
      const strings = extractStrings(renderService(lang, id));
      const leaks = [...new Set(strings)].filter(
        (s) => germanByService[id].has(s) && !ignorable(s),
      );
      if (leaks.length) {
        report[lang][id] = leaks;
        totalLeaks += leaks.length;
      }
    }
  }

  for (const lang of targetLangs) {
    const services = Object.keys(report[lang]);
    if (!services.length) {
      console.log(`\n=== ${lang.toUpperCase()} : clean ===`);
      continue;
    }
    console.log(`\n=== ${lang.toUpperCase()} : ${services.length} service(s) with German leaks ===`);
    for (const id of services) {
      console.log(`  [${id}] ${report[lang][id].length} leak(s):`);
      for (const leak of report[lang][id]) {
        console.log(`     • ${leak.length > 120 ? leak.slice(0, 117) + '...' : leak}`);
      }
    }
  }

  console.log(`\nTOTAL leaked German strings across non-German languages: ${totalLeaks}`);
} finally {
  await server.close();
}
