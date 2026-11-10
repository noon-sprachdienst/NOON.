// Dortmund landing pages (SEO plan Nov 2026, phase 3). No office in Dortmund: pages describe
// digital handling and name the Bielefeld and Osnabrück offices for personal appointments.
import {
  APOSTILLE_LINK, CITY, DOCUMENT_LINKS, FAQ_DIGITAL, INTERPRETING_STEPS, NOTARY_GUIDE_LINK, ORDER_STEPS,
  digitalSection, interpretingPriceSection, translationPriceSection, withMore,
} from './shared.js';

const C = CITY.dortmund;
const L = (slug, label) => ({ href: `/de/standorte/dortmund/${slug}/`, label });
const D = (slug, label) => ({ href: `/de/${slug}/`, label });

export const DORTMUND_LINKS = [
  L('beglaubigte-uebersetzung', 'Beglaubigte Übersetzung Dortmund'),
  L('dolmetscher', 'Dolmetscher Dortmund'),
  L('gerichtsdolmetscher', 'Gerichtsdolmetscher Dortmund'),
  L('dolmetscher-notar', 'Dolmetscher beim Notar in Dortmund'),
  L('fachuebersetzungen', 'Fachübersetzungen Dortmund'),
  L('tuerkisch', 'Türkisch-Deutsch Dortmund'),
  L('arabisch', 'Arabisch-Deutsch Dortmund'),
  L('rumaenisch', 'Rumänisch-Deutsch Dortmund'),
];
const LANG_PAGES = DORTMUND_LINKS.slice(5);

const DIGITAL_TRANSLATION = 'Ob Nordstadt, Hörde, Aplerbeck oder Huckarde: Senden Sie Ihr Dokument als Foto oder Scan, erhalten Sie den Festpreis und bekommen Sie die beglaubigte Übersetzung als PDF und per Post nach Hause.';
const DIGITAL_INTERPRETING = 'Unsere Dolmetscher kommen zu Ihrem Termin in Dortmund und im östlichen Ruhrgebiet – auch nach Lünen, Unna, Schwerte oder Castrop-Rauxel. Kurze Gespräche dolmetschen wir per Video oder Telefon.';

export const DORTMUND_HUB = {
  sections: [['Alle Leistungen in Dortmund', 'Für die in Dortmund am häufigsten gefragten Leistungen und Sprachen haben wir eigene Seiten mit Details, Preisen und typischen Terminen:', DORTMUND_LINKS]],
};

const BASE_PAGES = [
  {
    slug: 'beglaubigte-uebersetzung',
    eyebrow: 'Beglaubigte Übersetzung Dortmund',
    title: 'Beglaubigte Übersetzungen in Dortmund – schnell, digital, zum Festpreis.',
    metaTitle: 'Beglaubigte Übersetzung Dortmund – ab 39 € | Noon',
    description: 'Beglaubigte Übersetzung in Dortmund für Ausländerbehörde, Standesamt, Gericht und TU Dortmund – ermächtigte Übersetzer, ab 39 € pro Dokument.',
    intro: 'Für die Ausländerbehörde, das Standesamt, ein Dortmunder Gericht, die TU Dortmund oder eine Anerkennungsstelle brauchen Sie ausländische Dokumente als beglaubigte Übersetzung. Unsere in Deutschland ermächtigten Übersetzer übersetzen Ihre Unterlagen vollständig, mit allen Stempeln und Vermerken – ohne dass Sie dafür irgendwohin fahren müssen.',
    highlights: ['Ermächtigte Übersetzer', 'Ab 39 € pro Dokument', 'Express am selben Tag'],
    sections: [
      ['Welche Dortmunder Stellen Übersetzungen verlangen', '• Ausländerbehörde Dortmund: Aufenthaltstitel, Familiennachzug, Einbürgerung\n• Standesamt Dortmund: Eheschließung, Geburtsbeurkundung, Namensführung\n• Amtsgericht und Landgericht Dortmund: Urteile, Beschlüsse, Erbscheine\n• TU Dortmund und Fachhochschule Dortmund: Zeugnisse und Diplome\n• Jobcenter und Familienkasse: Nachweise für Leistungen und Kindergeld\n• Fahrerlaubnisbehörde: ausländische Führerscheine\n\nDie verbindliche Liste nennt Ihnen die jeweilige Stelle. Schicken Sie sie uns – Sie bekommen einen Festpreis für alle Dokumente.',
        DOCUMENT_LINKS],
      ['Gültig in Dortmund und bundesweit', 'Beglaubigte Übersetzungen von Übersetzern, die ein deutsches Landgericht ermächtigt hat, werden von Behörden in ganz Deutschland angenommen. In Nordrhein-Westfalen erfolgt die Ermächtigung durch die Präsidentinnen und Präsidenten der Landgerichte. Eine zusätzliche Beglaubigung durch einen Notar brauchen deutsche Behörden in der Regel nicht.',
        [NOTARY_GUIDE_LINK, APOSTILLE_LINK]],
      ['Familien aus vielen Ländern', 'In Dortmund leben Familien aus der Türkei, Polen, Rumänien, Bulgarien, Syrien, dem Irak und vielen anderen Ländern. Entsprechend breit ist, was wir übersetzen: Personenstandsurkunden, Schul- und Berufsabschlüsse, Führerscheine, Gerichtsurteile und Bescheinigungen für Kindergeld oder Rente. Namen übernehmen wir in der Schreibweise des Reisepasses, damit alle Unterlagen zusammenpassen.',
        LANG_PAGES],
      ['Für Studium und Beruf', 'Viele Anfragen kommen von Studierenden der TU und der Fachhochschule sowie von Pflege-, Logistik- und IT-Fachkräften. Für die Bewerbung oder Anerkennung übersetzen wir Abiturzeugnisse, Bachelor- und Masterurkunden, Notenübersichten und Berufsabschlüsse mit Fächer- und Stundenübersicht.',
        [{ href: '/de/ratgeber/anerkennung-auslaendischer-abschluesse/', label: 'Anerkennung ausländischer Abschlüsse' }, D('zeugnis-uebersetzung', 'Zeugnis übersetzen')]],
      translationPriceSection('Dortmund'),
      ORDER_STEPS,
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Was kostet eine beglaubigte Übersetzung in Dortmund?', 'Standarddokumente beginnen ab 39 € pro Dokument. Den Festpreis nennen wir vorab und kostenlos.'],
      ['Erkennt die Ausländerbehörde Dortmund Ihre Übersetzungen an?', 'Ja. Beglaubigte Übersetzungen ermächtigter Übersetzer werden von Dortmunder Behörden und bundesweit anerkannt.'],
      ['Wie lange dauert es?', 'In der Regel 2–3 Werktage, im Express am selben Tag – meist innerhalb von 4–5 Stunden.'],
      ['Haben Sie ein Büro in Dortmund?', 'Nein. Aufträge laufen digital; persönliche Termine bieten wir nach Vereinbarung in Bielefeld und Osnabrück an.'],
      FAQ_DIGITAL,
    ],
    serviceType: 'Beglaubigte Übersetzung',
  },
  {
    slug: 'dolmetscher',
    eyebrow: 'Dolmetscher Dortmund',
    title: 'Dolmetscher in Dortmund – für Amt, Klinik, Schule und Betrieb.',
    metaTitle: 'Dolmetscher Dortmund – vor Ort & per Video | Noon',
    description: 'Dolmetscher in Dortmund für Ausländerbehörde, Jobcenter, Standesamt, Klinik, Notar und Gericht – vor Ort, per Video oder Telefon, ab 85 € pro Stunde.',
    intro: 'Ob Termin bei der Ausländerbehörde, Gespräch im Jobcenter, Aufklärung im Klinikum oder Betriebsversammlung im Logistikzentrum: Für Dortmund und das östliche Ruhrgebiet stellen wir Dolmetscherinnen und Dolmetscher, die persönlich kommen oder per Video und Telefon zugeschaltet werden.',
    highlights: ['Vor Ort in Dortmund', 'Video & Telefon', 'Ab 85 € pro Stunde'],
    sections: [
      ['Typische Termine', '• Ämter: Ausländerbehörde, Jobcenter, Jugendamt, Sozialamt\n• Standesamt: Anmeldung der Eheschließung und Trauung\n• Notar und Gericht: Beurkundungen, Verhandlungen, Anwaltsgespräche\n• Gesundheit: Klinikum, Krankenhäuser, Praxen, Reha\n• Schule und Kita: Elterngespräche, Förderplanung\n• Betriebe: Einarbeitung, Sicherheitsunterweisungen, Betriebsversammlungen',
        [L('gerichtsdolmetscher', 'Gerichtsdolmetscher Dortmund'), L('dolmetscher-notar', 'Dolmetscher Notar Dortmund'), { href: '/de/dolmetschen/dolmetscher-schule/', label: 'Dolmetscher für Schulgespräche' }]],
      ['Dolmetschen in Logistik und Industrie', 'In Dortmunder Lagern, Werken und Speditionen arbeiten Teams aus vielen Ländern. Für Einarbeitungen, Sicherheitsunterweisungen und Mitarbeitergespräche stellen wir Dolmetscher – zum Beispiel für Rumänisch, Bulgarisch, Polnisch, Türkisch oder Arabisch. Schriftliche Unterweisungen und Betriebsanweisungen übersetzen wir auf Wunsch gleich mit.',
        [L('fachuebersetzungen', 'Fachübersetzungen Dortmund')]],
      ['Sprachen in Dortmund', 'Besonders gefragt sind Türkisch, Arabisch mit verschiedenen Dialekten, Rumänisch, Bulgarisch, Polnisch, Kurdisch, Russisch, Ukrainisch, Persisch, Serbisch, Kroatisch und Englisch. Nennen Sie uns bei der Anfrage das Herkunftsland Ihrer Gesprächspartner.',
        LANG_PAGES],
      interpretingPriceSection('Dortmund'),
      INTERPRETING_STEPS,
      digitalSection(C, DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Was kostet ein Dolmetscher in Dortmund?', 'Ab 85 € pro Stunde. Den Festpreis nennen wir vorab, sobald wir Ort, Dauer und Sprache kennen.'],
      ['Kommen Sie auch nach Lünen oder Unna?', 'Ja, wir stellen Dolmetscher im gesamten östlichen Ruhrgebiet.'],
      ['Wie schnell bekomme ich einen Dolmetscher?', 'Je nach Sprache oft innerhalb weniger Tage, per Video oder Telefon meist schneller.'],
      ['Brauche ich einen beeidigten Dolmetscher?', 'Für Gericht, Notar und oft auch für das Standesamt ja. Für Arzt, Schule oder Betrieb reicht in der Regel ein erfahrener Dolmetscher ohne Beeidigung.'],
      ['Dolmetschen Sie auch Bulgarisch und Rumänisch?', 'Ja, beide Sprachen sind in Dortmund häufig gefragt – vor Ort, per Video oder Telefon.'],
    ],
    serviceType: 'Dolmetschen',
  },
  {
    slug: 'gerichtsdolmetscher',
    eyebrow: 'Gerichtsdolmetscher Dortmund',
    title: 'Gerichtsdolmetscher und beeidigte Dolmetscher in Dortmund.',
    metaTitle: 'Gerichtsdolmetscher Dortmund – beeidigt | Noon',
    description: 'Gerichtsdolmetscher in Dortmund: allgemein beeidigte Dolmetscher für Amtsgericht, Landgericht, Kanzlei und Polizei – Urteile auch beglaubigt übersetzt.',
    intro: 'Amtsgericht, Landgericht, Arbeitsgericht und Sozialgericht Dortmund verhandeln täglich mit Beteiligten, die nicht ausreichend Deutsch sprechen. Für Mandantengespräche, Vernehmungen und private Termine rund um ein Verfahren stellen wir allgemein beeidigte Dolmetscher und übersetzen die Verfahrensunterlagen beglaubigt.',
    highlights: ['Allgemein beeidigt', 'Straf-, Familien-, Arbeits- und Sozialrecht', 'Vertraulich'],
    sections: [
      ['Gericht oder Kanzlei – wer bucht?', 'Im Strafverfahren zieht das Gericht selbst einen Dolmetscher hinzu, wenn eine beschuldigte Person kein Deutsch versteht. Uns beauftragen vor allem Anwaltskanzleien, Betroffene und Angehörige: für Mandantengespräche, die Vorbereitung auf die Verhandlung, Gutachtertermine und Gespräche nach Absprache mit der Verteidigung.',
        [{ href: '/de/gerichtsdolmetscher/', label: 'Gerichtsdolmetscher bundesweit' }]],
      ['Sozialgericht und Arbeitsgericht', 'In Dortmund geht es vor Gericht oft um Arbeit und Leistungen: Kündigungsschutz, ausstehender Lohn, Bescheide des Jobcenters oder der Rentenversicherung. Wir dolmetschen in diesen Verfahren und übersetzen die nötigen Unterlagen – Arbeitsverträge, Lohnabrechnungen, Bescheide und ärztliche Atteste.',
        [{ href: '/de/fachuebersetzungen/recht/', label: 'Juristische Übersetzungen' }]],
      ['Familiengericht', 'Bei Scheidung, Sorgerecht und Umgang braucht das Familiengericht oft ausländische Heirats- und Geburtsurkunden oder frühere Urteile in beglaubigter Übersetzung. Beides – Dolmetschen und Übersetzen – bekommen Sie bei uns aus einer Hand.',
        [D('scheidungsurteil-uebersetzung', 'Scheidungsurteil übersetzen')]],
      interpretingPriceSection('Dortmund'),
      INTERPRETING_STEPS,
      digitalSection(C, DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Was heißt „allgemein beeidigt“?', 'Der Dolmetscher hat vor Gericht einen allgemeinen Eid geleistet und muss nicht für jeden Termin neu vereidigt werden. In NRW erfolgt das über die Landgerichte.'],
      ['Welche Sprachen bieten Sie für Dortmunder Gerichte?', 'Unter anderem Türkisch, Arabisch, Rumänisch, Bulgarisch, Polnisch, Kurdisch, Russisch, Persisch und Serbisch.'],
      ['Übersetzen Sie Urteile beglaubigt?', 'Ja, Urteile, Beschlüsse, Ladungen und Anklageschriften – auch im Express.'],
      ['Sind die Gespräche vertraulich?', 'Ja. Alle Dolmetscher sind zur Verschwiegenheit verpflichtet, beeidigte zusätzlich durch ihren Eid.'],
    ],
    serviceType: 'Gerichtsdolmetscher',
  },
  {
    slug: 'dolmetscher-notar',
    eyebrow: 'Dolmetscher Notar Dortmund',
    title: 'Dolmetscher für Notartermine in Dortmund.',
    metaTitle: 'Dolmetscher Notar Dortmund – beeidigt | Noon',
    description: 'Dolmetscher beim Notar in Dortmund: beeidigte Dolmetscher für Hauskauf, Vollmacht, Testament und Firmengründung – Urkunde auf Wunsch auch schriftlich.',
    intro: 'Sie kaufen in Dortmund ein Haus, erteilen eine Vollmacht oder gründen eine Firma und sprechen nicht sicher Deutsch? Dann muss die Urkunde beim Notar für Sie übersetzt werden. Wir stellen allgemein beeidigte Dolmetscher für die Beurkundung und übersetzen die Urkunde danach auf Wunsch schriftlich.',
    highlights: ['Allgemein beeidigt', 'Für alle Beurkundungen', 'Urkunde auch schriftlich'],
    sections: [
      ['Notare in Westfalen', 'In Westfalen – und damit in Dortmund – sind Notarinnen und Notare in der Regel zugleich als Rechtsanwälte tätig. Für Beteiligte, die nicht ausreichend Deutsch sprechen, gilt § 16 Beurkundungsgesetz: Die Niederschrift muss übersetzt werden. Ein nicht allgemein beeidigter Dolmetscher muss vom Notar vereidigt werden, sofern nicht alle Beteiligten verzichten – mit unseren allgemein beeidigten Dolmetschern entfällt dieser Schritt.',
        [NOTARY_GUIDE_LINK, { href: '/de/dolmetschen/notardolmetscher/', label: 'Notardolmetscher bundesweit' }]],
      ['Häufige Beurkundungen', '• Kauf eines Hauses oder einer Eigentumswohnung\n• Grundschuld für die Finanzierung\n• General- und Vorsorgevollmacht\n• Testament und Erbvertrag\n• Gründung einer GmbH oder UG, etwa für ein Logistik- oder Handwerksunternehmen\n• Erbausschlagung und Erbscheinsantrag'],
      ['Gut vorbereitet', 'Schicken Sie uns den Urkundsentwurf einige Tage vorher, damit sich der Dolmetscher auf Begriffe wie Auflassung, Grundschuld oder Vorkaufsrecht vorbereiten kann. Ausländische Dokumente, die das Notariat vorab braucht, übersetzen wir beglaubigt.',
        [D('vollmacht-uebersetzung', 'Vollmacht übersetzen'), D('testament-uebersetzung', 'Testament übersetzen'), APOSTILLE_LINK]],
      interpretingPriceSection('Dortmund'),
      digitalSection(C, DIGITAL_INTERPRETING),
    ],
    faqs: [
      ['Muss der Dolmetscher beeidigt sein?', 'Nicht zwingend – ist er nicht allgemein beeidigt, muss ihn der Notar vereidigen, wenn die Beteiligten nicht verzichten. Wir stellen deshalb allgemein beeidigte Dolmetscher.'],
      ['Wie lange dauert der Termin?', 'Meist ein bis zwei Stunden. Den Festpreis nennen wir vorab.'],
      ['Darf ein Familienmitglied dolmetschen?', 'Das entscheidet der Notar. Bei Kaufverträgen bevorzugen Notare meist einen unabhängigen Dolmetscher.'],
      ['Übersetzen Sie die Urkunde für das Ausland?', 'Ja, beglaubigt und auf Wunsch zusammen mit der Apostille.'],
      ['Kann derselbe Dolmetscher zu Kaufvertrag und Grundschuld kommen?', 'Ja, auf Wunsch planen wir beide Termine mit derselben Person.'],
    ],
    serviceType: 'Notardolmetscher',
  },
  {
    slug: 'fachuebersetzungen',
    eyebrow: 'Fachübersetzungen Dortmund',
    title: 'Fachübersetzungen für Logistik, IT, Versicherung und Technik in Dortmund.',
    metaTitle: 'Fachübersetzungen Dortmund – ab 0,12 €/Wort | Noon',
    description: 'Fachübersetzungen in Dortmund: Logistik, IT, Versicherung, Recht, Medizin und Technik – Fachübersetzer mit Terminologie und zweiter Prüfung, ab 0,12 € pro Wort.',
    intro: 'Dortmund hat sich vom Kohle- und Stahlstandort zu einem Zentrum für Logistik, IT, Versicherungen und Forschung entwickelt. Für Unternehmen, Hochschulinstitute, Kanzleien und Kliniken übersetzen unsere Fachübersetzer Texte, bei denen Fachbegriffe und Zahlen stimmen müssen.',
    highlights: ['Fachübersetzer je Gebiet', 'Zweite Prüfung', 'Ab 0,12 € pro Wort'],
    sections: [
      ['Fachgebiete', '• Logistik: Verträge mit Speditionen, Lagerhandbücher, Ausschreibungen, Zolldokumente\n• IT und Software: Oberflächen, Dokumentation, Websites\n• Versicherung und Finanzen: Bedingungen, Policen, Geschäftsberichte\n• Technik: Bedienungsanleitungen, Wartungshandbücher, Sicherheitsdatenblätter\n• Recht und Medizin: Verträge, AGB, Arztbriefe, Befunde',
        [{ href: '/de/fachuebersetzungen/it-software/', label: 'IT-Übersetzungen' }, { href: '/de/fachuebersetzungen/ingenieurwesen/', label: 'Technische Übersetzungen' }, { href: '/de/fachuebersetzungen/wirtschaft-finanzen/', label: 'Wirtschaft & Finanzen' }, { href: '/de/fachuebersetzungen/recht/', label: 'Juristische Übersetzungen' }]],
      ['Mehrsprachige Belegschaften', 'In Lagern und Werken arbeiten Menschen aus vielen Ländern. Arbeitsanweisungen, Sicherheitsunterweisungen, Aushänge und Schulungsunterlagen übersetzen wir in Rumänisch, Bulgarisch, Polnisch, Türkisch, Arabisch, Ukrainisch und weitere Sprachen – klar und verständlich formuliert, damit sie im Alltag wirklich ankommen.'],
      ['Forschung und Hochschule', 'Für Institute und Forschungsgruppen übersetzen wir Projektanträge, Berichte, Abstracts und Präsentationen – auf Wunsch ins Englische mit einheitlicher Terminologie.'],
      ['Qualität und Preise', 'Ein Fachübersetzer übersetzt, eine zweite Person prüft, wiederkehrende Begriffe halten wir in Glossaren fest. Fachübersetzungen beginnen ab 0,12 € pro Wort; den Festpreis nennen wir nach Sichtung der Unterlagen.',
        [{ href: '/de/fachuebersetzungen/', label: 'Alle Fachgebiete' }, D('vertrag-uebersetzung', 'Vertrag übersetzen')]],
      digitalSection(C, 'Dateien senden Sie per E-Mail oder Webformular; die Übersetzung erhalten Sie im Format Ihrer Vorlage.'),
    ],
    faqs: [
      ['Was kostet eine Fachübersetzung in Dortmund?', 'Ab 0,12 € pro Wort. Der Festpreis richtet sich nach Fachgebiet, Umfang, Sprachen und Termin.'],
      ['Übersetzen Sie Sicherheitsunterweisungen in mehrere Sprachen?', 'Ja, auch in mehrere Sprachen gleichzeitig mit einheitlicher Terminologie.'],
      ['Übersetzen Sie Software-Oberflächen?', 'Ja, aus gängigen Exportformaten – mit Rücksicht auf Platz und Variablen.'],
      ['Unterschreiben Sie eine Vertraulichkeitsvereinbarung?', 'Ja, gern vor Beginn des Auftrags.'],
      ['Liefern Sie im Originalformat?', 'Ja, Word, Excel, PowerPoint und viele weitere Formate.'],
    ],
    serviceType: 'Fachübersetzung',
  },
  {
    slug: 'tuerkisch',
    eyebrow: 'Türkisch Übersetzer Dortmund',
    title: 'Türkisch-Deutsch in Dortmund: Übersetzer und Dolmetscher.',
    metaTitle: 'Türkisch Übersetzer Dortmund – beglaubigt | Noon',
    description: 'Türkisch Übersetzer in Dortmund: beglaubigte Übersetzungen Türkisch–Deutsch für Standesamt, Ausländerbehörde, Gericht und Rente, Dolmetscher – ab 39 €.',
    intro: 'Seit den Anwerbejahren gehört die türkischsprachige Gemeinschaft fest zu Dortmund – von der Nordstadt bis Eving und Scharnhorst. Heute geht es oft um Rente, Erbschaft, Einbürgerung und Hochzeit. Wir übersetzen die Dokumente dafür beglaubigt in beide Richtungen und stellen Türkisch-Dolmetscher.',
    highlights: ['In beide Richtungen', 'Rente, Erbe, Einbürgerung', 'Dolmetscher für Notar und Amt'],
    sections: [
      ['Rente zwischen Deutschland und der Türkei', 'Wer in beiden Ländern gearbeitet hat, braucht für die Rente oft türkische Nachweise auf Deutsch – etwa Versicherungsverläufe der SGK, Arbeitsbescheinigungen oder Personenstandsauszüge – und deutsche Bescheide auf Türkisch. Wir übersetzen beides beglaubigt und mit einheitlicher Namensschreibweise.'],
      ['Erbschaft und Immobilien', 'Für Erbfälle mit Vermögen in der Türkei werden deutsche Erbscheine, Sterbeurkunden und Vollmachten auf Türkisch gebraucht, umgekehrt türkische Erbbescheinigungen (veraset ilamı) und Grundbuchauszüge auf Deutsch. Für deutsche öffentliche Urkunden verlangt die Türkei in der Regel eine Apostille.',
        [D('testament-uebersetzung', 'Testament und Erbschein übersetzen'), APOSTILLE_LINK]],
      ['Einbürgerung und Standesamt', 'Für die Einbürgerung in Dortmund werden Nüfus-Registerauszüge, Heirats- und Geburtsurkunden sowie gegebenenfalls Scheidungsurteile verlangt. Wir übersetzen sie vollständig und übernehmen Namen mit Ç, Ğ, İ, Ö, Ş und Ü exakt aus dem Pass.',
        [{ href: '/de/ratgeber/einbuergerung-dokumente/', label: 'Einbürgerung: Dokumente' }, { href: '/de/sprachen/tuerkisch/', label: 'Türkisch bundesweit' }]],
      ['Türkisch-Dolmetscher', 'Für Notar, Standesamt, Gericht, Rentenberatung und Arzttermine stellen wir Türkisch-Dolmetscher in Dortmund – auf Wunsch allgemein beeidigt.',
        [L('dolmetscher', 'Dolmetscher Dortmund')]],
      translationPriceSection('Dortmund'),
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Übersetzen Sie Unterlagen der türkischen Sozialversicherung SGK?', 'Ja, Versicherungsverläufe und Bescheide – beglaubigt.'],
      ['Übersetzen Sie einen veraset ilamı?', 'Ja, türkische Erbbescheinigungen übersetzen wir vollständig und beglaubigt.'],
      ['Was kostet eine Türkisch-Übersetzung in Dortmund?', 'Standarddokumente beginnen ab 39 €. Den Festpreis nennen wir vorab.'],
    ],
    serviceType: 'Türkisch Übersetzung',
  },
  {
    slug: 'arabisch',
    eyebrow: 'Arabisch Übersetzer Dortmund',
    title: 'Arabisch-Deutsch in Dortmund: beglaubigte Übersetzungen und Dolmetscher.',
    metaTitle: 'Arabisch Übersetzer Dortmund – beglaubigt | Noon',
    description: 'Arabisch Übersetzer in Dortmund: beglaubigte Übersetzungen aus Syrien und dem Irak für Ausländerbehörde, Standesamt und Anerkennung – Dolmetscher mit Dialekt.',
    intro: 'Viele Familien aus Syrien und dem Irak haben in Dortmund ein neues Zuhause gefunden. Nach Jahren in Deutschland stehen jetzt oft Einbürgerung, Ausbildung, Anerkennung des Berufs oder die Hochzeit an. Wir übersetzen die arabischen Dokumente dafür beglaubigt und stellen Dolmetscher, die Ihren Dialekt sprechen.',
    highlights: ['Syrien und Irak', 'Für Einbürgerung und Anerkennung', 'Dolmetscher mit Dialekt'],
    sections: [
      ['Syrische und irakische Dokumente', 'Wir übersetzen syrische Familienbuchauszüge und Personenstandsurkunden, irakische Staatsangehörigkeitsnachweise und Personalausweise, Heirats- und Scheidungsurkunden, Schulzeugnisse, Universitätsabschlüsse und Führerscheine – vollständig mit allen Stempeln. Für Urkunden ohne Pass verwenden wir eine einheitliche Umschrift der Namen.',
        [{ href: '/de/ratgeber/arabische-geburtsurkunde-uebersetzen/', label: 'Arabische Geburtsurkunde übersetzen' }]],
      ['Anerkennung von Berufen', 'Ob Pflege, Medizin, Ingenieurwesen oder ein Handwerk: Für die Anerkennung brauchen Sie Abschluss, Fächerübersicht und Nachweise über Berufserfahrung in beglaubigter Übersetzung. Wir übersetzen alles in einem Auftrag, damit die Anerkennungsstelle die Unterlagen eindeutig zuordnen kann.',
        [{ href: '/de/ratgeber/anerkennung-auslaendischer-abschluesse/', label: 'Anerkennung ausländischer Abschlüsse' }, D('diplom-uebersetzung', 'Diplom übersetzen')]],
      ['Arabisch-Dolmetscher in Dortmund', 'Für Ausländerbehörde, Jobcenter, Schule, Klinik, Standesamt und Gericht stellen wir Dolmetscher mit syrischem, irakischem, libanesischem und weiteren Dialekten – auf Wunsch beeidigt.',
        [L('dolmetscher', 'Dolmetscher Dortmund'), { href: '/de/sprachen/arabisch/', label: 'Arabisch bundesweit' }]],
      translationPriceSection('Dortmund'),
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Übersetzen Sie irakische Staatsangehörigkeitsnachweise?', 'Ja, vollständig und beglaubigt – auch ältere Ausführungen.'],
      ['Was mache ich, wenn meine Urkunde schwer lesbar ist?', 'Senden Sie uns ein möglichst gutes Foto. Nicht lesbare Stellen kennzeichnen wir in der Übersetzung, statt zu raten.'],
      ['Was kostet eine Arabisch-Übersetzung in Dortmund?', 'Standarddokumente beginnen ab 39 €. Den Festpreis nennen wir vorab.'],
      ['Übersetzen Sie auch ins Arabische?', 'Ja, deutsche Urkunden und Zeugnisse übersetzen wir beglaubigt ins Arabische.'],
    ],
    serviceType: 'Arabisch Übersetzung',
  },
  {
    slug: 'rumaenisch',
    eyebrow: 'Rumänisch Übersetzer Dortmund',
    title: 'Rumänisch-Deutsch in Dortmund: Übersetzer und Dolmetscher.',
    metaTitle: 'Rumänisch Übersetzer Dortmund – beglaubigt | Noon',
    description: 'Rumänisch Übersetzer in Dortmund: beglaubigte Übersetzungen für Familienkasse, Jobcenter, Arbeitgeber, Dolmetscher für Ämter und Betriebe – ab 39 €.',
    intro: 'Rumänisch ist in Dortmund eine der am häufigsten gefragten Sprachen – in Familien, in Logistik und Pflege, auf dem Bau und in der Gastronomie. Wir übersetzen rumänische Urkunden und Bescheinigungen beglaubigt ins Deutsche, deutsche Dokumente ins Rumänische und stellen Dolmetscher für Ämter, Schulen und Betriebe.',
    highlights: ['Für Familienkasse und Jobcenter', 'Dolmetscher für Betriebe', 'In beide Richtungen'],
    sections: [
      ['Kindergeld und Leistungen', 'Für das Kindergeld fragt die Familienkasse häufig nach Geburtsurkunden der Kinder, Schulbescheinigungen und Nachweisen aus Rumänien. Auch Jobcenter verlangen Unterlagen zu Familie, Einkommen und Wohnsitz. Wir übersetzen sie beglaubigt und mit einheitlicher Schreibweise aller Namen – auch mit ă, â, î, ș und ț.'],
      ['Arbeit und Anerkennung', 'Für Arbeitgeber und Anerkennungsstellen übersetzen wir Berufsabschlüsse, Fächerübersichten (foaie matricolă), Arbeitsbescheinigungen und Führerscheine. Für EU-Abschlüsse gibt es in manchen Berufen vereinfachte Verfahren – welche Unterlagen genau nötig sind, sagt Ihnen die zuständige Stelle.',
        [{ href: '/de/ratgeber/anerkennung-auslaendischer-abschluesse/', label: 'Anerkennung ausländischer Abschlüsse' }, D('fuehrerschein-uebersetzung', 'Führerschein übersetzen')]],
      ['Rumänisch-Dolmetscher', 'Für Elterngespräche, Jobcenter, Arzttermine, Standesamt, Gericht und betriebliche Unterweisungen stellen wir Rumänisch-Dolmetscher in Dortmund – vor Ort, per Video oder Telefon.',
        [L('dolmetscher', 'Dolmetscher Dortmund'), { href: '/de/sprachen/rumaenisch/', label: 'Rumänisch bundesweit' }]],
      ['Mehrsprachige EU-Formulare', 'Für einige rumänische Personenstandsurkunden gibt es mehrsprachige Formulare nach EU-Recht, die eine Übersetzung ersparen können. Ob die Dortmunder Stelle sie annimmt, entscheidet sie selbst – fragen Sie im Zweifel nach.'],
      translationPriceSection('Dortmund'),
      digitalSection(C, DIGITAL_TRANSLATION),
    ],
    faqs: [
      ['Übersetzen Sie Unterlagen für die Familienkasse?', 'Ja, Urkunden und Bescheinigungen – beglaubigt und einheitlich für alle Familienmitglieder.'],
      ['Übersetzen Sie deutsche Dokumente ins Rumänische?', 'Ja, zum Beispiel Geburtsurkunden in Dortmund geborener Kinder oder Arbeitsbescheinigungen für Behörden in Rumänien.'],
      ['Was kostet eine Rumänisch-Übersetzung in Dortmund?', 'Standarddokumente beginnen ab 39 €. Den Festpreis nennen wir vorab.'],
    ],
    serviceType: 'Rumänisch Übersetzung',
  },
];

// Second pass (audit minimum of 400 words): page-specific sections and FAQs.
const MORE = {
  dolmetscher: {
    faqs: [['Dolmetschen Sie bei Elterngesprächen in Dortmunder Schulen?', 'Ja, vor Ort oder per Video. Viele Schulen laden die Eltern selbst ein – fragen Sie dort, ob die Schule den Dolmetscher organisiert oder Sie ihn mitbringen.']],
  },
  gerichtsdolmetscher: {
    sections: [['Gut vorbereitet in den Termin', 'Je mehr der Dolmetscher vorher weiß, desto sicherer wird der Termin. Teilen Sie uns – soweit zulässig – Art des Verfahrens, beteiligte Personen und wichtige Schriftstücke mit. Bei längeren Verhandlungen planen wir Pausen ein oder setzen zwei Dolmetscher im Wechsel ein, damit die Übertragung bis zum Schluss genau bleibt.']],
  },
  'dolmetscher-notar': {
    sections: [['Wenn kurz vorher ein Dokument fehlt', 'Häufig fehlt kurz vor dem Notartermin noch eine Unterlage: die Vollmacht eines Miteigentümers aus dem Ausland, eine ausländische Heiratsurkunde für den Güterstand oder der Registerauszug einer ausländischen Gesellschaft. Solche Dokumente übersetzen wir beglaubigt, im Express auch am selben Tag, damit der Termin stattfinden kann.']],
    faqs: [['Wer bezahlt den Dolmetscher beim Notar?', 'In der Regel die Person, die den Dolmetscher braucht, oder die Vertragsparteien nach Absprache. Den Festpreis nennen wir vorab.']],
  },
  fachuebersetzungen: {
    sections: [
      ['Logistik in der Praxis', 'In Dortmund sitzen große Distributions- und Logistikzentren. Typische Aufträge sind Rahmenverträge mit Spediteuren, Lieferbedingungen, Arbeits- und Sicherheitsanweisungen, Schulungsfolien für neue Mitarbeitende und Ausschreibungen für Transportleistungen. Wir arbeiten mit Ihrer Terminologie – von Kommissionierung bis Cross-Docking – und liefern auf Wunsch mehrere Sprachfassungen gleichzeitig.'],
      ['Versicherungen und Finanzen', 'Dortmund ist auch Versicherungsstandort. Versicherungsbedingungen, Produktinformationen, Schadenkorrespondenz und Geschäftsberichte übersetzen wir fachlich korrekt und verständlich – mit einheitlichen Begriffen über alle Dokumente.'],
    ],
    faqs: [
      ['Wie schnell ist eine Fachübersetzung fertig?', 'Das hängt vom Umfang ab. Den Liefertermin nennen wir verbindlich im Angebot; eilige Teile können wir vorziehen.'],
      ['Übersetzen Sie Ausschreibungsunterlagen?', 'Ja, Leistungsbeschreibungen, Vertragsbedingungen und Angebote – auch unter Termindruck mit mehreren Übersetzern und gemeinsamem Glossar.'],
      ['Prüfen Sie die Übersetzung vor der Lieferung?', 'Ja, eine zweite Person prüft jede Fachübersetzung auf Inhalt, Terminologie und Vollständigkeit.'],
      ['Können Sie Texte für die Website mehrsprachig liefern?', 'Ja, Seiten, Produkttexte und Metadaten – im Exportformat Ihres Systems.'],
    ],
  },
  tuerkisch: {
    sections: [['Türkischer Führerschein in Dortmund', 'Wer mit einem türkischen Führerschein nach Dortmund zieht, darf damit in der Regel sechs Monate ab Wohnsitzanmeldung fahren. Für den deutschen Führerschein verlangt das Straßenverkehrsamt meist eine Übersetzung der Fahrerlaubnis; ob Prüfungen nötig sind, entscheidet die Behörde. Wir übersetzen Vorder- und Rückseite, im Express auch am selben Tag.',
      [{ href: '/de/ratgeber/fuehrerschein-umschreiben/', label: 'Führerschein umschreiben' }]]],
    faqs: [
      ['Übersetzen Sie Dokumente für eine Hochzeit in der Türkei?', 'Ja, zum Beispiel Ehefähigkeitszeugnis, Geburtsurkunde und Meldebescheinigung – beglaubigt ins Türkische.'],
      ['Dolmetschen Sie Kurdisch?', 'Für Kurmanci auf Anfrage; für schriftliche Übersetzungen fragen Sie uns mit dem Dokument an.'],
    ],
  },
  arabisch: {
    sections: [
      ['Heiraten und Kinder in Dortmund', 'Für die Anmeldung der Eheschließung beim Standesamt Dortmund, die Beurkundung der Geburt eines Kindes oder eine Namenserklärung werden arabische Geburts- und Heiratsurkunden oft in beglaubigter Übersetzung verlangt. Wir übersetzen sie vollständig und stellen auf Wunsch einen Dolmetscher für Anmeldung und Trauung.'],
      ['Führerschein umschreiben', 'Syrische und irakische Führerscheine übersetzen wir für die Umschreibung beim Straßenverkehrsamt – Vorder- und Rückseite mit allen Klassen und Stempeln.',
        [D('fuehrerschein-uebersetzung', 'Führerschein übersetzen')]],
    ],
    faqs: [['Brauche ich das Original für die Übersetzung?', 'Nein, ein gut lesbares Foto oder ein Scan reicht. Das Original zeigen Sie bei der Behörde vor.']],
  },
  rumaenisch: {
    sections: [['Schule und Kita', 'Für die Anmeldung in Schule oder Kita und für Elterngespräche brauchen Familien oft Geburtsurkunden der Kinder, Impfnachweise oder Zeugnisse aus Rumänien. Wir übersetzen die Dokumente und stellen Dolmetscher für Gespräche mit Lehrkräften und Erzieherinnen.']],
    faqs: [['Übersetzen Sie rumänische Führerscheine?', 'Ja. EU-Führerscheine gelten in Deutschland in der Regel ohne Umschreibung; verlangt eine Stelle dennoch eine Übersetzung, liefern wir sie beglaubigt.']],
  },
};

export const DORTMUND_PAGES = withMore(BASE_PAGES, MORE);
