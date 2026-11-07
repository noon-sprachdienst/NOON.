// The built-in quote form: exactly the form the site had before the CMS, written in the
// CMS shape. It is shown until the admin publishes settings, whenever they cannot be
// loaded, and it is what "Restore original form" goes back to.
import { translations } from './translations.js';
import { FORM_CONFIRMATION, FORM_LANGUAGE_LISTS, FORM_LANGUAGES, FORM_OTHER_LANGUAGE } from './formLanguages.js';
import { SITE_LANGS, OTHER_LANGUAGE } from './formSchema.js';

const fromKey = (key) => Object.fromEntries(SITE_LANGS.map((lang) => [lang, translations[lang]?.[key] || translations.de[key]]));
const same = (value) => Object.fromEntries(SITE_LANGS.map((lang) => [lang, value]));
const pick = (map, prop) => Object.fromEntries(SITE_LANGS.map((lang) => [lang, (map[lang] || map.de)[prop]]));

const UPLOAD_HINT = {
  de: 'PDF, Word oder Bilder | bis zu 10 Dateien | max. 50 MB pro Datei',
  en: 'PDF, Word or images | up to 10 files | max. 50 MB per file',
  ar: 'ملفات PDF أو Word أو صور | حتى 10 ملفات | 50 ميغابايت كحد أقصى لكل ملف',
  tr: 'PDF, Word veya görsel | en fazla 10 dosya | dosya başına en fazla 50 MB',
  ru: 'PDF, Word или изображения | до 10 файлов | до 50 МБ на файл',
  fr: "PDF, Word ou images | jusqu'à 10 fichiers | 50 Mo max. par fichier",
  uk: 'PDF, Word або зображення | до 10 файлів | до 50 МБ на файл',
};

const DRIVE = {
  de: { label: 'Link zu großen Dateien (optional)', hint: 'Dateien über 50 MB? Über Google Drive teilen und den Link hier einfügen.' },
  en: { label: 'Link to large files (optional)', hint: 'Files over 50 MB? Share them via Google Drive and paste the link here.' },
  ar: { label: 'رابط الملفات الكبيرة (اختياري)', hint: 'ملفات أكبر من 50 ميغابايت؟ شاركها عبر Google Drive وألصق الرابط هنا.' },
  tr: { label: 'Büyük dosya bağlantısı (isteğe bağlı)', hint: '50 MB’tan büyük dosyalar? Google Drive ile paylaşın ve bağlantıyı buraya yapıştırın.' },
  ru: { label: 'Ссылка на большие файлы (необязательно)', hint: 'Файлы больше 50 МБ? Поделитесь через Google Drive и вставьте ссылку сюда.' },
  fr: { label: 'Lien vers les fichiers volumineux (facultatif)', hint: 'Fichiers de plus de 50 Mo ? Partagez-les via Google Drive et collez le lien ici.' },
  uk: { label: 'Посилання на великі файли (необовʼязково)', hint: 'Файли понад 50 МБ? Поділіться через Google Drive і вставте посилання сюди.' },
};

const DOC_PLACEHOLDER = {
  de: 'z.B. Heiratsurkunde aus Damaskus, beglaubigt für das Standesamt ...',
  en: 'e.g. marriage certificate from Damascus, certified for the registry office ...',
  ar: 'مثلا: شهادة زواج من دمشق، ترجمة معتمدة لمكتب الأحوال المدنية ...',
  tr: 'örn. Şam’dan evlilik belgesi, nüfus dairesi için onaylı çeviri ...',
  ru: 'например, свидетельство о браке из Дамаска, заверенный перевод для ЗАГСа ...',
  fr: 'p. ex. acte de mariage de Damas, traduction certifiée pour l’état civil ...',
  uk: 'наприклад, свідоцтво про шлюб з Дамаска, засвідчений переклад для РАЦСу ...',
};

const field = (id, type, width, extra = {}) => ({
  id, type, width, builtin: true, required: false, show: 'both', hidden: false, label: {}, placeholder: {}, help: {}, ...extra,
});

export const DEFAULT_FORM_CONFIG = {
  schema: 1,
  section: {
    eyebrow: fromKey('how.eyebrow'),
    title: fromKey('how.title'),
    sub: fromKey('how.sub'),
  },
  steps: [1, 2, 3, 4, 5].map((n) => ({ id: `step${n}`, label: fromKey(`how.step${n}.label`), desc: fromKey(`how.step${n}.desc`) })),
  texts: {
    title: fromKey('form.h3'),
    sub: fromKey('form.sub'),
    submit: fromKey('form.submit'),
    otherName: FORM_LANGUAGES[OTHER_LANGUAGE],
    otherLabel: pick(FORM_OTHER_LANGUAGE, 'label'),
    otherPlaceholder: pick(FORM_OTHER_LANGUAGE, 'placeholder'),
  },
  fields: [
    field('firstName', 'text', 'half', { required: true, label: fromKey('form.firstName'), placeholder: same('Maria') }),
    field('lastName', 'text', 'half', { required: true, label: fromKey('form.lastName'), placeholder: same('Schmidt') }),
    field('email', 'email', 'half', { required: true, label: fromKey('form.email'), placeholder: same('m.schmidt@email.de') }),
    field('phone', 'tel', 'half', { label: fromKey('form.phone'), placeholder: same('+49 ...') }),
    field('sourceLanguage', 'language', 'half', { label: fromKey('form.from') }),
    field('targetLanguage', 'language', 'half', { label: fromKey('form.to') }),
    field('service', 'service', 'full', {
      label: fromKey('form.service.label'),
      options: [
        { id: 'translation', label: fromKey('service.translation') },
        { id: 'interpreting', label: fromKey('service.interpreting') },
      ],
    }),
    field('files', 'file', 'full', { show: 'translation', label: fromKey('form.file'), help: UPLOAD_HINT }),
    field('driveLink', 'url', 'full', { show: 'translation', label: pick(DRIVE, 'label'), placeholder: same('https://drive.google.com/...'), help: pick(DRIVE, 'hint') }),
    field('message', 'textarea', 'full', { label: fromKey('form.doc'), placeholder: DOC_PLACEHOLDER }),
  ],
  languages: FORM_LANGUAGE_LISTS.source
    .filter((id) => id !== OTHER_LANGUAGE)
    .map((id) => ({ id, name: { ...FORM_LANGUAGES[id] }, source: true, target: true })),
  defaultSource: FORM_LANGUAGE_LISTS.source[0],
  defaultTarget: FORM_LANGUAGE_LISTS.target[0],
  confirmation: {
    title: pick(FORM_CONFIRMATION, 'title'),
    text: pick(FORM_CONFIRMATION, 'text'),
    call: pick(FORM_CONFIRMATION, 'call'),
    again: pick(FORM_CONFIRMATION, 'again'),
    phone: '+49 160 956 27 666',
  },
};

// Deep copy, so editors can change it freely.
export function defaultFormConfig() {
  return JSON.parse(JSON.stringify(DEFAULT_FORM_CONFIG));
}
