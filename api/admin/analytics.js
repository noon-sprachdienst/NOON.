import { getDatabase } from '../_lib/firebase.js';
import { FieldPath } from 'firebase-admin/firestore';
import { isAdminRequest, sendJson } from '../_lib/http.js';
import { DAILY_COLLECTION, META_DOC, dayKey } from '../_lib/analyticsDaily.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return sendJson(res, 405, { error: 'Method not allowed.' });
  if (!isAdminRequest(req)) return sendJson(res, 401, { error: 'Unauthorized.' });

  try {
    const days = Math.min(Math.max(Number(req.query.days) || 90, 1), 90);
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    const db = getDatabase();
    // Daily counters: at most one document read per day in the range.
    const [dailySnapshot, recentSnapshot, metaSnapshot] = await Promise.all([
      db.collection(DAILY_COLLECTION)
        .where(FieldPath.documentId(), '>=', dayKey(cutoff))
        .orderBy(FieldPath.documentId())
        .get(),
      // A small sample of raw events, only for the "recent sessions" list.
      db.collection('analyticsEvents')
        .where('createdAt', '>=', cutoff)
        .orderBy('createdAt', 'desc')
        .limit(200)
        .get(),
      db.collection(META_DOC[0]).doc(META_DOC[1]).get(),
    ]);

    const daily = dailySnapshot.docs.map((doc) => ({ day: doc.id, ...doc.data() }));
    const events = recentSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), expireAt: undefined }));
    const meta = metaSnapshot.exists ? metaSnapshot.data() : null;
    return sendJson(res, 200, { configured: true, daily, events, meta });
  } catch (error) {
    console.error('admin analytics error', error);
    return sendJson(res, 503, { error: 'Analytics service unavailable.' });
  }
}

