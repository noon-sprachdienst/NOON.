import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeCircleCheck, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useI18n } from './hooks/useI18n';

import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import StatsStrip from './components/StatsStrip.jsx';
const Services = lazy(() => import('./components/Services.jsx'));
import Beratung from './components/Beratung.jsx';
const Pricing = lazy(() => import('./components/Pricing.jsx'));
const Branches = lazy(() => import('./components/Branches.jsx'));
const Testimonials = lazy(() => import('./components/Testimonials.jsx'));
const HowContact = lazy(() => import('./components/HowContact.jsx'));
const FAQ = lazy(() => import('./components/FAQ.jsx'));
import Footer from './components/Footer.jsx';
const Specialties = lazy(() => import('./pages/Specialties.jsx'));
const SeoLanding = lazy(() => import('./pages/SeoLanding.jsx'));
const Application = lazy(() => import('./pages/Application.jsx'));
const Appointment = lazy(() => import('./pages/Appointment.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
import CookieConsent from './components/CookieConsent.jsx';
import LegalModal from './components/LegalModal.jsx';
import { initializeAnalytics, notifyRouteChange } from './lib/analytics.js';
import { CONTACT } from './config/contact.js';
import { getCanonicalUrl, getLanguageAlternates, getPricingPage, getSeoPage, LANGUAGE_HOME_META, PRICE_PAGES, SEO_LANGUAGES, SEO_PATHS } from './data/seoPages.js';


const normalizePath = (value) => {
  const clean = value.replace(/\/+$/, '');
  return clean || '/';
};

const LANGUAGE_HOME_CODES = ['de', 'en', 'ar', 'tr', 'ru', 'fr', 'uk'];
const LANGUAGE_HOME_PATHS = LANGUAGE_HOME_CODES.map((code) => `/${code}`);
const SIMPLE_APP_PATHS = ['/angebot', '/quote', '/termin', '/termin-anfragen', '/appointment', '/bewerbung', '/leistungen', '/services', '/fachuebersetzungen', '/specialties'];
const LOCALIZED_SIMPLE_APP_PATHS = LANGUAGE_HOME_CODES.flatMap((code) => SIMPLE_APP_PATHS.map((simplePath) => `/${code}${simplePath}`));

const getSimpleRoute = (value) => {
  const clean = normalizePath(value);
  const [, code, rest = ''] = clean.match(/^\/(de|en|ar|tr|ru|fr|uk)(\/.*)?$/) || [];
  const innerPath = normalizePath(rest || '/');
  if (code && SIMPLE_APP_PATHS.includes(innerPath)) return { lang: code, path: innerPath };
  if (SIMPLE_APP_PATHS.includes(clean)) return { lang: null, path: clean };
  return { lang: null, path: clean };
};

const getLocalizedSimplePath = (simplePath, code) => (code === 'de' ? simplePath : `/${code}${simplePath}`);

const getSimpleAlternates = (simplePath) => Object.keys(SEO_LANGUAGES).map((code) => ({
  lang: SEO_LANGUAGES[code].html,
  href: getCanonicalUrl(getLocalizedSimplePath(simplePath, code)),
}));

const META_BY_LANG = LANGUAGE_HOME_META;

const REQUEST_PAGE = {
  title: 'Kostenloses Angebot anfordern | NOON. Sprachdienst',
  description: 'Senden Sie Ihre Anfrage für Übersetzung oder Dolmetschen. NOON. Sprachdienst prüft Ihre Angaben und erstellt ein kostenloses Angebot.',
};

const APPLICATION_PAGE = {
  title: 'Bewerbung einreichen | NOON. Sprachdienst',
  description: 'Bewerben Sie sich als Dolmetscher, Uebersetzer oder Sprachmittler im Netzwerk von NOON. Sprachdienst.',
};

const NOT_FOUND_META = {
  de: { title: 'Seite nicht gefunden (404) | NOON. Sprachdienst', description: 'Die angeforderte Seite existiert nicht oder wurde verschoben.' },
  en: { title: 'Page not found (404) | NOON. Sprachdienst', description: 'The page you requested does not exist or has been moved.' },
  ar: { title: 'الصفحة غير موجودة (404) | NOON. Sprachdienst', description: 'الصفحة المطلوبة غير موجودة أو تم نقلها.' },
  tr: { title: 'Sayfa bulunamadı (404) | NOON. Sprachdienst', description: 'İstediğiniz sayfa mevcut değil veya taşınmış.' },
  ru: { title: 'Страница не найдена (404) | NOON. Sprachdienst', description: 'Запрошенная страница не существует или была перемещена.' },
  fr: { title: 'Page introuvable (404) | NOON. Sprachdienst', description: 'La page demandée n’existe pas ou a été déplacée.' },
  uk: { title: 'Сторінку не знайдено (404) | NOON. Sprachdienst', description: 'Запитувана сторінка не існує або була переміщена.' },
};

export default function App() {
  const { lang, meta, setLang } = useI18n();
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const seoPage = getSeoPage(path);
  const pricingPage = getPricingPage(path);
  const simpleRoute = getSimpleRoute(path);
  const languageHomeLang = LANGUAGE_HOME_CODES.includes(path.slice(1)) ? path.slice(1) : null;
  const isRequestPage = simpleRoute.path === '/angebot' || simpleRoute.path === '/quote';
  const isAppointmentPage = simpleRoute.path === '/termin' || simpleRoute.path === '/termin-anfragen' || simpleRoute.path === '/appointment';
  const isApplicationPage = simpleRoute.path === '/bewerbung';
  const isServicesPage = simpleRoute.path === '/leistungen' || simpleRoute.path === '/services';
  const isPricingPage = !!pricingPage;
  const isSpecialtiesPage = simpleRoute.path === '/fachuebersetzungen' || simpleRoute.path === '/specialties';
  const isHome = path === '/' || !!languageHomeLang;
  const isNotFound = !(seoPage || isRequestPage || isAppointmentPage || isApplicationPage || isServicesPage || isPricingPage || isSpecialtiesPage || isHome);
  const simpleCanonicalPath = isRequestPage ? '/angebot' : isAppointmentPage ? '/termin' : isApplicationPage ? '/bewerbung' : isServicesPage ? '/leistungen' : isSpecialtiesPage ? '/fachuebersetzungen' : null;
  const m = seoPage || (isNotFound ? (NOT_FOUND_META[lang] || NOT_FOUND_META.de) : isRequestPage ? REQUEST_PAGE : isAppointmentPage ? REQUEST_PAGE : isApplicationPage ? APPLICATION_PAGE : isPricingPage ? pricingPage : META_BY_LANG[languageHomeLang || lang] || META_BY_LANG.de);
  const canonicalUrl = getCanonicalUrl(seoPage?.path || pricingPage?.path || (simpleCanonicalPath ? getLocalizedSimplePath(simpleCanonicalPath, simpleRoute.lang || lang) : languageHomeLang ? (languageHomeLang === 'de' ? '/' : `/${languageHomeLang}`) : '/'));
  const languageAlternates = seoPage ? getLanguageAlternates(seoPage) : (pricingPage ? PRICE_PAGES.map((page) => ({
    lang: SEO_LANGUAGES[page.lang].html,
    href: getCanonicalUrl(page.path),
  })) : (simpleCanonicalPath ? getSimpleAlternates(simpleCanonicalPath) : ((languageHomeLang || path === '/') ? Object.keys(SEO_LANGUAGES).map((code) => ({
    lang: SEO_LANGUAGES[code].html,
    href: getCanonicalUrl(code === 'de' ? '/' : `/${code}`),
  })) : [])));

  useEffect(() => {
    document.documentElement.lang = meta.html;
    document.documentElement.dir = meta.dir;
  }, [meta]);

  useEffect(() => {
    if (seoPage?.lang && lang !== seoPage.lang) setLang(seoPage.lang);
    else if (pricingPage?.lang && lang !== pricingPage.lang) setLang(pricingPage.lang);
    else if (simpleRoute.lang && lang !== simpleRoute.lang) setLang(simpleRoute.lang);
    else if (languageHomeLang && lang !== languageHomeLang) setLang(languageHomeLang);
  }, [seoPage, pricingPage, simpleRoute.lang, languageHomeLang, lang, setLang]);

  useEffect(() => initializeAnalytics(), []);

  useEffect(() => {
    const scrollToCurrentHash = (attempts = 12) => {
      const hash = window.location.hash;
      if (!hash) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (attempts > 0) {
        window.setTimeout(() => scrollToCurrentHash(attempts - 1), 50);
      }
    };

    const onPopState = () => {
      setPath(normalizePath(window.location.pathname));
      setTimeout(scrollToCurrentHash, 0);
    };

    const onClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;

      const link = event.target.closest?.('a[href]');
      if (!link || link.target || link.hasAttribute('download')) return;

      const url = new URL(link.href, window.location.href);
      const current = new URL(window.location.href);
      if (url.origin !== current.origin) return;
      const nextPathname = normalizePath(url.pathname);
      if (!['/', ...LANGUAGE_HOME_PATHS, ...SIMPLE_APP_PATHS, ...LOCALIZED_SIMPLE_APP_PATHS, '/pricing', ...PRICE_PAGES.map((page) => page.path), ...SEO_PATHS].includes(nextPathname)) return;

      event.preventDefault();
      const next = `${nextPathname}${url.search}${url.hash}`;
      const currentPath = `${current.pathname}${current.search}${current.hash}`;
      if (next !== currentPath) window.history.pushState({}, '', next);
      setPath(nextPathname);
      notifyRouteChange();
      setTimeout(scrollToCurrentHash, 0);
    };

    window.addEventListener('popstate', onPopState);
    document.addEventListener('click', onClick);
    setTimeout(scrollToCurrentHash, 0);
    return () => {
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('click', onClick);
    };
  }, []);

  // Disable all CSS transitions during window resize to prevent glitching
  useEffect(() => {
    let timer;
    const onResize = () => {
      document.body.classList.add('is-resizing');
      clearTimeout(timer);
      timer = setTimeout(() => document.body.classList.remove('is-resizing'), 200);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => { window.removeEventListener('resize', onResize); clearTimeout(timer); };
  }, []);

  // Global scroll-reveal
  useEffect(() => {
    let mutationObserver;
    const revealTimers = [];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    const addTargets = () => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => obs.observe(el));
    };
    addTargets();
    [0, 80, 200, 500, 900].forEach((delay) => {
      revealTimers.push(setTimeout(addTargets, delay));
    });

    const revealRoot = document.querySelector('main') || document.body;
    if (revealRoot) {
      mutationObserver = new MutationObserver(addTargets);
      mutationObserver.observe(revealRoot, { childList: true, subtree: true });
    }

    return () => {
      revealTimers.forEach(clearTimeout);
      mutationObserver?.disconnect();
      obs.disconnect();
    };
  }, [lang, path]);

  return (
    <>
      <Helmet htmlAttributes={{ lang: meta.html, dir: meta.dir }}>
        <title>{m.metaTitle || m.title}</title>
        <meta name="description" content={m.description} />
        <meta name="robots" content={isNotFound ? 'noindex, follow' : 'index, follow'} />
        <meta property="og:title" content={m.metaTitle || m.title} />
        <meta property="og:description" content={m.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:title" content={m.metaTitle || m.title} />
        <meta name="twitter:description" content={m.description} />
        <link rel="canonical" href={canonicalUrl} />
        {languageAlternates.map((item) => (
          <link key={item.lang} rel="alternate" hrefLang={item.lang} href={item.href} />
        ))}
        {seoPage && <link rel="alternate" hrefLang="x-default" href={getCanonicalUrl('/de/beglaubigte-uebersetzungen')} />}
        {!seoPage && (languageHomeLang || path === '/') && <link rel="alternate" hrefLang="x-default" href={getCanonicalUrl('/')} />}
      </Helmet>

      <Nav />

      <main className={isRequestPage ? 'quote-page' : isAppointmentPage ? 'appointment-page-main' : isApplicationPage ? 'application-page-main' : isServicesPage ? 'services-page' : isPricingPage ? 'pricing-page' : isSpecialtiesPage ? 'specialty-page-main' : undefined}>
        <Suspense fallback={<div className="route-loading" aria-live="polite" />}>
        {seoPage ? (
          <SeoLanding page={seoPage} />
        ) : isRequestPage ? (
          <HowContact />
        ) : isAppointmentPage ? (
          <Appointment />
        ) : isApplicationPage ? (
          <Application />
        ) : isServicesPage ? (
          <Services />
        ) : isPricingPage ? (
          <Pricing />
        ) : isSpecialtiesPage ? (
          <Specialties />
        ) : isNotFound ? (
          <NotFound />
        ) : (
          <>
            <Hero />
             <Beratung />
            <StatsStrip />
            <Specialties />
            <Branches />
            <Testimonials />
            <FAQ />
            <HowContact />
          </>
        )}
        </Suspense>
      </main>

      <Footer />

      {/* Floating buttons */}
      <FloatingButtons />

      {/* Cookie consent banner */}
      <CookieConsent />

      {/* Legal modals — Impressum / Datenschutz / AGB */}
      <LegalModal />
    </>
  );
}

function FloatingButtons() {
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const phoneMenuRef = useRef(null);
  const floatingPhoneNumbers = CONTACT.phones;

  useEffect(() => {
    if (!phoneMenuOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (phoneMenuRef.current?.contains(event.target)) return;
      setPhoneMenuOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [phoneMenuOpen]);

  return (
    <>
      {/* WhatsApp */}
      <a
        href={CONTACT.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fab-wa"
        aria-label="WhatsApp Chat starten"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="fab-icon fab-icon-whatsapp" />
      </a>

      {/* Phone */}
      <div ref={phoneMenuRef}>
      <button
        type="button"
        className="fab-phone"
        aria-label="Telefonnummer auswählen"
        aria-expanded={phoneMenuOpen}
        data-analytics-action="phone_menu"
        onClick={() => setPhoneMenuOpen((open) => !open)}
      >
        <FontAwesomeIcon icon={faPhoneVolume} className="fab-icon" />
      </button>
      {phoneMenuOpen && (
        <div className="fab-phone-menu" role="menu" aria-label="Telefonnummer auswählen">
          {floatingPhoneNumbers.map((phone) => (
            <a key={phone.href} href={phone.href} role="menuitem" onClick={() => setPhoneMenuOpen(false)}>
              {phone.label}
            </a>
          ))}
        </div>
      )}
      </div>

      {/* Email */}
      <a href={`mailto:${CONTACT.email}`} className="fab-email" aria-label="E-Mail senden">
        <FontAwesomeIcon icon={faEnvelopeCircleCheck} className="fab-icon" />
      </a>

      <FabTop />
    </>
  );
}

function FabTop() {
  useEffect(() => {
    const btn = document.getElementById('noon-fab-top');
    if (!btn) return;
    const onScroll = () => {
      if (window.scrollY > 600) btn.classList.add('visible');
      else btn.classList.remove('visible');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      id="noon-fab-top"
      className="fab-top"
      type="button"
      aria-label="Nach oben"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}

