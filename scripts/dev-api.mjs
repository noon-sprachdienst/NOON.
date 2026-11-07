// Local stand-in for the Vercel functions, used only by `npm run dev` (Vite dev server).
// It runs the real handlers in api/ with the same URL rewrites as vercel.json, an in-memory
// database (saved to node_modules/.cache so it survives restarts) instead of Firestore, and
// prints e-mails instead of sending them. Admin password in dev: "dev" (or ADMIN_PASSWORD).
import fs from 'node:fs';
import path from 'node:path';

function createMemoryStore(file) {
  let data = {};
  try { data = JSON.parse(fs.readFileSync(file, 'utf8')); } catch { /* first start */ }
  const save = () => {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 1));
  };
  const col = (name) => (data[name] || (data[name] = {}));
  const clone = (value) => (value == null ? null : JSON.parse(JSON.stringify(value)));
  const compare = { '<': (a, b) => a < b, '<=': (a, b) => a <= b, '>': (a, b) => a > b, '>=': (a, b) => a >= b, '==': (a, b) => a === b };
  const store = {
    async get(collection, id) { return clone(col(collection)[id]); },
    async set(collection, id, value) { col(collection)[id] = clone(value); save(); },
    async update(collection, id, value) {
      if (!col(collection)[id]) throw new Error('No document to update.');
      Object.assign(col(collection)[id], clone(value)); save();
    },
    async delete(collection, id) { delete col(collection)[id]; save(); },
    async add(collection, value) {
      const id = Math.random().toString(36).slice(2, 12) + Date.now().toString(36);
      col(collection)[id] = clone(value); save();
      return id;
    },
    async list(collection, { where, orderBy, limit = 100 } = {}) {
      let rows = Object.entries(col(collection)).map(([id, value]) => ({ id, ...clone(value) }));
      if (where) rows = rows.filter((row) => compare[where[1]](row[where[0]], where[2]));
      if (orderBy) rows.sort((a, b) => (a[orderBy[0]] > b[orderBy[0]] ? 1 : -1) * (orderBy[1] === 'desc' ? -1 : 1));
      return rows.slice(0, limit);
    },
    async deleteMany(collection, ids) { ids.forEach((id) => delete col(collection)[id]); save(); },
    async transaction(fn) {
      const writes = [];
      const result = await fn({
        get: (collection, id) => store.get(collection, id),
        set: (collection, id, value) => writes.push(() => { col(collection)[id] = clone(value); }),
        delete: (collection, id) => writes.push(() => { delete col(collection)[id]; }),
      });
      writes.forEach((write) => write());
      save();
      return result;
    },
  };
  return store;
}

export function devApi() {
  return {
    name: 'noon-dev-api',
    apply: 'serve',
    configureServer(server) {
      const root = server.config.root;
      process.env.ADMIN_PASSWORD ||= 'dev';
      process.env.ADMIN_SESSION_SECRET ||= 'local-dev-session-secret';
      process.env.SMTP_DEV_LOG = '1';
      globalThis.__NOON_DEV_STORE__ = createMemoryStore(path.join(root, 'node_modules/.cache/noon-dev-store.json'));

      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost');
        if (!url.pathname.startsWith('/api/')) return next();
        const query = Object.fromEntries(url.searchParams);
        let file;
        const routed = /^\/api\/(?:admin|cms)\/([a-z-]+)\/?$/.exec(url.pathname);
        if (routed) { file = 'api/cms.js'; query.r = routed[1]; } else file = `api${url.pathname.slice(4).replace(/\/$/, '')}.js`;
        const full = path.join(root, file);
        if (!fs.existsSync(full) || file.includes('/_')) { res.statusCode = 404; return res.end('Not found'); }

        try {
          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);
          const raw = Buffer.concat(chunks).toString('utf8');
          req.query = query;
          try { req.body = raw ? JSON.parse(raw) : undefined; } catch { req.body = raw; }
          res.status = (code) => { res.statusCode = code; return res; };
          // The session cookie is marked Secure; plain http on 127.0.0.1 would drop it.
          const setHeader = res.setHeader.bind(res);
          res.setHeader = (name, value) => setHeader(name, String(name).toLowerCase() === 'set-cookie' ? String(value).replace(/;\s*Secure/i, '') : value);
          const mod = await server.ssrLoadModule(full);
          await mod.default(req, res);
        } catch (error) {
          console.error('[dev-api]', file, error);
          if (!res.headersSent) { res.statusCode = 500; res.end(JSON.stringify({ error: error.message })); }
        }
        return undefined;
      });
    },
  };
}
