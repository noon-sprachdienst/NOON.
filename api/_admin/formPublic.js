import { CMS, getStore } from '../_lib/cmsStore.js';

// Published quote-form settings for visitors. Answered from the Vercel edge cache: the
// function (and the database) runs at most about once a minute, whatever the traffic.
// Browsers always revalidate (so a publish shows on the next page load); only the Vercel edge
// keeps a copy, via the CDN-only cache headers that Vercel strips before the response leaves it.
function send(res, status, body, edgeCache) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  if (edgeCache) {
    res.setHeader('Vercel-CDN-Cache-Control', edgeCache);
    res.setHeader('CDN-Cache-Control', edgeCache);
  }
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return send(res, 405, { error: 'Method not allowed.' }, '');
  try {
    const published = await getStore().get(CMS, 'form');
    return send(res, 200, { config: published?.config || null, rev: published?.rev || 0 }, 'max-age=60, stale-while-revalidate=600');
  } catch (error) {
    console.error('form settings error', error.message);
    // The site falls back to the built-in form; try again soon.
    return send(res, 200, { config: null, rev: 0 }, 'max-age=15');
  }
}
