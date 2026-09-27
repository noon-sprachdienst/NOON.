import { getDatabase } from '../_lib/firebase.js';
import { isAdminRequest, sendJson } from '../_lib/http.js';
import { DAILY_COLLECTION, META_DOC, dailyDelta, dayKey, mergeInto } from '../_lib/analyticsDaily.js';

// One-time (repeatable) rebuild of the daily counters from the raw events that
// are still stored (raw events expire after 90 days). Reads every raw event of
// the last 90 days once, so it should only be run after deploying the counters.
const PAGE_SIZE = 1000;

export default async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed.' });
  if (!isAdminRequest(req)) return sendJson(res, 401, { error: 'Unauthorized.' });

  try {
    const db = getDatabase();
    const cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000;
    const days = {};
    let processed = 0;
    let last = null;

    for (;;) {
      let query = db.collection('analyticsEvents')
        .where('createdAt', '>=', cutoff)
        .orderBy('createdAt')
        .limit(PAGE_SIZE);
      if (last) query = query.startAfter(last);
      const snapshot = await query.get();
      if (snapshot.empty) break;

      snapshot.docs.forEach((doc) => {
        const event = doc.data();
        const delta = dailyDelta(event);
        if (delta) mergeInto(days[dayKey(event.createdAt)] || (days[dayKey(event.createdAt)] = {}), delta);
      });
      processed += snapshot.size;
      last = snapshot.docs[snapshot.docs.length - 1];
      if (snapshot.size < PAGE_SIZE) break;
    }

    const now = Date.now();
    const batch = db.batch();
    Object.entries(days).forEach(([key, counters]) => {
      batch.set(db.collection(DAILY_COLLECTION).doc(key), { ...counters, updatedAt: now, rebuiltAt: now });
    });
    batch.set(db.collection(META_DOC[0]).doc(META_DOC[1]), { rebuiltAt: now, rebuiltEvents: processed });
    await batch.commit();

    return sendJson(res, 200, { ok: true, events: processed, days: Object.keys(days).length });
  } catch (error) {
    console.error('analytics rebuild error', error);
    return sendJson(res, 503, { error: 'Rebuild failed.' });
  }
}
