// Search-result titles (<title>) and brand clean-up for all SEO pages.
// Titles lead with the words people actually search for (Search Console data,
// Sept 2026) and end with the short brand. The old brand "NOON. Sprachdienst"
// is replaced by the official name "Noon Dolmetscher & Übersetzungsbüro".

export const OFFICIAL_NAME = 'Noon Dolmetscher & Übersetzungsbüro';
export const TITLE_SUFFIX = 'Noon Übersetzungsbüro';
const OLD_NAME = /NOON\. Sprachdienst/g;

const DE_TITLES = {
  '/de/beglaubigte-uebersetzungen': 'Beglaubigte Übersetzungen – Express am selben Tag',
  '/de/dolmetschen': 'Dolmetscher buchen – vor Ort, per Video oder Telefon',
  '/de/dolmetschen/simultandolmetscher': 'Simultandolmetscher für Konferenzen und Events',
  '/de/dolmetschen/beeidigte-dolmetscher': 'Beeidigte Dolmetscher für Behörden und Gericht',
  '/de/dolmetschen/notardolmetscher': 'Notardolmetscher für Beurkundungen und Verträge',
  '/de/dolmetschen/standesamt-dolmetscher': 'Standesamt-Dolmetscher für Trauung und Anmeldung',
  '/de/fachuebersetzungen': 'Fachübersetzungen – Recht, Medizin, Technik und mehr',
  '/de/fachuebersetzungen/wirtschaft-finanzen': 'Fachübersetzung Wirtschaft und Finanzen',
  '/de/fachuebersetzungen/recht': 'Juristische Fachübersetzung – beglaubigt',
  '/de/fachuebersetzungen/ingenieurwesen': 'Technische Übersetzung – Ingenieurwesen',
  '/de/fachuebersetzungen/medizinische-dentalmedizin': 'Medizinische Übersetzung – Medizin und Dental',
  '/de/fachuebersetzungen/pharmazeutik': 'Pharmazeutische Fachübersetzung',
  '/de/fachuebersetzungen/literatur': 'Literarische Übersetzung – Bücher und Texte',
  '/de/fachuebersetzungen/it-software': 'IT- und Softwareübersetzung',
  '/de/fachuebersetzungen/chemie-biowissenschaften': 'Fachübersetzung Chemie und Biowissenschaften',
  '/preise': 'Preise für beglaubigte Übersetzungen und Dolmetscher',
  '/de/fuehrerschein-uebersetzung': 'Führerschein übersetzen lassen – beglaubigt',
  '/de/heiratsurkunde-uebersetzung': 'Heiratsurkunde übersetzen lassen – beglaubigt',
  '/de/geburtsurkunde-uebersetzung': 'Geburtsurkunde übersetzen lassen – beglaubigt',
  '/de/zeugnis-uebersetzung': 'Zeugnis übersetzen lassen – beglaubigt',
  '/de/gerichtsdolmetscher': 'Gerichtsdolmetscher – beeidigte Dolmetscher für Gericht',
  '/de/standorte/frankfurt-am-main': 'Übersetzungsbüro Frankfurt – beglaubigt ab 39 € & Dolmetscher',
};

function cleanTitle(text = '') {
  return String(text).replace(/\s*\|\s*NOON\. Sprachdienst\s*$/, '').replace(/\.\s*$/, '').trim();
}

function renameBrand(text) {
  return typeof text === 'string' ? text.replace(OLD_NAME, OFFICIAL_NAME) : text;
}

function baseTitle(page) {
  if (DE_TITLES[page.path]) return DE_TITLES[page.path];
  if (page.kind === 'location' && page.location?.city) {
    const { city } = page.location;
    // The price is in the title: at positions 5–10 it is what makes people click (Search Console, Nov 2026).
    if (page.lang === 'de') return `Übersetzungsbüro ${city} – beglaubigt ab 39 € & Dolmetscher`;
    // Long city names (e.g. "Frankfurt am Main") drop the second half to stay within ~65 characters.
    if (page.lang === 'en') return city.length > 12 ? `Translation Office ${city} – Certified` : `Translation Office ${city} – Certified & Interpreters`;
  }
  return cleanTitle(page.title || page.metaTitle);
}

// Google shows roughly 60–65 characters of a title; longer titles fall back to the short brand.
const MAX_TITLE = 65;
const SHORT_SUFFIX = 'Noon';

function fitTitle(title) {
  const longSuffix = ` | ${TITLE_SUFFIX}`;
  const shortSuffix = ` | ${SHORT_SUFFIX}`;
  if (title.length <= MAX_TITLE || !title.endsWith(longSuffix)) return title;
  const short = `${title.slice(0, -longSuffix.length)}${shortSuffix}`;
  // Still too long: drop the brand (Google shows the site name above the title anyway).
  return short.length <= MAX_TITLE ? short : short.slice(0, -shortSuffix.length);
}

export function applyPageSeo(page) {
  const hasOwnTitle = page.metaTitle && !page.metaTitle.includes('NOON. Sprachdienst') && page.metaTitle.includes('| ');
  return {
    ...page,
    metaTitle: fitTitle(hasOwnTitle ? page.metaTitle : `${baseTitle(page)} | ${TITLE_SUFFIX}`),
    description: renameBrand(page.description),
    intro: renameBrand(page.intro),
    sections: page.sections?.map(([heading, text, ...rest]) => [heading, renameBrand(text), ...rest]),
  };
}
