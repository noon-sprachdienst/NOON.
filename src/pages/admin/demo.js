// Generated sample data for the local design preview (/admin?demo in `npm run dev`).
// Only loaded in development; the numbers are invented.
import { dayKey } from './metrics.js';

function rand(seed) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

const PAGES = ['/', '/de/standorte/osnabrueck', '/angebot', '/preise', '/de/standorte/stuttgart', '/de/standorte/berlin', '/de/sprachen/arabisch', '/de/geburtsurkunde-uebersetzung', '/de/fuehrerschein-uebersetzung', '/de/standorte/kiel'];
const SOURCES = [['direct', 0.42], ['www.google.com', 0.38], ['l.wl.co', 0.08], ['www.bing.com', 0.04], ['noon-sprachdienst.de', 0.05], ['m.facebook.com', 0.03]];
const COUNTRIES = [['DE', 0.84], ['EG', 0.05], ['CH', 0.02], ['TR', 0.02], ['NL', 0.02], ['PL', 0.02], ['AT', 0.02], ['PT', 0.01]];
const CITIES = [['Stuttgart', 0.2], ['Berlin', 0.18], ['Osnabrück', 0.16], ['Hamburg', 0.1], ['Frankfurt am Main', 0.1], ['Essen', 0.08], ['Kiel', 0.08], ['Mainz', 0.1]];
const ACTIONS = [['quote_request', 0.32], ['whatsapp', 0.25], ['email', 0.15], ['quote_form_submit', 0.13], ['phone', 0.1], ['hero_translation', 0.05]];

function spread(total, weights, r) {
  const out = {};
  weights.forEach(([key, w]) => { const v = Math.round(total * w * (0.7 + r() * 0.6)); if (v) out[key] = v; });
  return out;
}

export function demoAnalytics() {
  const r = rand(42);
  const daily = [];
  for (let i = 179; i >= 0; i -= 1) {
    const date = new Date(Date.now() - i * 86400000);
    const weekday = (date.getDay() + 6) % 7;
    const trend = 1 + (179 - i) / 260;
    const base = (weekday >= 5 ? 14 : 34) * trend * (0.75 + r() * 0.5);
    const sessions = Math.round(base);
    const pageViews = Math.round(sessions * (2 + r()));
    const byHour = {};
    for (let h = 7; h <= 22; h += 1) {
      const peak = Math.exp(-((h - 11) ** 2) / 10) + 0.7 * Math.exp(-((h - 17) ** 2) / 8);
      const v = Math.round(pageViews * peak * 0.12 * (0.6 + r() * 0.8));
      if (v) byHour[`${weekday}-${h}`] = v;
    }
    daily.push({
      day: dayKey(date.getTime()),
      pageViews, sessions,
      byPath: spread(pageViews, PAGES.map((p, k) => [p, 0.3 / (k + 1)]), r),
      byLanding: spread(sessions, PAGES.map((p, k) => [p, 0.35 / (k + 1)]), r),
      bySource: spread(sessions, SOURCES, r),
      byReferrer: spread(pageViews, SOURCES, r),
      byCountry: spread(pageViews, COUNTRIES, r),
      byCity: spread(pageViews * 0.7, CITIES, r),
      byDevice: spread(pageViews, [['mobile', 0.68], ['desktop', 0.28], ['tablet', 0.04]], r),
      bySessionDevice: spread(sessions, [['mobile', 0.68], ['desktop', 0.28], ['tablet', 0.04]], r),
      byLanguage: spread(pageViews, [['DE', 0.82], ['EN', 0.07], ['AR', 0.05], ['UK', 0.03], ['RU', 0.02], ['TR', 0.01]], r),
      byBrowser: spread(pageViews, [['Chrome', 0.5], ['Safari', 0.43], ['Edge', 0.05]], r),
      byHour,
      ctaClicks: Math.round(sessions * 0.28),
      byAction: spread(sessions * 0.28, ACTIONS, r),
      durationSum: pageViews * (40 + Math.round(r() * 40)),
      durationCount: pageViews,
    });
  }
  const events = [];
  for (let s = 0; s < 12; s += 1) {
    const start = Date.now() - Math.round(r() * 40 * 3600000);
    const [country] = COUNTRIES[Math.floor(r() * 4)];
    const city = CITIES[Math.floor(r() * CITIES.length)][0];
    const base = { sessionId: `demo-${s}`, country, city: encodeURIComponent(city), device: r() > 0.3 ? 'mobile' : 'desktop', browser: r() > 0.5 ? 'Chrome' : 'Safari', referrer: r() > 0.5 ? 'google.com' : 'direct' };
    const count = 1 + Math.floor(r() * 4);
    for (let p = 0; p < count; p += 1) {
      const path = PAGES[Math.floor(r() * PAGES.length)];
      events.push({ ...base, id: `${s}-${p}-v`, type: 'page_view', path, ts: start + p * 40000 });
      events.push({ ...base, id: `${s}-${p}-l`, type: 'page_leave', path, durationSeconds: 10 + Math.round(r() * 80), ts: start + p * 40000 + 30000 });
    }
    if (r() > 0.6) events.push({ ...base, id: `${s}-c`, type: 'cta_click', action: ACTIONS[Math.floor(r() * 3)][0], path: '/angebot', ts: start + count * 40000 });
  }
  return { daily, events, meta: { rebuiltAt: Date.now() - 3600000 } };
}

const QUERIES = ['übersetzungsbüro osnabrück', 'beglaubigte übersetzung stuttgart', 'noon übersetzung', 'übersetzer arabisch deutsch', 'dolmetscher kiel', 'beglaubigte übersetzung kosten', 'übersetzungsbüro berlin', 'führerschein übersetzung', 'vereidigter übersetzer mainz', 'geburtsurkunde übersetzen'];

export function demoSearch(days) {
  const r = rand(7 + days);
  if (new URLSearchParams(window.location.search).get('demo') === 'setup') {
    return { configured: false, reason: 'api_disabled', serviceAccount: 'firebase-adminsdk-xxxxx@noon-sprachdienst.iam.gserviceaccount.com', site: 'sc-domain:noon-sprachdienst.de' };
  }
  const series = Array.from({ length: days }, (_, i) => {
    const day = dayKey(Date.now() - (days - i) * 86400000);
    const impressions = Math.round(1100 + i * 9 + r() * 400);
    return { day, impressions, clicks: Math.round(impressions * (0.006 + r() * 0.004)), position: 12 - i * 0.02 };
  });
  const clicks = series.reduce((s, d) => s + d.clicks, 0);
  const impressions = series.reduce((s, d) => s + d.impressions, 0);
  return {
    configured: true,
    site: 'sc-domain:noon-sprachdienst.de',
    range: { days },
    totals: { clicks, impressions, ctr: clicks / impressions, position: 11.4 },
    previousTotals: { clicks: Math.round(clicks * 0.82), impressions: Math.round(impressions * 0.9), ctr: (clicks * 0.82) / (impressions * 0.9), position: 13.1 },
    series,
    queries: QUERIES.map((key, i) => ({ key, clicks: Math.round(60 / (i + 1)), impressions: Math.round(900 / (i + 1) + r() * 200), ctr: 0.03 + r() * 0.05, position: 1.5 + i * 1.3 + r(), previousPosition: i === 4 ? null : 2 + i * 1.5 + r() * 2 })),
    pages: ['/de/standorte/osnabrueck/', '/', '/de/standorte/stuttgart/', '/angebot/', '/de/standorte/berlin/', '/de/sprachen/arabisch/'].map((key, i) => ({ key, clicks: Math.round(110 / (i + 1)), impressions: Math.round(7000 / (i + 1)), ctr: 0.015, position: 6 + i * 2.2 })),
    devices: [{ key: 'MOBILE', clicks: Math.round(clicks * 0.66) }, { key: 'DESKTOP', clicks: Math.round(clicks * 0.31) }, { key: 'TABLET', clicks: Math.round(clicks * 0.03) }],
    countries: [['deu', 0.9], ['egy', 0.03], ['aut', 0.02], ['che', 0.02], ['nld', 0.01]].map(([key, w]) => ({ key, clicks: Math.round(clicks * w) })),
    sitemaps: [{ path: 'https://www.noon-sprachdienst.de/sitemap.xml', submitted: 315, lastDownloaded: new Date(Date.now() - 86400000).toISOString(), errors: 0, warnings: 0 }],
  };
}
