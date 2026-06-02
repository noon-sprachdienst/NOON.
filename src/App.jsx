import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useI18n } from './hooks/useI18n';

import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Feature2 from './components/Feature2.jsx';
import Feature3 from './components/Feature3.jsx';
import StatsStrip from './components/StatsStrip.jsx';
import Services from './components/Services.jsx';
import Beratung from './components/Beratung.jsx';
import Pricing from './components/Pricing.jsx';
import Branches from './components/Branches.jsx';
import Testimonials from './components/Testimonials.jsx';
import HowContact from './components/HowContact.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';
import Specialties from './pages/Specialties.jsx';
import CookieConsent from './components/CookieConsent.jsx';
import LegalModal from './components/LegalModal.jsx';
import { initializeAnalytics, notifyRouteChange } from './lib/analytics.js';
import { CONTACT } from './config/contact.js';


const normalizePath = (value) => {
  const clean = value.replace(/\/+$/, '');
  return clean || '/';
};

const META_BY_LANG = {
  de: {
    title: 'Noon Sprachdienst — Beglaubigte Übersetzungen & Dolmetschen in 75+ Sprachen',
    description: 'Beglaubigte Übersetzungen, Dolmetschdienste und Sprachförderung in 75+ Sprachen — von beeidigten Profis, deutschlandweit seit 2009.',
  },
  en: {
    title: 'Noon Sprachdienst — Certified Translations & Interpreting in 75+ Languages',
    description: 'Certified translations, interpreting and language support in 75+ languages — by sworn professionals, across Germany since 2009.',
  },
  ar: {
    title: 'نون للخدمات اللغوية — ترجمات معتمدة وترجمة فورية بأكثر من 75 لغة',
    description: 'ترجمات معتمدة، خدمات الترجمة الفورية والدعم اللغوي بأكثر من 75 لغة — من مترجمين محلفين، في جميع أنحاء ألمانيا منذ 2009.',
  },
  tr: {
    title: 'Noon Sprachdienst — 75+ Dilde Yeminli Çeviri ve Tercümanlık',
    description: `75+ dilde yeminli çeviriler, tercümanlık ve dil desteği — yeminli profesyonellerden, tüm Almanya genelinde, 2009’dan beri.`,
  },
  ru: {
    title: 'Noon Sprachdienst — Заверенные переводы и устный перевод на 75+ языках',
    description: 'Заверенные переводы, услуги устных переводчиков и языковая поддержка на 75+ языках — от присяжных профессионалов, по всей Германии с 2009 года.',
  },
};

export default function App() {
  const { lang, meta } = useI18n();
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const m = META_BY_LANG[lang] || META_BY_LANG.de;
  const isPricingPage = path === '/preise' || path === '/pricing';
  const isSpecialtiesPage = path === '/fachuebersetzungen' || path === '/specialties';

  useEffect(() => {
    document.documentElement.lang = meta.html;
    document.documentElement.dir = meta.dir;
  }, [meta]);

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
      if (!['/', '/preise', '/pricing', '/fachuebersetzungen', '/specialties'].includes(nextPathname)) return;

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
    const id = setTimeout(addTargets, 200);
    return () => { clearTimeout(id); obs.disconnect(); };
  }, [lang, path]);

  return (
    <>
      <Helmet htmlAttributes={{ lang: meta.html, dir: meta.dir }}>
        <title>{m.title}</title>
        <meta name="description" content={m.description} />
        <meta property="og:title" content={m.title} />
        <meta property="og:description" content={m.description} />
        <meta name="twitter:title" content={m.title} />
        <meta name="twitter:description" content={m.description} />
      </Helmet>

      <Nav />

      <main className={isPricingPage ? 'pricing-page' : isSpecialtiesPage ? 'specialty-page-main' : undefined}>
        {isPricingPage ? (
          <Pricing />
        ) : isSpecialtiesPage ? (
          <Specialties />
        ) : (
          <>
            <Hero />
            <Feature2 />
            <Feature3 />
            <StatsStrip />
            <Services />
            <Beratung />
            <Specialties />
            <Branches />
            <Testimonials />
            <FAQ />
            <HowContact />
          </>
        )}
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
        <img src="/assets/WhatsApp_icon.png.webp" alt="WhatsApp" width="50" height="50" />
      </a>

      {/* Phone */}
      <button
        type="button"
        className="fab-phone"
        aria-label="Telefonnummer auswählen"
        aria-expanded={phoneMenuOpen}
        onClick={() => setPhoneMenuOpen((open) => !open)}
      >
        <img src="/assets/mobile.png" alt="" width="38" height="38" />
      </button>
      {phoneMenuOpen && (
        <div className="fab-phone-menu" role="menu" aria-label="Telefonnummer auswählen">
          {CONTACT.phones.map((phone) => (
            <a key={phone.href} href={phone.href} role="menuitem" onClick={() => setPhoneMenuOpen(false)}>
              {phone.label}
            </a>
          ))}
        </div>
      )}

      {/* Email */}
      <a href={`mailto:${CONTACT.email}`} className="fab-email" aria-label="E-Mail senden">
        <img src="/assets/email.png" alt="" width="38" height="38" />
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
