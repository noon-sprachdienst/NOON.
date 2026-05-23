import { useState, useEffect, useMemo } from 'react';

const ADMIN_AUTH_KEY  = 'noon_admin_auth';
const ADMIN_PW_KEY    = 'noon_admin_pw';
const ANALYTICS_KEY   = 'noon_analytics';
const DEFAULT_PW      = 'noon2024';

/* ─── Helpers ──────────────────────────────────────── */
function getDomain(ref) {
  if (!ref || ref === 'direct') return 'Direkt';
  try {
    const u = new URL(ref);
    return u.hostname.replace(/^www\./, '');
  } catch {
    return ref.slice(0, 30);
  }
}

function dayKey(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function todayKey() { return dayKey(Date.now()); }

function last30Days() {
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(dayKey(d.getTime()));
  }
  return days;
}

function groupBy(arr, fn) {
  return arr.reduce((acc, item) => {
    const key = fn(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function topN(obj, n = 5) {
  return Object.entries(obj)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

/* ─── Sub-components ────────────────────────────────── */
function StatCard({ icon, value, label, sub }) {
  return (
    <div className="adm-stat-card">
      <div className="adm-stat-icon">{icon}</div>
      <div className="adm-stat-val">{value}</div>
      <div className="adm-stat-label">{label}</div>
      {sub && <div className="adm-stat-sub">{sub}</div>}
    </div>
  );
}

function BarChart({ data, color = '#A4192C' }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="adm-bar-chart">
      {data.map((d) => (
        <div key={d.label} className="adm-bar-col">
          <div
            className="adm-bar-fill"
            style={{ height: `${Math.max((d.value / max) * 100, 2)}%`, background: color }}
            title={`${d.label}: ${d.value}`}
          />
          <div className="adm-bar-tick">{d.shortLabel}</div>
        </div>
      ))}
    </div>
  );
}

function HorizBar({ label, value, max, color = '#A4192C' }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="adm-hbar-row">
      <span className="adm-hbar-label">{label}</span>
      <div className="adm-hbar-track">
        <div className="adm-hbar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="adm-hbar-val">{value}</span>
    </div>
  );
}

/* ─── Login Screen ──────────────────────────────────── */
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const stored = localStorage.getItem(ADMIN_PW_KEY) || DEFAULT_PW;
    if (pw === stored) {
      localStorage.setItem(ADMIN_AUTH_KEY, '1');
      onLogin();
    } else {
      setErr('Falsches Passwort. Bitte erneut versuchen.');
      setPw('');
    }
  };

  return (
    <div className="adm-login">
      <div className="adm-login-box">
        <img src="/assets/logo2.png" alt="Noon Sprachdienst" height="44" style={{ filter: 'brightness(0)', marginBottom: 24 }} />
        <h1>Admin&thinsp;·&thinsp;Anmelden</h1>
        <p>Geben Sie das Admin-Passwort ein, um fortzufahren.</p>
        <form onSubmit={submit}>
          <input
            type="password"
            placeholder="Passwort"
            value={pw}
            onChange={e => { setPw(e.target.value); setErr(''); }}
            autoFocus
            autoComplete="current-password"
          />
          {err && <p className="adm-err">{err}</p>}
          <button type="submit">Einloggen</button>
        </form>
        <a href="/" className="adm-back-link">← Zurück zur Website</a>
      </div>
    </div>
  );
}

/* ─── Settings Tab ──────────────────────────────────── */
function SettingsTab() {
  const [newPw, setNewPw]     = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg]         = useState('');

  const savePw = (e) => {
    e.preventDefault();
    if (newPw.length < 6) { setMsg('Passwort muss mindestens 6 Zeichen haben.'); return; }
    if (newPw !== confirm) { setMsg('Passwörter stimmen nicht überein.'); return; }
    localStorage.setItem(ADMIN_PW_KEY, newPw);
    setMsg('✓ Passwort gespeichert.');
    setNewPw(''); setConfirm('');
  };

  const clearData = () => {
    if (window.confirm('Alle lokalen Analysedaten löschen?')) {
      localStorage.removeItem('noon_analytics');
      setMsg('✓ Daten gelöscht.');
    }
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    window.location.href = '/';
  };

  return (
    <div className="adm-settings">
      <h3>Passwort ändern</h3>
      <form onSubmit={savePw} className="adm-settings-form">
        <label>Neues Passwort</label>
        <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="Mindestens 6 Zeichen" />
        <label>Bestätigen</label>
        <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Wiederholen" />
        {msg && <p className={`adm-msg ${msg.startsWith('✓') ? 'ok' : 'err'}`}>{msg}</p>}
        <button type="submit" className="adm-btn-primary">Passwort speichern</button>
      </form>

      <hr className="adm-divider"/>

      <h3>Analytics einrichten</h3>
      <p className="adm-hint">
        Die lokale Analyse zeigt nur Besuche aus diesem Browser. Für vollständige Website-Statistiken
        empfehlen wir einen dieser DSGVO-konformen Dienste:
      </p>
      <div className="adm-analytics-options">
        <a href="https://plausible.io" target="_blank" rel="noopener noreferrer" className="adm-analytics-card">
          <strong>Plausible Analytics</strong>
          <span>Privacy-first · Kein Cookie-Banner nötig · ab $9/Mo</span>
        </a>
        <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="adm-analytics-card">
          <strong>Google Analytics 4</strong>
          <span>Kostenlos · Umfangreiche Funktionen · Cookie-Banner erforderlich</span>
        </a>
        <a href="https://matomo.org" target="_blank" rel="noopener noreferrer" className="adm-analytics-card">
          <strong>Matomo</strong>
          <span>Open Source · Self-hosted · DSGVO-konform</span>
        </a>
      </div>

      <hr className="adm-divider"/>

      <h3>Daten &amp; Sitzung</h3>
      <div className="adm-danger-zone">
        <button type="button" className="adm-btn-danger" onClick={clearData}>Lokale Daten löschen</button>
        <button type="button" className="adm-btn-secondary" onClick={logout}>Abmelden</button>
      </div>
    </div>
  );
}

/* ─── Dashboard Tab ─────────────────────────────────── */
function DashboardTab({ visits }) {
  const [range, setRange] = useState(30);

  const cutoff = Date.now() - range * 24 * 60 * 60 * 1000;
  const filtered = visits.filter(v => v.ts >= cutoff);

  const today     = visits.filter(v => dayKey(v.ts) === todayKey());
  const yesterday = visits.filter(v => {
    const d = new Date(); d.setDate(d.getDate() - 1);
    return dayKey(v.ts) === dayKey(d.getTime());
  });

  const days30   = last30Days();
  const byDay    = groupBy(filtered, v => dayKey(v.ts));
  const chartData = days30.map(d => ({
    label:      d,
    shortLabel: d.slice(8),   // just the day number
    value:      byDay[d] || 0,
  }));

  const topPages   = topN(groupBy(filtered, v => v.path || '/'));
  const topRefs    = topN(groupBy(filtered, v => getDomain(v.ref)));
  const devices    = groupBy(filtered, v => v.device || 'desktop');
  const langs      = topN(groupBy(filtered, v => (v.lang || 'de').slice(0, 2)), 5);
  const maxRef     = topRefs[0]?.[1] || 1;
  const maxPage    = topPages[0]?.[1] || 1;
  const maxLang    = langs[0]?.[1] || 1;

  const hasData = filtered.length > 0;

  return (
    <div className="adm-dashboard">
      {/* Range selector */}
      <div className="adm-range-row">
        <span className="adm-range-label">Zeitraum:</span>
        {[7, 14, 30, 90].map(d => (
          <button
            key={d}
            className={`adm-range-btn${range === d ? ' active' : ''}`}
            type="button"
            onClick={() => setRange(d)}
          >
            {d} Tage
          </button>
        ))}
      </div>

      {/* Local-data notice */}
      <div className="adm-notice">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Lokale Vorschau — zeigt nur Besuche aus diesem Browser. Für vollständige Statistiken unter
        Einstellungen einen Analytics-Dienst einrichten.
      </div>

      {/* Stat cards */}
      <div className="adm-stat-grid">
        <StatCard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>}
          value={filtered.length.toLocaleString('de-DE')}
          label={`Besuche (${range} Tage)`}
          sub={`${today.length} heute`}
        />
        <StatCard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>}
          value={Object.keys(byDay).length}
          label="Aktive Tage"
          sub={`${yesterday.length} gestern`}
        />
        <StatCard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>}
          value={topRefs[0]?.[0] || '—'}
          label="Top Quelle"
          sub={topRefs[0] ? `${topRefs[0][1]} Besuche` : 'Keine Daten'}
        />
        <StatCard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/></svg>}
          value={topPages[0]?.[0] || '—'}
          label="Top Seite"
          sub={topPages[0] ? `${topPages[0][1]} Aufrufe` : 'Keine Daten'}
        />
      </div>

      {/* Devices */}
      <div className="adm-devices">
        <div className="adm-device-pill">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          Desktop: {devices.desktop || 0}
        </div>
        <div className="adm-device-pill">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          Mobil: {devices.mobile || 0}
        </div>
      </div>

      {/* Chart */}
      {hasData ? (
        <>
          <div className="adm-section-title">Besuche pro Tag</div>
          <BarChart data={chartData} color="#A4192C" />
        </>
      ) : (
        <div className="adm-empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
          <p>Noch keine Daten. Besuchen Sie die Website, um die Analyse zu starten.</p>
        </div>
      )}

      {/* Top pages + refs + langs */}
      {hasData && (
        <div className="adm-bottom-grid">
          <div className="adm-bottom-card">
            <div className="adm-section-title">Top Seiten</div>
            {topPages.map(([page, cnt]) => (
              <HorizBar key={page} label={page} value={cnt} max={maxPage} color="#1F2C4E" />
            ))}
          </div>
          <div className="adm-bottom-card">
            <div className="adm-section-title">Quellen</div>
            {topRefs.map(([ref, cnt]) => (
              <HorizBar key={ref} label={ref} value={cnt} max={maxRef} color="#A4192C" />
            ))}
          </div>
          <div className="adm-bottom-card">
            <div className="adm-section-title">Sprachen</div>
            {langs.map(([lang, cnt]) => (
              <HorizBar key={lang} label={lang.toUpperCase()} value={cnt} max={maxLang} color="#2D8A5A" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Admin Component ──────────────────────────── */
export default function Admin() {
  const [authed, setAuthed] = useState(!!localStorage.getItem(ADMIN_AUTH_KEY));
  const [tab,    setTab]    = useState('dashboard');
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    if (!authed) return;
    const raw = localStorage.getItem(ANALYTICS_KEY);
    if (raw) {
      try { setVisits(JSON.parse(raw).visits || []); } catch {}
    }
  }, [authed]);

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  return (
    <div className="adm-root">
      {/* Sidebar */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-logo">
          <img src="/assets/logo2.png" alt="Noon" height="32" style={{ filter: 'brightness(0) invert(1)' }} />
        </div>
        <nav className="adm-nav">
          <button
            className={`adm-nav-item${tab === 'dashboard' ? ' active' : ''}`}
            type="button"
            onClick={() => setTab('dashboard')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Dashboard
          </button>
          <button
            className={`adm-nav-item${tab === 'settings' ? ' active' : ''}`}
            type="button"
            onClick={() => setTab('settings')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>
            Einstellungen
          </button>
          <a href="/" className="adm-nav-item adm-nav-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Zur Website
          </a>
        </nav>
        <div className="adm-sidebar-badge">Admin Panel</div>
      </aside>

      {/* Content */}
      <main className="adm-main">
        <div className="adm-topbar">
          <h1 className="adm-page-title">
            {tab === 'dashboard' ? 'Analytics Dashboard' : 'Einstellungen'}
          </h1>
          <div className="adm-topbar-right">
            <span className="adm-live-dot" />
            <span style={{ fontSize: 13, color: '#888' }}>Lokale Daten · {visits.length} Einträge gesamt</span>
          </div>
        </div>

        <div className="adm-content">
          {tab === 'dashboard' && <DashboardTab visits={visits} />}
          {tab === 'settings'  && <SettingsTab />}
        </div>
      </main>
    </div>
  );
}
