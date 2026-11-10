// Landing pages of plan v4. Phase 1: "Leistung/Sprache + Stadt" for Berlin and
// Stuttgart plus Germany-wide guides. Phase 2: Kiel, document pages, interpreting
// situations and office-page upgrades (new language pages live in languagePages.js).
import { BERLIN_LINKS, BERLIN_PAGES } from './berlin.js';
import { STUTTGART_LINKS, STUTTGART_PAGES } from './stuttgart.js';
import { KIEL_PAGES } from './kiel.js';
import { MUENCHEN_HUB, MUENCHEN_PAGES } from './muenchen.js';
import { FRANKFURT_HUB, FRANKFURT_PAGES } from './frankfurt.js';
import { KOELN_HUB, KOELN_PAGES } from './koeln.js';
import { DORTMUND_HUB, DORTMUND_PAGES } from './dortmund.js';
import { NUERNBERG_HUB, NUERNBERG_PAGES } from './nuernberg.js';
import { BREMEN_HUB, BREMEN_PAGES } from './bremen.js';
import { DUESSELDORF_HUB, DUESSELDORF_PAGES } from './duesseldorf.js';
import { GUIDE_PAGES } from './guides.js';
import { DOCUMENT_PAGES } from './documents.js';
import { INTERPRETING_PAGES } from './interpreting.js';
import { RATGEBER_HUB, RATGEBER_PAGES } from './ratgeber.js';
import { OFFICE_EXTRA_SECTIONS } from './offices.js';
import { CITY, UPDATED } from './shared.js';
import { DESCRIPTIONS, EXTRA } from './extras.js';
import { DESCRIPTIONS_2, EXTRA_2 } from './extras2.js';
import { PAGE_REVIEWS, REVIEW_QUOTES } from './reviews.js';

// Extra sections go before the closing block (office / quote), extra FAQs at the end.
function withExtras(page) {
  const extra = EXTRA[page.path] || EXTRA_2[page.path] || {};
  const reviews = PAGE_REVIEWS[page.path] ? [['Das sagen unsere Kundinnen und Kunden', PAGE_REVIEWS[page.path].join('\n\n')]] : [];
  const own = [...(extra.sections || []), ...reviews];
  const sections = own.length ? [...page.sections.slice(0, -1), ...own, page.sections.at(-1)] : page.sections;
  return {
    ...page,
    description: DESCRIPTIONS[page.path] || DESCRIPTIONS_2[page.path] || page.description,
    sections,
    faqs: [...page.faqs, ...(extra.faqs || [])],
  };
}

function cityPage(city, page, phase) {
  const c = CITY[city];
  return {
    kind: 'service',
    lang: 'de',
    serviceGroup: 'city-service',
    updated: UPDATED,
    phase,
    ...page,
    path: `/de/standorte/${c.slug}/${page.slug}`,
    group: `city-${c.slug}-${page.slug}`,
    parent: c.hub,
    areaCity: c.name,
    branchSlug: c.slug,
    // Branch phone/WhatsApp (only Kiel has its own) for the contact card and buttons.
    ...(c.contact ? { location: c.contact } : {}),
  };
}

function nationalPage(page, { prefix, serviceGroup, parent, phase }) {
  return {
    kind: 'service',
    lang: 'de',
    serviceGroup,
    updated: UPDATED,
    phase,
    ...page,
    path: `${prefix}/${page.slug}`,
    group: `${serviceGroup}-${page.slug}`,
    parent,
  };
}

const CERTIFIED_PARENT = { href: '/de/beglaubigte-uebersetzungen/', label: 'Beglaubigte Übersetzungen' };

export const LANDING_PAGES = [
  ...BERLIN_PAGES.map((page) => cityPage('berlin', page, 1)),
  ...STUTTGART_PAGES.map((page) => cityPage('stuttgart', page, 1)),
  ...GUIDE_PAGES.map((page) => nationalPage(page, { prefix: '/de', serviceGroup: 'guide', parent: CERTIFIED_PARENT, phase: 1 })),
  ...KIEL_PAGES.map((page) => cityPage('kiel', page, 2)),
  ...DOCUMENT_PAGES.map((page) => nationalPage(page, { prefix: '/de', serviceGroup: 'document', parent: CERTIFIED_PARENT, phase: 2 })),
  ...INTERPRETING_PAGES.map((page) => nationalPage(page, { prefix: '/de/dolmetschen', serviceGroup: 'interpreting', parent: { href: '/de/dolmetschen/', label: 'Dolmetschen' }, phase: 2 })),
  ...RATGEBER_PAGES.map((page) => nationalPage(page, { prefix: '/de/ratgeber', serviceGroup: 'guide', parent: { href: '/de/ratgeber/', label: 'Ratgeber' }, phase: 3 })),
  { ...nationalPage(RATGEBER_HUB, { prefix: '/de', serviceGroup: 'guide', parent: { href: '/de/beglaubigte-uebersetzungen/', label: 'Beglaubigte Übersetzungen' }, phase: 3 }), hub: true },
  ...MUENCHEN_PAGES.map((page) => cityPage('muenchen', page, 4)),
  ...FRANKFURT_PAGES.map((page) => cityPage('frankfurt', page, 5)),
  ...KOELN_PAGES.map((page) => cityPage('koeln', page, 5)),
  ...DORTMUND_PAGES.map((page) => cityPage('dortmund', page, 5)),
  ...NUERNBERG_PAGES.map((page) => cityPage('nuernberg', page, 5)),
  ...BREMEN_PAGES.map((page) => cityPage('bremen', page, 5)),
  ...DUESSELDORF_PAGES.map((page) => cityPage('duesseldorf', page, 5)),
].map(withExtras);

// City hubs without an office that got their own page set (SEO plan Nov 2026): title,
// description and an "Alle Leistungen in <Stadt>" section right after the intro section.
export const CITY_HUBS = {
  '/de/standorte/muenchen': MUENCHEN_HUB,
  '/de/standorte/frankfurt-am-main': FRANKFURT_HUB,
  '/de/standorte/koeln': KOELN_HUB,
  '/de/standorte/dortmund': DORTMUND_HUB,
  '/de/standorte/nuernberg': NUERNBERG_HUB,
  '/de/standorte/bremen': BREMEN_HUB,
  '/de/standorte/duesseldorf': DUESSELDORF_HUB,
};

// Extra sections for office pages, inserted right after the intro section:
// "Alle Leistungen in <Stadt>" (hub → every sub-page) and phase-2 upgrades.
// Google review quotes per office: appended to the office page's review section.
export { REVIEW_QUOTES };

export const OFFICE_SECTIONS = {
  berlin: [['Alle Leistungen in Berlin', 'Für jede Leistung und die in Berlin am häufigsten gefragten Sprachen haben wir eine eigene Seite mit Details, Preisen und typischen Terminen:', [...BERLIN_LINKS, { href: '/en/locations/berlin/', label: 'English: Translation Office Berlin' }, { href: '/tr/subeler/berlin/', label: 'Türkçe: Yeminli tercüman Berlin' }]]],
  stuttgart: [['Alle Leistungen in Stuttgart', 'Für jede Leistung und die in Stuttgart am häufigsten gefragten Sprachen haben wir eine eigene Seite mit Details, Preisen und typischen Terminen:', [...STUTTGART_LINKS, { href: '/en/locations/stuttgart/', label: 'English: Translation Office Stuttgart' }, { href: '/tr/subeler/stuttgart/', label: 'Türkçe: Yeminli tercüman Stuttgart' }]]],
  ...OFFICE_EXTRA_SECTIONS,
};
