import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown, ArrowUp, Check, ChevronDown, ChevronUp, Eye, EyeOff, History, Lock, Plus, RotateCcw, Rocket, Save, Trash2, TriangleAlert, Undo2,
} from 'lucide-react';
import QuoteFormFields from '../../components/QuoteFormFields.jsx';
import { defaultFormConfig } from '../../data/formConfig.js';
import { ALWAYS_REQUIRED, CUSTOM_TYPES, LOCKED_FIELDS, OTHER_LANGUAGE, SITE_LANGS, phoneHref, sanitizeFormConfig, textIn } from '../../data/formSchema.js';
import { LANG_META } from '../../data/translations.js';
import { fill } from './i18n.js';

const NO_PLACEHOLDER = ['service', 'file', 'checkbox', 'language', 'select'];
const randomId = (prefix) => `${prefix}${Math.random().toString(36).slice(2, 8)}`;
const slug = (name) => String(name).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '').slice(0, 20);

async function api(body) {
  const response = await fetch('/api/admin/cms-form', body
    ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
    : undefined);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw Object.assign(new Error(data.error || `HTTP ${response.status}`), { status: response.status });
  return data;
}

// Counts texts that exist in German but are empty in a language (shown as a badge per language).
function missingTexts(config, lang) {
  if (lang === 'de') return 0;
  let missing = 0;
  const check = (map) => { if (map?.de && !map[lang]) missing += 1; };
  Object.values(config.texts).forEach(check);
  config.fields.filter((field) => !field.hidden).forEach((field) => {
    check(field.label); check(field.placeholder); check(field.help);
    (field.options || []).forEach((option) => check(option.label));
  });
  config.languages.forEach((language) => check(language.name));
  ['title', 'text', 'call', 'again'].forEach((key) => check(config.confirmation[key]));
  return missing;
}

function TextField({ label, map, lang, onChange, multiline, hint, rows = 3 }) {
  const value = map?.[lang] || '';
  const fallback = lang !== 'de' ? map?.de || '' : '';
  const props = {
    value, dir: LANG_META[lang].dir, placeholder: fallback, className: 'np-input',
    onChange: (e) => onChange({ ...(map || {}), [lang]: e.target.value }),
  };
  return (
    <label className="np-field">
      <span>{label}</span>
      {multiline ? <textarea rows={rows} {...props} /> : <input type="text" {...props} />}
      {hint && <small>{hint}</small>}
    </label>
  );
}

function Segmented({ value, options, onChange, small }) {
  return (
    <div className={`np-seg${small ? ' np-seg--sm' : ''}`} role="group">
      {options.map(([key, label]) => (
        <button key={key} type="button" className={value === key ? 'is-active' : ''} aria-pressed={value === key} onClick={() => onChange(key)}>{label}</button>
      ))}
    </div>
  );
}

function FieldRow({ field, index, count, lang, t, update, open, setOpen }) {
  const locked = LOCKED_FIELDS.includes(field.id);
  const name = textIn(field.label, lang) || t.types[field.type];
  const set = (fn) => update((config) => fn(config.fields[index]));
  const move = (delta) => update((config) => {
    const [item] = config.fields.splice(index, 1);
    config.fields.splice(index + delta, 0, item);
  });
  const remove = () => {
    if (!window.confirm(fill(t.confirmDeleteField, { name }))) return;
    update((config) => { config.fields.splice(index, 1); });
  };
  const canRequire = !['service', 'language', 'file'].includes(field.type) && !ALWAYS_REQUIRED.includes(field.id);

  return (
    <li className={`np-frow${field.hidden ? ' is-hidden' : ''}${open ? ' is-open' : ''}`}>
      <div className="np-frow-main">
        <div className="np-frow-move">
          <button type="button" className="np-mini" onClick={() => move(-1)} disabled={index === 0} aria-label={t.moveUp} title={t.moveUp}><ArrowUp size={14} /></button>
          <button type="button" className="np-mini" onClick={() => move(1)} disabled={index === count - 1} aria-label={t.moveDown} title={t.moveDown}><ArrowDown size={14} /></button>
        </div>
        <button type="button" className="np-frow-name" onClick={() => setOpen(open ? null : field.id)} aria-expanded={open}>
          <strong dir="auto">{name}</strong>
          <span className="np-frow-meta">
            <em>{t.types[field.type]}</em>
            {field.width === 'half' && <em>{t.half}</em>}
            {field.required && <em>{t.required}</em>}
            {field.show !== 'both' && <em>{field.show === 'translation' ? t.showTranslation : t.showInterpreting}</em>}
            {field.hidden && <em className="is-warn">{t.hidden}</em>}
          </span>
        </button>
        <div className="np-frow-tools">
          {locked && <span className="np-mini is-static" title={t.locked} aria-label={t.locked}><Lock size={14} /></span>}
          {field.builtin && !locked && (
            <button type="button" className="np-mini" onClick={() => set((f) => { f.hidden = !f.hidden; })} title={field.hidden ? t.unhide : t.hide} aria-label={field.hidden ? t.unhide : t.hide}>
              {field.hidden ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
          )}
          {!field.builtin && (
            <button type="button" className="np-mini is-danger" onClick={remove} title={t.delete} aria-label={t.delete}><Trash2 size={14} /></button>
          )}
          <button type="button" className="np-mini" onClick={() => setOpen(open ? null : field.id)} aria-label={open ? t.close : t.edit} title={open ? t.close : t.edit}>
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="np-frow-edit">
          <div className="np-frow-settings">
            {!field.builtin && (
              <label className="np-field np-field--inline">
                <span>{t.type}</span>
                <select className="np-input" value={field.type} onChange={(e) => set((f) => {
                  f.type = e.target.value;
                  if (f.type === 'select' && !f.options?.length) f.options = [{ id: randomId('o'), label: { de: t.newOption } }];
                  if (f.type !== 'select') delete f.options;
                })}>
                  {CUSTOM_TYPES.map((type) => <option key={type} value={type}>{t.types[type]}</option>)}
                </select>
              </label>
            )}
            {field.type !== 'service' && (
              <div className="np-field np-field--inline">
                <span>{t.width}</span>
                <Segmented small value={field.width} options={[['half', t.half], ['full', t.full]]} onChange={(width) => set((f) => { f.width = width; })} />
              </div>
            )}
            {field.type !== 'service' && !LOCKED_FIELDS.includes(field.id) && (
              <label className="np-field np-field--inline">
                <span>{t.show}</span>
                <select className="np-input" value={field.show} onChange={(e) => set((f) => { f.show = e.target.value; })}>
                  <option value="both">{t.showBoth}</option>
                  <option value="translation">{t.showTranslation}</option>
                  <option value="interpreting">{t.showInterpreting}</option>
                </select>
              </label>
            )}
            {canRequire && (
              <div className="np-field np-field--inline">
                <span>{t.required}</span>
                <button type="button" role="switch" aria-checked={field.required} className={`np-switch${field.required ? ' is-on' : ''}`} onClick={() => set((f) => { f.required = !f.required; })}>
                  <i /> <span>{field.required ? t.on : t.off}</span>
                </button>
              </div>
            )}
          </div>

          {field.type !== 'service' && <TextField label={t.label} map={field.label} lang={lang} onChange={(label) => set((f) => { f.label = label; })} />}
          {field.type === 'service' && (
            <div className="np-grid2">
              <TextField label={t.label} map={field.label} lang={lang} onChange={(label) => set((f) => { f.label = label; })} />
              {field.options.map((option, i) => (
                <TextField key={option.id} label={`${t.serviceNames} · ${i + 1}`} map={option.label} lang={lang} onChange={(label) => set((f) => { f.options[i].label = label; })} />
              ))}
            </div>
          )}
          {!NO_PLACEHOLDER.includes(field.type) && (
            <TextField label={t.placeholder} map={field.placeholder} lang={lang} onChange={(placeholder) => set((f) => { f.placeholder = placeholder; })} />
          )}
          {field.type === 'select' && (
            <>
              <TextField label={t.placeholder} map={field.placeholder} lang={lang} onChange={(placeholder) => set((f) => { f.placeholder = placeholder; })} />
              <div className="np-options">
                <span className="np-options-title">{t.options}</span>
                {field.options.map((option, i) => (
                  <div key={option.id} className="np-option">
                    <input className="np-input" type="text" dir={LANG_META[lang].dir} value={option.label[lang] || ''} placeholder={lang !== 'de' ? option.label.de : ''}
                      onChange={(e) => set((f) => { f.options[i].label = { ...f.options[i].label, [lang]: e.target.value }; })} aria-label={`${t.options} ${i + 1}`} />
                    <button type="button" className="np-mini" disabled={i === 0} onClick={() => set((f) => { const [o] = f.options.splice(i, 1); f.options.splice(i - 1, 0, o); })} aria-label={t.moveUp}><ArrowUp size={14} /></button>
                    <button type="button" className="np-mini" disabled={i === field.options.length - 1} onClick={() => set((f) => { const [o] = f.options.splice(i, 1); f.options.splice(i + 1, 0, o); })} aria-label={t.moveDown}><ArrowDown size={14} /></button>
                    <button type="button" className="np-mini is-danger" disabled={field.options.length === 1} onClick={() => set((f) => { f.options.splice(i, 1); })} aria-label={t.delete}><Trash2 size={14} /></button>
                  </div>
                ))}
                <button type="button" className="np-btn np-btn--ghost np-btn--sm" onClick={() => set((f) => { f.options.push({ id: randomId('o'), label: { de: t.newOption, ...(lang !== 'de' ? { [lang]: t.newOption } : {}) } }); })}>
                  <Plus size={14} /> {t.addOption}
                </button>
              </div>
            </>
          )}
          {field.type !== 'service' && (
            <TextField label={t.help} map={field.help} lang={lang} onChange={(help) => set((f) => { f.help = help; })} multiline rows={2} />
          )}
          {locked && <p className="np-muted np-lockline"><Lock size={13} /> {t.locked}</p>}
        </div>
      )}
    </li>
  );
}

function FieldsSection({ config, lang, t, update }) {
  const [open, setOpen] = useState(null);
  const [adding, setAdding] = useState(false);
  const add = (type) => {
    const id = randomId('c_');
    update((next) => {
      next.fields.push({
        id, type, builtin: false, width: 'full', required: false, show: 'both', hidden: false,
        label: { de: t.newField, ...(lang !== 'de' ? { [lang]: t.newField } : {}) }, placeholder: {}, help: {},
        ...(type === 'select' ? { options: [{ id: randomId('o'), label: { de: t.newOption } }] } : {}),
      });
    });
    setAdding(false);
    setOpen(id);
  };
  return (
    <>
      <section className="np-card">
        <header className="np-card-head"><div><h2>{t.formTexts}</h2></div></header>
        <div className="np-grid2">
          <TextField label={t.fTitle} map={config.texts.title} lang={lang} onChange={(v) => update((c) => { c.texts.title = v; })} />
          <TextField label={t.fSubmit} map={config.texts.submit} lang={lang} onChange={(v) => update((c) => { c.texts.submit = v; })} />
        </div>
        <TextField label={t.fSub} map={config.texts.sub} lang={lang} onChange={(v) => update((c) => { c.texts.sub = v; })} />
      </section>
      <section className="np-card">
        <header className="np-card-head">
          <div><h2>{t.fieldsTitle}</h2><p>{t.fieldsSub}</p></div>
          <div className="np-addwrap">
            <button type="button" className="np-btn np-btn--sm" onClick={() => setAdding((a) => !a)} aria-expanded={adding}><Plus size={15} /> {t.addField}</button>
            {adding && (
              <div className="np-addmenu" role="menu">
                {CUSTOM_TYPES.map((type) => <button key={type} type="button" role="menuitem" onClick={() => add(type)}>{t.types[type]}</button>)}
              </div>
            )}
          </div>
        </header>
        <ul className="np-frows">
          {config.fields.map((field, index) => (
            <FieldRow key={field.id} field={field} index={index} count={config.fields.length} lang={lang} t={t} update={update}
              open={open === field.id} setOpen={setOpen} />
          ))}
        </ul>
      </section>
    </>
  );
}

function LanguagesSection({ config, lang, t, update }) {
  const [newName, setNewName] = useState('');
  const add = (e) => {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    const base = slug(name) || 'lang';
    let id = base;
    while (id === OTHER_LANGUAGE || config.languages.some((language) => language.id === id) || !/^[a-z]/.test(id)) id = `${/^[a-z]/.test(base) ? base : 'l'}${Math.random().toString(36).slice(2, 5)}`;
    update((c) => { c.languages.push({ id, name: { de: name, ...(lang !== 'de' ? { [lang]: name } : {}) }, source: true, target: true }); });
    setNewName('');
  };
  const nameOf = (language) => textIn(language.name, lang);
  return (
    <>
      <section className="np-card">
        <header className="np-card-head">
          <div><h2>{t.langTitle}</h2><p>{t.langSub}</p></div>
          <span className="np-chip">{fill(t.langCount, { n: config.languages.length })}</span>
        </header>
        <div className="np-grid2 np-langdefaults">
          <label className="np-field">
            <span>{t.preSource}</span>
            <select className="np-input" value={config.defaultSource} onChange={(e) => update((c) => { c.defaultSource = e.target.value; })}>
              {config.languages.filter((l) => l.source).map((l) => <option key={l.id} value={l.id}>{nameOf(l)}</option>)}
            </select>
          </label>
          <label className="np-field">
            <span>{t.preTarget}</span>
            <select className="np-input" value={config.defaultTarget} onChange={(e) => update((c) => { c.defaultTarget = e.target.value; })}>
              {config.languages.filter((l) => l.target).map((l) => <option key={l.id} value={l.id}>{nameOf(l)}</option>)}
            </select>
          </label>
        </div>
        <div className="np-langtable" role="table">
          <div className="np-langrow is-head" role="row">
            <span />
            <span role="columnheader">{t.langName}</span>
            <span role="columnheader">{t.source}</span>
            <span role="columnheader">{t.target}</span>
            <span />
          </div>
          {config.languages.map((language, i) => (
            <div key={language.id} className="np-langrow" role="row">
              <div className="np-frow-move">
                <button type="button" className="np-mini" disabled={i === 0} onClick={() => update((c) => { const [l] = c.languages.splice(i, 1); c.languages.splice(i - 1, 0, l); })} aria-label={t.moveUp}><ArrowUp size={14} /></button>
                <button type="button" className="np-mini" disabled={i === config.languages.length - 1} onClick={() => update((c) => { const [l] = c.languages.splice(i, 1); c.languages.splice(i + 1, 0, l); })} aria-label={t.moveDown}><ArrowDown size={14} /></button>
              </div>
              <input className="np-input" type="text" dir={LANG_META[lang].dir} value={language.name[lang] || ''} placeholder={lang !== 'de' ? language.name.de : ''}
                aria-label={t.langName} onChange={(e) => update((c) => { c.languages[i].name = { ...c.languages[i].name, [lang]: e.target.value }; })} />
              <input type="checkbox" checked={language.source} aria-label={t.source} onChange={() => update((c) => {
                c.languages[i].source = !c.languages[i].source;
                if (!c.languages[i].source && c.defaultSource === language.id) c.defaultSource = c.languages.find((l) => l.source)?.id || OTHER_LANGUAGE;
              })} />
              <input type="checkbox" checked={language.target} aria-label={t.target} onChange={() => update((c) => {
                c.languages[i].target = !c.languages[i].target;
                if (!c.languages[i].target && c.defaultTarget === language.id) c.defaultTarget = c.languages.find((l) => l.target)?.id || OTHER_LANGUAGE;
              })} />
              <button type="button" className="np-mini is-danger" aria-label={t.delete} title={t.delete} onClick={() => {
                if (!window.confirm(fill(t.confirmDeleteLang, { name: nameOf(language) }))) return;
                update((c) => {
                  c.languages.splice(i, 1);
                  if (c.defaultSource === language.id) c.defaultSource = c.languages.find((l) => l.source)?.id || OTHER_LANGUAGE;
                  if (c.defaultTarget === language.id) c.defaultTarget = c.languages.find((l) => l.target)?.id || OTHER_LANGUAGE;
                });
              }}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
        <form className="np-addlang" onSubmit={add}>
          <input className="np-input" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={t.addLanguagePh} maxLength={80} dir="auto" />
          <button type="submit" className="np-btn np-btn--sm" disabled={!newName.trim()}><Plus size={15} /> {t.addLanguage}</button>
        </form>
      </section>
      <section className="np-card">
        <header className="np-card-head"><div><h2>{t.otherTitle}</h2></div></header>
        <div className="np-grid2">
          <TextField label={t.otherName} map={config.texts.otherName} lang={lang} onChange={(v) => update((c) => { c.texts.otherName = v; })} />
          <TextField label={t.otherLabel} map={config.texts.otherLabel} lang={lang} onChange={(v) => update((c) => { c.texts.otherLabel = v; })} />
        </div>
        <TextField label={t.otherPh} map={config.texts.otherPlaceholder} lang={lang} onChange={(v) => update((c) => { c.texts.otherPlaceholder = v; })} />
      </section>
    </>
  );
}

function ConfirmationSection({ config, lang, t, update }) {
  const c = config.confirmation;
  const set = (key) => (value) => update((next) => { next.confirmation[key] = value; });
  return (
    <section className="np-card">
      <header className="np-card-head"><div><h2>{t.confTitle}</h2><p>{t.confSub}</p></div></header>
      <TextField label={t.cTitle} map={c.title} lang={lang} onChange={set('title')} />
      <TextField label={t.cText} map={c.text} lang={lang} onChange={set('text')} multiline rows={4} hint={t.phoneHint} />
      <div className="np-grid2">
        <TextField label={t.cCall} map={c.call} lang={lang} onChange={set('call')} />
        <TextField label={t.cAgain} map={c.again} lang={lang} onChange={set('again')} />
      </div>
      <label className="np-field">
        <span>{t.cPhone}</span>
        <input className="np-input" type="tel" dir="ltr" value={c.phone} maxLength={40} onChange={(e) => update((next) => { next.confirmation.phone = e.target.value; })} />
      </label>
    </section>
  );
}

function HistorySection({ history, published, t, locale, onLoadVersion, onLoadDefault }) {
  return (
    <>
      <section className="np-card">
        <header className="np-card-head"><div><h2>{t.histTitle}</h2><p>{t.histSub}</p></div></header>
        {history.length ? (
          <ul className="np-history">
            {history.map((item) => (
              <li key={item.rev}>
                <History size={15} />
                <span><strong>v{item.rev}</strong> · {new Date(item.publishedAt).toLocaleString(locale)}</span>
                {published?.rev === item.rev
                  ? <span className="np-chip np-chip--live"><Check size={12} /> {t.current}</span>
                  : <button type="button" className="np-btn np-btn--ghost np-btn--sm" onClick={() => onLoadVersion(item.rev)}><Undo2 size={14} /> {t.load}</button>}
              </li>
            ))}
          </ul>
        ) : <p className="np-muted">{t.histEmpty}</p>}
      </section>
      <section className="np-card">
        <header className="np-card-head"><div><h2>{t.resetTitle}</h2><p>{t.resetText}</p></div></header>
        <button type="button" className="np-btn np-btn--ghost" onClick={onLoadDefault}><RotateCcw size={15} /> {t.resetBtn}</button>
      </section>
    </>
  );
}

function Preview({ config, lang, t, mode, setMode }) {
  const [service, setService] = useState('translation');
  const [source, setSource] = useState(config.defaultSource);
  const [target, setTarget] = useState(config.defaultTarget);
  useEffect(() => { setSource(config.defaultSource); setTarget(config.defaultTarget); }, [config.defaultSource, config.defaultTarget]);
  const done = config.confirmation;
  const phone = done.phone || '+49 160 956 27 666';
  const withPhone = (text, wrap) => text.split('{phone}').flatMap((part, i) => (i ? [wrap(i), part] : [part]));
  return (
    <aside className="np-preview">
      <div className="np-preview-head">
        <strong>{t.preview}</strong>
        <Segmented small value={mode} options={[['form', t.previewForm], ['done', t.previewDone]]} onChange={setMode} />
      </div>
      <div className="np-preview-frame" dir={LANG_META[lang].dir} lang={lang}>
        {mode === 'form' ? (
          <form className="contact-card form-card" onSubmit={(e) => e.preventDefault()} noValidate>
            <h3>{textIn(config.texts.title, lang)}</h3>
            <p className="sub">{textIn(config.texts.sub, lang)}</p>
            <QuoteFormFields config={config} lang={lang} service={service} onService={setService} sourceLang={source} onSourceLang={setSource}
              targetLang={target} onTargetLang={setTarget} onFilesChange={() => {}} idPrefix="pv-" />
            <button type="button" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} onClick={() => setMode('done')}>
              <span>{textIn(config.texts.submit, lang)}</span> <span className="arrow">→</span>
            </button>
          </form>
        ) : (
          <div className="contact-card form-card form-done">
            <div className="form-done-check" aria-hidden="true">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </div>
            <h3>{textIn(done.title, lang)}</h3>
            <p>{withPhone(textIn(done.text, lang), (i) => <a key={i} href={phoneHref(phone)} dir="ltr" onClick={(e) => e.preventDefault()}>{phone}</a>)}</p>
            <div className="form-done-actions">
              <span className="btn btn-primary">{withPhone(textIn(done.call, lang), (i) => <span key={i} dir="ltr">{phone}</span>)}</span>
              <button type="button" className="btn btn-secondary" onClick={() => setMode('form')}>{textIn(done.again, lang)}</button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default function FormEditor({ t, locale, onDirtyChange }) {
  const [state, setState] = useState({ loading: true });
  const [config, setConfig] = useState(null);
  const [baseline, setBaseline] = useState('');
  const [lang, setLang] = useState('de');
  const [section, setSection] = useState('fields');
  const [previewMode, setPreviewMode] = useState('form');
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState(null);
  const messageRef = useRef(null);

  const load = async () => {
    setState({ loading: true });
    setMessage(null);
    try {
      const data = await api();
      const start = data.draft?.config || data.published?.config || defaultFormConfig();
      setConfig(start);
      setBaseline(JSON.stringify(start));
      setState({ published: data.published, draft: data.draft, history: data.history || [] });
    } catch {
      setState({ error: true });
    }
  };
  useEffect(() => { load(); }, []);

  const dirty = Boolean(config) && JSON.stringify(config) !== baseline;
  useEffect(() => { onDirtyChange?.(dirty); }, [dirty, onDirtyChange]);
  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  useEffect(() => { if (message) messageRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, [message]);
  // The confirmation section previews the message, the other sections the form.
  useEffect(() => { setPreviewMode(section === 'confirmation' ? 'done' : 'form'); }, [section]);

  const update = (fn) => setConfig((current) => {
    const next = structuredClone(current);
    fn(next);
    return next;
  });
  const missing = useMemo(() => (config ? Object.fromEntries(SITE_LANGS.map((l) => [l, missingTexts(config, l)])) : {}), [config]);

  const fail = (error) => {
    if (error.status === 409) setMessage({ tone: 'warn', text: t.conflict, reload: true });
    else setMessage({ tone: 'warn', text: fill(t.saveFailed, { error: error.message }) });
  };
  const validate = () => {
    try {
      sanitizeFormConfig(config);
      return true;
    } catch (error) {
      setMessage({ tone: 'warn', text: fill(t.saveFailed, { error: error.message }) });
      return false;
    }
  };

  const saveDraft = async () => {
    if (!validate()) return;
    setBusy('save');
    try {
      const data = await api({ action: 'save', config, draftRev: state.draft?.rev || 0 });
      setState((s) => ({ ...s, draft: data.draft }));
      setConfig(data.draft.config);
      setBaseline(JSON.stringify(data.draft.config));
      setMessage({ tone: 'good', text: t.savedOk });
    } catch (error) { fail(error); } finally { setBusy(''); }
  };
  const publish = async () => {
    if (!validate() || !window.confirm(t.confirmPublish)) return;
    setBusy('publish');
    try {
      const data = await api({ action: 'publish', config, publishedRev: state.published?.rev || 0 });
      setState((s) => ({ ...s, published: data.published, draft: null, history: data.history }));
      setConfig(data.published.config);
      setBaseline(JSON.stringify(data.published.config));
      setMessage({ tone: 'good', text: t.publishedOk });
    } catch (error) { fail(error); } finally { setBusy(''); }
  };
  const discard = async () => {
    if (!window.confirm(t.confirmDiscard)) return;
    setBusy('discard');
    try {
      await api({ action: 'discard' });
      const live = state.published?.config || defaultFormConfig();
      setState((s) => ({ ...s, draft: null }));
      setConfig(live);
      setBaseline(JSON.stringify(live));
      setMessage({ tone: 'good', text: t.discarded });
    } catch (error) { fail(error); } finally { setBusy(''); }
  };
  const loadVersion = async (rev) => {
    try {
      const data = await api({ action: 'version', rev });
      setConfig(data.version.config);
      setSection('fields');
      setMessage({ tone: 'info', text: fill(t.loadedVersion, { rev }) });
    } catch (error) { fail(error); }
  };
  const loadDefault = () => {
    setConfig(defaultFormConfig());
    setSection('fields');
    setMessage({ tone: 'info', text: t.loadedDefault });
  };

  if (state.loading) return <div className="np-card"><p className="np-muted">{t.checking}</p></div>;
  if (state.error || !config) {
    return (
      <div className="np-notice np-notice--warn np-cms-msg">
        <TriangleAlert size={16} /> <span>{t.loadFailed}</span>
        <button type="button" className="np-btn np-btn--sm" onClick={load}>{t.reload}</button>
      </div>
    );
  }

  const status = dirty ? t.statusDirty
    : state.draft ? fill(t.statusDraft, { date: new Date(state.draft.savedAt).toLocaleString(locale) })
      : state.published ? fill(t.statusPublished, { rev: state.published.rev, date: new Date(state.published.publishedAt).toLocaleString(locale) })
        : t.statusDefault;
  const props = { config, lang, t, update };

  return (
    <div className="np-cms">
      <div className="np-cms-bar">
        <span className={`np-cms-status${dirty ? ' is-dirty' : ''}`}><i />{status}</span>
        <div className="np-cms-actions">
          {state.draft && !busy && <button type="button" className="np-btn np-btn--ghost np-btn--sm" onClick={discard}><RotateCcw size={14} /> {t.discardDraft}</button>}
          <button type="button" className="np-btn np-btn--ghost" onClick={saveDraft} disabled={!dirty || Boolean(busy)}><Save size={15} /> {busy === 'save' ? t.saving : t.saveDraft}</button>
          <button type="button" className="np-btn" onClick={publish} disabled={Boolean(busy) || (!dirty && !state.draft && Boolean(state.published))}>
            <Rocket size={15} /> {busy === 'publish' ? t.publishing : t.publish}
          </button>
        </div>
      </div>

      {message && (
        <div ref={messageRef} className={`np-notice np-cms-msg${message.tone === 'warn' ? ' np-notice--warn' : message.tone === 'good' ? ' np-notice--good' : ''}`} role="status">
          {message.tone === 'warn' ? <TriangleAlert size={16} /> : <Check size={16} />}
          <span>{message.text}</span>
          {message.reload && <button type="button" className="np-btn np-btn--sm" onClick={load}>{t.reload}</button>}
        </div>
      )}

      <div className="np-cms-tabs">
        <Segmented value={section} onChange={setSection} options={[['fields', t.secFields], ['languages', t.secLanguages], ['confirmation', t.secConfirmation], ['history', t.secHistory]]} />
      </div>

      {section !== 'history' && (
        <div className="np-cms-langs">
          <span className="np-muted">{t.textsIn}</span>
          <div className="np-langchips" role="group" aria-label={t.textsIn}>
            {SITE_LANGS.map((l) => (
              <button key={l} type="button" className={lang === l ? 'is-active' : ''} aria-pressed={lang === l} onClick={() => setLang(l)}
                title={missing[l] ? fill(t.missing, { n: missing[l] }) : t.allTranslated}>
                {l.toUpperCase()}
                {missing[l] > 0 && <b>{missing[l]}</b>}
              </button>
            ))}
          </div>
          <span className="np-muted np-cms-note">{t.layoutNote}</span>
        </div>
      )}

      <div className={`np-cms-grid${section === 'history' ? ' is-single' : ''}`}>
        <div className="np-cms-col">
          {section === 'fields' && <FieldsSection {...props} />}
          {section === 'languages' && <LanguagesSection {...props} />}
          {section === 'confirmation' && <ConfirmationSection {...props} />}
          {section === 'history' && (
            <HistorySection history={state.history} published={state.published} t={t} locale={locale} onLoadVersion={loadVersion} onLoadDefault={loadDefault} />
          )}
        </div>
        {section !== 'history' && (
          <Preview config={config} lang={lang} t={t} mode={previewMode} setMode={setPreviewMode} />
        )}
      </div>
    </div>
  );
}
