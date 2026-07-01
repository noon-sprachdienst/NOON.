import { createServer } from 'vite';

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

const REQUIRED = ['en', 'ar', 'tr', 'ru', 'fr', 'uk'];

try {
  const mod = await server.ssrLoadModule('/src/content/services/sheets.jsx');
  const map = mod.SERVICE_SHEET_TEXT_TRANSLATIONS;
  const keys = Object.keys(map);

  let incomplete = 0;
  for (const key of keys) {
    const entry = map[key];
    const missing = REQUIRED.filter((l) => !entry[l] || !String(entry[l]).trim());
    if (missing.length) {
      incomplete += 1;
      console.log(`MISSING [${missing.join(',')}]  «${key.length > 70 ? key.slice(0, 67) + '...' : key}»`);
    }
  }

  console.log(`\nTotal keys: ${keys.length}`);
  console.log(`Incomplete keys (missing at least one of ${REQUIRED.join('/')}): ${incomplete}`);
} finally {
  await server.close();
}
