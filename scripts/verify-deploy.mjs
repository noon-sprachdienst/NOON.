// After a deployment: checks every page and redirect of the local build against a live site.
// Usage: npm run build, then: node scripts/verify-deploy.mjs [baseUrl]
// Default base is production. Exit code 1 when anything fails. Read-only (GET requests only).
import { readFile } from 'node:fs/promises';
import { CANONICAL_ORIGIN, cityRedirectCases, verifyDeployment } from './verify-deploy-core.js';

const base = (process.argv[2] || CANONICAL_ORIGIN).replace(/\/+$/, '');

const sitemap = await readFile('dist/sitemap.xml', 'utf8').catch(() => {
  console.error('dist/sitemap.xml not found: run npm run build first (same commit as the deployment).');
  process.exit(1);
});
const expectedPaths = [...sitemap.matchAll(/<loc>https?:\/\/[^/<]+([^<]*)<\/loc>/g)].map((m) => m[1]);

// Cities of the foreign-language redirect rules in vercel.json.
const vercel = await readFile('vercel.json', 'utf8');
const cities = vercel.match(/"\/ar\/locations\/:city\(([^)]+)\)/)?.[1].split('|') || [];

const report = await verifyDeployment({
  base,
  expectedPaths,
  redirectCases: cityRedirectCases(cities),
  // Admin endpoints must refuse requests without a login.
  apiChecks: [{ path: '/api/admin/analytics', status: 401 }],
});

const list = (items) => items.slice(0, 25).map((r) => `  ${r.path}: ${r.problems.join(', ')}`).join('\n') + (items.length > 25 ? `\n  … ${items.length - 25} more` : '');
console.log(`Deployment check: ${base}`);
console.log(`Sitemap: ${report.sitemap} URLs live, ${expectedPaths.length} expected, ${report.missingFromSitemap.length} missing`);
if (report.missingFromSitemap.length) console.log(list(report.missingFromSitemap.map((path) => ({ path, problems: ['not in live sitemap'] }))));
console.log(`Pages: ${report.pages.checked} checked, ${report.pages.failed.length} failed`);
if (report.pages.failed.length) console.log(list(report.pages.failed));
console.log(`Redirects: ${report.redirects.checked} checked, ${report.redirects.failed.length} failed`);
if (report.redirects.failed.length) console.log(list(report.redirects.failed));
console.log(`API: ${report.api.checked} checked, ${report.api.failed.length} failed`);
if (report.api.failed.length) console.log(list(report.api.failed));
console.log(report.ok ? 'RESULT: all checks passed' : 'RESULT: FAILED');
process.exit(report.ok ? 0 : 1);
