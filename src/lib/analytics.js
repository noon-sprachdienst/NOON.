export const COOKIE_KEY = 'noon_cookie';
const SESSION_KEY = 'noon_analytics_session';
const CONSENT_EVENT = 'noonConsentChanged';
const SESSION_MAX_AGE = 24 * 60 * 60 * 1000;

let pageStartedAt = Date.now();
let currentPath = window.location.pathname || '/';

function hasAnalyticsConsent() {
  return localStorage.getItem(COOKIE_KEY) === 'all';
}

function readSession() {
  if (!hasAnalyticsConsent()) return null;
  try {
    const stored = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    if (stored?.id && Date.now() - stored.createdAt < SESSION_MAX_AGE) return stored.id;
  } catch {}

  const session = { id: crypto.randomUUID(), createdAt: Date.now() };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session.id;
}

function deviceType() {
  if (window.innerWidth < 768) return 'mobile';
  if (window.innerWidth < 1100) return 'tablet';
  return 'desktop';
}

function browserName() {
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return 'Edge';
  if (/Firefox\//.test(ua)) return 'Firefox';
  if (/Chrome\//.test(ua)) return 'Chrome';
  if (/Safari\//.test(ua)) return 'Safari';
  return 'Other';
}

function osName() {
  const ua = navigator.userAgent;
  if (/Windows/.test(ua)) return 'Windows';
  if (/Android/.test(ua)) return 'Android';
  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
  if (/Mac OS/.test(ua)) return 'macOS';
  if (/Linux/.test(ua)) return 'Linux';
  return 'Other';
}

function campaignName() {
  return new URLSearchParams(window.location.search).get('utm_campaign') || '';
}

export function trackEvent(type, extra = {}) {
  const sessionId = readSession();
  if (!sessionId) return;

  const payload = {
    type,
    sessionId,
    path: window.location.pathname || '/',
    referrer: document.referrer,
    siteLanguage: document.documentElement.lang,
    browserLanguage: navigator.language,
    device: deviceType(),
    browser: browserName(),
    os: osName(),
    campaign: campaignName(),
    ...extra,
  };

  const body = JSON.stringify(payload);
  if (type === 'page_leave' && navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics/event', new Blob([body], { type: 'application/json' }));
    return;
  }

  fetch('/api/analytics/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {});
}

function trackPageLeave() {
  const durationSeconds = Math.round((Date.now() - pageStartedAt) / 1000);
  if (durationSeconds > 0) trackEvent('page_leave', { path: currentPath, durationSeconds });
}

function trackPageView() {
  currentPath = window.location.pathname || '/';
  pageStartedAt = Date.now();
  trackEvent('page_view', { path: currentPath });
}

function actionFromLink(link) {
  const href = link.getAttribute('href') || '';
  if (href.startsWith('https://wa.me/')) return 'whatsapp';
  if (href.startsWith('tel:')) return 'phone';
  if (href.startsWith('mailto:')) return 'email';
  if (href.includes('#contact')) return 'quote_request';
  return '';
}

export function setConsent(value) {
  localStorage.setItem(COOKIE_KEY, value);
  if (value !== 'all') {
    localStorage.removeItem(SESSION_KEY);
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function initializeAnalytics() {
  const onConsent = (event) => {
    if (event.detail === 'all') trackPageView();
  };
  const onHistory = () => {
    trackPageLeave();
    trackPageView();
  };
  const onClick = (event) => {
    const marked = event.target.closest?.('[data-analytics-action]');
    if (marked) {
      trackEvent('cta_click', { action: marked.dataset.analyticsAction });
      return;
    }
    const link = event.target.closest?.('a[href]');
    const action = link ? actionFromLink(link) : '';
    if (action) trackEvent('cta_click', { action });
  };
  const onVisibility = () => {
    if (document.visibilityState === 'hidden') trackPageLeave();
    else {
      pageStartedAt = Date.now();
      currentPath = window.location.pathname || '/';
    }
  };

  window.addEventListener(CONSENT_EVENT, onConsent);
  window.addEventListener('popstate', onHistory);
  window.addEventListener('beforeunload', trackPageLeave);
  document.addEventListener('visibilitychange', onVisibility);
  document.addEventListener('click', onClick);

  if (hasAnalyticsConsent()) trackPageView();

  return () => {
    trackPageLeave();
    window.removeEventListener(CONSENT_EVENT, onConsent);
    window.removeEventListener('popstate', onHistory);
    window.removeEventListener('beforeunload', trackPageLeave);
    document.removeEventListener('visibilitychange', onVisibility);
    document.removeEventListener('click', onClick);
  };
}

export function notifyRouteChange() {
  trackPageLeave();
  trackPageView();
}
