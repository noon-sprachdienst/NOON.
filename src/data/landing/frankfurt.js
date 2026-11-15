// Frankfurt am Main landing pages (SEO plan Nov 2026, phase 3). Frankfurt has the second most
// impressions in Search Console but only one page; no office, so pages describe digital
// handling and name the Mainz office for personal appointments.
import {
  APOSTILLE_LINK, CITY, DOCUMENT_LINKS, FAQ_DIGITAL, INTERPRETING_STEPS, NOTARY_GUIDE_LINK, ORDER_STEPS,
  digitalSection, interpretingPriceSection, translationPriceSection, withMore,
} from './shared.js';

const C = CITY.frankfurt;
const L = (slug, label) => ({ href: `/de/standorte/frankfurt-am-main/${slug}/`, label });
const D = (slug, label) => ({ href: `/de/${slug}/`, label });

export const FRANKFURT_LINKS = [
  L('beglaubigte-uebersetzung', 'Beglaubigte Übersetzung Frankfurt'),
  L('dolmetscher', 'Dolmetscher Frankfurt'),
  L('gerichtsdolmetscher', 'Gerichtsdolmetscher Frankfurt'),
  L('dolmetscher-notar', 'Dolmetscher beim Notar in Frankfurt'),
  L('fachuebersetzungen', 'Fachübersetzungen Frankfurt'),
  L('englisch', 'Englisch-Deutsch Frankfurt'),
  L('tuerkisch', 'Türkisch-Deutsch Frankfurt'),
  L('arabisch', 'Arabisch-Deutsch Frankfurt'),
];
const LANG_PAGES = FRANKFURT_LINKS.slice(5);

const DIGITAL_TRANSLATION = 'Ob Sachsenhausen, Bockenheim, Gallus oder Höchst: Für Ihre beglaubigte Übersetzung senden Sie das Dokument einfach als Foto oder Scan, erhalten den Festpreis und bekommen die Übersetzung als PDF und per Post nach Hause.';
const DIGITAL_INTERPRETING = 'Unsere Dolmetscher kommen zu Ihrem Termin in Frankfurt und Umgebung – auch nach Offenbach, Eschborn, Bad Homburg oder Hanau. Kurze Gespräche dolmetschen wir per Video oder Telefon.';

export const FRANKFURT_HUB = {
  sections: [['Alle Leistungen in Frankfurt', 'Für die in Frankfurt am häufigsten gefragten Leistungen und Sprachen haben wir eigene Seiten mit Details, Preisen und typischen Terminen:', FRANKFURT_LINKS]],
};

const BASE_PAGES = [
  {
    slug: 'beglaubigte-uebersetzung',
    eyebrow: 'Beglaubigte Übersetzung Frankfurt',
    title: 'Beglaubigte Übersetzungen in Frankfurt am Main – digital und zum Festpreis.',
    metaTitle: 'Beglaubigte Übersetzung Frankfurt – ab 39 € | Noon',
    description: 'Beglaubigte Übersetzung in Frankfurt am Main für Ausländerbehörde, Standesamt, Gericht und Goethe-Universität – ab 39 € pro Dokument, Express am selben Tag.',
    intro: 'In Frankfurt leben Menschen aus aller Welt – entsprechend oft verlangen Ausländerbehörde, Standesamt, Gerichte und Hochschulen ausländische Dokumente in beglaubigter Übersetzung. Unsere in Deutschland ermächtigten Übersetzer übersetzen Ihre Urkunden vollständig, bestätigen die Richtigkeit mit Unterschrift und Stempel und schicken Ihnen das Ergebnis als PDF und per Post.',
    highlights: ['Ermächtigte Übersetzer', 'Ab 39 € pro Dokument', 'Express am selben Tag'],
    sections: [
      ['Welche Frankfurter Stellen beglaubigte Übersetzungen verlangen', '• Ausländerbehörde Frankfurt: Urkunden und Nachweise für Aufenthaltstitel, Blaue Karte, Familiennachzug und Einbürgerung\n• Standesamt Frankfurt am Main: Geburts-, Ledigkeits- und Scheidungsnachweise für die Eheschließung, Urkunden für die Geburtsbeurkundung\n• Amtsgericht und Landgericht Frankfurt: Urteile, Beschlüsse, Vollmachten und Erbscheine\n• Goethe-Universität, Frankfurt University of Applied Sciences und Frankfurt School: Zeugnisse und Diplome für Bewerbung und Einschreibung\n• Fahrerlaubnisbehörde: ausländische Führerscheine für die Umschreibung\n\nDie verbindliche Liste nennt Ihnen die jeweilige Stelle – senden Sie sie uns, und Sie erhalten einen Festpreis für alle Dokumente zusammen.',
        DOCUMENT_LINKS],
      ['Anerkannt in Frankfurt und ganz Deutschland', 'Eine beglaubigte Übersetzung eines in Deutschland zugelassenen Übersetzers gilt bundesweit – es spielt keine Rolle, in welchem Bundesland der Übersetzer ermächtigt wurde. Ein zusätzlicher Notar ist für deutsche Behörden in der Regel nicht nötig. Wird das Dokument im Ausland gebraucht, kann je nach Zielland eine Apostille hinzukommen.',
        [NOTARY_GUIDE_LINK, APOSTILLE_LINK]],
      ['Was wir übersetzen', 'Wir übersetzen das vollständige Dokument mit allen Stempeln, Siegeln, Randvermerken und – falls vorhanden – der Apostille. Namen übernehmen wir in der Schreibweise Ihres Reisepasses. In Frankfurt übersetzen wir besonders oft aus dem Englischen, Türkischen, Arabischen, Persischen und Tigrinya sowie aus dem Kroatischen, Serbischen und Bosnischen.',
        LANG_PAGES],
      translationPriceSection('Frankfurt'),
      ORDER_STEPS,
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Was kostet eine beglaubigte Übersetzung in Frankfurt?', 'Standarddokumente wie Geburts- oder Heiratsurkunde beginnen ab 39 € pro Dokument. Den Festpreis nennen wir Ihnen vorab und kostenlos.'],
      ['Akzeptiert die Ausländerbehörde Frankfurt Ihre Übersetzungen?', 'Ja. Beglaubigte Übersetzungen ermächtigter Übersetzer werden von Frankfurter Behörden und bundesweit anerkannt.'],
      ['Haben Sie ein Büro in Frankfurt?', 'Nein – Aufträge aus Frankfurt laufen komplett digital. Persönliche Termine bieten wir nach Vereinbarung in unserem Büro in Mainz an.'],
      ['Wie schnell bekomme ich die Übersetzung?', 'In der Regel in 2–3 Werktagen, im Express am selben Tag – meist innerhalb von 4–5 Stunden.'],
      FAQ_DIGITAL,
    ],
    serviceType: 'Beglaubigte Übersetzung',
  },
  {
    slug: 'dolmetscher',
    eyebrow: 'Dolmetscher Frankfurt',
    title: 'Dolmetscher in Frankfurt am Main – für Behörde, Messe und Verhandlung.',
    metaTitle: 'Dolmetscher Frankfurt – vor Ort & per Video | Noon',
    description: 'Dolmetscher in Frankfurt am Main für Behörden, Standesamt, Notar, Gericht, Messe und Geschäftstermine – vor Ort, per Video oder Telefon, ab 85 € pro Stunde.',
    intro: 'Frankfurt ist Finanzplatz, Messestadt und Heimat vieler internationaler Familien. Entsprechend vielfältig sind die Termine, für die wir Dolmetscherinnen und Dolmetscher stellen: vom Gespräch bei der Ausländerbehörde über die Trauung im Standesamt bis zur Vertragsverhandlung in einer Bank oder dem Kundengespräch auf der Messe.',
    highlights: ['Vor Ort in Frankfurt', 'Video & Telefon', 'Ab 85 € pro Stunde'],
    sections: [
      ['Typische Einsätze in Frankfurt', '• Ausländerbehörde, Jobcenter, Sozial- und Jugendamt\n• Standesamt: Anmeldung der Eheschließung und Trauung\n• Notar: Kaufverträge, Vollmachten, Gesellschaftsgründungen\n• Amtsgericht, Landgericht und Polizei\n• Kliniken und Arztpraxen: Aufklärung, Befundgespräche\n• Messe Frankfurt: Kundengespräche am Stand, Führungen, Pressetermine\n• Banken, Kanzleien und Unternehmen: Verhandlungen, Betriebsversammlungen, Schulungen',
        [L('gerichtsdolmetscher', 'Gerichtsdolmetscher Frankfurt'), L('dolmetscher-notar', 'Dolmetscher Notar Frankfurt'), { href: '/de/dolmetschen/standesamt-dolmetscher/', label: 'Dolmetscher Standesamt' }]],
      ['Messe- und Geschäftsdolmetschen', 'Auf Messen zählt jedes Gespräch. Unsere Dolmetscher begleiten Sie am Stand, bei Kundenterminen und Abendveranstaltungen – konsekutiv oder flüsternd, je nach Situation. Für Konferenzen und Hauptversammlungen mit Kabine stellen wir Simultandolmetscher im Team. Schicken Sie uns Produktunterlagen und Fachbegriffe vorab, damit die Dolmetscher gut vorbereitet sind.',
        [{ href: '/de/dolmetschen/simultandolmetscher/', label: 'Simultandolmetscher' }]],
      ['Sprachen in Frankfurt', 'Besonders gefragt sind Englisch, Türkisch, Arabisch (auch marokkanischer Dialekt), Persisch und Dari, Tigrinya, Kroatisch, Serbisch, Bosnisch, Polnisch, Rumänisch, Italienisch und Spanisch. Nennen Sie uns bei der Anfrage das Herkunftsland Ihrer Gesprächspartner – so finden wir die passende Person.',
        LANG_PAGES],
      interpretingPriceSection('Frankfurt'),
      INTERPRETING_STEPS,
      digitalSection(C, DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Was kostet ein Dolmetscher in Frankfurt?', 'Dolmetscheinsätze beginnen ab 85 € pro Stunde. Den Festpreis nennen wir Ihnen vorab, sobald wir Ort, Dauer und Sprache kennen.'],
      ['Stellen Sie Dolmetscher für die Messe Frankfurt?', 'Ja, für Gespräche am Stand, Kundentermine und Veranstaltungen – tageweise oder für einzelne Termine.'],
      ['Kommen Ihre Dolmetscher auch nach Offenbach oder Eschborn?', 'Ja, wir stellen Dolmetscher im gesamten Rhein-Main-Gebiet.'],
      ['Wann reicht Telefon- oder Videodolmetschen?', 'Für kurze Gespräche mit Behörden, Praxen oder Geschäftspartnern. Für Gericht, Notar und Standesamt empfehlen wir einen Dolmetscher vor Ort.'],
    ],
    serviceType: 'Dolmetschen',
  },
  {
    slug: 'gerichtsdolmetscher',
    eyebrow: 'Gerichtsdolmetscher Frankfurt',
    title: 'Gerichtsdolmetscher und beeidigte Dolmetscher in Frankfurt am Main.',
    metaTitle: 'Gerichtsdolmetscher Frankfurt – beeidigt | Noon',
    description: 'Gerichtsdolmetscher in Frankfurt am Main: allgemein beeidigte Dolmetscher für Amtsgericht, Landgericht, Kanzlei und Polizei – Urteile auch beglaubigt.',
    intro: 'Frankfurt ist einer der größten Gerichtsstandorte Deutschlands – mit Amtsgericht, Landgericht, Oberlandesgericht, Arbeits- und Sozialgericht. Für Mandantengespräche, Vernehmungen und Verhandlungen stellen wir allgemein beeidigte Dolmetscher und übersetzen die Unterlagen des Verfahrens beglaubigt.',
    highlights: ['Allgemein beeidigt', 'Straf-, Zivil-, Arbeits- und Familienrecht', 'Vertraulich'],
    sections: [
      ['Wer den Dolmetscher bestellt', 'Versteht eine beschuldigte oder angeklagte Person kein Deutsch, zieht das Gericht im Strafverfahren selbst einen Dolmetscher hinzu; die Kosten trägt in der Regel die Staatskasse. In Zivil-, Arbeits- und Familiensachen klären Gericht und Anwälte, wer den Dolmetscher lädt. Für Gespräche mit Ihrer Anwältin oder Ihrem Anwalt, für die Vorbereitung auf die Verhandlung oder für private Termine buchen Sie uns direkt.'],
      ['Einsätze in Frankfurt', '• Amtsgericht Frankfurt am Main: Straf-, Familien- und Zivilsachen\n• Landgericht und Oberlandesgericht Frankfurt am Main\n• Arbeitsgericht: Kündigungsschutz und Lohnklagen\n• Polizei und Staatsanwaltschaft: Vernehmungen\n• Kanzleien: Mandantengespräche, Vergleichsverhandlungen, Akteneinsicht'],
      ['Wirtschaftsverfahren und internationale Mandate', 'Frankfurter Kanzleien betreuen viele grenzüberschreitende Verfahren. Neben dem Dolmetschen übersetzen wir Schriftsätze, Verträge, Gutachten und Urteile – als Fachübersetzung oder beglaubigt, ins Deutsche und aus dem Deutschen.',
        [{ href: '/de/fachuebersetzungen/recht/', label: 'Juristische Übersetzungen' }, { href: '/de/gerichtsdolmetscher/', label: 'Gerichtsdolmetscher bundesweit' }]],
      interpretingPriceSection('Frankfurt'),
      INTERPRETING_STEPS,
      digitalSection(C, DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Was bedeutet „allgemein beeidigt“?', 'Der Dolmetscher hat vor Gericht einen allgemeinen Eid geleistet und ist in die Datenbank der Justiz eingetragen. Er muss nicht für jeden Einsatz neu vereidigt werden.'],
      ['Welche Sprachen bieten Sie für Frankfurter Gerichte?', 'Unter anderem Englisch, Türkisch, Arabisch, Persisch, Dari, Tigrinya, Kroatisch, Serbisch, Polnisch, Rumänisch und Russisch.'],
      ['Übersetzen Sie auch Urteile beglaubigt?', 'Ja, Urteile, Beschlüsse, Ladungen und Anklageschriften – auf Wunsch im Express.'],
      ['Sind Ihre Dolmetscher zur Verschwiegenheit verpflichtet?', 'Ja, alle arbeiten vertraulich; beeidigte Dolmetscher sind zusätzlich durch ihren Eid gebunden.'],
    ],
    serviceType: 'Gerichtsdolmetscher',
  },
  {
    slug: 'dolmetscher-notar',
    eyebrow: 'Dolmetscher Notar Frankfurt',
    title: 'Dolmetscher für Notartermine in Frankfurt am Main.',
    metaTitle: 'Dolmetscher Notar Frankfurt – beeidigt | Noon',
    description: 'Dolmetscher beim Notar in Frankfurt: beeidigte Dolmetscher für Immobilienkauf, Vollmacht, GmbH-Gründung und Erbvertrag – Urkunde auch schriftlich.',
    intro: 'Kaufen Sie in Frankfurt eine Wohnung, gründen Sie eine GmbH oder erteilen Sie eine Vollmacht und sprechen nicht ausreichend Deutsch, muss die Urkunde beim Notar mündlich übersetzt werden. Wir stellen beeidigte Dolmetscher für die Beurkundung und übersetzen die Urkunde danach auf Wunsch schriftlich.',
    highlights: ['Beeidigte Dolmetscher', 'Für Beurkundungen', 'Schriftliche Übersetzung danach'],
    sections: [
      ['Notare in Frankfurt und Hessen', 'In Hessen sind Notarinnen und Notare in der Regel zugleich als Rechtsanwälte tätig (Anwaltsnotariat). Das ändert nichts am Ablauf: Spricht ein Beteiligter nicht ausreichend Deutsch, muss die Niederschrift übersetzt werden (§ 16 Beurkundungsgesetz). Ist der Dolmetscher nicht allgemein beeidigt, muss der Notar ihn vereidigen, es sei denn, alle Beteiligten verzichten darauf – deshalb setzen wir für Beurkundungen standardmäßig allgemein beeidigte Dolmetscher ein.',
        [NOTARY_GUIDE_LINK, { href: '/de/dolmetschen/notardolmetscher/', label: 'Notardolmetscher bundesweit' }]],
      ['Typische Beurkundungen', '• Kauf oder Verkauf einer Eigentumswohnung oder eines Hauses\n• Gründung einer GmbH, Gesellschafterbeschlüsse, Anteilsübertragungen\n• Generalvollmacht und Vorsorgevollmacht\n• Testament, Erbvertrag, Erbausschlagung\n• Ehevertrag und Scheidungsfolgenvereinbarung\n• Unterschriftsbeglaubigungen für Dokumente, die im Ausland verwendet werden'],
      ['Gut vorbereitet zum Termin', 'Schicken Sie uns den Urkundsentwurf möglichst einige Tage vorher. So kann sich der Dolmetscher auf Fachbegriffe vorbereiten, und der Termin verläuft ohne Verzögerung. Ausländische Unterlagen, die das Notariat vorab braucht – etwa Registerauszüge oder Vollmachten –, übersetzen wir beglaubigt.',
        [D('handelsregisterauszug-uebersetzung', 'Handelsregisterauszug übersetzen'), D('vollmacht-uebersetzung', 'Vollmacht übersetzen'), APOSTILLE_LINK]],
      interpretingPriceSection('Frankfurt'),
      digitalSection(C, DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Muss der Dolmetscher beim Notar beeidigt sein?', 'Nicht zwingend – ein nicht allgemein beeidigter Dolmetscher muss aber vom Notar vereidigt werden, wenn die Beteiligten nicht verzichten. Wir stellen deshalb allgemein beeidigte Dolmetscher.'],
      ['Wie lange dauert ein Notartermin mit Dolmetscher?', 'Meist ein bis zwei Stunden, bei Gesellschaftsverträgen auch länger. Den Festpreis nennen wir vorab.'],
      ['Kann ein Familienmitglied dolmetschen?', 'Das entscheidet der Notar. Bei Immobilienkäufen und Gesellschaftsgründungen bestehen viele Notare auf einem unabhängigen Dolmetscher.'],
      ['Übersetzen Sie die notarielle Urkunde auch schriftlich?', 'Ja, beglaubigt – zum Beispiel für die Verwendung im Ausland, dann oft zusammen mit einer Apostille.'],
    ],
    serviceType: 'Notardolmetscher',
  },
  {
    slug: 'fachuebersetzungen',
    eyebrow: 'Fachübersetzungen Frankfurt',
    title: 'Fachübersetzungen für Finanzplatz, Kanzleien und Industrie in Frankfurt.',
    metaTitle: 'Fachübersetzungen Frankfurt – ab 0,12 €/Wort | Noon',
    description: 'Fachübersetzungen in Frankfurt am Main: Finanzen, Recht, Pharma, Technik und Messe – Fachübersetzer mit Terminologie und zweiter Prüfung, ab 0,12 € pro Wort.',
    intro: 'Banken, Fondsgesellschaften, Kanzleien, Wirtschaftsprüfer, Pharma- und Logistikunternehmen in Frankfurt brauchen Übersetzungen, bei denen jede Zahl und jeder Fachbegriff stimmt. Unsere Fachübersetzer arbeiten mit Translation-Memory-Software, gepflegter Terminologie und einer zweiten Prüfung vor der Lieferung.',
    highlights: ['Fachübersetzer je Gebiet', 'Zweite Prüfung', 'Ab 0,12 € pro Wort'],
    sections: [
      ['Fachgebiete für Frankfurter Unternehmen', '• Finanzen: Jahresabschlüsse, Geschäftsberichte, Fondsdokumente, Präsentationen für Investoren\n• Recht: Verträge, AGB, Schriftsätze, Gesellschafterbeschlüsse, Compliance-Richtlinien\n• Pharma und Chemie: Studienunterlagen, Packungsbeilagen, Sicherheitsdatenblätter\n• Technik und Logistik: Handbücher, Ausschreibungen, Datenblätter\n• Messe und Marketing: Produktkataloge, Pressemitteilungen, Websites',
        [{ href: '/de/fachuebersetzungen/wirtschaft-finanzen/', label: 'Wirtschaft & Finanzen' }, { href: '/de/fachuebersetzungen/recht/', label: 'Juristische Übersetzungen' }, { href: '/de/fachuebersetzungen/pharmazeutik/', label: 'Pharma-Übersetzungen' }, { href: '/de/fachuebersetzungen/ingenieurwesen/', label: 'Technische Übersetzungen' }]],
      ['Zahlen, Fristen, Vertraulichkeit', 'Bei Finanz- und Rechtstexten kommt es auf Details an: Zahlenformate, Datumsangaben, Fachbegriffe nach HGB oder IFRS und einheitliche Bezeichnungen über viele Dokumente hinweg. Wir halten Ihre Terminologie in Glossaren fest, liefern im Format Ihrer Vorlage und behandeln alle Unterlagen vertraulich – eine Vertraulichkeitsvereinbarung unterschreiben wir gern.'],
      ['Auch beglaubigt', 'Handelsregisterauszüge, Gesellschaftsverträge, Bilanzen oder Vollmachten für Behörden und Gerichte im Ausland übersetzen wir auf Wunsch beglaubigt – gegebenenfalls mit Apostille auf der Originalurkunde.',
        [D('handelsregisterauszug-uebersetzung', 'Handelsregisterauszug übersetzen'), D('vertrag-uebersetzung', 'Vertrag übersetzen')]],
      ['Preise und Lieferzeit', 'Fachübersetzungen beginnen ab 0,12 € pro Wort. Den Festpreis und die Lieferzeit nennen wir nach Sichtung der Unterlagen – kostenlos und verbindlich.',
        [{ href: '/de/fachuebersetzungen/', label: 'Alle Fachgebiete' }]],
      digitalSection(C, 'Dateien senden Sie per E-Mail oder Webformular, gern mit Glossar und Referenzmaterial; die Übersetzung erhalten Sie im Originalformat.'),
    ],
    faqs: [
      ['Was kostet eine Fachübersetzung in Frankfurt?', 'Ab 0,12 € pro Wort. Der Festpreis richtet sich nach Fachgebiet, Umfang, Sprachen und Liefertermin.'],
      ['Übersetzen Sie Jahresabschlüsse nach IFRS?', 'Ja, Jahresabschlüsse, Lageberichte und Konzernabschlüsse – mit einheitlicher Finanzterminologie.'],
      ['Können Sie große Projekte kurzfristig übernehmen?', 'Ja, nach Absprache auch mit mehreren Fachübersetzern und gemeinsamem Glossar, damit der Text einheitlich bleibt.'],
      ['Welche Dateiformate verarbeiten Sie?', 'Word, Excel, PowerPoint, PDF und viele Webformate – Sie erhalten die Übersetzung im Format Ihrer Vorlage.'],
    ],
    serviceType: 'Fachübersetzung',
  },
  {
    slug: 'englisch',
    eyebrow: 'Englisch Übersetzer Frankfurt',
    title: 'Englisch-Deutsch in Frankfurt: beglaubigt, fachlich, in beide Richtungen.',
    metaTitle: 'Englisch Übersetzer Frankfurt – beglaubigt | Noon',
    description: 'Englisch Übersetzer in Frankfurt am Main: beglaubigte Übersetzungen Englisch–Deutsch, Finanz- und Vertragstexte sowie Dolmetscher für Banken, Messe und Notar.',
    intro: 'In Frankfurt ist Englisch Arbeitssprache – in Banken, Kanzleien, auf der Messe und am Flughafen. Gleichzeitig brauchen viele internationale Fachkräfte ihre englischsprachigen Urkunden für die Ausländerbehörde auf Deutsch. Wir übersetzen in beide Richtungen: beglaubigt für Behörden und fachlich für Unternehmen.',
    highlights: ['Beglaubigt und fachlich', 'In beide Richtungen', 'Dolmetscher für Notar und Messe'],
    sections: [
      ['Für internationale Fachkräfte', 'Wer mit Blauer Karte oder Arbeitsvisum nach Frankfurt kommt, braucht häufig Heirats- und Geburtsurkunden für den Familiennachzug, Universitätsabschlüsse für die Anerkennung und Führerscheine für die Umschreibung. Englischsprachige Dokumente aus Indien, Pakistan, Nigeria, Ghana, den USA, Kanada, Großbritannien oder Australien übersetzen wir beglaubigt ins Deutsche.',
        [D('heiratsurkunde-uebersetzung', 'Heiratsurkunde übersetzen'), D('diplom-uebersetzung', 'Diplom übersetzen'), { href: '/de/ratgeber/familiennachzug-dokumente/', label: 'Familiennachzug: Dokumente' }]],
      ['Für Frankfurter Unternehmen', 'Banken, Kanzleien und Konzerne lassen bei uns Verträge, Richtlinien, Präsentationen, Geschäftsberichte und interne Kommunikation übersetzen – mit einheitlicher Terminologie in britischem oder amerikanischem Englisch, ganz nach Ihrer Vorgabe.',
        [L('fachuebersetzungen', 'Fachübersetzungen Frankfurt')]],
      ['Deutsche Dokumente auf Englisch', 'Für Bewerbungen, Studium oder Visa im Ausland übersetzen wir Arbeitszeugnisse, Abschlusszeugnisse, Führungszeugnisse und Meldebescheinigungen beglaubigt ins Englische. Ob das Zielland zusätzlich eine Apostille verlangt, klären Sie mit der Stelle dort.',
        [D('arbeitszeugnis-uebersetzung', 'Arbeitszeugnis übersetzen'), D('fuehrungszeugnis-uebersetzung', 'Führungszeugnis übersetzen'), { href: '/de/sprachen/englisch/', label: 'Englisch bundesweit' }]],
      ['Englisch-Dolmetscher', 'Für Notartermine internationaler Käufer, Gesellschaftsgründungen, Betriebsversammlungen und Messegespräche stellen wir Englisch-Dolmetscher – konsekutiv, flüsternd oder simultan.',
        [L('dolmetscher-notar', 'Dolmetscher Notar Frankfurt')]],
      translationPriceSection('Frankfurt'),
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Brauche ich für englische Urkunden eine beglaubigte Übersetzung?', 'Für die Ausländerbehörde und das Standesamt meist ja. Manche Arbeitgeber und Hochschulen akzeptieren englische Dokumente direkt – fragen Sie vorher nach.'],
      ['Übersetzen Sie indische Urkunden?', 'Ja, englischsprachige Urkunden aus Indien übersetzen wir regelmäßig; Dokumente in Hindi oder anderen Sprachen auf Anfrage.'],
      ['Britisches oder amerikanisches Englisch?', 'Wie Sie möchten – bei Unternehmenstexten richten wir uns nach Ihrem Styleguide.'],
    ],
    serviceType: 'Englisch Übersetzung',
  },
  {
    slug: 'tuerkisch',
    eyebrow: 'Türkisch Übersetzer Frankfurt',
    title: 'Türkisch-Deutsch in Frankfurt: Urkunden, Vollmachten und Dolmetscher.',
    metaTitle: 'Türkisch Übersetzer Frankfurt – beglaubigt | Noon',
    description: 'Türkisch Übersetzer in Frankfurt: beglaubigte Übersetzungen Türkisch–Deutsch für Standesamt und Ausländerbehörde, Vollmachten für die Türkei, Dolmetscher.',
    intro: 'Die türkischsprachige Gemeinschaft gehört zu den größten in Frankfurt und im Rhein-Main-Gebiet. Wir übersetzen türkische Urkunden für Frankfurter Behörden ins Deutsche und deutsche Dokumente für Behörden, Notare und Gerichte in der Türkei ins Türkische – beglaubigt und mit Namen in der Schreibweise Ihres Passes.',
    highlights: ['In beide Richtungen', 'Vollmachten für die Türkei', 'Dolmetscher für Notar und Gericht'],
    sections: [
      ['Häufige Dokumente', '• Personenstandsauszüge (Nüfus kayıt örneği) und Familienregisterauszüge\n• Heiratsurkunden und Scheidungsurteile mit Rechtskraftvermerk\n• Führerscheine für die Umschreibung\n• Diplome, Zeugnisse und Transkripte\n• Vollmachten, Erbscheine und Grundbuchunterlagen (Tapu)\n• Ausdrucke aus e-Devlet mit Barcode',
        [D('scheidungsurteil-uebersetzung', 'Scheidungsurteil übersetzen'), D('fuehrerschein-uebersetzung', 'Führerschein übersetzen')]],
      ['Dokumente für die Türkei', 'Für einen Hausverkauf, eine Erbschaft oder eine Namensänderung in der Türkei brauchen Sie oft deutsche Urkunden oder Vollmachten auf Türkisch. Die Türkei ist Mitglied des Haager Apostilleübereinkommens, deutsche öffentliche Urkunden brauchen dort deshalb in der Regel eine Apostille statt einer Legalisation. Vollmachten können Sie alternativ beim türkischen Generalkonsulat in Frankfurt errichten – welcher Weg passt, sagt Ihnen der Notar oder Anwalt in der Türkei.',
        [D('vollmacht-uebersetzung', 'Vollmacht übersetzen'), APOSTILLE_LINK]],
      ['Türkisch-Dolmetscher in Frankfurt', 'Für Termine beim Notar, beim Standesamt, vor Gericht, bei der Ausländerbehörde und in Arztpraxen stellen wir Türkisch-Dolmetscher, auf Wunsch allgemein beeidigt. Kurze Gespräche dolmetschen wir per Video oder Telefon.',
        [L('dolmetscher', 'Dolmetscher Frankfurt'), { href: '/de/sprachen/tuerkisch/', label: 'Türkisch bundesweit' }]],
      translationPriceSection('Frankfurt'),
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Übersetzen Sie Nüfus-Auszüge für das Standesamt Frankfurt?', 'Ja, vollständig und beglaubigt. Welche Auszüge Sie brauchen, nennt Ihnen das Standesamt.'],
      ['Werden türkische Buchstaben richtig übernommen?', 'Ja, Ç, Ğ, İ, Ö, Ş und Ü schreiben wir genau wie im Reisepass.'],
      ['Was kostet eine Türkisch-Übersetzung in Frankfurt?', 'Standarddokumente beginnen ab 39 €. Den Festpreis nennen wir vorab.'],
    ],
    serviceType: 'Türkisch Übersetzung',
  },
  {
    slug: 'arabisch',
    eyebrow: 'Arabisch Übersetzer Frankfurt',
    title: 'Arabisch-Deutsch in Frankfurt: Übersetzer für Marokko, Syrien und mehr.',
    metaTitle: 'Arabisch Übersetzer Frankfurt – beglaubigt | Noon',
    description: 'Arabisch Übersetzer in Frankfurt: beglaubigte Übersetzungen aus Marokko, Syrien, Irak und Ägypten für Standesamt und Ausländerbehörde, Dolmetscher mit Dialekt.',
    intro: 'Frankfurt hat eine große marokkanische Gemeinschaft, dazu viele Familien aus Syrien, dem Irak, Ägypten, Tunesien und Algerien. Wir übersetzen arabische und arabisch-französische Urkunden beglaubigt ins Deutsche und stellen Dolmetscher, die neben Hocharabisch auch Ihren Dialekt sprechen – vom marokkanischen Darija bis zum irakischen Arabisch.',
    highlights: ['Auch Darija', 'Arabisch-französische Urkunden', 'Namen wie im Pass'],
    sections: [
      ['Marokkanische Urkunden', 'Marokkanische Personenstandsurkunden sind häufig zweisprachig auf Arabisch und Französisch ausgestellt – etwa die vollständige Abschrift der Geburtsurkunde, Heiratsurkunden (Acte de mariage) oder Scheidungsurkunden. Wir übersetzen das gesamte Dokument mit allen Vermerken. Daten nach dem islamischen Kalender übertragen wir genau wie im Original.',
        [D('geburtsurkunde-uebersetzung', 'Geburtsurkunde übersetzen'), D('heiratsurkunde-uebersetzung', 'Heiratsurkunde übersetzen')]],
      ['Urkunden aus Syrien, Irak und Ägypten', 'Familienbuchauszüge, Geburts- und Heiratsurkunden, Scheidungsurkunden, Schul- und Universitätszeugnisse sowie Führerscheine übersetzen wir vollständig – inklusive der oft zahlreichen Beglaubigungsstempel von Ministerien und Botschaften.',
        [{ href: '/de/ratgeber/arabische-geburtsurkunde-uebersetzen/', label: 'Arabische Geburtsurkunde übersetzen' }, { href: '/de/sprachen/arabisch/', label: 'Arabisch bundesweit' }]],
      ['Arabisch-Dolmetscher in Frankfurt', 'Ob Ausländerbehörde, Standesamt, Elterngespräch, Arzttermin oder Gericht: Unsere Arabisch-Dolmetscher sprechen neben Hocharabisch marokkanischen, algerischen, tunesischen, syrischen, irakischen und ägyptischen Dialekt. Nennen Sie uns bei der Buchung das Herkunftsland.',
        [L('dolmetscher', 'Dolmetscher Frankfurt'), L('gerichtsdolmetscher', 'Gerichtsdolmetscher Frankfurt')]],
      translationPriceSection('Frankfurt'),
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Übersetzen Sie marokkanische Urkunden auf Arabisch und Französisch?', 'Ja, zweisprachige Urkunden übersetzen wir vollständig in einem Dokument.'],
      ['Haben Sie Dolmetscher für Darija?', 'Ja, für marokkanisches Arabisch ebenso wie für andere Dialekte.'],
      ['Wie werden arabische Namen geschrieben?', 'Wie im Reisepass. Fehlt ein Pass, verwenden wir für alle Dokumente dieselbe Umschrift.'],
      ['Was kostet eine Arabisch-Übersetzung in Frankfurt?', 'Standarddokumente beginnen ab 39 €. Den Festpreis nennen wir vorab.'],
    ],
    serviceType: 'Arabisch Übersetzung',
  },
];

// Second pass (audit minimum of 400 words): page-specific sections and FAQs.
const MORE = {
  dolmetscher: {
    faqs: [['Dolmetschen Sie auch am Flughafen Frankfurt?', 'Ja, zum Beispiel für die Begleitung von Geschäftsgästen oder Delegationen nach Absprache. Nennen Sie uns Ort, Zeit und Anlass, dann prüfen wir die Verfügbarkeit.']],
  },
  gerichtsdolmetscher: {
    sections: [['Vorbereitung auf den Termin', 'Je besser der Dolmetscher vorbereitet ist, desto ruhiger verläuft der Termin. Senden Sie uns – soweit zulässig – Aktenzeichen, Art des Verfahrens, Anklageschrift oder Schriftsätze vorab. So kennt der Dolmetscher Namen, Orte und Fachbegriffe schon vor dem ersten Wort. Bei längeren Verhandlungen planen wir Pausen oder einen zweiten Dolmetscher ein.']],
  },
  'dolmetscher-notar': {
    sections: [['Internationale Käufer und Gesellschafter', 'In Frankfurt kaufen viele internationale Käuferinnen und Käufer Wohnungen oder gründen Gesellschaften, ohne fließend Deutsch zu sprechen. Häufig braucht das Notariat dafür zusätzlich ausländische Registerauszüge, Gesellschafterlisten oder Ausweisdokumente in beglaubigter Übersetzung. Wir koordinieren beides: die Übersetzung vorab und den Dolmetscher im Termin – für Englisch, Türkisch, Arabisch, Russisch und viele weitere Sprachen.',
      [L('englisch', 'Englisch-Deutsch Frankfurt')]]],
  },
  fachuebersetzungen: {
    sections: [['Für wen wir in Frankfurt arbeiten', 'Unsere Kunden in Frankfurt sind Banken und Fondsgesellschaften, Kanzleien und Wirtschaftsprüfer, Pharma- und Chemieunternehmen, Logistiker rund um den Flughafen, Messeaussteller und junge Fintech-Unternehmen. Manche schicken uns einzelne Verträge, andere ganze Berichtspakete mit festen Terminen zum Quartalsende. In beiden Fällen haben Sie einen festen Ansprechpartner, der Ihre Terminologie und Ihre Fristen kennt.']],
    faqs: [
      ['Übersetzen Sie auch ins Englische für internationale Investoren?', 'Ja, Präsentationen, Berichte und Pressemitteilungen übersetzen wir aus dem Deutschen ins Englische – mit der am Finanzmarkt üblichen Terminologie.'],
      ['Übersetzen Sie Fondsdokumente und Produktinformationen?', 'Ja, mit besonderer Sorgfalt bei Zahlen, Kosten- und Risikoangaben. Die rechtliche Freigabe bleibt bei Ihrem Haus.'],
      ['Arbeiten Sie mit Translation-Memory?', 'Ja. So werden wiederkehrende Passagen in allen Dokumenten einheitlich übersetzt, und neue Texte bauen auf bereits freigegebenen Formulierungen auf.'],
    ],
  },
  englisch: {
    sections: [['Namen und Datumsformate', 'In englischsprachigen Urkunden stehen Daten je nach Land als Monat/Tag/Jahr oder Tag/Monat/Jahr – eine häufige Fehlerquelle. Wir übertragen Daten eindeutig ins deutsche Format und übernehmen Namen exakt aus dem Reisepass, auch wenn Vor- und Nachnamen in der Urkunde in anderer Reihenfolge stehen.']],
    faqs: [['Übersetzen Sie Degree Certificates und Transcripts für die Goethe-Universität?', 'Ja, Abschlussurkunden und Notenübersichten für Bewerbung, Einschreibung oder Anerkennung – beglaubigt.']],
  },
  tuerkisch: {
    sections: [['Türkischen Führerschein umschreiben', 'Mit einem türkischen Führerschein dürfen Sie nach der Anmeldung eines Wohnsitzes in Frankfurt in der Regel sechs Monate fahren; danach brauchen Sie einen deutschen Führerschein. Für den Antrag verlangt die Fahrerlaubnisbehörde meist eine Übersetzung, welche Prüfungen anfallen, entscheidet sie im Einzelfall. Wir übersetzen Vorder- und Rückseite vollständig – auf Wunsch im Express.',
      [{ href: '/de/ratgeber/fuehrerschein-umschreiben/', label: 'Führerschein umschreiben' }]]],
    faqs: [['Übersetzen Sie auch Dokumente auf Kurdisch?', 'Auf Anfrage ja – senden Sie uns das Dokument, und wir nennen Ihnen Preis und Liefertermin.']],
  },
  arabisch: {
    sections: [['Familiennachzug und Einbürgerung', 'Für den Familiennachzug verlangt die Ausländerbehörde Frankfurt in der Regel Heirats- und Geburtsurkunden, bei der Einbürgerung zusätzlich Nachweise zu Identität und Familienstand – ausländische Dokumente jeweils mit beglaubigter Übersetzung. Senden Sie uns alle Unterlagen zusammen, dann übersetzen wir sie mit einheitlicher Namensschreibweise und nennen einen gemeinsamen Festpreis.',
      [{ href: '/de/ratgeber/familiennachzug-dokumente/', label: 'Familiennachzug: Dokumente' }, { href: '/de/ratgeber/einbuergerung-dokumente/', label: 'Einbürgerung: Dokumente' }]]],
    faqs: [
      ['Übersetzen Sie auch ins Arabische?', 'Ja, deutsche Urkunden, Zeugnisse und Vollmachten übersetzen wir beglaubigt ins Arabische – etwa für Behörden in Marokko oder Syrien.'],
      ['Übersetzen Sie Urkunden aus Tunesien und Algerien?', 'Ja, auch diese sind oft arabisch-französisch – wir übersetzen sie vollständig.'],
    ],
  },
};

export const FRANKFURT_PAGES = withMore(BASE_PAGES, MORE);
