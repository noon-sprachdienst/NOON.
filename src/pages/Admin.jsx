import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  LayoutDashboard, Search, Settings, ArrowLeft, Users, Eye, MousePointerClick, Clock, RefreshCw, Menu, X,
  Monitor, Smartphone, Tablet, MessageCircle, Phone, Mail, FileText, Send, Languages, Copy, Check,
  ExternalLink, LogOut, ShieldCheck, Database, EyeOff, Globe, PanelLeftClose, PanelLeftOpen,
} from 'lucide-react';
import { INTERNAL_KEY } from '../lib/analytics.js';
import { T, ALPHA3, countryName, fill } from './admin/i18n.js';
import { buildMetrics, buildSessions } from './admin/metrics.js';
import { BarList, Delta, Donut, Heatmap, Sparkline, TrendChart } from './admin/charts.jsx';
import './admin/admin.css';

const LANG_KEY = 'noon_admin_lang';
const RAIL_KEY = 'noon_admin_rail';
const RANGES = [7, 14, 30, 90];
// Local design preview with generated data: `npm run dev` → /admin?demo (never in production builds).
const DEMO = import.meta.env.DEV && new URLSearchParams(window.location.search).has('demo');

const COLORS = { navy: '#1f2d4d', red: '#c0283a', teal: '#0f9d8a', amber: '#e3a22b', violet: '#6d5bd0', sky: '#3b82f6', slate: '#94a3b8' };
const SOURCE_COLORS = { Google: '#3b6fe0', direct: COLORS.navy, WhatsApp: '#1faa5b', Bing: '#0ea5b7', Facebook: '#6d5bd0', Instagram: '#d63c7a' };
const DEVICE_META = { desktop: { icon: Monitor, color: COLORS.navy }, mobile: { icon: Smartphone, color: COLORS.red }, tablet: { icon: Tablet, color: COLORS.amber } };
const ACTION_META = {
  quote_request: { icon: FileText, color: COLORS.red }, whatsapp: { icon: MessageCircle, color: '#1faa5b' },
  phone: { icon: Phone, color: COLORS.navy }, email: { icon: Mail, color: COLORS.sky },
  quote_form_submit: { icon: Send, color: COLORS.violet }, hero_translation: { icon: Languages, color: COLORS.amber },
};
const GCP_PROJECT = 'noon-sprachdienst';
const GSC_PROPERTY = 'sc-domain:noon-sprachdienst.de';

function numberLocale(t) {
  return t.dir === 'rtl' ? 'ar-EG-u-nu-latn' : t.locale;
}

function fmtDuration(seconds) {
  if (!seconds) return '0s';
  return seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, '0')}s`;
}

function timeAgo(ts, t) {
  const minutes = Math.round((Date.now() - ts) / 60000);
  const rtf = new Intl.RelativeTimeFormat(numberLocale(t), { numeric: 'auto', style: 'short' });
  if (minutes < 60) return rtf.format(-minutes, 'minute');
  const hours = Math.round(minutes / 60);
  return hours < 48 ? rtf.format(-hours, 'hour') : rtf.format(-Math.round(hours / 24), 'day');
}

function dayLabel(key, t, long = false) {
  const date = new Date(`${key}T12:00:00`);
  return date.toLocaleDateString(numberLocale(t), long ? { weekday: 'short', day: 'numeric', month: 'short' } : { day: 'numeric', month: 'short' });
}

/* ─── Building blocks ─────────────────────────────────── */
function Card({ title, sub, action, className = '', children }) {
  return (
    <section className={`ad-card ${className}`}>
      {(title || action) && (
        <header className="ad-card-head">
          <div>
            {title && <h2>{title}</h2>}
            {sub && <p>{sub}</p>}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

function Kpi({ icon: Icon, label, value, hint, delta, deltaLabel, invert, spark, color }) {
  return (
    <div className="ad-kpi" style={{ '--ad-accent': color }}>
      <div className="ad-kpi-top">
        <span className="ad-kpi-icon"><Icon size={18} strokeWidth={2.2} /></span>
        <span className="ad-kpi-label">{label}</span>
      </div>
      <div className="ad-kpi-value">{value}</div>
      <div className="ad-kpi-meta">
        <Delta value={delta} invert={invert} label={deltaLabel} />
        {hint && <span>{hint}</span>}
      </div>
      {spark && <Sparkline values={spark} color={color} />}
    </div>
  );
}

function Notice({ children, tone = 'info' }) {
  return <div className={`ad-notice ad-notice--${tone}`}>{children}</div>;
}

function Legend({ items }) {
  return (
    <ul className="ad-legend">
      {items.map((item) => (
        <li key={item.label}>
          <i style={{ background: item.color }} />
          <span>{item.label}</span>
          {item.value !== undefined && <b>{item.value}</b>}
        </li>
      ))}
    </ul>
  );
}

/* ─── Overview ────────────────────────────────────────── */
function OverviewTab({ daily, events, range, t, lang }) {
  const m = useMemo(() => buildMetrics(daily, range), [daily, range]);
  const sessions = useMemo(() => buildSessions(events), [events]);
  const nf = (v) => v.toLocaleString(numberLocale(t));
  const visits = m.current.sessions;
  const conversion = visits ? ((m.current.cta / visits) * 100).toFixed(1) : null;
  const vs = fill(t.vsPrevious, { n: range });
  const hasData = m.current.pageViews > 0;
  const sourceLabel = (key) => (key === 'direct' ? t.direct : key);
  const deviceTotal = Object.values(m.devices).reduce((s, v) => s + v, 0);
  const actionTotal = m.actions.reduce((s, [, v]) => s + v, 0);

  return (
    <div className="ad-stack">
      {m.needsRebuild && <Notice tone="warn">{t.needsRebuild}</Notice>}

      <div className="ad-kpis">
        <Kpi icon={Users} color={COLORS.navy} label={t.visitors} value={visits === null ? '—' : nf(visits)} hint={t.visitorsHint}
          delta={m.delta.sessions} deltaLabel={t.noPrevious} spark={m.series.map((d) => d.sessions ?? 0)} />
        <Kpi icon={Eye} color={COLORS.sky} label={t.pageViews} value={nf(m.current.pageViews)} hint={t.pageViewsHint}
          delta={m.delta.pageViews} deltaLabel={t.noPrevious} spark={m.series.map((d) => d.pageViews)} />
        <Kpi icon={MousePointerClick} color={COLORS.red} label={t.contactActions} value={nf(m.current.cta)}
          hint={conversion ? fill(t.conversion, { x: conversion }) : null} delta={m.delta.cta} deltaLabel={t.noPrevious} spark={m.series.map((d) => d.cta)} />
        <Kpi icon={Clock} color={COLORS.teal} label={t.avgTime} value={fmtDuration(m.current.avgDuration)} hint={t.avgTimeHint}
          delta={m.delta.avgDuration} deltaLabel={t.noPrevious} spark={m.series.map((d) => d.avgDuration)} />
      </div>
      <p className="ad-compare">{m.previous ? vs : t.noPrevious}</p>

      {!hasData ? <Card><p className="ad-empty">{t.noData}</p></Card> : (
        <>
          <div className="ad-row ad-row--wide">
            <Card title={t.trafficTitle} sub={t.trafficSub}
              action={<Legend items={[{ label: t.pageViews, color: COLORS.sky }, { label: t.visitors, color: COLORS.navy }]} />}>
              <TrendChart
                labels={m.days}
                formatTick={(key, long) => dayLabel(key, t, long)}
                formatValue={(v) => nf(v)}
                series={[
                  { key: 'pv', label: t.pageViews, color: COLORS.sky, type: 'area', values: m.series.map((d) => d.pageViews) },
                  { key: 'vi', label: t.visitors, color: COLORS.navy, type: 'line', values: m.series.map((d) => d.sessions) },
                ]}
              />
            </Card>
            <Card title={t.contactTitle} sub={t.contactSub}>
              <div className="ad-actions">
                {m.actions.map(([action, count]) => {
                  const meta = ACTION_META[action] || { icon: MousePointerClick, color: COLORS.slate };
                  const Icon = meta.icon;
                  return (
                    <div className="ad-action" key={action} style={{ '--ad-accent': meta.color }}>
                      <span className="ad-action-icon"><Icon size={16} /></span>
                      <span className="ad-action-label">{t.actions[action] || action}</span>
                      <b>{nf(count)}</b>
                      <span className="ad-action-bar"><i style={{ width: `${actionTotal ? (count / actionTotal) * 100 : 0}%` }} /></span>
                    </div>
                  );
                })}
                {!m.actions.length && <p className="ad-empty-line">—</p>}
              </div>
              <div className="ad-card-foot"><span>{t.total}</span><b>{nf(actionTotal)}</b></div>
            </Card>
          </div>

          <div className="ad-row ad-row--three">
            <Card title={t.sourcesTitle}>
              <div className="ad-donut-row">
                <Donut segments={m.sources.map(([k, v], i) => ({ label: k, value: v, color: SOURCE_COLORS[k] || [COLORS.slate, '#cbd5e1', '#64748b'][i % 3] }))}
                  centerLabel={visits !== null ? t.visits : t.pageViews} />
                <Legend items={m.sources.map(([k, v], i) => ({ label: sourceLabel(k), value: nf(v), color: SOURCE_COLORS[k] || [COLORS.slate, '#cbd5e1', '#64748b'][i % 3] }))} />
              </div>
            </Card>
            <Card title={t.devicesTitle}>
              <div className="ad-devices">
                {['mobile', 'desktop', 'tablet'].map((key) => {
                  const value = m.devices[key] || 0;
                  const share = deviceTotal ? Math.round((value / deviceTotal) * 100) : 0;
                  const { icon: Icon, color } = DEVICE_META[key];
                  return (
                    <div className="ad-device" key={key} style={{ '--ad-accent': color }}>
                      <span className="ad-device-icon"><Icon size={18} /></span>
                      <div><strong>{share}%</strong><span>{t[key]} · {nf(value)}</span></div>
                    </div>
                  );
                })}
              </div>
              <div className="ad-stackbar">
                {['mobile', 'desktop', 'tablet'].map((key) => (
                  <i key={key} style={{ width: `${deviceTotal ? ((m.devices[key] || 0) / deviceTotal) * 100 : 0}%`, background: DEVICE_META[key].color }} />
                ))}
              </div>
            </Card>
            <Card title={t.countriesTitle}>
              <BarList color="var(--ad-bar-navy)" rows={m.countries.map(([code, v]) => ({ key: code, badge: code, label: countryName(code, lang), value: v }))} />
            </Card>
          </div>

          <div className="ad-row ad-row--wide">
            <Card title={t.heatmapTitle} sub={t.heatmapSub}>
              {m.hasHeat
                ? <Heatmap data={m.heat} weekdays={t.weekdays} less={t.less} more={t.more} peaks={{ day: t.peakDay, hour: t.peakHour, office: t.officeHours, weekend: t.weekend }} />
                : <p className="ad-empty">{t.needsRebuild}</p>}
            </Card>
            <Card title={t.languagesTitle}>
              <BarList color="var(--ad-bar-teal)" rows={m.languages.map(([k, v]) => ({ key: k, label: k, value: v, ltr: true }))} />
              <h3 className="ad-subhead">{t.citiesTitle}</h3>
              <BarList color="var(--ad-bar-amber)" rows={m.cities.slice(0, 6).map(([k, v]) => ({ key: k, label: k, value: v }))} />
            </Card>
          </div>

          <div className="ad-row ad-row--half">
            <Card title={t.topPagesTitle}>
              <BarList color="var(--ad-bar-sky)" rows={m.pages.map(([k, v]) => ({ key: k, label: k, value: v, ltr: true }))} />
            </Card>
            <Card title={t.landingTitle} sub={t.landingSub}>
              {m.landing.length
                ? <BarList color="var(--ad-bar-red)" rows={m.landing.map(([k, v]) => ({ key: k, label: k, value: v, ltr: true }))} />
                : <p className="ad-empty">{t.needsRebuild}</p>}
            </Card>
          </div>
        </>
      )}

      <Card title={t.recentTitle} sub={t.recentSub}>
        <div className="ad-visits">
          {sessions.map((s) => {
            const DeviceIcon = DEVICE_META[s.device]?.icon || Monitor;
            return (
              <div className="ad-visit" key={s.id}>
                <div className="ad-visit-who">
                  <span className="ad-code">{s.country || 'XX'}</span>
                  <div>
                    <strong>{s.city || countryName(s.country || 'XX', lang)}</strong>
                    <span><DeviceIcon size={12} /> {s.browser || t.unknown} · {sourceLabel(s.referrer && s.referrer !== 'direct' ? s.referrer.replace(/^www\./, '') : 'direct')}</span>
                  </div>
                </div>
                <div className="ad-visit-path" dir="ltr">
                  {s.pages.slice(0, 5).map((p, i) => <span key={`${p}-${i}`} className="ad-chip">{p}</span>)}
                  {s.pages.length > 5 && <span className="ad-chip ad-chip--more">+{s.pages.length - 5}</span>}
                  {s.cta.map((a, i) => <span key={`${a}-${i}`} className="ad-chip ad-chip--cta">{t.actions[a] || a}</span>)}
                </div>
                <div className="ad-visit-time">
                  <b>{fmtDuration(s.duration)}</b>
                  <span>{timeAgo(s.end, t)}</span>
                </div>
              </div>
            );
          })}
          {!sessions.length && <p className="ad-empty">{t.noData}</p>}
        </div>
      </Card>

      <p className="ad-footnote"><ShieldCheck size={14} /> {t.consentNote}</p>
    </div>
  );
}

/* ─── Google Search ───────────────────────────────────── */
function CopyField({ value, t }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="ad-copy">
      <code dir="ltr">{value || '—'}</code>
      <button type="button" onClick={() => { navigator.clipboard?.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
        {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? t.copied : t.copy}
      </button>
    </div>
  );
}

function SearchSetup({ data, t }) {
  return (
    <Card title={t.setupTitle} className="ad-setup">
      <Notice tone="warn">{t.reasons[data.reason] || t.reasons.api_error}</Notice>
      <p>{t.setupIntro}</p>
      <ol className="ad-steps">
        <li>
          <span>{t.step1}</span>
          <a className="ad-btn ad-btn--ghost" href={`https://console.cloud.google.com/apis/library/searchconsole.googleapis.com?project=${GCP_PROJECT}`} target="_blank" rel="noreferrer">
            <ExternalLink size={14} /> {t.openApi}
          </a>
        </li>
        <li>
          <span>{t.step2}</span>
          <CopyField value={data.serviceAccount} t={t} />
          <a className="ad-btn ad-btn--ghost" href={`https://search.google.com/search-console/users?resource_id=${encodeURIComponent(data.site || GSC_PROPERTY)}`} target="_blank" rel="noreferrer">
            <ExternalLink size={14} /> {t.openUsers}
          </a>
        </li>
        <li><span>{t.step3}</span></li>
      </ol>
    </Card>
  );
}

function SearchTab({ range, t, lang, reloadKey }) {
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const nf = (v, digits = 0) => v.toLocaleString(numberLocale(t), { maximumFractionDigits: digits, minimumFractionDigits: digits });

  useEffect(() => {
    let alive = true;
    setData(null);
    setFailed(false);
    const load = DEMO
      ? import('./admin/demo.js').then((demo) => demo.demoSearch(range))
      : fetch(`/api/admin/search-console?days=${range}`).then((r) => { if (!r.ok) throw new Error('failed'); return r.json(); });
    load.then((d) => alive && setData(d)).catch(() => alive && setFailed(true));
    return () => { alive = false; };
  }, [range, reloadKey]);

  if (failed) return <Card><p className="ad-empty">{t.reasons.api_error}</p></Card>;
  if (!data) return <Card><p className="ad-empty">{t.loading}</p></Card>;
  if (!data.configured) return <SearchSetup data={data} t={t} />;

  const cur = data.totals;
  const prev = data.previousTotals;
  const change = (a, b) => (b ? ((a - b) / b) * 100 : null);
  const vs = fill(t.vsPrevious, { n: data.range.days });
  const deviceRows = data.devices.map((d) => ({ key: d.key, label: t[d.key.toLowerCase()] || d.key, value: d.clicks }));
  const countryRows = data.countries.map((c) => {
    const code = ALPHA3[c.key] || c.key.toUpperCase();
    return { key: c.key, badge: code.slice(0, 2), label: countryName(code, lang), value: c.clicks };
  });

  return (
    <div className="ad-stack">
      <div className="ad-kpis">
        <Kpi icon={MousePointerClick} color={COLORS.sky} label={t.clicks} value={nf(cur.clicks)} delta={change(cur.clicks, prev.clicks)} spark={data.series.map((d) => d.clicks)} />
        <Kpi icon={Eye} color={COLORS.violet} label={t.impressions} value={nf(cur.impressions)} delta={change(cur.impressions, prev.impressions)} spark={data.series.map((d) => d.impressions)} />
        <Kpi icon={FileText} color={COLORS.teal} label={t.ctr} value={`${nf(cur.ctr * 100, 1)}%`} delta={change(cur.ctr, prev.ctr)}
          spark={data.series.map((d) => (d.impressions ? d.clicks / d.impressions : 0))} />
        <Kpi icon={Search} color={COLORS.amber} label={t.position} value={nf(cur.position, 1)} hint={t.positionHint} delta={change(cur.position, prev.position)} invert
          spark={data.series.map((d) => (d.position ? 100 - d.position : 0))} />
      </div>
      <p className="ad-compare">{vs} · {t.delay}</p>

      <Card title={t.searchChart}
        action={<Legend items={[{ label: t.clicks, color: COLORS.sky }, { label: t.impressions, color: COLORS.violet }]} />}>
        <TrendChart
          labels={data.series.map((d) => d.day)}
          formatTick={(key, long) => dayLabel(key, t, long)}
          formatValue={(v) => nf(v)}
          series={[
            { key: 'cl', label: t.clicks, color: COLORS.sky, type: 'area', values: data.series.map((d) => d.clicks) },
            { key: 'im', label: t.impressions, color: COLORS.violet, type: 'line', dashed: true, ownScale: true, values: data.series.map((d) => d.impressions) },
          ]}
        />
      </Card>

      <Card title={t.queriesTitle}>
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead>
              <tr><th>{t.query}</th><th>{t.clicks}</th><th>{t.impressions}</th><th>{t.ctr}</th><th>{t.position}</th></tr>
            </thead>
            <tbody>
              {data.queries.map((q) => {
                const moved = q.previousPosition ? q.previousPosition - q.position : null;
                return (
                  <tr key={q.key}>
                    <td><bdi>{q.key}</bdi></td>
                    <td>{nf(q.clicks)}</td>
                    <td>{nf(q.impressions)}</td>
                    <td>{nf(q.ctr * 100, 1)}%</td>
                    <td>
                      <span className={`ad-pos ${q.position <= 3 ? 'ad-pos--top' : q.position <= 10 ? 'ad-pos--p1' : ''}`}>{nf(q.position, 1)}</span>
                      {moved === null ? <em className="ad-move ad-move--new">{t.newEntry}</em>
                        : Math.abs(moved) >= 0.5 && <em className={`ad-move ${moved > 0 ? 'ad-move--up' : 'ad-move--down'}`} dir="ltr">{moved > 0 ? '▲' : '▼'} {nf(Math.abs(moved), 1)}</em>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="ad-row ad-row--wide">
        <Card title={t.pagesTitle}>
          <div className="ad-table-wrap">
            <table className="ad-table">
              <thead><tr><th>{t.page}</th><th>{t.clicks}</th><th>{t.impressions}</th><th>{t.position}</th></tr></thead>
              <tbody>
                {data.pages.map((p) => (
                  <tr key={p.key}>
                    <td><bdi dir="ltr" className="ad-ltr">{p.key}</bdi></td>
                    <td>{nf(p.clicks)}</td>
                    <td>{nf(p.impressions)}</td>
                    <td>{nf(p.position, 1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title={t.devicesSearch}>
          <BarList color="var(--ad-bar-sky)" rows={deviceRows} />
          <h3 className="ad-subhead">{t.countriesSearch}</h3>
          <BarList color="var(--ad-bar-navy)" rows={countryRows} />
        </Card>
      </div>

      {data.sitemaps.length > 0 && (
        <Card title={t.sitemapsTitle}>
          <div className="ad-sitemaps">
            {data.sitemaps.map((s) => (
              <div className="ad-sitemap" key={s.path}>
                <bdi dir="ltr" className="ad-ltr">{s.path}</bdi>
                <span><b>{nf(s.submitted)}</b> {t.submitted}</span>
                <span>{t.lastRead}: <b>{s.lastDownloaded ? new Date(s.lastDownloaded).toLocaleDateString(numberLocale(t)) : '—'}</b></span>
                <span className={s.errors ? 'ad-bad' : 'ad-good'}>{t.errors}: <b>{s.errors}</b> · {t.warnings}: <b>{s.warnings}</b></span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

/* ─── Settings ────────────────────────────────────────── */
function SettingsTab({ t, meta, onRebuilt }) {
  const [rebuild, setRebuild] = useState('');
  const [internal, setInternal] = useState(() => localStorage.getItem(INTERNAL_KEY) === '1');
  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
    window.location.reload();
  };
  const runRebuild = async () => {
    setRebuild(t.rebuilding);
    try {
      const response = await fetch('/api/admin/analytics-rebuild', { method: 'POST' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'failed');
      setRebuild(fill(t.rebuildDone, { days: data.days, events: data.events.toLocaleString() }));
      onRebuilt();
    } catch {
      setRebuild(t.rebuildFailed);
    }
  };
  const toggleInternal = () => {
    const next = !internal;
    localStorage.setItem(INTERNAL_KEY, next ? '1' : '0');
    setInternal(next);
  };

  return (
    <div className="ad-settings">
      <Card title={t.internalTitle} action={
        <button type="button" role="switch" aria-checked={internal} className={`ad-switch${internal ? ' is-on' : ''}`} onClick={toggleInternal}>
          <i /> <span>{internal ? t.on : t.off}</span>
        </button>
      }>
        <p className="ad-text"><EyeOff size={15} /> {t.internalText}</p>
      </Card>
      <Card title={t.countersTitle}>
        <p className="ad-text"><Database size={15} /> {t.countersText}</p>
        <div className="ad-settings-row">
          <button type="button" className="ad-btn" onClick={runRebuild}><RefreshCw size={15} /> {t.rebuildBtn}</button>
          <span className="ad-muted">{t.lastRebuild}: {meta?.rebuiltAt ? new Date(meta.rebuiltAt).toLocaleString(numberLocale(t)) : t.neverRebuilt}</span>
        </div>
        {rebuild && <Notice>{rebuild}</Notice>}
      </Card>
      <div className="ad-row ad-row--half">
        <Card title={t.privacyTitle}><p className="ad-text"><ShieldCheck size={15} /> {t.privacyText}</p></Card>
        <Card title={t.retentionTitle}><p className="ad-text"><Clock size={15} /> {t.retentionText}</p></Card>
      </div>
      <Card title={t.sessionTitle}>
        <button type="button" className="ad-btn ad-btn--ghost" onClick={logout}><LogOut size={15} /> {t.logout}</button>
      </Card>
    </div>
  );
}

/* ─── Login ───────────────────────────────────────────── */
function LangSwitch({ lang, setLang }) {
  return (
    <div className="ad-lang">
      {['de', 'en', 'ar'].map((l) => (
        <button key={l} type="button" className={lang === l ? 'is-active' : ''} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
      ))}
    </div>
  );
}

function LoginScreen({ onLogin, lang, setLang }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const t = T[lang];
  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });
      if (!response.ok) throw new Error('login failed');
      onLogin();
    } catch {
      setErr(t.wrongPw);
      setPw('');
    }
  };
  return (
    <div className="ad-login" dir={t.dir}>
      <form className="ad-login-box" onSubmit={submit}>
        <LangSwitch lang={lang} setLang={setLang} />
        <img src="/assets/logo2.png" alt="Noon" height="44" />
        <h1>{t.loginTitle}</h1>
        <p>{t.loginDesc}</p>
        <input type="password" placeholder={t.password} value={pw} onChange={(e) => { setPw(e.target.value); setErr(''); }} autoFocus autoComplete="current-password" />
        {err && <p className="ad-err">{err}</p>}
        <button type="submit" className="ad-btn ad-btn--block">{t.loginBtn}</button>
        <a href="/" className="ad-back"><ArrowLeft size={14} /> {t.backToSite}</a>
      </form>
    </div>
  );
}

/* ─── Main ────────────────────────────────────────────── */
export default function Admin() {
  const [authed, setAuthed] = useState(DEMO);
  const [checkingAuth, setCheckingAuth] = useState(!DEMO);
  const [tab, setTab] = useState('overview');
  const [range, setRange] = useState(30);
  const [events, setEvents] = useState([]);
  const [daily, setDaily] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loadedAt, setLoadedAt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [lang, setLang] = useState(() => localStorage.getItem(LANG_KEY) || 'de');
  const [navOpen, setNavOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(RAIL_KEY) === '1');
  const t = T[lang] || T.de;
  const toggleCollapsed = () => setCollapsed((c) => { localStorage.setItem(RAIL_KEY, c ? '0' : '1'); return !c; });

  const changeLang = (l) => { setLang(l); localStorage.setItem(LANG_KEY, l); };
  const goTab = (next) => { setTab(next); setNavOpen(false); };
  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    document.title = `Noon · ${t[tab]}`;
  }, [t, tab]);

  useEffect(() => {
    if (!navOpen) return undefined;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [navOpen]);

  useEffect(() => {
    if (DEMO) return;
    fetch('/api/admin/status')
      .then((response) => response.json())
      .then((data) => setAuthed(Boolean(data.authenticated)))
      .catch(() => setAuthed(false))
      .finally(() => setCheckingAuth(false));
  }, []);

  // Signing in marks this browser as internal, so our own visits are not counted.
  useEffect(() => {
    if (authed && localStorage.getItem(INTERNAL_KEY) === null) localStorage.setItem(INTERNAL_KEY, '1');
  }, [authed]);

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    const load = DEMO
      ? import('./admin/demo.js').then((demo) => demo.demoAnalytics())
      : fetch('/api/admin/analytics?days=180').then((response) => {
        if (!response.ok) throw new Error('analytics unavailable');
        return response.json();
      });
    load
      .then((data) => {
        setEvents(data.events || []);
        setDaily(data.daily || []);
        setMeta(data.meta || null);
        setLoadedAt(Date.now());
      })
      .catch(() => { setEvents([]); setDaily([]); })
      .finally(() => setLoading(false));
  }, [authed, reloadKey]);

  if (checkingAuth) return <div className="ad-login"><div className="ad-login-box"><p>{t.checking}</p></div></div>;
  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} lang={lang} setLang={changeLang} />;

  const nav = [
    { key: 'overview', icon: LayoutDashboard },
    { key: 'search', icon: Search },
    { key: 'settings', icon: Settings },
  ];

  return (
    <div className="ad-root" dir={t.dir} lang={lang}>
      {navOpen && <div className="ad-backdrop" onClick={() => setNavOpen(false)} />}

      <aside className={`ad-sidebar${navOpen ? ' is-open' : ''}${collapsed ? ' is-collapsed' : ''}`}>
        <div className="ad-brand">
          <img src="/assets/logo2.png" alt="" height="34" />
          <div className="ad-brand-text"><strong>Noon</strong><span>Admin</span></div>
          <button type="button" className="ad-rail-toggle ad-only-desktop" aria-label={collapsed ? t.expand : t.collapse} data-tip={collapsed ? t.expand : t.collapse} onClick={toggleCollapsed}>
            {collapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
          </button>
          <button type="button" className="ad-rail-toggle ad-only-mobile" aria-label={t.menu} onClick={() => setNavOpen(false)}><X size={17} /></button>
        </div>
        <nav className="ad-nav">
          {nav.map(({ key, icon: Icon }) => (
            <button key={key} type="button" className={tab === key ? 'is-active' : ''} onClick={() => goTab(key)} data-tip={t[key]} aria-label={t[key]}>
              <Icon size={18} /> <span>{t[key]}</span>
            </button>
          ))}
        </nav>
        <div className="ad-sidebar-foot">
          <LangSwitch lang={lang} setLang={changeLang} />
          <button type="button" className="ad-nav-link ad-lang-cycle" data-tip={lang.toUpperCase()} aria-label="Language"
            onClick={() => changeLang({ de: 'en', en: 'ar', ar: 'de' }[lang])}>
            <Globe size={17} /> <span>{lang.toUpperCase()}</span>
          </button>
          <a href="/" className="ad-nav-link" data-tip={t.backToSite}><ArrowLeft size={17} /> <span>{t.backToSite}</span></a>
        </div>
      </aside>

      <main className="ad-main">
        <header className="ad-topbar">
          <button type="button" className="ad-icon-btn ad-only-mobile" aria-label={t.menu} aria-expanded={navOpen} onClick={() => setNavOpen(true)}><Menu size={20} /></button>
          <div className="ad-title">
            <h1>{t[tab]}</h1>
            <p>{t[`${tab}Sub`]}</p>
          </div>
          {tab !== 'settings' && (
            <div className="ad-range" role="group">
              {RANGES.map((d) => (
                <button key={d} type="button" className={range === d ? 'is-active' : ''} onClick={() => setRange(d)}>
                  {d} {t.daysShort}
                </button>
              ))}
            </div>
          )}
          <button type="button" className="ad-icon-btn" onClick={reload} aria-label={t.refresh} title={loadedAt ? `${t.updated}: ${new Date(loadedAt).toLocaleTimeString(numberLocale(t))}` : t.refresh}>
            <RefreshCw size={17} className={loading ? 'ad-spin' : ''} />
          </button>
        </header>

        <div className="ad-content">
          {tab === 'overview' && <OverviewTab daily={daily} events={events} range={range} t={t} lang={lang} />}
          {tab === 'search' && <SearchTab range={range} t={t} lang={lang} reloadKey={reloadKey} />}
          {tab === 'settings' && <SettingsTab t={t} meta={meta} onRebuilt={reload} />}
        </div>
      </main>
    </div>
  );
}
