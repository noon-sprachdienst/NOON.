// Office-page upgrades (plan v4, wave 2): Osnabrück, Bielefeld and Mainz already rank
// on positions 1–6 with little search volume, so they get extra sections on the office
// page instead of new sub-pages. Kiel additionally links its new sub-pages.
import { DOCUMENT_LINKS } from '../contentLinks.js';
import { APOSTILLE_LINK, DURATION_LINK, PRICE_LINK } from './shared.js';
import { KIEL_LINKS } from './kiel.js';

const INTERPRETING_SITUATIONS = [
  { href: '/de/dolmetschen/dolmetscher-arzt/', label: 'Dolmetscher für Arztbesuch' },
  { href: '/de/dolmetschen/dolmetscher-behoerde/', label: 'Dolmetscher für Behördengänge' },
  { href: '/de/dolmetschen/dolmetscher-schule/', label: 'Dolmetscher für Elterngespräche' },
  { href: '/de/dolmetschen/dolmetscher-hochzeit/', label: 'Dolmetscher für Hochzeit' },
];

export const OFFICE_EXTRA_SECTIONS = {
  osnabrueck: [
    ['Beglaubigte Übersetzung in Osnabrück – Preise und Ablauf', 'Für Ausländerbehörde, Standesamt, Universität und Hochschule Osnabrück übersetzen unsere ermächtigten Übersetzer Ihre Dokumente beglaubigt. Standarddokumente wie Geburtsurkunde, Heiratsurkunde oder Führerschein beginnen ab 39 € pro Dokument; den Festpreis nennen wir vorab. Lieferung in 2–3 Werktagen, im Express am selben Tag – als PDF und per Post, oder zur Abholung am Rosenplatz nach Termin.',
      [PRICE_LINK, DURATION_LINK, ...DOCUMENT_LINKS.slice(0, 3)]],
    ['Dolmetscher in Osnabrück – für jeden Anlass', 'Vom Arzttermin im Klinikum über das Elterngespräch in der Schule bis zur Trauung im Standesamt: Unsere Dolmetscher begleiten Sie in Osnabrück, im Landkreis und im Emsland – vor Ort, per Video oder Telefon, auf Wunsch beeidigt.',
      INTERPRETING_SITUATIONS],
    ['Translation services in Osnabrück', 'Need a certified translation in Osnabrück? Our court-authorised translators translate certificates, diplomas and contracts between English and German – accepted by German authorities and universities. Send a photo or scan by WhatsApp or e-mail and receive a fixed price free of charge.',
      [{ href: '/en/locations/osnabrueck/', label: 'Osnabrück office (English)' }]],
  ],
  bielefeld: [
    ['Beglaubigte Übersetzung in Bielefeld – vereidigte Übersetzer', 'Für Ausländerbehörde, Standesamt, Universität und Hochschule Bielefeld übersetzen unsere ermächtigten (vereidigten) Übersetzer Ihre Dokumente beglaubigt – ab 39 € pro Standarddokument, Festpreis vorab, Express am selben Tag. Solche Übersetzer werden von der Justiz ermächtigt; ihre Übersetzungen gelten bundesweit.',
      [PRICE_LINK, DURATION_LINK, APOSTILLE_LINK]],
    ['Russisch, Ukrainisch und Türkisch in Bielefeld', 'In Bielefeld und Ostwestfalen-Lippe übersetzen wir besonders oft russischsprachige Urkunden von Spätaussiedlern und ihren Familien, ukrainische Dokumente sowie türkische Personenstandsurkunden. Arbeitsbücher, Diplome und Rentenunterlagen übersetzen wir vollständig und mit einheitlicher Namensschreibweise.',
      [{ href: '/de/sprachen/russisch/', label: 'Russisch Übersetzer' }, { href: '/de/sprachen/ukrainisch/', label: 'Ukrainisch Übersetzer' }, { href: '/de/sprachen/tuerkisch/', label: 'Türkisch Übersetzer' }]],
    ['Translation services in Bielefeld', 'Certified translations English ↔ German in Bielefeld: diplomas and transcripts for Bielefeld University, birth and marriage certificates, contracts – by court-authorised translators, accepted by German authorities. Fixed price in advance, same-day express available.',
      [{ href: '/en/locations/bielefeld/', label: 'Bielefeld office (English)' }]],
  ],
  mainz: [
    ['Beglaubigte Übersetzung in Mainz – Preise und Ablauf', 'Für Ausländerbehörde, Standesamt, Gerichte und die Johannes Gutenberg-Universität übersetzen unsere ermächtigten Übersetzer Ihre Dokumente beglaubigt – Standarddokumente ab 39 €, Festpreis vorab, Lieferung in 2–3 Werktagen oder im Express am selben Tag.',
      [PRICE_LINK, DURATION_LINK, ...DOCUMENT_LINKS.slice(0, 3)]],
    ['Auch für Wiesbaden und Rheinhessen', 'Von unserem Büro in der Richard-Wagner-Straße betreuen wir auch Kundinnen und Kunden aus Wiesbaden, Ingelheim, Bingen, Rüsselsheim und Alzey. Für Termine bei Wiesbadener Behörden, Gerichten und Notaren organisieren wir Dolmetscher; Übersetzungen laufen bequem digital – als PDF und per Post.',
      [{ href: '/de/standorte/wiesbaden/', label: 'Übersetzungen für Wiesbaden' }, ...INTERPRETING_SITUATIONS.slice(0, 2), { href: '/en/locations/mainz/', label: 'English: Translation Office Mainz' }]],
  ],
  kiel: [
    ['Alle Leistungen in Kiel', 'Für die in Kiel am häufigsten gefragten Leistungen und Sprachen haben wir eigene Seiten mit Details, Preisen und typischen Terminen:', [...KIEL_LINKS, { href: '/en/locations/kiel/', label: 'English: Translation Office Kiel' }]],
    ['Dolmetscher für soziale Dienste und Asylverfahren in Kiel', 'Für Beratungsstellen, soziale Dienste, Jobcenter und Gespräche im Asylverfahren stellen wir Dolmetscher – besonders für Persisch (Farsi und Dari), Arabisch, Kurdisch, Ukrainisch und Polnisch. Kurze Gespräche dolmetschen wir per Telefon oder Video, auch kurzfristig.',
      INTERPRETING_SITUATIONS.slice(0, 3)],
  ],
};
