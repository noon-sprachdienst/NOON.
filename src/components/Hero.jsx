import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import HeroGlobe from './HeroGlobe';

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
  { target: 900, key: 'hero.counter.fr' },
  { target: 1600, key: 'hero.counter.more' },
];

export default function Hero() {
  const { t, lang } = useI18n();
  const [reelIndex, setReelIndex] = useState(0);
  const isRTL = lang === 'ar';
  const isTablet = useTabletHero();

  useEffect(() => {
    const id = window.setInterval(() => {
      setReelIndex((i) => (i + 1) % REEL_WORDS.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, []);

  if (isTablet) {
    return <TabletHero t={t} isRTL={isRTL} reelIndex={reelIndex} />;
  }

  return (
    <section className={`hero${isRTL ? ' hero--rtl' : ''}`} id="hero" aria-labelledby="hero-heading">
      <div className="hero-globe-wrap" aria-hidden="true">
        <HeroGlobe />
      </div>

      <div className="container">
        <div className="hero-copy">
          <h1 id="hero-heading" className="hero-title">
            <span className="hero-title-line">{t('hero.title1')}</span>
            <span className="hero-title-line hero-title-line--accent">{t('hero.title2')}</span>
          </h1>

          <div className="hero-trustline">
            <span className="hero-trustline-dot" aria-hidden="true" />
            {t('hero.trust')}
          </div>

          <div className="lang-reel heroLangSwap" aria-hidden="true">
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

          <p className="lead">{t('hero.lead')}</p>

          <div className="hero-ctas">
            <button
              className="hero-svc-btn hero-svc-btn--primary"
              type="button"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              <span className="hero-svc-icon" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M9 7h6M9 11h6M9 15h4" />
                </svg>
              </span>
              {t('service.translation')}
              <span className="hero-svc-arrow" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </span>
            </button>
            <button
              className="hero-svc-btn hero-svc-btn--secondary"
              type="button"
              onClick={() => document.getElementById('dolmetschen')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              <span className="hero-svc-icon" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </span>
              {t('service.interpreting')}
            </button>
          </div>

          <div className="counter-strip" aria-label={t('hero.counter.label')}>
            <div className="counter-heading">
              <span aria-hidden="true" />
              <div className="counter-label">{t('hero.counter.label')}</div>
              <span aria-hidden="true" />
            </div>
            <div className="counter-row">
              {COUNTERS.map((c) => (
                <Counter key={c.key} target={c.target} label={t(c.key)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TabletHero({ t, isRTL, reelIndex }) {
  return (
    <section className={`tablet-hero${isRTL ? ' tablet-hero--rtl' : ''}`} id="hero" aria-labelledby="tablet-hero-heading">
      <div className="tablet-hero-grid">
        <div className="tablet-hero-visual" aria-hidden="true">
          <div className="tablet-hero-globe">
            <HeroGlobe />
          </div>
        </div>

        <div className="tablet-hero-copy">
          <h1 id="tablet-hero-heading" className="tablet-hero-title">
            <span>{t('hero.title1')}</span>
            <span>{t('hero.title2')}</span>
          </h1>

          <div className="tablet-hero-trustline">
            <span className="hero-trustline-dot" aria-hidden="true" />
            {t('hero.trust')}
          </div>

          <div className="tablet-lang-reel" aria-hidden="true">
            {REEL_WORDS.map((word, index) => (
              <span
                key={word.lang}
                className={`tablet-lang-reel-word${index === reelIndex ? ' is-active' : ''}`}
                style={word.rtl ? { direction: 'rtl', unicodeBidi: 'bidi-override' } : undefined}
              >
                {word.text}
              </span>
            ))}
          </div>

          <p className="tablet-hero-lead">{t('hero.lead')}</p>

          <HeroActions t={t} className="tablet-hero-actions" />

          <div className="tablet-counter-strip" aria-label={t('hero.counter.label')}>
            <div className="tablet-counter-label">{t('hero.counter.label')}</div>
            <div className="tablet-counter-row">
              {COUNTERS.map((counter) => (
                <Counter
                  key={counter.key}
                  target={counter.target}
                  label={t(counter.key)}
                  classPrefix="tablet-counter"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroActions({ t, className }) {
  return (
    <div className={className}>
      <button
        className="hero-svc-btn hero-svc-btn--primary"
        type="button"
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      >
        <span className="hero-svc-icon" aria-hidden="true">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <path d="M9 7h6M9 11h6M9 15h4" />
          </svg>
        </span>
        {t('service.translation')}
        <span className="hero-svc-arrow" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </span>
      </button>
      <button
        className="hero-svc-btn hero-svc-btn--secondary"
        type="button"
        onClick={() => document.getElementById('dolmetschen')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      >
        <span className="hero-svc-icon" aria-hidden="true">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </span>
        {t('service.interpreting')}
      </button>
    </div>
  );
}

function useTabletHero() {
  const query = '(min-width: 641px) and (max-width: 1100px)';
  const [matches, setMatches] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia(query).matches
  ));

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return matches;
}

function Counter({ target, label, classPrefix = 'counter' }) {
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
    <div className={`${classPrefix}-item`} ref={ref}>
      <div className={`${classPrefix}-num`}>+{value.toLocaleString('de-DE')}</div>
      <div className={`${classPrefix}-name`}>{label}</div>
    </div>
  );
}
