// Checks the admin texts (dashboard T in i18n.js, CMS CMS_T in cmsI18n.js):
// 1. No key in both: Admin.jsx merges CMS_T over T, so a shared key silently replaces the
//    dashboard text everywhere (an `errors` object once crashed the Google search tab, and
//    `contactTitle` showed the contact-card heading on the overview).
// 2. Every language has the same keys (nested too), so no admin text is missing in one language.
import { T } from '../src/pages/admin/i18n.js';
import { CMS_T } from '../src/pages/admin/cmsI18n.js';

const LANGS = ['de', 'en', 'ar'];
const problems = [];

function keysOf(value, prefix = '') {
  if (Array.isArray(value)) return [`${prefix}[${value.length}]`];
  if (!value || typeof value !== 'object') return [prefix];
  return Object.entries(value).flatMap(([key, inner]) => keysOf(inner, prefix ? `${prefix}.${key}` : key));
}

LANGS.forEach((lang) => {
  const shared = Object.keys(CMS_T[lang] || {}).filter((key) => key in (T[lang] || {}));
  if (shared.length) problems.push(`${lang}: keys in both i18n.js and cmsI18n.js (CMS replaces the dashboard text): ${shared.join(', ')}`);
});

Object.entries({ 'i18n.js T': T, 'cmsI18n.js CMS_T': CMS_T }).forEach(([name, dict]) => {
  const sets = Object.fromEntries(LANGS.map((lang) => [lang, new Set(keysOf(dict[lang] || {}))]));
  const all = new Set(LANGS.flatMap((lang) => [...sets[lang]]));
  LANGS.forEach((lang) => {
    const missing = [...all].filter((key) => !sets[lang].has(key));
    if (missing.length) problems.push(`${name} ${lang}: missing ${missing.join(', ')}`);
  });
});

if (problems.length) {
  console.error(`Admin text check failed:\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log(`Admin text check passed: no shared keys, ${LANGS.join('/')} complete in i18n.js and cmsI18n.js.`);
