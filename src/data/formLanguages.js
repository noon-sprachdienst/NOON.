// Languages of the quote form (source and target drop-downs).
// Each language has a fixed id and a name in the 7 site languages. The German name is the value
// that reaches the office e-mail, whatever language the visitor uses.
// Starts with the languages the site already offers (the language pages); later the admin can
// add and delete languages (CMS step 1, phase 3). 'other' always stays and opens a text box.
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
  other: { de: 'Andere Sprache …', en: 'Other language …', ar: 'لغة أخرى …', tr: 'Diğer dil …', ru: 'Другой язык …', fr: 'Autre langue …', uk: 'Інша мова …' },
};

const SITE_LANGUAGES = ['arabic', 'turkish', 'russian', 'ukrainian', 'english', 'persian', 'polish', 'french', 'romanian', 'spanish', 'italian', 'greek', 'bcs', 'albanian'];

export const FORM_LANGUAGE_LISTS = {
  source: [...SITE_LANGUAGES, 'german', 'other'],
  target: ['german', ...SITE_LANGUAGES, 'other'],
};

// Label and placeholder of the text box shown when the visitor picks "Other language".
export const FORM_OTHER_LANGUAGE = {
  de: { label: 'Welche Sprache?', placeholder: 'z. B. Tigrinya' },
  en: { label: 'Which language?', placeholder: 'e.g. Tigrinya' },
  ar: { label: 'ما هي اللغة؟', placeholder: 'مثلًا: التغرينية' },
  tr: { label: 'Hangi dil?', placeholder: 'örn. Tigrinya' },
  ru: { label: 'Какой язык?', placeholder: 'например, тигринья' },
  fr: { label: 'Quelle langue ?', placeholder: 'p. ex. tigrigna' },
  uk: { label: 'Яка мова?', placeholder: 'наприклад, тигринья' },
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
