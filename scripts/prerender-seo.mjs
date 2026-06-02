import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import {
  COMPANY,
  getCanonicalUrl,
  getOrganizationSchema,
  getPageSchema,
  getWebsiteSchema,
  PRICE_PAGE,
  SEO_PAGES,
  SITE_URL,
} from '../src/data/seoPages.js';

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
  return `<main><article><p>${escapeHtml(page.eyebrow)}</p><h1>${escapeHtml(page.title)}</h1><p>${escapeHtml(page.intro)}</p>${sections}<p><a href="/#contact">Kostenloses Angebot anfordern</a></p></article></main>`;
}

function renderPage(page) {
  const canonical = getCanonicalUrl(page.path);
  const schemas = [getOrganizationSchema(), getWebsiteSchema(), ...getPageSchema(page)];
  let html = template;
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = setTag(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(page.description)}" />`);
  html = setTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`);
  html = setTag(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${canonical}" />`);
  html = setTag(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(page.title)}" />`);
  html = setTag(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeHtml(page.description)}" />`);
  html = html.replace(/\s*<!-- JSON-LD: LocalBusiness -->\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');
  html = html.replace('</head>', `${schemas.map((schema) => `  <script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('\n')}\n</head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${fallbackMarkup(page)}</div>`);
  return html;
}

const prerenderPages = [...SEO_PAGES, PRICE_PAGE];

for (const page of prerenderPages) {
  const target = join(distDir, page.path.slice(1), 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, renderPage(page), 'utf8');
}

const sitemapPaths = ['/', '/preise', ...SEO_PAGES.map((page) => page.path)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPaths.map((path) => `  <url><loc>${getCanonicalUrl(path)}</loc></url>`).join('\n')}
</urlset>
`;
await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8');

console.log(`Generated ${prerenderPages.length} SEO pages and sitemap.xml for ${COMPANY.name}.`);
