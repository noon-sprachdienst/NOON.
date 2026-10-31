import { isAdminRequest, sendJson } from '../_lib/http.js';
import { getAccessToken, serviceAccountEmail } from '../_lib/googleAuth.js';
import { dayKey } from '../_lib/analyticsDaily.js';

// Google Search Console data for the admin dashboard (Search Analytics API, read only).
// Needs, once: the "Google Search Console API" enabled in the Google Cloud project of the
// service account, and the service account email added as a user of the Search Console
// property. Until then the endpoint answers { configured: false, reason } and the
// dashboard shows these setup steps.
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const API = 'https://www.googleapis.com/webmasters/v3/sites';
const CACHE_MS = 15 * 60 * 1000;
const cache = new Map();

function siteUrl() {
  return process.env.GSC_SITE_URL || 'sc-domain:noon-sprachdienst.de';
}

function shiftDay(key, days) {
  const date = new Date(`${key}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

async function gsc(token, path, body) {
  const response = await fetch(`${API}/${encodeURIComponent(siteUrl())}${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error?.message || `Search Console API error ${response.status}`;
    const code = /has not been used|is disabled|SERVICE_DISABLED/i.test(JSON.stringify(data)) ? 'api_disabled'
      : response.status === 403 ? 'no_access' : 'api_error';
    throw Object.assign(new Error(message), { code });
  }
  return data;
}

function query(token, startDate, endDate, dimensions = [], rowLimit = 10) {
  return gsc(token, '/searchAnalytics/query', { startDate, endDate, dimensions, rowLimit, dataState: 'all' })
    .then((data) => data.rows || []);
}

function totals(rows) {
  const row = rows[0] || {};
  return { clicks: row.clicks || 0, impressions: row.impressions || 0, ctr: row.ctr || 0, position: row.position || 0 };
}

function compact(rows, previous = []) {
  const before = new Map(previous.map((row) => [row.keys[0], row]));
  return rows.map((row) => ({
    key: row.keys[0],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
    previousPosition: before.get(row.keys[0])?.position ?? null,
  }));
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return sendJson(res, 405, { error: 'Method not allowed.' });
  if (!isAdminRequest(req)) return sendJson(res, 401, { error: 'Unauthorized.' });

  const days = Math.min(Math.max(Number(req.query.days) || 28, 1), 240);
  const cached = cache.get(days);
  if (cached && cached.at > Date.now() - CACHE_MS) return sendJson(res, 200, cached.data);

  try {
    const token = await getAccessToken(SCOPE);
    const end = shiftDay(dayKey(Date.now()), -1);
    const start = shiftDay(end, -(days - 1));
    const prevEnd = shiftDay(start, -1);
    const prevStart = shiftDay(prevEnd, -(days - 1));

    const [current, previous, series, queries, prevQueries, pages, devices, countries, sitemaps] = await Promise.all([
      query(token, start, end, [], 1),
      query(token, prevStart, prevEnd, [], 1),
      query(token, start, end, ['date'], days),
      query(token, start, end, ['query'], 25),
      query(token, prevStart, prevEnd, ['query'], 500),
      query(token, start, end, ['page'], 15),
      query(token, start, end, ['device'], 5),
      query(token, start, end, ['country'], 8),
      gsc(token, '/sitemaps').then((data) => data.sitemap || []).catch(() => []),
    ]);

    const data = {
      configured: true,
      site: siteUrl(),
      range: { start, end, prevStart, prevEnd, days },
      totals: totals(current),
      previousTotals: totals(previous),
      series: series.map((row) => ({ day: row.keys[0], clicks: row.clicks, impressions: row.impressions, position: row.position })),
      queries: compact(queries, prevQueries),
      pages: compact(pages).map((row) => ({ ...row, key: row.key.replace(/^https?:\/\/(www\.)?noon-sprachdienst\.de/, '') || '/' })),
      devices: compact(devices),
      countries: compact(countries),
      sitemaps: sitemaps.map((map) => ({
        path: map.path,
        lastDownloaded: map.lastDownloaded || null,
        errors: Number(map.errors || 0),
        warnings: Number(map.warnings || 0),
        submitted: (map.contents || []).reduce((sum, item) => sum + Number(item.submitted || 0), 0),
      })),
    };
    cache.set(days, { at: Date.now(), data });
    return sendJson(res, 200, data);
  } catch (error) {
    const reason = error.code || 'api_error';
    if (reason === 'api_error' || reason === 'token_failed') console.error('search console error', error);
    return sendJson(res, 200, { configured: false, reason, serviceAccount: serviceAccountEmail(), site: siteUrl(), message: error.message });
  }
}
