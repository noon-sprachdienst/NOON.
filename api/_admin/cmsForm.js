import { isAdminRequest, readJson, sendJson } from '../_lib/http.js';
import { CMS, getStore } from '../_lib/cmsStore.js';
import { LIMITS, sanitizeFormConfig } from '../../src/data/formSchema.js';

// Admin editor of the quote form.
//   GET                          → published settings, saved draft, list of earlier versions
//   POST { action: 'save', config, draftRev }          → save a draft
//   POST { action: 'publish', config, publishedRev }   → publish (goes live within about a minute)
//   POST { action: 'discard' }                        → delete the draft
//   POST { action: 'version', rev }                    → settings of an earlier version
// draftRev / publishedRev are the revisions the editor started from. If someone else saved
// or published in the meantime the request is refused with 409 instead of overwriting.
const PUBLISHED = 'form';
const DRAFT = 'form-draft';
const HISTORY = 'form-history';

function conflict(message) {
  return Object.assign(new Error(message), { statusCode: 409 });
}

export default async function handler(req, res) {
  if (!isAdminRequest(req)) return sendJson(res, 401, { error: 'Unauthorized.' });
  const store = getStore();

  try {
    if (req.method === 'GET') {
      const [published, draft, history] = await Promise.all([
        store.get(CMS, PUBLISHED), store.get(CMS, DRAFT), store.get(CMS, HISTORY),
      ]);
      return sendJson(res, 200, {
        published: published || null,
        draft: draft || null,
        history: (history?.versions || []).map(({ rev, publishedAt }) => ({ rev, publishedAt })),
      });
    }
    if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed.' });

    const body = await readJson(req);
    const now = Date.now();

    if (body.action === 'save') {
      const config = sanitizeFormConfig(body.config);
      const saved = await store.transaction(async (tx) => {
        const draft = await tx.get(CMS, DRAFT);
        if ((draft?.rev || 0) !== (Number(body.draftRev) || 0)) throw conflict('The draft was changed in another window.');
        const next = { config, rev: (draft?.rev || 0) + 1, savedAt: now };
        tx.set(CMS, DRAFT, next);
        return next;
      });
      return sendJson(res, 200, { ok: true, draft: saved });
    }

    if (body.action === 'publish') {
      const config = sanitizeFormConfig(body.config);
      const result = await store.transaction(async (tx) => {
        const [published, history] = [await tx.get(CMS, PUBLISHED), await tx.get(CMS, HISTORY)];
        if ((published?.rev || 0) !== (Number(body.publishedRev) || 0)) throw conflict('The form was published in another window.');
        const next = { config, rev: (published?.rev || 0) + 1, publishedAt: now };
        const versions = [next, ...(history?.versions || [])].slice(0, LIMITS.versions);
        tx.set(CMS, PUBLISHED, next);
        tx.set(CMS, HISTORY, { versions });
        tx.delete(CMS, DRAFT);
        return { published: next, history: versions.map(({ rev, publishedAt }) => ({ rev, publishedAt })) };
      });
      return sendJson(res, 200, { ok: true, ...result });
    }

    if (body.action === 'discard') {
      await store.delete(CMS, DRAFT);
      return sendJson(res, 200, { ok: true });
    }

    if (body.action === 'version') {
      const history = await store.get(CMS, HISTORY);
      const version = (history?.versions || []).find((item) => item.rev === Number(body.rev));
      if (!version) return sendJson(res, 404, { error: 'Version not found.' });
      return sendJson(res, 200, { ok: true, version });
    }

    return sendJson(res, 400, { error: 'Unknown action.' });
  } catch (error) {
    if (error.statusCode === 400 || error.statusCode === 409) return sendJson(res, error.statusCode, { error: error.message });
    console.error('cms form error', error);
    return sendJson(res, 503, { error: 'Form settings unavailable.' });
  }
}
