import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import {
  COMPANY,
  getCanonicalUrl,
  getOrganizationSchema,
  getPageSchema,
  getWebsiteSchema,
  LANGUAGE_HOME_META,
  PRICE_PAGES,
  SEO_PAGES,
  SEO_LANGUAGES,
  SITE_URL,
} from '../src/data/seoPages.js';
import { getServiceNavigation } from '../src/data/serviceContent.js';
import { SIMPLE_PAGE_CTA, SIMPLE_PAGE_META } from '../src/data/simplePages.js';

function isListHeadingText(text = '') {
  return /^(wir übersetzen|typische|dazu gehören|dazu gehoren|häufig|haufig|so läuft|so lauft|these|typical|we translate|nous traduisons|nous proposons|نترجم|تشمل|نموذجية|типичные|ми перекладаємо|çevirdiğimiz)/i.test(text.trim());
}

function isQuestionText(text = '') {
  return /[?؟]\s*$/.test(text.trim());
}

function getSpecialistGroups(paragraphs) {
  const segments = [];
  for (let index = 0; index < paragraphs.length; index += 1) {
    const text = paragraphs[index];
    const next = paragraphs[index + 1];
    const looksLikeHeading = isListHeadingText(text) || (text.length <= 85 && next && next.length <= 130 && !isQuestionText(text));
    if (!looksLikeHeading) continue;

    const items = [];
    for (let cursor = index + 1; cursor < paragraphs.length; cursor += 1) {
      const item = paragraphs[cursor];
      if (!item || isQuestionText(item)) break;
      if (item.length > 150) break;
      if (isListHeadingText(item) && items.length) break;
      items.push(item);
    }

    if (items.length >= 2) {
      segments.push({ title: text.replace(/:$/, ''), items: items.slice(0, 8) });
      index += items.length;
    }
  }
  return segments.slice(0, 8);
}

const SPECIALIST_HUB_LINK = {
  de: 'Alle Fachübersetzungen im Überblick',
  en: 'See all specialist translation services',
  ar: 'عرض جميع الترجمات المتخصصة',
  tr: 'Tüm uzman çevirileri görüntüle',
  ru: 'Все профильные переводы',
  fr: 'Voir toutes les traductions spécialisées',
  uk: 'Переглянути всі фахові переклади',
};

function specialistFallbackMarkup(page, activeService) {
  const paragraphs = (activeService.paragraphs || []).filter(Boolean);
  const longParagraphs = paragraphs.filter((item) => item.length > 125 && !isQuestionText(item));
  const groups = getSpecialistGroups(paragraphs);
  const questionIndex = paragraphs.findIndex(isQuestionText);
  const ctaAnswer = questionIndex >= 0 ? paragraphs[questionIndex + 1] : '';
  const ctaParagraph = questionIndex >= 0
    ? [paragraphs[questionIndex], ctaAnswer].filter(Boolean).join(' ')
    : (longParagraphs[longParagraphs.length - 1] || '');
  const intro = paragraphs[0] || page.intro;
  const competence = longParagraphs[1] && longParagraphs[1] !== intro ? longParagraphs[1] : '';
  const nationwideCandidate = [...longParagraphs].reverse().find((item) => (
    item !== intro && item !== competence && item !== ctaAnswer && item !== ctaParagraph
  ));
  const nationwide = nationwideCandidate || '';
  const servicesHref = page.lang === 'de' ? '/leistungen/' : `/${page.lang}/leistungen/`;
  const hubLinkLabel = SPECIALIST_HUB_LINK[page.lang] || SPECIALIST_HUB_LINK.de;

  const groupsHtml = groups
    .map((group) => `<section><h3>${escapeHtml(group.title)}</h3><ul>${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>`)
    .join('');

  return `<main><article>
    <p>${escapeHtml(page.eyebrow)}</p>
    <h1>${escapeHtml(page.title)}</h1>
    <p>${escapeHtml(intro)}</p>
    ${competence ? `<p>${escapeHtml(competence)}</p>` : ''}
    ${groupsHtml}
    ${nationwide ? `<p>${escapeHtml(nationwide)}</p>` : ''}
    ${ctaParagraph ? `<p>${escapeHtml(ctaParagraph)}</p>` : ''}
    <p><a href="${quoteHref(page.lang)}">${escapeHtml(page.cta || 'Kostenloses Angebot anfordern')}</a></p>
    <p><a href="${servicesHref}">${escapeHtml(hubLinkLabel)}</a></p>
  </article></main>`;
}

const distDir = join(process.cwd(), 'dist');
const template = await readFile(join(distDir, 'index.html'), 'utf8');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function setTag(html, matcher, replacement) {
  return matcher.test(html) ? html.replace(matcher, replacement) : html.replace('</head>', `  ${replacement}\n</head>`);
}

const ALL_PAGES = [...SEO_PAGES, ...PRICE_PAGES];

function localPath(lang, path) {
  return lang === 'de' ? path : `/${lang}${path}`;
}

function linkPath(path) {
  return path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`;
}

function quoteHref(lang) {
  return `${linkPath(localPath(lang, '/angebot'))}#contact`;
}

function homePath(lang) {
  return lang === 'de' ? '/' : `/${lang}/`;
}

function pageAlternates(page) {
  if (!page?.group) return [];
  return ALL_PAGES
    .filter((item) => item.group === page.group)
    .map((item) => ({ lang: SEO_LANGUAGES[item.lang]?.html || item.lang, href: getCanonicalUrl(item.path) }));
}

// x-default = the German version of the same page (not one fixed page for the whole site).
function xDefaultFor(page) {
  const german = page?.group ? ALL_PAGES.find((item) => item.group === page.group && item.lang === 'de') : null;
  return getCanonicalUrl(german?.path || page.path);
}

const FOOTER_LABELS = {
  de: { home: 'Startseite', services: 'Leistungen', interpreting: 'Dolmetschen', specialist: 'Fachübersetzungen', cities: 'Standorte', languages: 'Sprachen' },
  en: { home: 'Home', services: 'Services', interpreting: 'Interpreting', specialist: 'Specialist translations', cities: 'Locations', languages: 'Languages' },
  ar: { home: 'الرئيسية', services: 'الخدمات', interpreting: 'الترجمة الفورية', specialist: 'الترجمات المتخصصة', cities: 'الفروع', languages: 'اللغات' },
  tr: { home: 'Ana sayfa', services: 'Hizmetler', interpreting: 'Tercümanlık', specialist: 'Uzmanlık çevirileri', cities: 'Şubeler', languages: 'Diller' },
  ru: { home: 'Главная', services: 'Услуги', interpreting: 'Устный перевод', specialist: 'Специализированные переводы', cities: 'Филиалы', languages: 'Языки' },
  fr: { home: 'Accueil', services: 'Services', interpreting: 'Interprétariat', specialist: 'Traductions spécialisées', cities: 'Agences', languages: 'Langues' },
  uk: { home: 'Головна', services: 'Послуги', interpreting: 'Усний переклад', specialist: 'Фахові переклади', cities: 'Філії', languages: 'Мови' },
};

function cleanLabel(text = '') {
  return String(text).replace(/\.$/, '');
}

function linkList(items) {
  return `<ul>${items.map(({ href, label }) => `<li><a href="${linkPath(href)}">${escapeHtml(cleanLabel(label))}</a></li>`).join('')}</ul>`;
}

// Plain crawlable link block appended to every prerendered page (inside #root,
// so React replaces it on mount). Uses <footer>, never <nav>: the loader in
// index.html waits for React's <nav> before hiding.
function siteLinksMarkup(lang) {
  const labels = FOOTER_LABELS[lang] || FOOTER_LABELS.de;
  const services = SEO_PAGES.filter((item) => item.lang === lang && item.kind === 'service');
  const translation = services.filter((item) => item.serviceGroup === 'translation');
  const interpreting = services.filter((item) => item.serviceGroup === 'interpreting');
  const specialist = services.filter((item) => item.serviceGroup === 'specialist');
  const pricing = PRICE_PAGES.find((item) => item.lang === lang);
  const cities = SEO_PAGES.filter((item) => item.lang === lang && item.kind === 'location');
  const quote = SIMPLE_PAGE_META['/angebot'][lang] || SIMPLE_PAGE_META['/angebot'].de;
  const general = [
    { href: homePath(lang), label: labels.home },
    ...translation.map((item) => ({ href: item.path, label: item.title })),
    ...(pricing ? [{ href: pricing.path, label: pricing.eyebrow || pricing.title }] : []),
    { href: localPath(lang, '/leistungen'), label: labels.services },
    { href: localPath(lang, '/angebot'), label: quote.heading },
  ];
  const languages = Object.entries(SEO_LANGUAGES).map(([code, meta]) => ({ href: homePath(code), label: meta.label }));
  return `<footer>`
    + `<h2>${escapeHtml(labels.services)}</h2>${linkList(general)}`
    + `<h2>${escapeHtml(labels.interpreting)}</h2>${linkList(interpreting.map((item) => ({ href: item.path, label: item.eyebrow || item.title })))}`
    + `<h2>${escapeHtml(labels.specialist)}</h2>${linkList(specialist.map((item) => ({ href: item.path, label: item.eyebrow || item.title })))}`
    + `<h2>${escapeHtml(labels.cities)}</h2>${linkList(cities.map((item) => ({ href: item.path, label: item.location?.city || item.eyebrow })))}`
    + `<h2>${escapeHtml(labels.languages)}</h2>${linkList(languages)}`
    + `</footer>`;
}

function fillRoot(html, markup, lang) {
  return html.replace('<div id="root"></div>', `<div id="root">${markup}${siteLinksMarkup(lang)}</div>`);
}

function fallbackMarkup(page) {
  const sections = page.sections
    .map(([title, text]) => `<section><h2>${escapeHtml(title)}</h2><p>${escapeHtml(text)}</p></section>`)
    .join('');
  const faqs = page.faqs?.length
    ? `<section><h2>${page.lang === 'de' ? 'Häufige Fragen' : 'FAQ'}</h2>${page.faqs.map(([question, answer]) => `<h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p>`).join('')}</section>`
    : '';
  const branch = page.kind === 'location' && page.location?.street ? page.location : null;
  const branchInfo = branch
    ? `<p>${escapeHtml(`${COMPANY.name}, ${branch.street}, ${branch.postalCode} ${branch.city}`)} · Tel. <a href="${(branch.phone?.href) || `tel:${COMPANY.telephone}`}">${escapeHtml(branch.phone?.label || '+49 160 956 27 666')}</a></p>`
    : '';
  return `<main><article><p>${escapeHtml(page.eyebrow)}</p><h1>${escapeHtml(page.title)}</h1><p>${escapeHtml(page.intro)}</p>${branchInfo}${sections}${faqs}<p><a href="${quoteHref(page.lang)}">${escapeHtml(page.cta || 'Kostenloses Angebot anfordern')}</a></p></article></main>`;
}

function renderPage(page) {
  const canonical = getCanonicalUrl(page.path);
  const schemas = [getOrganizationSchema(), getWebsiteSchema(), ...getPageSchema(page)];
  const alternates = pageAlternates(page);
  const htmlLang = SEO_LANGUAGES[page.lang]?.html || 'de-DE';
  const htmlDir = page.lang === 'ar' ? 'rtl' : 'ltr';
  let html = template;
  html = html.replace(/<html[^>]*>/, `<html lang="${htmlLang}" dir="${htmlDir}">`);
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.metaTitle || page.title)}</title>`);
  html = setTag(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(page.description)}" />`);
  html = setTag(html, /<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="index, follow" />`);
  html = setTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`);
  html = setTag(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${canonical}" />`);
  html = setTag(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(page.metaTitle || page.title)}" />`);
  html = setTag(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeHtml(page.description)}" />`);
  html = html.replace(/\s*<link rel="alternate" hrefLang="[^"]*" href="[^"]*"\s*\/?>/g, '');
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/?>/g, '');
  html = html.replace('</head>', `${alternates.map((item) => `  <link rel="alternate" hreflang="${item.lang}" href="${item.href}" />`).join('\n')}\n  <link rel="alternate" hreflang="x-default" href="${xDefaultFor(page)}" />\n</head>`);
  html = html.replace(/\s*<!-- JSON-LD: LocalBusiness -->\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');
  html = html.replace('</head>', `${schemas.map((schema) => `  <script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('\n')}\n</head>`);
  const activeService = page.kind === 'service' && page.serviceGroup === 'specialist'
    ? getServiceNavigation(page.lang).find((item) => item.id === page.serviceNavId)
    : null;
  const markup = activeService ? specialistFallbackMarkup(page, activeService) : fallbackMarkup(page);
  html = fillRoot(html, markup, page.lang);
  return html;
}

const prerenderPages = [...SEO_PAGES];
const languageHomePages = Object.entries(SEO_LANGUAGES)
  .filter(([code]) => code !== 'de')
  .map(([code, meta]) => ({ code, path: `/${code}`, meta }));
const pricingPages = PRICE_PAGES;

const simplePages = Object.entries(SEO_LANGUAGES).flatMap(([lang]) => (
  Object.entries(SIMPLE_PAGE_META).map(([path, metaByLang]) => ({
    lang,
    path: lang === 'de' ? path : `/${lang}${path}`,
    ...(metaByLang[lang] || metaByLang.de),
  }))
));

for (const page of prerenderPages) {
  const target = join(distDir, page.path.slice(1), 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, renderPage(page), 'utf8');
}

for (const page of pricingPages) {
  const target = join(distDir, page.path.slice(1), 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, renderPage(page), 'utf8');
}

function renderSimplePage(page) {
  const canonical = getCanonicalUrl(page.path);
  const htmlLang = SEO_LANGUAGES[page.lang]?.html || 'de-DE';
  const htmlDir = page.lang === 'ar' ? 'rtl' : 'ltr';
  const basePath = page.path.replace(/^\/(de|en|ar|tr|ru|fr|uk)/, '');
  const alternates = Object.entries(SEO_LANGUAGES).map(([lang, meta]) => (
    `  <link rel="alternate" hreflang="${meta.html}" href="${getCanonicalUrl(lang === 'de' ? basePath : `/${lang}${basePath}`)}" />`
  ));
  let html = template;
  html = html.replace(/<html[^>]*>/, `<html lang="${htmlLang}" dir="${htmlDir}">`);
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = setTag(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(page.description)}" />`);
  html = setTag(html, /<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="index, follow" />`);
  html = setTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`);
  html = setTag(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${canonical}" />`);
  html = setTag(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(page.title)}" />`);
  html = setTag(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeHtml(page.description)}" />`);
  html = html.replace(/\s*<link rel="alternate" hrefLang="[^"]*" href="[^"]*"\s*\/?>/g, '');
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/?>/g, '');
  html = html.replace('</head>', `${alternates.join('\n')}\n  <link rel="alternate" hreflang="x-default" href="${getCanonicalUrl(basePath)}" />\n</head>`);
  html = fillRoot(html, `<main><article><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.text)}</p><p><a href="${quoteHref(page.lang)}">${escapeHtml(SIMPLE_PAGE_CTA[page.lang] || SIMPLE_PAGE_CTA.de)}</a></p></article></main>`, page.lang);
  return html;
}

for (const page of simplePages) {
  const target = join(distDir, page.path.slice(1), 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, renderSimplePage(page), 'utf8');
}

function languageHomeMarkup(meta, lang) {
  const services = SEO_PAGES.filter((item) => item.lang === lang && item.kind === 'service');
  const hubs = ['translation', 'specialist', 'interpreting']
    .map((group) => services.find((item) => item.serviceGroup === group && item.path.split('/').length === 3))
    .filter(Boolean);
  const pricing = PRICE_PAGES.find((item) => item.lang === lang);
  const sections = [...hubs, ...(pricing ? [pricing] : [])]
    .map((item) => `<section><h2><a href="${linkPath(item.path)}">${escapeHtml(cleanLabel(item.title))}</a></h2><p>${escapeHtml(item.description)}</p></section>`)
    .join('');
  return `<main><article><h1>${escapeHtml(meta.heading)}</h1><p>${escapeHtml(meta.description)}</p>${sections}<p><a href="${quoteHref(lang)}">${escapeHtml(meta.cta)}</a></p></article></main>`;
}

function renderLanguageHome(page) {
  const canonical = getCanonicalUrl(page.path);
  const meta = LANGUAGE_HOME_META[page.code] || LANGUAGE_HOME_META.de;
  let html = template;
  html = html.replace(/<html[^>]*>/, `<html lang="${page.meta.html}" dir="${page.code === 'ar' ? 'rtl' : 'ltr'}">`);
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  html = setTag(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(meta.description)}" />`);
  html = setTag(html, /<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="index, follow" />`);
  html = setTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`);
  html = setTag(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${canonical}" />`);
  html = setTag(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(meta.title)}" />`);
  html = setTag(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeHtml(meta.description)}" />`);
  html = html.replace(/\s*<link rel="alternate" hrefLang="[^"]*" href="[^"]*"\s*\/?>/g, '');
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/?>/g, '');
  const alternates = Object.entries(SEO_LANGUAGES).map(([code, meta]) => (
    `  <link rel="alternate" hreflang="${meta.html}" href="${getCanonicalUrl(code === 'de' ? '/' : `/${code}`)}" />`
  ));
  html = html.replace('</head>', `${alternates.join('\n')}\n  <link rel="alternate" hreflang="x-default" href="${getCanonicalUrl('/')}" />\n</head>`);
  html = fillRoot(html, languageHomeMarkup(meta, page.code), page.code);
  return html;
}

for (const page of languageHomePages) {
  const target = join(distDir, page.path.slice(1), 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, renderLanguageHome(page), 'utf8');
}

// /admin is rewritten to this untouched shell so it never shows homepage fallback text.
await writeFile(join(distDir, 'app-shell.html'), template, 'utf8');
await writeFile(join(distDir, 'index.html'), renderLanguageHome({ code: 'de', path: '/', meta: SEO_LANGUAGES.de }), 'utf8');

const sitemapPaths = ['/', ...languageHomePages.map((page) => page.path), ...simplePages.map((page) => page.path), ...pricingPages.map((page) => page.path), ...SEO_PAGES.map((page) => page.path)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPaths.map((path) => `  <url><loc>${getCanonicalUrl(path)}</loc></url>`).join('\n')}
</urlset>
`;
await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8');

let notFoundHtml = template;
notFoundHtml = notFoundHtml.replace(/<html[^>]*>/, '<html lang="de-DE" dir="ltr">');
notFoundHtml = setTag(notFoundHtml, /<title>[\s\S]*?<\/title>/, '<title>Seite nicht gefunden (404) | NOON. Sprachdienst</title>');
notFoundHtml = setTag(notFoundHtml, /<meta name="description" content="[^"]*"\s*\/?>/, '<meta name="description" content="Die angeforderte Seite existiert nicht oder wurde verschoben." />');
notFoundHtml = setTag(notFoundHtml, /<meta name="robots" content="[^"]*"\s*\/?>/, '<meta name="robots" content="noindex, follow" />');
notFoundHtml = notFoundHtml.replace(/\s*<link rel="canonical" href="[^"]*"\s*\/?>/, '');
notFoundHtml = notFoundHtml.replace('<div id="root"></div>', '<div id="root"><main><article><h1>Seite nicht gefunden</h1><p>Die angeforderte Seite existiert nicht oder wurde verschoben.</p><p><a href="/">Zur Startseite</a></p></article></main></div>');
await writeFile(join(distDir, '404.html'), notFoundHtml, 'utf8');

console.log(`Generated ${prerenderPages.length} SEO pages, ${pricingPages.length} pricing pages, ${simplePages.length} application pages, ${languageHomePages.length} language home pages, sitemap.xml, and 404.html for ${COMPANY.name}.`);
