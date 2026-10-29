// Quality gate for the landing pages (plan v4): no duplicate URLs, titles, descriptions
// or H1s, no near-duplicate text, enough words, valid internal links, every page linked
// from somewhere, and no clash with redirects. Usage: node scripts/audit-landing-pages.mjs
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { SEO_PAGES, PRICE_PAGES } from '../src/data/seoPages.js';
import { LANDING_PAGES } from '../src/data/landing/index.js';
import { NEW_LANGUAGE_PATHS } from '../src/data/languagePages.js';

const root = process.cwd();
const failures = [];
const warnings = [];
const fail = (msg) => failures.push(msg);

const NEW = new Set([...LANDING_PAGES.map((page) => page.path), ...NEW_LANGUAGE_PATHS]);
const pages = [...SEO_PAGES, ...PRICE_PAGES];
const newPages = SEO_PAGES.filter((page) => NEW.has(page.path));
const norm = (href) => (href.split('#')[0].replace(/\/+$/, '') || '/');

// 1. Unique path, title tag, description and H1 across the whole German site.
for (const [field, label] of [['path', 'URL'], ['metaTitle', 'Title'], ['description', 'Meta-Description'], ['title', 'H1']]) {
  const seen = new Map();
  for (const page of pages.filter((item) => item.lang === 'de')) {
    const key = String(page[field] || '').trim().toLowerCase();
    if (!key) continue;
    if (seen.has(key) && (NEW.has(page.path) || NEW.has(seen.get(key)))) fail(`Doppelter ${label}: ${page.path} = ${seen.get(key)}`);
    seen.set(key, page.path);
  }
}

// 2. Lengths and word counts.
const text = (page) => [page.intro, ...(page.sections || []).map(([h, t]) => `${h} ${t}`), ...(page.faqs || []).map(([q, a]) => `${q} ${a}`)].join(' ');
const words = (value) => value.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean);
for (const page of newPages) {
  if (page.metaTitle.length > 65) fail(`Title zu lang (${page.metaTitle.length}): ${page.path}`);
  if (page.description.length > 160) fail(`Description zu lang (${page.description.length}): ${page.path}`);
  if (page.description.length < 80) warnings.push(`Description kurz (${page.description.length}): ${page.path}`);
  const count = words(text(page)).length;
  page._words = count;
  if (count < 400) fail(`Zu wenig Text (${count} Wörter): ${page.path}`);
}

// 3. Near-duplicate text: Jaccard similarity of 5-word shingles against every German page.
const shingles = (value) => {
  const w = words(value);
  const set = new Set();
  for (let i = 0; i + 5 <= w.length; i += 1) set.add(w.slice(i, i + 5).join(' '));
  return set;
};
const deSets = pages.filter((p) => p.lang === 'de' && p.intro).map((p) => [p.path, shingles(text(p))]);
const similarity = (a, b) => {
  let inter = 0;
  for (const s of a) if (b.has(s)) inter += 1;
  return inter / (a.size + b.size - inter || 1);
};
// Language pages share a fixed template (delivery, steps, offices) with the live language
// pages, which already overlap up to ~41 % with each other; they get a 40 % limit.
const LIMIT = 0.3;
const LANGUAGE_LIMIT = 0.4;
for (const page of newPages) {
  const own = shingles(text(page));
  let best = [0, ''];
  for (const [path, set] of deSets) {
    if (path === page.path) continue;
    const value = similarity(own, set);
    if (value > best[0]) best = [value, path];
  }
  page._sim = best;
  if (best[0] > (page.serviceGroup === 'language' ? LANGUAGE_LIMIT : LIMIT)) fail(`Zu ähnlich (${(best[0] * 100).toFixed(0)} %): ${page.path} ~ ${best[1]}`);
}

// 4. Internal links of new pages must exist; every new page needs at least one inbound link.
const known = new Set([...pages.map((p) => p.path), '/', '/angebot', '/termin', '/leistungen', '/fachuebersetzungen', '/preise']);
const inbound = new Map([...NEW].map((path) => [path, 0]));
for (const page of SEO_PAGES) {
  for (const section of page.sections || []) {
    for (const link of section[2] || []) {
      const target = norm(link.href);
      if (NEW.has(page.path) && !known.has(target)) fail(`Toter interner Link ${link.href} auf ${page.path}`);
      if (inbound.has(target) && target !== page.path) inbound.set(target, inbound.get(target) + 1);
    }
  }
}
for (const [path, count] of inbound) if (!count) fail(`Keine eingehenden Links: ${path}`);

// 5. No new URL may be a redirect source.
const vercel = JSON.parse(await readFile(join(root, 'vercel.json'), 'utf8'));
for (const rule of vercel.redirects || []) {
  const source = rule.source.replace('(/)?', '');
  if (NEW.has(source)) fail(`URL ist Weiterleitungsquelle in vercel.json: ${source}`);
}

console.log(`Neue Seiten: ${newPages.length}`);
for (const page of newPages) {
  console.log(`  ${String(page._words).padStart(4)} Wörter · max. Ähnlichkeit ${(page._sim[0] * 100).toFixed(0).padStart(2)} % · ${page.path}/`);
}
warnings.forEach((w) => console.log(`Hinweis: ${w}`));
if (failures.length) {
  console.error(`\nLanding-Audit fehlgeschlagen (${failures.length}):`);
  failures.forEach((f) => console.error(`- ${f}`));
  process.exit(1);
}
console.log('\nLanding-Audit bestanden: keine doppelten URLs/Titel/Descriptions/H1, keine Beinahe-Duplikate, alle Links gültig, alle Seiten verlinkt.');
