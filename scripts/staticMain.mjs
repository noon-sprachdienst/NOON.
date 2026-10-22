// Fuller static (prerendered) text for the German home page and the simple app pages
// (/leistungen, /fachuebersetzungen, /angebot, /termin). Search engines read this HTML
// before the React app loads. It only repeats what these pages show once loaded,
// plus client-confirmed facts – no numbers that the app itself does not confirm.
import { COMPANY, SEO_PAGES } from '../src/data/seoPages.js';

const esc = (value = '') => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const slash = (path) => (path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`);
const link = (href, label) => `<a href="${slash(href)}">${esc(label)}</a>`;
const list = (items) => `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
const section = (title, body) => `<section><h2>${esc(title)}</h2>${body}</section>`;
const p = (text) => `<p>${esc(text)}</p>`;

const de = (filter) => SEO_PAGES.filter((page) => page.lang === 'de' && filter(page));
const byPath = (path) => SEO_PAGES.find((page) => page.path === path);
const label = (page) => (page.eyebrow || page.title || '').replace(/\.$/, '');
const pageItems = (pages) => list(pages.map((page) => `${link(page.path, label(page))} – ${esc(page.description)}`));

const OFFICES = () => de((page) => page.kind === 'location' && !page.serviceArea);
const CITIES = () => de((page) => page.kind === 'location' && page.serviceArea);
const DOCUMENTS = () => de((page) => page.serviceGroup === 'document');
const LANGUAGES = () => de((page) => page.serviceGroup === 'language' && page.path !== '/de/sprachen');
const SPECIALIST = () => de((page) => page.serviceGroup === 'specialist' && page.path.split('/').length === 4);
const INTERPRETING = () => ['/de/dolmetschen', '/de/gerichtsdolmetscher', '/de/dolmetschen/beeidigte-dolmetscher', '/de/dolmetschen/standesamt-dolmetscher', '/de/dolmetschen/notardolmetscher', '/de/dolmetschen/simultandolmetscher']
  .map(byPath).filter(Boolean);

const officeList = () => list(OFFICES().map(({ path, location }) => (
  `${link(path, `Übersetzungsbüro ${location.city}`)} – ${esc(`${location.street}, ${location.postalCode} ${location.city}`)}`
)));
const contact = () => p(`Telefon +49 160 956 27 666 · E-Mail ${COMPANY.email} · WhatsApp · Zentrale: Rosenplatz 17, 49074 Osnabrück · Mo – Sa, telefonisch 24/7 erreichbar`);
const FACTS = 'Beglaubigte Übersetzungen durch ermächtigte Übersetzer, anerkannt von Behörden, Gerichten, Standesämtern und Hochschulen. Standard in 2–3 Werktagen, Express am selben Tag in der Regel innerhalb von 4–5 Stunden. Lieferung als PDF und auf Wunsch per Post.';

const HOME_FAQ = [
  ['Wie lange dauert eine Übersetzung?', 'Kleinere Standarddokumente (z.B. Urkunden, Zeugnisse) sind oft innerhalb von 2–6 Werktagen fertig. Bei größeren Fachübersetzungen stimmen wir den Liefertermin individuell mit Ihnen ab. Auf Wunsch bieten wir auch einen Express-Service in 24 Stunden an.'],
  ['Arbeiten Sie nach dem ISO-17100-Standard?', 'Unsere Übersetzungsprozesse orientieren sich am ISO-17100-Standard für Übersetzungsdienstleistungen. Eine ISO-Zertifizierung besteht derzeit nicht – wir arbeiten aber nach diesem Standard, mit CAT-Tools (z.B. SDL Trados, memoQ) und kundenspezifischen Terminologiedatenbanken.'],
  ['Werden Ihre beglaubigten Übersetzungen von Behörden anerkannt?', 'Ja. Unsere beglaubigten Übersetzungen werden von ermächtigten Übersetzern erstellt und von Gerichten, Standesämtern, Ausländerbehörden, Hochschulen und Notariaten in ganz Deutschland anerkannt.'],
  ['Benötigen Sie das Originaldokument?', 'In den meisten Fällen reicht ein gut lesbares Foto oder ein Scan. Ob das Original benötigt wird, hängt vom Verwendungszweck ab.'],
  ['Erhalte ich die Übersetzung digital oder per Post?', 'Sie erhalten die beglaubigte Übersetzung als PDF, im Original per Post oder zur Abholung in einem unserer sechs Büros.'],
  ['Ist die Anfrage kostenlos und unverbindlich?', 'Ja. Sie erhalten einen Festpreis und alle Informationen zum Ablauf – unverbindlich und ohne versteckte Kosten.'],
  ['In welche Sprachen übersetzen Sie?', 'Wir übersetzen und dolmetschen in über 190 Sprachen – von gängigen europäischen Sprachen bis zu vielen seltenen Sprachkombinationen.'],
  ['Welche Arten von Dolmetschern bieten Sie an?', 'Simultandolmetscher, Verhandlungsdolmetscher, Video- und Telefondolmetscher sowie Standesamt-, Notar-, Gerichts- und beeidigte Dolmetscher – je nach Anlass und Sprache.'],
];
const REVIEWS = [
  ['Ahmad K.', 'Osnabrück', 'Heiratsurkunde aus Syrien in 24 Stunden fertig übersetzt — alles für das Standesamt perfekt. Absolut empfehlenswert!'],
  ['Fatma Y.', 'Stuttgart', 'Türkische Führerschein-Übersetzung innerhalb eines Tages. Sehr professionell, der Stempel wurde von der Behörde sofort akzeptiert.'],
  ['Maria I.', 'Berlin', 'Dolmetscher beim Ausländeramt war super vorbereitet und ruhig. Wir haben alles verstanden. Danke!'],
  ['Ruslan N.', 'Kiel', 'Russische Geburtsurkunden für die Anmeldung — schnell, günstig, korrekt. Haben mich sogar abends noch per WhatsApp informiert.'],
  ['Leila B.', 'Mainz', 'Arabischer Führerschein, Zeugnisse und Heiratsurkunde auf einmal — alles kein Problem. Preis war absolut fair.'],
  ['Tomasz C.', 'Bielefeld', 'Für mein polnisches Abitur-Zeugnis brauchte ich eine beglaubigte Übersetzung für die Uni. In 3 Tagen da. Top Service!'],
];
const faq = (items) => section('Häufige Fragen', items.map(([q, a]) => `<h3>${esc(q)}</h3>${p(a)}`).join(''));

export function homeExtraMarkup() {
  return [
    section('Beglaubigte Übersetzungen', p(FACTS) + pageItems([byPath('/de/beglaubigte-uebersetzungen'), ...DOCUMENTS()].filter(Boolean))),
    section('Dolmetschen', p('Dolmetscher für Behörden, Standesamt, Notar, Gericht, Arzt und Unternehmen – vor Ort, per Video oder Telefon. Für Gericht und Notar stellen wir beeidigte Dolmetscher.') + pageItems(INTERPRETING())),
    section('Fachübersetzungen', p('Spezialisierte Übersetzer übertragen Terminologie, Ton und Inhalt verlässlich in die gewünschte Sprache.') + pageItems([byPath('/de/fachuebersetzungen'), ...SPECIALIST()].filter(Boolean))),
    section('Sprachen', p('Übersetzungen und Dolmetscher in über 190 Sprachen. Besonders häufig angefragt:') + pageItems(LANGUAGES())),
    section('Sechs Büros. Immer in Ihrer Nähe.', p('In sechs deutschen Städten für Sie erreichbar – Besuche nur nach vorheriger Terminvereinbarung. Deutschlandweit arbeiten wir komplett digital.') + officeList()),
    section('Weitere Städte', list(CITIES().map(({ path, location }) => link(path, `Übersetzungen ${location.city}`)))),
    section('Kontakt', contact() + p('Sie können uns in jeder Sprache schreiben.')),
    section('Was unsere Kund:innen sagen', p('Unsere Google-Bewertungen: Osnabrück 5,0 ★ (92) · Kiel 4,8 ★ (40) · Bielefeld 5,0 ★ (36) · Stuttgart 5,0 ★ (28) · Mainz 4,7 ★ (27) · Berlin 5,0 ★ (20) – Stand Oktober 2026') + list(REVIEWS.map(([name, city, text]) => `${esc(text)} – ${esc(name)}, ${esc(city)}`))),
    faq(HOME_FAQ),
    section('Über uns', p('Noon Dolmetscher & Übersetzungsbüro übersetzt und dolmetscht seit 2019 für Privatpersonen, Unternehmen, Behörden und Gerichte.') + list([link('/de/ueber-uns', 'Mehr über uns'), link('/preise', 'Preise')])),
  ].join('');
}

const SIMPLE_EXTRA = {
  '/leistungen': () => [
    section('Beglaubigte Übersetzungen', p(FACTS) + pageItems([byPath('/de/beglaubigte-uebersetzungen'), ...DOCUMENTS()].filter(Boolean))),
    section('Dolmetschen', p('Professionelle Dolmetscherdienste für Unternehmen, Behörden, Gerichte, medizinische Einrichtungen und Privatpersonen – in über 190 Sprachen, vor Ort, per Video oder Telefon.') + pageItems(INTERPRETING())),
    section('Fachübersetzungen', pageItems([byPath('/de/fachuebersetzungen'), ...SPECIALIST()].filter(Boolean))),
    section('So bestellen Sie einen Dolmetscher', list(['Anfrage senden: Sprache, Auftragsort und Uhrzeit mitteilen.', 'Angebot erhalten und bestätigen.', 'Der Dolmetscher ist zum vereinbarten Termin für Sie da.'].map(esc))),
  ].join(''),
  '/fachuebersetzungen': () => [
    section('Unsere Fachgebiete', pageItems(SPECIALIST())),
    section('Fachübersetzung oder beglaubigte Übersetzung?', p('Fachübersetzungen sind für die fachliche Nutzung gedacht. Verlangt eine Behörde oder ein Gericht eine amtliche Übersetzung, fertigen unsere ermächtigten Übersetzer sie zusätzlich beglaubigt an.') + list([link('/de/fachuebersetzungen', 'Fachübersetzungen im Überblick'), link('/de/beglaubigte-uebersetzungen', 'Beglaubigte Übersetzungen')])),
  ].join(''),
  '/angebot': () => [
    section('So läuft Ihre Anfrage ab', list(['Dokument senden – Foto oder Scan per Formular, WhatsApp oder E-Mail (PDF, Word oder Bilder).', 'Ausgangs- und Zielsprache sowie Übersetzung oder Dolmetschen angeben.', 'Kostenloses Festpreisangebot erhalten – unverbindlich.', 'Übersetzung erhalten – als PDF und auf Wunsch per Post.'].map(esc))),
    section('Persönlich erreichbar', contact()),
    section('Gut zu wissen', p(FACTS) + list([link('/preise', 'Preise ansehen'), link('/de/express-uebersetzung', 'Express-Übersetzung am selben Tag'), link('/de/beglaubigte-uebersetzungen', 'Beglaubigte Übersetzungen')])),
  ].join(''),
  '/termin': () => [
    section('Standort auswählen', p('Besuche in unseren Büros nur nach vorheriger Terminvereinbarung.') + officeList()),
    section('So fragen Sie einen Termin an', p('Wählen Sie den Standort, nennen Sie Ihre Telefonnummer, die gewünschte Uhrzeit und Ihren Namen. Wir melden uns schnellstmöglich bei Ihnen. Ihre Daten werden vertraulich behandelt.')),
    section('Kontakt', contact()),
  ].join(''),
};

export function simpleExtraMarkup(path, lang) {
  return lang === 'de' && SIMPLE_EXTRA[path] ? SIMPLE_EXTRA[path]() : '';
}
