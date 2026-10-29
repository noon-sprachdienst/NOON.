// Plan v4 "Andere Sprachen", part 3: the remaining Arabic and French office pages, and the
// Turkish, Russian and Ukrainian office pages outside Berlin/Stuttgart, were ~85 words of
// template text. Each gets its own intro, local situations and FAQs; only the short office
// and price blocks are shared per language. Applied by path like FOREIGN_UPGRADES; no new URLs.
const OFFICES = {
  osnabrueck: { street: 'Rosenplatz 17, 49074 Osnabrück', de: '/de/standorte/osnabrueck/' },
  stuttgart: { street: 'Friedrichstraße 15, 70174 Stuttgart', de: '/de/standorte/stuttgart/' },
  berlin: { street: 'Potsdamer Straße 63, 10785 Berlin', de: '/de/standorte/berlin/' },
  bielefeld: { street: 'Teichstraße 24, 33615 Bielefeld', de: '/de/standorte/bielefeld/' },
  mainz: { street: 'Richard-Wagner-Straße 13, 55118 Mainz', de: '/de/standorte/mainz/' },
  kiel: { street: 'Bothwellstraße 25, 24143 Kiel', de: '/de/standorte/kiel/' },
};

// Per language: page frame plus the two short shared blocks (office visit, prices).
const LANG = {
  ar: {
    prefix: '/ar/locations',
    eyebrow: (c) => `مكتب ترجمة ${c}`,
    title: (c) => `ترجمة معتمدة ومترجمون فوريون في ${c}.`,
    metaTitle: (c) => `مترجم محلف في ${c} – ترجمة معتمدة | Noon`,
    description: (c) => `مكتب ترجمة في ${c}: ترجمة معتمدة من العربية إلى الألمانية تقبلها جميع الدوائر الألمانية، ومترجمون فوريون للمواعيد – ابتداءً من 39 يورو للمستند.`,
    highlights: ['مترجمون معتمدون من المحكمة', 'ابتداءً من 39 يورو للمستند', 'خدمة مستعجلة في نفس اليوم'],
    office: (c, street) => [`مكتبنا في ${c}`, `يمكنكم زيارتنا بموعد مسبق في العنوان: ${street}. لكن معظم عملائنا لا يحتاجون إلى الحضور: ترسلون صورة المستند عبر واتساب أو البريد الإلكتروني، وتستلمون الترجمة بصيغة PDF وبالبريد. الهاتف وواتساب متاحان على مدار الساعة.`],
    prices: (c) => [`الأسعار وطريقة الطلب في ${c}`, 'تبدأ الترجمة المعتمدة للمستندات القياسية من 39 يورو للمستند، والترجمة الفورية من 85 يورو للساعة. نخبركم بالسعر الثابت مجاناً قبل البدء. مدة التسليم المعتادة 2–3 أيام عمل، والخدمة المستعجلة في نفس اليوم.'],
    links: (de) => [{ href: de, label: 'صفحة المكتب بالألمانية' }, { href: '/angebot/', label: 'اطلب عرض سعر مجاني' }],
    docs: ['الوثائق التي نترجمها', `• شهادات الميلاد والزواج والطلاق وبيان القيد العائلي
• الشهادات الثانوية والجامعية وكشوف العلامات
• رخص القيادة وشهادات الخبرة وعقود العمل
• الأحكام القضائية والوكالات والعقود
• التقارير الطبية وشهادات عدم المحكومية
نترجم المستند كاملاً بما فيه الأختام والتوقيعات والتصديقات، وتحمل كل ترجمة ختم المترجم المعتمد وتوقيعه. وتبقى وثائقكم سرية ولا تُستخدم إلا للترجمة.`],
    faq0: (c) => [`هل تقبل الدوائر في ${c} ترجماتكم؟`, 'نعم، الترجمات المعتمدة من مترجمين معتمدين من المحكمة مقبولة في جميع أنحاء ألمانيا.'],
  },
  fr: {
    prefix: '/fr/agences',
    eyebrow: (c) => `Bureau de traduction ${c}`,
    title: (c) => `Traducteur assermenté et interprètes à ${c}.`,
    metaTitle: (c) => `Traducteur assermenté ${c} – traduction certifiée | Noon`,
    description: (c) => `Traducteur assermenté à ${c} : traductions certifiées du français vers l’allemand reconnues en Allemagne, interprètes – dès 39 € par document.`,
    highlights: ['Traducteurs assermentés', 'Dès 39 € par document', 'Express le jour même'],
    office: (c, street) => [`Notre bureau à ${c}`, `Sur rendez-vous à l’adresse ${street}. La plupart de nos clients n’ont pas besoin de se déplacer : vous envoyez une photo de vos documents, vous recevez la traduction en PDF et par courrier. Téléphone et WhatsApp disponibles 24 h/24.`],
    prices: (c) => [`Prix et commande à ${c}`, 'Dès 39 € par document standard, 0,12 € par mot pour les textes spécialisés, 85 € de l’heure pour un interprète. Prix fixe communiqué gratuitement à l’avance ; livraison en 2–3 jours ouvrés, ou le jour même en express.'],
    links: (de) => [{ href: de, label: 'Page du bureau (allemand)' }, { href: '/angebot/', label: 'Demander un devis gratuit' }],
    faq0: (c) => [`Vos traductions sont-elles acceptées par les autorités de ${c} ?`, 'Oui, les traductions certifiées de traducteurs assermentés sont acceptées dans toute l’Allemagne.'],
  },
  tr: {
    prefix: '/tr/subeler',
    eyebrow: (c, n) => `Yeminli tercüman ${n}`,
    title: (c) => `${c} yeminli tercüman ve onaylı çeviri.`,
    metaTitle: (c, n) => `Yeminli Tercüman ${n} – onaylı çeviri | Noon`,
    description: (c) => `${c} yeminli tercüman: Türkçe–Almanca onaylı çeviri ve sözlü tercüman, tüm Alman makamlarınca kabul edilir – belge başına 39 €’dan.`,
    highlights: ['Yetkili tercümanlar', 'Belge başına 39 €’dan', 'Aynı gün ekspres'],
    office: (c, street, n) => [`${n} ofisimiz`, `Randevu ile ziyaret: ${street}. Müşterilerimizin çoğu hiç gelmek zorunda kalmaz: belgenin fotoğrafını gönderir, çeviriyi PDF ve posta ile alır. Telefon ve WhatsApp 7/24 açık.`],
    prices: (c) => [`${c} fiyatlar ve sipariş`, 'Standart belgeler belge başına 39 €’dan, sözlü tercüme saatlik 85 €’dan başlar. Sabit fiyatı önceden ve ücretsiz bildiririz. Teslim 2–3 iş günü, ekspres aynı gün.'],
    links: (de) => [{ href: de, label: 'Ofis sayfası (Almanca)' }, { href: '/tr/angebot/', label: 'Ücretsiz teklif alın' }],
    docs: ['Hangi belgeleri çeviriyoruz?', `• nüfus kayıt örneği, doğum ve evlilik belgeleri, boşanma kararları
• lise ve üniversite diplomaları, transkriptler, ustalık belgeleri
• ehliyet, SGK hizmet dökümü ve iş belgeleri
• vekaletnameler, mahkeme kararları ve sözleşmeler
• sağlık raporları ve adli sicil kaydı
Belgeyi mühürleri, imzaları ve apostil dahil eksiksiz çeviririz. Her çeviri, mahkeme yetkili tercümanın mührünü ve imzasını taşır; isimler tüm belgelerde pasaportunuzdaki gibi aynı yazılır. Belgeleriniz gizli tutulur ve yalnızca çeviri için kullanılır.`],
    faq0: (c) => [`${c}ki makamlar çevirilerinizi kabul ediyor mu?`, 'Evet, yetkili tercümanların onaylı çevirileri tüm Almanya’da kabul edilir.'],
  },
  ru: {
    prefix: '/ru/filialy',
    eyebrow: (c, n) => `Присяжный переводчик ${n}`,
    title: (c) => `Присяжный переводчик в ${c} – заверенные переводы.`,
    metaTitle: (c, n) => `Присяжный переводчик ${n} – заверенный перевод | Noon`,
    description: (c) => `Присяжный переводчик в ${c}: заверенные переводы с русского на немецкий для ведомств, ЗАГСа и пенсии, устные переводчики. От 39 € за документ.`,
    highlights: ['Уполномоченные переводчики', 'От 39 € за документ', 'Срочно – в тот же день'],
    office: (c, street) => [`Наш офис в ${c}`, `По предварительной записи: ${street}. Большинству клиентов приходить не нужно: пришлите фото документа и получите перевод в PDF и по почте. Телефон и WhatsApp – круглосуточно.`],
    prices: (c) => [`Цены и заказ в ${c}`, 'Стандартные документы – от 39 € за документ, устный перевод – от 85 € в час. Фиксированную цену называем заранее и бесплатно. Обычно 2–3 рабочих дня, срочно – в тот же день.'],
    links: (de) => [{ href: de, label: 'Страница офиса (немецкий)' }, { href: '/angebot/', label: 'Запросить цену' }],
    docs: ['Какие документы мы переводим', `• свидетельства о рождении, браке, разводе и перемене имени
• аттестаты, дипломы с приложениями, свидетельства о профессии
• трудовые книжки, справки о стаже и зарплате для пенсии
• водительские удостоверения, доверенности, решения суда
• медицинские заключения и справки о несудимости
Мы переводим документ полностью, включая печати, подписи, штампы и апостиль. Каждый перевод заверяется печатью и подписью уполномоченного переводчика, а имена пишутся одинаково во всех документах – как в загранпаспорте. Ваши документы остаются конфиденциальными.`],
    faq0: (c) => [`Принимают ли ведомства в ${c} ваши переводы?`, 'Да, переводы уполномоченных переводчиков признаются по всей Германии.'],
  },
  uk: {
    prefix: '/uk/filiji',
    eyebrow: (c, n) => `Присяжний перекладач ${n}`,
    title: (c) => `Присяжний перекладач у ${c} – завірені переклади.`,
    metaTitle: (c, n) => `Присяжний перекладач ${n} – завірений переклад | Noon`,
    description: (c) => `Присяжний перекладач у ${c}: завірені переклади з української на німецьку для відомств, Jobcenter і визнання дипломів, усні перекладачі. Від 39 €.`,
    highlights: ['Уповноважені перекладачі', 'Від 39 € за документ', 'Терміново – того ж дня'],
    office: (c, street) => [`Наш офіс у ${c}`, `За попереднім записом: ${street}. Більшості клієнтів приходити не потрібно: надішліть фото документа й отримайте переклад у PDF і поштою. Телефон і WhatsApp – цілодобово.`],
    prices: (c) => [`Ціни та замовлення в ${c}`, 'Стандартні документи – від 39 € за документ, усний переклад – від 85 € за годину. Фіксовану ціну повідомляємо заздалегідь і безкоштовно. Зазвичай 2–3 робочі дні, терміново – того ж дня.'],
    links: (de) => [{ href: de, label: 'Сторінка офісу (німецькою)' }, { href: '/angebot/', label: 'Запит ціни' }],
    docs: ['Які документи ми перекладаємо', `• свідоцтва про народження, шлюб, розлучення та зміну імені
• атестати, дипломи з додатками, свідоцтва про професію
• трудові книжки, довідки про стаж і зарплату
• посвідчення водія, довіреності, рішення суду
• медичні висновки та довідки про несудимість
Ми перекладаємо документ повністю, включно з печатками, підписами, штампами й апостилем. Кожен переклад засвідчується печаткою та підписом уповноваженого перекладача, а імена пишуться однаково в усіх документах – як у закордонному паспорті. Ваші документи залишаються конфіденційними.`],
    faq0: (c) => [`Чи приймають відомства в ${c} ваші переклади?`, 'Так, переклади уповноважених перекладачів визнаються по всій Німеччині.'],
  },
};

// city = name in that language, or [base form, form used in sentences] where grammar
// changes it (Turkish locative suffix, Russian/Ukrainian prepositional case).
function page(lang, slug, city, { intro, local, extra, faqs }) {
  const L = LANG[lang];
  const [n, c] = Array.isArray(city) ? city : [city, city];
  const { street, de } = OFFICES[slug];
  return [`${L.prefix}/${slug}`, {
    eyebrow: L.eyebrow(c, n),
    title: L.title(c),
    metaTitle: L.metaTitle(c, n),
    description: L.description(c),
    intro,
    highlights: L.highlights,
    sections: [[...L.office(c, street, n), L.links(de)], local, extra, L.docs, L.prices(c)].filter(Boolean),
    faqs: [L.faq0(c), ...faqs],
  }, lang, n];
}

// Each office page links to the next office in the same language (a ring), so every
// page gets an in-content link and visitors can move between offices.
const NEXT_LABEL = {
  ar: (n) => `مكتبنا في ${n}`,
  fr: (n) => `Notre bureau à ${n}`,
  tr: (n) => `${n} ofisimiz`,
  ru: (n) => `Офис Noon – ${n}`,
  uk: (n) => `Офіс Noon – ${n}`,
};
function ring(pages) {
  return pages.map(([path, data, lang]) => {
    const same = pages.filter((item) => item[2] === lang);
    const next = same[(same.findIndex((item) => item[0] === path) + 1) % same.length];
    const [first, ...rest] = data.sections;
    const link = { href: `${next[0]}/`, label: NEXT_LABEL[lang](next[3]) };
    return [path, { ...data, sections: [[first[0], first[1], [...first[2], link]], ...rest] }];
  });
}

export const FOREIGN_UPGRADES_3 = Object.fromEntries(ring([
  // ───────────── Arabic ─────────────
  page('ar', 'osnabrueck', 'أوسنابروك', {
    intro: 'تبحثون عن مترجم محلف أو مكتب ترجمة عربي في أوسنابروك؟ في مقرنا الرئيسي في روزنبلاتس 17 يترجم مترجمون معتمدون من المحكمة شهادات الميلاد والزواج والطلاق والشهادات الدراسية من العربية إلى الألمانية، لدائرة الأجانب ومكتب السجل المدني وجامعة أوسنابروك. ونوفّر مترجمين فوريين للعربية بلهجاتها المختلفة في أوسنابروك ومنطقة إمسلاند.',
    local: ['طلبات شائعة في أوسنابروك', '• لمّ الشمل والإقامة: عقود الزواج وشهادات الميلاد وبيانات العائلة لدائرة الأجانب في المدينة والمقاطعة\n• التجنّس: ترجمة الوثائق مع كتابة الأسماء كما في جواز السفر\n• طلاب جامعة أوسنابروك والجامعة التطبيقية: الشهادات وكشوف العلامات\n• معادلة الشهادات المهنية للعمل في التمريض والهندسة والحِرَف\n• عملاء من لينغن وميبن ونوردهورن – بالكامل عبر الإنترنت', [{ href: '/de/sprachen/arabisch/', label: 'Arabisch Übersetzer (DE)' }, { href: '/de/ratgeber/einbuergerung-dokumente/', label: 'Einbürgerung: Dokumente (DE)' }]],
    extra: ['مقرنا الرئيسي منذ 2019', 'بدأت نون في أوسنابروك عام 2019، ومن هنا ننسّق اليوم المترجمين والمترجمين الفوريين لمكاتبنا الستة. فريقنا يعرف الوثائق السورية والعراقية والمصرية والمغربية واللبنانية والسودانية، ويعرف كيف تُكتب الأسماء العربية بالأحرف اللاتينية بشكل موحّد في جميع المستندات حتى لا تحدث مشاكل في دائرة الأجانب أو السجل المدني.', [{ href: '/de/ueber-uns/', label: 'Über uns (DE)' }]],
    faqs: [['هل يمكنني استلام الترجمة من المكتب؟', 'نعم، بموعد مسبق في روزنبلاتس 17. ومعظم العملاء يستلمونها بصيغة PDF وبالبريد.'], ['هل تترجمون الوثائق المصدّقة من السفارة؟', 'نعم، نترجم المستند كاملاً مع الأختام والتصديقات الموجودة عليه.']],
  }),
  page('ar', 'stuttgart', 'شتوتغارت', {
    intro: 'مترجم محلف عربي في شتوتغارت: نترجم وثائقكم من العربية إلى الألمانية ومن الألمانية إلى العربية بترجمة معتمدة تقبلها دائرة الأجانب ومكتب السجل المدني ومكتب رخص القيادة والمحاكم. مكتبنا في فريدريش شتراسه 15 وسط المدينة، ونوفّر مترجمين فوريين للمواعيد في شتوتغارت والمنطقة المحيطة.',
    local: ['طلبات شائعة في شتوتغارت', '• تبديل رخصة القيادة الأجنبية في مكتب رخص القيادة: نترجم الرخصة كاملة من الوجهين\n• العاملون في صناعة السيارات والهندسة: الشهادات الجامعية وشهادات الخبرة وعقود العمل\n• الزواج في السجل المدني بشتوتغارت وتسجيل المواليد\n• معادلة الشهادات الطبية للأطباء والصيادلة\n• عملاء من إسلينغن ولودفيغسبورغ وبوبلينغن وفايبلينغن – عبر الإنترنت', [{ href: '/de/standorte/stuttgart/beglaubigte-uebersetzung/', label: 'Beglaubigte Übersetzung Stuttgart (DE)' }, { href: '/de/fuehrerschein-uebersetzung/', label: 'Führerschein übersetzen (DE)' }]],
    extra: ['مترجمون فوريون في شتوتغارت', 'للمواعيد عند الكاتب العدل والمحكمة ومكتب الزواج ودائرة الأجانب والطبيب نوفّر مترجمين فوريين للعربية حضورياً أو عبر الفيديو أو الهاتف، ومترجمين محلفين حيث يُشترط ذلك. وللشركات نوفّر مترجمين للمعارض في معرض شتوتغارت وللمفاوضات مع العملاء من الخليج والشرق الأوسط.', [{ href: '/de/standorte/stuttgart/dolmetscher/', label: 'Dolmetscher Stuttgart (DE)' }]],
    faqs: [['هل تقبل دائرة رخص القيادة ترجمتكم؟', 'نعم، الترجمة المعتمدة من مترجم معتمد من المحكمة مقبولة لتبديل الرخصة.'], ['كم تستغرق ترجمة شهادة جامعية؟', 'عادةً 2–3 أيام عمل، وفي الحالات العاجلة في نفس اليوم.']],
  }),
  page('ar', 'berlin', 'برلين', {
    intro: 'تبحثون عن مترجم محلف عربي في برلين؟ مترجمونا المعتمدون من المحكمة يترجمون وثائقكم للمكتب الاتحادي للهجرة في برلين (LEA) ولمكاتب السجل المدني في الأحياء الاثني عشر وللمحاكم والجامعات. مكتبنا في بوتسدامر شتراسه 63 في حي تيرغارتن، ونوفّر مترجمين فوريين للعربية في جميع أنحاء برلين.',
    local: ['طلبات شائعة في برلين', '• الإقامة والبطاقة الزرقاء ولمّ الشمل لدى LEA: شهادات الميلاد والزواج والشهادات الجامعية\n• الزواج في برلين: شهادة الميلاد وإثبات العزوبية وحكم الطلاق، مع مترجم فوري في حفل الزواج\n• التجنّس بعد التعديلات الجديدة: ترجمة كاملة للوثائق المطلوبة\n• طلاب جامعة برلين الحرة وجامعة هومبولت والجامعة التقنية\n• شراء العقارات وتأسيس الشركات عند الكاتب العدل مع مترجم محلف', [{ href: '/de/standorte/berlin/arabisch/', label: 'Arabisch Übersetzer Berlin (DE)' }, { href: '/de/standorte/berlin/dolmetscher/', label: 'Dolmetscher Berlin (DE)' }]],
    extra: ['اللهجات العربية في برلين', 'في برلين تعيش جاليات عربية من سوريا ولبنان وفلسطين والعراق ومصر والمغرب العربي. لذلك نختار للترجمة الفورية مترجماً يفهم لهجتكم، ونترجم الوثائق الصادرة من بلدان مختلفة بالمصطلحات الصحيحة، مثل بيان القيد العائلي السوري أو وثيقة الزواج المصرية.', [{ href: '/de/sprachen/arabisch/', label: 'Arabisch Übersetzer (DE)' }]],
    faqs: [['هل يقبل LEA في برلين ترجماتكم؟', 'نعم، ترجمات مترجمينا المعتمدين مقبولة لدى LEA وجميع الدوائر في ألمانيا.'], ['هل توفّرون مترجماً لحفل الزواج؟', 'نعم، عند الطلب مترجماً محلفاً لمكتب الزواج في أي حي من أحياء برلين.']],
  }),
  page('ar', 'bielefeld', 'بيليفيلد', {
    intro: 'ترجمة معتمدة من العربية إلى الألمانية في بيليفيلد ومنطقة أوستفستفالن-ليبه: نترجم الوثائق لدائرة الأجانب ومكتب السجل المدني ومركز العمل (Jobcenter) وجامعة بيليفيلد، ونوفّر مترجمين فوريين للمواعيد الرسمية والطبية والمدرسية. مكتبنا في تايش شتراسه 24.',
    local: ['طلبات شائعة في بيليفيلد', '• العائلات السورية والعراقية: بيانات العائلة وشهادات الميلاد والزواج للسجل المدني والتجنّس\n• طلاب جامعة بيليفيلد والجامعة التطبيقية: الشهادة الثانوية والجامعية\n• Jobcenter ومكتب العمل: شهادات الخبرة والمؤهلات المهنية\n• عملاء من غوترسلوه وهيرفورد وديتمولد وبادربورن – عبر الإنترنت', [{ href: '/de/standorte/bielefeld/', label: 'Übersetzungsbüro Bielefeld (DE)' }, { href: '/de/ratgeber/anerkennung-auslaendischer-abschluesse/', label: 'Anerkennung (DE)' }]],
    extra: ['مترجم فوري عند الطبيب والمدرسة', 'كثير من عملائنا في بيليفيلد يحتاجون مترجماً فورياً لمواعيد قصيرة: عند الطبيب أو في المستشفى أو في لقاء أولياء الأمور في المدرسة أو في مركز العمل. هذه المواعيد غالباً ما تكون أسهل وأرخص عبر الفيديو بدون تكاليف تنقّل. وللمحكمة والكاتب العدل نوفّر مترجمين محلفين حضورياً.', [{ href: '/de/dolmetschen/dolmetscher-arzt/', label: 'Dolmetscher für Arztbesuch (DE)' }, { href: '/de/dolmetschen/dolmetscher-schule/', label: 'Dolmetscher Schule (DE)' }]],
    faqs: [['هل تترجمون الشهادات لجامعة بيليفيلد؟', 'نعم، الشهادات الثانوية والجامعية وكشوف العلامات بترجمة معتمدة.'], ['هل يمكن الترجمة الفورية عبر الفيديو؟', 'نعم، للمواعيد القصيرة عند الطبيب أو المدرسة أو الدوائر.']],
  }),
  page('ar', 'mainz', 'ماينتس', {
    intro: 'مكتب ترجمة عربي في ماينتس وفيسبادن: ترجمة معتمدة للوثائق من العربية إلى الألمانية للدوائر ومكتب السجل المدني وجامعة يوهانس غوتنبرغ، ومترجمون فوريون للمواعيد في عاصمتي الولايتين. مكتبنا في ريشارد-فاغنر-شتراسه 13 قريب من فيسبادن عبر نهر الراين.',
    local: ['طلبات شائعة في ماينتس وفيسبادن', '• الباحثون والطلاب في جامعة يوهانس غوتنبرغ: الشهادات وكشوف العلامات للقبول والمعادلة\n• الأطباء والصيادلة: معادلة الشهادات الطبية وشهادات حسن السيرة المهنية\n• العائلات: وثائق الزواج والميلاد للسجل المدني والتجنّس\n• عملاء من فيسبادن وإنغلهايم وروسلسهايم – عبر الإنترنت أو بموعد في ماينتس', [{ href: '/de/standorte/wiesbaden/', label: 'Übersetzungen Wiesbaden (DE)' }, { href: '/de/standorte/mainz/', label: 'Übersetzungsbüro Mainz (DE)' }]],
    extra: ['مترجمون فوريون لماينتس وفيسبادن', 'نوفّر مترجمين فوريين للعربية عند الكاتب العدل والمحاكم ومكاتب الزواج ودوائر الأجانب في المدينتين، ومترجمين محلفين حيث يُشترط ذلك. أكثر المواعيد شيوعاً: الزواج في مكتب السجل المدني، وشراء العقارات عند الكاتب العدل، وجلسات المحكمة.', [{ href: '/de/dolmetschen/dolmetscher-hochzeit/', label: 'Dolmetscher Hochzeit (DE)' }, { href: '/de/gerichtsdolmetscher/', label: 'Gerichtsdolmetscher (DE)' }]],
    faqs: [['هل تخدمون فيسبادن أيضاً؟', 'نعم، مكتبنا في ماينتس على الضفة الأخرى من الراين، ومعظم عملاء فيسبادن يطلبون عبر الإنترنت.'], ['هل تترجمون الشهادات الطبية للمعادلة؟', 'نعم، شهادات الطب والصيدلة وشهادات الامتياز بترجمة معتمدة.']],
  }),
  page('ar', 'kiel', 'كيل', {
    intro: 'مكتب ترجمة عربي في كيل برقم خاص بالمكتب ‎+49 15567 478943 (هاتف وواتساب): ترجمة معتمدة من العربية إلى الألمانية لدائرة الأجانب ومكتب السجل المدني والمحاكم وجامعة كيل، ومترجمون فوريون للمواعيد الرسمية والطبية في كيل وشليسفيغ-هولشتاين.',
    local: ['طلبات شائعة في كيل', '• طلاب وباحثو جامعة كيل (CAU): الشهادات وكشوف العلامات\n• العاملون في أحواض بناء السفن والميناء واللوجستيات: المؤهلات ووثائق العمل\n• العائلات العربية: وثائق السجل المدني ولمّ الشمل والتجنّس\n• المرضى والعيادات مثل مستشفى UKSH: مترجم طبي\n• عملاء من نويمونستر ورندسبورغ وإكرنفورده وبلون – عبر الإنترنت', [{ href: '/de/standorte/kiel/', label: 'Übersetzungsbüro Kiel (DE)' }, { href: '/de/standorte/kiel/medizinischer-dolmetscher/', label: 'Medizinischer Dolmetscher Kiel (DE)' }]],
    extra: ['ترجمة فورية طبية ورسمية في كيل', 'في المستشفيات والعيادات يجب أن يفهم المريض التشخيص والعلاج بدقة. لذلك نوفّر مترجمين طبيين للعربية في كيل حضورياً أو عبر الفيديو. كما نرافقكم في مواعيد دائرة الأجانب ومكتب الشؤون الاجتماعية والمدرسة والمحكمة، مع مترجمين محلفين للمحكمة والكاتب العدل.', [{ href: '/de/standorte/kiel/ermaechtigter-uebersetzer/', label: 'Ermächtigter Übersetzer Kiel (DE)' }]],
    faqs: [['كيف أتواصل مع مكتب كيل؟', 'اتصلوا أو راسلونا عبر واتساب على ‎+49 15567 478943 على مدار الساعة، والزيارة بموعد في بوثفيل شتراسه 25.'], ['هل يوجد مترجم عربي في المستشفى؟', 'نعم، حضورياً أو عبر الفيديو، حسب الموعد ونوع الحالة.']],
  }),

  // ───────────── French ─────────────
  page('fr', 'osnabrueck', 'Osnabrück', {
    intro: 'Vous cherchez un traducteur assermenté ou une agence de traduction à Osnabrück ? Depuis notre siège au Rosenplatz 17, nos traducteurs habilités par la justice traduisent vos actes de naissance, actes de mariage, diplômes et jugements du français vers l’allemand pour le service des étrangers, l’état civil et l’université d’Osnabrück.',
    local: ['Demandes fréquentes à Osnabrück', '• Étudiants francophones à l’université d’Osnabrück et à la Hochschule : baccalauréat, relevés de notes, diplômes\n• Titre de séjour et regroupement familial : actes d’état civil du Maroc, d’Algérie, de Tunisie, du Cameroun ou du Sénégal\n• Mariage au bureau d’état civil d’Osnabrück : acte de naissance, certificat de célibat, jugement de divorce\n• Clients de l’Emsland et du Münsterland – entièrement en ligne', [{ href: '/de/sprachen/franzoesisch/', label: 'Französisch Übersetzer (DE)' }, { href: '/de/diplom-uebersetzung/', label: 'Diplom übersetzen (DE)' }]],
    extra: ['Notre siège depuis 2019', 'Noon est née à Osnabrück en 2019 ; c’est d’ici que nous coordonnons aujourd’hui les traducteurs et interprètes de nos six bureaux. Pour le français, nous connaissons les actes de France, de Belgique, de Suisse et d’Afrique francophone, avec leurs mentions marginales, légalisations et apostilles, que nous traduisons intégralement.', [{ href: '/de/apostille/', label: 'Apostille (DE)' }]],
    faqs: [['Puis-je récupérer ma traduction au bureau ?', 'Oui, sur rendez-vous au Rosenplatz 17. La plupart des clients la reçoivent en PDF et par courrier.'], ['Traduisez-vous les actes d’état civil marocains ou algériens ?', 'Oui, rédigés en français ou bilingues arabe-français, avec toutes les mentions.']],
  }),
  page('fr', 'stuttgart', 'Stuttgart', {
    intro: 'Traducteur assermenté français-allemand à Stuttgart : traductions certifiées pour le service des étrangers, l’état civil, le service des permis de conduire et les tribunaux, ainsi que des interprètes pour vos rendez-vous. Notre bureau se trouve Friedrichstraße 15, au centre-ville.',
    local: ['Demandes fréquentes à Stuttgart', '• Ingénieurs et techniciens dans l’automobile et l’industrie : diplômes, certificats de travail, contrats\n• Échange d’un permis de conduire français, belge ou africain au Führerscheinstelle\n• Mariage et naissance au Standesamt de Stuttgart\n• Entreprises : contrats, documentation technique et correspondance avec des partenaires en France\n• Clients d’Esslingen, Ludwigsburg, Böblingen et Sindelfingen – en ligne', [{ href: '/de/standorte/stuttgart/beglaubigte-uebersetzung/', label: 'Beglaubigte Übersetzung Stuttgart (DE)' }, { href: '/de/standorte/stuttgart/fachuebersetzungen/', label: 'Fachübersetzungen Stuttgart (DE)' }]],
    extra: ['Interprètes à Stuttgart', 'Pour le notaire, le tribunal, l’état civil, le service des étrangers ou un rendez-vous médical, nous organisons des interprètes français – sur place, par vidéo ou par téléphone, assermentés lorsque c’est exigé. Pour les salons de la Messe Stuttgart et les négociations avec des partenaires français, nous proposons aussi l’interprétation consécutive et simultanée.', [{ href: '/de/standorte/stuttgart/dolmetscher/', label: 'Dolmetscher Stuttgart (DE)' }]],
    faqs: [['Mon permis de conduire doit-il être traduit ?', 'Pour l’échange au Führerscheinstelle, une traduction certifiée est souvent demandée ; nous traduisons le permis recto verso.'], ['Traduisez-vous des textes techniques ?', 'Oui, manuels, cahiers des charges et contrats, par des traducteurs spécialisés.']],
  }),
  page('fr', 'berlin', 'Berlin', {
    intro: 'Vous cherchez un traducteur assermenté à Berlin ? Nos traducteurs habilités traduisent vos documents du français vers l’allemand pour le Landesamt für Einwanderung (LEA), les bureaux d’état civil des douze arrondissements, les tribunaux et les universités berlinoises. Notre bureau : Potsdamer Straße 63, Tiergarten.',
    local: ['Demandes fréquentes à Berlin', '• Titre de séjour, carte bleue européenne et regroupement familial au LEA\n• Mariage à Berlin : acte de naissance, certificat de capacité à mariage, jugement de divorce, interprète pour la cérémonie\n• Étudiants et chercheurs à la FU, la HU et la TU : diplômes et relevés de notes\n• Start-up et entreprises : statuts, contrats et extraits Kbis\n• Achat immobilier chez le notaire avec interprète assermenté', [{ href: '/de/standorte/berlin/beglaubigte-uebersetzung/', label: 'Beglaubigte Übersetzung Berlin (DE)' }, { href: '/de/standorte/berlin/dolmetscher/', label: 'Dolmetscher Berlin (DE)' }]],
    extra: ['Documents pour la France et la Belgique', 'Nous traduisons aussi de l’allemand vers le français : actes de naissance allemands pour la transcription au consulat, jugements de divorce, certificats de travail et attestations de la caisse de retraite. Pour un usage en France, un document allemand public porte souvent une apostille, que nous traduisons également.', [{ href: '/de/apostille/', label: 'Apostille (DE)' }]],
    faqs: [['Le LEA accepte-t-il vos traductions ?', 'Oui, les traductions de nos traducteurs habilités sont acceptées à Berlin et dans toute l’Allemagne.'], ['Proposez-vous un interprète pour un mariage ?', 'Oui, un interprète assermenté pour l’état civil de n’importe quel arrondissement.']],
  }),
  page('fr', 'bielefeld', 'Bielefeld', {
    intro: 'Traductions certifiées du français vers l’allemand à Bielefeld et dans la région OWL : actes d’état civil, diplômes et jugements pour le service des étrangers, l’état civil, le Jobcenter et l’université de Bielefeld, ainsi que des interprètes pour vos rendez-vous. Notre bureau : Teichstraße 24.',
    local: ['Demandes fréquentes à Bielefeld', '• Étudiants et doctorants à l’université de Bielefeld : diplômes, relevés de notes, lettres de recommandation\n• Familles d’Afrique francophone : actes de naissance et de mariage pour l’état civil et la naturalisation\n• Reconnaissance de diplômes professionnels : infirmiers, ingénieurs, éducateurs\n• Clients de Gütersloh, Herford, Detmold et Paderborn – en ligne', [{ href: '/de/standorte/bielefeld/', label: 'Übersetzungsbüro Bielefeld (DE)' }, { href: '/de/ratgeber/anerkennung-auslaendischer-abschluesse/', label: 'Anerkennung (DE)' }]],
    extra: ['Interprètes à Bielefeld et en OWL', 'Pour l’école, le médecin, le Jobcenter, le tribunal ou le notaire, nous organisons des interprètes français dans toute la région d’Ostwestfalen-Lippe. Les entretiens courts se font souvent plus simplement par vidéo, sans frais de déplacement ; pour le tribunal et le notaire, nous envoyons des interprètes assermentés sur place.', [{ href: '/de/dolmetschen/dolmetscher-schule/', label: 'Dolmetscher Schule (DE)' }]],
    faqs: [['Traduisez-vous les diplômes pour l’université de Bielefeld ?', 'Oui, baccalauréat, licence, master et relevés de notes, en traduction certifiée.'], ['Un interprète par vidéo est-il possible ?', 'Oui, pour les rendez-vous courts chez le médecin, à l’école ou dans une administration.']],
  }),
  page('fr', 'mainz', 'Mayence', {
    intro: 'Agence de traduction à Mayence et Wiesbaden : traductions certifiées du français vers l’allemand pour les autorités, l’état civil et l’université Johannes Gutenberg, et interprètes pour vos rendez-vous dans les deux capitales régionales. Notre bureau : Richard-Wagner-Straße 13, 55118 Mainz.',
    local: ['Demandes fréquentes à Mayence et Wiesbaden', '• Étudiants et chercheurs à l’université Johannes Gutenberg, partenaire de nombreuses universités françaises : diplômes et relevés\n• Médecins et pharmaciens francophones : reconnaissance des diplômes\n• Couples franco-allemands : mariage, naissance, nom de famille\n• Entreprises pharmaceutiques, biotech et médias : contrats et textes spécialisés\n• Clients de Wiesbaden, Ingelheim et Rüsselsheim – en ligne', [{ href: '/de/standorte/wiesbaden/', label: 'Übersetzungen Wiesbaden (DE)' }, { href: '/de/standorte/mainz/', label: 'Übersetzungsbüro Mainz (DE)' }]],
    extra: ['Mayence, ville jumelée avec Dijon', 'Mayence entretient des liens étroits avec la France – jumelage avec Dijon, échanges universitaires, entreprises franco-allemandes. Nous traduisons dans les deux sens : documents allemands pour la France (actes, jugements, attestations de retraite) et documents français pour les autorités de Rhénanie-Palatinat et de Hesse. Interprètes assermentés pour notaire, tribunal et état civil.', [{ href: '/de/gerichtsdolmetscher/', label: 'Gerichtsdolmetscher (DE)' }]],
    faqs: [['Desservez-vous aussi Wiesbaden ?', 'Oui, notre bureau de Mayence est juste de l’autre côté du Rhin ; la plupart des clients de Wiesbaden commandent en ligne.'], ['Traduisez-vous de l’allemand vers le français ?', 'Oui, par exemple des actes ou jugements allemands destinés à une administration française.']],
  }),
  page('fr', 'kiel', 'Kiel', {
    intro: 'Traducteur assermenté à Kiel, avec un numéro propre au bureau +49 15567 478943 (téléphone et WhatsApp) : traductions certifiées du français vers l’allemand pour le service des étrangers, l’état civil, les tribunaux et l’université de Kiel, et interprètes pour vos rendez-vous au Schleswig-Holstein.',
    local: ['Demandes fréquentes à Kiel', '• Étudiants et chercheurs à l’université Christian-Albrecht (CAU), notamment en sciences marines\n• Marins, ingénieurs navals et logisticiens : brevets, qualifications et contrats\n• Familles d’Afrique francophone : actes d’état civil et regroupement familial\n• Patients et cliniques comme l’UKSH : interprètes médicaux\n• Clients de Neumünster, Rendsburg, Eckernförde et Plön – en ligne', [{ href: '/de/standorte/kiel/', label: 'Übersetzungsbüro Kiel (DE)' }, { href: '/de/standorte/kiel/medizinischer-dolmetscher/', label: 'Medizinischer Dolmetscher Kiel (DE)' }]],
    extra: ['Interprétation médicale et administrative', 'À l’hôpital, le patient doit comprendre exactement le diagnostic et le traitement. Nous proposons à Kiel des interprètes médicaux français sur place ou par vidéo, et nous accompagnons aussi les rendez-vous au service des étrangers, à l’aide sociale, à l’école et au tribunal – avec des interprètes assermentés pour le tribunal et le notaire.', [{ href: '/de/standorte/kiel/ermaechtigter-uebersetzer/', label: 'Ermächtigter Übersetzer Kiel (DE)' }]],
    faqs: [['Comment joindre le bureau de Kiel ?', 'Par téléphone ou WhatsApp au +49 15567 478943, 24 h/24 ; visite sur rendez-vous, Bothwellstraße 25.'], ['Traduisez-vous des documents maritimes ?', 'Oui, brevets, certificats de qualification et contrats d’engagement.']],
  }),

  // ───────────── Turkish ─────────────
  page('tr', 'osnabrueck', ['Osnabrück', 'Osnabrück’te'], {
    intro: 'Osnabrück’te yeminli tercüman mı arıyorsunuz? Rosenplatz 17’deki merkez ofisimizde mahkeme yetkili tercümanlarımız nüfus kayıt örneği, evlilik cüzdanı, boşanma kararı ve diplomalarınızı Türkçe’den Almanca’ya onaylı olarak çevirir – Ausländerbehörde, Standesamt ve Osnabrück Üniversitesi için. Emsland ve Münsterland bölgesinde de tercüman sağlıyoruz.',
    local: ['Osnabrück’te sık gelen talepler', '• Vatandaşlık başvurusu (Einbürgerung): nüfus belgeleri ve isimlerin pasaporttaki gibi yazılması\n• Aile birleşimi: evlilik ve doğum belgeleri\n• Türk ehliyetinin Osnabrück’te değiştirilmesi\n• Üniversite ve Hochschule için lise ve üniversite diplomaları\n• Lingen, Meppen ve Nordhorn’dan müşteriler – tamamen online', [{ href: '/de/sprachen/tuerkisch/', label: 'Türkisch Übersetzer (DE)' }, { href: '/de/ratgeber/einbuergerung-dokumente/', label: 'Einbürgerung: Dokumente (DE)' }]],
    extra: ['2019’dan beri merkezimiz', 'Noon 2019’da Osnabrück’te kuruldu; altı ofisimizin tercümanlarını bugün de buradan koordine ediyoruz. Türkiye’de kullanılacak Almanca belgeleri de (vekaletname, boşanma kararı, emeklilik belgeleri) Türkçe’ye onaylı olarak çeviriyoruz; Türkiye’deki noterler ve nüfus müdürlükleri için apostil gerekiyorsa onu da çeviririz.', [{ href: '/de/apostille/', label: 'Apostille (DE)' }]],
    faqs: [['Çeviriyi ofisten alabilir miyim?', 'Evet, randevu ile Rosenplatz 17’de. Çoğu müşteri PDF ve posta ile alır.'], ['e-Devlet belgelerini çeviriyor musunuz?', 'Evet, barkodlu e-Devlet çıktılarını da çeviriyoruz; kabul kararı ilgili makama aittir.']],
  }),
  page('tr', 'bielefeld', ['Bielefeld', 'Bielefeld’de'], {
    intro: 'Bielefeld ve OWL bölgesinde yeminli tercüman: Türkçe belgelerinizi Almanca’ya, Almanca belgelerinizi Türkçe’ye onaylı olarak çeviriyoruz – Ausländerbehörde, Standesamt, Jobcenter, mahkemeler ve Bielefeld Üniversitesi için. Ofisimiz Teichstraße 24’te, randevu ile.',
    local: ['Bielefeld’de sık gelen talepler', '• Nikâh ve doğum: nüfus kayıt örneği, uluslararası doğum ve evlilik belgeleri\n• Vatandaşlık başvurusu ve isim yazımı\n• Türk ehliyetinin değiştirilmesi\n• Makine ve gıda sektöründe çalışanlar: ustalık belgeleri, diplomalar\n• Gütersloh, Herford, Detmold ve Paderborn’dan müşteriler – online', [{ href: '/de/standorte/bielefeld/', label: 'Übersetzungsbüro Bielefeld (DE)' }, { href: '/de/fuehrerschein-uebersetzung/', label: 'Führerschein übersetzen (DE)' }]],
    extra: ['Doktor, okul ve mahkemede tercüman', 'Bielefeld’de en sık istenen sözlü tercümeler doktor randevuları, okulda veli görüşmeleri, Jobcenter ve mahkemelerdir. Kısa görüşmeler görüntülü olarak yol masrafı olmadan yapılabilir; mahkeme ve noter için yeminli tercüman yüz yüze gelir.', [{ href: '/de/dolmetschen/dolmetscher-arzt/', label: 'Dolmetscher Arztbesuch (DE)' }]],
    faqs: [['Görüntülü tercüme mümkün mü?', 'Evet, doktor, okul veya resmî daire gibi kısa randevular için.'], ['Türkiye’de kullanılacak belgeleri çeviriyor musunuz?', 'Evet, Almanca belgeleri Türkçe’ye onaylı olarak çeviriyoruz; apostili de çeviririz.']],
  }),
  page('tr', 'mainz', ['Mainz', 'Mainz’da'], {
    intro: 'Mainz ve Wiesbaden’de yeminli tercüman: nüfus kayıt örneği, evlilik ve boşanma belgeleri, diploma ve ehliyetlerinizi Türkçe’den Almanca’ya onaylı olarak çeviriyoruz. İki eyalet başkentindeki noter, mahkeme ve nikâh daireleri için sözlü tercüman da sağlıyoruz. Ofisimiz: Richard-Wagner-Straße 13.',
    local: ['Mainz ve Wiesbaden’de sık gelen talepler', '• Standesamt’ta nikâh: doğum belgesi, bekârlık belgesi ve nikâhta tercüman\n• Vatandaşlık başvurusu için nüfus belgeleri\n• Johannes Gutenberg Üniversitesi için diplomalar ve transkriptler\n• Türkiye’de miras ve tapu işlemleri için vekaletname çevirisi\n• Wiesbaden, Ingelheim ve Rüsselsheim’dan müşteriler – online', [{ href: '/de/standorte/wiesbaden/', label: 'Übersetzungen Wiesbaden (DE)' }, { href: '/de/standorte/mainz/', label: 'Übersetzungsbüro Mainz (DE)' }]],
    extra: ['Noter ve mahkemede yeminli tercüman', 'Mainz ve Wiesbaden’de ev alımı, şirket kuruluşu veya vekaletname için noterde Türkçe yeminli tercüman sağlıyoruz. Mahkeme duruşmaları ve nikâh için de yeminli tercümanlar yüz yüze gelir; kısa görüşmeler telefonla veya görüntülü olarak yapılabilir.', [{ href: '/de/gerichtsdolmetscher/', label: 'Gerichtsdolmetscher (DE)' }]],
    faqs: [['Wiesbaden’e de hizmet veriyor musunuz?', 'Evet, Mainz ofisimiz Ren’in hemen karşısında; Wiesbaden’deki müşterilerin çoğu online sipariş veriyor.'], ['Noterde tercüman sağlıyor musunuz?', 'Evet, yeminli tercüman yüz yüze gelir.']],
  }),
  page('tr', 'kiel', ['Kiel', 'Kiel’de'], {
    intro: 'Kiel’de yeminli tercüman – ofise özel numara +49 15567 478943 (telefon ve WhatsApp): Türkçe belgelerinizi Ausländerbehörde, Standesamt, mahkemeler ve Kiel Üniversitesi için Almanca’ya onaylı olarak çeviriyoruz; Schleswig-Holstein genelinde sözlü tercüman sağlıyoruz.',
    local: ['Kiel’de sık gelen talepler', '• Tersane, liman ve lojistik çalışanları: ustalık ve iş belgeleri\n• Kiel Üniversitesi (CAU) öğrencileri: diploma ve transkript\n• Aileler: nikâh, doğum ve vatandaşlık için nüfus belgeleri\n• Hastalar ve UKSH gibi klinikler: tıbbi tercüman\n• Neumünster, Rendsburg, Eckernförde ve Plön’den müşteriler – online', [{ href: '/de/standorte/kiel/', label: 'Übersetzungsbüro Kiel (DE)' }, { href: '/de/standorte/kiel/medizinischer-dolmetscher/', label: 'Medizinischer Dolmetscher Kiel (DE)' }]],
    extra: ['Hastanede ve resmî dairede tercüman', 'Hastanede teşhisi ve tedaviyi tam anlamak önemlidir; Kiel’de tıbbi tercümanlarımız yüz yüze veya görüntülü olarak yardımcı olur. Ausländerbehörde, sosyal daire, okul ve mahkeme randevularına da eşlik ediyoruz – mahkeme ve noter için yeminli tercümanlarla.', [{ href: '/de/standorte/kiel/ermaechtigter-uebersetzer/', label: 'Ermächtigter Übersetzer Kiel (DE)' }]],
    faqs: [['Kiel ofisine nasıl ulaşırım?', '+49 15567 478943 numarasını arayın veya WhatsApp’tan yazın – 7/24. Ziyaret randevu ile Bothwellstraße 25’te.'], ['Hastanede Türkçe tercüman var mı?', 'Evet, yüz yüze veya görüntülü olarak.']],
  }),

  // ───────────── Russian ─────────────
  page('ru', 'osnabrueck', ['Оснабрюк', 'Оснабрюке'], {
    intro: 'Ищете присяжного переводчика в Оснабрюке? В нашем головном офисе на Rosenplatz 17 уполномоченные судом переводчики переводят свидетельства, дипломы, трудовые книжки и решения суда с русского на немецкий – для ведомства по делам иностранцев, ЗАГСа, пенсионного фонда и университета Оснабрюка.',
    local: ['Типичные ситуации в Оснабрюке', '• Поздние переселенцы и их семьи: свидетельства о рождении и браке, справки о смене фамилии\n• Пенсия: трудовые книжки и справки о стаже для Deutsche Rentenversicherung\n• Признание дипломов и профессионального образования\n• Студенты университета и Hochschule: аттестаты и приложения к диплому\n• Клиенты из Эмсланда и Мюнстерланда – полностью онлайн', [{ href: '/de/sprachen/russisch/', label: 'Russisch Übersetzer (DE)' }, { href: '/de/ratgeber/anerkennung-auslaendischer-abschluesse/', label: 'Anerkennung (DE)' }]],
    extra: ['Головной офис с 2019 года', 'Noon была основана в Оснабрюке в 2019 году, и отсюда мы координируем переводчиков всех шести офисов. Мы переводим документы из России, Казахстана, Беларуси, Украины, Киргизии и Узбекистана, а имена пишем в немецкой транслитерации так же, как в паспорте – одинаково во всех документах.', [{ href: '/de/ueber-uns/', label: 'Über uns (DE)' }]],
    faqs: [['Можно ли забрать перевод в офисе?', 'Да, по записи на Rosenplatz 17. Большинство клиентов получают PDF и оригинал по почте.'], ['Переводите ли вы трудовые книжки для пенсии?', 'Да, полностью или выдержками – как требует пенсионный фонд.']],
  }),
  page('ru', 'bielefeld', ['Билефельд', 'Билефельде'], {
    intro: 'Присяжный переводчик в Билефельде и регионе OWL: заверенные переводы с русского на немецкий и с немецкого на русский для ведомства по делам иностранцев, ЗАГСа, Jobcenter, пенсионного фонда и университета Билефельда. Наш офис – Teichstraße 24, по предварительной записи.',
    local: ['Типичные ситуации в Билефельде', '• Большая русскоязычная община OWL: свидетельства о рождении и браке, документы для натурализации\n• Пенсия: трудовые книжки и справки о зарплате\n• Признание дипломов врачей, медсестёр, инженеров и учителей\n• Студенты университета Билефельда: аттестаты и дипломы\n• Клиенты из Гютерсло, Херфорда, Детмольда и Падерборна – онлайн', [{ href: '/de/standorte/bielefeld/', label: 'Übersetzungsbüro Bielefeld (DE)' }, { href: '/de/sprachen/russisch/', label: 'Russisch Übersetzer (DE)' }]],
    extra: ['Устный переводчик у врача и в суде', 'В Билефельде чаще всего нужен переводчик к врачу, в больницу, в школу, в Jobcenter или в суд. Короткие разговоры удобнее по видео, без расходов на дорогу; для суда и нотариуса присяжный переводчик приезжает лично.', [{ href: '/de/dolmetschen/dolmetscher-arzt/', label: 'Dolmetscher Arztbesuch (DE)' }]],
    faqs: [['Возможен ли перевод по видео?', 'Да, для коротких встреч у врача, в школе или ведомстве.'], ['Переводите ли вы документы из Казахстана?', 'Да, на русском и на казахском языке.']],
  }),
  page('ru', 'mainz', ['Майнц', 'Майнце'], {
    intro: 'Бюро переводов в Майнце и Висбадене: заверенные переводы с русского на немецкий для ведомств, ЗАГСа и университета имени Гутенберга, а также устные переводчики для нотариуса, суда и ЗАГСа в обеих столицах земель. Наш офис – Richard-Wagner-Straße 13.',
    local: ['Типичные ситуации в Майнце и Висбадене', '• Учёные и студенты университета имени Гутенберга: дипломы и приложения\n• Врачи и фармацевты: признание медицинских дипломов\n• Семьи: свидетельства для ЗАГСа и натурализации\n• Покупка недвижимости у нотариуса с присяжным переводчиком\n• Клиенты из Висбадена, Ингельхайма и Рюссельсхайма – онлайн', [{ href: '/de/standorte/wiesbaden/', label: 'Übersetzungen Wiesbaden (DE)' }, { href: '/de/standorte/mainz/', label: 'Übersetzungsbüro Mainz (DE)' }]],
    extra: ['Нотариус, суд и ЗАГС', 'В Майнце и Висбадене мы предоставляем присяжных переводчиков русского языка для нотариальных сделок, судебных заседаний и регистрации брака. Документы к встрече мы заранее переводим с заверением, чтобы нотариус или ЗАГС могли их проверить.', [{ href: '/de/gerichtsdolmetscher/', label: 'Gerichtsdolmetscher (DE)' }]],
    faqs: [['Обслуживаете ли вы Висбаден?', 'Да, офис в Майнце на другом берегу Рейна; большинство клиентов из Висбадена заказывают онлайн.'], ['Нужен ли переводчик у нотариуса?', 'Если вы не владеете немецким достаточно хорошо – да, нотариус обычно требует присяжного переводчика.']],
  }),
  page('ru', 'kiel', ['Киль', 'Киле'], {
    intro: 'Присяжный переводчик в Киле – с отдельным номером офиса +49 15567 478943 (телефон и WhatsApp): заверенные переводы с русского на немецкий для ведомства по делам иностранцев, ЗАГСа, судов и университета Киля, а также устные переводчики по всему Шлезвиг-Гольштейну.',
    local: ['Типичные ситуации в Киле', '• Моряки, судостроители и логисты: дипломы, сертификаты и трудовые договоры\n• Студенты и учёные университета Киля (CAU)\n• Семьи: свидетельства для ЗАГСа, воссоединения семьи и натурализации\n• Пациенты и клиники, например UKSH: медицинский переводчик\n• Клиенты из Ноймюнстера, Рендсбурга, Эккернфёрде и Плёна – онлайн', [{ href: '/de/standorte/kiel/', label: 'Übersetzungsbüro Kiel (DE)' }, { href: '/de/standorte/kiel/medizinischer-dolmetscher/', label: 'Medizinischer Dolmetscher Kiel (DE)' }]],
    extra: ['Медицинский и официальный перевод', 'В больнице пациент должен точно понимать диагноз и лечение. Наши медицинские переводчики в Киле помогают лично или по видео. Мы также сопровождаем встречи в ведомстве по делам иностранцев, социальной службе, школе и суде – для суда и нотариуса с присяжными переводчиками.', [{ href: '/de/standorte/kiel/ermaechtigter-uebersetzer/', label: 'Ermächtigter Übersetzer Kiel (DE)' }]],
    faqs: [['Как связаться с офисом в Киле?', 'Звоните или пишите в WhatsApp: +49 15567 478943, круглосуточно. Визит по записи – Bothwellstraße 25.'], ['Переводите ли вы морские дипломы?', 'Да, дипломы, сертификаты квалификации и контракты.']],
  }),

  // ───────────── Ukrainian ─────────────
  page('uk', 'osnabrueck', ['Оснабрюк', 'Оснабрюку'], {
    intro: 'Шукаєте присяжного перекладача в Оснабрюку? У нашому головному офісі на Rosenplatz 17 уповноважені судом перекладачі перекладають свідоцтва, дипломи, атестати та посвідчення водія з української на німецьку – для відомства у справах іноземців, Jobcenter, РАЦСу та університету Оснабрюка.',
    local: ['Типові ситуації в Оснабрюку', '• Посвідка на проживання за § 24 і її продовження: свідоцтва для членів родини\n• Jobcenter і працевлаштування: дипломи, атестати, трудові книжки\n• Визнання професійної освіти: медики, вчителі, інженери\n• Обмін українського посвідчення водія\n• Клієнти з Емсланду та Мюнстерланду – повністю онлайн', [{ href: '/de/sprachen/ukrainisch/', label: 'Ukrainisch Übersetzer (DE)' }, { href: '/de/ratgeber/anerkennung-auslaendischer-abschluesse/', label: 'Anerkennung (DE)' }]],
    extra: ['Головний офіс з 2019 року', 'Noon заснована в Оснабрюку у 2019 році; звідси ми координуємо перекладачів усіх шести офісів. Ми перекладаємо документи українською та російською мовами, а імена пишемо в тій транслітерації, що й у закордонному паспорті – однаково в усіх документах.', [{ href: '/de/ueber-uns/', label: 'Über uns (DE)' }]],
    faqs: [['Чи можна забрати переклад в офісі?', 'Так, за записом на Rosenplatz 17. Більшість клієнтів отримують PDF і оригінал поштою.'], ['Чи перекладаєте ви документи з «Дії»?', 'Так, ми перекладаємо роздруківки; рішення про прийняття ухвалює відповідне відомство.']],
  }),
  page('uk', 'stuttgart', ['Штутгарт', 'Штутгарті'], {
    intro: 'Присяжний перекладач у Штутгарті: завірені переклади з української на німецьку та з німецької на українську для відомства у справах іноземців, Jobcenter, РАЦСу, відомства з посвідчень водія та судів. Наш офіс – Friedrichstraße 15, центр міста, за попереднім записом.',
    local: ['Типові ситуації в Штутгарті', '• Обмін українського посвідчення водія у Führerscheinstelle\n• Робота в автомобільній і машинобудівній галузі: дипломи, трудові книжки, довідки\n• Визнання медичних і педагогічних дипломів\n• Народження дитини та шлюб у РАЦСі Штутгарта\n• Клієнти з Есслінгена, Людвігсбурга, Бёблінгена та Вайблінгена – онлайн', [{ href: '/de/standorte/stuttgart/beglaubigte-uebersetzung/', label: 'Beglaubigte Übersetzung Stuttgart (DE)' }, { href: '/de/fuehrerschein-uebersetzung/', label: 'Führerschein übersetzen (DE)' }]],
    extra: ['Усний перекладач у Штутгарті', 'Для нотаріуса, суду, РАЦСу, відомства у справах іноземців, лікаря та співбесід ми організовуємо усних перекладачів – особисто, по відео або телефону, присяжних там, де це потрібно. Короткі розмови в Jobcenter чи школі часто найпростіше провести по відео.', [{ href: '/de/standorte/stuttgart/dolmetscher/', label: 'Dolmetscher Stuttgart (DE)' }]],
    faqs: [['Чи приймає Führerscheinstelle ваш переклад?', 'Так, завірений переклад уповноваженого перекладача приймається для обміну посвідчення.'], ['Скільки триває переклад диплома?', 'Зазвичай 2–3 робочі дні, терміново – того ж дня.']],
  }),
  page('uk', 'bielefeld', ['Білефельд', 'Білефельді'], {
    intro: 'Присяжний перекладач у Білефельді та регіоні OWL: завірені переклади з української на німецьку для відомства у справах іноземців, Jobcenter, РАЦСу та університету Білефельда, а також усні перекладачі для лікаря, школи та суду. Наш офіс – Teichstraße 24, за записом.',
    local: ['Типові ситуації в Білефельді', '• Посвідка на проживання та Jobcenter: свідоцтва, дипломи, трудові книжки\n• Школа й дитячий садок: свідоцтва про народження, табелі, медичні довідки\n• Визнання дипломів медсестер, лікарів та інженерів\n• Студенти університету Білефельда\n• Клієнти з Гютерсло, Херфорда, Детмольда та Падерборна – онлайн', [{ href: '/de/standorte/bielefeld/', label: 'Übersetzungsbüro Bielefeld (DE)' }, { href: '/de/sprachen/ukrainisch/', label: 'Ukrainisch Übersetzer (DE)' }]],
    extra: ['Перекладач у лікаря та в школі', 'У Білефельді найчастіше потрібен перекладач до лікаря, у лікарню, на батьківські збори в школі або в Jobcenter. Короткі розмови зручніше по відео, без витрат на дорогу; для суду та нотаріуса присяжний перекладач приїжджає особисто.', [{ href: '/de/dolmetschen/dolmetscher-schule/', label: 'Dolmetscher Schule (DE)' }]],
    faqs: [['Чи можливий переклад по відео?', 'Так, для коротких зустрічей у лікаря, школі чи відомстві.'], ['Чи перекладаєте ви шкільні табелі?', 'Так, табелі, атестати та довідки для школи й визнання.']],
  }),
  page('uk', 'mainz', ['Майнц', 'Майнці'], {
    intro: 'Бюро перекладів у Майнці та Вісбадені: завірені переклади з української на німецьку для відомств, РАЦСу, Jobcenter та університету імені Гутенберга, а також усні перекладачі для нотаріуса, суду та РАЦСу в обох столицях земель. Наш офіс – Richard-Wagner-Straße 13.',
    local: ['Типові ситуації в Майнці та Вісбадені', '• Посвідка на проживання та Jobcenter: документи для всієї родини\n• Студенти й науковці університету імені Гутенберга: дипломи з додатками\n• Медики та фармацевти: визнання дипломів\n• Шлюб і народження дитини в РАЦСі\n• Клієнти з Вісбадена, Інгельгайма та Рюссельсгайма – онлайн', [{ href: '/de/standorte/wiesbaden/', label: 'Übersetzungen Wiesbaden (DE)' }, { href: '/de/standorte/mainz/', label: 'Übersetzungsbüro Mainz (DE)' }]],
    extra: ['Нотаріус, суд і РАЦС', 'У Майнці та Вісбадені ми надаємо присяжних перекладачів української мови для нотаріальних угод, судових засідань і реєстрації шлюбу. Документи до зустрічі ми заздалегідь перекладаємо із завіренням, щоб нотаріус чи РАЦС могли їх перевірити.', [{ href: '/de/gerichtsdolmetscher/', label: 'Gerichtsdolmetscher (DE)' }]],
    faqs: [['Чи обслуговуєте ви Вісбаден?', 'Так, офіс у Майнці на іншому березі Рейну; більшість клієнтів із Вісбадена замовляють онлайн.'], ['Чи потрібен перекладач у нотаріуса?', 'Якщо ви недостатньо володієте німецькою – так, нотаріус зазвичай вимагає присяжного перекладача.']],
  }),
  page('uk', 'kiel', ['Кіль', 'Кілі'], {
    intro: 'Присяжний перекладач у Кілі – з окремим номером офісу +49 15567 478943 (телефон і WhatsApp): завірені переклади з української на німецьку для відомства у справах іноземців, Jobcenter, РАЦСу, судів та університету Кіля, а також усні перекладачі по всьому Шлезвіг-Гольштейну.',
    local: ['Типові ситуації в Кілі', '• Посвідка на проживання та Jobcenter: свідоцтва, дипломи, трудові книжки\n• Моряки, суднобудівники та логісти: дипломи й сертифікати\n• Студенти та науковці університету Кіля (CAU)\n• Пацієнти та клініки, наприклад UKSH: медичний перекладач\n• Клієнти з Ноймюнстера, Рендсбурга, Еккернферде та Плена – онлайн', [{ href: '/de/standorte/kiel/', label: 'Übersetzungsbüro Kiel (DE)' }, { href: '/de/standorte/kiel/medizinischer-dolmetscher/', label: 'Medizinischer Dolmetscher Kiel (DE)' }]],
    extra: ['Медичний та офіційний переклад', 'У лікарні пацієнт має точно розуміти діагноз і лікування. Наші медичні перекладачі в Кілі допомагають особисто або по відео. Ми також супроводжуємо зустрічі у відомстві у справах іноземців, соціальній службі, школі та суді – для суду й нотаріуса з присяжними перекладачами.', [{ href: '/de/standorte/kiel/ermaechtigter-uebersetzer/', label: 'Ermächtigter Übersetzer Kiel (DE)' }]],
    faqs: [['Як зв’язатися з офісом у Кілі?', 'Телефонуйте або пишіть у WhatsApp: +49 15567 478943, цілодобово. Візит за записом – Bothwellstraße 25.'], ['Чи є український перекладач у лікарні?', 'Так, особисто або по відео.']],
  }),
]));
