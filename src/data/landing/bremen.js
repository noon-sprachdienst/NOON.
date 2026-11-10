// Bremen landing pages (SEO plan Nov 2026, phase 3). No office in Bremen: pages describe
// digital handling and name the Osnabrück office for personal appointments.
import {
  APOSTILLE_LINK, CITY, DOCUMENT_LINKS, FAQ_DIGITAL, INTERPRETING_STEPS, NOTARY_GUIDE_LINK, ORDER_STEPS,
  digitalSection, interpretingPriceSection, translationPriceSection, withMore,
} from './shared.js';

const C = CITY.bremen;
const L = (slug, label) => ({ href: `/de/standorte/bremen/${slug}/`, label });
const D = (slug, label) => ({ href: `/de/${slug}/`, label });

export const BREMEN_LINKS = [
  L('beglaubigte-uebersetzung', 'Beglaubigte Übersetzung Bremen'),
  L('dolmetscher', 'Dolmetscher Bremen'),
  L('gerichtsdolmetscher', 'Gerichtsdolmetscher Bremen'),
  L('dolmetscher-notar', 'Dolmetscher beim Notar in Bremen'),
  L('fachuebersetzungen', 'Fachübersetzungen Bremen'),
  L('tuerkisch', 'Türkisch-Deutsch Bremen'),
  L('arabisch', 'Arabisch-Deutsch Bremen'),
  L('persisch', 'Persisch und Dari Bremen'),
];
const LANG_PAGES = BREMEN_LINKS.slice(5);

const DIGITAL_TRANSLATION = 'Ob Gröpelingen, Vegesack, Findorff oder Bremerhaven: Sie senden Ihr Dokument als Foto oder Scan, bekommen den Festpreis und erhalten die beglaubigte Übersetzung als PDF und per Post.';
const DIGITAL_INTERPRETING = 'Unsere Dolmetscher kommen zu Ihrem Termin in Bremen und Umgebung – auch nach Bremerhaven, Delmenhorst oder Achim. Kurze Gespräche dolmetschen wir per Video oder Telefon.';

export const BREMEN_HUB = {
  sections: [['Alle Leistungen in Bremen', 'Für die in Bremen am häufigsten gefragten Leistungen und Sprachen haben wir eigene Seiten mit Details, Preisen und typischen Terminen:', BREMEN_LINKS]],
};

const BASE_PAGES = [
  {
    slug: 'beglaubigte-uebersetzung',
    eyebrow: 'Beglaubigte Übersetzung Bremen',
    title: 'Beglaubigte Übersetzungen in Bremen und Bremerhaven.',
    metaTitle: 'Beglaubigte Übersetzung Bremen – ab 39 € | Noon',
    description: 'Beglaubigte Übersetzung in Bremen für Migrationsamt, Standesamt, Gericht und Universität – ermächtigte Übersetzer, ab 39 € pro Dokument, Express möglich.',
    intro: 'Das Migrationsamt, die Standesämter, die Bremer Gerichte und die Hochschulen verlangen ausländische Dokumente als beglaubigte Übersetzung. Unsere in Deutschland ermächtigten Übersetzer übersetzen Ihre Unterlagen vollständig und formgetreu – digital für Bremen, Bremerhaven und das Umland.',
    highlights: ['Ermächtigte Übersetzer', 'Ab 39 € pro Dokument', 'Express am selben Tag'],
    sections: [
      ['Für diese Bremer Stellen', '• Migrationsamt Bremen: Aufenthalt, Familiennachzug, Einbürgerung\n• Standesämter Bremen-Mitte und Bremen-Nord: Eheschließung, Geburtsbeurkundung\n• Amtsgericht und Landgericht Bremen: Urteile, Beschlüsse, Erbscheine\n• Universität Bremen, Hochschule Bremen und Constructor University: Zeugnisse und Diplome\n• Fahrerlaubnisbehörde: ausländische Führerscheine\n• Jobcenter und Familienkasse: Nachweise\n\nDie Liste der benötigten Unterlagen bekommen Sie von der jeweiligen Stelle. Schicken Sie sie uns – Sie erhalten einen Festpreis für alle Dokumente.',
        DOCUMENT_LINKS],
      ['Anerkannt im ganzen Bundesgebiet', 'Beglaubigte Übersetzungen von Übersetzern, die ein deutsches Gericht zugelassen hat, gelten bundesweit – unabhängig vom Bundesland der Zulassung. Für deutsche Behörden ist eine zusätzliche notarielle Beglaubigung in der Regel nicht nötig. Für die Verwendung im Ausland kann eine Apostille hinzukommen.',
        [NOTARY_GUIDE_LINK, APOSTILLE_LINK]],
      ['Was wir oft übersetzen', 'In Bremen übersetzen wir besonders häufig aus dem Türkischen, Arabischen, Persischen und Dari, Kurdischen, Polnischen und Russischen: Personenstandsurkunden, Zeugnisse, Führerscheine, Gerichtsurteile und Bescheinigungen. Namen übernehmen wir wie im Reisepass, Stempel und Vermerke vollständig.',
        LANG_PAGES],
      ['Hafen, Luftfahrt und Wissenschaft', 'Für Fachkräfte in Häfen, Logistik, Luft- und Raumfahrt und Forschung übersetzen wir Abschlüsse, Arbeitszeugnisse, Befähigungsnachweise und Arbeitsverträge – für den Arbeitgeber, die Anerkennung oder das Migrationsamt.',
        [D('arbeitszeugnis-uebersetzung', 'Arbeitszeugnis übersetzen'), { href: '/de/ratgeber/anerkennung-auslaendischer-abschluesse/', label: 'Anerkennung ausländischer Abschlüsse' }]],
      translationPriceSection('Bremen'),
      ORDER_STEPS,
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Was kostet eine beglaubigte Übersetzung in Bremen?', 'Standarddokumente beginnen ab 39 € pro Dokument. Den Festpreis nennen wir vorab und kostenlos.'],
      ['Akzeptiert das Migrationsamt Bremen Ihre Übersetzungen?', 'Ja. Beglaubigte Übersetzungen ermächtigter Übersetzer werden bundesweit anerkannt.'],
      ['Übersetzen Sie auch für Bremerhaven?', 'Ja, digital für das ganze Land Bremen und das Umland.'],
      ['Wie lange dauert es?', 'In der Regel 2–3 Werktage, im Express am selben Tag – meist innerhalb von 4–5 Stunden.'],
      FAQ_DIGITAL,
    ],
    serviceType: 'Beglaubigte Übersetzung',
  },
  {
    slug: 'dolmetscher',
    eyebrow: 'Dolmetscher Bremen',
    title: 'Dolmetscher in Bremen – vor Ort, per Video oder Telefon.',
    metaTitle: 'Dolmetscher Bremen – vor Ort & per Video | Noon',
    description: 'Dolmetscher in Bremen für Migrationsamt, Jobcenter, Standesamt, Klinik, Notar und Gericht – vor Ort, per Video oder Telefon, ab 85 € pro Stunde.',
    intro: 'Für Termine in Bremen und Bremerhaven stellen wir Dolmetscherinnen und Dolmetscher: im Migrationsamt, im Jobcenter, im Standesamt, beim Notar, vor Gericht, in Kliniken, Schulen und Unternehmen. Für kurze Gespräche schalten wir Dolmetscher per Video oder Telefon zu.',
    highlights: ['Bremen und Bremerhaven', 'Video & Telefon', 'Ab 85 € pro Stunde'],
    sections: [
      ['Typische Einsätze', '• Migrationsamt, Jobcenter, Amt für Soziale Dienste\n• Standesamt: Anmeldung der Eheschließung und Trauung\n• Notar und Gericht\n• Kliniken und Praxen, psychosoziale Beratung\n• Schulen und Kitas\n• Unternehmen in Hafen, Logistik und Industrie: Verhandlungen, Audits, Schulungen',
        [L('gerichtsdolmetscher', 'Gerichtsdolmetscher Bremen'), L('dolmetscher-notar', 'Dolmetscher Notar Bremen'), { href: '/de/dolmetschen/dolmetscher-behoerde/', label: 'Dolmetscher bei Behörden' }]],
      ['Gesundheit und Beratung', 'Arztgespräche, Aufklärungen vor Eingriffen und Beratungsgespräche verlangen Vertrauen und genaue Sprache. Unsere Dolmetscher arbeiten vertraulich, übertragen vollständig und ohne eigene Wertung – vor Ort oder per Video, wenn es schnell gehen muss.',
        [{ href: '/de/dolmetschen/dolmetscher-arzt/', label: 'Dolmetscher beim Arzt' }]],
      ['Sprachen in Bremen', 'Besonders gefragt sind Türkisch, Kurdisch (Kurmanci), Arabisch, Persisch und Dari, Polnisch, Russisch, Ukrainisch, Bulgarisch, Rumänisch, Englisch und Französisch. Nennen Sie uns bei der Anfrage auch das Herkunftsland.',
        LANG_PAGES],
      interpretingPriceSection('Bremen'),
      INTERPRETING_STEPS,
      digitalSection(C, DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Was kostet ein Dolmetscher in Bremen?', 'Ab 85 € pro Stunde. Den Festpreis nennen wir vorab.'],
      ['Kommen Ihre Dolmetscher auch nach Bremerhaven?', 'Ja, im ganzen Land Bremen und im Umland.'],
      ['Dolmetschen Sie Kurdisch?', 'Ja, Kurmanci auf Anfrage; nennen Sie uns die gesprochene Variante.'],
      ['Wie kurzfristig geht es?', 'Je nach Sprache oft innerhalb weniger Tage, per Video oder Telefon meist schneller.'],
      ['Brauche ich einen beeidigten Dolmetscher?', 'Für Gericht und Notar in der Regel ja, für Arzt, Schule oder Beratung meist nicht.'],
    ],
    serviceType: 'Dolmetschen',
  },
  {
    slug: 'gerichtsdolmetscher',
    eyebrow: 'Gerichtsdolmetscher Bremen',
    title: 'Gerichtsdolmetscher und beeidigte Dolmetscher in Bremen.',
    metaTitle: 'Gerichtsdolmetscher Bremen – beeidigt | Noon',
    description: 'Gerichtsdolmetscher in Bremen: allgemein beeidigte Dolmetscher für Amtsgericht, Landgericht, Kanzlei und Polizei – Urteile auch beglaubigt übersetzt.',
    intro: 'In Bremen sitzen Amtsgericht, Landgericht und das Hanseatische Oberlandesgericht, dazu Arbeits-, Sozial- und Verwaltungsgericht. Für Mandantengespräche, Vernehmungen und private Termine stellen wir allgemein beeidigte Dolmetscher und übersetzen Verfahrensunterlagen beglaubigt.',
    highlights: ['Allgemein beeidigt', 'Alle Rechtsgebiete', 'Vertraulich'],
    sections: [
      ['Asyl- und Verwaltungsverfahren', 'Am Verwaltungsgericht Bremen geht es häufig um Asyl- und Aufenthaltsfragen. Für die Vorbereitung mit Anwältin oder Anwalt, für Beratungsstellen und für die Übersetzung von Bescheiden, Urteilen und Beweisdokumenten stellen wir Dolmetscher und Übersetzer – unter anderem für Arabisch, Persisch, Dari, Kurdisch, Türkisch und Tigrinya auf Anfrage.',
        [{ href: '/de/fachuebersetzungen/recht/', label: 'Juristische Übersetzungen' }]],
      ['Gericht oder privat?', 'Für die Verhandlung im Strafverfahren lädt das Gericht den Dolmetscher meist selbst. Kanzleien, Betroffene und Beratungsstellen buchen uns direkt – für Gespräche vor und nach dem Termin, Gutachtertermine oder Akteneinsicht.',
        [{ href: '/de/gerichtsdolmetscher/', label: 'Gerichtsdolmetscher bundesweit' }]],
      ['Allgemein beeidigt', 'Allgemein beeidigte Dolmetscher haben vor Gericht einen Eid auf treue und gewissenhafte Übertragung geleistet. Sie müssen nicht für jeden Termin neu vereidigt werden und sind in der Datenbank der Justiz eingetragen.'],
      interpretingPriceSection('Bremen'),
      INTERPRETING_STEPS,
      digitalSection(C, DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Übersetzen Sie Asylbescheide und Urteile?', 'Ja, Bescheide, Urteile und Beweisdokumente – beglaubigt, auch im Express.'],
      ['Welche Sprachen bieten Sie für Bremer Gerichte?', 'Unter anderem Arabisch, Persisch, Dari, Kurdisch, Türkisch, Polnisch, Russisch und Bulgarisch.'],
      ['Sind die Dolmetscher zur Verschwiegenheit verpflichtet?', 'Ja, beeidigte zusätzlich durch ihren Eid.'],
      ['Kann ich einen Dolmetscher für das Anwaltsgespräch buchen?', 'Ja, vor Ort, per Video oder Telefon.'],
    ],
    serviceType: 'Gerichtsdolmetscher',
  },
  {
    slug: 'dolmetscher-notar',
    eyebrow: 'Dolmetscher Notar Bremen',
    title: 'Dolmetscher für Notartermine in Bremen.',
    metaTitle: 'Dolmetscher Notar Bremen – beeidigt | Noon',
    description: 'Dolmetscher beim Notar in Bremen: beeidigte Dolmetscher für Immobilienkauf, Vollmacht, Testament und Firmengründung – Urkunde auf Wunsch auch schriftlich.',
    intro: 'Wer in Bremen eine Immobilie kauft, eine Firma gründet oder ein Testament errichtet und nicht ausreichend Deutsch spricht, braucht beim Notar einen Dolmetscher. Wir stellen allgemein beeidigte Dolmetscher für die Beurkundung und übersetzen die Urkunde danach auf Wunsch schriftlich.',
    highlights: ['Allgemein beeidigt', 'Für Beurkundungen', 'Urkunde auch schriftlich'],
    sections: [
      ['Notare in Bremen', 'In Bremen sind Notarinnen und Notare in der Regel zugleich als Rechtsanwälte tätig (Anwaltsnotariat). Für fremdsprachige Beteiligte gilt § 16 Beurkundungsgesetz: Die Niederschrift muss übersetzt werden. Ein nicht allgemein beeidigter Dolmetscher muss vereidigt werden, wenn nicht alle Beteiligten verzichten – mit unseren allgemein beeidigten Dolmetschern entfällt das.',
        [NOTARY_GUIDE_LINK, { href: '/de/dolmetschen/notardolmetscher/', label: 'Notardolmetscher bundesweit' }]],
      ['Häufige Beurkundungen', '• Kauf eines Hauses oder einer Wohnung\n• Grundschuld\n• Gründung einer GmbH oder UG, etwa im Handel oder in der Logistik\n• Vorsorge- und Generalvollmacht\n• Testament und Erbvertrag\n• Ehevertrag'],
      ['Vorbereitung', 'Senden Sie uns den Urkundsentwurf einige Tage vor dem Termin. Ausländische Unterlagen für das Notariat übersetzen wir vorab beglaubigt, damit der Termin nicht verschoben werden muss.',
        [D('vollmacht-uebersetzung', 'Vollmacht übersetzen'), D('testament-uebersetzung', 'Testament übersetzen'), APOSTILLE_LINK]],
      interpretingPriceSection('Bremen'),
      digitalSection(C, DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Muss der Dolmetscher beim Notar beeidigt sein?', 'Ist er nicht allgemein beeidigt, muss ihn der Notar vereidigen, sofern die Beteiligten nicht verzichten. Wir stellen deshalb allgemein beeidigte Dolmetscher.'],
      ['Wie lange dauert ein Notartermin?', 'Meist ein bis zwei Stunden. Den Festpreis nennen wir vorab.'],
      ['Darf ein Freund dolmetschen?', 'Das entscheidet der Notar; bei Kaufverträgen wird meist ein unabhängiger Dolmetscher bevorzugt.'],
      ['Übersetzen Sie die Urkunde schriftlich?', 'Ja, beglaubigt und auf Wunsch zusammen mit der Apostille.'],
      ['Kann der Dolmetscher per Video teilnehmen?', 'Das entscheidet der Notar; bei Beurkundungen ist ein Dolmetscher vor Ort üblich.'],
    ],
    serviceType: 'Notardolmetscher',
  },
  {
    slug: 'fachuebersetzungen',
    eyebrow: 'Fachübersetzungen Bremen',
    title: 'Fachübersetzungen für Hafen, Luftfahrt und Wissenschaft in Bremen.',
    metaTitle: 'Fachübersetzungen Bremen – ab 0,12 €/Wort | Noon',
    description: 'Fachübersetzungen in Bremen: Logistik, Schifffahrt, Luftfahrt, Recht und Medizin – Fachübersetzer mit Terminologie und zweiter Prüfung, ab 0,12 €/Wort.',
    intro: 'Bremen und Bremerhaven sind Hafen-, Logistik- und Luftfahrtstandort mit starker Forschung und Lebensmittelwirtschaft. Für Unternehmen, Institute, Kanzleien und Kliniken übersetzen unsere Fachübersetzer Texte, in denen Fachbegriffe, Normen und Zahlen stimmen müssen.',
    highlights: ['Logistik und Luftfahrt', 'Zweite Prüfung', 'Ab 0,12 € pro Wort'],
    sections: [
      ['Fachgebiete', '• Hafen und Logistik: Frachtverträge, Lagerbedingungen, Zoll- und Versanddokumente\n• Luft- und Raumfahrt, Technik: Spezifikationen, Handbücher, Prüfberichte\n• Wissenschaft: Projektanträge, Berichte, Fachartikel\n• Recht: Verträge, AGB, Gesellschaftsunterlagen\n• Medizin: Arztbriefe, Befunde, Studienunterlagen\n• Lebensmittel: Produktspezifikationen, Etiketten, Zertifikate',
        [{ href: '/de/fachuebersetzungen/ingenieurwesen/', label: 'Technische Übersetzungen' }, { href: '/de/fachuebersetzungen/recht/', label: 'Juristische Übersetzungen' }, { href: '/de/fachuebersetzungen/medizinische-dentalmedizin/', label: 'Medizinische Übersetzungen' }, { href: '/de/fachuebersetzungen/chemie-biowissenschaften/', label: 'Chemie & Biowissenschaften' }]],
      ['Englisch als Arbeitssprache', 'In Logistik, Luftfahrt und Forschung ist Englisch oft die gemeinsame Sprache. Wir übersetzen deutsche Texte ins Englische und englische Texte ins Deutsche – mit der in Ihrer Branche üblichen Terminologie und auf Wunsch nach Ihrem Styleguide.',
        [{ href: '/de/sprachen/englisch/', label: 'Englisch Übersetzer' }]],
      ['Qualität', 'Ein Fachübersetzer übersetzt, eine zweite Person prüft. Wir pflegen Glossare für wiederkehrende Begriffe und arbeiten mit Translation-Memory, damit Folgeversionen einheitlich bleiben. Unterlagen behandeln wir vertraulich.'],
      ['Preise', 'Fachübersetzungen beginnen ab 0,12 € pro Wort. Den Festpreis nennen wir nach Sichtung – abhängig von Fachgebiet, Umfang, Sprachen und Termin.',
        [{ href: '/de/fachuebersetzungen/', label: 'Alle Fachgebiete' }, D('vertrag-uebersetzung', 'Vertrag übersetzen')]],
      digitalSection(C, 'Dateien senden Sie per E-Mail oder Webformular; die Übersetzung erhalten Sie im Originalformat.'),
    ],
    faqs: [
      ['Was kostet eine Fachübersetzung in Bremen?', 'Ab 0,12 € pro Wort. Den Festpreis nennen wir nach Sichtung.'],
      ['Übersetzen Sie Frachtpapiere und Zolldokumente?', 'Ja, als Fachübersetzung oder beglaubigt, wenn eine Behörde es verlangt.'],
      ['Übersetzen Sie wissenschaftliche Texte ins Englische?', 'Ja, Anträge, Berichte und Artikel – mit Fachterminologie.'],
      ['Unterschreiben Sie eine Vertraulichkeitsvereinbarung?', 'Ja, gern.'],
    ],
    serviceType: 'Fachübersetzung',
  },
  {
    slug: 'tuerkisch',
    eyebrow: 'Türkisch Übersetzer Bremen',
    title: 'Türkisch-Deutsch in Bremen: Übersetzer und Dolmetscher.',
    metaTitle: 'Türkisch Übersetzer Bremen – beglaubigt | Noon',
    description: 'Türkisch Übersetzer in Bremen: beglaubigte Übersetzungen Türkisch–Deutsch für Standesamt, Migrationsamt und Gericht, Dokumente für die Türkei – ab 39 €.',
    intro: 'Die türkischsprachige Gemeinschaft gehört seit Jahrzehnten zu Bremen – besonders in Gröpelingen, Walle, Huchting und Osterholz. Wir übersetzen türkische Urkunden für Bremer Behörden ins Deutsche, deutsche Dokumente für die Türkei ins Türkische und stellen Türkisch-Dolmetscher.',
    highlights: ['In beide Richtungen', 'Für Standesamt und Migrationsamt', 'Dolmetscher, auch Kurdisch'],
    sections: [
      ['Häufige Dokumente', '• Nüfus-Registerauszüge und internationale Auszüge\n• Heiratsurkunden und Scheidungsurteile\n• Führerscheine für die Umschreibung\n• Zeugnisse und Diplome\n• Vollmachten und Erbunterlagen\n• Ausdrucke aus e-Devlet',
        [D('scheidungsurteil-uebersetzung', 'Scheidungsurteil übersetzen'), D('fuehrerschein-uebersetzung', 'Führerschein übersetzen')]],
      ['Einbürgerung in Bremen', 'Für die Einbürgerung verlangt das Migrationsamt je nach Fall Registerauszüge, Heirats- und Geburtsurkunden und gegebenenfalls Scheidungsurteile. Wir übersetzen alle Dokumente mit derselben Namensschreibweise, einschließlich türkischer Sonderzeichen.',
        [{ href: '/de/ratgeber/einbuergerung-dokumente/', label: 'Einbürgerung: Dokumente' }]],
      ['Dokumente für die Türkei', 'Deutsche Urkunden, Vollmachten und Urteile übersetzen wir beglaubigt ins Türkische. Für öffentliche deutsche Urkunden verlangt die Türkei in der Regel eine Apostille – sie wird vor der Übersetzung angebracht.',
        [APOSTILLE_LINK, { href: '/de/sprachen/tuerkisch/', label: 'Türkisch bundesweit' }]],
      ['Dolmetscher', 'Für Notar, Standesamt, Gericht, Ärzte und Behörden stellen wir Türkisch-Dolmetscher, auf Wunsch allgemein beeidigt – auf Anfrage auch für Kurdisch (Kurmanci).',
        [L('dolmetscher', 'Dolmetscher Bremen')]],
      translationPriceSection('Bremen'),
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Was kostet eine Türkisch-Übersetzung in Bremen?', 'Standarddokumente beginnen ab 39 €. Den Festpreis nennen wir vorab.'],
      ['Übersetzen Sie auch Kurdisch?', 'Dolmetschen auf Anfrage für Kurmanci; für schriftliche Übersetzungen fragen Sie uns mit dem Dokument an.'],
      ['Werden Namen wie im Pass geschrieben?', 'Ja, mit allen türkischen Sonderzeichen.'],
    ],
    serviceType: 'Türkisch Übersetzung',
  },
  {
    slug: 'arabisch',
    eyebrow: 'Arabisch Übersetzer Bremen',
    title: 'Arabisch-Deutsch in Bremen: beglaubigte Übersetzungen und Dolmetscher.',
    metaTitle: 'Arabisch Übersetzer Bremen – beglaubigt | Noon',
    description: 'Arabisch Übersetzer in Bremen: beglaubigte Übersetzungen für Migrationsamt, Standesamt und Hochschule – Dolmetscher mit Dialekt.',
    intro: 'In Bremen leben viele Familien aus Syrien, dem Irak, dem Libanon und anderen arabischsprachigen Ländern – teils seit Generationen, teils seit wenigen Jahren. Wir übersetzen ihre Dokumente beglaubigt ins Deutsche und stellen Dolmetscher, die neben Hocharabisch auch den jeweiligen Dialekt sprechen.',
    highlights: ['Alle arabischen Länder', 'Für Migrationsamt und Standesamt', 'Dolmetscher mit Dialekt'],
    sections: [
      ['Häufige Dokumente', 'Personenstandsurkunden und Familienbuchauszüge, Heirats- und Scheidungsurkunden, Schul- und Universitätszeugnisse, Führerscheine, Staatsangehörigkeitsnachweise und Gerichtsurteile. Wir übersetzen vollständig mit allen Stempeln und Beglaubigungsvermerken.',
        [{ href: '/de/ratgeber/arabische-geburtsurkunde-uebersetzen/', label: 'Arabische Geburtsurkunde übersetzen' }, D('zeugnis-uebersetzung', 'Zeugnis übersetzen')]],
      ['Familiennachzug', 'Für den Familiennachzug werden Heirats- und Geburtsurkunden in beglaubigter Übersetzung verlangt – teils schon für den Visumantrag bei der deutschen Auslandsvertretung, teils später beim Migrationsamt. Wir übersetzen alle Dokumente der Familie mit einheitlicher Namensschreibweise.',
        [{ href: '/de/ratgeber/familiennachzug-dokumente/', label: 'Familiennachzug: Dokumente' }]],
      ['Arabisch-Dolmetscher in Bremen', 'Für Migrationsamt, Jobcenter, Schule, Klinik, Standesamt und Gericht stellen wir Arabisch-Dolmetscher mit syrischem, irakischem, libanesischem, palästinensischem und weiteren Dialekten – auf Wunsch beeidigt.',
        [L('dolmetscher', 'Dolmetscher Bremen'), { href: '/de/sprachen/arabisch/', label: 'Arabisch bundesweit' }]],
      translationPriceSection('Bremen'),
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Was kostet eine Arabisch-Übersetzung in Bremen?', 'Standarddokumente beginnen ab 39 €. Den Festpreis nennen wir vorab.'],
      ['Wie werden arabische Namen geschrieben?', 'Wie im Reisepass; ohne Pass mit einheitlicher Umschrift.'],
      ['Übersetzen Sie auch ins Arabische?', 'Ja, deutsche Urkunden und Zeugnisse – beglaubigt.'],
      ['Übersetzen Sie libanesische Personenstandsauszüge?', 'Ja, vollständig mit allen Einträgen und Stempeln.'],
    ],
    serviceType: 'Arabisch Übersetzung',
  },
  {
    slug: 'persisch',
    eyebrow: 'Persisch Übersetzer Bremen',
    title: 'Persisch und Dari in Bremen: Übersetzer und Dolmetscher.',
    metaTitle: 'Persisch & Dari Übersetzer Bremen – beglaubigt | Noon',
    description: 'Persisch (Farsi) und Dari Übersetzer in Bremen: beglaubigte Übersetzungen aus Iran und Afghanistan für Migrationsamt und Gericht, Dolmetscher – ab 39 €.',
    intro: 'Bremen hat eine große iranische und afghanische Gemeinschaft. Wir übersetzen Dokumente aus dem Persischen (Farsi) und dem Dari beglaubigt ins Deutsche und stellen Dolmetscher für beide Sprachvarianten – für Behörden, Beratung, Gericht und Gesundheit.',
    highlights: ['Farsi und Dari', 'Iran und Afghanistan', 'Für Migrationsamt und Gericht'],
    sections: [
      ['Iranische Dokumente', 'Shenasnameh (Geburtsbuch) mit allen beschriebenen Seiten, Heirats- und Scheidungsurkunden, Schul- und Universitätszeugnisse, Führerscheine und Gerichtsdokumente. Datumsangaben nach dem iranischen Sonnenkalender übertragen wir exakt; auf Wunsch ergänzen wir das gregorianische Datum als Anmerkung.',
        [{ href: '/de/sprachen/persisch/', label: 'Persisch bundesweit' }]],
      ['Afghanische Dokumente', 'Tazkira in Papier- und elektronischer Form, Heiratsurkunden, Schul- und Universitätsnachweise sowie Bescheinigungen von Ministerien – oft auf Dari, teils zweisprachig mit Englisch oder Paschtu. Wir übersetzen alle Teile des Dokuments.'],
      ['Verfahren in Bremen', 'Für Aufenthalt, Familiennachzug und Einbürgerung beim Migrationsamt, für Verfahren am Verwaltungsgericht und für die Anerkennung von Abschlüssen übersetzen wir die nötigen Unterlagen beglaubigt und mit einheitlicher Namensschreibweise.',
        [L('gerichtsdolmetscher', 'Gerichtsdolmetscher Bremen'), { href: '/de/ratgeber/anerkennung-auslaendischer-abschluesse/', label: 'Anerkennung ausländischer Abschlüsse' }]],
      ['Dolmetscher für Farsi und Dari', 'Ob Beratungsstelle, Arzttermin, Schule, Migrationsamt oder Anwaltsgespräch: Unsere Dolmetscher sprechen Farsi und Dari – vor Ort in Bremen, per Video oder Telefon.',
        [L('dolmetscher', 'Dolmetscher Bremen')]],
      translationPriceSection('Bremen'),
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Übersetzen Sie die afghanische Tazkira?', 'Ja, papierbasiert und elektronisch – beglaubigt.'],
      ['Gibt es Dolmetscher für Dari?', 'Ja. Sagen Sie uns bei der Buchung, ob Dari oder Farsi gesprochen wird.'],
      ['Was kostet eine Persisch-Übersetzung in Bremen?', 'Standarddokumente beginnen ab 39 €. Den Festpreis nennen wir vorab.'],
    ],
    serviceType: 'Persisch Übersetzung',
  },
];

// Second pass (audit minimum of 400 words): page-specific sections and FAQs.
const MORE = {
  dolmetscher: {
    sections: [['Hafen und Unternehmen', 'Für Unternehmen in Häfen, Logistik und Industrie dolmetschen wir bei Verhandlungen, Werksbesuchen, Audits und Schulungen – häufig Englisch, aber auch Polnisch, Russisch, Türkisch oder Arabisch. Senden Sie uns Unterlagen und Fachbegriffe vorab, damit der Dolmetscher gut vorbereitet ist.']],
    faqs: [
      ['Dolmetschen Sie in der psychosozialen Beratung?', 'Ja, mit Dolmetschern, die vertraulich, vollständig und ohne eigene Wertung übertragen.'],
      ['Bekomme ich kurzfristig einen Telefondolmetscher?', 'Für viele Sprachen ja – fragen Sie uns mit Sprache, Datum und Uhrzeit an.'],
    ],
  },
  gerichtsdolmetscher: {
    sections: [
      ['Vor dem Termin', 'Damit ein Termin reibungslos läuft, braucht der Dolmetscher Kontext: Verfahrensart, Namen der Beteiligten und wichtige Schriftsätze – soweit Sie diese weitergeben dürfen. Bei langen Sitzungen planen wir Pausen oder ein Zweierteam ein.'],
      ['Familiengericht', 'Für Verfahren zu Scheidung, Sorgerecht und Umgang dolmetschen wir und übersetzen Heirats- und Geburtsurkunden sowie ausländische Urteile beglaubigt.',
        [D('scheidungsurteil-uebersetzung', 'Scheidungsurteil übersetzen')]],
    ],
    faqs: [
      ['Übersetzen Sie Dokumente aus dem Herkunftsland als Beweismittel?', 'Ja, Urkunden, Vorladungen und andere Dokumente – beglaubigt und vollständig.'],
      ['Dolmetschen Sie Tigrinya?', 'Auf Anfrage – nennen Sie uns Termin und Ort.'],
    ],
  },
  'dolmetscher-notar': {
    sections: [
      ['Unterlagen vor dem Termin', 'Oft braucht der Notar vorher Dokumente aus dem Ausland: eine Vollmacht eines Miteigentümers, eine Heiratsurkunde zur Klärung des Güterstands oder einen Registerauszug einer ausländischen Firma. Wir übersetzen diese beglaubigt, im Express auch am selben Tag.'],
      ['Sprachen beim Notar in Bremen', 'Häufig sind Türkisch, Arabisch, Persisch, Polnisch, Russisch und Englisch. Für jede Beurkundung setzen wir eine Person ein, die die Sprache auf muttersprachlichem Niveau beherrscht und die notarielle Fachsprache kennt.',
        LANG_PAGES],
    ],
    faqs: [
      ['Kann derselbe Dolmetscher zu mehreren Terminen kommen?', 'Ja, etwa zu Kaufvertrag und Grundschuld – auf Wunsch mit derselben Person.'],
      ['Wer trägt die Kosten?', 'In der Regel die Person, die den Dolmetscher benötigt, oder die Parteien nach Absprache.'],
    ],
  },
  fachuebersetzungen: {
    sections: [
      ['Schifffahrt und Häfen', 'Charterverträge, Ladungsdokumente, Hafenordnungen, Sicherheitsunterlagen und Schadensberichte übersetzen wir mit der in der Schifffahrt üblichen Terminologie. Für Behörden liefern wir auf Wunsch beglaubigte Fassungen.'],
      ['Luft- und Raumfahrt', 'Für Zulieferer und Ingenieurbüros übersetzen wir technische Spezifikationen, Prüf- und Qualitätsberichte, Arbeitsanweisungen und Schulungsunterlagen – sorgfältig bei Maßeinheiten, Toleranzen und Normbezeichnungen.'],
      ['Lebensmittelwirtschaft', 'Produktspezifikationen, Zutatenlisten, Etiketten, Zertifikate und Auditberichte übersetzen wir für Hersteller und Händler – mit Blick auf die Vorgaben im Zielmarkt.'],
      ['Hochschulen und Institute', 'Für die Universität Bremen, Hochschulen und Forschungsinstitute übersetzen wir Projektanträge, Abschlussberichte, Webseiten, Studienordnungen und Zeugnisse – auf Wunsch zweisprachig.'],
      ['Logistik und Zoll', 'Speditionsverträge, Zolldokumente, Lieferantenerklärungen und Lagerbedingungen übersetzen wir – beglaubigt, wenn eine Behörde es verlangt.'],
    ],
    faqs: [
      ['Wie schnell geht eine Fachübersetzung?', 'Den verbindlichen Liefertermin nennen wir im Angebot; eilige Teile ziehen wir vor.'],
      ['Übersetzen Sie Etiketten für Lebensmittel?', 'Ja, Etiketten und Produkttexte – die rechtliche Prüfung der Kennzeichnung bleibt bei Ihnen.'],
      ['Arbeiten Sie mit Glossaren?', 'Ja, wir übernehmen Ihre Begriffe und pflegen das Glossar fortlaufend.'],
      ['Liefern Sie im Originalformat?', 'Ja, Word, Excel, PowerPoint, PDF und viele weitere Formate.'],
      ['Übersetzen Sie Arbeitsverträge für internationale Mitarbeitende?', 'Ja, als Fachübersetzung oder beglaubigt.'],
    ],
  },
  tuerkisch: {
    sections: [
      ['Scheidung in der Türkei oder in Deutschland', 'Wurde eine Ehe in der Türkei geschieden, braucht das Standesamt in Bremen für eine neue Heirat das Scheidungsurteil mit Rechtskraftvermerk in beglaubigter Übersetzung; in vielen Fällen ist vorher die Anerkennung der ausländischen Entscheidung nötig. Umgekehrt muss eine deutsche Scheidung oft in der Türkei anerkannt werden (tanıma ve tenfiz) – dafür übersetzen wir den deutschen Beschluss ins Türkische.'],
      ['Schul- und Berufsabschlüsse', 'Für die Anerkennung türkischer Abschlüsse – etwa als Erzieherin, Ingenieur oder Pflegefachkraft – übersetzen wir Diplome, Notenübersichten (transkript) und Berufsnachweise mit allen Fächern und Stunden.',
        [{ href: '/de/ratgeber/anerkennung-auslaendischer-abschluesse/', label: 'Anerkennung ausländischer Abschlüsse' }]],
    ],
    faqs: [
      ['Übersetzen Sie einen deutschen Scheidungsbeschluss für die Türkei?', 'Ja, beglaubigt ins Türkische – für das Anerkennungsverfahren in der Türkei.'],
      ['Wie schnell geht es?', 'Meist 2–3 Werktage, im Express am selben Tag – in der Regel innerhalb von 4–5 Stunden.'],
    ],
  },
  arabisch: {
    sections: [
      ['Einbürgerung in Bremen', 'Für den Einbürgerungsantrag verlangt das Migrationsamt je nach Fall Geburts- und Heiratsurkunden, Identitätsnachweise und Unterlagen zu Kindern – ausländische Dokumente in beglaubigter Übersetzung. Wir übersetzen alle Unterlagen der Familie mit derselben Namensschreibweise und nennen einen gemeinsamen Festpreis.',
        [{ href: '/de/ratgeber/einbuergerung-dokumente/', label: 'Einbürgerung: Dokumente' }]],
      ['Abschlüsse und Anerkennung', 'Universitätszeugnisse, Notenübersichten und Berufsnachweise aus Syrien, dem Irak, Ägypten oder dem Libanon übersetzen wir für die Anerkennung und die Bewerbung an Bremer Hochschulen – vollständig mit Fächern, Noten und Stempeln.',
        [{ href: '/de/ratgeber/anerkennung-auslaendischer-abschluesse/', label: 'Anerkennung ausländischer Abschlüsse' }]],
      ['Stempel und Beglaubigungen', 'Viele arabische Urkunden tragen Beglaubigungen von Außenministerium und Botschaft. Wir übersetzen auch diese Vermerke sowie handschriftliche Ergänzungen, soweit lesbar.'],
    ],
    faqs: [
      ['Brauche ich das Original?', 'Für die Übersetzung genügt ein gut lesbares Foto oder ein Scan.'],
      ['Dolmetschen Sie auch sudanesisches Arabisch?', 'Ja, auf Anfrage auch für den sudanesischen Dialekt.'],
    ],
  },
  persisch: {
    sections: [
      ['Abschlüsse aus dem Iran', 'Iranische Schulabschlüsse, Bachelor- und Masterzeugnisse sowie Notenübersichten übersetzen wir für die Anerkennung und die Bewerbung an Bremer Hochschulen – mit allen Fächern, Einheiten und Noten. Datumsangaben übertragen wir exakt nach dem Original.',
        [{ href: '/de/ratgeber/anerkennung-auslaendischer-abschluesse/', label: 'Anerkennung ausländischer Abschlüsse' }]],
      ['Heiraten in Bremen', 'Für die Anmeldung der Eheschließung verlangt das Standesamt Geburtsurkunden und Nachweise zum Familienstand – bei Iranerinnen und Iranern oft die Shenasnameh mit allen Seiten. Wir übersetzen die Unterlagen und stellen auf Wunsch einen Dolmetscher für Anmeldung und Trauung.',
        [{ href: '/de/ratgeber/heiraten-in-deutschland-als-auslaender/', label: 'Heiraten in Deutschland als Ausländer' }]],
    ],
    faqs: [
      ['Übersetzen Sie auch ins Persische?', 'Ja, deutsche Urkunden und Zeugnisse übersetzen wir beglaubigt ins Persische.'],
      ['Wie schnell geht es?', 'Meist 2–3 Werktage, im Express am selben Tag.'],
    ],
  },
};

export const BREMEN_PAGES = withMore(BASE_PAGES, MORE);
