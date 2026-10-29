// Final review of the built site (dist/): crawls every generated HTML page and checks
// titles, descriptions, H1, canonical, robots, hreflang targets, JSON-LD and internal
// links. Usage: npm run build && node scripts/review-built-site.mjs
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const site = 'https://www.noon-sprachdienst.de';
const vercel = JSON.parse(await readFile(join(root, 'vercel.json'), 'utf8'));
const redirectSources = new Set((vercel.redirects || []).map((r) => r.source.replace('(/)?', '').replace(/\/$/, '')));

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await htmlFiles(full));
    else if (entry.name === 'index.html') out.push(full);
  }
  return out;
}

const pathOf = (file) => {
  const rel = relative(dist, file).split(sep).slice(0, -1).join('/');
  return rel ? `/${rel}` : '/';
};
const exists = (path) => {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  if (clean === '/') return true;
  if (redirectSources.has(clean)) return true;
  if (/\.[a-z0-9]{2,5}$/i.test(clean)) return existsSync(join(dist, clean.slice(1)));
  return existsSync(join(dist, clean.slice(1), 'index.html'));
};

const issues = [];
const titles = new Map();
const descriptions = new Map();
const files = await htmlFiles(dist);
let links = 0;

for (const file of files) {
  const path = pathOf(file);
  const html = await readFile(file, 'utf8');
  const noindex = /<meta name="robots" content="noindex/.test(html);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const description = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  const add = (msg) => issues.push(`${path}/: ${msg}`);

  if (!title) add('kein <title>');
  else if (title.length > 70) add(`Title ${title.length} Zeichen`);
  if (!description) add('keine Meta-Description');
  else if (description.length > 165) add(`Description ${description.length} Zeichen`);
  if (!noindex) {
    if (h1s !== 1) add(`${h1s} H1-Überschriften im statischen HTML`);
    if (title) titles.set(title, [...(titles.get(title) || []), path]);
    if (description) descriptions.set(description, [...(descriptions.get(description) || []), path]);
    const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
    if (!canonical) add('kein Canonical');
    else if (path !== '/' && canonical !== `${site}${path}/`) add(`Canonical zeigt auf ${canonical}`);
  }
  for (const [, href] of html.matchAll(/hreflang="[^"]*" href="([^"]*)"/g)) {
    if (!exists(new URL(href).pathname)) add(`hreflang-Ziel fehlt: ${href}`);
  }
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(json); } catch { add('ungültiges JSON-LD'); }
  }
  for (const [, href] of html.matchAll(/<a [^>]*href="(\/[^"#]*)[^"]*"/g)) {
    links += 1;
    if (!exists(href)) add(`toter Link ${href}`);
  }
}

for (const [value, paths] of titles) if (paths.length > 1) issues.push(`Doppelter Title „${value}“: ${paths.join(', ')}`);
for (const [value, paths] of descriptions) if (paths.length > 1) issues.push(`Doppelte Description: ${paths.join(', ')}`);

console.log(`Geprüft: ${files.length} HTML-Seiten, ${links} interne Links.`);
if (issues.length) {
  console.log(`\n${issues.length} Auffälligkeiten:`);
  issues.forEach((issue) => console.log(`- ${issue}`));
} else {
  console.log('Keine Auffälligkeiten.');
}
