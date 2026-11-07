import { useEffect, useMemo, useState } from 'react';
import { CircleCheck, Circle, Download, Inbox, Paperclip, Search, Trash2, TriangleAlert } from 'lucide-react';
import { fill } from './i18n.js';

const DAY = 24 * 60 * 60 * 1000;
const formatMb = (bytes, locale) => `${(bytes / (1024 * 1024)).toLocaleString(locale, { maximumFractionDigits: 1 })} MB`;

// Requests from the website form: date, name, service and file links only. Entries and files
// are deleted after 30 days; the page shows how many days each entry has left.
export default function RequestsTab({ t, locale, reloadKey, onNewCount }) {
  const [state, setState] = useState({ loading: true, requests: [], days: 30 });
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, loading: true, error: false }));
    fetch('/api/admin/requests')
      .then((response) => { if (!response.ok) throw new Error('failed'); return response.json(); })
      .then((data) => { if (alive) setState({ loading: false, requests: data.requests || [], days: data.days || 30 }); })
      .catch(() => { if (alive) setState({ loading: false, requests: [], days: 30, error: true }); });
    return () => { alive = false; };
  }, [reloadKey]);

  useEffect(() => { onNewCount?.(state.requests.filter((r) => r.status === 'new').length); }, [state.requests, onNewCount]);

  const post = async (body) => {
    const response = await fetch('/api/admin/requests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!response.ok) throw new Error('failed');
  };
  const setStatus = async (request, status) => {
    setState((s) => ({ ...s, requests: s.requests.map((r) => (r.id === request.id ? { ...r, status } : r)) }));
    try { await post({ id: request.id, status }); } catch {
      setState((s) => ({ ...s, requests: s.requests.map((r) => (r.id === request.id ? { ...r, status: request.status } : r)) }));
    }
  };
  const remove = async (request) => {
    if (!window.confirm(t.reqConfirmDelete)) return;
    try {
      await post({ id: request.id, action: 'delete' });
      setState((s) => ({ ...s, requests: s.requests.filter((r) => r.id !== request.id) }));
    } catch { /* stays listed */ }
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return state.requests.filter((r) => (filter === 'all' || r.status === filter) && (!q || String(r.name || '').toLowerCase().includes(q)));
  }, [state.requests, query, filter]);
  const newCount = state.requests.filter((r) => r.status === 'new').length;

  return (
    <div className="np-requests">
      <div className="np-notice np-cms-msg"><TriangleAlert size={16} /><span>{t.reqNote}</span></div>
      <section className="np-card">
        <header className="np-card-head">
          <div>
            <h2>{t.requests}</h2>
            <p>{fill(t.reqCount, { n: newCount, t: state.requests.length })}</p>
          </div>
          <div className="np-req-tools">
            <label className="np-search">
              <Search size={15} />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.reqSearch} aria-label={t.reqSearch} />
            </label>
            <div className="np-seg np-seg--sm" role="group">
              {[['all', t.reqAll], ['new', t.reqNew], ['done', t.reqDone]].map(([key, label]) => (
                <button key={key} type="button" className={filter === key ? 'is-active' : ''} aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>
              ))}
            </div>
          </div>
        </header>

        {state.loading && <p className="np-muted">{t.checking}</p>}
        {!state.loading && state.error && <p className="np-err">{t.loadFailed}</p>}
        {!state.loading && !state.error && !state.requests.length && (
          <div className="np-empty"><Inbox size={22} /><p>{t.reqEmpty}</p></div>
        )}
        {!state.loading && state.requests.length > 0 && !visible.length && <p className="np-muted">{t.reqNone}</p>}

        {visible.length > 0 && (
          <div className="np-table-wrap">
            <table className="np-table np-req-table">
              <thead>
                <tr>
                  <th>{t.reqName}</th><th>{t.reqDate}</th><th>{t.reqService}</th><th>{t.reqFiles}</th><th>{t.reqLeft}</th><th>{t.reqStatus}</th><th />
                </tr>
              </thead>
              <tbody>
                {visible.map((request) => {
                  const left = Math.max(0, state.days - Math.floor((Date.now() - request.createdAt) / DAY));
                  return (
                    <tr key={request.id} className={request.status === 'new' ? 'is-new' : ''}>
                      <td><strong dir="auto">{request.name || '—'}</strong></td>
                      <td>{new Date(request.createdAt).toLocaleString(locale, { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                      <td><span className="np-chip">{t.svc[request.service] || request.service || '—'}</span></td>
                      <td className="np-req-files">
                        {request.files.map((file) => (
                          <a key={file.url} href={file.url} target="_blank" rel="noopener noreferrer" dir="auto">
                            <Download size={13} /> <span>{file.name}</span>{file.size ? <em>{formatMb(file.size, locale)}</em> : null}
                          </a>
                        ))}
                        {request.attached > 0 && <span className="np-muted"><Paperclip size={13} /> {fill(t.reqAttached, { n: request.attached })}</span>}
                        {!request.files.length && !request.attached && <span className="np-muted">{t.reqNoFiles}</span>}
                      </td>
                      <td><span className={`np-days${left <= 5 ? ' is-soon' : ''}`}>{left === 0 ? t.reqToday : fill(t.reqDays, { n: left })}</span></td>
                      <td>
                        <button type="button" className={`np-status${request.status === 'done' ? ' is-done' : ''}`} onClick={() => setStatus(request, request.status === 'done' ? 'new' : 'done')}
                          title={request.status === 'done' ? t.reqMarkNew : t.reqMarkDone}>
                          {request.status === 'done' ? <CircleCheck size={14} /> : <Circle size={14} />} {request.status === 'done' ? t.reqDone : t.reqNew}
                        </button>
                      </td>
                      <td>
                        <button type="button" className="np-mini is-danger" onClick={() => remove(request)} aria-label={t.delete} title={t.delete}><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
