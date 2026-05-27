import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../hooks/useI18n';

const REEL_WORDS = [
  { lang: 'de', text: 'Übersetzung' },
  { lang: 'en', text: 'Translation' },
  { lang: 'ar', text: 'ترجمة', rtl: true },
  { lang: 'ru', text: 'Перевод' },
  { lang: 'tr', text: 'Çeviri' },
  { lang: 'fr', text: 'Traduction' },
  { lang: 'uk', text: 'Переклад' },
];

const COUNTERS = [
  { target: 3200, key: 'hero.counter.ar' },
  { target: 2400, key: 'hero.counter.en' },
  { target: 1800, key: 'hero.counter.tr' },
  { target: 1100, key: 'hero.counter.uk' },
  { target: 900,  key: 'hero.counter.fr' },
  { target: 1600, key: 'hero.counter.more' },
];

export default function Hero() {
  const { t } = useI18n();
  const [reelIndex, setReelIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setReelIndex((i) => (i + 1) % REEL_WORDS.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" id="hero" aria-labelledby="hero-heading">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className="hero-logo-wrap">
            <img
              src="/assets/logo2.png"
              alt="Noon Sprachdienst"
              className="hero-logo"
              width="450"
              height="auto"
            />
          </div>
        </div>

        <h1 id="hero-heading" className="sr-only" style={{ position: 'absolute', left: '-9999px' }}>
          Noon Sprachdienst — {t('hero.title1')} {t('hero.title2')}
        </h1>

<div className="lang-reel heroLangSwap" aria-hidden="true" >
          {REEL_WORDS.map((w, i) => (
            <span
              key={w.lang}
              className={`lang-reel-word${i === reelIndex ? ' reel-in' : ''}`}
              style={w.rtl ? { direction: 'rtl', unicodeBidi: 'bidi-override' } : undefined}
            >
              {w.text}
            </span>
          ))}
        </div>

        <p className="lead" style={{ color: '#0A0A0A', marginTop: '-6px' }}>{t('hero.lead')}</p>

        <div className="hero-ctas">
          <button
            className="hero-svc-btn hero-svc-btn--primary"
            type="button"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            <span className="hero-svc-icon" aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2"/>
                <path d="M9 7h6M9 11h6M9 15h4"/>
              </svg>
            </span>
            Übersetzung
          </button>
          <button
            className="hero-svc-btn hero-svc-btn--secondary"
            type="button"
            onClick={() => document.getElementById('dolmetschen')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            <span className="hero-svc-icon" aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </span>
            Dolmetschen
          </button>
        </div>

        <div className="counter-strip" aria-label={t('hero.counter.label')}>
          <div className="counter-label">{t('hero.counter.label')}</div>
          <div className="counter-row">
            {COUNTERS.map((c) => (
              <Counter key={c.key} target={c.target} label={t(c.key)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ target, label }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const startVal = target > 999 ? Math.floor(target * 0.75) : 0;
          const dur = target > 999 ? 1000 : 1600;
          const startTime = performance.now();
          const ease = (t) => 1 - Math.pow(1 - t, 3);
          const tick = (now) => {
            const tt = Math.min((now - startTime) / dur, 1);
            const v = Math.round(startVal + ease(tt) * (target - startVal));
            setValue(v);
            if (tt < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div className="counter-item" ref={ref}>
      <div className="counter-num">+{value.toLocaleString('de-DE')}</div>
      <div className="counter-name">{label}</div>
    </div>
  );
}
