// Languages of the quote form (source and target drop-downs).
// Each language has a fixed id and a name in the 7 site languages. The German name is the value
// that reaches the office e-mail, whatever language the visitor uses.
// The built-in list has 63 languages; in the admin, languages can be added, renamed, reordered
// and deleted. 'other' always stays last and opens a text box.
export const FORM_LANGUAGES = {
  arabic: { de: 'Arabisch', en: 'Arabic', ar: 'العربية', tr: 'Arapça', ru: 'Арабский', fr: 'Arabe', uk: 'Арабська' },
  turkish: { de: 'Türkisch', en: 'Turkish', ar: 'التركية', tr: 'Türkçe', ru: 'Турецкий', fr: 'Turc', uk: 'Турецька' },
  russian: { de: 'Russisch', en: 'Russian', ar: 'الروسية', tr: 'Rusça', ru: 'Русский', fr: 'Russe', uk: 'Російська' },
  ukrainian: { de: 'Ukrainisch', en: 'Ukrainian', ar: 'الأوكرانية', tr: 'Ukraynaca', ru: 'Украинский', fr: 'Ukrainien', uk: 'Українська' },
  english: { de: 'Englisch', en: 'English', ar: 'الإنجليزية', tr: 'İngilizce', ru: 'Английский', fr: 'Anglais', uk: 'Англійська' },
  persian: { de: 'Persisch', en: 'Persian', ar: 'الفارسية', tr: 'Farsça', ru: 'Персидский', fr: 'Persan', uk: 'Перська' },
  polish: { de: 'Polnisch', en: 'Polish', ar: 'البولندية', tr: 'Lehçe', ru: 'Польский', fr: 'Polonais', uk: 'Польська' },
  french: { de: 'Französisch', en: 'French', ar: 'الفرنسية', tr: 'Fransızca', ru: 'Французский', fr: 'Français', uk: 'Французька' },
  romanian: { de: 'Rumänisch', en: 'Romanian', ar: 'الرومانية', tr: 'Rumence', ru: 'Румынский', fr: 'Roumain', uk: 'Румунська' },
  spanish: { de: 'Spanisch', en: 'Spanish', ar: 'الإسبانية', tr: 'İspanyolca', ru: 'Испанский', fr: 'Espagnol', uk: 'Іспанська' },
  italian: { de: 'Italienisch', en: 'Italian', ar: 'الإيطالية', tr: 'İtalyanca', ru: 'Итальянский', fr: 'Italien', uk: 'Італійська' },
  greek: { de: 'Griechisch', en: 'Greek', ar: 'اليونانية', tr: 'Yunanca', ru: 'Греческий', fr: 'Grec', uk: 'Грецька' },
  bcs: { de: 'Serbisch / Kroatisch / Bosnisch', en: 'Serbian / Croatian / Bosnian', ar: 'الصربية / الكرواتية / البوسنية', tr: 'Sırpça / Hırvatça / Boşnakça', ru: 'Сербский / хорватский / боснийский', fr: 'Serbe / croate / bosnien', uk: 'Сербська / хорватська / боснійська' },
  albanian: { de: 'Albanisch', en: 'Albanian', ar: 'الألبانية', tr: 'Arnavutça', ru: 'Албанский', fr: 'Albanais', uk: 'Албанська' },
  german: { de: 'Deutsch', en: 'German', ar: 'الألمانية', tr: 'Almanca', ru: 'Немецкий', fr: 'Allemand', uk: 'Німецька' },
  afrikaans: { de: 'Afrikaans', en: 'Afrikaans', ar: 'الأفريكانية', tr: 'Afrikaanca', ru: 'Африкаанс', fr: 'Afrikaans', uk: 'Африкаанс' },
  amharic: { de: 'Amharisch', en: 'Amharic', ar: 'الأمهرية', tr: 'Amharca', ru: 'Амхарский', fr: 'Amharique', uk: 'Амхарська' },
  armenian: { de: 'Armenisch', en: 'Armenian', ar: 'الأرمنية', tr: 'Ermenice', ru: 'Армянский', fr: 'Arménien', uk: 'Вірменська' },
  azerbaijani: { de: 'Aserbaidschanisch', en: 'Azerbaijani', ar: 'الأذربيجانية', tr: 'Azerbaycan Türkçesi', ru: 'Азербайджанский', fr: 'Azerbaïdjanais', uk: 'Азербайджанська' },
  belarusian: { de: 'Belarussisch', en: 'Belarusian', ar: 'البيلاروسية', tr: 'Belarusça', ru: 'Белорусский', fr: 'Biélorusse', uk: 'Білоруська' },
  bengali: { de: 'Bengalisch', en: 'Bengali', ar: 'البنغالية', tr: 'Bengalce', ru: 'Бенгальский', fr: 'Bengali', uk: 'Бенгальська' },
  bulgarian: { de: 'Bulgarisch', en: 'Bulgarian', ar: 'البلغارية', tr: 'Bulgarca', ru: 'Болгарский', fr: 'Bulgare', uk: 'Болгарська' },
  chinese: { de: 'Chinesisch', en: 'Chinese', ar: 'الصينية', tr: 'Çince', ru: 'Китайский', fr: 'Chinois', uk: 'Китайська' },
  danish: { de: 'Dänisch', en: 'Danish', ar: 'الدنماركية', tr: 'Danca', ru: 'Датский', fr: 'Danois', uk: 'Данська' },
  dari: { de: 'Dari', en: 'Dari', ar: 'الدارية', tr: 'Darice', ru: 'Дари', fr: 'Dari', uk: 'Дарі' },
  estonian: { de: 'Estnisch', en: 'Estonian', ar: 'الإستونية', tr: 'Estonca', ru: 'Эстонский', fr: 'Estonien', uk: 'Естонська' },
  filipino: { de: 'Filipino (Tagalog)', en: 'Filipino (Tagalog)', ar: 'الفلبينية (التاغالوغية)', tr: 'Filipince (Tagalogca)', ru: 'Филиппинский (тагальский)', fr: 'Filipino (tagalog)', uk: 'Філіппінська (тагальська)' },
  finnish: { de: 'Finnisch', en: 'Finnish', ar: 'الفنلندية', tr: 'Fince', ru: 'Финский', fr: 'Finnois', uk: 'Фінська' },
  georgian: { de: 'Georgisch', en: 'Georgian', ar: 'الجورجية', tr: 'Gürcüce', ru: 'Грузинский', fr: 'Géorgien', uk: 'Грузинська' },
  hebrew: { de: 'Hebräisch', en: 'Hebrew', ar: 'العبرية', tr: 'İbranice', ru: 'Иврит', fr: 'Hébreu', uk: 'Іврит' },
  hindi: { de: 'Hindi', en: 'Hindi', ar: 'الهندية', tr: 'Hintçe', ru: 'Хинди', fr: 'Hindi', uk: 'Гінді' },
  indonesian: { de: 'Indonesisch', en: 'Indonesian', ar: 'الإندونيسية', tr: 'Endonezce', ru: 'Индонезийский', fr: 'Indonésien', uk: 'Індонезійська' },
  japanese: { de: 'Japanisch', en: 'Japanese', ar: 'اليابانية', tr: 'Japonca', ru: 'Японский', fr: 'Japonais', uk: 'Японська' },
  kazakh: { de: 'Kasachisch', en: 'Kazakh', ar: 'الكازاخية', tr: 'Kazakça', ru: 'Казахский', fr: 'Kazakh', uk: 'Казахська' },
  kyrgyz: { de: 'Kirgisisch', en: 'Kyrgyz', ar: 'القيرغيزية', tr: 'Kırgızca', ru: 'Киргизский', fr: 'Kirghiz', uk: 'Киргизька' },
  korean: { de: 'Koreanisch', en: 'Korean', ar: 'الكورية', tr: 'Korece', ru: 'Корейский', fr: 'Coréen', uk: 'Корейська' },
  kurmanji: { de: 'Kurdisch (Kurmandschi)', en: 'Kurdish (Kurmanji)', ar: 'الكردية (الكرمانجية)', tr: 'Kürtçe (Kurmanci)', ru: 'Курдский (курманджи)', fr: 'Kurde (kurmandji)', uk: 'Курдська (курманджі)' },
  sorani: { de: 'Kurdisch (Sorani)', en: 'Kurdish (Sorani)', ar: 'الكردية (السورانية)', tr: 'Kürtçe (Sorani)', ru: 'Курдский (сорани)', fr: 'Kurde (sorani)', uk: 'Курдська (сорані)' },
  latvian: { de: 'Lettisch', en: 'Latvian', ar: 'اللاتفية', tr: 'Letonca', ru: 'Латышский', fr: 'Letton', uk: 'Латиська' },
  lithuanian: { de: 'Litauisch', en: 'Lithuanian', ar: 'الليتوانية', tr: 'Litvanca', ru: 'Литовский', fr: 'Lituanien', uk: 'Литовська' },
  malay: { de: 'Malaiisch', en: 'Malay', ar: 'الملايوية', tr: 'Malayca', ru: 'Малайский', fr: 'Malais', uk: 'Малайська' },
  macedonian: { de: 'Mazedonisch', en: 'Macedonian', ar: 'المقدونية', tr: 'Makedonca', ru: 'Македонский', fr: 'Macédonien', uk: 'Македонська' },
  mongolian: { de: 'Mongolisch', en: 'Mongolian', ar: 'المنغولية', tr: 'Moğolca', ru: 'Монгольский', fr: 'Mongol', uk: 'Монгольська' },
  dutch: { de: 'Niederländisch', en: 'Dutch', ar: 'الهولندية', tr: 'Felemenkçe', ru: 'Нидерландский', fr: 'Néerlandais', uk: 'Нідерландська' },
  norwegian: { de: 'Norwegisch', en: 'Norwegian', ar: 'النرويجية', tr: 'Norveççe', ru: 'Норвежский', fr: 'Norvégien', uk: 'Норвезька' },
  pashto: { de: 'Paschtu', en: 'Pashto', ar: 'البشتو', tr: 'Peştuca', ru: 'Пушту', fr: 'Pachto', uk: 'Пушту' },
  portuguese: { de: 'Portugiesisch', en: 'Portuguese', ar: 'البرتغالية', tr: 'Portekizce', ru: 'Португальский', fr: 'Portugais', uk: 'Португальська' },
  punjabi: { de: 'Punjabi', en: 'Punjabi', ar: 'البنجابية', tr: 'Pencapça', ru: 'Панджаби', fr: 'Pendjabi', uk: 'Панджабі' },
  swedish: { de: 'Schwedisch', en: 'Swedish', ar: 'السويدية', tr: 'İsveççe', ru: 'Шведский', fr: 'Suédois', uk: 'Шведська' },
  slovak: { de: 'Slowakisch', en: 'Slovak', ar: 'السلوفاكية', tr: 'Slovakça', ru: 'Словацкий', fr: 'Slovaque', uk: 'Словацька' },
  slovenian: { de: 'Slowenisch', en: 'Slovenian', ar: 'السلوفينية', tr: 'Slovence', ru: 'Словенский', fr: 'Slovène', uk: 'Словенська' },
  somali: { de: 'Somali', en: 'Somali', ar: 'الصومالية', tr: 'Somalice', ru: 'Сомалийский', fr: 'Somali', uk: 'Сомалійська' },
  swahili: { de: 'Suaheli', en: 'Swahili', ar: 'السواحيلية', tr: 'Svahili', ru: 'Суахили', fr: 'Swahili', uk: 'Суахілі' },
  tajik: { de: 'Tadschikisch', en: 'Tajik', ar: 'الطاجيكية', tr: 'Tacikçe', ru: 'Таджикский', fr: 'Tadjik', uk: 'Таджицька' },
  tamil: { de: 'Tamil', en: 'Tamil', ar: 'التاميلية', tr: 'Tamilce', ru: 'Тамильский', fr: 'Tamoul', uk: 'Тамільська' },
  thai: { de: 'Thailändisch', en: 'Thai', ar: 'التايلاندية', tr: 'Tayca', ru: 'Тайский', fr: 'Thaï', uk: 'Тайська' },
  tigrinya: { de: 'Tigrinya', en: 'Tigrinya', ar: 'التغرينية', tr: 'Tigrinyaca', ru: 'Тигринья', fr: 'Tigrigna', uk: 'Тигринья' },
  czech: { de: 'Tschechisch', en: 'Czech', ar: 'التشيكية', tr: 'Çekçe', ru: 'Чешский', fr: 'Tchèque', uk: 'Чеська' },
  turkmen: { de: 'Turkmenisch', en: 'Turkmen', ar: 'التركمانية', tr: 'Türkmence', ru: 'Туркменский', fr: 'Turkmène', uk: 'Туркменська' },
  hungarian: { de: 'Ungarisch', en: 'Hungarian', ar: 'المجرية', tr: 'Macarca', ru: 'Венгерский', fr: 'Hongrois', uk: 'Угорська' },
  urdu: { de: 'Urdu', en: 'Urdu', ar: 'الأردية', tr: 'Urduca', ru: 'Урду', fr: 'Ourdou', uk: 'Урду' },
  uzbek: { de: 'Usbekisch', en: 'Uzbek', ar: 'الأوزبكية', tr: 'Özbekçe', ru: 'Узбекский', fr: 'Ouzbek', uk: 'Узбецька' },
  vietnamese: { de: 'Vietnamesisch', en: 'Vietnamese', ar: 'الفيتنامية', tr: 'Vietnamca', ru: 'Вьетнамский', fr: 'Vietnamien', uk: 'Вʼєтнамська' },
  other: { de: 'Andere Sprache …', en: 'Other language …', ar: 'لغة أخرى …', tr: 'Diğer dil …', ru: 'Другой язык …', fr: 'Autre langue …', uk: 'Інша мова …' },
};

// The languages most asked for come first (the site's language pages), then the others A–Z (German names).
const SITE_LANGUAGES = ['arabic', 'turkish', 'russian', 'ukrainian', 'english', 'persian', 'polish', 'french', 'romanian', 'spanish', 'italian', 'greek', 'bcs', 'albanian'];
const MORE_LANGUAGES = ['afrikaans', 'amharic', 'armenian', 'azerbaijani', 'belarusian', 'bengali', 'bulgarian', 'chinese', 'dari', 'danish', 'estonian', 'filipino', 'finnish', 'georgian', 'hebrew', 'hindi', 'indonesian', 'japanese', 'kazakh', 'kyrgyz', 'korean', 'kurmanji', 'sorani', 'latvian', 'lithuanian', 'malay', 'macedonian', 'mongolian', 'dutch', 'norwegian', 'pashto', 'portuguese', 'punjabi', 'swedish', 'slovak', 'slovenian', 'somali', 'swahili', 'tajik', 'tamil', 'thai', 'tigrinya', 'czech', 'turkmen', 'hungarian', 'urdu', 'uzbek', 'vietnamese'];

export const FORM_LANGUAGE_LISTS = {
  source: [...SITE_LANGUAGES, 'german', ...MORE_LANGUAGES, 'other'],
  target: ['german', ...SITE_LANGUAGES, ...MORE_LANGUAGES, 'other'],
};

// Label and placeholder of the text box shown when the visitor picks "Other language".
export const FORM_OTHER_LANGUAGE = {
  de: { label: 'Welche Sprache?', placeholder: 'z. B. Wolof' },
  en: { label: 'Which language?', placeholder: 'e.g. Wolof' },
  ar: { label: 'ما هي اللغة؟', placeholder: 'مثلًا: الولوفية' },
  tr: { label: 'Hangi dil?', placeholder: 'örn. Volofça' },
  ru: { label: 'Какой язык?', placeholder: 'например, волоф' },
  fr: { label: 'Quelle langue ?', placeholder: 'p. ex. wolof' },
  uk: { label: 'Яка мова?', placeholder: 'наприклад, волоф' },
};

// Confirmation card shown in place of the form after a request was sent ({phone} is replaced).
export const FORM_CONFIRMATION = {
  de: { title: 'Vielen Dank für Ihre Anfrage!', text: 'Wir haben Ihre Anfrage erfolgreich erhalten und melden uns innerhalb von 5 bis 30 Minuten per E-Mail bei Ihnen. Bei dringenden Fragen rufen Sie uns gerne an: {phone}.', call: 'Anrufen: {phone}', again: 'Weitere Anfrage senden' },
  en: { title: 'Thank you for your inquiry!', text: 'We have successfully received your request. We will get back to you via email within 5 to 30 minutes. If you have any urgent questions, please call us at {phone}.', call: 'Call {phone}', again: 'Send another request' },
  ar: { title: 'شكرًا لتواصلك معنا!', text: 'استلمنا طلبك بنجاح، وسنرد عليك عبر البريد الإلكتروني خلال 5 إلى 30 دقيقة. لأي استفسار عاجل، اتصل بنا على {phone}.', call: 'اتصل بنا: {phone}', again: 'إرسال طلب آخر' },
  tr: { title: 'Talebiniz için teşekkür ederiz!', text: 'Talebinizi başarıyla aldık. 5 ila 30 dakika içinde size e-posta ile dönüş yapacağız. Acil sorularınız için bizi arayabilirsiniz: {phone}.', call: 'Ara: {phone}', again: 'Yeni talep gönder' },
  ru: { title: 'Спасибо за ваш запрос!', text: 'Мы успешно получили ваш запрос и ответим вам по электронной почте в течение 5–30 минут. По срочным вопросам звоните нам: {phone}.', call: 'Позвонить: {phone}', again: 'Отправить ещё один запрос' },
  fr: { title: 'Merci pour votre demande !', text: 'Nous avons bien reçu votre demande et vous répondrons par e-mail sous 5 à 30 minutes. Pour toute question urgente, appelez-nous au {phone}.', call: 'Appeler le {phone}', again: 'Envoyer une autre demande' },
  uk: { title: 'Дякуємо за ваш запит!', text: 'Ми успішно отримали ваш запит і відповімо вам електронною поштою протягом 5–30 хвилин. З термінових питань телефонуйте нам: {phone}.', call: 'Зателефонувати: {phone}', again: 'Надіслати ще один запит' },
};
