import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import { getPricingPage, getPricingPathForLanguage, getSeoPathForLanguage } from '../data/seoPages.js';

const APPLICATION_LABEL = {
  de: 'Bewerbung',
  en: 'Apply',
  ar: 'التقديم',
  tr: 'Başvuru',
  ru: 'Заявка',
  fr: 'Candidature',
  uk: 'Заявка',
};

export default function Nav() {
  const { t, lang, setLang, meta, LANG_META } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const switcherRef = useRef(null);
  const languageHomePaths = Object.keys(LANG_META).map((code) => `/${code}`);
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const isHome = currentPath === '/' || languageHomePaths.includes(currentPath);
  const localizedHome = lang === 'de' ? '/' : `/${lang}`;
  const localizePath = (path, code = lang) => (code === 'de' ? path : `/${code}${path}`);
  const stripLanguagePrefix = (value) => {
    const clean = value.replace(/\/+$/, '') || '/';
    const match = clean.match(/^\/(de|en|ar|tr|ru|fr|uk)(\/.*)?$/);
    return match ? (match[2] || '/') : clean;
  };
  const simpleRoutePaths = ['/angebot', '/quote', '/termin', '/termin-anfragen', '/appointment', '/bewerbung', '/leistungen', '/services', '/fachuebersetzungen', '/specialties'];
  const homeHref = (hash) => `${localizedHome}${hash}`;
  const servicesHref = localizePath('/leistungen');
  const pricesHref = getPricingPathForLanguage(lang);
  const applicationHref = localizePath('/bewerbung');
  const applicationLabel = APPLICATION_LABEL[lang] || APPLICATION_LABEL.de;
  const quoteHref = localizePath('/angebot');
  const switchLanguage = (code) => {
    setLang(code);
    setLangOpen(false);
    const currentSimpleRoute = stripLanguagePrefix(window.location.pathname);
    if (simpleRoutePaths.includes(currentSimpleRoute)) {
      const canonicalSimpleRoute = currentSimpleRoute === '/quote' ? '/angebot' : currentSimpleRoute === '/termin-anfragen' || currentSimpleRoute === '/appointment' ? '/termin' : currentSimpleRoute === '/services' ? '/leistungen' : currentSimpleRoute === '/specialties' ? '/fachuebersetzungen' : currentSimpleRoute;
      const nextSimpleRoute = localizePath(canonicalSimpleRoute, code);
      if (nextSimpleRoute !== window.location.pathname.replace(/\/+$/, '')) {
        window.history.pushState({}, '', nextSimpleRoute);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      return;
    }
    if (getPricingPage(window.location.pathname)) {
      const nextPricing = getPricingPathForLanguage(code);
      if (nextPricing !== window.location.pathname.replace(/\/+$/, '')) {
        window.history.pushState({}, '', nextPricing);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      return;
    }
    const nextPath = getSeoPathForLanguage(window.location.pathname, code);
    if (nextPath && nextPath !== window.location.pathname.replace(/\/+$/, '')) {
      window.history.pushState({}, '', nextPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }
    const current = window.location.pathname.replace(/\/+$/, '') || '/';
    if (current === '/' || languageHomePaths.includes(current)) {
      const nextHome = code === 'de' ? '/' : `/${code}`;
      if (nextHome !== current) {
        window.history.pushState({}, '', nextHome);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setLangOpen(false); setMobileOpen(false); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav className={`top${scrolled ? ' scrolled' : ''}`} aria-label="Hauptnavigation">
        <a href={localizedHome} className="nav-mobile-brand" aria-label="Noon Sprachdienst">
          <span>NOON</span><span className="dot">.</span>
        </a>

        <a href={localizedHome} className="nav-wordmark" aria-label="Noon Sprachdienst">
          <span>NOON</span><span className="dot">.</span>
        </a>

        <div className="nav-links">
          <a href={localizedHome}>{t('nav.home')}</a>
          <a href={servicesHref}>{t('nav.services')}</a>
          <a href={pricesHref}>{t('nav.prices')}</a>
          <a href={applicationHref}>{applicationLabel}</a>
          <a href={homeHref('#branches')}>{t('nav.locations')}</a>
          <a href={homeHref('#faq')}>{t('nav.faq')}</a>
        </div>

        <div className="nav-cta">
          <div className={`lang-switcher${langOpen ? ' open' : ''}`} ref={switcherRef}>
            <button
              type="button"
              className="lang-trigger"
              style={{ padding: '11px' }}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Sprache wechseln"
              onClick={(e) => { e.stopPropagation(); setLangOpen((v) => !v); }}
            >
              <span className="flag" aria-hidden="true">{meta.flag}</span>
              <span>{meta.code}</span>
              <span className="chev" aria-hidden="true"></span>
            </button>
            <div className="lang-menu" role="listbox">
              {Object.entries(LANG_META).map(([code, info]) => (
                <div
                  key={code}
                  role="option"
                  aria-selected={code === lang}
                  className={`lang-option${code === lang ? ' active' : ''}`}
                  onClick={() => switchLanguage(code)}
                >
                  <span className="flag" aria-hidden="true">{info.flag}</span>
                  <span className="label">{info.label}</span>
                  <svg className="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <a
            href={quoteHref}
            className="btn btn-primary btn-sm"
            style={{ fontWeight: 700, background: 'rgb(29, 226, 29)', color: 'white', padding: '12px 12px' }}
          >
            {t('nav.cta')}
          </a>

          <button
            type="button"
            className={`nav-hamburger${mobileOpen ? ' open' : ''}`}
            aria-label="Menü öffnen"
            aria-expanded={mobileOpen}
            onClick={(e) => { e.stopPropagation(); setMobileOpen((v) => !v); }}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`nav-mobile-overlay${mobileOpen ? ' open' : ''}`}>
        <div className="mobile-nav-links">
          <a href={localizedHome} onClick={closeMobile}>{t('nav.home')} <span className="ar">→</span></a>
          <a href={servicesHref} onClick={closeMobile}>{t('nav.services')} <span className="ar">→</span></a>
          <a href={pricesHref} onClick={closeMobile}>{t('nav.prices')} <span className="ar">→</span></a>
          <a href={applicationHref} onClick={closeMobile}>{applicationLabel} <span className="ar">→</span></a>
          <a href={homeHref('#branches')} onClick={closeMobile}>{t('nav.locations')} <span className="ar">→</span></a>
          <a href={homeHref('#faq')} onClick={closeMobile}>{t('nav.faq')} <span className="ar">→</span></a>
        </div>
        <div className="mobile-nav-sep"></div>
        <div className="mobile-nav-cta">
          <a
            href={quoteHref}
            className="btn btn-primary"
            style={{ fontWeight: 700, background: 'rgb(29, 226, 29)', color: 'white' }}
            onClick={closeMobile}
          >
            {t('nav.cta')}
          </a>
        </div>
      </div>
    </>
  );
}
