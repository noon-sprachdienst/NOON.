// Shared building blocks for the "Leistung/Sprache + Stadt" landing pages and the
// Germany-wide guides (plan v4, phase 1). Every page keeps its own intro, local
// sections and FAQs; only the short price/order/office blocks below are shared.
import { DOCUMENT_LINKS, FAQ_DIGITAL, INTERPRETER_LINKS, LANGUAGE_LINKS } from '../contentLinks.js';

export const UPDATED = '2026-10-29';

export const CITY = {
  berlin: {
    slug: 'berlin',
    name: 'Berlin',
    hub: { href: '/de/standorte/berlin/', label: 'Übersetzungsbüro Berlin' },
    office: 'Potsdamer Straße 63, 10785 Berlin (Tiergarten)',
  },
  stuttgart: {
    slug: 'stuttgart',
    name: 'Stuttgart',
    hub: { href: '/de/standorte/stuttgart/', label: 'Übersetzungsbüro Stuttgart' },
    office: 'Friedrichstraße 15, 70174 Stuttgart (Mitte)',
  },
  // Cities without an office: pages describe digital handling and name the nearest office
  // for personal appointments (`appointments`). München gets `office` once the address exists (KAN-11).
  muenchen: {
    slug: 'muenchen',
    name: 'München',
    hub: { href: '/de/standorte/muenchen/', label: 'Übersetzungsbüro München' },
    appointments: 'in unserem Büro in Stuttgart',
  },
  frankfurt: {
    slug: 'frankfurt-am-main',
    name: 'Frankfurt am Main',
    short: 'Frankfurt',
    hub: { href: '/de/standorte/frankfurt-am-main/', label: 'Übersetzungsbüro Frankfurt' },
    appointments: 'in unserem Büro in Mainz',
  },
  koeln: {
    slug: 'koeln',
    name: 'Köln',
    hub: { href: '/de/standorte/koeln/', label: 'Übersetzungsbüro Köln' },
    appointments: 'in unseren Büros in Bielefeld und Mainz',
  },
  dortmund: {
    slug: 'dortmund',
    name: 'Dortmund',
    hub: { href: '/de/standorte/dortmund/', label: 'Übersetzungsbüro Dortmund' },
    appointments: 'in unseren Büros in Bielefeld und Osnabrück',
  },
  nuernberg: {
    slug: 'nuernberg',
    name: 'Nürnberg',
    hub: { href: '/de/standorte/nuernberg/', label: 'Übersetzungsbüro Nürnberg' },
    appointments: 'in unserem Büro in Stuttgart',
  },
  bremen: {
    slug: 'bremen',
    name: 'Bremen',
    hub: { href: '/de/standorte/bremen/', label: 'Übersetzungsbüro Bremen' },
    appointments: 'in unserem Büro in Osnabrück',
  },
  duesseldorf: {
    slug: 'duesseldorf',
    name: 'Düsseldorf',
    hub: { href: '/de/standorte/duesseldorf/', label: 'Übersetzungsbüro Düsseldorf' },
    appointments: 'in unseren Büros in Bielefeld und Mainz',
  },
  kiel: {
    slug: 'kiel',
    name: 'Kiel',
    hub: { href: '/de/standorte/kiel/', label: 'Übersetzungsbüro Kiel' },
    office: 'Bothwellstraße 25, 24143 Kiel (Gaarden)',
    // Same values as LOCATIONS in seoPages.js: Kiel pages show the Kiel number and WhatsApp.
    contact: { city: 'Kiel', street: 'Bothwellstraße 25', postalCode: '24143', phone: { href: 'tel:+4915567478943', label: '+49 15567 478943', e164: '+4915567478943' }, whatsappUrl: 'https://wa.me/4915567478943' },
  },
};

export const PRICE_LINK = { href: '/de/beglaubigte-uebersetzung-kosten/', label: 'Was kostet eine beglaubigte Übersetzung?' };
export const DURATION_LINK = { href: '/de/beglaubigte-uebersetzung-dauer/', label: 'Wie lange dauert eine beglaubigte Übersetzung?' };
export const APOSTILLE_LINK = { href: '/de/apostille/', label: 'Apostille und Legalisation' };
export const NOTARY_GUIDE_LINK = { href: '/de/notar-oder-beglaubigte-uebersetzung/', label: 'Notar oder beglaubigte Übersetzung?' };
export const CERTIFIED_LINK = { href: '/de/beglaubigte-uebersetzungen/', label: 'Beglaubigte Übersetzungen im Überblick' };
export const INTERPRETING_LINK = { href: '/de/dolmetschen/', label: 'Dolmetschen im Überblick' };
export const QUOTE_LINK = { href: '/angebot/', label: 'Kostenloses Angebot anfordern' };
export { DOCUMENT_LINKS, FAQ_DIGITAL, INTERPRETER_LINKS, LANGUAGE_LINKS };

// Short shared blocks (kept brief on purpose so each page stays mostly unique).
export function translationPriceSection(city) {
  return ['Preise und Lieferzeit',
    `Beglaubigte Übersetzungen von Standarddokumenten beginnen ab 39 € pro Dokument. Den Festpreis nennen wir Ihnen vorab und kostenlos, sobald wir Ihr Dokument gesehen haben. Die Übersetzung ist in der Regel in 2–3 Werktagen fertig, im Express am selben Tag – meist innerhalb von 4–5 Stunden. Sie erhalten sie als PDF und auf Wunsch per Post an Ihre Adresse in ${city}.`,
    [PRICE_LINK, DURATION_LINK]];
}

export function interpretingPriceSection(city) {
  return ['Preise für Dolmetscher',
    `Dolmetscheinsätze in ${city} beginnen ab 85 € pro Stunde. Den genauen Festpreis nennen wir Ihnen vorab, sobald wir Datum, Uhrzeit, Ort, voraussichtliche Dauer und Sprache kennen. Kurze Gespräche lassen sich oft günstiger per Telefon oder Video dolmetschen.`,
    [QUOTE_LINK]];
}

// Second content pass per page: extra sections go before the page's closing section,
// extra FAQs at the end.
export function withMore(pages, more) {
  return pages.map((page) => {
    const extra = more[page.slug];
    if (!extra) return page;
    return {
      ...page,
      sections: [...page.sections.slice(0, -1), ...(extra.sections || []), page.sections.at(-1)],
      faqs: [...page.faqs, ...(extra.faqs || [])],
    };
  });
}

// Closing section for cities without an office of their own.
export function digitalSection(c, text) {
  return [`Für ${c.short || c.name} komplett digital`,
    `${text} Persönliche Termine bieten wir nach Vereinbarung ${c.appointments} an. Telefonisch sind wir rund um die Uhr erreichbar.`,
    [c.hub, QUOTE_LINK]];
}

export function officeSection(c) {
  return [`Unser Büro in ${c.name}`,
    `Persönliche Termine bieten wir nach vorheriger Vereinbarung in unserem Büro an: ${c.office}. Bitte melden Sie sich vorher, damit Ihre Unterlagen und Ihre Sprachkombination vorbereitet sind. Die meisten Aufträge laufen komplett digital: Dokument per WhatsApp, E-Mail oder Formular senden, Festpreis erhalten, Übersetzung als PDF und per Post bekommen. Telefonisch sind wir rund um die Uhr erreichbar.`,
    [c.hub, QUOTE_LINK]];
}

export const ORDER_STEPS = ['So läuft es ab',
  '1. Dokument senden – als gut lesbares Foto oder Scan per WhatsApp, E-Mail oder Webformular.\n2. Festpreis und Lieferzeit erhalten – kostenlos und unverbindlich.\n3. Auftrag bestätigen – unsere ermächtigten Übersetzer übersetzen vollständig, inklusive Stempeln und Vermerken.\n4. Übersetzung erhalten – als PDF per E-Mail und auf Wunsch als gestempeltes Original per Post.'];

export const INTERPRETING_STEPS = ['So buchen Sie einen Dolmetscher',
  '1. Termin nennen – Datum, Uhrzeit, Ort, Sprache und Anlass (z. B. Gericht, Notar, Behörde).\n2. Festpreis erhalten – wir prüfen die Verfügbarkeit und bestätigen den Dolmetscher.\n3. Termin wahrnehmen – vor Ort, per Video oder Telefon.\n4. Bei Bedarf: Dokumente zum Termin vorher beglaubigt übersetzen lassen.'];
