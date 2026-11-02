// Turns the daily summary documents ({ day, pageViews, byPath: {...}, ... }) into
// the numbers the dashboard shows, for the chosen period and the period before it.

const DAY_MS = 86400000;
const berlinDay = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit' });

export function dayKey(ms) {
  return berlinDay.format(new Date(ms));
}

export function dayList(days, endMs = Date.now()) {
  return Array.from({ length: days }, (_, i) => dayKey(endMs - (days - 1 - i) * DAY_MS));
}

export function normalizePath(path) {
  const clean = String(path || '/');
  return clean.length > 1 ? clean.replace(/\/+$/, '') || '/' : '/';
}

export function decodeCity(city) {
  try { return decodeURIComponent(city || ''); } catch { return city || ''; }
}

// AI assistants and AI search engines, by referrer host. Checked before the Google
// and Bing rules, because Gemini and Copilot live on Google/Bing domains.
const AI_RULES = [
  [/(^|\.)chatgpt\.com$|(^|\.)openai\.com$/, 'ChatGPT'],
  [/(^|\.)perplexity\.ai$/, 'Perplexity'],
  [/^(gemini|bard)\.google\.com$/, 'Gemini'],
  [/(^|\.)claude\.ai$/, 'Claude'],
  [/^copilot\.microsoft\.com$|^copilot\.cloud\.microsoft$|^edgeservices\.bing\.com$/, 'Copilot'],
  [/(^|\.)deepseek\.com$/, 'DeepSeek'],
  [/^chat\.mistral\.ai$/, 'Mistral'],
  [/(^|\.)grok\.com$/, 'Grok'],
  [/(^|\.)meta\.ai$/, 'Meta AI'],
  [/(^|\.)you\.com$/, 'You.com'],
  [/(^|\.)phind\.com$/, 'Phind'],
];
export const AI_SOURCES = new Set(AI_RULES.map(([, name]) => name));

// Groups referrer hosts into the sources people recognise.
export function sourceName(host) {
  const h = String(host || '').toLowerCase().replace(/^www\./, '');
  if (!h || h === 'direct') return 'direct';
  // Our own site, Vercel preview links and local testing are not real sources.
  if (h.endsWith('noon-sprachdienst.de') || h.endsWith('.vercel.app') || /^(localhost|127\.0\.0\.1)/.test(h)) return null;
  const ai = AI_RULES.find(([rule]) => rule.test(h));
  if (ai) return ai[1];
  if (/(^|\.)google\./.test(h)) return 'Google';
  if (/l\.wl\.co|wa\.me|whatsapp/.test(h)) return 'WhatsApp';
  if (/bing\.com/.test(h)) return 'Bing';
  if (/facebook|fb\.com/.test(h)) return 'Facebook';
  if (/instagram/.test(h)) return 'Instagram';
  if (/duckduckgo/.test(h)) return 'DuckDuckGo';
  if (/yahoo/.test(h)) return 'Yahoo';
  return h;
}

export function sumField(docs, field) {
  return docs.reduce((total, doc) => total + (doc[field] || 0), 0);
}

export function sumMap(docs, field, rename = (k) => k) {
  return docs.reduce((acc, doc) => {
    Object.entries(doc[field] || {}).forEach(([k, v]) => {
      const key = rename(k);
      if (key !== null && key !== '') acc[key] = (acc[key] || 0) + v;
    });
    return acc;
  }, {});
}

export function topN(obj, n = 6) {
  return Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n);
}

function pct(current, previous) {
  if (!previous) return null;
  return ((current - previous) / previous) * 100;
}

function periodStats(docs) {
  const pageViews = sumField(docs, 'pageViews');
  const sessionsKnown = docs.length > 0 && docs.every((doc) => !doc.pageViews || typeof doc.sessions === 'number');
  const sessions = sumField(docs, 'sessions');
  const durationCount = sumField(docs, 'durationCount');
  return {
    pageViews,
    sessions: sessionsKnown ? sessions : null,
    cta: sumField(docs, 'ctaClicks'),
    avgDuration: durationCount ? Math.round(sumField(docs, 'durationSum') / durationCount) : 0,
  };
}

export function buildMetrics(daily, range) {
  const byDay = Object.fromEntries(daily.map((doc) => [doc.day, doc]));
  const days = dayList(range);
  const prevDays = dayList(range, Date.now() - range * DAY_MS);
  const docs = days.map((d) => byDay[d]).filter(Boolean);
  const prevDocs = prevDays.map((d) => byDay[d]).filter(Boolean);

  const current = periodStats(docs);
  const previous = periodStats(prevDocs);
  const hasPrevious = prevDocs.some((doc) => doc.pageViews > 0);

  // Sources: per visit when available (bySource), otherwise per page view (older days).
  const sources = docs.reduce((acc, doc) => {
    const map = doc.bySource || doc.byReferrer || {};
    Object.entries(map).forEach(([host, v]) => {
      const key = sourceName(host);
      if (key) acc[key] = (acc[key] || 0) + v;
    });
    return acc;
  }, {});

  const heat = sumMap(docs, 'byHour');
  const series = days.map((d) => ({
    day: d,
    pageViews: byDay[d]?.pageViews || 0,
    sessions: typeof byDay[d]?.sessions === 'number' ? byDay[d].sessions : null,
    cta: byDay[d]?.ctaClicks || 0,
    avgDuration: byDay[d]?.durationCount ? Math.round(byDay[d].durationSum / byDay[d].durationCount) : 0,
  }));

  return {
    days,
    current,
    previous: hasPrevious ? previous : null,
    delta: {
      sessions: hasPrevious && current.sessions !== null && previous.sessions ? pct(current.sessions, previous.sessions) : null,
      pageViews: hasPrevious ? pct(current.pageViews, previous.pageViews) : null,
      cta: hasPrevious ? pct(current.cta, previous.cta) : null,
      avgDuration: hasPrevious ? pct(current.avgDuration, previous.avgDuration) : null,
    },
    series,
    pages: topN(sumMap(docs, 'byPath', normalizePath), 8),
    landing: topN(sumMap(docs, 'byLanding', normalizePath), 8),
    sources: topN(sources, 6),
    // AI assistants are listed separately so small counts are never cut off by the top 6.
    aiSources: topN(Object.fromEntries(Object.entries(sources).filter(([k]) => AI_SOURCES.has(k))), AI_SOURCES.size),
    devices: sumMap(docs, docs.every((d) => d.bySessionDevice) ? 'bySessionDevice' : 'byDevice'),
    countries: topN(sumMap(docs, 'byCountry'), 8),
    cities: topN(sumMap(docs, 'byCity', decodeCity), 8),
    languages: topN(sumMap(docs, 'byLanguage'), 6),
    actions: topN(sumMap(docs, 'byAction'), 7),
    heat,
    hasHeat: Object.keys(heat).length > 0,
    needsRebuild: docs.some((doc) => doc.pageViews > 0 && typeof doc.sessions !== 'number'),
  };
}

// Raw events of the last 48 hours → visits with the pages actually opened.
export function buildSessions(events, limit = 10) {
  const sessions = new Map();
  [...events].sort((a, b) => (a.ts || 0) - (b.ts || 0)).forEach((event) => {
    const key = event.sessionId || event.id;
    if (!sessions.has(key)) {
      sessions.set(key, { id: key, start: event.ts, end: event.ts, pages: [], duration: 0, cta: [], country: event.country, city: decodeCity(event.city), device: event.device, browser: event.browser, referrer: event.referrer });
    }
    const s = sessions.get(key);
    s.end = Math.max(s.end || 0, event.ts || 0);
    if (event.type === 'page_view') {
      const path = normalizePath(event.path);
      if (s.pages[s.pages.length - 1] !== path) s.pages.push(path);
    } else if (event.type === 'page_leave') {
      s.duration += event.durationSeconds || 0;
    } else if (event.type === 'cta_click' && event.action) {
      s.cta.push(event.action);
    }
  });
  return [...sessions.values()]
    .filter((s) => s.pages.length > 0)
    .sort((a, b) => (b.end || 0) - (a.end || 0))
    .slice(0, limit);
}
