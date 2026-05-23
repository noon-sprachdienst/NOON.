import { useState, useEffect } from 'react';

const ADMIN_AUTH_KEY = 'noon_admin_auth';
const ADMIN_PW_KEY   = 'noon_admin_pw';
const ANALYTICS_KEY  = 'noon_analytics';
const DEFAULT_PW     = 'noon2024';
const LANG_KEY       = 'noon_admin_lang';

/* ─── Translations ─────────────────────────────────────── */
const T = {
  en: {
    dir: 'ltr', loginTitle: 'Admin · Sign In', loginDesc: 'Enter the admin password to continue.',
    password: 'Password', wrongPw: 'Wrong password. Please try again.', loginBtn: 'Sign In',
    dashboard: 'Dashboard', settings: 'Settings', backToSite: 'Back to Website', adminPanel: 'Admin Panel',
    visits: 'Visits', activeDays: 'Active Days', topSource: 'Top Source', countriesReached: 'Countries Reached',
    visitsPerDay: 'Visits per Day', topPages: 'Top Pages', sources: 'Traffic Sources',
    languages: 'Languages', countryDist: 'Countries', deviceSplit: 'Device Split',
    today: 'today', yesterday: 'yesterday', period: 'Period:', days: 'days',
    noData: 'No data yet. Visit the website to start collecting analytics.',
    localNotice: 'Local preview — shows visits from this browser only.',
    totalEntries: 'total entries', desktop: 'Desktop', mobile: 'Mobile', tablet: 'Tablet',
    changePw: 'Change Password', newPw: 'New Password', confirmPw: 'Confirm Password',
    savePw: 'Save Password', pwSaved: '✓ Password saved.', pwShort: 'Min. 6 characters.',
    pwMismatch: 'Passwords do not match.', analyticsSetup: 'Google Analytics 4',
    analyticsHint: 'Full-site analytics runs on Google Analytics 4 — included in the SEO & Visibility package. Open GA4 to view real-time data across all visitors:',
    dataSession: 'Data & Session', clearData: 'Clear Local Data', logout: 'Sign Out',
    dataCleared: '✓ Data cleared.', confirmClear: 'Delete all local analytics data?',
    unknown: 'Unknown', noCountry: 'No country data yet',
  },
  ar: {
    dir: 'rtl', loginTitle: 'دخول المشرف', loginDesc: 'أدخل كلمة مرور المشرف للمتابعة.',
    password: 'كلمة المرور', wrongPw: 'كلمة المرور خاطئة. حاول مجدداً.', loginBtn: 'دخول',
    dashboard: 'لوحة التحكم', settings: 'الإعدادات', backToSite: 'العودة للموقع', adminPanel: 'المشرف',
    visits: 'الزيارات', activeDays: 'أيام نشطة', topSource: 'أهم المصادر', countriesReached: 'الدول',
    visitsPerDay: 'الزيارات اليومية', topPages: 'أهم الصفحات', sources: 'مصادر الزيارات',
    languages: 'اللغات', countryDist: 'توزيع الدول', deviceSplit: 'توزيع الأجهزة',
    today: 'اليوم', yesterday: 'أمس', period: 'الفترة:', days: 'يوم',
    noData: 'لا توجد بيانات بعد. زر الموقع لبدء جمع التحليلات.',
    localNotice: 'معاينة محلية — تعرض زيارات هذا المتصفح فقط.',
    totalEntries: 'إجمالي السجلات', desktop: 'كمبيوتر', mobile: 'جوال', tablet: 'تابلت',
    changePw: 'تغيير كلمة المرور', newPw: 'كلمة مرور جديدة', confirmPw: 'تأكيد كلمة المرور',
    savePw: 'حفظ', pwSaved: '✓ تم الحفظ.', pwShort: '٦ أحرف على الأقل.',
    pwMismatch: 'كلمتا المرور غير متطابقتين.', analyticsSetup: 'Google Analytics 4',
    analyticsHint: 'التحليلات الكاملة تعمل عبر Google Analytics 4 — مضمّن في حزمة SEO. افتح GA4 لعرض البيانات الفورية لجميع الزوار:',
    dataSession: 'البيانات والجلسة', clearData: 'حذف البيانات المحلية', logout: 'تسجيل الخروج',
    dataCleared: '✓ تم الحذف.', confirmClear: 'حذف جميع بيانات التحليلات؟',
    unknown: 'غير معروف', noCountry: 'لا توجد بيانات دول بعد',
  },
  de: {
    dir: 'ltr', loginTitle: 'Admin · Anmelden', loginDesc: 'Geben Sie das Admin-Passwort ein.',
    password: 'Passwort', wrongPw: 'Falsches Passwort. Bitte erneut versuchen.', loginBtn: 'Einloggen',
    dashboard: 'Dashboard', settings: 'Einstellungen', backToSite: 'Zur Website', adminPanel: 'Admin Panel',
    visits: 'Besuche', activeDays: 'Aktive Tage', topSource: 'Top Quelle', countriesReached: 'Länder',
    visitsPerDay: 'Besuche pro Tag', topPages: 'Top Seiten', sources: 'Quellen',
    languages: 'Sprachen', countryDist: 'Länder', deviceSplit: 'Geräteaufteilung',
    today: 'heute', yesterday: 'gestern', period: 'Zeitraum:', days: 'Tage',
    noData: 'Noch keine Daten. Besuchen Sie die Website, um die Analyse zu starten.',
    localNotice: 'Lokale Vorschau — zeigt nur Besuche aus diesem Browser.',
    totalEntries: 'Einträge gesamt', desktop: 'Desktop', mobile: 'Mobil', tablet: 'Tablet',
    changePw: 'Passwort ändern', newPw: 'Neues Passwort', confirmPw: 'Passwort bestätigen',
    savePw: 'Passwort speichern', pwSaved: '✓ Passwort gespeichert.', pwShort: 'Min. 6 Zeichen.',
    pwMismatch: 'Passwörter stimmen nicht überein.', analyticsSetup: 'Google Analytics 4',
    analyticsHint: 'Die vollständige Website-Analyse läuft über Google Analytics 4 — im SEO-Paket enthalten. GA4 öffnen, um Echtzeit-Daten aller Besucher anzuzeigen:',
    dataSession: 'Daten & Sitzung', clearData: 'Lokale Daten löschen', logout: 'Abmelden',
    dataCleared: '✓ Daten gelöscht.', confirmClear: 'Alle lokalen Analysedaten löschen?',
    unknown: 'Unbekannt', noCountry: 'Noch keine Länderdaten',
  },
};

/* ─── Country Data ──────────────────────────────────────── */
const COUNTRIES = {
  DE:{flag:'🇩🇪',name:{en:'Germany',ar:'ألمانيا',de:'Deutschland'}},
  AT:{flag:'🇦🇹',name:{en:'Austria',ar:'النمسا',de:'Österreich'}},
  CH:{flag:'🇨🇭',name:{en:'Switzerland',ar:'سويسرا',de:'Schweiz'}},
  EG:{flag:'🇪🇬',name:{en:'Egypt',ar:'مصر',de:'Ägypten'}},
  SA:{flag:'🇸🇦',name:{en:'Saudi Arabia',ar:'السعودية',de:'Saudi-Arabien'}},
  AE:{flag:'🇦🇪',name:{en:'UAE',ar:'الإمارات',de:'VAE'}},
  KW:{flag:'🇰🇼',name:{en:'Kuwait',ar:'الكويت',de:'Kuwait'}},
  IQ:{flag:'🇮🇶',name:{en:'Iraq',ar:'العراق',de:'Irak'}},
  JO:{flag:'🇯🇴',name:{en:'Jordan',ar:'الأردن',de:'Jordanien'}},
  LB:{flag:'🇱🇧',name:{en:'Lebanon',ar:'لبنان',de:'Libanon'}},
  SY:{flag:'🇸🇾',name:{en:'Syria',ar:'سوريا',de:'Syrien'}},
  TN:{flag:'🇹🇳',name:{en:'Tunisia',ar:'تونس',de:'Tunesien'}},
  DZ:{flag:'🇩🇿',name:{en:'Algeria',ar:'الجزائر',de:'Algerien'}},
  MA:{flag:'🇲🇦',name:{en:'Morocco',ar:'المغرب',de:'Marokko'}},
  LY:{flag:'🇱🇾',name:{en:'Libya',ar:'ليبيا',de:'Libyen'}},
  TR:{flag:'🇹🇷',name:{en:'Turkey',ar:'تركيا',de:'Türkei'}},
  GB:{flag:'🇬🇧',name:{en:'United Kingdom',ar:'المملكة المتحدة',de:'Großbritannien'}},
  FR:{flag:'🇫🇷',name:{en:'France',ar:'فرنسا',de:'Frankreich'}},
  ES:{flag:'🇪🇸',name:{en:'Spain',ar:'إسبانيا',de:'Spanien'}},
  IT:{flag:'🇮🇹',name:{en:'Italy',ar:'إيطاليا',de:'Italien'}},
  NL:{flag:'🇳🇱',name:{en:'Netherlands',ar:'هولندا',de:'Niederlande'}},
  BE:{flag:'🇧🇪',name:{en:'Belgium',ar:'بلجيكا',de:'Belgien'}},
  PL:{flag:'🇵🇱',name:{en:'Poland',ar:'بولندا',de:'Polen'}},
  UA:{flag:'🇺🇦',name:{en:'Ukraine',ar:'أوكرانيا',de:'Ukraine'}},
  RU:{flag:'🇷🇺',name:{en:'Russia',ar:'روسيا',de:'Russland'}},
  US:{flag:'🇺🇸',name:{en:'United States',ar:'الولايات المتحدة',de:'USA'}},
  CA:{flag:'🇨🇦',name:{en:'Canada',ar:'كندا',de:'Kanada'}},
  BR:{flag:'🇧🇷',name:{en:'Brazil',ar:'البرازيل',de:'Brasilien'}},
  AU:{flag:'🇦🇺',name:{en:'Australia',ar:'أستراليا',de:'Australien'}},
  XX:{flag:'🌐',name:{en:'Other',ar:'أخرى',de:'Andere'}},
};

function countryName(code, lang) {
  const c = COUNTRIES[code];
  if (!c) return code;
  return c.name[lang] || c.name.en || code;
}
function countryFlag(code) { return COUNTRIES[code]?.flag || '🌐'; }

/* ─── Helpers ──────────────────────────────────────────── */
function getDomain(ref) {
  if (!ref || ref === 'direct') return 'Direct';
  try { return new URL(ref).hostname.replace(/^www\./, ''); } catch { return ref.slice(0, 30); }
}
function dayKey(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function todayKey() { return dayKey(Date.now()); }
function last30Days() {
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    days.push(dayKey(d.getTime()));
  }
  return days;
}
function groupBy(arr, fn) {
  return arr.reduce((acc, item) => { const k = fn(item); acc[k] = (acc[k]||0)+1; return acc; }, {});
}
function topN(obj, n = 5) {
  return Object.entries(obj).sort((a,b) => b[1]-a[1]).slice(0,n);
}

/* ─── Sub-components ────────────────────────────────────── */
function StatCard({ icon, value, label, sub, accent }) {
  return (
    <div className="adm-stat-card" style={{ borderLeftColor: accent || '#A4192C' }}>
      <div className="adm-stat-icon" style={{ color: accent || '#A4192C' }}>{icon}</div>
      <div className="adm-stat-val">{value}</div>
      <div className="adm-stat-label">{label}</div>
      {sub && <div className="adm-stat-sub">{sub}</div>}
    </div>
  );
}

function DonutChart({ segments }) {
  const total = segments.reduce((s, d) => s + d.value, 0);
  if (total === 0) return null;
  let cum = 0;
  const stops = segments.map(s => {
    const s1 = Math.round((cum / total) * 360);
    cum += s.value;
    const s2 = Math.round((cum / total) * 360);
    return `${s.color} ${s1}deg ${s2}deg`;
  }).join(', ');
  return (
    <div className="adm-donut-wrap">
      <div className="adm-donut" style={{ background: `conic-gradient(${stops})` }}>
        <div className="adm-donut-hole">
          <span className="adm-donut-total">{total}</span>
        </div>
      </div>
      <div className="adm-donut-legend">
        {segments.map(s => (
          <div key={s.label} className="adm-donut-leg-item">
            <span className="adm-donut-dot" style={{ background: s.color }} />
            <span className="adm-donut-leg-label">{s.label}</span>
            <span className="adm-donut-leg-val">{total > 0 ? Math.round((s.value / total) * 100) : 0}%</span>
            <span className="adm-donut-leg-count">({s.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="adm-bar-chart">
      {data.map((d) => (
        <div key={d.label} className="adm-bar-col" title={`${d.label}: ${d.value}`}>
          <div
            className="adm-bar-fill"
            style={{
              height: `${Math.max((d.value / max) * 100, d.value > 0 ? 6 : 0)}%`,
              background: d.value > 0
                ? 'linear-gradient(to top, #A4192C, #D4556A)'
                : '#F0F0F0',
            }}
          />
          <div className="adm-bar-tick">{d.shortLabel}</div>
        </div>
      ))}
    </div>
  );
}

function HorizBar({ label, value, max, color, flag }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="adm-hbar-row">
      {flag && <span className="adm-hbar-flag">{flag}</span>}
      <span className="adm-hbar-label">{label}</span>
      <div className="adm-hbar-track">
        <div className="adm-hbar-fill" style={{ width: `${pct}%`, background: color || '#A4192C' }} />
      </div>
      <span className="adm-hbar-val">{value}</span>
    </div>
  );
}

/* ─── Login ─────────────────────────────────────────────── */
function LoginScreen({ onLogin, lang, setLang }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const t = T[lang];
  const submit = (e) => {
    e.preventDefault();
    const stored = localStorage.getItem(ADMIN_PW_KEY) || DEFAULT_PW;
    if (pw === stored) { localStorage.setItem(ADMIN_AUTH_KEY, '1'); onLogin(); }
    else { setErr(t.wrongPw); setPw(''); }
  };
  return (
    <div className="adm-login" dir={t.dir}>
      <div className="adm-login-box">
        <div className="adm-login-lang">
          {['en','ar','de'].map(l => (
            <button key={l} className={`adm-lang-btn${lang===l?' active':''}`} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <img src="/assets/logo2.png" alt="Noon" height="40" style={{ filter:'brightness(0)', marginBottom:20 }} />
        <h1>{t.loginTitle}</h1>
        <p>{t.loginDesc}</p>
        <form onSubmit={submit}>
          <input type="password" placeholder={t.password} value={pw}
            onChange={e => { setPw(e.target.value); setErr(''); }} autoFocus autoComplete="current-password" />
          {err && <p className="adm-err">{err}</p>}
          <button type="submit">{t.loginBtn}</button>
        </form>
        <a href="/" className="adm-back-link">← {t.backToSite}</a>
      </div>
    </div>
  );
}

/* ─── Settings ──────────────────────────────────────────── */
function SettingsTab({ t, lang }) {
  const [newPw, setNewPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const savePw = (e) => {
    e.preventDefault();
    if (newPw.length < 6) { setMsg(t.pwShort); return; }
    if (newPw !== confirm) { setMsg(t.pwMismatch); return; }
    localStorage.setItem(ADMIN_PW_KEY, newPw);
    setMsg(t.pwSaved); setNewPw(''); setConfirm('');
  };
  const clearData = () => {
    if (window.confirm(t.confirmClear)) { localStorage.removeItem(ANALYTICS_KEY); setMsg(t.dataCleared); }
  };
  const logout = () => { localStorage.removeItem(ADMIN_AUTH_KEY); window.location.href = '/'; };
  return (
    <div className="adm-settings">
      <h3>{t.changePw}</h3>
      <form onSubmit={savePw} className="adm-settings-form">
        <label>{t.newPw}</label>
        <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder={t.pwShort} />
        <label>{t.confirmPw}</label>
        <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder={t.pwShort} />
        {msg && <p className={`adm-msg ${msg.startsWith('✓') ? 'ok' : 'err'}`}>{msg}</p>}
        <button type="submit" className="adm-btn-primary">{t.savePw}</button>
      </form>
      <hr className="adm-divider"/>
      <h3>{t.analyticsSetup}</h3>
      <p className="adm-hint">{t.analyticsHint}</p>
      <div className="adm-analytics-options">
        <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="adm-analytics-card adm-analytics-card--ga">
          <div className="adm-ga-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="12" width="4" height="10" rx="1" fill="#F9AB00"/>
              <rect x="10" y="6" width="4" height="16" rx="1" fill="#E37400"/>
              <rect x="18" y="2" width="4" height="20" rx="1" fill="#A8C7FA"/>
            </svg>
            <strong>Google Analytics 4</strong>
          </div>
          <span>Free · Full features · Cookie banner required (already included via DSGVO package)</span>
        </a>
      </div>
      <hr className="adm-divider"/>
      <h3>{t.dataSession}</h3>
      <div className="adm-danger-zone">
        <button type="button" className="adm-btn-danger" onClick={clearData}>{t.clearData}</button>
        <button type="button" className="adm-btn-secondary" onClick={logout}>{t.logout}</button>
      </div>
    </div>
  );
}

/* ─── Dashboard ─────────────────────────────────────────── */
function DashboardTab({ visits, t, lang }) {
  const [range, setRange] = useState(30);
  const cutoff   = Date.now() - range * 86400000;
  const filtered = visits.filter(v => v.ts >= cutoff);
  const today    = visits.filter(v => dayKey(v.ts) === todayKey());
  const yest     = visits.filter(v => {
    const d = new Date(); d.setDate(d.getDate()-1);
    return dayKey(v.ts) === dayKey(d.getTime());
  });
  const days30    = last30Days();
  const byDay     = groupBy(filtered, v => dayKey(v.ts));
  const chartData = days30.map(d => ({ label:d, shortLabel:d.slice(8), value: byDay[d]||0 }));
  const topPages  = topN(groupBy(filtered, v => v.path || '/'));
  const topRefs   = topN(groupBy(filtered, v => getDomain(v.ref)));
  const topLangs  = topN(groupBy(filtered, v => (v.lang||'de').slice(0,2).toUpperCase()), 5);
  const topCountries = topN(groupBy(filtered, v => v.country || 'XX'), 8);
  const devices   = groupBy(filtered, v => v.screen || v.device || 'desktop');
  const uniqueCountries = new Set(filtered.map(v => v.country).filter(Boolean)).size;
  const hasData   = filtered.length > 0;
  const hasCountryData = filtered.some(v => v.country);

  const deviceSegments = [
    { label: t.desktop, value: (devices.desktop||0), color: '#A4192C' },
    { label: t.mobile,  value: (devices.mobile||0),  color: '#D4556A' },
    { label: t.tablet,  value: (devices.tablet||0),  color: '#F0A0AA' },
  ].filter(s => s.value > 0);

  return (
    <div className="adm-dashboard">
      {/* Range */}
      <div className="adm-range-row">
        <span className="adm-range-label">{t.period}</span>
        {[7,14,30,90].map(d => (
          <button key={d} className={`adm-range-btn${range===d?' active':''}`} type="button" onClick={() => setRange(d)}>
            {d} {t.days}
          </button>
        ))}
      </div>

      {/* Notice */}
      <div className="adm-notice">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        {t.localNotice} &nbsp;·&nbsp; {visits.length} {t.totalEntries}
      </div>

      {/* Stat Cards */}
      <div className="adm-stat-grid">
        <StatCard
          accent="#A4192C"
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>}
          value={filtered.length.toLocaleString()}
          label={`${t.visits} (${range} ${t.days})`}
          sub={`${today.length} ${t.today} · ${yest.length} ${t.yesterday}`}
        />
        <StatCard
          accent="#1F4E79"
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
          value={Object.keys(byDay).length}
          label={t.activeDays}
          sub={`${range} ${t.days} ${t.period.replace(':','')}`}
        />
        <StatCard
          accent="#2D8A5A"
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>}
          value={uniqueCountries || '—'}
          label={t.countriesReached}
          sub={topCountries[0] ? `${countryFlag(topCountries[0][0])} ${countryName(topCountries[0][0], lang)}` : ''}
        />
        <StatCard
          accent="#D97706"
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
          value={topRefs[0]?.[0] || '—'}
          label={t.topSource}
          sub={topRefs[0] ? `${topRefs[0][1]} ${t.visits.toLowerCase()}` : ''}
        />
      </div>

      {!hasData ? (
        <div className="adm-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#DDD" strokeWidth="1.3"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
          <p>{t.noData}</p>
        </div>
      ) : (
        <>
          {/* Daily Bar Chart */}
          <div className="adm-chart-card">
            <div className="adm-section-title">{t.visitsPerDay}</div>
            <BarChart data={chartData} />
          </div>

          {/* Device Donut + Country Distribution side by side */}
          <div className="adm-two-col">
            <div className="adm-chart-card">
              <div className="adm-section-title">{t.deviceSplit}</div>
              {deviceSegments.length > 0
                ? <DonutChart segments={deviceSegments} />
                : <p style={{fontSize:13,color:'#AAA'}}>{t.noData}</p>
              }
            </div>

            <div className="adm-chart-card">
              <div className="adm-section-title">{t.countryDist}</div>
              {hasCountryData ? (
                topCountries.map(([code, cnt]) => (
                  <HorizBar
                    key={code}
                    flag={countryFlag(code)}
                    label={countryName(code, lang)}
                    value={cnt}
                    max={topCountries[0]?.[1] || 1}
                    color="#A4192C"
                  />
                ))
              ) : (
                <p style={{fontSize:12,color:'#AAA',lineHeight:1.6}}>{t.noCountry}</p>
              )}
            </div>
          </div>

          {/* Bottom grid: pages, sources, languages */}
          <div className="adm-bottom-grid">
            <div className="adm-bottom-card">
              <div className="adm-section-title">{t.topPages}</div>
              {topPages.map(([page, cnt]) => (
                <HorizBar key={page} label={page} value={cnt} max={topPages[0]?.[1]||1} color="#1F4E79" />
              ))}
            </div>
            <div className="adm-bottom-card">
              <div className="adm-section-title">{t.sources}</div>
              {topRefs.map(([ref, cnt]) => (
                <HorizBar key={ref} label={ref} value={cnt} max={topRefs[0]?.[1]||1} color="#A4192C" />
              ))}
            </div>
            <div className="adm-bottom-card">
              <div className="adm-section-title">{t.languages}</div>
              {topLangs.map(([l, cnt]) => (
                <HorizBar key={l} label={l} value={cnt} max={topLangs[0]?.[1]||1} color="#2D8A5A" />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Main Admin ─────────────────────────────────────────── */
export default function Admin() {
  const [authed, setAuthed] = useState(!!localStorage.getItem(ADMIN_AUTH_KEY));
  const [tab,    setTab]    = useState('dashboard');
  const [visits, setVisits] = useState([]);
  const [lang,   setLang]   = useState(() => localStorage.getItem(LANG_KEY) || 'en');

  const changeLang = (l) => { setLang(l); localStorage.setItem(LANG_KEY, l); };
  const t = T[lang];

  useEffect(() => {
    if (!authed) return;
    try {
      const raw = localStorage.getItem(ANALYTICS_KEY);
      if (raw) setVisits(JSON.parse(raw).visits || []);
    } catch {}
  }, [authed]);

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} lang={lang} setLang={changeLang} />;

  return (
    <div className="adm-root" dir={t.dir}>
      {/* Sidebar */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-logo">
          <img src="/assets/logo2.png" alt="Noon" height="30" style={{ filter:'brightness(0) invert(1)' }} />
        </div>

        {/* Language switcher */}
        <div className="adm-lang-switch">
          {['en','ar','de'].map(l => (
            <button key={l} className={`adm-lang-btn${lang===l?' active':''}`} onClick={() => changeLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <nav className="adm-nav">
          <button className={`adm-nav-item${tab==='dashboard'?' active':''}`} type="button" onClick={() => setTab('dashboard')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>{t.dashboard}</span>
          </button>
          <button className={`adm-nav-item${tab==='settings'?' active':''}`} type="button" onClick={() => setTab('settings')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>
            <span>{t.settings}</span>
          </button>
          <a href="/" className="adm-nav-item adm-nav-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            <span>{t.backToSite}</span>
          </a>
        </nav>
        <div className="adm-sidebar-badge">{t.adminPanel}</div>
      </aside>

      {/* Content */}
      <main className="adm-main">
        <div className="adm-topbar">
          <h1 className="adm-page-title">{tab === 'dashboard' ? t.dashboard : t.settings}</h1>
          <div className="adm-topbar-right">
            <span className="adm-live-dot" />
            <span style={{ fontSize:13, color:'#888' }}>{visits.length} {t.totalEntries}</span>
          </div>
        </div>
        <div className="adm-content">
          {tab === 'dashboard' && <DashboardTab visits={visits} t={t} lang={lang} />}
          {tab === 'settings'  && <SettingsTab t={t} lang={lang} />}
        </div>
      </main>
    </div>
  );
}
