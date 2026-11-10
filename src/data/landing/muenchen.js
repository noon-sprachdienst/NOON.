// München landing pages (KAN-11, SEO plan Nov 2026, phase 2). Keywords: Search Console
// (16 months to 07.11.2026: 5,430 impressions for München searches, average position 32.8)
// and Google autocomplete of 09.11.2026. There is no Noon office in München yet: the pages
// describe digital handling and interpreters at the customer's appointment, and name
// Stuttgart as the nearest office. When the Munich office opens, add its address in CITY.
import {
  APOSTILLE_LINK, CERTIFIED_LINK, CITY, DOCUMENT_LINKS, FAQ_DIGITAL, INTERPRETING_LINK, INTERPRETING_STEPS,
  NOTARY_GUIDE_LINK, ORDER_STEPS, PRICE_LINK, QUOTE_LINK, interpretingPriceSection, translationPriceSection,
} from './shared.js';

const C = CITY.muenchen;
const L = (slug, label) => ({ href: `/de/standorte/muenchen/${slug}/`, label });
const D = (slug, label) => ({ href: `/de/${slug}/`, label });

export const MUENCHEN_LINKS = [
  L('beglaubigte-uebersetzung', 'Beglaubigte Übersetzung München'),
  L('dolmetscher', 'Dolmetscher München'),
  L('dolmetscher-standesamt', 'Dolmetscher Standesamt und Hochzeit München'),
  L('dolmetscher-notar', 'Notardolmetscher München'),
  L('gerichtsdolmetscher', 'Gerichtsdolmetscher München'),
  L('fachuebersetzungen', 'Fachübersetzungen München'),
  L('dokumente-uebersetzen', 'Urkunden und Dokumente übersetzen München'),
  L('geburtsurkunde', 'Geburtsurkunde übersetzen München'),
  L('heiratsurkunde', 'Heiratsurkunde übersetzen München'),
  L('fuehrerschein', 'Führerschein übersetzen München'),
  L('zeugnisse-diplome', 'Zeugnisse und Diplome übersetzen München'),
];
const HUB = C.hub;
const DISTRICTS = 'Milbertshofen-Am Hart, Neuperlach, Feldmoching-Hasenbergl, Berg am Laim, Schwanthalerhöhe, Ludwigsvorstadt-Isarvorstadt, Sendling und Moosach';

// No office in München yet: honest block about digital handling and the nearest office.
function digitalSection(text) {
  return ['Für München komplett digital',
    `${text} Persönliche Termine bieten wir nach Vereinbarung in unserem Büro in Stuttgart an. Telefonisch sind wir rund um die Uhr erreichbar.`,
    [HUB, QUOTE_LINK]];
}
const DIGITAL_TRANSLATION = 'Für eine beglaubigte Übersetzung müssen Sie in München nirgendwo hinfahren: Dokument als Foto oder Scan per WhatsApp, E-Mail oder Formular senden, Festpreis erhalten, Übersetzung als PDF und per Post an Ihre Münchner Adresse bekommen.';
const DIGITAL_INTERPRETING = 'Dolmetscher kommen zu Ihrem Termin in München – in die Behörde, ins Standesamt, zum Notar oder ins Gericht. Kurze Gespräche dolmetschen wir auch per Video oder Telefon.';

export const MUENCHEN_HUB = {
  metaTitle: 'Übersetzungsbüro München | Beglaubigte Übersetzungen',
  description: 'Übersetzungsbüro in München für beglaubigte Übersetzungen, Urkunden und Dokumente ab 39 €. Professionelle Übersetzungsdienste – jetzt unverbindlich anfragen!',
  sections: [['Alle Leistungen in München',
    `Für jede Leistung haben wir eine eigene Seite mit Münchner Behörden, Preisen und typischen Fragen – für Kundinnen und Kunden in der ganzen Stadt, von ${DISTRICTS} bis ins Umland:`,
    MUENCHEN_LINKS]],
};

const BASE_PAGES = [
  {
    slug: 'beglaubigte-uebersetzung',
    eyebrow: 'Beglaubigte Übersetzung München',
    title: 'Beglaubigte Übersetzungen in München – anerkannt vom KVR und allen Behörden.',
    metaTitle: 'Beglaubigte Übersetzung München – ab 39 € | Noon',
    description: 'Beglaubigte Übersetzung München für KVR, Standesamt, Gericht und Hochschulen: ermächtigte Übersetzer, ab 39 € pro Dokument, Festpreis in 5 Min.',
    intro: 'Ob Aufenthaltstitel beim Kreisverwaltungsreferat, Eheschließung beim Standesamt München, Anerkennung eines Abschlusses oder Bewerbung an LMU und TU München: Ausländische Dokumente brauchen Sie in München fast immer als beglaubigte Übersetzung. Unsere ermächtigten Übersetzer übersetzen Ihre Urkunden vollständig und bestätigen die Richtigkeit mit Unterschrift und Stempel – komplett digital, ohne Weg ins Büro.',
    highlights: ['Ermächtigte Übersetzer', 'Ab 39 € pro Dokument', 'Festpreis in 5 Minuten'],
    sections: [
      ['Welche Münchner Stellen beglaubigte Übersetzungen verlangen', '• Kreisverwaltungsreferat (KVR) mit Ausländerbehörde: Aufenthaltstitel, Blaue Karte, Familiennachzug und Einbürgerung\n• Fahrerlaubnisbehörde im KVR: Umschreibung ausländischer Führerscheine\n• Standesamt München: Anmeldung der Eheschließung, Geburtsbeurkundung und Namenserklärungen\n• Amtsgericht München und Landgericht München I: Urteile, Beschlüsse und Vollmachten\n• LMU, TU München und Hochschule München: Zeugnisse, Diplome und Transcripts\n• Jobcenter und Arbeitgeber: Abschlüsse und Arbeitszeugnisse\n\nWelche Unterlagen im Einzelfall übersetzt werden müssen, legt die jeweilige Stelle fest. Senden Sie uns gern deren Liste – Sie erhalten einen Festpreis für alle Dokumente zusammen.',
        DOCUMENT_LINKS],
      ['Was eine beglaubigte Übersetzung ausmacht', 'In Bayern heißen die zugelassenen Übersetzer „öffentlich bestellt und beeidigt“, in anderen Bundesländern „ermächtigt“ oder „vereidigt“ – gemeint ist dasselbe, und die Übersetzung gilt bundesweit. Der Übersetzer bestätigt am Ende der Übersetzung mit Vermerk, Unterschrift und Stempel, dass sie vollständig und richtig ist. Stempel, Siegel, Randvermerke und eine vorhandene Apostille werden mit übersetzt. Namen schreiben wir so, wie sie im Reisepass stehen. Ein Notar ist für Münchner Behörden in der Regel nicht nötig.',
        [CERTIFIED_LINK, NOTARY_GUIDE_LINK, APOSTILLE_LINK]],
      ['Was kostet eine beglaubigte Übersetzung in München?', 'Standarddokumente wie Geburtsurkunde, Heiratsurkunde, Meldebescheinigung oder Führerschein beginnen ab 39 € pro Dokument. Mehrseitige Dokumente wie Urteile oder Diplome mit Notenanlage berechnen wir nach Umfang. Den verbindlichen Festpreis nennen wir Ihnen vorab und kostenlos – meist innerhalb von 5 Minuten, nachdem wir Ihr Dokument gesehen haben.',
        [PRICE_LINK, L('dokumente-uebersetzen', 'Alle Dokumente für München')]],
      translationPriceSection('München'),
      ORDER_STEPS,
      digitalSection(DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Akzeptiert das KVR München Ihre beglaubigten Übersetzungen?', 'Ja. Unsere Übersetzungen stammen von in Deutschland ermächtigten Übersetzern und werden vom KVR, vom Standesamt und von allen Münchner Behörden anerkannt.'],
      ['Was kostet eine beglaubigte Übersetzung in München?', 'Standarddokumente beginnen ab 39 € pro Dokument. Den genauen Festpreis erhalten Sie vorab und kostenlos.'],
      ['Wie schnell bekomme ich die Übersetzung in München?', 'In der Regel in 2–3 Werktagen, im Express am selben Tag – meist innerhalb von 4–5 Stunden. Das PDF kommt sofort per E-Mail, das Original per Post.'],
      ['Muss ich für die Übersetzung in ein Büro kommen?', 'Nein. Für die Übersetzung reicht meist ein gut lesbares Foto oder ein Scan. Das Original brauchen wir nur, wenn die Stelle es ausdrücklich verlangt.'],
      FAQ_DIGITAL,
    ],
    serviceType: 'Beglaubigte Übersetzung',
  },
  {
    slug: 'dolmetscher',
    eyebrow: 'Dolmetscher München',
    title: 'Dolmetscher in München – für Behörde, Gericht, Notar und Unternehmen.',
    metaTitle: 'Dolmetscher München | Dolmetscherdienste für Gericht & Notar',
    description: 'Dolmetscherdienste in München für Behörden, Gerichte, Notartermine und Unternehmen. Professionelle Sprachmittlung ab 85 €/Std. – jetzt unverbindlich anfragen!',
    intro: 'Für Termine beim KVR, beim Standesamt München, bei Münchner Notariaten, am Amtsgericht oder in Unternehmen organisieren wir Dolmetscher für alle Sprachen – vor Ort in München, per Video oder Telefon. Für Gericht und Notar setzen wir allgemein beeidigte Dolmetscher ein.',
    highlights: ['Alle Sprachen und Dialekte', 'Beeidigt für Gericht und Notar', 'Ab 85 € pro Stunde'],
    sections: [
      ['Für welche Termine in München?', '• Behörden: KVR, Ausländerbehörde, Jobcenter und Bürgerbüros\n• Standesamt: Anmeldung der Eheschließung und Trauung\n• Notar: Immobilienkauf, Vollmachten, Testamente und Firmengründungen\n• Gericht: Verhandlungen am Amtsgericht München und Landgericht München I, Anwaltsgespräche\n• Arzt und Klinik: Aufklärungsgespräche, Untersuchungen und Entlassgespräche\n• Unternehmen: Verhandlungen, Schulungen, Messen und Werksbesuche',
        [L('dolmetscher-standesamt', 'Dolmetscher Standesamt München'), L('dolmetscher-notar', 'Notardolmetscher München'), L('gerichtsdolmetscher', 'Gerichtsdolmetscher München')]],
      ['Beeidigt oder nicht?', 'Gerichte und Notare verlangen in der Regel einen allgemein beeidigten Dolmetscher, viele Standesämter ebenfalls. Für Arzttermine, Behördengespräche oder Geschäftstermine ist eine Beeidigung meist nicht nötig. Wir sagen Ihnen vorab, was für Ihren Münchner Termin passt.'],
      ['Sprachen, die in München besonders gefragt sind', 'Besonders oft dolmetschen wir in München Arabisch (auch syrisch, irakisch und ägyptisch), Türkisch, Ukrainisch, Russisch, Rumänisch, Kroatisch, Serbisch und Bosnisch, Persisch und Dari, Englisch, Spanisch und Italienisch – jeweils ins Deutsche und aus dem Deutschen.',
        [{ href: '/de/sprachen/', label: 'Alle Sprachen' }]],
      interpretingPriceSection('München'),
      INTERPRETING_STEPS,
      digitalSection(DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Wie kurzfristig bekomme ich einen Dolmetscher in München?', 'Oft innerhalb weniger Tage, für Video- und Telefondolmetschen auch kurzfristiger. Je früher Sie uns Datum und Sprache nennen, desto sicherer klappt der Wunschtermin.'],
      ['Was kostet ein Dolmetscher in München?', 'Ab 85 € pro Stunde. Den Festpreis nennen wir vorab, sobald wir Datum, Ort, Dauer und Sprache kennen.'],
      ['Stellen Sie beeidigte Dolmetscher für Münchner Gerichte?', 'Ja, für Verhandlungen, Anhörungen und Anwaltsgespräche – in allen gängigen Sprachen.'],
    ],
    serviceType: 'Dolmetschen',
  },
  {
    slug: 'dolmetscher-standesamt',
    eyebrow: 'Dolmetscher Standesamt München',
    title: 'Dolmetscher für Standesamt und Hochzeit in München.',
    metaTitle: 'Dolmetscher Standesamt München – Trauung & Anmeldung | Noon',
    description: 'Dolmetscher für das Standesamt München: Anmeldung der Eheschließung, standesamtliche Trauung und Hochzeit – beeidigt, alle Sprachen, ab 85 €/Std.',
    intro: 'Spricht einer der Partner nicht ausreichend Deutsch, verlangt das Standesamt München für die Anmeldung der Eheschließung und für die Trauung einen Dolmetscher. Wir stellen Dolmetscher für alle Sprachen – auf Wunsch allgemein beeidigt – und übersetzen vorher alle Urkunden, die das Standesamt sehen möchte.',
    highlights: ['Anmeldung und Trauung', 'Auf Wunsch beeidigt', 'Urkunden vorher übersetzt'],
    sections: [
      ['Anmeldung der Eheschließung', 'Bei der Anmeldung prüft das Standesamt, ob die Ehe geschlossen werden kann. Der Dolmetscher überträgt das Gespräch und die Erklärungen, die Sie abgeben. Meist verlangt das Standesamt dafür vorab beglaubigte Übersetzungen von Geburtsurkunden, Ledigkeitsbescheinigung oder Ehefähigkeitszeugnis und gegebenenfalls einem Scheidungsurteil.',
        [L('geburtsurkunde', 'Geburtsurkunde übersetzen München'), D('ledigkeitsbescheinigung-uebersetzung', 'Ledigkeitsbescheinigung'), D('ehefaehigkeitszeugnis-uebersetzung', 'Ehefähigkeitszeugnis')]],
      ['Die standesamtliche Trauung', 'Bei der Trauung überträgt der Dolmetscher die Ansprache des Standesbeamten und die Traufragen, damit beide Partner verstehen, was sie erklären. Ob der Dolmetscher beeidigt sein muss, legt das Standesamt fest – wir klären das gern vorher mit Ihnen. Auf Wunsch dolmetschen wir auch die freie Trauung oder die Feier.',
        [{ href: '/de/dolmetschen/dolmetscher-hochzeit/', label: 'Dolmetscher für Hochzeit und Trauung' }]],
      ['Was wir vom Termin wissen müssen', '• Datum, Uhrzeit und welches Standesamt in München\n• Sprache der Partner und gegebenenfalls Dialekt\n• Anmeldung, Trauung oder beides\n• ob das Standesamt einen beeidigten Dolmetscher verlangt'],
      interpretingPriceSection('München'),
      digitalSection(DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Muss der Dolmetscher beim Standesamt München beeidigt sein?', 'Das entscheidet das Standesamt im Einzelfall. Wir stellen auf Wunsch allgemein beeidigte Dolmetscher.'],
      ['Darf ein Freund oder Verwandter dolmetschen?', 'Manche Standesämter lassen das zu, viele verlangen einen unabhängigen Dolmetscher. Fragen Sie beim Standesamt nach – wir helfen gern.'],
      ['Übersetzen Sie auch die Urkunden für die Anmeldung?', 'Ja. Geburtsurkunden, Ledigkeitsbescheinigungen und Scheidungsurteile übersetzen wir beglaubigt – meist zusammen günstiger.'],
    ],
    serviceType: 'Dolmetschen',
  },
  {
    slug: 'dolmetscher-notar',
    eyebrow: 'Notardolmetscher München',
    title: 'Notardolmetscher in München – beeidigt, gut vorbereitet.',
    metaTitle: 'Notardolmetscher München – beeidigt | Noon',
    description: 'Notardolmetscher in München für Immobilienkauf, Vollmacht, Testament und GmbH-Gründung: allgemein beeidigt, alle Sprachen, ab 85 €/Std.',
    intro: 'Versteht ein Beteiligter beim Notartermin nicht ausreichend Deutsch, muss ihm die Urkunde übersetzt werden. Münchner Notariate ziehen dafür in der Regel einen allgemein beeidigten Dolmetscher hinzu. Wir stellen Notardolmetscher für alle Sprachen und bereiten sie anhand des Urkundsentwurfs auf Ihren Termin vor.',
    highlights: ['Allgemein beeidigt', 'Vorbereitet mit Urkundsentwurf', 'Alle Sprachen'],
    sections: [
      ['Typische Notartermine in München', '• Kauf oder Verkauf einer Wohnung oder eines Hauses\n• Vollmachten und Vorsorgevollmachten\n• Testamente und Erbverträge\n• GmbH-Gründung, Gesellschafterbeschlüsse und Handelsregisteranmeldungen\n• Eheverträge und Scheidungsfolgenvereinbarungen',
        [D('vollmacht-uebersetzung', 'Vollmacht übersetzen'), D('testament-uebersetzung', 'Testament übersetzen')]],
      ['Was das Gesetz verlangt', 'Nach § 16 Beurkundungsgesetz muss die Niederschrift einem Beteiligten übersetzt werden, der nicht ausreichend Deutsch spricht. Der Dolmetscher muss in der Regel vereidigt sein; darauf kann nur verzichtet werden, wenn alle Beteiligten zustimmen. Auf Verlangen wird zusätzlich eine schriftliche Übersetzung der Urkunde angefertigt.',
        [{ href: '/de/dolmetschen/notardolmetscher/', label: 'Notardolmetscher: alles Wichtige' }]],
      ['So bereiten wir den Termin vor', 'Senden Sie uns möglichst früh den Urkundsentwurf des Notariats. Der Dolmetscher klärt vorher Fachbegriffe und Namen. Braucht der Notar ausländische Dokumente – etwa eine Vollmacht oder einen Registerauszug –, übersetzen wir sie vorher beglaubigt.'],
      interpretingPriceSection('München'),
      digitalSection(DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Muss der Notardolmetscher beeidigt sein?', 'In der Regel ja. Auf die Vereidigung kann nur verzichtet werden, wenn alle Beteiligten zustimmen (§ 16 BeurkG).'],
      ['Bekomme ich eine schriftliche Übersetzung des Kaufvertrags?', 'Auf Verlangen ja – sie wird der Urkunde beigefügt. Sprechen Sie das am besten schon mit dem Notariat ab.'],
      ['Wie lange dauert ein Notartermin mit Dolmetscher?', 'Meist etwas länger als ohne, weil abschnittsweise gedolmetscht wird. Den Festpreis berechnen wir nach der voraussichtlichen Dauer.'],
    ],
    serviceType: 'Dolmetschen',
  },
  {
    slug: 'gerichtsdolmetscher',
    eyebrow: 'Gerichtsdolmetscher München',
    title: 'Gerichtsdolmetscher in München – beeidigt für alle Sprachen.',
    metaTitle: 'Gerichtsdolmetscher München – beeidigt | Noon',
    description: 'Gerichtsdolmetscher in München: allgemein beeidigte Dolmetscher für Amtsgericht, Landgericht, Anwalt und Polizei – alle Sprachen und Dialekte.',
    intro: 'Für Verhandlungen am Amtsgericht München, am Landgericht München I und II, für Anwaltsgespräche und polizeiliche Vernehmungen stellen wir allgemein beeidigte Dolmetscher. Urteile, Beschlüsse und Schriftsätze übersetzen unsere ermächtigten Übersetzer beglaubigt.',
    highlights: ['Allgemein beeidigt', 'Verhandlung und Anwaltsgespräch', 'Urteile beglaubigt übersetzt'],
    sections: [
      ['Wofür Gerichtsdolmetscher in München gebraucht werden', '• Straf-, Zivil- und Familienverfahren\n• Anhörungen und Vernehmungen\n• Gespräche mit Anwältinnen und Anwälten zur Vorbereitung\n• Mediation und außergerichtliche Einigungen\n• Polizeiliche Vernehmungen'],
      ['Beeidigte Dolmetscher – vom Gericht anerkannt', 'Allgemein beeidigte Dolmetscher haben sich auf ihre Pflichten vereidigen lassen und können sich vor Gericht auf diesen Eid berufen. Ob das Gericht selbst einen Dolmetscher lädt oder Sie einen mitbringen, ergibt sich aus der Ladung oder aus der Absprache mit Ihrer Anwältin oder Ihrem Anwalt.',
        [{ href: '/de/gerichtsdolmetscher/', label: 'Gerichtsdolmetscher: Überblick' }, { href: '/de/dolmetschen/beeidigte-dolmetscher/', label: 'Beeidigte Dolmetscher' }]],
      ['Urteile und Schriftsätze übersetzen', 'Ausländische Urteile, Scheidungsurteile, Beschlüsse, Vollmachten und Zeugenaussagen übersetzen wir beglaubigt ins Deutsche – und deutsche Urteile in die jeweilige Sprache, wenn sie im Ausland vorgelegt werden.',
        [D('scheidungsurteil-uebersetzung', 'Scheidungsurteil übersetzen'), { href: '/de/fachuebersetzungen/recht/', label: 'Juristische Fachübersetzung' }]],
      interpretingPriceSection('München'),
      digitalSection(DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Für welche Sprachen gibt es Gerichtsdolmetscher in München?', 'Für alle gängigen Sprachen, darunter Arabisch mit Dialekten, Türkisch, Ukrainisch, Russisch, Rumänisch, Kroatisch, Serbisch, Persisch und Dari.'],
      ['Kann der Dolmetscher auch das Anwaltsgespräch übernehmen?', 'Ja. Viele Mandanten buchen denselben Dolmetscher für Vorbereitungsgespräch und Verhandlung.'],
    ],
    serviceType: 'Dolmetschen',
  },
  {
    slug: 'fachuebersetzungen',
    eyebrow: 'Fachübersetzungen München',
    title: 'Fachübersetzungen für Unternehmen und Kanzleien in München.',
    metaTitle: 'Fachübersetzungen München – ab 0,12 €/Wort | Noon',
    description: 'Fachübersetzungen in München für Technik, IT, Recht, Medizin und Versicherungen – Fachübersetzer, einheitliche Terminologie, ab 0,12 € pro Wort.',
    intro: 'München ist Standort von Technik-, IT-, Automobil-, Versicherungs- und Medizinunternehmen – und entsprechend fachlich sind die Texte, die übersetzt werden müssen. Wir übersetzen Fachtexte mit Übersetzern, die im jeweiligen Gebiet arbeiten, mit einheitlicher Terminologie und auf Wunsch zusätzlich beglaubigt.',
    highlights: ['Fachübersetzer je Gebiet', 'Einheitliche Terminologie', 'Ab 0,12 € pro Wort'],
    sections: [
      ['Typische Fachtexte aus München', '• Technik und Automobil: Lastenhefte, Betriebsanleitungen, Datenblätter, Prüfberichte\n• IT und Software: Benutzeroberflächen, Dokumentationen, Verträge mit Dienstleistern\n• Recht und Versicherungen: Verträge, AGB, Gutachten, Schadensunterlagen\n• Medizin: Arztberichte, Befunde, Studienunterlagen, Approbationsunterlagen\n• Wirtschaft: Jahresabschlüsse, Handelsregisterauszüge, Präsentationen',
        [{ href: '/de/fachuebersetzungen/ingenieurwesen/', label: 'Technische Übersetzung' }, { href: '/de/fachuebersetzungen/it-software/', label: 'IT und Software' }, { href: '/de/fachuebersetzungen/recht/', label: 'Recht und Verträge' }, { href: '/de/fachuebersetzungen/medizinische-dentalmedizin/', label: 'Medizin' }]],
      ['Fachübersetzung mit Beglaubigung', 'Werden Verträge, Urteile oder Arztberichte bei Behörden, Gerichten oder der Approbationsbehörde vorgelegt, fertigen unsere ermächtigten Übersetzer die Fachübersetzung zusätzlich beglaubigt an.',
        [L('beglaubigte-uebersetzung', 'Beglaubigte Übersetzung München')]],
      ['Messen, Projekte und internationale Teams', 'Für Messen in München übersetzen wir Produktunterlagen, Präsentationen und Pressetexte und stellen Dolmetscher für Kundengespräche am Stand – konsekutiv oder simultan. Internationale Teams unterstützen wir mit Übersetzungen von Schulungsunterlagen, Richtlinien und Verträgen, damit alle Standorte mit denselben Begriffen arbeiten.',
        [{ href: '/de/dolmetschen/simultandolmetscher/', label: 'Simultan- und Konferenzdolmetscher' }, L('dolmetscher', 'Dolmetscher München')]],
      ['Preise und Lieferzeit', 'Fachübersetzungen beginnen ab 0,12 € pro Wort. Den Festpreis und die Lieferzeit nennen wir nach Sichtung der Unterlagen – kostenlos und unverbindlich. Die Übersetzung erhalten Sie im Format Ihrer Vorlage.',
        [{ href: '/de/fachuebersetzungen/', label: 'Alle Fachgebiete' }, QUOTE_LINK]],
      digitalSection('Fachübersetzungen laufen komplett digital: Dateien per E-Mail oder Formular senden, Festpreis erhalten, Übersetzung im Format Ihrer Vorlage zurückbekommen.'),
    ],
    faqs: [
      ['Übersetzen Sie auch große Dokumentationen für Münchner Unternehmen?', 'Ja. Bei großem Umfang planen wir Lieferung und Terminologie gemeinsam mit Ihnen.'],
      ['Können Sie unsere Terminologie verwenden?', 'Ja. Senden Sie uns Ihr Glossar oder frühere Übersetzungen – wir übernehmen Ihre Begriffe.'],
    ],
    serviceType: 'Fachübersetzung',
  },
  {
    slug: 'dokumente-uebersetzen',
    eyebrow: 'Dokumente übersetzen lassen München',
    title: 'Urkunden und Dokumente in München übersetzen lassen.',
    metaTitle: 'Dokumente übersetzen lassen München – beglaubigt | Noon',
    description: 'Urkunden und Dokumente übersetzen lassen in München: Geburts-, Heirats-, Sterbe- und Scheidungsurkunden, Zeugnisse, Verträge – beglaubigt, ab 39 €.',
    intro: 'Von der Geburtsurkunde bis zum Kaufvertrag: In München müssen ausländische Dokumente bei Behörden, Gerichten, Hochschulen und Arbeitgebern meist als beglaubigte Übersetzung vorgelegt werden. Hier finden Sie alle Dokumente, die wir für Münchner Kundinnen und Kunden übersetzen – vollständig, mit Stempeln und Vermerken.',
    highlights: ['Alle Urkunden', 'Ab 39 € pro Dokument', 'Festpreis vorab'],
    sections: [
      ['Personenstandsurkunden', '• Geburtsurkunden und Auszüge aus dem Geburtenregister\n• Heiratsurkunden und Familienbücher\n• Sterbeurkunden – etwa für Erbschaft, Witwenrente oder Nachlassgericht\n• Scheidungsurteile und Scheidungsurkunden\n• Ledigkeitsbescheinigungen und Ehefähigkeitszeugnisse',
        [L('geburtsurkunde', 'Geburtsurkunde München'), L('heiratsurkunde', 'Heiratsurkunde München'), D('sterbeurkunde-uebersetzung', 'Sterbeurkunde übersetzen'), D('scheidungsurteil-uebersetzung', 'Scheidungsurteil übersetzen')]],
      ['Ausweise, Zeugnisse und Nachweise', '• Reisepass, Personalausweis und Meldebescheinigung\n• Führerschein für die Umschreibung beim KVR\n• Schul- und Hochschulzeugnisse, Diplome, Transcripts\n• Arbeitszeugnisse und Führungszeugnisse',
        [L('fuehrerschein', 'Führerschein München'), L('zeugnisse-diplome', 'Zeugnisse und Diplome München'), D('reisepass-uebersetzung', 'Reisepass übersetzen'), D('fuehrungszeugnis-uebersetzung', 'Führungszeugnis übersetzen')]],
      ['Verträge und Rechtsdokumente', '• Kauf-, Miet- und Arbeitsverträge\n• Vollmachten, Testamente und Erbscheine\n• Urteile, Beschlüsse und Handelsregisterauszüge',
        [D('vertrag-uebersetzung', 'Verträge übersetzen'), D('vollmacht-uebersetzung', 'Vollmacht übersetzen'), D('testament-uebersetzung', 'Testament übersetzen')]],
      translationPriceSection('München'),
      digitalSection(DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Kann ich mehrere Dokumente zusammen übersetzen lassen?', 'Ja, und das ist meist günstiger als einzeln. Senden Sie alle Dokumente zusammen – Sie erhalten einen Festpreis für alles.'],
      ['Übersetzen Sie auch Sterbeurkunden für das Nachlassgericht?', 'Ja, Sterbeurkunden, Erbscheine und Testamente – beglaubigt und in beide Richtungen.'],
      FAQ_DIGITAL,
    ],
    serviceType: 'Beglaubigte Übersetzung',
  },
  {
    slug: 'geburtsurkunde',
    eyebrow: 'Geburtsurkunde übersetzen München',
    title: 'Geburtsurkunde in München beglaubigt übersetzen lassen.',
    metaTitle: 'Geburtsurkunde übersetzen München – ab 39 € | Noon',
    description: 'Geburtsurkunde übersetzen lassen in München – beglaubigt für Standesamt, KVR und Einbürgerung, ab 39 €, Express am selben Tag möglich.',
    intro: 'Die Geburtsurkunde ist das Dokument, das in München am häufigsten übersetzt werden muss: für die Eheschließung beim Standesamt, für Aufenthaltstitel und Einbürgerung beim KVR oder für die Geburtsbeurkundung eines Kindes. Wir übersetzen Ihre ausländische Geburtsurkunde beglaubigt – mit allen Stempeln, Vermerken und einer vorhandenen Apostille.',
    highlights: ['Ab 39 €', 'Für Standesamt und KVR', 'Express am selben Tag'],
    sections: [
      ['Wofür Sie die Übersetzung in München brauchen', '• Anmeldung der Eheschließung beim Standesamt München\n• Geburtsbeurkundung Ihres Kindes\n• Aufenthaltstitel, Familiennachzug und Einbürgerung beim KVR\n• Kindergeld, Elterngeld und Rentenversicherung'],
      ['Geburtsurkunden aus aller Welt', 'Geburtsurkunden sehen je nach Land sehr unterschiedlich aus – als Urkunde, Registerauszug, mehrsprachiges Formular oder Online-Auszug. Wir übersetzen alle Formen vollständig. Besonders oft erreichen uns aus München Urkunden aus der Türkei, Syrien, dem Irak, der Ukraine, Rumänien, Kroatien, dem Kosovo und Afghanistan.',
        [D('geburtsurkunde-uebersetzung', 'Geburtsurkunde übersetzen: alles Wichtige'), APOSTILLE_LINK]],
      ['Oft zusammen gebraucht', 'Für die Eheschließung verlangt das Standesamt meist auch Ledigkeitsbescheinigung oder Ehefähigkeitszeugnis, für die Einbürgerung oft die Heiratsurkunde. Gemeinsam angefragt ist das in der Regel günstiger.',
        [L('heiratsurkunde', 'Heiratsurkunde übersetzen München'), L('dolmetscher-standesamt', 'Dolmetscher Standesamt München')]],
      translationPriceSection('München'),
      digitalSection(DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Was kostet die Übersetzung einer Geburtsurkunde in München?', 'Ab 39 €. Den Festpreis nennen wir vorab, sobald wir die Urkunde gesehen haben.'],
      ['Akzeptiert das Standesamt München Ihre Übersetzung?', 'Ja. Beglaubigte Übersetzungen ermächtigter Übersetzer werden vom Standesamt München anerkannt.'],
      ['Muss die Geburtsurkunde eine Apostille haben?', 'Das hängt vom Ausstellungsland und vom Standesamt ab. Ist eine Apostille vorhanden, übersetzen wir sie mit.'],
    ],
    serviceType: 'Beglaubigte Übersetzung',
  },
  {
    slug: 'heiratsurkunde',
    eyebrow: 'Heiratsurkunde übersetzen München',
    title: 'Heiratsurkunde in München beglaubigt übersetzen lassen.',
    metaTitle: 'Heiratsurkunde übersetzen München – beglaubigt | Noon',
    description: 'Heiratsurkunde übersetzen lassen in München – beglaubigt für KVR, Standesamt, Familiennachzug und Namensänderung, ab 39 €.',
    intro: 'Eine im Ausland geschlossene Ehe muss in München oft nachgewiesen werden – beim KVR für Aufenthalt und Familiennachzug, beim Standesamt für die Nachbeurkundung oder Namensänderung, bei Elterngeld- und Steuerstellen. Wir übersetzen Ihre Heiratsurkunde beglaubigt, mit allen Stempeln, Vermerken und Namen in der Schreibweise Ihres Reisepasses.',
    highlights: ['Ab 39 €', 'Für KVR und Standesamt', 'Namen wie im Pass'],
    sections: [
      ['Wofür Sie die Übersetzung in München brauchen', '• Familiennachzug und Aufenthaltstitel beim KVR\n• Nachbeurkundung einer Auslandsehe beim Standesamt München\n• Namensänderung nach der Heirat\n• Einbürgerung, Elterngeld, Kindergeld und Steuerklasse\n• Scheidungsverfahren am Amtsgericht München'],
      ['Heiratsurkunden, Familienbücher und religiöse Eheverträge', 'Wir übersetzen staatliche Heiratsurkunden, Heiratsregisterauszüge, Familienbücher und religiöse Eheverträge. Ob eine religiöse Eheschließung in Deutschland anerkannt wird, entscheidet die Behörde; die Übersetzung fertigen wir vollständig und beglaubigt an.',
        [D('heiratsurkunde-uebersetzung', 'Heiratsurkunde übersetzen: alles Wichtige'), { href: '/de/ratgeber/familiennachzug-dokumente/', label: 'Familiennachzug: Dokumente' }]],
      translationPriceSection('München'),
      digitalSection(DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Wie lange dauert die Übersetzung einer Heiratsurkunde?', 'In der Regel 2–3 Werktage, im Express am selben Tag.'],
      ['Übersetzen Sie auch ein Scheidungsurteil dazu?', 'Ja. Wenn eine frühere Ehe geschieden wurde, übersetzen wir das Scheidungsurteil gleich mit.'],
    ],
    serviceType: 'Beglaubigte Übersetzung',
  },
  {
    slug: 'fuehrerschein',
    eyebrow: 'Führerschein übersetzen München',
    title: 'Führerschein in München übersetzen lassen – für die Umschreibung beim KVR.',
    metaTitle: 'Führerschein übersetzen München – beglaubigt | Noon',
    description: 'Führerschein übersetzen lassen in München für die Umschreibung bei der Fahrerlaubnisbehörde des KVR – beglaubigt, ab 39 €, Express am selben Tag.',
    intro: 'Wer mit einem Führerschein aus einem Nicht-EU-Staat nach München zieht, braucht für die Umschreibung bei der Fahrerlaubnisbehörde des KVR in der Regel eine Übersetzung. Wir übersetzen Ihren Führerschein beglaubigt – Vorder- und Rückseite mit allen Klassen, Daten und Vermerken.',
    highlights: ['Für die Fahrerlaubnisbehörde', 'Ab 39 €', 'Vorder- und Rückseite'],
    sections: [
      ['Umschreibung beim KVR', 'Für die Umschreibung verlangt die Fahrerlaubnisbehörde neben dem ausländischen Führerschein meist eine Übersetzung, Passfoto, Sehtest und gegebenenfalls eine Prüfung. Welche Übersetzung sie annimmt und welche Fristen gelten, regelt die Behörde selbst – fragen Sie im Zweifel vorher nach. Unsere Übersetzungen stammen von ermächtigten Übersetzern.',
        [{ href: '/de/ratgeber/fuehrerschein-umschreiben/', label: 'Ausländischen Führerschein umschreiben' }, D('fuehrerschein-uebersetzung', 'Führerschein übersetzen: alles Wichtige')]],
      ['Deutschen Führerschein für das Ausland übersetzen', 'Ziehen Sie aus München ins Ausland oder brauchen Sie den deutschen Führerschein für einen längeren Aufenthalt, übersetzen wir ihn ebenfalls beglaubigt – zum Beispiel ins Englische, Arabische oder Türkische.'],
      translationPriceSection('München'),
      digitalSection(DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Akzeptiert die Fahrerlaubnisbehörde München Ihre Übersetzung?', 'Fahrerlaubnisbehörden verlangen in der Regel die Übersetzung eines ermächtigten Übersetzers. Manche nennen alternativ weitere Stellen – fragen Sie im Zweifel vorher nach.'],
      ['Was kostet die Übersetzung eines Führerscheins?', 'Ab 39 €. Den Festpreis nennen wir vorab.'],
    ],
    serviceType: 'Beglaubigte Übersetzung',
  },
  {
    slug: 'zeugnisse-diplome',
    eyebrow: 'Zeugnis übersetzen München',
    title: 'Zeugnisse und Diplome in München beglaubigt übersetzen lassen.',
    metaTitle: 'Zeugnis & Diplom übersetzen München – beglaubigt | Noon',
    description: 'Zeugnisse, Abitur, Diplome und Transcripts übersetzen lassen in München – beglaubigt für LMU, TU München, Anerkennung und Bewerbung.',
    intro: 'Für ein Studium an LMU, TU München oder Hochschule München, für die Anerkennung eines Berufsabschlusses oder für die Bewerbung bei einem Münchner Arbeitgeber brauchen Sie Ihre Zeugnisse meist als beglaubigte Übersetzung. Wir übersetzen Schul- und Abiturzeugnisse, Diplome, Bachelor- und Masterurkunden, Transcripts und Fächerübersichten vollständig.',
    highlights: ['Schule, Hochschule, Ausbildung', 'Für Anerkennung und Bewerbung', 'Noten wie im Original'],
    sections: [
      ['Für Studium, Anerkennung und Bewerbung', '• Bewerbung an LMU, TU München und Hochschule München\n• Anerkennung ausländischer Berufs- und Hochschulabschlüsse\n• Approbation für Ärztinnen, Ärzte und Gesundheitsberufe\n• Bewerbungen bei Münchner Unternehmen und Behörden',
        [{ href: '/de/ratgeber/anerkennung-auslaendischer-abschluesse/', label: 'Anerkennung ausländischer Abschlüsse' }, D('diplom-uebersetzung', 'Diplom übersetzen'), D('zeugnis-uebersetzung', 'Zeugnis übersetzen')]],
      ['Noten, Fächer und Stunden', 'Noten und Notensysteme übersetzen wir so, wie sie im Original stehen – die Umrechnung nimmt die Hochschule oder Anerkennungsstelle selbst vor. Für die Anerkennung von Berufsabschlüssen werden häufig Fächer- und Stundenübersichten verlangt; die übersetzen wir vollständig mit.'],
      ['Deutsche Zeugnisse ins Englische', 'Für Bewerbungen und Studium im Ausland übersetzen wir deutsche Zeugnisse und Arbeitszeugnisse beglaubigt ins Englische und in weitere Sprachen.',
        [D('arbeitszeugnis-uebersetzung', 'Arbeitszeugnis übersetzen')]],
      translationPriceSection('München'),
      digitalSection(DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Akzeptieren LMU und TU München Ihre Übersetzungen?', 'Hochschulen verlangen in der Regel beglaubigte Übersetzungen ermächtigter Übersetzer – genau die erhalten Sie bei uns. Für Englisch oder Französisch verzichten manche Hochschulen ganz auf eine Übersetzung.'],
      ['Übersetzen Sie auch Transcripts mit vielen Seiten?', 'Ja. Den Festpreis berechnen wir nach Umfang und nennen ihn vorab.'],
    ],
    serviceType: 'Beglaubigte Übersetzung',
  },
];

// Second pass (audit minimum of 400 words): one more page-specific section before the
// closing block and further FAQs per page.
const MORE = {
  dolmetscher: {
    sections: [['Video- und Telefondolmetschen in München', 'Nicht jeder Termin braucht einen Dolmetscher vor Ort. Kurze Gespräche mit Behörden, Arztpraxen oder Geschäftspartnern dolmetschen wir per Video oder Telefon – oft schon am selben oder nächsten Tag. Für Gericht, Notar und Standesamt entscheidet die jeweilige Stelle, ob das zulässig ist; dort empfehlen wir in der Regel einen Dolmetscher vor Ort.']],
    faqs: [['Gibt es einen Mindestbuchungszeitraum?', 'Den Festpreis berechnen wir nach Dauer, Ort und Sprache und nennen ihn vorab. Kurze Termine sind per Video oder Telefon meist günstiger.']],
  },
  'dolmetscher-standesamt': {
    sections: [['Hochzeit mit Gästen aus dem Ausland', 'Viele Paare in München feiern mit Familie aus zwei Ländern. Auf Wunsch dolmetscht derselbe Dolmetscher nach der Trauung auch die Reden, die Begrüßung oder eine freie Trauung, damit alle Gäste folgen können. Für die Feier ist keine Beeidigung nötig; sagen Sie uns einfach, welche Programmpunkte gedolmetscht werden sollen.',
      [{ href: '/de/ratgeber/heiraten-in-deutschland-als-auslaender/', label: 'Heiraten in Deutschland als Ausländer' }]]],
    faqs: [
      ['Was kostet ein Dolmetscher für die Trauung in München?', 'Dolmetscheinsätze beginnen ab 85 € pro Stunde. Für Anmeldung und Trauung nennen wir Ihnen vorab einen Festpreis.'],
      ['Wie früh sollte ich den Dolmetscher buchen?', 'Sobald der Termin beim Standesamt feststeht. Gerade für Freitage und Samstage im Sommer lohnt sich eine frühe Anfrage.'],
    ],
  },
  'dolmetscher-notar': {
    sections: [['Ausländische Dokumente für den Notar', 'Für viele Notartermine braucht das Notariat Unterlagen aus dem Ausland: eine Vollmacht der Verkäuferin, einen ausländischen Registerauszug, eine Heiratsurkunde für den Güterstand oder einen Erbschein. Diese Dokumente übersetzen wir vorher beglaubigt, damit der Termin nicht verschoben werden muss.',
      [{ href: '/de/handelsregisterauszug-uebersetzung/', label: 'Handelsregisterauszug übersetzen' }, L('heiratsurkunde', 'Heiratsurkunde übersetzen München')]]],
    faqs: [
      ['Kann der Dolmetscher auch per Video zugeschaltet werden?', 'Ob das möglich ist, entscheidet das Notariat. Für Beurkundungen ist meist ein Dolmetscher vor Ort üblich.'],
      ['Welche Sprachen dolmetschen Sie beim Notar in München?', 'Alle gängigen Sprachen, darunter Arabisch, Türkisch, Russisch, Ukrainisch, Rumänisch, Kroatisch, Serbisch, Persisch, Englisch, Italienisch und Spanisch. Nennen Sie uns bei der Anfrage auch den Dialekt, falls er wichtig ist.'],
    ],
  },
  gerichtsdolmetscher: {
    sections: [
      ['Wenn das Gericht den Dolmetscher stellt', 'Versteht eine beschuldigte oder angeklagte Person kein Deutsch, zieht das Gericht im Strafverfahren einen Dolmetscher hinzu; die Kosten trägt in der Regel die Staatskasse (§ 187 Gerichtsverfassungsgesetz). In Zivil- und Familienverfahren klären Gericht und Anwälte, wer den Dolmetscher bestellt. Für Gespräche mit Ihrer Anwältin oder Ihrem Anwalt außerhalb der Verhandlung können Sie uns direkt beauftragen.'],
      ['Familiengericht: Scheidung, Sorgerecht, Unterhalt', 'Bei Scheidungen, Sorgerechts- und Unterhaltsverfahren sind oft beide Seiten auf einen Dolmetscher angewiesen – und auf übersetzte Unterlagen wie ausländische Heiratsurkunden, Geburtsurkunden der Kinder oder frühere Urteile. Beides bekommen Sie bei uns aus einer Hand.',
        [L('heiratsurkunde', 'Heiratsurkunde übersetzen München'), L('geburtsurkunde', 'Geburtsurkunde übersetzen München')]],
    ],
    faqs: [['Übersetzen Sie auch Unterlagen für das Gericht?', 'Ja. Ausländische Urteile, Urkunden und Beweisdokumente übersetzen wir beglaubigt, damit sie im Verfahren verwendet werden können.'], ['Wer bezahlt den Gerichtsdolmetscher?', 'Im Strafverfahren trägt in der Regel die Staatskasse die Kosten des vom Gericht hinzugezogenen Dolmetschers. Dolmetscher, die Sie selbst beauftragen – etwa für Anwaltsgespräche –, bezahlen Sie selbst.']],
  },
  fachuebersetzungen: {
    sections: [
      ['So läuft eine Fachübersetzung ab', '1. Dateien senden – Word, Excel, PowerPoint oder PDF, gern mit Glossar und Referenzmaterial.\n2. Festpreis und Lieferzeit erhalten – nach Sichtung der Unterlagen.\n3. Übersetzung durch einen Fachübersetzer – mit einheitlicher Terminologie, je nach Auftrag mit zweiter Prüfung.\n4. Lieferung im Format Ihrer Vorlage – auf Wunsch zusätzlich als beglaubigte Übersetzung.'],
      ['Vertraulich und sicher', 'Verträge, Gutachten, Patientenunterlagen und interne Dokumente behandeln wir vertraulich und verwenden sie ausschließlich für Ihren Auftrag. Hochgeladene Dateien werden nicht öffentlich gespeichert.'],
    ],
    faqs: [['Übersetzen Sie auch ins Englische für internationale Kunden?', 'Ja. Für Münchner Unternehmen übersetzen wir viele Texte aus dem Deutschen ins Englische und in weitere Sprachen – mit derselben Terminologie wie im deutschen Original.'], ['Können Sie die Übersetzung im Layout der Vorlage liefern?', 'Ja, bei bearbeitbaren Dateien wie Word, Excel und PowerPoint übernehmen wir das Layout. Bei PDF-Dateien besprechen wir das Format vorab.'], ['Wie schnell ist eine Fachübersetzung fertig?', 'Das hängt vom Umfang ab. Die Lieferzeit nennen wir verbindlich im Angebot; eilige Teile können wir vorziehen.']],
  },
  'dokumente-uebersetzen': {
    sections: [['Welche Stelle braucht was?', '• Standesamt München: Geburtsurkunden, Ledigkeitsbescheinigung, gegebenenfalls Scheidungsurteil\n• KVR / Ausländerbehörde: Heirats- und Geburtsurkunden, Abschlüsse, Arbeitsvertrag\n• Fahrerlaubnisbehörde im KVR: Führerschein\n• Hochschulen und Anerkennungsstellen: Zeugnisse, Diplome, Fächerübersichten\n• Nachlassgericht: Sterbeurkunde, Testament, Erbschein\n\nDie verbindliche Liste nennt Ihnen die jeweilige Stelle.',
      [L('beglaubigte-uebersetzung', 'Beglaubigte Übersetzung München')]]],
    faqs: [['Wie erhalte ich die übersetzten Dokumente?', 'Als PDF per E-Mail und auf Wunsch als gestempeltes Original per Post an Ihre Adresse in München.'], ['Muss ich jedes Dokument einzeln anfragen?', 'Nein. Senden Sie einfach alle Dokumente zusammen – Sie erhalten einen gemeinsamen Festpreis und eine gemeinsame Lieferung.'], ['Übersetzen Sie Dokumente auch aus dem Deutschen in andere Sprachen?', 'Ja – zum Beispiel deutsche Urkunden, Zeugnisse oder Führerscheine für Behörden im Ausland, beglaubigt.']],
  },
  geburtsurkunde: {
    sections: [['Kind in München geboren – Urkunde für das Ausland', 'Wird eine in München ausgestellte Geburtsurkunde im Ausland gebraucht, gibt es zwei Wege: Das Standesamt kann für viele Länder eine internationale, mehrsprachige Geburtsurkunde ausstellen, die eine Übersetzung ersparen kann. Verlangt das Zielland eine Übersetzung, übersetzen wir die deutsche Urkunde beglaubigt in die gewünschte Sprache. Ob zusätzlich eine Apostille nötig ist, erfahren Sie bei der Stelle im Zielland.',
      [APOSTILLE_LINK]]],
    faqs: [['Übersetzen Sie auch eine deutsche Geburtsurkunde ins Englische oder Arabische?', 'Ja, deutsche Geburtsurkunden übersetzen wir beglaubigt in alle gängigen Sprachen.']],
  },
  heiratsurkunde: {
    sections: [
      ['Heiraten in München mit Partner aus dem Ausland', 'Wer in München heiratet und einen Partner aus dem Ausland hat, braucht für die Anmeldung beim Standesamt meist beglaubigte Übersetzungen von Geburtsurkunden und Ledigkeitsnachweisen – und häufig einen Dolmetscher für Anmeldung und Trauung. Nach der Hochzeit wird die deutsche Heiratsurkunde oft im Herkunftsland gebraucht; auch sie übersetzen wir beglaubigt.',
        [L('dolmetscher-standesamt', 'Dolmetscher Standesamt München'), D('ehefaehigkeitszeugnis-uebersetzung', 'Ehefähigkeitszeugnis')]],
      ['Namen einheitlich schreiben', 'In Heiratsurkunden stehen oft Namen beider Partner, der Eltern und der Trauzeugen. Wir übernehmen die Schreibweise aus den Reisepässen; bei Namen ohne Pass nutzen wir eine einheitliche Umschrift, damit KVR und Standesamt alle Dokumente zuordnen können.'],
    ],
    faqs: [['Akzeptiert das KVR die Übersetzung meiner Heiratsurkunde?', 'Ja. Beglaubigte Übersetzungen öffentlich bestellter bzw. ermächtigter Übersetzer werden vom KVR und von allen Münchner Behörden anerkannt.'], ['Was kostet die Übersetzung einer Heiratsurkunde in München?', 'Ab 39 €. Den Festpreis nennen wir vorab, mehrere Urkunden zusammen sind meist günstiger.']],
  },
  fuehrerschein: {
    sections: [['Fristen: Wie lange gilt der ausländische Führerschein?', 'Mit einem Führerschein aus einem Nicht-EU-Staat dürfen Sie nach der Anmeldung eines Wohnsitzes in München in der Regel sechs Monate fahren. Danach brauchen Sie einen deutschen Führerschein. Ob eine Prüfung nötig ist, hängt vom Ausstellungsland ab. Planen Sie die Übersetzung deshalb früh ein – im Express ist sie am selben Tag fertig. Für Führerscheine aus EU- und EWR-Staaten gelten andere Regeln.',
      [{ href: '/de/express-uebersetzung/', label: 'Express-Übersetzung' }]]],
    faqs: [['Übersetzen Sie Führerscheine aus allen Ländern?', 'Ja, zum Beispiel aus der Türkei, Syrien, dem Irak, der Ukraine, Russland, Indien und den USA – mit allen Klassen und Vermerken.'], ['Brauche ich für die Umschreibung den Original-Führerschein?', 'Die Fahrerlaubnisbehörde verlangt in der Regel das Original. Für die Übersetzung reicht uns ein gut lesbares Foto von Vorder- und Rückseite.']],
  },
  'zeugnisse-diplome': {
    sections: [['Anerkennung von Abschlüssen in Bayern', 'Welche Stelle einen ausländischen Abschluss anerkennt, hängt vom Beruf ab – für reglementierte Berufe wie Ärztin, Pflegefachkraft oder Lehrer gelten eigene Behörden. Für ausländische Hochschulabschlüsse stellt die Zentralstelle für ausländisches Bildungswesen (ZAB) eine Zeugnisbewertung aus. Fast immer werden dafür beglaubigte Übersetzungen der Abschlüsse und Fächerübersichten verlangt – planen Sie dafür ein paar Tage ein.',
      [{ href: '/de/ratgeber/anerkennung-auslaendischer-abschluesse/', label: 'Anerkennung ausländischer Abschlüsse' }]]],
    faqs: [['Übersetzen Sie auch Ausbildungszeugnisse?', 'Ja, Ausbildungs- und Berufsabschlüsse mit Fächer- und Stundenübersicht, wie sie Anerkennungsstellen verlangen.'], ['Was kostet die Übersetzung eines Zeugnisses?', 'Einseitige Zeugnisse beginnen ab 39 €; Diplome mit Notenanlage berechnen wir nach Umfang. Den Festpreis erhalten Sie vorab.']],
  },
};

export const MUENCHEN_PAGES = BASE_PAGES.map((page) => {
  const more = MORE[page.slug];
  if (!more) return page;
  return {
    ...page,
    sections: [...page.sections.slice(0, -1), ...(more.sections || []), page.sections.at(-1)],
    faqs: [...page.faqs, ...(more.faqs || [])],
  };
});
