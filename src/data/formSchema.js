// Shape of the editable quote form (CMS step 1). Shared by the site, the admin and the API,
// so it must stay plain JavaScript without imports.
//
// config = {
//   schema: 1,
//   section: { eyebrow, title, sub },                  // heading of the section above the form
//   steps: [{ id, label, desc }],                      // 2–6 steps shown above the form
//   texts: { title, sub, submit, otherName, otherLabel, otherPlaceholder },  // each { de, en, ar, … }
//   fields: [{ id, type, width, required, show, hidden, builtin, label, placeholder, help, options }],
//   languages: [{ id, name, source, target }],           // "Other language" is fixed and not stored
//   defaultSource, defaultTarget,                         // language ids preselected in the lists
//   confirmation: { title, text, call, again, phone },    // texts per language, phone shared
//   contact: { title, sub, phoneLabel, emailLabel, hqLabel, hours, whatsapp },  // contact card next to the form
//   ui: { [elementKey]: { hidden, hiddenIn, style, styleIn } }, // see CMS_ELEMENTS below
// }
// The layout (fields, order, types, widths, settings) is shared by all languages;
// only the texts are stored per language. An empty text falls back to German.

export const SITE_LANGS = ['de', 'en', 'ar', 'tr', 'ru', 'fr', 'uk'];
export const OTHER_LANGUAGE = 'other';

// Built-in fields of today's form. Their type is fixed; the locked ones cannot be hidden or deleted.
export const BUILTIN_FIELDS = ['firstName', 'lastName', 'email', 'phone', 'sourceLanguage', 'targetLanguage', 'service', 'files', 'driveLink', 'message'];
export const LOCKED_FIELDS = ['firstName', 'lastName', 'email', 'sourceLanguage', 'targetLanguage', 'service'];
export const ALWAYS_REQUIRED = ['firstName', 'lastName', 'email'];

// Types the admin can choose for new fields.
export const CUSTOM_TYPES = ['text', 'textarea', 'email', 'tel', 'number', 'date', 'url', 'select', 'checkbox'];
export const ALL_TYPES = [...CUSTOM_TYPES, 'language', 'service', 'file'];
export const WIDTHS = ['half', 'full'];
export const SHOW = ['both', 'translation', 'interpreting'];

export const LIMITS = { fields: 40, options: 60, languages: 200, label: 120, placeholder: 160, help: 300, text: 600, versions: 10, minSteps: 2, maxSteps: 6 };

// Start texts for things the admin adds, in every site language. Each language gets its own,
// so a field added while the admin works in Arabic never shows Arabic on the German site.
export const NEW_TEXTS = {
  field: { de: 'Neues Feld', en: 'New field', ar: 'حقل جديد', tr: 'Yeni alan', ru: 'Новое поле', fr: 'Nouveau champ', uk: 'Нове поле' },
  option: { de: 'Neue Auswahl', en: 'New option', ar: 'اختيار جديد', tr: 'Yeni seçenek', ru: 'Новый вариант', fr: 'Nouvelle option', uk: 'Новий варіант' },
  step: { de: 'Neuer Schritt', en: 'New step', ar: 'خطوة جديدة', tr: 'Yeni adım', ru: 'Новый шаг', fr: 'Nouvelle étape', uk: 'Новий крок' },
};
const START_TEXTS = new Set(Object.values(NEW_TEXTS).flatMap((map) => Object.values(map)));
// True while a text is still one of the start texts above (in any language), so the admin is told to write it.
export const isStartText = (value) => START_TEXTS.has(String(value || '').trim());

// Every element the CMS can edit, hide and style. This list drives the sanitizer, the editor and
// the website, so a new editable element (also in a future section or page) needs only:
//   1. an entry here: `text` = where its text lives in the config, `max` = text length,
//      `button` = gets a button colour, `keep` = cannot be hidden, `block` = no text of its own;
//   2. its default text in DEFAULT_FORM_CONFIG (formConfig.js) and its name in cmsI18n `el`;
//   3. <CmsText k="…" /> (components/cms/Editable.jsx) where it is shown.
// Steps ("step:<id>") and fields ("field:<id>") are added per item.
export const CMS_ELEMENTS = {
  'section.eyebrow': { text: 'section.eyebrow', max: 80 },
  'section.title': { text: 'section.title', max: LIMITS.label },
  'section.sub': { text: 'section.sub', max: LIMITS.help },
  steps: { block: true },
  'form.title': { text: 'texts.title', max: LIMITS.label },
  'form.sub': { text: 'texts.sub', max: LIMITS.help },
  // The form cannot be sent without its button, so it can be styled but not hidden.
  submit: { text: 'texts.submit', max: 60, button: true, keep: true },
  'confirm.title': { text: 'confirmation.title', max: LIMITS.label },
  'confirm.text': { text: 'confirmation.text', max: LIMITS.text },
  'confirm.call': { text: 'confirmation.call', max: 80, button: true },
  'confirm.again': { text: 'confirmation.again', max: 80, button: true },
  'contact.title': { text: 'contact.title', max: LIMITS.label },
  'contact.sub': { text: 'contact.sub', max: LIMITS.help },
  'contact.phoneLabel': { text: 'contact.phoneLabel', max: 40 },
  'contact.emailLabel': { text: 'contact.emailLabel', max: 40 },
  'contact.hqLabel': { text: 'contact.hqLabel', max: 60 },
  'contact.hours': { text: 'contact.hours', max: LIMITS.label },
  'contact.whatsapp': { text: 'contact.whatsapp', max: 60, button: true },
};
// Texts that are edited in the panel only (no element of their own in the preview).
const PANEL_TEXTS = { 'texts.otherName': 60, 'texts.otherLabel': LIMITS.label, 'texts.otherPlaceholder': LIMITS.placeholder };
// Every per-language text of the config with its maximum length, by path ("contact.title").
export const TEXT_PATHS = {
  ...Object.fromEntries(Object.values(CMS_ELEMENTS).filter((el) => el.text).map((el) => [el.text, el.max])),
  ...PANEL_TEXTS,
};
// The { de, en, … } text at a path such as "contact.title".
export const textAt = (config, path) => { const [group, prop] = path.split('.'); return config?.[group]?.[prop]; };

// Look of single elements, stored in config.ui by element key:
//   { hidden, hiddenIn: [lang], style: { size, weight, italic, underline, color, bg }, styleIn: { [lang]: style } }
// "hidden"/"style" apply to all languages, "hiddenIn"/"styleIn" to single languages.
// Fields keep their all-languages "hidden" flag on the field itself.
export const UI_KEYS = Object.keys(CMS_ELEMENTS);
export const BUTTON_KEYS = UI_KEYS.filter((key) => CMS_ELEMENTS[key].button);
export const UNHIDEABLE_KEYS = [...UI_KEYS.filter((key) => CMS_ELEMENTS[key].keep), ...LOCKED_FIELDS.map((id) => `field:${id}`)];
export const FONT_SIZES = [75, 90, 100, 115, 130, 150, 175];
const COLOR_PATTERN = /^#[0-9a-f]{6}$/i;

const uiOf = (config, key) => config?.ui?.[key] || {};

export function isHidden(config, key, lang) {
  const ui = uiOf(config, key);
  return Boolean(ui.hidden || ui.hiddenIn?.includes(lang));
}

export function isFieldHidden(config, field, lang) {
  return Boolean(field.hidden) || isHidden(config, `field:${field.id}`, lang);
}

export function styleOf(config, key, lang) {
  const ui = uiOf(config, key);
  return { ...(ui.style || {}), ...(ui.styleIn?.[lang] || {}) };
}

// CSS for a text element (relative size, so it scales from the element's own size).
export function textCss(style) {
  const css = {};
  if (style.size && style.size !== 100) css.fontSize = `${style.size / 100}em`;
  if (style.weight) css.fontWeight = style.weight === 'bold' ? 700 : 400;
  if (typeof style.italic === 'boolean') css.fontStyle = style.italic ? 'italic' : 'normal';
  if (typeof style.underline === 'boolean') css.textDecoration = style.underline ? 'underline' : 'none';
  if (style.color) css.color = style.color;
  return css;
}

export function buttonCss(style) {
  return style.bg ? { background: style.bg, borderColor: style.bg } : {};
}

// A language's own style may hold "off" values (size 100, italic false) that override the all-languages style.
function cleanStyle(style, button) {
  if (!style || typeof style !== 'object') return null;
  const out = {};
  if (FONT_SIZES.includes(Number(style.size))) out.size = Number(style.size);
  if (style.weight === 'bold' || style.weight === 'normal') out.weight = style.weight;
  if (typeof style.italic === 'boolean') out.italic = style.italic;
  if (typeof style.underline === 'boolean') out.underline = style.underline;
  if (COLOR_PATTERN.test(style.color || '')) out.color = style.color.toLowerCase();
  if (button && COLOR_PATTERN.test(style.bg || '')) out.bg = style.bg.toLowerCase();
  return Object.keys(out).length ? out : null;
}

function cleanUi(input, keys) {
  const out = {};
  if (!input || typeof input !== 'object') return out;
  keys.forEach((key) => {
    const raw = input[key];
    if (!raw || typeof raw !== 'object') return;
    const button = BUTTON_KEYS.includes(key);
    const entry = {};
    if (!UNHIDEABLE_KEYS.includes(key)) {
      if (raw.hidden === true && !key.startsWith('field:')) entry.hidden = true;
      const hiddenIn = Array.isArray(raw.hiddenIn) ? SITE_LANGS.filter((lang) => raw.hiddenIn.includes(lang)) : [];
      if (hiddenIn.length && !entry.hidden) entry.hiddenIn = hiddenIn;
    }
    const style = cleanStyle(raw.style, button);
    if (style) entry.style = style;
    const styleIn = {};
    SITE_LANGS.forEach((lang) => {
      const one = cleanStyle(raw.styleIn?.[lang], button);
      if (one) styleIn[lang] = one;
    });
    if (Object.keys(styleIn).length) entry.styleIn = styleIn;
    if (Object.keys(entry).length) out[key] = entry;
  });
  return out;
}

// Text of a { de, en, … } map in one language, falling back to German.
export function textIn(map, lang) {
  if (!map || typeof map !== 'object') return '';
  return (map[lang] && String(map[lang]).trim()) || map.de || '';
}

export function phoneHref(label) {
  const digits = String(label || '').replace(/[^\d+]/g, '');
  return digits ? `tel:${digits}` : '';
}

const ID_PATTERN = /^[A-Za-z][A-Za-z0-9_-]{0,39}$/;

function cleanString(value, max) {
  // eslint-disable-next-line no-control-regex -- strips control characters from admin input on purpose
  return typeof value === 'string' ? value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim().slice(0, max) : '';
}

function cleanTexts(map, max) {
  const out = {};
  SITE_LANGS.forEach((lang) => {
    const value = cleanString(map?.[lang], max);
    if (value) out[lang] = value;
  });
  return out;
}

function fail(message) {
  throw Object.assign(new Error(message), { statusCode: 400 });
}

// Checks and cleans a config sent by the admin. Throws { statusCode: 400 } when it cannot be used.
export function sanitizeFormConfig(input) {
  if (!input || typeof input !== 'object') fail('Missing form settings.');
  const fields = Array.isArray(input.fields) ? input.fields.slice(0, LIMITS.fields) : [];
  const seen = new Set();
  const cleanFields = fields.map((field) => {
    const id = cleanString(field?.id, 40);
    if (!ID_PATTERN.test(id) || seen.has(id)) fail(`Invalid field id: ${id || '(empty)'}`);
    seen.add(id);
    const builtin = BUILTIN_FIELDS.includes(id);
    const type = cleanString(field.type, 20);
    if (!ALL_TYPES.includes(type)) fail(`Invalid field type: ${type}`);
    if (!builtin && !CUSTOM_TYPES.includes(type)) fail(`Type ${type} is only for built-in fields.`);
    const out = {
      id,
      type,
      builtin,
      width: WIDTHS.includes(field.width) ? field.width : 'full',
      required: ALWAYS_REQUIRED.includes(id) ? true : Boolean(field.required),
      show: SHOW.includes(field.show) ? field.show : 'both',
      hidden: LOCKED_FIELDS.includes(id) ? false : Boolean(field.hidden),
      label: cleanTexts(field.label, LIMITS.label),
      placeholder: cleanTexts(field.placeholder, LIMITS.placeholder),
      help: cleanTexts(field.help, LIMITS.help),
    };
    if (!out.label.de && type !== 'service') fail(`Field ${id} needs a German label.`);
    if (type === 'service') {
      out.options = ['translation', 'interpreting'].map((optionId) => ({
        id: optionId,
        label: cleanTexts((Array.isArray(field.options) ? field.options : []).find((option) => option?.id === optionId)?.label, LIMITS.label),
      }));
      if (out.options.some((option) => !option.label.de)) fail('Both services need a German name.');
    }
    if (type === 'select') {
      const optionIds = new Set();
      out.options = (Array.isArray(field.options) ? field.options : []).slice(0, LIMITS.options).map((option) => {
        const optionId = cleanString(option?.id, 40);
        if (!ID_PATTERN.test(optionId) || optionIds.has(optionId)) fail(`Invalid option in ${id}.`);
        optionIds.add(optionId);
        const label = cleanTexts(option.label, LIMITS.label);
        if (!label.de) fail(`An option in ${id} needs a German name.`);
        return { id: optionId, label };
      });
      if (!out.options.length) fail(`Drop-down ${id} needs at least one option.`);
    }
    return out;
  });
  LOCKED_FIELDS.forEach((id) => { if (!seen.has(id)) fail(`The field ${id} cannot be removed.`); });

  const languageIds = new Set();
  const languages = (Array.isArray(input.languages) ? input.languages : []).slice(0, LIMITS.languages).map((language) => {
    const id = cleanString(language?.id, 40);
    if (!ID_PATTERN.test(id) || id === OTHER_LANGUAGE || languageIds.has(id)) fail(`Invalid language id: ${id || '(empty)'}`);
    languageIds.add(id);
    const name = cleanTexts(language.name, 80);
    if (!name.de) fail(`Language ${id} needs a German name.`);
    return { id, name, source: language.source !== false, target: language.target !== false };
  });
  const firstWith = (flag) => languages.find((language) => language[flag])?.id || OTHER_LANGUAGE;
  const pick = (id, flag) => (languages.some((language) => language.id === id && language[flag]) ? id : firstWith(flag));

  const stepIds = new Set();
  const steps = (Array.isArray(input.steps) ? input.steps : []).slice(0, LIMITS.maxSteps).map((step) => {
    const id = cleanString(step?.id, 40);
    if (!ID_PATTERN.test(id) || stepIds.has(id)) fail('Invalid step.');
    stepIds.add(id);
    const out = { id, label: cleanTexts(step.label, 60), desc: cleanTexts(step.desc, 120) };
    if (!out.label.de) fail('Every step needs a German name.');
    return out;
  });
  if (steps.length < LIMITS.minSteps) fail(`At least ${LIMITS.minSteps} steps are needed.`);

  // All per-language texts (section, texts, confirmation, contact, …) come from TEXT_PATHS.
  const groups = { section: {}, texts: {}, confirmation: {}, contact: {} };
  Object.entries(TEXT_PATHS).forEach(([path, max]) => {
    const [group, prop] = path.split('.');
    groups[group] = groups[group] || {};
    groups[group][prop] = cleanTexts(textAt(input, path), max);
  });
  return {
    schema: 1,
    section: groups.section,
    steps,
    texts: groups.texts,
    fields: cleanFields,
    languages,
    defaultSource: pick(cleanString(input.defaultSource, 40), 'source'),
    defaultTarget: pick(cleanString(input.defaultTarget, 40), 'target'),
    confirmation: { ...groups.confirmation, phone: cleanString(input.confirmation?.phone, 40) },
    contact: groups.contact,
    ui: cleanUi(input.ui, [...UI_KEYS, ...steps.map((step) => `step:${step.id}`), ...cleanFields.map((field) => `field:${field.id}`)]),
  };
}

// Language list for one drop-down: the preselected language first, then the others in the
// saved order, then "Other language".
export function languageList(config, kind) {
  const flag = kind === 'source' ? 'source' : 'target';
  const preselected = kind === 'source' ? config.defaultSource : config.defaultTarget;
  const ids = config.languages.filter((language) => language[flag]).map((language) => language.id);
  const ordered = ids.includes(preselected) ? [preselected, ...ids.filter((id) => id !== preselected)] : ids;
  return [...ordered, OTHER_LANGUAGE];
}

// Visible fields for a service ("translation" or "interpreting") in one language, grouped into
// rows: two half-width fields next to each other share a row. The admin preview passes
// showHidden to keep hidden fields (shown faded there, so they can be shown again).
export function fieldRows(config, service, lang, showHidden = false) {
  const visible = config.fields.filter((field) => (showHidden || !isFieldHidden(config, field, lang)) && (field.show === 'both' || field.show === service || field.type === 'service'));
  const rows = [];
  visible.forEach((field) => {
    const last = rows[rows.length - 1];
    if (field.width === 'half' && last && last.length === 1 && last[0].width === 'half') last.push(field);
    else rows.push([field]);
  });
  return rows;
}
