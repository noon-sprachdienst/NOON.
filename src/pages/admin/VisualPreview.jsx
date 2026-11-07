import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Eye, EyeOff, GripVertical, MousePointerClick, Plus, Trash2 } from 'lucide-react';
import QuoteFormFields from '../../components/QuoteFormFields.jsx';
import { CUSTOM_TYPES, LIMITS, LOCKED_FIELDS, phoneHref, textIn } from '../../data/formSchema.js';
import { LANG_META } from '../../data/translations.js';
import { fill } from './i18n.js';

// Text written straight into the preview. The DOM owns the text while it has focus, so the
// caret never jumps; the value is pushed to the editor state on every keystroke.
function InlineText({ value, fallback, onChange, dir, className = '', as: Tag = 'span' }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (el && document.activeElement !== el && el.textContent !== (value || '')) el.textContent = value || '';
  }, [value]);
  return (
    <Tag
      ref={ref}
      className={`np-inline ${className}`}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      dir={dir}
      role="textbox"
      data-placeholder={fallback || ''}
      onInput={(e) => onChange(e.currentTarget.textContent)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Escape') { e.preventDefault(); e.currentTarget.blur(); }
        e.stopPropagation();
      }}
      onPaste={(e) => {
        e.preventDefault();
        document.execCommand('insertText', false, e.clipboardData.getData('text/plain').replace(/\s*\n\s*/g, ' '));
      }}
    />
  );
}

function Segmented({ value, options, onChange }) {
  return (
    <div className="np-seg np-seg--sm" role="group">
      {options.map(([key, label]) => (
        <button key={key} type="button" className={value === key ? 'is-active' : ''} aria-pressed={value === key} onClick={() => onChange(key)}>{label}</button>
      ))}
    </div>
  );
}

// The quote form as the visitor sees it. In "Edit" mode every element can be clicked (opens its
// settings in the panel), its texts can be typed in place, fields can be dragged by the handle,
// moved, hidden or deleted from the small toolbar, and "+" inserts a new field right there.
export default function VisualPreview({ config, lang, t, update, mode, setMode, selectedKey, onSelect, onInsertField, onDeleteField }) {
  const [tool, setTool] = useState('edit');
  const [service, setService] = useState('translation');
  const [source, setSource] = useState(config.defaultSource);
  const [target, setTarget] = useState(config.defaultTarget);
  const [drag, setDrag] = useState(null);
  const [drop, setDrop] = useState(null);
  const [addAt, setAddAt] = useState(null);
  useEffect(() => { setSource(config.defaultSource); setTarget(config.defaultTarget); }, [config.defaultSource, config.defaultTarget]);
  useEffect(() => {
    if (!addAt) return undefined;
    const close = () => setAddAt(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [addAt]);

  const editing = tool === 'edit';
  const dir = LANG_META[lang].dir;
  const fallback = (map) => (lang !== 'de' && map?.de) || t.emptyText;
  const edit = (map, onSet, className) => (
    <InlineText value={map?.[lang] || ''} fallback={fallback(map)} dir={dir} className={className} onChange={(value) => onSet({ ...(map || {}), [lang]: value })} />
  );
  const text = (map, onSet, className) => (editing ? edit(map, onSet, className) : textIn(map, lang));
  const done = config.confirmation;
  const phone = done.phone || '+49 160 956 27 666';
  const withPhone = (value, wrap) => value.split('{phone}').flatMap((part, i) => (i ? [wrap(i), part] : [part]));

  const moveField = (dragId, targetId, pos) => update((c) => {
    const from = c.fields.findIndex((f) => f.id === dragId);
    if (from < 0 || dragId === targetId) return;
    const [item] = c.fields.splice(from, 1);
    const to = c.fields.findIndex((f) => f.id === targetId);
    c.fields.splice(pos === 'after' ? to + 1 : to, 0, item);
  });
  const stepBy = (id, delta) => update((c) => {
    const from = c.fields.findIndex((f) => f.id === id);
    const to = from + delta;
    if (to < 0 || to >= c.fields.length) return;
    const [item] = c.fields.splice(from, 1);
    c.fields.splice(to, 0, item);
  });
  const moveStep = (dragId, targetId, pos) => update((c) => {
    const from = c.steps.findIndex((s) => s.id === dragId);
    if (from < 0 || dragId === targetId) return;
    const [item] = c.steps.splice(from, 1);
    const to = c.steps.findIndex((s) => s.id === targetId);
    c.steps.splice(pos === 'after' ? to + 1 : to, 0, item);
  });

  // Selection outline + click target around any preview element.
  const box = (key, children, className = '') => (editing ? (
    <div className={`np-pv-el ${className}${selectedKey === key ? ' is-selected' : ''}`} onClick={(e) => { e.stopPropagation(); onSelect(key); }}>
      {children}
    </div>
  ) : children);

  const dropProps = (kind, id, axis) => ({
    onDragOver: (e) => {
      if (drag?.kind !== kind || drag.id === id) return;
      e.preventDefault();
      const r = e.currentTarget.getBoundingClientRect();
      const first = axis === 'x' ? (dir === 'rtl' ? e.clientX > r.left + r.width / 2 : e.clientX < r.left + r.width / 2) : e.clientY < r.top + r.height / 2;
      setDrop({ id, pos: first ? 'before' : 'after' });
    },
    onDragLeave: () => setDrop((d) => (d?.id === id ? null : d)),
    onDrop: (e) => {
      e.preventDefault();
      if (drag && drop) (kind === 'field' ? moveField : moveStep)(drag.id, id, drop.pos);
      setDrag(null);
      setDrop(null);
    },
  });
  const grip = (kind, id) => (
    <span className="np-pv-grip" draggable title={t.drag} aria-label={t.drag}
      onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', id); setDrag({ kind, id }); onSelect(`${kind}:${id}`); }}
      onDragEnd={() => { setDrag(null); setDrop(null); }}>
      <GripVertical size={13} />
    </span>
  );

  // In edit mode hidden fields are shown faded, so they can be clicked and shown again.
  const original = (id) => config.fields.find((f) => f.id === id);
  const previewConfig = editing ? { ...config, fields: config.fields.map((f) => ({ ...f, hidden: false })) } : config;
  const fieldIndex = (id) => config.fields.findIndex((f) => f.id === id);

  const wrapField = (field, node) => {
    const real = original(field.id);
    const key = `field:${field.id}`;
    const locked = LOCKED_FIELDS.includes(field.id);
    const index = fieldIndex(field.id);
    return (
      <div key={field.id} {...dropProps('field', field.id, 'y')}
        className={`np-pv-el np-pv-field${selectedKey === key ? ' is-selected' : ''}${real?.hidden ? ' is-ghost' : ''}${drop?.id === field.id ? ` is-drop-${drop.pos}` : ''}`}
        onClickCapture={(e) => { if (e.target.closest('.np-pv-chip, .np-pv-add, .np-addmenu, .np-inline')) return; e.preventDefault(); }}
        onClick={(e) => { e.stopPropagation(); onSelect(key); }}>
        <div className="np-pv-chip" onClick={(e) => e.stopPropagation()}>
          {grip('field', field.id)}
          <em>{t.types[field.type]}{real?.hidden ? ` · ${t.hidden}` : ''}</em>
          <button type="button" disabled={index <= 0} onClick={() => stepBy(field.id, -1)} title={t.moveUp} aria-label={t.moveUp}><ArrowUp size={12} /></button>
          <button type="button" disabled={index >= config.fields.length - 1} onClick={() => stepBy(field.id, 1)} title={t.moveDown} aria-label={t.moveDown}><ArrowDown size={12} /></button>
          {real?.builtin && !locked && (
            <button type="button" onClick={() => update((c) => { const f = c.fields.find((x) => x.id === field.id); f.hidden = !f.hidden; })} title={real.hidden ? t.unhide : t.hide} aria-label={real.hidden ? t.unhide : t.hide}>
              {real.hidden ? <Eye size={12} /> : <EyeOff size={12} />}
            </button>
          )}
          {!real?.builtin && (
            <button type="button" className="is-danger" onClick={() => onDeleteField(field.id)} title={t.delete} aria-label={t.delete}><Trash2 size={12} /></button>
          )}
        </div>
        {node}
        <button type="button" className="np-pv-add" title={t.insertHere} aria-label={t.insertHere} onClick={(e) => { e.stopPropagation(); setAddAt(addAt === field.id ? null : field.id); }}>
          <Plus size={13} />
        </button>
        {addAt === field.id && (
          <div className="np-addmenu np-pv-addmenu" role="menu" onClick={(e) => e.stopPropagation()}>
            <span>{t.insertHere}</span>
            {CUSTOM_TYPES.map((type) => (
              <button key={type} type="button" role="menuitem" onClick={() => { onInsertField(field.id, type); setAddAt(null); }}>{t.types[type]}</button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderText = (field, prop, value) => edit(field[prop], (map) => update((c) => { c.fields.find((f) => f.id === field.id)[prop] = map; }));
  const steps = config.steps || [];

  return (
    <aside className="np-preview">
      <div className="np-preview-head">
        <strong>{t.preview}</strong>
        <div className="np-preview-controls">
          <Segmented value={tool} onChange={(v) => { setTool(v); setAddAt(null); }} options={[['edit', t.pvEdit], ['test', t.pvTest]]} />
          <Segmented value={mode} onChange={setMode} options={[['form', t.previewForm], ['done', t.previewDone]]} />
          {mode === 'form' && editing && (
            <Segmented value={service} onChange={setService} options={(config.fields.find((f) => f.type === 'service')?.options || []).map((o) => [o.id, textIn(o.label, lang)])} />
          )}
        </div>
      </div>
      {editing && <p className="np-pv-hint"><MousePointerClick size={14} /> {t.pvHint}</p>}

      <div className={`np-preview-frame${editing ? ' np-edit' : ''}`} dir={dir} lang={lang} onClick={() => setAddAt(null)}>
        {mode === 'form' && config.section && box('section', (
          <div className="np-pv-section">
            <span className="np-pv-eyebrow">{text(config.section.eyebrow, (v) => update((c) => { c.section.eyebrow = v; }))}</span>
            <strong>{text(config.section.title, (v) => update((c) => { c.section.title = v; }))}</strong>
            <p>{text(config.section.sub, (v) => update((c) => { c.section.sub = v; }))}</p>
            <ol className="np-pv-steps" style={{ '--steps': steps.length + (editing && steps.length < LIMITS.maxSteps ? 1 : 0) }}>
              {steps.map((step, i) => {
                const key = `step:${step.id}`;
                return (
                  <li key={step.id} {...(editing ? dropProps('step', step.id, 'x') : {})}
                    className={`${i === 0 ? 'is-first' : ''}${editing ? ' np-pv-el np-pv-step' : ''}${selectedKey === key ? ' is-selected' : ''}${drop?.id === step.id ? ` is-drop-${drop.pos}` : ''}`}
                    onClick={editing ? (e) => { e.stopPropagation(); onSelect(key); } : undefined}>
                    {editing && (
                      <div className="np-pv-chip np-pv-chip--step" onClick={(e) => e.stopPropagation()}>
                        {grip('step', step.id)}
                        <button type="button" className="is-danger" disabled={steps.length <= LIMITS.minSteps} onClick={() => update((c) => { c.steps = c.steps.filter((s) => s.id !== step.id); })} title={t.delete} aria-label={t.delete}><Trash2 size={12} /></button>
                      </div>
                    )}
                    <i>{String(i + 1).padStart(2, '0')}</i>
                    <b>{text(step.label, (v) => update((c) => { c.steps.find((s) => s.id === step.id).label = v; }))}</b>
                    <small>{text(step.desc, (v) => update((c) => { c.steps.find((s) => s.id === step.id).desc = v; }))}</small>
                  </li>
                );
              })}
              {editing && steps.length < LIMITS.maxSteps && (
                <li className="np-pv-addstep">
                  <button type="button" onClick={(e) => {
                    e.stopPropagation();
                    const id = `s${Math.random().toString(36).slice(2, 8)}`;
                    update((c) => { c.steps = [...(c.steps || []), { id, label: { de: t.newStep, ...(lang !== 'de' ? { [lang]: t.newStep } : {}) }, desc: {} }]; });
                    onSelect(`step:${id}`);
                  }} title={t.addStep} aria-label={t.addStep}><Plus size={14} /></button>
                  <small>{t.addStep}</small>
                </li>
              )}
            </ol>
          </div>
        ))}

        {mode === 'form' ? (
          <form className="contact-card form-card" onSubmit={(e) => e.preventDefault()} noValidate>
            {box('formtexts', (
              <>
                <h3>{text(config.texts.title, (v) => update((c) => { c.texts.title = v; }))}</h3>
                <p className="sub">{text(config.texts.sub, (v) => update((c) => { c.texts.sub = v; }))}</p>
              </>
            ))}
            <QuoteFormFields
              config={previewConfig} lang={lang} service={service} onService={setService} sourceLang={source} onSourceLang={setSource}
              targetLang={target} onTargetLang={setTarget} onFilesChange={() => {}} idPrefix="pv-"
              editing={editing} renderText={editing ? renderText : undefined} wrapField={editing ? wrapField : undefined}
            />
            {editing ? box('formtexts', (
              <div className="btn btn-primary np-pv-submit">
                {edit(config.texts.submit, (v) => update((c) => { c.texts.submit = v; }))} <span className="arrow">→</span>
              </div>
            )) : (
              <button type="button" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} onClick={() => setMode('done')}>
                <span>{textIn(config.texts.submit, lang)}</span> <span className="arrow">→</span>
              </button>
            )}
          </form>
        ) : box('confirm', (
          <div className="contact-card form-card form-done">
            <div className="form-done-check" aria-hidden="true">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </div>
            <h3>{text(done.title, (v) => update((c) => { c.confirmation.title = v; }))}</h3>
            <p>
              {editing
                ? edit(done.text, (v) => update((c) => { c.confirmation.text = v; }))
                : withPhone(textIn(done.text, lang), (i) => <a key={i} href={phoneHref(phone)} dir="ltr" onClick={(e) => e.preventDefault()}>{phone}</a>)}
            </p>
            {editing && <small className="np-pv-token">{fill(t.phoneToken, { phone })}</small>}
            <div className="form-done-actions">
              <span className="btn btn-primary">
                {editing ? edit(done.call, (v) => update((c) => { c.confirmation.call = v; })) : withPhone(textIn(done.call, lang), (i) => <span key={i} dir="ltr">{phone}</span>)}
              </span>
              {editing
                ? <span className="btn btn-secondary">{edit(done.again, (v) => update((c) => { c.confirmation.again = v; }))}</span>
                : <button type="button" className="btn btn-secondary" onClick={() => setMode('form')}>{textIn(done.again, lang)}</button>}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
