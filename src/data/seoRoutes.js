// Light routing helpers for the app shell (App, Nav, Footer). Same functions and results as in
// seoPages.js, but built on the small generated index, so the full page content does not end
// up in the first JavaScript file. Pages that need the content import seoPages.js themselves.
import { LANGUAGE_HOME_META, LANGUAGE_HUB_PATH, LOCATIONS, PRICE_INDEX, SEO_INDEX, SEO_LANGUAGES } from './seoIndex.generated.js';

export { LANGUAGE_HOME_META, LANGUAGE_HUB_PATH, LOCATIONS, SEO_LANGUAGES };
export const SITE_URL = 'https://www.noon-sprachdienst.de';
export const SEO_PAGES = SEO_INDEX;
export const PRICE_PAGES = PRICE_INDEX;
export const SEO_PATHS = SEO_INDEX.map((page) => page.path);

const byPath = new Map();
SEO_INDEX.forEach((page) => { if (!byPath.has(page.path)) byPath.set(page.path, page); });

export function getSeoPage(path) {
  const normalized = path.replace(/\/+$/, '') || '/';
  return byPath.get(normalized);
}

export function getPricingPage(path) {
  const normalized = path.replace(/\/+$/, '') || '/';
  return PRICE_INDEX.find((page) => page.path === normalized || (normalized === '/pricing' && page.lang === 'en'));
}

export function getPricingPathForLanguage(lang) {
  return PRICE_INDEX.find((page) => page.lang === lang)?.path || '/preise';
}

export function getCanonicalUrl(path) {
  return `${SITE_URL}${path === '/' ? '/' : `${path}/`}`;
}

export function getLanguageAlternates(page) {
  if (!page?.group) return [];
  return SEO_INDEX
    .filter((item) => item.group === page.group)
    .map((item) => ({ lang: SEO_LANGUAGES[item.lang]?.html || item.lang, href: getCanonicalUrl(item.path) }));
}

export function getSeoPathForLanguage(path, lang) {
  const page = getSeoPage(path);
  if (!page?.group) return null;
  return SEO_INDEX.find((item) => item.group === page.group && item.lang === lang)?.path || null;
}
