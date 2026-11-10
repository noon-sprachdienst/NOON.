// Düsseldorf landing pages (SEO plan Nov 2026, phase 3). No office in Düsseldorf: pages describe
// digital handling and name the Bielefeld and Mainz offices for personal appointments.
import {
  APOSTILLE_LINK, CITY, DOCUMENT_LINKS, FAQ_DIGITAL, INTERPRETING_STEPS, NOTARY_GUIDE_LINK, ORDER_STEPS,
  digitalSection, interpretingPriceSection, translationPriceSection, withMore,
} from './shared.js';

const C = CITY.duesseldorf;
const L = (slug, label) => ({ href: `/de/standorte/duesseldorf/${slug}/`, label });
const D = (slug, label) => ({ href: `/de/${slug}/`, label });

export const DUESSELDORF_LINKS = [
  L('beglaubigte-uebersetzung', 'Beglaubigte Übersetzung Düsseldorf'),
  L('dolmetscher', 'Dolmetscher Düsseldorf'),
  L('gerichtsdolmetscher', 'Gerichtsdolmetscher Düsseldorf'),
  L('dolmetscher-notar', 'Dolmetscher beim Notar in Düsseldorf'),
  L('fachuebersetzungen', 'Fachübersetzungen Düsseldorf'),
  L('arabisch', 'Arabisch-Deutsch Düsseldorf'),
  L('tuerkisch', 'Türkisch-Deutsch Düsseldorf'),
  L('griechisch', 'Griechisch-Deutsch Düsseldorf'),
];
const LANG_PAGES = DUESSELDORF_LINKS.slice(5);

const DIGITAL_TRANSLATION = 'Ob Oberbilk, Bilk, Flingern, Benrath oder Neuss: Sie schicken Ihr Dokument als Foto oder Scan, erhalten den Festpreis und bekommen die beglaubigte Übersetzung als PDF und per Post.';
const DIGITAL_INTERPRETING = 'Unsere Dolmetscher kommen zu Ihrem Termin in Düsseldorf und Umgebung – auch nach Neuss, Ratingen, Hilden oder Meerbusch. Kurze Gespräche dolmetschen wir per Video oder Telefon.';

export const DUESSELDORF_HUB = {
  sections: [['Alle Leistungen in Düsseldorf', 'Für die in Düsseldorf am häufigsten gefragten Leistungen und Sprachen haben wir eigene Seiten mit Details, Preisen und typischen Terminen:', DUESSELDORF_LINKS]],
};

const BASE_PAGES = [
  {
    slug: 'beglaubigte-uebersetzung',
    eyebrow: 'Beglaubigte Übersetzung Düsseldorf',
    title: 'Beglaubigte Übersetzungen in Düsseldorf – für Amt, Gericht und Arbeitgeber.',
    metaTitle: 'Beglaubigte Übersetzung Düsseldorf – ab 39 € | Noon',
    description: 'Beglaubigte Übersetzung in Düsseldorf für Ausländerbehörde, Standesamt, Gericht und Hochschule – ermächtigte Übersetzer, ab 39 € pro Dokument, Express möglich.',
    intro: 'Als Landeshauptstadt und internationaler Wirtschaftsstandort zieht Düsseldorf Fachkräfte, Familien und Unternehmen aus aller Welt an. Für Ausländerbehörde, Standesamt, Gerichte, Hochschulen und Arbeitgeber übersetzen unsere ermächtigten Übersetzer ausländische Dokumente beglaubigt – vollständig, formgetreu und ohne Termin vor Ort.',
    highlights: ['Ermächtigte Übersetzer', 'Ab 39 € pro Dokument', 'Express am selben Tag'],
    sections: [
      ['Für diese Düsseldorfer Stellen', '• Ausländerbehörde Düsseldorf: Aufenthalt, Blaue Karte, Familiennachzug, Einbürgerung\n• Standesamt Düsseldorf: Eheschließung, Geburtsbeurkundung, Namensführung\n• Amtsgericht, Landgericht und Oberlandesgericht Düsseldorf: Urteile, Beschlüsse, Erbscheine\n• Heinrich-Heine-Universität und Hochschule Düsseldorf: Zeugnisse und Diplome\n• Straßenverkehrsamt: ausländische Führerscheine\n• Arbeitgeber und Anerkennungsstellen: Abschlüsse und Arbeitszeugnisse\n\nWelche Unterlagen Sie brauchen, nennt Ihnen die jeweilige Stelle. Mit ihrer Liste erhalten Sie von uns einen Festpreis für alles.',
        DOCUMENT_LINKS],
      ['Ermächtigt in NRW, anerkannt überall', 'In Nordrhein-Westfalen werden Übersetzer über die Landgerichte ermächtigt. Ihre beglaubigten Übersetzungen gelten bundesweit, ebenso wie die von Übersetzern aus anderen Bundesländern. Eine notarielle Beglaubigung brauchen deutsche Behörden in der Regel nicht zusätzlich.',
        [NOTARY_GUIDE_LINK, APOSTILLE_LINK]],
      ['Internationale Fachkräfte und Familien', 'Für Fachkräfte mit Blauer Karte, für Familiennachzug und Einbürgerung übersetzen wir Heirats- und Geburtsurkunden, Abschlüsse und Arbeitszeugnisse. In Düsseldorf kommen besonders viele Dokumente auf Arabisch, Türkisch, Griechisch, Polnisch, Russisch und Englisch; Japanisch und Chinesisch übersetzen wir auf Anfrage.',
        LANG_PAGES],
      ['Unternehmen und Gründungen', 'Für Gründungen und Niederlassungen internationaler Unternehmen übersetzen wir Handelsregisterauszüge, Gesellschaftsverträge, Vollmachten und Gesellschafterlisten beglaubigt – für Notar, Registergericht und Behörden im Ausland.',
        [D('handelsregisterauszug-uebersetzung', 'Handelsregisterauszug übersetzen'), L('fachuebersetzungen', 'Fachübersetzungen Düsseldorf')]],
      translationPriceSection('Düsseldorf'),
      ORDER_STEPS,
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Was kostet eine beglaubigte Übersetzung in Düsseldorf?', 'Standarddokumente beginnen ab 39 € pro Dokument. Den Festpreis nennen wir vorab und kostenlos.'],
      ['Akzeptiert die Ausländerbehörde Düsseldorf Ihre Übersetzungen?', 'Ja. Beglaubigte Übersetzungen ermächtigter Übersetzer werden bundesweit anerkannt.'],
      ['Übersetzen Sie Japanisch oder Chinesisch?', 'Auf Anfrage ja. Den Festpreis nennen wir nach Sichtung des Dokuments.'],
      ['Wie lange dauert die Übersetzung?', 'Meist 2–3 Werktage, im Express am selben Tag – in der Regel innerhalb von 4–5 Stunden.'],
      FAQ_DIGITAL,
    ],
    serviceType: 'Beglaubigte Übersetzung',
  },
  {
    slug: 'dolmetscher',
    eyebrow: 'Dolmetscher Düsseldorf',
    title: 'Dolmetscher in Düsseldorf – für Behörde, Messe und Geschäft.',
    metaTitle: 'Dolmetscher Düsseldorf – vor Ort & per Video | Noon',
    description: 'Dolmetscher in Düsseldorf für Ausländerbehörde, Standesamt, Notar, Gericht, Klinik und Messe – vor Ort, per Video oder Telefon, ab 85 € pro Stunde.',
    intro: 'In Düsseldorf dolmetschen wir für Familien, Kanzleien, Unternehmen und Messeaussteller: bei der Ausländerbehörde, im Standesamt, beim Notar, vor Gericht, in Kliniken und bei Verhandlungen mit internationalen Partnern – persönlich oder per Video und Telefon.',
    highlights: ['Vor Ort in Düsseldorf', 'Video & Telefon', 'Ab 85 € pro Stunde'],
    sections: [
      ['Typische Einsätze', '• Ausländerbehörde, Jobcenter, Jugendamt\n• Standesamt: Anmeldung der Eheschließung und Trauung\n• Notar, Amtsgericht, Landgericht, Oberlandesgericht\n• Universitätsklinikum, Krankenhäuser, Praxen\n• Schulen und Kitas\n• Messe Düsseldorf: Standgespräche, Kundentermine, Pressekonferenzen\n• Unternehmen: Verhandlungen, Betriebsversammlungen, Due-Diligence-Gespräche',
        [L('gerichtsdolmetscher', 'Gerichtsdolmetscher Düsseldorf'), L('dolmetscher-notar', 'Dolmetscher Notar Düsseldorf'), { href: '/de/dolmetschen/standesamt-dolmetscher/', label: 'Dolmetscher Standesamt' }]],
      ['Messe Düsseldorf', 'Zu großen internationalen Fachmessen kommen Aussteller und Besucher aus aller Welt nach Düsseldorf. Wir stellen Dolmetscher für Gespräche am Stand und Kundentermine, für Pressekonferenzen auch Simultandolmetscher mit Technik. Je früher Sie anfragen, desto besser – während großer Messen sind gute Dolmetscher schnell ausgebucht.',
        [{ href: '/de/dolmetschen/simultandolmetscher/', label: 'Simultandolmetscher' }]],
      ['Sprachen', 'Häufig gefragt sind Arabisch (auch marokkanisch), Türkisch, Griechisch, Polnisch, Russisch, Ukrainisch, Persisch, Englisch, Französisch, Italienisch und Spanisch; Japanisch und Chinesisch auf Anfrage.',
        LANG_PAGES],
      interpretingPriceSection('Düsseldorf'),
      INTERPRETING_STEPS,
      digitalSection(C, DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Was kostet ein Dolmetscher in Düsseldorf?', 'Ab 85 € pro Stunde. Den Festpreis nennen wir vorab.'],
      ['Stellen Sie Dolmetscher für die Messe?', 'Ja, tageweise oder für einzelne Termine – bitte möglichst früh anfragen.'],
      ['Kommen Sie auch nach Neuss oder Ratingen?', 'Ja, im gesamten Umland von Düsseldorf.'],
      ['Wann reicht ein Video- oder Telefondolmetscher?', 'Für kurze Gespräche. Für Gericht, Notar und Standesamt empfehlen wir einen Dolmetscher vor Ort.'],
      ['Brauche ich einen beeidigten Dolmetscher?', 'Für Gericht, Notar und oft das Standesamt ja, für Geschäftstermine meist nicht.'],
    ],
    serviceType: 'Dolmetschen',
  },
  {
    slug: 'gerichtsdolmetscher',
    eyebrow: 'Gerichtsdolmetscher Düsseldorf',
    title: 'Gerichtsdolmetscher und beeidigte Dolmetscher in Düsseldorf.',
    metaTitle: 'Gerichtsdolmetscher Düsseldorf – beeidigt | Noon',
    description: 'Gerichtsdolmetscher in Düsseldorf: allgemein beeidigte Dolmetscher für Amtsgericht, Landgericht, OLG und Kanzleien – Urteile auch beglaubigt übersetzt.',
    intro: 'Düsseldorf ist Sitz eines Oberlandesgerichts und vieler großer Kanzleien – entsprechend häufig sind Verfahren mit internationalen Beteiligten. Wir stellen allgemein beeidigte Dolmetscher für Kanzleien, Betroffene und Unternehmen und übersetzen Schriftsätze und Urteile beglaubigt.',
    highlights: ['Allgemein beeidigt', 'Straf-, Zivil- und Wirtschaftsrecht', 'Vertraulich'],
    sections: [
      ['Wirtschafts- und Zivilverfahren', 'Bei Streitigkeiten zwischen Unternehmen, Patent- und Wettbewerbsverfahren oder Schiedsverfahren mit internationalen Parteien dolmetschen wir Zeugenvernehmungen, Besprechungen und mündliche Verhandlungen. Verträge, Gutachten und Schriftsätze übersetzen wir als juristische Fachübersetzung oder beglaubigt.',
        [{ href: '/de/fachuebersetzungen/recht/', label: 'Juristische Übersetzungen' }]],
      ['Strafverfahren und Familiengericht', 'Im Strafverfahren lädt das Gericht den Dolmetscher für die Verhandlung meist selbst. Uns buchen Verteidigung, Betroffene und Angehörige für Gespräche vor und nach dem Termin. Für Familienverfahren übersetzen wir Heirats- und Geburtsurkunden sowie ausländische Urteile.',
        [D('scheidungsurteil-uebersetzung', 'Scheidungsurteil übersetzen'), { href: '/de/gerichtsdolmetscher/', label: 'Gerichtsdolmetscher bundesweit' }]],
      ['Beeidigt in NRW', 'Dolmetscher werden in Nordrhein-Westfalen über die Landgerichte allgemein beeidigt und in die Datenbank der Justiz eingetragen. Sie müssen nicht vor jedem Einsatz neu vereidigt werden.'],
      interpretingPriceSection('Düsseldorf'),
      INTERPRETING_STEPS,
      digitalSection(C, DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Welche Sprachen bieten Sie für Düsseldorfer Gerichte?', 'Unter anderem Arabisch, Türkisch, Griechisch, Polnisch, Russisch, Ukrainisch, Persisch und Englisch.'],
      ['Dolmetschen Sie auch in Schiedsverfahren?', 'Ja, nach Vorbereitung mit den Unterlagen der Parteien.'],
      ['Übersetzen Sie Urteile beglaubigt?', 'Ja, auch im Express.'],
      ['Sind die Dolmetscher zur Verschwiegenheit verpflichtet?', 'Ja, beeidigte zusätzlich durch ihren Eid.'],
    ],
    serviceType: 'Gerichtsdolmetscher',
  },
  {
    slug: 'dolmetscher-notar',
    eyebrow: 'Dolmetscher Notar Düsseldorf',
    title: 'Dolmetscher für Notartermine in Düsseldorf.',
    metaTitle: 'Dolmetscher Notar Düsseldorf – beeidigt | Noon',
    description: 'Dolmetscher beim Notar in Düsseldorf: beeidigte Dolmetscher für Immobilienkauf, GmbH-Gründung, Vollmacht und Testament – Urkunde auf Wunsch auch schriftlich.',
    intro: 'Internationale Käufer, Gründer und Erben treffen sich in Düsseldorf häufig beim Notar. Spricht ein Beteiligter nicht ausreichend Deutsch, muss die Urkunde für ihn übersetzt werden. Wir stellen allgemein beeidigte Dolmetscher für die Beurkundung und übersetzen die Urkunde danach auf Wunsch schriftlich.',
    highlights: ['Allgemein beeidigt', 'Auch für Gründungen', 'Urkunde auch schriftlich'],
    sections: [
      ['Notare im Rheinland', 'Im Rheinland – und damit in Düsseldorf – üben Notarinnen und Notare ihr Amt hauptberuflich aus. Für die Beurkundung mit fremdsprachigen Beteiligten gilt § 16 Beurkundungsgesetz. Allgemein beeidigte Dolmetscher müssen nicht eigens vereidigt werden; deshalb setzen wir sie standardmäßig ein.',
        [NOTARY_GUIDE_LINK, { href: '/de/dolmetschen/notardolmetscher/', label: 'Notardolmetscher bundesweit' }]],
      ['Gründungen internationaler Unternehmen', 'Für die Gründung einer GmbH durch ausländische Gesellschafter braucht das Notariat oft ausländische Registerauszüge, Vollmachten und Nachweise der Vertretungsbefugnis – meist mit Apostille und beglaubigter Übersetzung. Wir übersetzen diese Unterlagen vorab und stellen für den Termin einen Dolmetscher, etwa für Englisch, Arabisch, Türkisch oder Russisch.',
        [D('handelsregisterauszug-uebersetzung', 'Handelsregisterauszug übersetzen'), D('vollmacht-uebersetzung', 'Vollmacht übersetzen'), APOSTILLE_LINK]],
      ['Weitere Termine', '• Kauf einer Wohnung oder eines Hauses, Grundschuld\n• Testament und Erbvertrag\n• Vorsorge- und Generalvollmacht\n• Ehevertrag\n• Unterschriftsbeglaubigungen für Dokumente, die im Ausland verwendet werden'],
      interpretingPriceSection('Düsseldorf'),
      digitalSection(C, DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Muss der Dolmetscher beim Notar beeidigt sein?', 'Ist er nicht allgemein beeidigt, muss ihn der Notar vereidigen, sofern die Beteiligten nicht verzichten. Wir stellen deshalb allgemein beeidigte Dolmetscher.'],
      ['Wie lange dauert eine GmbH-Gründung mit Dolmetscher?', 'Je nach Umfang des Gesellschaftsvertrags ein bis zwei Stunden. Den Festpreis nennen wir vorab.'],
      ['Darf ein Mitarbeiter dolmetschen?', 'Das entscheidet der Notar; bei Gründungen wird meist ein unabhängiger Dolmetscher bevorzugt.'],
      ['Übersetzen Sie die Urkunde schriftlich?', 'Ja, beglaubigt – auch für die Verwendung im Ausland.'],
    ],
    serviceType: 'Notardolmetscher',
  },
  {
    slug: 'fachuebersetzungen',
    eyebrow: 'Fachübersetzungen Düsseldorf',
    title: 'Fachübersetzungen für Kanzleien, Mode, Werbung und Industrie in Düsseldorf.',
    metaTitle: 'Fachübersetzungen Düsseldorf – ab 0,12 €/Wort | Noon',
    description: 'Fachübersetzungen in Düsseldorf: Recht, Wirtschaft, Marketing, Mode, Medizin und Technik – Fachübersetzer mit Terminologie und zweiter Prüfung, ab 0,12 €/Wort.',
    intro: 'Düsseldorf ist Standort großer Kanzleien, Beratungen, Werbeagenturen, Modeunternehmen, Telekommunikations- und Industriekonzerne sowie vieler japanischer und chinesischer Niederlassungen. Unsere Fachübersetzer liefern Texte, die fachlich stimmen und zur Marke passen.',
    highlights: ['Recht und Wirtschaft', 'Marketing und Mode', 'Ab 0,12 € pro Wort'],
    sections: [
      ['Fachgebiete', '• Recht: Verträge, Schriftsätze, Gutachten, Compliance-Richtlinien\n• Wirtschaft: Geschäftsberichte, Präsentationen, Ausschreibungen\n• Marketing und Mode: Kampagnen, Kataloge, Produkttexte, Websites\n• Medizin und Pharma: Studienunterlagen, Packungsbeilagen, Befunde\n• Technik und Telekommunikation: Handbücher, Spezifikationen, Software',
        [{ href: '/de/fachuebersetzungen/recht/', label: 'Juristische Übersetzungen' }, { href: '/de/fachuebersetzungen/wirtschaft-finanzen/', label: 'Wirtschaft & Finanzen' }, { href: '/de/fachuebersetzungen/pharmazeutik/', label: 'Pharma-Übersetzungen' }, { href: '/de/fachuebersetzungen/it-software/', label: 'IT-Übersetzungen' }]],
      ['Marketingtexte, die wirken', 'Werbe- und Modetexte übersetzen wir nicht Wort für Wort, sondern so, dass Ton, Wortspiel und Botschaft in der Zielsprache funktionieren. Auf Wunsch liefern wir Varianten für Claims und Überschriften und berücksichtigen Ihren Styleguide und Ihre Markenbegriffe.'],
      ['Für Kanzleien', 'Für Kanzleien übersetzen wir Verträge, Schriftsätze, Due-Diligence-Unterlagen und Korrespondenz – unter Zeitdruck auch mit mehreren Übersetzern und gemeinsamem Glossar. Unterlagen behandeln wir streng vertraulich.'],
      ['Qualität und Preise', 'Ein Fachübersetzer übersetzt, eine zweite Person prüft. Fachübersetzungen beginnen ab 0,12 € pro Wort; den Festpreis nennen wir nach Sichtung.',
        [{ href: '/de/fachuebersetzungen/', label: 'Alle Fachgebiete' }, D('vertrag-uebersetzung', 'Vertrag übersetzen')]],
      digitalSection(C, 'Dateien senden Sie per E-Mail oder Webformular; die Übersetzung erhalten Sie im Format Ihrer Vorlage.'),
    ],
    faqs: [
      ['Was kostet eine Fachübersetzung in Düsseldorf?', 'Ab 0,12 € pro Wort. Den Festpreis nennen wir nach Sichtung.'],
      ['Übersetzen Sie Marketingtexte kreativ?', 'Ja, mit Blick auf Wirkung, Ton und Marke – auf Wunsch mit Varianten.'],
      ['Übersetzen Sie Due-Diligence-Unterlagen?', 'Ja, vertraulich und auf Wunsch mit mehreren Übersetzern parallel.'],
      ['Übersetzen Sie aus dem Japanischen?', 'Auf Anfrage – senden Sie uns die Unterlagen für ein Angebot.'],
    ],
    serviceType: 'Fachübersetzung',
  },
  {
    slug: 'arabisch',
    eyebrow: 'Arabisch Übersetzer Düsseldorf',
    title: 'Arabisch-Deutsch in Düsseldorf: Urkunden, Übersetzer und Dolmetscher.',
    metaTitle: 'Arabisch Übersetzer Düsseldorf – beglaubigt | Noon',
    description: 'Arabisch Übersetzer in Düsseldorf: beglaubigte Übersetzungen aus Marokko, Syrien und dem Irak für Ausländerbehörde und Standesamt – Dolmetscher mit Dialekt.',
    intro: 'Düsseldorf hat eine der größten marokkanischen Gemeinschaften in Deutschland, besonders rund um Oberbilk – dazu viele Familien aus Syrien, dem Irak, Tunesien und Ägypten. Wir übersetzen arabische und arabisch-französische Dokumente beglaubigt und stellen Dolmetscher, die Ihren Dialekt sprechen.',
    highlights: ['Marokko und Maghreb', 'Syrien und Irak', 'Dolmetscher mit Dialekt'],
    sections: [
      ['Dokumente aus dem Maghreb', 'Urkunden aus Marokko, Algerien und Tunesien sind oft zweisprachig auf Arabisch und Französisch. Für Standesamt und Ausländerbehörde übersetzen wir Geburts- und Heiratsurkunden, Familienstandsbescheinigungen, Scheidungsurkunden und Gerichtsentscheidungen vollständig – auch den französischen Teil.',
        [D('heiratsurkunde-uebersetzung', 'Heiratsurkunde übersetzen'), D('geburtsurkunde-uebersetzung', 'Geburtsurkunde übersetzen')]],
      ['Heiraten in Düsseldorf', 'Für die Anmeldung der Eheschließung verlangt das Standesamt Geburtsurkunden, Nachweise zum Familienstand und gegebenenfalls Scheidungsunterlagen – ausländische Dokumente beglaubigt übersetzt. Für Anmeldung und Trauung stellen wir auf Wunsch einen Arabisch-Dolmetscher.',
        [{ href: '/de/ratgeber/heiraten-in-deutschland-als-auslaender/', label: 'Heiraten in Deutschland als Ausländer' }, D('ehefaehigkeitszeugnis-uebersetzung', 'Ehefähigkeitszeugnis übersetzen')]],
      ['Arabisch-Dolmetscher', 'Unsere Dolmetscher sprechen neben Hocharabisch marokkanisches Darija, algerischen, tunesischen, syrischen, irakischen und ägyptischen Dialekt – für Behörden, Ärzte, Schulen, Notar und Gericht in Düsseldorf.',
        [L('dolmetscher', 'Dolmetscher Düsseldorf'), { href: '/de/sprachen/arabisch/', label: 'Arabisch bundesweit' }]],
      translationPriceSection('Düsseldorf'),
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Übersetzen Sie zweisprachige Urkunden aus Marokko?', 'Ja, den arabischen und den französischen Teil – vollständig in einer Übersetzung.'],
      ['Haben Sie Dolmetscher für Darija?', 'Ja, für marokkanisches Arabisch ebenso wie für andere Dialekte.'],
      ['Was kostet eine Arabisch-Übersetzung in Düsseldorf?', 'Standarddokumente beginnen ab 39 €. Den Festpreis nennen wir vorab.'],
      ['Wie werden Namen geschrieben?', 'Wie im Reisepass – bei marokkanischen Pässen meist in französischer Umschrift.'],
    ],
    serviceType: 'Arabisch Übersetzung',
  },
  {
    slug: 'tuerkisch',
    eyebrow: 'Türkisch Übersetzer Düsseldorf',
    title: 'Türkisch-Deutsch in Düsseldorf: beglaubigte Übersetzungen und Dolmetscher.',
    metaTitle: 'Türkisch Übersetzer Düsseldorf – beglaubigt | Noon',
    description: 'Türkisch Übersetzer in Düsseldorf: beglaubigte Übersetzungen Türkisch–Deutsch für Standesamt, Ausländerbehörde, Gericht und Unternehmen – ab 39 €.',
    intro: 'Zwischen Düsseldorf und der Türkei gibt es enge familiäre und wirtschaftliche Verbindungen. Wir übersetzen türkische Urkunden für Düsseldorfer Behörden, deutsche Dokumente für die Türkei und Geschäftsunterlagen für Unternehmen – beglaubigt oder als Fachübersetzung – und stellen Türkisch-Dolmetscher.',
    highlights: ['Privat und geschäftlich', 'In beide Richtungen', 'Dolmetscher, auf Wunsch beeidigt'],
    sections: [
      ['Private Dokumente', '• Nüfus-Registerauszüge und internationale Auszüge\n• Heiratsurkunden, Scheidungsurteile\n• Führerscheine, Zeugnisse, Diplome\n• Vollmachten und Erbunterlagen für die Türkei',
        [D('scheidungsurteil-uebersetzung', 'Scheidungsurteil übersetzen'), D('vollmacht-uebersetzung', 'Vollmacht übersetzen')]],
      ['Für Unternehmen', 'Düsseldorfer Unternehmen mit Partnern in der Türkei lassen bei uns Verträge, Handelsregisterauszüge (Ticaret Sicil Gazetesi), Vollmachten, Angebote und Produktunterlagen übersetzen – als Fachübersetzung oder beglaubigt für Notar und Registergericht.',
        [D('handelsregisterauszug-uebersetzung', 'Handelsregisterauszug übersetzen'), L('fachuebersetzungen', 'Fachübersetzungen Düsseldorf')]],
      ['Dokumente für die Türkei', 'Deutsche öffentliche Urkunden brauchen für die Türkei in der Regel eine Apostille. Sie wird vor der Übersetzung angebracht und dann mit übersetzt. Ob die Übersetzung selbst zusätzlich beglaubigt werden muss, sagt Ihnen die Stelle in der Türkei.',
        [APOSTILLE_LINK, { href: '/de/sprachen/tuerkisch/', label: 'Türkisch bundesweit' }]],
      ['Türkisch-Dolmetscher', 'Für Notar, Standesamt, Gericht, Behörden und Geschäftsgespräche in Düsseldorf stellen wir Türkisch-Dolmetscher – auf Wunsch allgemein beeidigt.',
        [L('dolmetscher-notar', 'Dolmetscher Notar Düsseldorf')]],
      translationPriceSection('Düsseldorf'),
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Was kostet eine Türkisch-Übersetzung in Düsseldorf?', 'Standarddokumente beginnen ab 39 €. Den Festpreis nennen wir vorab.'],
      ['Übersetzen Sie türkische Handelsregisterauszüge?', 'Ja, beglaubigt – zum Beispiel für die Gründung einer Niederlassung.'],
      ['Werden Namen wie im Pass geschrieben?', 'Ja, mit allen türkischen Sonderzeichen.'],
    ],
    serviceType: 'Türkisch Übersetzung',
  },
  {
    slug: 'griechisch',
    eyebrow: 'Griechisch Übersetzer Düsseldorf',
    title: 'Griechisch-Deutsch in Düsseldorf: Übersetzer und Dolmetscher.',
    metaTitle: 'Griechisch Übersetzer Düsseldorf – beglaubigt | Noon',
    description: 'Griechisch Übersetzer in Düsseldorf: beglaubigte Übersetzungen Griechisch–Deutsch von Urkunden, Zeugnissen und Erbunterlagen, Dolmetscher für Notar und Gericht.',
    intro: 'Düsseldorf und das Rheinland haben eine große griechische Gemeinschaft mit engen Verbindungen nach Griechenland und Zypern. Wir übersetzen griechische Urkunden beglaubigt ins Deutsche, deutsche Dokumente ins Griechische und stellen Griechisch-Dolmetscher für Notar, Gericht und Behörden.',
    highlights: ['In beide Richtungen', 'Erbschaft und Immobilien', 'Namen nach Pass'],
    sections: [
      ['Griechische Dokumente', 'Wir übersetzen Geburts- und Heiratsurkunden (ληξιαρχικές πράξεις), Familienstandsbescheinigungen (πιστοποιητικό οικογενειακής κατάστασης), Scheidungsurteile, Schul- und Universitätszeugnisse, Führerscheine und Rentenbescheide. Für viele griechische Personenstandsurkunden gibt es zudem mehrsprachige EU-Formulare – ob die Düsseldorfer Stelle sie annimmt, entscheidet sie selbst.',
        [D('geburtsurkunde-uebersetzung', 'Geburtsurkunde übersetzen'), { href: '/de/sprachen/griechisch/', label: 'Griechisch bundesweit' }]],
      ['Erbschaft und Immobilien in Griechenland', 'Für Erbfälle und Immobilien in Griechenland verlangen griechische Notare und Behörden häufig deutsche Erbscheine, Sterbeurkunden, Testamente und Vollmachten auf Griechisch. Klären Sie mit dem Notar in Griechenland, welche Dokumente er braucht und ob eine Apostille nötig ist – wir übersetzen dann alles einheitlich.',
        [D('testament-uebersetzung', 'Testament und Erbschein übersetzen'), APOSTILLE_LINK]],
      ['Griechische Namen in lateinischer Schrift', 'Griechische Pässe verwenden eine festgelegte Umschrift ins Lateinische. Wir übernehmen Namen genau aus Ihrem Pass, damit deutsche und griechische Unterlagen zusammenpassen.'],
      ['Griechisch-Dolmetscher', 'Für Notartermine, Gericht, Standesamt, Ärzte und Behörden in Düsseldorf stellen wir Griechisch-Dolmetscher – auf Wunsch allgemein beeidigt.',
        [L('dolmetscher', 'Dolmetscher Düsseldorf')]],
      translationPriceSection('Düsseldorf'),
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Was kostet eine Griechisch-Übersetzung in Düsseldorf?', 'Standarddokumente beginnen ab 39 €. Den Festpreis nennen wir vorab.'],
      ['Übersetzen Sie Unterlagen für eine Erbschaft in Griechenland?', 'Ja, Erbscheine, Testamente, Vollmachten und Sterbeurkunden – beglaubigt ins Griechische.'],
      ['Übersetzen Sie auch Dokumente aus Zypern?', 'Ja, griechischsprachige Dokumente aus Zypern ebenso.'],
    ],
    serviceType: 'Griechisch Übersetzung',
  },
];

// Second pass (audit minimum of 400 words): page-specific sections and FAQs.
const MORE = {
  dolmetscher: {
    sections: [['Japanische und chinesische Unternehmen', 'Für Niederlassungen japanischer und chinesischer Unternehmen dolmetschen wir auf Anfrage bei Verhandlungen, Betriebsversammlungen und Behördenterminen – über Englisch oder direkt in die jeweilige Sprache. Nennen Sie uns frühzeitig Termin, Sprachkombination und Thema, damit wir die passende Person finden.']],
    faqs: [
      ['Dolmetschen Sie bei Elterngesprächen?', 'Ja, in Schulen und Kitas – vor Ort oder per Video.'],
      ['Gibt es Dolmetscher für Griechisch?', 'Ja, Griechisch gehört in Düsseldorf zu den häufig gefragten Sprachen.'],
    ],
  },
  gerichtsdolmetscher: {
    sections: [
      ['Lange Verhandlungstage', 'Verhandlungstage in Wirtschaftsverfahren dauern oft viele Stunden. Wir planen dann ein Team aus zwei Dolmetschern, die sich abwechseln. Glossare, Schriftsätze und Zeugenlisten helfen bei der Vorbereitung – soweit Sie diese weitergeben dürfen.'],
      ['Übersetzungen für das Verfahren', 'Wir übersetzen Klageschriften, Urteile, Beschlüsse, Gutachten, Verträge und Korrespondenz, die als Beweismittel dienen – beglaubigt, wenn das Gericht es verlangt.'],
    ],
    faqs: [
      ['Kann ich einen Dolmetscher für ein Mandantengespräch buchen?', 'Ja, in der Kanzlei, per Video oder Telefon.'],
      ['Dolmetschen Sie im Gerichtssaal simultan?', 'Je nach Verfahren konsekutiv oder flüsternd simultan; das klären wir vorab mit Ihnen und dem Gericht.'],
    ],
  },
  'dolmetscher-notar': {
    sections: [
      ['Immobilienkauf', 'Beim Kauf einer Wohnung oder eines Hauses in Düsseldorf werden Kaufvertrag und Grundschuld häufig getrennt beurkundet. Wir planen beide Termine auf Wunsch mit derselben Person. Den Entwurf schicken Sie uns am besten einige Tage vorher, damit sich der Dolmetscher auf Begriffe wie Auflassung oder Vormerkung vorbereiten kann.'],
      ['Sprachen beim Notar', 'Häufig gefragt sind Englisch, Arabisch, Türkisch, Griechisch, Russisch und Polnisch; Japanisch und Chinesisch auf Anfrage.',
        LANG_PAGES],
    ],
    faqs: [
      ['Kann der Dolmetscher per Video zugeschaltet werden?', 'Das entscheidet der Notar; bei Beurkundungen ist ein Dolmetscher vor Ort üblich.'],
      ['Wer bezahlt den Dolmetscher?', 'In der Regel die Person, die ihn benötigt, oder die Vertragsparteien nach Absprache.'],
    ],
  },
  fachuebersetzungen: {
    sections: [
      ['Messe und Events', 'Für Aussteller übersetzen wir Messekataloge, Standtexte, Pressemitteilungen und Präsentationen – rechtzeitig vor Messebeginn und im Originalformat.'],
      ['Telekommunikation und IT', 'Benutzeroberflächen, Hilfetexte, technische Dokumentation und Verträge für Telekommunikations- und IT-Unternehmen übersetzen wir mit Rücksicht auf Zeichenbegrenzungen und Variablen.'],
      ['Internationale Niederlassungen', 'Viele Düsseldorfer Niederlassungen internationaler Konzerne brauchen Arbeitsverträge, Richtlinien und Mitarbeiterkommunikation auf Deutsch und Englisch, teils in weiteren Sprachen. Wir sorgen dafür, dass alle Fassungen denselben Inhalt und dieselben Begriffe haben.'],
      ['Recht und Compliance für Konzerne', 'Richtlinien, Verhaltenskodizes, Datenschutzhinweise und Schulungen zu Compliance-Themen übersetzen wir für Konzerne in alle benötigten Sprachen – juristisch präzise und zugleich verständlich für die Belegschaft.'],
    ],
    faqs: [
      ['Wie schnell geht es?', 'Den Liefertermin nennen wir verbindlich im Angebot.'],
      ['Arbeiten Sie mit Glossaren und Styleguides?', 'Ja, wir übernehmen Ihre Vorgaben und pflegen sie weiter.'],
      ['Liefern Sie im Originalformat?', 'Ja, Word, Excel, PowerPoint, InDesign-Exporte und Webformate.'],
      ['Übersetzen Sie Pressemitteilungen kurzfristig?', 'Kurze Texte oft am selben Tag – sprechen Sie uns mit Ihrem Termin an.'],
      ['Unterschreiben Sie eine Vertraulichkeitsvereinbarung?', 'Ja, gern vor Beginn des Auftrags.'],
    ],
  },
  arabisch: {
    sections: [
      ['Aufenthalt und Einbürgerung in Düsseldorf', 'Ob Verlängerung des Aufenthaltstitels, Familiennachzug oder Einbürgerung: Die Ausländerbehörde Düsseldorf verlangt ausländische Urkunden in beglaubigter Übersetzung. Senden Sie uns alle Dokumente der Familie gemeinsam – wir übersetzen sie mit derselben Namensschreibweise und nennen einen gemeinsamen Festpreis.',
        [{ href: '/de/ratgeber/einbuergerung-dokumente/', label: 'Einbürgerung: Dokumente' }, { href: '/de/ratgeber/familiennachzug-dokumente/', label: 'Familiennachzug: Dokumente' }]],
      ['Syrische und irakische Urkunden', 'Familienbuchauszüge, Personalausweise, Staatsangehörigkeitsnachweise, Zeugnisse und Führerscheine aus Syrien und dem Irak übersetzen wir vollständig, inklusive aller Stempel und Beglaubigungen.',
        [{ href: '/de/ratgeber/arabische-geburtsurkunde-uebersetzen/', label: 'Arabische Geburtsurkunde übersetzen' }]],
    ],
    faqs: [
      ['Übersetzen Sie auch ins Arabische?', 'Ja, deutsche Urkunden und Zeugnisse beglaubigt ins Arabische – etwa für Behörden in Marokko.'],
      ['Brauche ich das Original?', 'Nein, ein gut lesbares Foto oder ein Scan reicht für die Übersetzung.'],
      ['Wie schnell geht es?', 'Meist 2–3 Werktage, im Express am selben Tag.'],
    ],
  },
  tuerkisch: {
    sections: [
      ['Heiraten und Familie', 'Für die Eheschließung in Düsseldorf verlangt das Standesamt von türkischen Staatsangehörigen in der Regel einen aktuellen Registerauszug und Nachweise zum Familienstand. Für die Beurkundung der Geburt eines Kindes werden oft die Heiratsurkunde der Eltern und weitere Urkunden gebraucht. Wir übersetzen alles beglaubigt und stellen auf Wunsch einen Dolmetscher für das Standesamt.'],
      ['Rente', 'Versicherungsverläufe der türkischen Sozialversicherung (SGK) und deutsche Rentenbescheide übersetzen wir beglaubigt – für Anträge in beiden Ländern.'],
      ['Führerschein', 'Türkische Führerscheine übersetzen wir für die Umschreibung beim Straßenverkehrsamt Düsseldorf – vollständig, auf Wunsch im Express.',
        [D('fuehrerschein-uebersetzung', 'Führerschein übersetzen')]],
    ],
    faqs: [
      ['Übersetzen Sie e-Devlet-Ausdrucke?', 'Ja, mit Barcode und Prüfvermerk.'],
      ['Wie schnell geht es?', 'Meist 2–3 Werktage, im Express am selben Tag – in der Regel innerhalb von 4–5 Stunden.'],
      ['Dolmetschen Sie Kurdisch?', 'Auf Anfrage für Kurmanci.'],
    ],
  },
  griechisch: {
    sections: [
      ['Studium und Beruf', 'Griechische Schul- und Universitätsabschlüsse (Apolytirio, Ptychio) übersetzen wir für Bewerbung, Einschreibung und Anerkennung – mit allen Fächern und Noten. Für Ärztinnen, Pflegekräfte und Ingenieure übersetzen wir auch Berufszulassungen und Arbeitsbescheinigungen.',
        [{ href: '/de/ratgeber/anerkennung-auslaendischer-abschluesse/', label: 'Anerkennung ausländischer Abschlüsse' }]],
      ['Rente aus Griechenland', 'Wer in Griechenland und Deutschland gearbeitet hat, braucht für die Rente häufig griechische Versicherungsnachweise und Bescheide auf Deutsch – und deutsche Rentenbescheide auf Griechisch. Wir übersetzen beides beglaubigt.'],
    ],
    faqs: [
      ['Wie schnell geht es?', 'Meist 2–3 Werktage, im Express am selben Tag.'],
      ['Übersetzen Sie deutsche Urkunden ins Griechische?', 'Ja, zum Beispiel Geburts- und Heiratsurkunden für die Eintragung in Griechenland.'],
    ],
  },
};

export const DUESSELDORF_PAGES = withMore(BASE_PAGES, MORE);
