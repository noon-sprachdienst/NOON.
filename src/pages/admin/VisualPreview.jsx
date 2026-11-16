import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Eye, EyeOff, GripVertical, MousePointerClick, Plus, Trash2 } from 'lucide-react';
import QuoteFormFields from '../../components/QuoteFormFields.jsx';
import {
  buttonCss, CUSTOM_TYPES, isFieldHidden, isHidden, LIMITS, NEW_TEXTS, phoneHref, styleOf, textCss, textIn,
} from '../../data/formSchema.js';
import { focusEnd, setHidden, UNHIDEABLE } from './ElementBar.jsx';
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
export default function VisualPreview({ config, lang, t, update, mode, setMode, selectedKey, onSelect, onInsertField, onDeleteField, scope, tool, setTool }) {
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

  // Hidden elements are left out of "Try out" and shown faded while editing, so they can be shown again.
  const visible = (key) => editing || !isHidden(config, key, lang);
  const css = (key) => textCss(styleOf(config, key, lang));
  const btnCss = (key) => buttonCss(styleOf(config, key, lang));
  // Selection outline + click target around any preview element. A click anywhere on the
  // element (also next to its text, e.g. on the button padding) puts the caret into its text.
  const box = (key, children, className = '') => (editing ? (
    <div className={`np-pv-el ${className}${selectedKey === key ? ' is-selected' : ''}${isHidden(config, key, lang) ? ' is-ghost' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(key);
        const inline = e.currentTarget.querySelector('.np-inline');
        if (inline && !e.target.closest('.np-inline')) focusEnd(inline);
      }}>
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

  const fieldIndex = (id) => config.fields.findIndex((f) => f.id === id);
  const toggleHidden = (key) => update((c) => setHidden(c, key, !(key.startsWith('field:')
    ? isFieldHidden(c, c.fields.find((f) => `field:${f.id}` === key), lang) : isHidden(c, key, lang)), scope, lang));

  const wrapField = (field, node) => {
    const key = `field:${field.id}`;
    const hidden = isFieldHidden(config, field, lang);
    const index = fieldIndex(field.id);
    return (
      <div key={field.id} {...dropProps('field', field.id, 'y')}
        className={`np-pv-el np-pv-field${selectedKey === key ? ' is-selected' : ''}${hidden ? ' is-ghost' : ''}${drop?.id === field.id ? ` is-drop-${drop.pos}` : ''}`}
        onClickCapture={(e) => { if (e.target.closest('.np-pv-chip, .np-pv-add, .np-addmenu, .np-inline')) return; e.preventDefault(); }}
        onClick={(e) => { e.stopPropagation(); onSelect(key); }}>
        <div className="np-pv-chip" onClick={(e) => e.stopPropagation()}>
          {grip('field', field.id)}
          <em>{t.types[field.type]}{hidden ? ` · ${t.hidden}` : ''}</em>
          <button type="button" disabled={index <= 0} onClick={() => stepBy(field.id, -1)} title={t.moveUp} aria-label={t.moveUp}><ArrowUp size={12} /></button>
          <button type="button" disabled={index >= config.fields.length - 1} onClick={() => stepBy(field.id, 1)} title={t.moveDown} aria-label={t.moveDown}><ArrowDown size={12} /></button>
          {!UNHIDEABLE.includes(key) && (
            <button type="button" onClick={() => toggleHidden(key)} title={hidden ? t.unhide : t.hide} aria-label={hidden ? t.unhide : t.hide}>
              {hidden ? <Eye size={12} /> : <EyeOff size={12} />}
            </button>
          )}
          {!field.builtin && (
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

  const renderText = (field, prop) => edit(field[prop], (map) => update((c) => { c.fields.find((f) => f.id === field.id)[prop] = map; }));
  const steps = (config.steps || []).filter((step) => visible(`step:${step.id}`));
  // One text element of the preview: selectable box, its style, and inline editing.
  const piece = (key, map, onSet, Tag, className) => visible(key) && box(key, (
    <Tag className={className} style={css(key)}>{text(map, onSet)}</Tag>
  ));
  const setSection = (prop) => (v) => update((c) => { c.section[prop] = v; });
  const setText = (prop) => (v) => update((c) => { c.texts[prop] = v; });
  const setDone = (prop) => (v) => update((c) => { c.confirmation[prop] = v; });
  const stepHidden = (key) => isHidden(config, key, lang);

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
        {mode === 'form' && config.section && (
          <div className="np-pv-section">
            {piece('section.eyebrow', config.section.eyebrow, setSection('eyebrow'), 'span', 'np-pv-eyebrow')}
            {piece('section.title', config.section.title, setSection('title'), 'strong', 'np-pv-title')}
            {piece('section.sub', config.section.sub, setSection('sub'), 'p', 'np-pv-sub')}
            {visible('steps') && box('steps', (
              <ol className="np-pv-steps" style={{ '--steps': steps.length + (editing && steps.length < LIMITS.maxSteps ? 1 : 0) }}>
                {steps.map((step, i) => {
                  const key = `step:${step.id}`;
                  return (
                    <li key={step.id} {...(editing ? dropProps('step', step.id, 'x') : {})}
                      className={`${i === 0 ? 'is-first' : ''}${editing ? ' np-pv-el np-pv-step' : ''}${selectedKey === key ? ' is-selected' : ''}${editing && stepHidden(key) ? ' is-ghost' : ''}${drop?.id === step.id ? ` is-drop-${drop.pos}` : ''}`}
                      onClick={editing ? (e) => { e.stopPropagation(); onSelect(key); } : undefined}>
                      {editing && (
                        <div className="np-pv-chip np-pv-chip--step" onClick={(e) => e.stopPropagation()}>
                          {grip('step', step.id)}
                          <button type="button" onClick={() => toggleHidden(key)} title={stepHidden(key) ? t.unhide : t.hide} aria-label={stepHidden(key) ? t.unhide : t.hide}>
                            {stepHidden(key) ? <Eye size={12} /> : <EyeOff size={12} />}
                          </button>
                          <button type="button" className="is-danger" disabled={(config.steps || []).length <= LIMITS.minSteps} onClick={() => update((c) => { c.steps = c.steps.filter((s) => s.id !== step.id); })} title={t.delete} aria-label={t.delete}><Trash2 size={12} /></button>
                        </div>
                      )}
                      <i>{String(i + 1).padStart(2, '0')}</i>
                      <b style={css(key)}>{text(step.label, (v) => update((c) => { c.steps.find((s) => s.id === step.id).label = v; }))}</b>
                      <small>{text(step.desc, (v) => update((c) => { c.steps.find((s) => s.id === step.id).desc = v; }))}</small>
                    </li>
                  );
                })}
                {editing && (config.steps || []).length < LIMITS.maxSteps && (
                  <li className="np-pv-addstep">
                    <button type="button" onClick={(e) => {
                      e.stopPropagation();
                      const id = `s${Math.random().toString(36).slice(2, 8)}`;
                      update((c) => { c.steps = [...(c.steps || []), { id, label: { ...NEW_TEXTS.step }, desc: {} }]; });
                      onSelect(`step:${id}`);
                    }} title={t.addStep} aria-label={t.addStep}><Plus size={14} /></button>
                    <small>{t.addStep}</small>
                  </li>
                )}
              </ol>
            ), 'np-pv-stepsbox')}
          </div>
        )}

        {mode === 'form' ? (
          <form className="contact-card form-card" onSubmit={(e) => e.preventDefault()} noValidate>
            {piece('form.title', config.texts.title, setText('title'), 'h3')}
            {piece('form.sub', config.texts.sub, setText('sub'), 'p', 'sub')}
            <QuoteFormFields
              config={config} lang={lang} service={service} onService={setService} sourceLang={source} onSourceLang={setSource}
              targetLang={target} onTargetLang={setTarget} onFilesChange={() => {}} idPrefix="pv-"
              editing={editing} renderText={editing ? renderText : undefined} wrapField={editing ? wrapField : undefined}
            />
            {editing ? box('submit', (
              <div className="btn btn-primary np-pv-submit" style={btnCss('submit')}>
                <span style={css('submit')}>{edit(config.texts.submit, setText('submit'))}</span> <span className="arrow">→</span>
              </div>
            )) : (
              <button type="button" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8, ...btnCss('submit') }} onClick={() => setMode('done')}>
                <span style={css('submit')}>{textIn(config.texts.submit, lang)}</span> <span className="arrow">→</span>
              </button>
            )}
          </form>
        ) : (
          <div className="contact-card form-card form-done">
            <div className="form-done-check" aria-hidden="true">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </div>
            {piece('confirm.title', done.title, setDone('title'), 'h3')}
            {visible('confirm.text') && box('confirm.text', (
              <p style={css('confirm.text')}>
                {editing
                  ? edit(done.text, setDone('text'))
                  : withPhone(textIn(done.text, lang), (i) => <a key={i} href={phoneHref(phone)} dir="ltr" onClick={(e) => e.preventDefault()}>{phone}</a>)}
              </p>
            ))}
            {editing && <small className="np-pv-token">{fill(t.phoneToken, { phone })}</small>}
            <div className="form-done-actions">
              {visible('confirm.call') && box('confirm.call', (
                <span className="btn btn-primary" style={btnCss('confirm.call')}>
                  <span style={css('confirm.call')}>
                    {editing ? edit(done.call, setDone('call')) : withPhone(textIn(done.call, lang), (i) => <span key={i} dir="ltr">{phone}</span>)}
                  </span>
                </span>
              ), 'np-pv-inlinebox')}
              {visible('confirm.again') && box('confirm.again', editing ? (
                <span className="btn btn-secondary" style={btnCss('confirm.again')}><span style={css('confirm.again')}>{edit(done.again, setDone('again'))}</span></span>
              ) : (
                <button type="button" className="btn btn-secondary" style={btnCss('confirm.again')} onClick={() => setMode('form')}><span style={css('confirm.again')}>{textIn(done.again, lang)}</span></button>
              ), 'np-pv-inlinebox')}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
