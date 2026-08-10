import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const distDir = join(root, 'dist');
const siteUrl = 'https://www.noon-sprachdienst.de';
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

const sitemap = await readFile(join(distDir, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapSet = new Set(sitemapUrls);
check(sitemapUrls.length > 0, 'Sitemap contains no URLs.');
check(sitemapUrls.length === sitemapSet.size, 'Sitemap contains duplicate URLs.');

for (const url of sitemapUrls) {
  check(url.startsWith(`${siteUrl}/`) || url === `${siteUrl}/`, `Sitemap URL uses an unexpected host: ${url}`);
  const pathname = new URL(url).pathname;
  const file = pathname === '/' ? join(distDir, 'index.html') : join(distDir, pathname.slice(1), 'index.html');
  check(await exists(file), `Sitemap URL has no generated static page: ${pathname}`);
  if (!(await exists(file))) continue;
  const html = await readFile(file, 'utf8');
  check(/<meta name="robots" content="index, follow"\s*\/>/.test(html), `Indexable robots tag missing: ${pathname}`);
  check(html.includes(`<link rel="canonical" href="${url}" />`), `Canonical is not self-referencing: ${pathname}`);
  check(!/<meta name="robots" content="noindex/.test(html), `Sitemap page is marked noindex: ${pathname}`);
}

const config = JSON.parse(await readFile(join(root, 'vercel.json'), 'utf8'));
const rewrites = config.rewrites || [];
check(!rewrites.some((rule) => rule.source === '/(.*)' && rule.destination === '/index.html'), 'Catch-all rewrite still makes unknown URLs return 200.');
check(await exists(join(distDir, '404.html')), 'dist/404.html was not generated.');
if (await exists(join(distDir, '404.html'))) {
  const notFound = await readFile(join(distDir, '404.html'), 'utf8');
  check(/<meta name="robots" content="noindex, follow"\s*\/>/.test(notFound), '404 page is not noindex.');
  check(!/<link rel="canonical"/.test(notFound), '404 page must not declare a canonical URL.');
}

for (const redirect of config.redirects || []) {
  const sourcePath = redirect.source.replace('(/)?', '');
  check(!sitemapUrls.some((url) => new URL(url).pathname === sourcePath), `Redirect source appears in sitemap: ${redirect.source}`);
  check(!redirect.destination.startsWith('http://'), `Redirect is not HTTPS: ${redirect.source}`);
  const destinationPath = new URL(redirect.destination, siteUrl).pathname;
  const destinationFile = destinationPath === '/' ? join(distDir, 'index.html') : join(distDir, destinationPath.slice(1), 'index.html');
  check(await exists(destinationFile), `Redirect destination has no static page: ${redirect.destination}`);
  check(!(config.redirects || []).some((rule) => rule.source.replace('(/)?', '') === destinationPath), `Redirect chain detected: ${redirect.source} -> ${redirect.destination}`);
}

if (failures.length) {
  console.error(`SEO audit failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`SEO audit passed: ${sitemapUrls.length} sitemap URLs have static indexable HTML, redirects are excluded from the sitemap, and the 404 page is present and noindex.`);
