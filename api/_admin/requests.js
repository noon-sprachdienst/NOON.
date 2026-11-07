import { cleanText, isAdminRequest, readJson, sendJson } from '../_lib/http.js';
import { getStore, REQUEST_DAYS, REQUESTS } from '../_lib/cmsStore.js';

// Requests page of the admin. Each entry holds only the date, the customer's name, the service
// and the file links; it is deleted after 30 days together with the files (Firestore TTL on
// expireAt, and expired entries are also removed here whenever the page is opened).
//   GET                                  → entries of the last 30 days, newest first
//   POST { id, status: 'new' | 'done' }  → change the status
//   POST { id, action: 'delete' }        → delete an entry now
export default async function handler(req, res) {
  if (!isAdminRequest(req)) return sendJson(res, 401, { error: 'Unauthorized.' });
  const store = getStore();

  try {
    if (req.method === 'GET') {
      const cutoff = Date.now() - REQUEST_DAYS * 24 * 60 * 60 * 1000;
      const [entries, expired] = await Promise.all([
        store.list(REQUESTS, { orderBy: ['createdAt', 'desc'], limit: 500 }),
        store.list(REQUESTS, { where: ['createdAt', '<', cutoff], limit: 200 }),
      ]);
      if (expired.length) await store.deleteMany(REQUESTS, expired.map((entry) => entry.id)).catch((error) => console.error('requests cleanup', error.message));
      const requests = entries
        .filter((entry) => entry.createdAt >= cutoff)
        .map(({ id, createdAt, name, service, files, attached, status }) => ({
          id, createdAt, name, service, files: files || [], attached: attached || 0, status: status === 'done' ? 'done' : 'new',
        }));
      return sendJson(res, 200, { requests, days: REQUEST_DAYS });
    }
    if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed.' });

    const body = await readJson(req);
    const id = cleanText(body.id, 60);
    if (!/^[A-Za-z0-9_-]{6,60}$/.test(id)) return sendJson(res, 400, { error: 'Invalid request id.' });
    if (body.action === 'delete') {
      await store.delete(REQUESTS, id);
      return sendJson(res, 200, { ok: true });
    }
    if (body.status === 'new' || body.status === 'done') {
      await store.update(REQUESTS, id, { status: body.status });
      return sendJson(res, 200, { ok: true });
    }
    return sendJson(res, 400, { error: 'Unknown action.' });
  } catch (error) {
    console.error('requests error', error);
    return sendJson(res, 503, { error: 'Requests unavailable.' });
  }
}
