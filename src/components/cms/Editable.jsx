import { createContext, useContext, useLayoutEffect, useRef } from 'react';
import { buttonCss, CMS_ELEMENTS, isHidden, styleOf, textAt, textCss, textIn } from '../../data/formSchema.js';
import { LANG_META } from '../../data/translations.js';

// Building blocks for everything the CMS can edit, shared by the website and the admin preview,
// so a section is written once. On the website (no provider, or editing: false) they render
// plain elements with the admin's hide and style settings. In the admin preview the same
// elements can be clicked, typed into, and hidden ones show faded so they can be shown again.
// How to make a new element editable: see CMS_ELEMENTS in data/formSchema.js.

const CmsContext = createContext({ config: null, lang: 'de', editing: false });
export const CmsProvider = CmsContext.Provider;
export const useCms = () => useContext(CmsContext);

// Puts the caret at the end of an inline text box. Uses the element's own document, because
// the admin preview renders the page inside an iframe.
export function focusEnd(el) {
  el.focus();
  const doc = el.ownerDocument;
  const range = doc.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const selection = doc.defaultView.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

// Text written straight into the preview. The DOM owns the text while it has focus, so the
// caret never jumps; the value is pushed to the editor state on every keystroke.
// `max` is the length the server accepts; longer input is cut while typing or pasting.
export function InlineText({ value, fallback, onChange, dir, className = '', max }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (el && el.ownerDocument.activeElement !== el && el.textContent !== (value || '')) el.textContent = value || '';
  }, [value]);
  return (
    <span
      ref={ref}
      className={`np-inline ${className}`}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      dir={dir}
      role="textbox"
      data-placeholder={fallback || ''}
      onInput={(e) => {
        const el = e.currentTarget;
        if (max && el.textContent.length > max) {
          el.textContent = el.textContent.slice(0, max);
          focusEnd(el);
        }
        onChange(el.textContent);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Escape') { e.preventDefault(); e.currentTarget.blur(); }
        e.stopPropagation();
      }}
      onPaste={(e) => {
        e.preventDefault();
        e.currentTarget.ownerDocument.execCommand('insertText', false, e.clipboardData.getData('text/plain').replace(/\s*\n\s*/g, ' '));
      }}
    />
  );
}

// Hide and style settings of one element in the current language.
export function useLook(key) {
  const { config, lang } = useCms();
  const style = styleOf(config, key, lang);
  return { hidden: isHidden(config, key, lang), css: textCss(style), btnCss: buttonCss(style) };
}

// Selection outline and click target around an element (admin preview only). A click anywhere
// on it (also next to the text, e.g. on a button's padding) puts the caret into its text.
export function EditBox({ k, className = '', children }) {
  const { editing, selectedKey, onSelect, config, lang } = useCms();
  if (!editing) return children;
  return (
    <div
      className={`np-pv-el ${className}${selectedKey === k ? ' is-selected' : ''}${isHidden(config, k, lang) ? ' is-ghost' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onSelect(k);
        const inline = e.currentTarget.querySelector('.np-inline');
        if (inline && !e.target.closest('.np-inline')) focusEnd(inline);
      }}
    >
      {children}
    </div>
  );
}

// One editable element. Its text is read from CMS_ELEMENTS[k].text (e.g. "contact.title"),
// or from `map` / saved with `onSet` for items such as steps. Props:
//   as / className / style / ...rest  the element on the website (rest: href, onClick, …)
//   editAs / editClass        the element in the preview (links and buttons become spans there)
//   format(text)              renders the text on the website (e.g. a link for {phone})
//   before / after            extra content inside the element (icons, arrows)
//   keepForReaders            when hidden, stays for screen readers (headings that name a section)
export function CmsText({
  k, as: Tag = 'span', className, style, map, onSet, fallback = '', format, before, after, keepForReaders, editAs, editClass, boxClass, ...rest
}) {
  const { config, lang, editing, update, emptyText = '' } = useCms();
  const { hidden, css, btnCss } = useLook(k);
  const spec = CMS_ELEMENTS[k] || {};
  const path = spec.text;
  const value = map !== undefined ? map : path ? textAt(config, path) : undefined;
  const button = Boolean(spec.button);
  const plain = textIn(value, lang) || fallback;

  if (!editing) {
    if (hidden && !keepForReaders) return null;
    const content = format ? format(plain) : plain;
    const cls = [className, hidden ? 'sr-only' : ''].filter(Boolean).join(' ') || undefined;
    return button
      ? <Tag className={cls} style={{ ...style, ...btnCss }} {...rest}>{before}<span style={css}>{content}</span>{after}</Tag>
      : <Tag className={cls} style={{ ...style, ...css }} {...rest}>{before}{content}{after}</Tag>;
  }

  const save = onSet || (path && update ? (next) => update((c) => {
    const [group, prop] = path.split('.');
    c[group] = { ...(c[group] || {}), [prop]: next };
  }) : null);
  const text = save
    ? <InlineText value={value?.[lang] || ''} fallback={(lang !== 'de' && value?.de) || emptyText} dir={LANG_META[lang]?.dir} max={spec.max} onChange={(v) => save({ ...(value || {}), [lang]: v })} />
    : plain;
  const EditTag = editAs || (Tag === 'a' || Tag === 'button' ? 'span' : Tag);
  const cls = [className, editClass].filter(Boolean).join(' ') || undefined;
  return (
    <EditBox k={k} className={boxClass}>
      {button
        ? <EditTag className={cls} style={{ ...style, ...btnCss }}>{before}<span style={css}>{text}</span>{after}</EditTag>
        : <EditTag className={cls} style={{ ...style, ...css }}>{before}{text}{after}</EditTag>}
    </EditBox>
  );
}
