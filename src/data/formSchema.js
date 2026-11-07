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

  const confirmation = input.confirmation || {};
  return {
    schema: 1,
    section: {
      eyebrow: cleanTexts(input.section?.eyebrow, 80),
      title: cleanTexts(input.section?.title, LIMITS.label),
      sub: cleanTexts(input.section?.sub, LIMITS.help),
    },
    steps,
    texts: {
      title: cleanTexts(input.texts?.title, LIMITS.label),
      sub: cleanTexts(input.texts?.sub, LIMITS.help),
      submit: cleanTexts(input.texts?.submit, 60),
      otherName: cleanTexts(input.texts?.otherName, 60),
      otherLabel: cleanTexts(input.texts?.otherLabel, LIMITS.label),
      otherPlaceholder: cleanTexts(input.texts?.otherPlaceholder, LIMITS.placeholder),
    },
    fields: cleanFields,
    languages,
    defaultSource: pick(cleanString(input.defaultSource, 40), 'source'),
    defaultTarget: pick(cleanString(input.defaultTarget, 40), 'target'),
    confirmation: {
      title: cleanTexts(confirmation.title, LIMITS.label),
      text: cleanTexts(confirmation.text, LIMITS.text),
      call: cleanTexts(confirmation.call, 80),
      again: cleanTexts(confirmation.again, 80),
      phone: cleanString(confirmation.phone, 40),
    },
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

// Visible fields for a service ("translation" or "interpreting"), grouped into rows:
// two half-width fields next to each other share a row.
export function fieldRows(config, service) {
  const visible = config.fields.filter((field) => !field.hidden && (field.show === 'both' || field.show === service || field.type === 'service'));
  const rows = [];
  visible.forEach((field) => {
    const last = rows[rows.length - 1];
    if (field.width === 'half' && last && last.length === 1 && last[0].width === 'half') last.push(field);
    else rows.push([field]);
  });
  return rows;
}
