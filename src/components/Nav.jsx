import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../hooks/useI18n';

export default function Nav() {
  const { t, lang, setLang, meta, LANG_META } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const switcherRef = useRef(null);
  const isHome = window.location.pathname === '/';
  const homeHref = (hash) => (isHome ? hash : `/${hash}`);

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
        <div className="nav-mobile-brand" aria-hidden="true">
          <img
            src="https://images.squarespace-cdn.com/content/v1/66f591a559efd00bfe77dfcb/ed3252eb-d5a4-4cef-a114-15b0bc7d976b/logo_transparent_background_6.png?format=1500w"
            alt="Noon Sprachdienst"
          />
        </div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href={homeHref('#services')}>{t('nav.services')}</a>
          <a href="/preise">{t('nav.prices')}</a>
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
                  onClick={() => { setLang(code); setLangOpen(false); }}
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
            href={homeHref('#contact')}
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
          <a href="/" onClick={closeMobile}>Home <span className="ar">→</span></a>
          <a href={homeHref('#services')} onClick={closeMobile}>{t('nav.services')} <span className="ar">→</span></a>
          <a href="/preise" onClick={closeMobile}>{t('nav.prices')} <span className="ar">→</span></a>
          <a href={homeHref('#branches')} onClick={closeMobile}>{t('nav.locations')} <span className="ar">→</span></a>
          <a href={homeHref('#faq')} onClick={closeMobile}>{t('nav.faq')} <span className="ar">→</span></a>
        </div>
        <div className="mobile-nav-sep"></div>
        <div className="mobile-nav-cta">
          <a
            href={homeHref('#contact')}
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
