import { Eye, EyeOff, Italic, RotateCcw, Trash2, Underline, X } from 'lucide-react';
import {
  BUTTON_KEYS, FONT_SIZES, isFieldHidden, isHidden, LIMITS, SITE_LANGS, styleOf, textIn, UNHIDEABLE_KEYS,
} from '../../data/formSchema.js';
import { fill } from './i18n.js';

export const UNHIDEABLE = UNHIDEABLE_KEYS;

// Puts the caret at the end of an inline text box.
export function focusEnd(el) {
  el.focus();
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

const entry = (config, key) => {
  config.ui = config.ui || {};
  config.ui[key] = config.ui[key] || {};
  return config.ui[key];
};
const tidy = (config, key) => { if (config.ui?.[key] && !Object.keys(config.ui[key]).length) delete config.ui[key]; };

// Hides or shows an element in all languages ("all") or only in `lang`. Fields keep their
// all-languages flag on the field itself, everything else in config.ui.
export function setHidden(config, key, hide, scope, lang) {
  const ui = entry(config, key);
  const field = key.startsWith('field:') ? config.fields.find((f) => `field:${f.id}` === key) : null;
  const hiddenAll = field ? Boolean(field.hidden) : Boolean(ui.hidden);
  const setAll = (value) => {
    if (field) field.hidden = value;
    else if (value) ui.hidden = true;
    else delete ui.hidden;
  };
  if (scope === 'all') {
    setAll(hide);
    delete ui.hiddenIn;
  } else if (hide) {
    const langs = new Set([...(ui.hiddenIn || []), lang]);
    if (SITE_LANGS.every((l) => langs.has(l))) { setAll(true); delete ui.hiddenIn; } else ui.hiddenIn = SITE_LANGS.filter((l) => langs.has(l));
  } else {
    // Shown again only here: if it was hidden everywhere, it stays hidden in the other languages.
    const others = hiddenAll ? SITE_LANGS.filter((l) => l !== lang) : (ui.hiddenIn || []).filter((l) => l !== lang);
    setAll(false);
    if (others.length) ui.hiddenIn = others; else delete ui.hiddenIn;
  }
  tidy(config, key);
}

// Changes style values ({ size: 115 }, { italic: true }, { color: undefined } to remove one).
// "all": the value applies to every language and single-language values of it are dropped.
// One language: stored as that language's own value, which wins over the all-languages one.
export function setStyle(config, key, patch, scope, lang) {
  const ui = entry(config, key);
  const merge = (style, keepOff) => {
    const out = { ...(style || {}) };
    Object.entries(patch).forEach(([prop, value]) => {
      const off = value === undefined || value === '' || (!keepOff && (value === false || value === 100));
      if (off) delete out[prop]; else out[prop] = value;
    });
    return Object.keys(out).length ? out : undefined;
  };
  if (scope === 'all') {
    ui.style = merge(ui.style, false);
    if (!ui.style) delete ui.style;
    Object.keys(ui.styleIn || {}).forEach((l) => {
      const rest = { ...ui.styleIn[l] };
      Object.keys(patch).forEach((prop) => delete rest[prop]);
      if (Object.keys(rest).length) ui.styleIn[l] = rest; else delete ui.styleIn[l];
    });
  } else {
    ui.styleIn = ui.styleIn || {};
    const next = merge(ui.styleIn[lang], true);
    if (next) ui.styleIn[lang] = next; else delete ui.styleIn[lang];
  }
  if (ui.styleIn && !Object.keys(ui.styleIn).length) delete ui.styleIn;
  tidy(config, key);
}

export function resetStyle(config, key, scope, lang) {
  const ui = entry(config, key);
  if (scope === 'all') { delete ui.style; delete ui.styleIn; } else if (ui.styleIn) {
    delete ui.styleIn[lang];
    if (!Object.keys(ui.styleIn).length) delete ui.styleIn;
  }
  tidy(config, key);
}

function elementName(config, key, lang, t) {
  if (key.startsWith('field:')) {
    const field = config.fields.find((f) => `field:${f.id}` === key);
    return field ? `${t.el.field}: ${textIn(field.label, lang) || t.types[field.type]}` : '';
  }
  if (key.startsWith('step:')) {
    const index = (config.steps || []).findIndex((s) => `step:${s.id}` === key);
    return index < 0 ? '' : `${t.el.step} ${index + 1}: ${textIn(config.steps[index].label, lang)}`;
  }
  return t.el[key] || '';
}

// Toolbar for the element selected in the preview: hide / show, delete, and its text style
// (button colour for buttons), for all languages or only the language being edited.
export default function ElementBar({ config, lang, t, update, elementKey: key, scope, setScope, onDeleteField, onClose }) {
  const name = elementName(config, key, lang, t);
  if (!name) return null;
  const field = key.startsWith('field:') ? config.fields.find((f) => `field:${f.id}` === key) : null;
  const step = key.startsWith('step:') ? config.steps.find((s) => `step:${s.id}` === key) : null;
  const hidden = field ? isFieldHidden(config, field, lang) : isHidden(config, key, lang);
  const ui = config.ui?.[key] || {};
  const hiddenNote = field?.hidden || ui.hidden ? t.hiddenAll
    : ui.hiddenIn?.length ? fill(t.hiddenIn, { lang: ui.hiddenIn.map((l) => l.toUpperCase()).join(', ') }) : '';
  const canHide = !UNHIDEABLE_KEYS.includes(key);
  const canStyle = key !== 'steps' && field?.type !== 'service';
  const isButton = BUTTON_KEYS.includes(key);
  const style = styleOf(config, key, lang);
  const set = (patch) => update((c) => setStyle(c, key, patch, scope, lang));
  const LANG = lang.toUpperCase();

  return (
    <div className="np-elbar" role="toolbar" aria-label={name}>
      <div className="np-elbar-head">
        <strong dir="auto">{name}</strong>
        {hiddenNote && <em>{hiddenNote}</em>}
        <button type="button" className="np-mini" onClick={onClose} aria-label={t.close} title={t.close}><X size={14} /></button>
      </div>
      <div className="np-elbar-scope">
        <span>{t.scopeHint}</span>
        <div className="np-seg np-seg--sm" role="group">
          {[['all', t.scopeAll], ['lang', fill(t.scopeLang, { lang: LANG })]].map(([value, label]) => (
            <button key={value} type="button" className={scope === value ? 'is-active' : ''} aria-pressed={scope === value} onClick={() => setScope(value)}>{label}</button>
          ))}
        </div>
      </div>
      <div className="np-elbar-tools">
        {canHide ? (
          <button type="button" className="np-btn np-btn--ghost np-btn--sm" onClick={() => update((c) => setHidden(c, key, !hidden, scope, lang))}>
            {hidden ? <Eye size={14} /> : <EyeOff size={14} />} {hidden ? t.elShow : t.hide}
          </button>
        ) : <span className="np-muted np-elbar-note">{field ? t.noHideField : t.noHide}</span>}
        {field && !field.builtin && (
          <button type="button" className="np-btn np-btn--ghost np-btn--sm is-danger" onClick={() => onDeleteField(field.id)}><Trash2 size={14} /> {t.delete}</button>
        )}
        {step && (
          <button type="button" className="np-btn np-btn--ghost np-btn--sm is-danger" disabled={config.steps.length <= LIMITS.minSteps}
            onClick={() => { update((c) => { c.steps = c.steps.filter((s) => s.id !== step.id); delete c.ui?.[key]; }); onClose(); }}>
            <Trash2 size={14} /> {t.delete}
          </button>
        )}
      </div>
      {canStyle && (
        <div className="np-elbar-tools">
          <label className="np-elbar-field">
            <span>{t.size}</span>
            <select className="np-input" value={style.size || 100} onChange={(e) => set({ size: Number(e.target.value) })}>
              {FONT_SIZES.map((size) => <option key={size} value={size}>{size} %</option>)}
            </select>
          </label>
          <label className="np-elbar-field">
            <span>{t.weight}</span>
            <select className="np-input" value={style.weight || ''} onChange={(e) => set({ weight: e.target.value || undefined })}>
              <option value="">{t.wDefault}</option>
              <option value="normal">{t.wNormal}</option>
              <option value="bold">{t.wBold}</option>
            </select>
          </label>
          <button type="button" className={`np-mini np-elbar-toggle${style.italic ? ' is-on' : ''}`} aria-pressed={Boolean(style.italic)} title={t.italic} aria-label={t.italic}
            onClick={() => set({ italic: !style.italic })}><Italic size={14} /></button>
          <button type="button" className={`np-mini np-elbar-toggle${style.underline ? ' is-on' : ''}`} aria-pressed={Boolean(style.underline)} title={t.underline} aria-label={t.underline}
            onClick={() => set({ underline: !style.underline })}><Underline size={14} /></button>
          <ColorPick label={t.color} value={style.color} onChange={(color) => set({ color })} clearLabel={t.clearColor} />
          {isButton && <ColorPick label={t.bg} value={style.bg} onChange={(bg) => set({ bg })} clearLabel={t.clearColor} />}
          <button type="button" className="np-btn np-btn--ghost np-btn--sm" onClick={() => update((c) => resetStyle(c, key, scope, lang))}><RotateCcw size={14} /> {t.resetStyle}</button>
        </div>
      )}
    </div>
  );
}

function ColorPick({ label, value, onChange, clearLabel }) {
  return (
    <span className="np-elbar-color">
      <label>
        <span>{label}</span>
        <input type="color" value={value || '#0a0a0a'} onChange={(e) => onChange(e.target.value)} aria-label={label} />
      </label>
      {value && <button type="button" className="np-mini" onClick={() => onChange(undefined)} title={clearLabel} aria-label={clearLabel}><X size={12} /></button>}
    </span>
  );
}
