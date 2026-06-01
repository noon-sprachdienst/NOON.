import { getDatabase } from '../_lib/firebase.js';
import { isAdminRequest, sendJson } from '../_lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return sendJson(res, 405, { error: 'Method not allowed.' });
  if (!isAdminRequest(req)) return sendJson(res, 401, { error: 'Unauthorized.' });

  try {
    const days = Math.min(Math.max(Number(req.query.days) || 90, 1), 90);
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    const snapshot = await getDatabase()
      .collection('analyticsEvents')
      .where('createdAt', '>=', cutoff)
      .orderBy('createdAt', 'desc')
      .limit(5000)
      .get();

    const events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), expireAt: undefined }));
    return sendJson(res, 200, { configured: true, events });
  } catch (error) {
    console.error('admin analytics error', error);
    return sendJson(res, 503, { error: 'Analytics service unavailable.' });
  }
}

