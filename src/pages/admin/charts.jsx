import { useEffect, useRef, useState } from 'react';

// Small dependency-free SVG charts for the admin dashboard. Time always runs
// left → right (the chart wrappers are dir="ltr" even in the Arabic view).

function useWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!ref.current) return undefined;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, width];
}

// Smallest "round" axis maximum (4 whole-number grid steps) that fits the value.
function niceMax(value) {
  if (value <= 4) return 4;
  const magnitude = 10 ** Math.floor(Math.log10(value / 4));
  const steps = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].filter((s) => Number.isInteger(s * magnitude));
  return steps.find((s) => s * magnitude * 4 >= value) * magnitude * 4;
}

function linePath(points) {
  return points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
}

export function Sparkline({ values, color, height = 40 }) {
  const [ref, width] = useWidth();
  const clean = values.map((v) => v || 0);
  const max = Math.max(...clean, 1);
  const step = clean.length > 1 ? width / (clean.length - 1) : width;
  const points = clean.map((v, i) => [i * step, height - 3 - (v / max) * (height - 6)]);
  const id = `spark-${color.replace('#', '')}`;
  return (
    <div ref={ref} className="np-spark" dir="ltr">
      {width > 0 && (
        <svg width={width} height={height} aria-hidden="true">
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.28" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${linePath(points)} L${width},${height} L0,${height} Z`} fill={`url(#${id})`} />
          <path d={linePath(points)} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
}

// series: [{ key, label, color, values, type: 'area' | 'line', ownScale? }]
export function TrendChart({ labels, series, height = 260, formatTick, formatValue = (v) => v.toLocaleString() }) {
  const [ref, width] = useWidth();
  const [hover, setHover] = useState(null);
  const pad = { top: 16, right: 24, bottom: 28, left: 44 };
  const innerW = Math.max(width - pad.left - pad.right, 10);
  const innerH = height - pad.top - pad.bottom;
  const n = labels.length;
  const step = n > 1 ? innerW / (n - 1) : innerW;
  const mainMax = niceMax(Math.max(1, ...series.filter((s) => !s.ownScale).flatMap((s) => s.values.map((v) => v || 0))));
  const scaled = series.map((s) => {
    const max = s.ownScale ? niceMax(Math.max(1, ...s.values.map((v) => v || 0))) : mainMax;
    const points = s.values.map((v, i) => (v === null || v === undefined ? null : [pad.left + i * step, pad.top + innerH - (v / max) * innerH]));
    return { ...s, points };
  });
  const tickEvery = Math.max(1, Math.ceil(n / Math.max(2, Math.floor(innerW / 64))));

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const index = Math.round((event.clientX - rect.left - pad.left) / step);
    setHover(index >= 0 && index < n ? index : null);
  };

  return (
    <div ref={ref} className="np-trend" dir="ltr" style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} onMouseMove={onMove} onMouseLeave={() => setHover(null)} role="img">
          <defs>
            {scaled.map((s) => (
              <linearGradient key={s.key} id={`trend-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity="0.22" />
                <stop offset="100%" stopColor={s.color} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
          {[0, 1, 2, 3, 4].map((i) => {
            const y = pad.top + (innerH / 4) * i;
            return (
              <g key={i}>
                <line x1={pad.left} x2={width - pad.right} y1={y} y2={y} className="np-grid" />
                <text x={pad.left - 8} y={y + 4} className="np-tick" textAnchor="end">{Math.round(mainMax - (mainMax / 4) * i).toLocaleString()}</text>
              </g>
            );
          })}
          {labels.map((label, i) => ((i % tickEvery === 0 && n - 1 - i >= tickEvery * 0.6) || i === n - 1) && (
            <text key={label} x={pad.left + i * step} y={height - 8} className="np-tick" textAnchor="middle">{formatTick ? formatTick(label) : label}</text>
          ))}
          {scaled.map((s) => {
            const segment = s.points.filter(Boolean);
            if (!segment.length) return null;
            const d = linePath(segment);
            return (
              <g key={s.key}>
                {s.type === 'area' && (
                  <path d={`${d} L${segment[segment.length - 1][0]},${pad.top + innerH} L${segment[0][0]},${pad.top + innerH} Z`} fill={`url(#trend-${s.key})`} />
                )}
                <path d={d} fill="none" stroke={s.color} strokeWidth={s.type === 'area' ? 2.5 : 2} strokeDasharray={s.dashed ? '5 4' : undefined} strokeLinejoin="round" strokeLinecap="round" />
              </g>
            );
          })}
          {hover !== null && (
            <g>
              <line x1={pad.left + hover * step} x2={pad.left + hover * step} y1={pad.top} y2={pad.top + innerH} className="np-cursor" />
              {scaled.map((s) => s.points[hover] && (
                <circle key={s.key} cx={s.points[hover][0]} cy={s.points[hover][1]} r="4.5" fill="#fff" stroke={s.color} strokeWidth="2.5" />
              ))}
            </g>
          )}
        </svg>
      )}
      {hover !== null && width > 0 && (
        <div className="np-tooltip" style={{ left: Math.min(Math.max(pad.left + hover * step, 70), width - 70), top: 4 }}>
          <strong>{formatTick ? formatTick(labels[hover], true) : labels[hover]}</strong>
          {series.map((s) => (
            <span key={s.key}><i style={{ background: s.color }} />{s.label}: <b>{s.values[hover] === null || s.values[hover] === undefined ? '—' : formatValue(s.values[hover], s.key)}</b></span>
          ))}
        </div>
      )}
    </div>
  );
}

export function Donut({ segments, size = 148, thickness = 18, center, centerLabel }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  return (
    <div className="np-donut" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--np-track)" strokeWidth={thickness} />
        {total > 0 && segments.map((s) => {
          const length = (s.value / total) * circumference;
          const gap = segments.length > 1 ? Math.min(3, length / 3) : 0;
          const el = (
            <circle key={s.label} cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={s.color} strokeWidth={thickness}
              strokeDasharray={`${Math.max(length - gap, 0)} ${circumference}`} strokeDashoffset={-offset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`} strokeLinecap="butt" />
          );
          offset += length;
          return el;
        })}
      </svg>
      <div className="np-donut-center">
        <strong>{center ?? total.toLocaleString()}</strong>
        {centerLabel && <span>{centerLabel}</span>}
      </div>
    </div>
  );
}

// rows: [{ key, label, value, badge?, ltr? }]
export function BarList({ rows, color = 'var(--np-navy)', total, valueLabel }) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  const sum = total || rows.reduce((s, r) => s + r.value, 0);
  return (
    <div className="np-barlist">
      {rows.map((row) => (
        <div className="np-barlist-row" key={row.key}>
          <div className="np-barlist-bar" style={{ width: `${(row.value / max) * 100}%`, background: color }} />
          <span className="np-barlist-label">
            {row.badge && <span className="np-code">{row.badge}</span>}
            {row.ltr ? <bdi dir="ltr" className="np-ltr">{row.label}</bdi> : row.label}
          </span>
          <span className="np-barlist-value">
            <b>{row.value.toLocaleString()}</b>
            {sum > 0 && <em>{Math.round((row.value / sum) * 100)}%</em>}
          </span>
        </div>
      ))}
      {!rows.length && <p className="np-empty-line">—</p>}
      {valueLabel && <span className="np-sr">{valueLabel}</span>}
    </div>
  );
}

export function Heatmap({ data, weekdays, less, more, peaks }) {
  const hours = Array.from({ length: 24 }, (_, h) => h);
  const max = Math.max(1, ...Object.values(data));
  const dayTotals = weekdays.map((_, d) => hours.reduce((s, h) => s + (data[`${d}-${h}`] || 0), 0));
  const hourTotals = hours.map((h) => weekdays.reduce((s, _, d) => s + (data[`${d}-${h}`] || 0), 0));
  const total = dayTotals.reduce((s, v) => s + v, 0);
  const peakDay = dayTotals.indexOf(Math.max(...dayTotals));
  const peakHour = hourTotals.indexOf(Math.max(...hourTotals));
  const officeShare = total ? Math.round((hours.filter((h) => h >= 8 && h < 18).reduce((s, h) => s + hourTotals[h], 0) / total) * 100) : 0;
  const weekendShare = total ? Math.round(((dayTotals[5] + dayTotals[6]) / total) * 100) : 0;
  return (
    <div className="np-heat-wrap">
      {peaks && total > 0 && (
        <div className="np-peaks">
          <div><span>{peaks.day}</span><strong>{weekdays[peakDay]}</strong></div>
          <div><span>{peaks.hour}</span><strong dir="ltr">{String(peakHour).padStart(2, '0')}:00–{String(peakHour + 1).padStart(2, '0')}:00</strong></div>
          <div><span>{peaks.office}</span><strong>{officeShare}%</strong></div>
          <div><span>{peaks.weekend}</span><strong>{weekendShare}%</strong></div>
        </div>
      )}
    <div className="np-heat" dir="ltr">
      <div className="np-heat-grid">
        <span />
        {hours.map((h) => <span key={h} className="np-heat-hour">{h % 3 === 0 ? String(h).padStart(2, '0') : ''}</span>)}
        {weekdays.map((name, d) => (
          <FragmentRow key={name} name={name} d={d} hours={hours} data={data} max={max} />
        ))}
      </div>
      <div className="np-heat-legend">
        <span>{less}</span>
        {[0.08, 0.3, 0.55, 0.8, 1].map((o) => <i key={o} style={{ opacity: o }} />)}
        <span>{more}</span>
      </div>
    </div>
    </div>
  );
}

function FragmentRow({ name, d, hours, data, max }) {
  return (
    <>
      <span className="np-heat-day">{name}</span>
      {hours.map((h) => {
        const value = data[`${d}-${h}`] || 0;
        return (
          <span key={h} className="np-heat-cell" title={`${name} ${String(h).padStart(2, '0')}:00 · ${value}`}
            style={{ '--np-heat': value ? 0.12 + (value / max) * 0.88 : 0 }} />
        );
      })}
    </>
  );
}

export function Delta({ value, invert = false, label }) {
  if (value === null || value === undefined || !Number.isFinite(value)) return <span className="np-delta np-delta--none">{label || '—'}</span>;
  const good = invert ? value < 0 : value > 0;
  const flat = Math.abs(value) < 0.5;
  return (
    <span className={`np-delta ${flat ? 'np-delta--flat' : good ? 'np-delta--up' : 'np-delta--down'}`} dir="ltr">
      {flat ? '±' : value > 0 ? '▲' : '▼'} {Math.abs(value).toFixed(Math.abs(value) < 10 ? 1 : 0)}%
    </span>
  );
}
