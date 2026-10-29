// Short quotes from public Google reviews of each office (read in Business Profile
// Manager on 29.10.2026). Only reviews written in German, quoted verbatim (shortened
// with "…"), with first name and initial only.
const quote = (text, name) => `„${text}“ – ${name}, Google-Bewertung`;

export const REVIEW_QUOTES = {
  berlin: [
    quote('Der Service von Noon Übersetzungsbüro ist absolut professionell, zuverlässig und kundenfreundlich.', 'Юлия Ю.'),
    quote('Die Arbeit wurde schnell, professionell und qualitativ hochwertig erledigt … Vielen Dank für den tollen Service und die schnelle Bereitstellung der beglaubigten Übersetzung!', 'Єлизавета Ф.'),
    quote('Ein sehr professionelles und seriöses Büro! Die Antwort kam extrem schnell und die Zusammenarbeit war von Anfang an super angenehm und unkompliziert.', 'Abdullah N.'),
  ],
  stuttgart: [
    quote('Ich habe hier mein englisches Arbeitszeugnis ins Deutsche übersetzen lassen. Der gesamte Prozess dauerte nur ein paar Tage und man bekommt eine offiziell beglaubigte Übersetzung.', 'Hiwot T.'),
  ],
  kiel: [
    quote('Vielen Dank für die hervorragende Arbeit. Super schnell und sehr freundlich!', 'Alvaro S.'),
  ],
  bielefeld: [
    quote('Ich kann diese Übersetzungsagentur wärmstens empfehlen. Die Mitarbeiter haben die Übersetzung sehr schnell angefertigt. Ich konnte alle Fristen einhalten.', 'Оксана Г.'),
    quote('Ich kann es nur empfehlen, sehr nett und schnelle Übersetzung.', 'Hashem A.'),
  ],
  mainz: [
    quote('… ich bin sehr zufrieden. Sie haben es wirklich sehr schnell bearbeitet. Danke!', 'Google-Nutzer'),
    quote('Sehr zufrieden, vielen Dank für alles.', 'Orhan P.'),
  ],
};

// Matching quotes on landing pages (section title, quotes), keyed by page path.
export const PAGE_REVIEWS = {
  '/de/standorte/berlin/beglaubigte-uebersetzung': REVIEW_QUOTES.berlin.slice(1, 2),
  '/de/standorte/stuttgart/englisch': [quote('Sehr empfehlenswertes Dolmetscher und Übersetzungsbüro in Stuttgart! Ich habe hier mein englisches Arbeitszeugnis ins Deutsche übersetzen lassen … Besonders positiv hervorzuheben ist die zügige und unkomplizierte Kommunikation über WhatsApp.', 'Hiwot T.')],
};
