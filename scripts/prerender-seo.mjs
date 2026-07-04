import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import {
  COMPANY,
  getCanonicalUrl,
  getLanguageAlternates,
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
  const servicesHref = page.lang === 'de' ? '/leistungen' : `/${page.lang}/leistungen`;
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
    <p><a href="/angebot#contact">${escapeHtml(page.cta || 'Kostenloses Angebot anfordern')}</a></p>
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

function fallbackMarkup(page) {
  const sections = page.sections
    .map(([title, text]) => `<section><h2>${escapeHtml(title)}</h2><p>${escapeHtml(text)}</p></section>`)
    .join('');
  const faqs = page.faqs?.length
    ? `<section><h2>${page.lang === 'de' ? 'Häufige Fragen' : 'FAQ'}</h2>${page.faqs.map(([question, answer]) => `<h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p>`).join('')}</section>`
    : '';
  return `<main><article><p>${escapeHtml(page.eyebrow)}</p><h1>${escapeHtml(page.title)}</h1><p>${escapeHtml(page.intro)}</p>${sections}${faqs}<p><a href="/angebot#contact">${escapeHtml(page.cta || 'Kostenloses Angebot anfordern')}</a></p></article></main>`;
}

function renderPage(page) {
  const canonical = getCanonicalUrl(page.path);
  const schemas = [getOrganizationSchema(), getWebsiteSchema(), ...getPageSchema(page)];
  const alternates = getLanguageAlternates(page);
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
  html = html.replace('</head>', `${alternates.map((item) => `  <link rel="alternate" hreflang="${item.lang}" href="${item.href}" />`).join('\n')}\n  <link rel="alternate" hreflang="x-default" href="${getCanonicalUrl('/de/beglaubigte-uebersetzungen')}" />\n</head>`);
  html = html.replace(/\s*<!-- JSON-LD: LocalBusiness -->\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');
  html = html.replace('</head>', `${schemas.map((schema) => `  <script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('\n')}\n</head>`);
  const activeService = page.kind === 'service' && page.serviceGroup === 'specialist'
    ? getServiceNavigation(page.lang).find((item) => item.id === page.serviceNavId)
    : null;
  const markup = activeService ? specialistFallbackMarkup(page, activeService) : fallbackMarkup(page);
  html = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
  return html;
}

const prerenderPages = [...SEO_PAGES];
const languageHomePages = Object.entries(SEO_LANGUAGES)
  .filter(([code]) => code !== 'de')
  .map(([code, meta]) => ({ code, path: `/${code}`, meta }));
const pricingPages = PRICE_PAGES;

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

function languageHomeMarkup(meta, lang) {
  const label = lang === 'ar' ? 'الترجمات المتخصصة' : lang === 'de' ? 'Leistungen' : 'Services';
  const servicesHref = lang === 'de' ? '/leistungen' : `/${lang}/leistungen`;
  return `<main><article><h1>${escapeHtml(meta.heading)}</h1><p>${escapeHtml(meta.description)}</p><p><a href="${servicesHref}">${escapeHtml(label)}</a></p><p><a href="/angebot#contact">${escapeHtml(meta.cta)}</a></p></article></main>`;
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
  html = html.replace('<div id="root"></div>', `<div id="root">${languageHomeMarkup(meta, page.code)}</div>`);
  return html;
}

for (const page of languageHomePages) {
  const target = join(distDir, page.path.slice(1), 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, renderLanguageHome(page), 'utf8');
}

const sitemapPaths = ['/', ...languageHomePages.map((page) => page.path), ...pricingPages.map((page) => page.path), ...SEO_PAGES.map((page) => page.path)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPaths.map((path) => `  <url><loc>${getCanonicalUrl(path)}</loc></url>`).join('\n')}
</urlset>
`;
await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8');

console.log(`Generated ${prerenderPages.length} SEO pages, ${pricingPages.length} pricing pages, ${languageHomePages.length} language home pages, and sitemap.xml for ${COMPANY.name}.`);
