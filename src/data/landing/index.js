// Landing pages of plan v4, phase 1: "Leistung/Sprache + Stadt" for Berlin and
// Stuttgart (nested under the office page) plus Germany-wide guides.
import { BERLIN_LINKS, BERLIN_PAGES } from './berlin.js';
import { STUTTGART_LINKS, STUTTGART_PAGES } from './stuttgart.js';
import { GUIDE_PAGES } from './guides.js';
import { CITY, UPDATED } from './shared.js';
import { DESCRIPTIONS, EXTRA } from './extras.js';

// Extra sections go before the closing block (office / quote), extra FAQs at the end.
function withExtras(page) {
  const extra = EXTRA[page.path] || {};
  const sections = extra.sections ? [...page.sections.slice(0, -1), ...extra.sections, page.sections.at(-1)] : page.sections;
  return {
    ...page,
    description: DESCRIPTIONS[page.path] || page.description,
    sections,
    faqs: [...page.faqs, ...(extra.faqs || [])],
  };
}

function cityPage(city, page) {
  const c = CITY[city];
  return {
    kind: 'service',
    lang: 'de',
    serviceGroup: 'city-service',
    updated: UPDATED,
    ...page,
    path: `/de/standorte/${c.slug}/${page.slug}`,
    group: `city-${c.slug}-${page.slug}`,
    parent: c.hub,
    areaCity: c.name,
    branchSlug: c.slug,
  };
}

function guidePage(page) {
  return {
    kind: 'service',
    lang: 'de',
    serviceGroup: 'guide',
    updated: UPDATED,
    ...page,
    path: `/de/${page.slug}`,
    group: `guide-${page.slug}`,
    parent: { href: '/de/beglaubigte-uebersetzungen/', label: 'Beglaubigte Übersetzungen' },
  };
}

export const LANDING_PAGES = [
  ...BERLIN_PAGES.map((page) => cityPage('berlin', page)),
  ...STUTTGART_PAGES.map((page) => cityPage('stuttgart', page)),
  ...GUIDE_PAGES.map(guidePage),
].map(withExtras);

// Block "Alle Leistungen in <Stadt>" on the office page (hub → every sub-page).
export const CITY_HUB_SECTIONS = {
  berlin: ['Alle Leistungen in Berlin', 'Für jede Leistung und die in Berlin am häufigsten gefragten Sprachen haben wir eine eigene Seite mit Details, Preisen und typischen Terminen:', BERLIN_LINKS],
  stuttgart: ['Alle Leistungen in Stuttgart', 'Für jede Leistung und die in Stuttgart am häufigsten gefragten Sprachen haben wir eine eigene Seite mit Details, Preisen und typischen Terminen:', STUTTGART_LINKS],
};
