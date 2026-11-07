import { sendJson } from './_lib/http.js';

// One function for the whole admin and CMS, to stay far below Vercel's limit of 12 functions
// per deployment. vercel.json rewrites /api/admin/<route> and /api/cms/<route> to
// /api/cms?r=<route>, so the old admin URLs keep working. Each route's code is loaded only
// when it is called, so a request never waits for code it does not use.
const ROUTES = {
  // admin (session cookie required inside each handler, except login/logout/status)
  login: () => import('./_admin/login.js'),
  logout: () => import('./_admin/logout.js'),
  status: () => import('./_admin/status.js'),
  analytics: () => import('./_admin/analytics.js'),
  'analytics-rebuild': () => import('./_admin/analyticsRebuild.js'),
  'search-console': () => import('./_admin/searchConsole.js'),
  'cms-form': () => import('./_admin/cmsForm.js'),
  requests: () => import('./_admin/requests.js'),
  // public
  form: () => import('./_admin/formPublic.js'),
};

function routeOf(req) {
  const fromQuery = Array.isArray(req.query?.r) ? req.query.r[0] : req.query?.r;
  if (fromQuery) return String(fromQuery);
  // Fallback when called as /api/admin/<route> or /api/cms/<route> without the rewrite parameter.
  const match = /^\/api\/(?:admin|cms)\/([a-z-]+)/.exec((req.url || '').split('?')[0]);
  return match ? match[1] : '';
}

export default async function handler(req, res) {
  const load = ROUTES[routeOf(req)];
  if (!load) return sendJson(res, 404, { error: 'Not found.' });
  const { default: route } = await load();
  return route(req, res);
}
