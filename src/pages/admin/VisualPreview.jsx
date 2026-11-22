import { useEffect, useState } from 'react';
import {
  ArrowDown, ArrowUp, Eye, EyeOff, GripVertical, Maximize2, Minimize2, Monitor, MousePointerClick, Plus, Smartphone, Tablet, Trash2,
} from 'lucide-react';
import QuoteFormFields from '../../components/QuoteFormFields.jsx';
import ContactCard from '../../components/ContactCard.jsx';
import { CmsProvider, CmsText, EditBox, InlineText } from '../../components/cms/Editable.jsx';
import {
  CUSTOM_TYPES, isFieldHidden, isHidden, LIMITS, NEW_TEXTS, phoneHref, STEP_LIMITS, styleOf, textCss, textIn,
} from '../../data/formSchema.js';
import { setHidden, UNHIDEABLE } from './ElementBar.jsx';
import PageCanvas from './PageCanvas.jsx';
import { LANG_META } from '../../data/translations.js';
import { fill } from './i18n.js';

function Segmented({ value, options, onChange }) {
  return (
    <div className="np-seg np-seg--sm" role="group">
      {options.map(([key, label]) => (
        <button key={key} type="button" className={value === key ? 'is-active' : ''} aria-pressed={value === key} onClick={() => onChange(key)}>{label}</button>
      ))}
    </div>
  );
}

// The quote section as the visitor sees it, at the chosen device width (PageCanvas). In "Edit" mode every element can be clicked (opens its
// settings in the panel), its texts can be typed in place, fields can be dragged by the handle,
// moved, hidden or deleted from the small toolbar, and "+" inserts a new field right there.
export default function VisualPreview({ config, lang, t, update, mode, setMode, selectedKey, onSelect, onInsertField, onDeleteField, scope, tool, setTool, device, setDevice, wide, setWide }) {
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
  const edit = (map, onSet, className, max) => (
    <InlineText value={map?.[lang] || ''} fallback={fallback(map)} dir={dir} className={className} max={max} onChange={(value) => onSet({ ...(map || {}), [lang]: value })} />
  );
  const text = (map, onSet, className, max) => (editing ? edit(map, onSet, className, max) : textIn(map, lang));
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
        {config.fields.length < LIMITS.fields && <button type="button" className="np-pv-add" title={t.insertHere} aria-label={t.insertHere} onClick={(e) => { e.stopPropagation(); setAddAt(addAt === field.id ? null : field.id); }}>
          <Plus size={13} />
        </button>}
        {addAt === field.id && config.fields.length < LIMITS.fields && (
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

  const renderText = (field, prop) => edit(field[prop], (map) => update((c) => { c.fields.find((f) => f.id === field.id)[prop] = map; }), undefined, LIMITS[prop]);
  const steps = (config.steps || []).filter((step) => visible(`step:${step.id}`));
  const stepHidden = (key) => isHidden(config, key, lang);
  const canAddStep = editing && (config.steps || []).length < LIMITS.maxSteps;
  // Shared with the website: <CmsText> and <ContactCard> read this to become editable.
  const cms = { config, lang, editing, update, selectedKey, onSelect, emptyText: t.emptyText };

  return (
    <aside className={`np-preview${wide ? ' is-wide' : ''}`}>
      <div className="np-preview-head">
        <strong>{t.preview}</strong>
        <div className="np-preview-controls">
          <Segmented value={tool} onChange={(v) => { setTool(v); setAddAt(null); }} options={[['edit', t.pvEdit], ['test', t.pvTest]]} />
          <Segmented value={mode} onChange={setMode} options={[['form', t.previewForm], ['done', t.previewDone]]} />
          {mode === 'form' && editing && (
            <Segmented value={service} onChange={setService} options={(config.fields.find((f) => f.type === 'service')?.options || []).map((o) => [o.id, textIn(o.label, lang)])} />
          )}
          <div className="np-seg np-seg--sm" role="group" aria-label={t.pvDevice}>
            {[['desktop', Monitor, t.pvDesktop], ['tablet', Tablet, t.pvTablet], ['phone', Smartphone, t.pvPhone]].map(([key, Icon, label]) => (
              <button key={key} type="button" className={device === key ? 'is-active' : ''} aria-pressed={device === key} title={label} aria-label={label} onClick={() => setDevice(key)}><Icon size={14} /></button>
            ))}
          </div>
          <button type="button" className="np-mini" onClick={() => setWide(!wide)} title={wide ? t.pvNormal : t.pvWide} aria-label={wide ? t.pvNormal : t.pvWide}>
            {wide ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </div>
      {editing && <p className="np-pv-hint"><MousePointerClick size={14} /> {t.pvHint}</p>}

      <div className="np-preview-frame">
        <PageCanvas device={device} lang={lang} dir={dir}>
          <CmsProvider value={cms}>
            {/* The section exactly as on the website (HowContact), with edit tools while editing. */}
            <div className={editing ? 'np-edit' : undefined} dir={dir} lang={lang} onClick={() => setAddAt(null)}>
              <section className="how-contact">
                <div className="wrap">
                  {mode === 'form' && (
                    <>
                      <CmsText k="section.eyebrow" as="div" className="section-eyebrow" />
                      <CmsText k="section.title" as="h2" />
                      <CmsText k="section.sub" as="p" className="section-sub" />
                      {visible('steps') && (
                        <EditBox k="steps" className="np-pv-stepsbox">
                          <div className="steps-bar" style={{ '--steps': steps.length + (canAddStep ? 1 : 0) }}>
                            {steps.map((step, i) => {
                              const key = `step:${step.id}`;
                              return (
                                <div key={step.id} {...(editing ? dropProps('step', step.id, 'x') : {})}
                                  className={`step${i === 0 ? ' active' : ''}${editing ? ' np-pv-el np-pv-step' : ''}${selectedKey === key ? ' is-selected' : ''}${editing && stepHidden(key) ? ' is-ghost' : ''}${drop?.id === step.id ? ` is-drop-${drop.pos}` : ''}`}
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
                                  <div className="step-circle" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
                                  <div className="step-label" style={css(key)}>{text(step.label, (v) => update((c) => { c.steps.find((s) => s.id === step.id).label = v; }), undefined, STEP_LIMITS.label)}</div>
                                  <div className="step-desc">{text(step.desc, (v) => update((c) => { c.steps.find((s) => s.id === step.id).desc = v; }), undefined, STEP_LIMITS.desc)}</div>
                                </div>
                              );
                            })}
                            {canAddStep && (
                              <div className="step np-pv-addstep">
                                <button type="button" onClick={(e) => {
                                  e.stopPropagation();
                                  const id = `s${Math.random().toString(36).slice(2, 8)}`;
                                  update((c) => { c.steps = [...(c.steps || []), { id, label: { ...NEW_TEXTS.step }, desc: {} }]; });
                                  onSelect(`step:${id}`);
                                }} title={t.addStep} aria-label={t.addStep}><Plus size={16} /></button>
                                <small>{t.addStep}</small>
                              </div>
                            )}
                          </div>
                        </EditBox>
                      )}
                    </>
                  )}

                  <div className="contact-grid">
                    <ContactCard lang={lang} />
                    {mode === 'form' ? (
                      <form className="contact-card form-card" onSubmit={(e) => e.preventDefault()} noValidate>
                        <CmsText k="form.title" as="h3" />
                        <CmsText k="form.sub" as="p" className="sub" />
                        <QuoteFormFields
                          config={config} lang={lang} service={service} onService={setService} sourceLang={source} onSourceLang={setSource}
                          targetLang={target} onTargetLang={setTarget} onFilesChange={() => {}} idPrefix="pv-"
                          editing={editing} renderText={editing ? renderText : undefined} wrapField={editing ? wrapField : undefined}
                        />
                        <CmsText k="submit" as="button" type="button" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                          editAs="div" editClass="np-pv-submit" onClick={() => setMode('done')} after={<> <span className="arrow">→</span></>} />
                      </form>
                    ) : (
                      <div className="contact-card form-card form-done">
                        <div className="form-done-check" aria-hidden="true">
                          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                        </div>
                        <CmsText k="confirm.title" as="h3" />
                        <CmsText k="confirm.text" as="p" format={(value) => withPhone(value, (i) => <a key={i} href={phoneHref(phone)} dir="ltr" onClick={(e) => e.preventDefault()}>{phone}</a>)} />
                        {editing && <small className="np-pv-token">{fill(t.phoneToken, { phone })}</small>}
                        <div className="form-done-actions">
                          <CmsText k="confirm.call" className="btn btn-primary" boxClass="np-pv-inlinebox" format={(value) => withPhone(value, (i) => <span key={i} dir="ltr">{phone}</span>)} />
                          <CmsText k="confirm.again" as="button" type="button" className="btn btn-secondary" boxClass="np-pv-inlinebox" onClick={() => setMode('form')} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </CmsProvider>
        </PageCanvas>
      </div>
    </aside>
  );
}
