import { FieldValue } from 'firebase-admin/firestore';

// One summary document per day (id "YYYY-MM-DD", Berlin time). Every event adds
// +1 to the matching counters, so the admin dashboard reads at most one small
// document per day instead of every raw event (which capped it at 5,000).
export const DAILY_COLLECTION = 'analyticsDaily';
export const META_DOC = ['analyticsMeta', 'daily'];

const berlinDay = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit',
});

export function dayKey(ms) {
  return berlinDay.format(new Date(ms));
}

function mapKey(value, fallback) {
  const key = String(value || '').slice(0, 120).replace(/^__|__$/g, '_');
  return key || fallback;
}

// Plain-number delta for one event; used live (as increments) and for rebuilds.
export function dailyDelta(record) {
  if (record.type === 'page_view') {
    const delta = {
      pageViews: 1,
      byDevice: { [mapKey(record.device, 'desktop')]: 1 },
      byPath: { [mapKey(record.path, '/')]: 1 },
      byReferrer: { [mapKey(record.referrer, 'direct')]: 1 },
      byLanguage: { [mapKey((record.siteLanguage || record.browserLanguage || 'de').slice(0, 2).toUpperCase(), 'DE')]: 1 },
      byCountry: { [mapKey(record.country, 'XX')]: 1 },
      byBrowser: { [mapKey(record.browser, 'Unknown')]: 1 },
    };
    if (record.city) delta.byCity = { [mapKey(record.city, 'Unknown')]: 1 };
    return delta;
  }
  if (record.type === 'page_leave' && record.durationSeconds > 0) {
    return { durationSum: record.durationSeconds, durationCount: 1 };
  }
  if (record.type === 'cta_click') {
    return { ctaClicks: 1, byAction: { [mapKey(record.action, 'other')]: 1 } };
  }
  return null;
}

export function toIncrements(delta) {
  return Object.fromEntries(Object.entries(delta).map(([key, value]) => (
    [key, typeof value === 'number' ? FieldValue.increment(value) : toIncrements(value)]
  )));
}

export function mergeInto(target, delta) {
  Object.entries(delta).forEach(([key, value]) => {
    if (typeof value === 'number') target[key] = (target[key] || 0) + value;
    else mergeInto(target[key] || (target[key] = {}), value);
  });
  return target;
}

export async function recordDaily(db, record) {
  const delta = dailyDelta(record);
  if (!delta) return;
  await db.collection(DAILY_COLLECTION).doc(dayKey(record.createdAt)).set(
    { ...toIncrements(delta), updatedAt: record.createdAt },
    { merge: true },
  );
}
