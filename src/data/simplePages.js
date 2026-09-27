// SEO copy for the simple app pages (/angebot, /termin, /bewerbung, /leistungen,
// /fachuebersetzungen) in every site language. Used by App.jsx (Helmet) and by
// scripts/prerender-seo.mjs (static HTML), so the <title>, description and
// prerendered text match the language of the URL instead of always German.
const BRAND = 'NOON. Sprachdienst';

export const SIMPLE_PAGE_META = {
  '/angebot': {
    de: {
      title: `Kostenloses Angebot anfordern | ${BRAND}`,
      description: `Senden Sie Ihre Anfrage für Übersetzung oder Dolmetschen. ${BRAND} prüft Ihre Angaben und erstellt ein kostenloses Angebot.`,
      heading: 'Kostenloses Angebot anfordern',
      text: 'Senden Sie uns Ihre Unterlagen und Angaben zu Ihrem Übersetzungs- oder Dolmetschauftrag. Wir melden uns mit einem passenden Angebot bei Ihnen.',
    },
    en: {
      title: `Request a free quote | ${BRAND}`,
      description: `Send your request for translation or interpreting. ${BRAND} reviews your details and prepares a free, no-obligation quote.`,
      heading: 'Request a free quote',
      text: 'Send us your documents and the details of your translation or interpreting job. We will get back to you with a suitable quote.',
    },
    ar: {
      title: `اطلب عرض سعر مجاني | ${BRAND}`,
      description: `أرسل طلبك للترجمة أو الترجمة الفورية. يراجع ${BRAND} بياناتك ويعد لك عرض سعر مجانياً دون أي التزام.`,
      heading: 'اطلب عرض سعر مجاني',
      text: 'أرسل لنا مستنداتك وتفاصيل طلب الترجمة أو الترجمة الفورية، وسنتواصل معك بعرض سعر مناسب.',
    },
    tr: {
      title: `Ücretsiz teklif isteyin | ${BRAND}`,
      description: `Çeviri veya tercümanlık talebinizi gönderin. ${BRAND} bilgilerinizi inceler ve size ücretsiz bir teklif hazırlar.`,
      heading: 'Ücretsiz teklif isteyin',
      text: 'Belgelerinizi ve çeviri ya da tercümanlık işinizin ayrıntılarını bize gönderin. Size uygun bir teklifle geri dönüş yapacağız.',
    },
    ru: {
      title: `Бесплатный расчёт стоимости | ${BRAND}`,
      description: `Отправьте запрос на письменный или устный перевод. ${BRAND} проверит данные и подготовит бесплатное предложение.`,
      heading: 'Запросить бесплатное предложение',
      text: 'Отправьте нам документы и детали заказа на письменный или устный перевод. Мы свяжемся с вами с подходящим предложением.',
    },
    fr: {
      title: `Demander un devis gratuit | ${BRAND}`,
      description: `Envoyez votre demande de traduction ou d’interprétariat. ${BRAND} examine vos informations et établit un devis gratuit.`,
      heading: 'Demander un devis gratuit',
      text: 'Envoyez-nous vos documents et les détails de votre projet de traduction ou d’interprétariat. Nous vous répondrons avec un devis adapté.',
    },
    uk: {
      title: `Безкоштовний розрахунок вартості | ${BRAND}`,
      description: `Надішліть запит на письмовий або усний переклад. ${BRAND} перевірить дані та підготує безкоштовну пропозицію.`,
      heading: 'Отримати безкоштовну пропозицію',
      text: 'Надішліть нам документи та деталі замовлення на письмовий або усний переклад. Ми зв’яжемося з вами з відповідною пропозицією.',
    },
  },
  '/termin': {
    de: {
      title: `Termin anfragen | ${BRAND}`,
      description: `Fragen Sie einen Termin für Dolmetschen, Übersetzung oder eine Beratung bei ${BRAND} an.`,
      heading: 'Termin anfragen',
      text: 'Teilen Sie uns Ihren Wunschtermin und die Anforderungen Ihres Auftrags mit. Wir prüfen die Verfügbarkeit und melden uns zeitnah.',
    },
    en: {
      title: `Book an appointment | ${BRAND}`,
      description: `Request an appointment for interpreting, translation or a consultation with ${BRAND}.`,
      heading: 'Book an appointment',
      text: 'Tell us your preferred date and the requirements of your assignment. We check availability and get back to you promptly.',
    },
    ar: {
      title: `حجز موعد | ${BRAND}`,
      description: `اطلب موعداً للترجمة الفورية أو الترجمة أو الاستشارة لدى ${BRAND}.`,
      heading: 'حجز موعد',
      text: 'أخبرنا بالموعد المفضل لديك ومتطلبات طلبك، وسنتحقق من التوفر ونتواصل معك في أقرب وقت.',
    },
    tr: {
      title: `Randevu isteyin | ${BRAND}`,
      description: `${BRAND} üzerinden tercümanlık, çeviri veya danışmanlık için randevu isteyin.`,
      heading: 'Randevu isteyin',
      text: 'Tercih ettiğiniz tarihi ve işinizin gereksinimlerini bize bildirin. Uygunluğu kontrol edip en kısa sürede size dönüş yapacağız.',
    },
    ru: {
      title: `Записаться на встречу | ${BRAND}`,
      description: `Запишитесь на устный перевод, письменный перевод или консультацию в ${BRAND}.`,
      heading: 'Записаться на встречу',
      text: 'Сообщите нам желаемую дату и требования к заказу. Мы проверим наличие переводчика и быстро свяжемся с вами.',
    },
    fr: {
      title: `Prendre rendez-vous | ${BRAND}`,
      description: `Demandez un rendez-vous pour un interprétariat, une traduction ou un conseil auprès de ${BRAND}.`,
      heading: 'Prendre rendez-vous',
      text: 'Indiquez-nous la date souhaitée et les exigences de votre mission. Nous vérifions la disponibilité et revenons vers vous rapidement.',
    },
    uk: {
      title: `Записатися на зустріч | ${BRAND}`,
      description: `Запишіться на усний переклад, письмовий переклад або консультацію в ${BRAND}.`,
      heading: 'Записатися на зустріч',
      text: 'Повідомте нам бажану дату та вимоги до замовлення. Ми перевіримо доступність і швидко зв’яжемося з вами.',
    },
  },
  '/bewerbung': {
    de: {
      title: `Bewerbung einreichen | ${BRAND}`,
      description: `Bewerben Sie sich als Dolmetscher, Übersetzer oder Sprachmittler im Netzwerk von ${BRAND}.`,
      heading: 'Bewerbung einreichen',
      text: 'Werden Sie Teil unseres Netzwerks für Übersetzung und Dolmetschen. Reichen Sie Ihre Angaben und Unterlagen über das Bewerbungsformular ein.',
    },
    en: {
      title: `Apply as a translator or interpreter | ${BRAND}`,
      description: `Apply to join the ${BRAND} network as an interpreter, translator or language mediator.`,
      heading: 'Apply to join our network',
      text: 'Become part of our translation and interpreting network. Submit your details and documents through the application form.',
    },
    ar: {
      title: `انضم كمترجم أو مترجم فوري | ${BRAND}`,
      description: `قدّم طلبك للانضمام إلى شبكة ${BRAND} كمترجم فوري أو مترجم تحريري أو وسيط لغوي.`,
      heading: 'قدّم طلب الانضمام',
      text: 'كن جزءاً من شبكتنا للترجمة والترجمة الفورية، وأرسل بياناتك ومستنداتك عبر نموذج التقديم.',
    },
    tr: {
      title: `Çevirmen veya tercüman olarak başvurun | ${BRAND}`,
      description: `${BRAND} ağına tercüman, çevirmen veya dil aracısı olarak katılmak için başvurun.`,
      heading: 'Başvurunuzu gönderin',
      text: 'Çeviri ve tercümanlık ağımızın bir parçası olun. Bilgilerinizi ve belgelerinizi başvuru formu üzerinden gönderin.',
    },
    ru: {
      title: `Вакансии для переводчиков | ${BRAND}`,
      description: `Подайте заявку, чтобы стать устным или письменным переводчиком в сети ${BRAND}.`,
      heading: 'Подать заявку',
      text: 'Станьте частью нашей сети письменных и устных переводчиков. Отправьте свои данные и документы через форму заявки.',
    },
    fr: {
      title: `Postuler comme traducteur ou interprète | ${BRAND}`,
      description: `Rejoignez le réseau ${BRAND} en tant qu’interprète, traducteur ou médiateur linguistique.`,
      heading: 'Envoyer votre candidature',
      text: 'Rejoignez notre réseau de traduction et d’interprétariat. Transmettez vos informations et documents via le formulaire de candidature.',
    },
    uk: {
      title: `Вакансії для перекладачів | ${BRAND}`,
      description: `Подайте заявку, щоб стати усним або письмовим перекладачем у мережі ${BRAND}.`,
      heading: 'Подати заявку',
      text: 'Станьте частиною нашої мережі письмових та усних перекладачів. Надішліть свої дані та документи через форму заявки.',
    },
  },
  '/leistungen': {
    de: {
      title: `Leistungen für Übersetzung und Dolmetschen | ${BRAND}`,
      description: `Entdecken Sie die Leistungen von ${BRAND}: beglaubigte Übersetzungen, Fachübersetzungen und Dolmetschen in über 190 Sprachen.`,
      heading: 'Unsere Leistungen',
      text: `${BRAND} unterstützt Sie mit beglaubigten Übersetzungen, Fachübersetzungen und professionellen Dolmetschleistungen.`,
    },
    en: {
      title: `Translation and interpreting services | ${BRAND}`,
      description: `Explore the services of ${BRAND}: certified translations, specialist translations and interpreting in more than 190 languages.`,
      heading: 'Our services',
      text: `${BRAND} supports you with certified translations, specialist translations and professional interpreting.`,
    },
    ar: {
      title: `خدمات الترجمة والترجمة الفورية | ${BRAND}`,
      description: `تعرّف على خدمات ${BRAND}: ترجمات معتمدة وترجمات متخصصة وترجمة فورية بأكثر من 190 لغة.`,
      heading: 'خدماتنا',
      text: `يدعمك ${BRAND} بالترجمات المعتمدة والترجمات المتخصصة وخدمات الترجمة الفورية الاحترافية.`,
    },
    tr: {
      title: `Çeviri ve tercümanlık hizmetleri | ${BRAND}`,
      description: `${BRAND} hizmetlerini keşfedin: 190'dan fazla dilde yeminli çeviri, uzmanlık çevirisi ve tercümanlık.`,
      heading: 'Hizmetlerimiz',
      text: `${BRAND}, yeminli çeviriler, uzmanlık çevirileri ve profesyonel tercümanlık hizmetleriyle yanınızda.`,
    },
    ru: {
      title: `Услуги письменного и устного перевода | ${BRAND}`,
      description: `Услуги ${BRAND}: заверенные переводы, специализированные переводы и устный перевод более чем на 190 языков.`,
      heading: 'Наши услуги',
      text: `${BRAND} выполняет заверенные и специализированные переводы и предоставляет профессиональных устных переводчиков.`,
    },
    fr: {
      title: `Services de traduction et d’interprétariat | ${BRAND}`,
      description: `Découvrez les services de ${BRAND} : traductions certifiées, traductions spécialisées et interprétariat dans plus de 190 langues.`,
      heading: 'Nos services',
      text: `${BRAND} vous accompagne avec des traductions certifiées, des traductions spécialisées et des services d’interprétariat professionnels.`,
    },
    uk: {
      title: `Послуги письмового та усного перекладу | ${BRAND}`,
      description: `Послуги ${BRAND}: засвідчені переклади, фахові переклади та усний переклад понад 190 мовами.`,
      heading: 'Наші послуги',
      text: `${BRAND} виконує засвідчені та фахові переклади й надає професійних усних перекладачів.`,
    },
  },
  '/fachuebersetzungen': {
    de: {
      title: `Fachübersetzungen | ${BRAND}`,
      description: 'Fachübersetzungen für Recht, Medizin, Technik, Wirtschaft und weitere Bereiche durch qualifizierte Sprachprofis.',
      heading: 'Fachübersetzungen',
      text: 'Wir vermitteln qualifizierte Fachübersetzer für anspruchsvolle Inhalte aus Recht, Medizin, Technik, Wirtschaft und weiteren Fachgebieten.',
    },
    en: {
      title: `Specialist translations | ${BRAND}`,
      description: 'Specialist translations for law, medicine, engineering, business and other fields by qualified language professionals.',
      heading: 'Specialist translations',
      text: 'We provide qualified specialist translators for demanding content in law, medicine, engineering, business and other fields.',
    },
    ar: {
      title: `الترجمات المتخصصة | ${BRAND}`,
      description: 'ترجمات متخصصة في القانون والطب والهندسة والاقتصاد ومجالات أخرى على يد مترجمين مؤهلين.',
      heading: 'الترجمات المتخصصة',
      text: 'نوفر مترجمين متخصصين مؤهلين للنصوص الدقيقة في القانون والطب والهندسة والاقتصاد وغيرها من المجالات.',
    },
    tr: {
      title: `Uzmanlık çevirileri | ${BRAND}`,
      description: 'Hukuk, tıp, mühendislik, ekonomi ve diğer alanlarda nitelikli dil uzmanlarından uzmanlık çevirileri.',
      heading: 'Uzmanlık çevirileri',
      text: 'Hukuk, tıp, mühendislik, ekonomi ve diğer alanlardaki zorlu metinler için nitelikli uzman çevirmenler sağlıyoruz.',
    },
    ru: {
      title: `Специализированные переводы | ${BRAND}`,
      description: 'Специализированные переводы в области права, медицины, техники, экономики и других сфер от квалифицированных переводчиков.',
      heading: 'Специализированные переводы',
      text: 'Мы предоставляем квалифицированных переводчиков для сложных текстов в области права, медицины, техники, экономики и других сфер.',
    },
    fr: {
      title: `Traductions spécialisées | ${BRAND}`,
      description: 'Traductions spécialisées en droit, médecine, ingénierie, économie et autres domaines par des professionnels qualifiés.',
      heading: 'Traductions spécialisées',
      text: 'Nous mettons à disposition des traducteurs spécialisés qualifiés pour les contenus exigeants en droit, médecine, ingénierie, économie et autres domaines.',
    },
    uk: {
      title: `Фахові переклади | ${BRAND}`,
      description: 'Фахові переклади у сферах права, медицини, техніки, економіки та інших галузях від кваліфікованих перекладачів.',
      heading: 'Фахові переклади',
      text: 'Ми надаємо кваліфікованих фахових перекладачів для складних текстів у сферах права, медицини, техніки, економіки та інших галузях.',
    },
  },
};

export const SIMPLE_PAGE_CTA = {
  de: 'Kontakt aufnehmen',
  en: 'Get in touch',
  ar: 'تواصل معنا',
  tr: 'Bize ulaşın',
  ru: 'Связаться с нами',
  fr: 'Nous contacter',
  uk: 'Зв’язатися з нами',
};

export function getSimplePageMeta(path, lang) {
  const page = SIMPLE_PAGE_META[path];
  if (!page) return null;
  return page[lang] || page.de;
}
