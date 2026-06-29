import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../hooks/useI18n';

const STATS_BASE = [
  { num: 190,   suffix: '+', labelKey: 'stats.languages' },
  { num: 6,     suffix: '',  labelKey: 'stats.locations', pad: 2 },
  { num: 7,     suffix: '',  labelKey: 'stats.years' },
  { num: 10000, suffix: '+', labelKey: 'stats.orders', locale: true },
];

export default function StatsStrip() {
  const { t } = useI18n();
  return (
    <section className="stats-strip" aria-label="Statistiken">
      <div className="container">
        <div className="grid">
          {STATS_BASE.map((s, i) => (
            <StatItem key={i} {...s} label={t(s.labelKey)} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ num, suffix, label, pad, locale, index }) {
  const ref = useRef(null);
  const [value, setValue] = useState(num > 999 ? Math.floor(num * 0.75) : 0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = num > 999 ? Math.floor(num * 0.75) : 0;
          const dur = num > 999 ? 1000 : 1600;
          const t0 = performance.now();
          const ease = (t) => 1 - Math.pow(1 - t, 3);
          const tick = (now) => {
            const tt = Math.min((now - t0) / dur, 1);
            setValue(Math.round(start + ease(tt) * (num - start)));
            if (tt < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [num]);

  const display = locale
    ? value.toLocaleString('de-DE')
    : pad
      ? String(value).padStart(pad, '0')
      : value;

  return (
    <div className="item" ref={ref} data-reveal="" style={{ '--ri': index }}>
      <div className="num">{display}{suffix}</div>
      <div className="label">{label}</div>
    </div>
  );
}
