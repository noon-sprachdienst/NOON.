// Kiel landing pages (plan v4, wave 2). Keywords: Search Console export of 28.10.2026
// ("ermächtigter übersetzer kiel", Polish searches, "dolmetscher farsi kiel",
// "medizinischer dolmetscher kiel").
import {
  APOSTILLE_LINK, CITY, DOCUMENT_LINKS, FAQ_DIGITAL, INTERPRETING_STEPS, NOTARY_GUIDE_LINK, ORDER_STEPS, PRICE_LINK,
  interpretingPriceSection, officeSection, translationPriceSection,
} from './shared.js';

const C = CITY.kiel;
const L = (slug, label) => ({ href: `/de/standorte/kiel/${slug}/`, label });

export const KIEL_LINKS = [
  L('ermaechtigter-uebersetzer', 'Ermächtigter Übersetzer Kiel'),
  L('polnisch', 'Polnisch Übersetzer Kiel'),
  L('persisch', 'Persisch Übersetzer Kiel (Farsi, Dari)'),
  L('medizinischer-dolmetscher', 'Medizinischer Dolmetscher Kiel'),
];

const KIEL_CONTACT = 'Über unsere Kieler Nummer +49 15567 478943 erreichen Sie uns telefonisch und per WhatsApp – rund um die Uhr.';

export const KIEL_PAGES = [
  {
    slug: 'ermaechtigter-uebersetzer',
    eyebrow: 'Ermächtigter Übersetzer Kiel',
    title: 'Ermächtigte Übersetzer in Kiel – beglaubigte Übersetzungen.',
    metaTitle: 'Ermächtigter Übersetzer Kiel – beglaubigt | Noon',
    description: 'Ermächtigter Übersetzer in Kiel: beglaubigte Übersetzungen für Ausländerbehörde, Standesamt, Gericht und Hochschule – staatlich anerkannt, ab 39 € pro Dokument.',
    intro: 'In Schleswig-Holstein dürfen nur gerichtlich ermächtigte Übersetzer beglaubigte Übersetzungen anfertigen – umgangssprachlich oft „staatlich anerkannte Übersetzer“ genannt. Unsere ermächtigten Übersetzer übersetzen Ihre Urkunden für Kieler Behörden, Gerichte und die Universität vollständig und bestätigen die Richtigkeit mit Unterschrift und Stempel.',
    highlights: ['Gerichtlich ermächtigt', 'Ab 39 € pro Dokument', 'Kieler Nummer & WhatsApp'],
    sections: [
      ['Was „ermächtigt“ bedeutet', 'Ein ermächtigter Übersetzer ist von der Justiz für seine Sprache zugelassen. Er bestätigt auf der Übersetzung, dass sie vollständig und richtig ist. In anderen Bundesländern heißen solche Übersetzer vereidigt, beeidigt oder öffentlich bestellt – gemeint ist dieselbe Qualifikation, und die Übersetzung wird bundesweit anerkannt. Einen Notar brauchen Sie für Kieler Behörden in der Regel nicht.',
        [NOTARY_GUIDE_LINK]],
      ['Für diese Stellen in Kiel übersetzen wir', '• Ausländerbehörde der Landeshauptstadt Kiel: Urkunden für Aufenthaltstitel, Familiennachzug und Einbürgerung\n• Standesamt Kiel: Geburts- und Heiratsurkunden, Ledigkeitsbescheinigungen, Scheidungsurteile\n• Amtsgericht und Landgericht Kiel: Urteile, Beschlüsse, Vollmachten\n• Christian-Albrechts-Universität und Fachhochschule Kiel: Zeugnisse und Diplome\n• Führerscheinstelle: ausländische Führerscheine für die Umschreibung\n• Jobcenter und Arbeitgeber: Abschlüsse und Arbeitsnachweise',
        DOCUMENT_LINKS],
      ['Sprachen, die in Kiel besonders gefragt sind', 'Polnisch, Persisch (Farsi und Dari), Arabisch, Türkisch, Ukrainisch, Russisch und Englisch. Für Dokumente aus Afghanistan und dem Iran übersetzen wir auch Tazkira-Auszüge und iranische Personenstandsurkunden; Namen übertragen wir so, wie sie in Ihrem Pass stehen.',
        [L('polnisch', 'Polnisch Übersetzer Kiel'), L('persisch', 'Persisch Übersetzer Kiel')]],
      ['Typische Fälle aus Kiel', '• Familiennachzug: Geburts- und Heiratsurkunden aus dem Herkunftsland\n• Heirat im Standesamt Kiel mit Partner aus Polen, der Ukraine oder Afghanistan\n• Studium an der CAU: Abiturzeugnis und Bachelor-Urkunde für die Bewerbung\n• Werft, Hafen und Logistik: Berufsabschlüsse für die Anerkennung\n\nViele Kundinnen und Kunden aus Neumünster, Rendsburg, Eckernförde und Plön bestellen ebenfalls digital bei uns.',
        [PRICE_LINK, APOSTILLE_LINK]],
      translationPriceSection('Kiel'),
      ORDER_STEPS,
      officeSection(C),
    ],
    faqs: [
      ['Ist ein ermächtigter Übersetzer dasselbe wie ein staatlich anerkannter Übersetzer?', 'Für beglaubigte Übersetzungen ja: Gemeint ist ein vom Gericht ermächtigter Übersetzer. „Staatlich anerkannt“ kann sich auch auf eine Prüfung beziehen – für die Beglaubigung zählt die Ermächtigung.'],
      ['Werden Ihre Übersetzungen von der Ausländerbehörde Kiel anerkannt?', 'Ja. Übersetzungen ermächtigter Übersetzer werden von Behörden in Kiel und bundesweit anerkannt.'],
      ['Wie erreiche ich Ihr Kieler Büro?', KIEL_CONTACT],
      ['Was kostet eine beglaubigte Übersetzung in Kiel?', 'Standarddokumente beginnen ab 39 € pro Dokument; den Festpreis erhalten Sie vorab.'],
      FAQ_DIGITAL,
    ],
    serviceType: 'Beglaubigte Übersetzung',
  },
  {
    slug: 'polnisch',
    eyebrow: 'Polnisch Übersetzer Kiel',
    title: 'Polnisch-Deutsch: Übersetzer und Dolmetscher in Kiel.',
    metaTitle: 'Polnisch Übersetzer Kiel – beglaubigt | Noon',
    description: 'Polnisch Übersetzer in Kiel: beglaubigte Übersetzungen Polnisch–Deutsch durch ermächtigte Übersetzer und Polnisch-Dolmetscher für Behörde, Arzt und Gericht.',
    intro: 'Viele Polinnen und Polen leben und arbeiten in Kiel und Schleswig-Holstein – auf Werften, im Hafen, in Pflege und Handwerk. Wir übersetzen polnische Urkunden und Zeugnisse beglaubigt ins Deutsche, deutsche Dokumente ins Polnische und stellen Polnisch-Dolmetscher für Termine in Kiel.',
    highlights: ['Ermächtigte Übersetzer', 'Beide Richtungen', 'Kieler Nummer & WhatsApp'],
    sections: [
      ['Polnische Dokumente, die wir oft übersetzen', '• Geburts- und Heiratsurkunden (akt urodzenia, akt małżeństwa)\n• Scheidungsurteile polnischer Gerichte\n• Zeugnisse, Diplome und Berufsabschlüsse, z. B. für Pflege und Handwerk\n• Arbeitsverträge, Arbeitsbescheinigungen und Unterlagen für Kindergeld\n• Führerscheine, Fahrzeugpapiere und Rentenbescheide (ZUS)\n\nFür viele Urkunden aus Polen gibt es mehrsprachige EU-Formulare – ob Ihre Stelle trotzdem eine Übersetzung verlangt, entscheidet sie selbst.',
        [{ href: '/de/geburtsurkunde-uebersetzung/', label: 'Geburtsurkunde übersetzen' }, { href: '/de/zeugnis-uebersetzung/', label: 'Zeugnis übersetzen' }]],
      ['Deutsch–Polnisch für Behörden in Polen', 'Für ZUS, Gerichte, Standesämter oder Arbeitgeber in Polen übersetzen wir deutsche Urkunden, Arbeitszeugnisse, Rentenbescheide und Urteile beglaubigt ins Polnische. Innerhalb der EU entfällt für viele öffentliche Urkunden die Apostille.',
        [APOSTILLE_LINK]],
      ['Polnisch-Dolmetscher in Kiel', 'Für Ausländerbehörde, Jobcenter, Familienkasse, Arzt, Notar, Standesamt und Gericht stellen wir Polnisch-Dolmetscher – vor Ort, per Video oder Telefon, für Gericht und Notar auf Wunsch beeidigt.',
        [L('medizinischer-dolmetscher', 'Medizinischer Dolmetscher Kiel')]],
      ['Biuro tłumaczeń w Kilonii', 'Szukają Państwo tłumacza przysięgłego w Kilonii? Tłumaczymy dokumenty z języka polskiego na niemiecki i z niemieckiego na polski – akty stanu cywilnego, świadectwa, dyplomy, umowy i wyroki – z uwierzytelnieniem uznawanym przez niemieckie urzędy. Organizujemy też tłumaczy ustnych do urzędu, lekarza, notariusza i sądu. Prosimy przesłać zdjęcie dokumentu przez WhatsApp lub e-mail – otrzymają Państwo bezpłatnie stałą cenę.'],
      translationPriceSection('Kiel'),
      officeSection(C),
    ],
    faqs: [
      ['Brauche ich für polnische Urkunden eine Apostille?', 'Für viele öffentliche Urkunden aus Polen nicht – innerhalb der EU gelten Erleichterungen. Ihre Stelle sagt Ihnen, welche Form sie verlangt.'],
      ['Übersetzen Sie Unterlagen für das Kindergeld?', 'Ja, zum Beispiel polnische Bescheinigungen und Geburtsurkunden für die Familienkasse.'],
      ['Ile kosztuje tłumaczenie przysięgłe?', 'Standardowe dokumenty od 39 € za dokument; dokładną cenę podajemy z góry i bezpłatnie.'],
      ['Wie erreiche ich Sie in Kiel?', KIEL_CONTACT],
    ],
    serviceType: 'Polnisch Übersetzung',
  },
  {
    slug: 'persisch',
    eyebrow: 'Persisch Übersetzer Kiel',
    title: 'Persisch (Farsi und Dari): Übersetzer und Dolmetscher in Kiel.',
    metaTitle: 'Persisch Übersetzer Kiel – Farsi & Dari | Noon',
    description: 'Persisch Übersetzer in Kiel: beglaubigte Übersetzungen Farsi und Dari ins Deutsche und Dolmetscher Farsi/Dari für Behörde, Asylverfahren, Arzt und Familien.',
    intro: 'In Kiel und Umgebung leben viele Familien aus Afghanistan und dem Iran. Für Ausländerbehörde, Asylverfahren, Standesamt, Schule und Arzt brauchen sie Dokumente auf Deutsch und Dolmetscher, die ihre Sprache wirklich verstehen. Wir übersetzen iranisches Farsi und afghanisches Dari beglaubigt und stellen Dolmetscher für beide Varianten.',
    highlights: ['Farsi und Dari', 'Asyl, Familie, Behörde', 'Kieler Nummer & WhatsApp'],
    sections: [
      ['Dokumente aus dem Iran und Afghanistan', '• Iranische Geburtsurkunden (Shenasnameh) und Heiratsurkunden\n• Afghanische Tazkira und Heiratsurkunden\n• Scheidungsurkunden und Gerichtsentscheidungen\n• Schul- und Universitätszeugnisse für Anerkennung und Bewerbung\n• Führerscheine für die Umschreibung\n\nDatumsangaben nach dem persischen Sonnenkalender rechnen wir in den gregorianischen Kalender um und vermerken beides, damit Behörden die Daten eindeutig zuordnen können.',
        [{ href: '/de/geburtsurkunde-uebersetzung/', label: 'Geburtsurkunde übersetzen' }, { href: '/de/sprachen/persisch/', label: 'Persisch bundesweit' }]],
      ['Dolmetscher Farsi und Dari in Kiel', 'Farsi und Dari sind eng verwandt, unterscheiden sich aber in Aussprache und Wortschatz. Nennen Sie uns deshalb bei der Anfrage, ob Sie Farsi oder Dari sprechen – wir wählen den passenden Dolmetscher. Typische Einsätze: Ausländerbehörde, Beratungsstellen und soziale Dienste, Jobcenter, Elterngespräche in Schule und Kita, Arzt und Krankenhaus, Gericht und Notar.',
        [L('medizinischer-dolmetscher', 'Medizinischer Dolmetscher Kiel')]],
      ['Asylverfahren und Familiennachzug', 'Im Asylverfahren und beim Familiennachzug werden oft Personenstandsurkunden, Tazkiras und Nachweise über Familienbeziehungen gebraucht. Wir übersetzen sie beglaubigt und schreiben Namen in allen Dokumenten einer Familie einheitlich. Für Gespräche mit Beratungsstellen und Behörden stellen wir Dolmetscher.'],
      ['مترجم رسمی فارسی و دری در کیل', 'به مترجم رسمی در کیل نیاز دارید؟ ما شناسنامه، تذکره، سند ازدواج، مدارک تحصیلی و گواهینامه رانندگی را از فارسی و دری به آلمانی ترجمه رسمی می‌کنیم و برای ادارات، پزشک، مدرسه و دادگاه مترجم شفاهی فراهم می‌کنیم. عکس مدرک را از طریق واتس‌اپ یا ایمیل بفرستید و قیمت ثابت را رایگان دریافت کنید.'],
      translationPriceSection('Kiel'),
      officeSection(C),
    ],
    faqs: [
      ['Haben Sie Dolmetscher für Dari und für Farsi?', 'Ja, für beide Varianten. Sagen Sie uns bei der Anfrage, welche Sie sprechen.'],
      ['Übersetzen Sie eine afghanische Tazkira?', 'Ja, beglaubigt – auch handschriftliche Einträge und Stempel.'],
      ['Rechnen Sie das Datum aus dem persischen Kalender um?', 'Ja, wir geben das Datum nach dem persischen und nach dem gregorianischen Kalender an.'],
      ['Wie erreiche ich Sie in Kiel?', KIEL_CONTACT],
    ],
    serviceType: 'Persisch Übersetzung',
  },
  {
    slug: 'medizinischer-dolmetscher',
    eyebrow: 'Medizinischer Dolmetscher Kiel',
    title: 'Medizinische Dolmetscher in Kiel – für Arzt, Klinik und Therapie.',
    metaTitle: 'Medizinischer Dolmetscher Kiel – Arzt & Klinik | Noon',
    description: 'Medizinischer Dolmetscher in Kiel für Arztgespräche, Aufklärung vor Operationen, Klinik und Therapie – vor Ort, per Video oder Telefon, vertraulich.',
    intro: 'Bei Diagnose, Aufklärung vor einer Operation oder Therapieplanung muss jedes Wort verstanden werden. Wir stellen in Kiel medizinische Dolmetscher für Praxen, Kliniken, Reha und Therapie – vor Ort, per Video oder Telefon – und übersetzen Arztbriefe und Befunde.',
    highlights: ['Arzt & Klinik', 'Video & Telefon', 'Schweigepflicht'],
    sections: [
      ['Wann ein medizinischer Dolmetscher hilft', '• Aufklärungsgespräch vor einer Operation oder Untersuchung\n• Diagnosegespräch und Besprechung von Befunden\n• Geburtsvorbereitung und Termine in der Frauenheilkunde\n• Kinderarzt und Entwicklungsuntersuchungen\n• Psychotherapie und Beratung\n• Entlassgespräch und Medikamentenplan\n\nFamilienangehörige als Übersetzer sind gerade bei schwierigen Diagnosen oft überfordert – ein neutraler Dolmetscher entlastet alle Beteiligten.'],
      ['Für Praxen und Kliniken in Kiel', 'Für Kliniken, Arztpraxen, Pflegedienste und Therapieeinrichtungen in Kiel und Umgebung organisieren wir Dolmetscher auch kurzfristig. Kurze Gespräche lassen sich per Telefon oder Video dolmetschen; für Aufklärungsgespräche und lange Termine kommt der Dolmetscher persönlich. Wiederkehrende Termine planen wir gern fest ein.',
        [{ href: '/de/dolmetschen/dolmetscher-arzt/', label: 'Dolmetscher für Arztbesuche bundesweit' }]],
      ['Sprachen', 'Häufig gefragt sind Arabisch, Persisch (Farsi und Dari), Polnisch, Türkisch, Ukrainisch, Russisch und Kurdisch. Bei Arabisch und Persisch berücksichtigen wir das Herkunftsland, damit der Dialekt passt.',
        [L('persisch', 'Persisch Übersetzer Kiel'), L('polnisch', 'Polnisch Übersetzer Kiel')]],
      ['Arztbriefe und Befunde übersetzen', 'Für Behandlungen in Kiel übersetzen wir ausländische Arztbriefe, Befunde und Impfnachweise ins Deutsche; für Behandlungen oder Versicherungen im Ausland deutsche Unterlagen in die gewünschte Sprache.',
        [{ href: '/de/fachuebersetzungen/medizinische-dentalmedizin/', label: 'Medizinische Übersetzungen' }]],
      interpretingPriceSection('Kiel'),
      INTERPRETING_STEPS,
      officeSection(C),
    ],
    faqs: [
      ['Wer bezahlt den Dolmetscher beim Arzt?', 'Das hängt vom Einzelfall ab – manche Kliniken oder Kostenträger übernehmen die Kosten, oft zahlen Patientinnen und Patienten selbst. Fragen Sie vorab bei Praxis, Klinik oder Kostenträger nach.'],
      ['Sind die Dolmetscher zur Verschwiegenheit verpflichtet?', 'Ja, alle Dolmetscher arbeiten vertraulich und behandeln Gesundheitsdaten mit besonderer Sorgfalt.'],
      ['Geht das auch per Video?', 'Ja, für viele Gespräche. Für Aufklärungsgespräche empfehlen wir einen Dolmetscher vor Ort.'],
      ['Wie erreiche ich Sie in Kiel?', KIEL_CONTACT],
    ],
    serviceType: 'Medizinisches Dolmetschen',
  },
];
