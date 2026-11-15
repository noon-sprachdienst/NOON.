// Checks a deployed site (production or a Vercel preview). Plain ES module without Node APIs,
// so the same code runs in Node (scripts/verify-deploy.mjs) and in a browser console on a
// login-protected preview. Read-only: only GET requests, nothing is submitted.

export const CANONICAL_ORIGIN = 'https://www.noon-sprachdienst.de';

// Foreign-language city pages without an office redirect to the German city page (vercel.json).
export const OLD_CITY_PREFIXES = ['/ar/locations', '/tr/subeler', '/ru/filialy', '/fr/agences', '/uk/filiji'];

export function cityRedirectCases(cities) {
  return OLD_CITY_PREFIXES.flatMap((prefix) => cities.map((city) => ({ from: `${prefix}/${city}/`, to: `/de/standorte/${city}/` })));
}

const sitemapPaths = (xml) => [...xml.matchAll(/<loc>https?:\/\/[^/<]+([^<]*)<\/loc>/g)].map((m) => m[1]);

async function inBatches(items, size, task) {
  const results = [];
  for (let i = 0; i < items.length; i += size) results.push(...(await Promise.all(items.slice(i, i + size).map(task))));
  return results;
}

async function checkPage(base, path, fetchImpl) {
  try {
    const res = await fetchImpl(base + path);
    const html = await res.text();
    const problems = [];
    if (res.status !== 200) problems.push(`status ${res.status}`);
    if (res.redirected) problems.push(`redirects to ${new URL(res.url).pathname}`);
    if (!/<title>[^<]+<\/title>/.test(html)) problems.push('no title');
    if (/<meta name="robots" content="[^"]*noindex/.test(html)) problems.push('noindex');
    const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
    if (canonical !== CANONICAL_ORIGIN + path) problems.push(`canonical ${canonical || 'missing'}`);
    return { path, problems };
  } catch (error) {
    return { path, problems: [`request failed: ${error.message}`] };
  }
}

async function checkRedirect(base, { from, to }, fetchImpl) {
  try {
    const res = await fetchImpl(base + from);
    const landed = new URL(res.url).pathname;
    const problems = [];
    if (!res.redirected) problems.push(`no redirect (status ${res.status})`);
    if (landed !== to) problems.push(`lands on ${landed}, expected ${to}`);
    if (res.status !== 200) problems.push(`target status ${res.status}`);
    return { path: from, problems };
  } catch (error) {
    return { path: from, problems: [`request failed: ${error.message}`] };
  }
}

// expectedPaths: sitemap paths of the build being deployed (all must be live).
// redirectCases: [{ from, to }]. apiChecks: [{ path, status }] for GET endpoints.
export async function verifyDeployment({ base, expectedPaths = [], redirectCases = [], apiChecks = [], fetchImpl = fetch, concurrency = 8 }) {
  const report = { base, sitemap: 0, missingFromSitemap: [], pages: { checked: 0, failed: [] }, redirects: { checked: 0, failed: [] }, api: { checked: 0, failed: [] } };

  const sitemapRes = await fetchImpl(`${base}/sitemap.xml`);
  const live = sitemapPaths(await sitemapRes.text());
  report.sitemap = live.length;
  report.missingFromSitemap = expectedPaths.filter((path) => !live.includes(path));

  const pages = await inBatches([...new Set([...live, ...expectedPaths])], concurrency, (path) => checkPage(base, path, fetchImpl));
  report.pages.checked = pages.length;
  report.pages.failed = pages.filter((r) => r.problems.length);

  const redirects = await inBatches(redirectCases, concurrency, (c) => checkRedirect(base, c, fetchImpl));
  report.redirects.checked = redirects.length;
  report.redirects.failed = redirects.filter((r) => r.problems.length);

  const api = await inBatches(apiChecks, concurrency, async ({ path, status }) => {
    try {
      const res = await fetchImpl(base + path);
      return { path, problems: res.status === status ? [] : [`status ${res.status}, expected ${status}`] };
    } catch (error) {
      return { path, problems: [`request failed: ${error.message}`] };
    }
  });
  report.api.checked = api.length;
  report.api.failed = api.filter((r) => r.problems.length);

  report.ok = !report.missingFromSitemap.length && !report.pages.failed.length && !report.redirects.failed.length && !report.api.failed.length;
  return report;
}
