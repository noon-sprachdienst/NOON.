import { getDatabase } from './firebase.js';

// Small document store used by the CMS and the Requests page. In production it is Cloud
// Firestore; the local dev server (scripts/dev-api.mjs) puts an in-memory store on
// globalThis.__NOON_DEV_STORE__ with the same methods, so the handlers run unchanged.
function firestoreStore() {
  const db = getDatabase();
  const ref = (collection, id) => db.collection(collection).doc(id);
  return {
    async get(collection, id) {
      const snapshot = await ref(collection, id).get();
      return snapshot.exists ? snapshot.data() : null;
    },
    set: (collection, id, data) => ref(collection, id).set(data),
    update: (collection, id, data) => ref(collection, id).update(data),
    delete: (collection, id) => ref(collection, id).delete(),
    async add(collection, data) {
      const doc = await db.collection(collection).add(data);
      return doc.id;
    },
    // where: [field, op, value]; orderBy: [field, 'asc' | 'desc']
    async list(collection, { where, orderBy, limit = 100 } = {}) {
      let query = db.collection(collection);
      if (where) query = query.where(...where);
      if (orderBy) query = query.orderBy(orderBy[0], orderBy[1] || 'asc');
      const snapshot = await query.limit(limit).get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    async deleteMany(collection, ids) {
      for (let i = 0; i < ids.length; i += 400) {
        const batch = db.batch();
        ids.slice(i, i + 400).forEach((id) => batch.delete(ref(collection, id)));
        await batch.commit();
      }
    },
    // fn receives { get, set, delete } bound to the transaction; reads must come before writes.
    transaction(fn) {
      return db.runTransaction(async (tx) => fn({
        get: async (collection, id) => {
          const snapshot = await tx.get(ref(collection, id));
          return snapshot.exists ? snapshot.data() : null;
        },
        set: (collection, id, data) => tx.set(ref(collection, id), data),
        delete: (collection, id) => tx.delete(ref(collection, id)),
      }));
    },
  };
}

let cached;
export function getStore() {
  if (globalThis.__NOON_DEV_STORE__) return globalThis.__NOON_DEV_STORE__;
  if (!cached) cached = firestoreStore();
  return cached;
}

export const CMS = 'cms';
export const REQUESTS = 'requests';
export const REQUEST_DAYS = 30;
