import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardList,
  Code2,
  Cloud,
  Factory,
  FileText,
  FlaskConical,
  Gamepad2,
  Globe2,
  Handshake,
  Headphones,
  HeartPulse,
  Landmark,
  Languages,
  LockKeyhole,
  MapPin,
  Pill,
  Scale,
  Send,
  ShieldCheck,
  Smartphone,
  Stamp,
  Timer,
  UsersRound,
  Video,
  Wrench,
} from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { getServiceNavigation, serviceUi } from '../data/serviceContent';

const SIDE_LABELS = {
  de: { interpreting: 'Dolmetschen', translation: 'Beglaubigte Übersetzungen', specialist: 'Fachübersetzung', faq: 'FAQ', close: 'Menü schließen' },
  en: { interpreting: 'Interpreting', translation: 'Certified translations', specialist: 'Specialist translation', faq: 'FAQ', close: 'Close menu' },
  ar: { interpreting: 'ترجمة فورية', translation: 'ترجمات معتمدة', specialist: 'ترجمة متخصصة', faq: 'الأسئلة الشائعة', close: 'إغلاق القائمة' },
  tr: { interpreting: 'Tercümanlık', translation: 'Yeminli çeviriler', specialist: 'Uzman çeviri', faq: 'SSS', close: 'Menüyü kapat' },
  ru: { interpreting: 'Устный перевод', translation: 'Заверенные переводы', specialist: 'Профильный перевод', faq: 'FAQ', close: 'Закрыть меню' },
  fr: { interpreting: 'Interprétation', translation: 'Traductions certifiées', specialist: 'Traduction spécialisée', faq: 'FAQ', close: 'Fermer le menu' },
  uk: { interpreting: 'Усний переклад', translation: 'Засвідчені переклади', specialist: 'Фаховий переклад', faq: 'FAQ', close: 'Закрити меню' },
};

const VISUAL_COPY = {
  de: {
    overview: 'Überblick',
    highlights: 'Wichtig für Sie',
    typical: 'Typische Inhalte',
    details: 'Aus dem Leistungsprofil',
    process: 'So läuft es ab',
    ctaSub: 'Kostenlos, unverbindlich und mit klarer Rückmeldung zum Ablauf.',
    request: 'Anfrage senden',
    requestText: 'Sprache, Unterlagen, Ort oder Termin kurz mitteilen.',
    review: 'Angebot erhalten',
    reviewText: 'Wir prüfen Umfang, Fachgebiet, Termin und Verfügbarkeit.',
    delivery: 'Umsetzung starten',
    deliveryText: 'Sie bestätigen das Angebot, wir organisieren Übersetzung oder Dolmetscher.',
    trustA: 'Fachlich geprüft',
    trustB: '190+ Sprachen',
    trustC: 'Deutschlandweit',
    interpretingLanguages: '190+ Sprachen',
    markLanguages: 'Sprachen',
    markQuality: 'Qualität',
  },
  en: {
    overview: 'Overview',
    highlights: 'What matters',
    typical: 'Typical content',
    details: 'Service profile',
    process: 'How it works',
    ctaSub: 'Free, non-binding and with a clear reply about the next steps.',
    request: 'Send request',
    requestText: 'Share language, documents, location or appointment details.',
    review: 'Receive quote',
    reviewText: 'We check scope, subject area, timing and availability.',
    delivery: 'Start service',
    deliveryText: 'You confirm the offer, we arrange the translation or interpreter.',
    trustA: 'Expert checked',
    trustB: '190+ languages',
    trustC: 'Across Germany',
    interpretingLanguages: '190+ languages',
    markLanguages: 'Languages',
    markQuality: 'Quality',
  },
  ar: {
    overview: 'نظرة عامة',
    highlights: 'الأهم لك',
    typical: 'محتوى نموذجي',
    details: 'ملف الخدمة',
    process: 'طريقة العمل',
    ctaSub: 'مجاني وغير ملزم مع رد واضح حول الخطوات التالية.',
    request: 'إرسال الطلب',
    requestText: 'أرسل اللغة والمستندات أو المكان أو تفاصيل الموعد باختصار.',
    review: 'استلام العرض',
    reviewText: 'نراجع النطاق والمجال والوقت والتوفر.',
    delivery: 'بدء التنفيذ',
    deliveryText: 'تؤكد العرض، ونحن ننظم الترجمة أو المترجم الفوري.',
    trustA: 'مراجعة تخصصية',
    trustB: '190+ لغة',
    trustC: 'في كل ألمانيا',
    interpretingLanguages: '190+ لغة',
    markLanguages: 'لغات',
    markQuality: 'جودة',
  },
  tr: {
    overview: 'Genel bakış',
    highlights: 'Sizin için önemli',
    typical: 'Tipik içerikler',
    details: 'Hizmet profili',
    process: 'Süreç',
    ctaSub: 'Ücretsiz, bağlayıcı değil ve sonraki adımlar net şekilde açıklanır.',
    request: 'Talep gönder',
    requestText: 'Dil, belge, yer veya randevu bilgilerini kısaca paylaşın.',
    review: 'Teklif alın',
    reviewText: 'Kapsamı, alanı, zamanı ve müsaitliği kontrol ederiz.',
    delivery: 'Hizmeti başlat',
    deliveryText: 'Teklifi onaylarsınız, biz çeviri veya tercümanı organize ederiz.',
    trustA: 'Uzman kontrolü',
    trustB: '190+ dil',
    trustC: 'Almanya genelinde',
    interpretingLanguages: '190+ dil',
    markLanguages: 'Dil',
    markQuality: 'Kalite',
  },
  ru: {
    overview: 'Обзор',
    highlights: 'Что важно',
    typical: 'Типичные материалы',
    details: 'Профиль услуги',
    process: 'Как это работает',
    ctaSub: 'Бесплатно, без обязательств и с понятным ответом о дальнейших шагах.',
    request: 'Отправить запрос',
    requestText: 'Кратко укажите язык, документы, место или детали встречи.',
    review: 'Получить предложение',
    reviewText: 'Мы проверяем объем, тематику, сроки и доступность.',
    delivery: 'Начать выполнение',
    deliveryText: 'Вы подтверждаете предложение, мы организуем перевод или устного переводчика.',
    trustA: 'Проверка экспертом',
    trustB: '190+ языков',
    trustC: 'По всей Германии',
    interpretingLanguages: '190+ языков',
    markLanguages: 'Языки',
    markQuality: 'Качество',
  },
  fr: {
    overview: 'Aperçu',
    highlights: 'L’essentiel',
    typical: 'Contenus typiques',
    details: 'Profil du service',
    process: 'Déroulement',
    ctaSub: 'Gratuit, sans engagement et avec un retour clair sur les prochaines étapes.',
    request: 'Envoyer la demande',
    requestText: 'Indiquez la langue, les documents, le lieu ou le rendez-vous.',
    review: 'Recevoir une offre',
    reviewText: 'Nous vérifions le volume, le domaine, le délai et la disponibilité.',
    delivery: 'Lancer le service',
    deliveryText: 'Vous confirmez l’offre, nous organisons la traduction ou l’interprète.',
    trustA: 'Contrôle expert',
    trustB: '190+ langues',
    trustC: 'Dans toute l’Allemagne',
    interpretingLanguages: '190+ langues',
    markLanguages: 'Langues',
    markQuality: 'Qualité',
  },
  uk: {
    overview: 'Огляд',
    highlights: 'Важливо для вас',
    typical: 'Типовий зміст',
    details: 'Профіль послуги',
    process: 'Як це працює',
    ctaSub: 'Безкоштовно, без зобов’язань і з чіткою відповіддю щодо наступних кроків.',
    request: 'Надіслати запит',
    requestText: 'Коротко вкажіть мову, документи, місце або деталі зустрічі.',
    review: 'Отримати пропозицію',
    reviewText: 'Ми перевіряємо обсяг, тематику, терміни та доступність.',
    delivery: 'Почати виконання',
    deliveryText: 'Ви підтверджуєте пропозицію, ми організовуємо переклад або усного перекладача.',
    trustA: 'Фахова перевірка',
    trustB: '190+ мов',
    trustC: 'По всій Німеччині',
    interpretingLanguages: '190+ мов',
    markLanguages: 'Мови',
    markQuality: 'Якість',
  },
};

const SERVICE_IMAGES = {
  interpreting: '/assets/service-scenes/male-interpreting-scene.webp',
  translation: '/assets/service-scenes/certified-translation-scene.png',
  specialist: '/assets/service-scenes/specialist-translation-scene.png',
};

const SERVICE_THEMES = {
  'dolmetschen-overview': { icon: Headphones, tone: 'navy' },
  simultandolmetscher: { icon: Languages, tone: 'navy' },
  verhandlungsdolmetscher: { icon: Handshake, tone: 'navy' },
  'video-telefondolmetscher': { icon: Video, tone: 'navy' },
  'beeidigte-dolmetscher': { icon: Stamp, tone: 'navy' },
  notardolmetscher: { icon: Landmark, tone: 'navy' },
  'standesamt-dolmetscher': { icon: Building2, tone: 'navy' },
  'beglaubigte-uebersetzungen': { icon: FileText, tone: 'red' },
  'wirtschaft-finanzen': { icon: BriefcaseBusiness, tone: 'gold' },
  recht: { icon: Scale, tone: 'red' },
  ingenieurwesen: { icon: Wrench, tone: 'blue' },
  'medizin-dental': { icon: HeartPulse, tone: 'green' },
  pharmazeutik: { icon: Pill, tone: 'green' },
  literatur: { icon: BookOpen, tone: 'gold' },
  'it-software': { icon: Code2, tone: 'blue' },
  'chemie-biowissenschaften': { icon: FlaskConical, tone: 'green' },
  'industrie-produktion': { icon: Factory, tone: 'blue' },
};

const FEATURE_ICONS = [BadgeCheck, Globe2, Timer, ShieldCheck, UsersRound, ClipboardList];
const DETAIL_ICONS = [FileText, ShieldCheck, Globe2];
const RICH_SERVICE_IDS = new Set([
  'dolmetschen-overview',
  'fachuebersetzung-overview',
  'simultandolmetscher',
  'beeidigte-dolmetscher',
  'notardolmetscher',
  'standesamt-dolmetscher',
  'beglaubigte-uebersetzungen',
  'wirtschaft-finanzen',
  'recht',
  'ingenieurwesen',
  'medizin-dental',
  'pharmazeutik',
  'literatur',
  'it-software',
  'chemie-biowissenschaften',
]);
const RICH_GROUP_ICONS = [Code2, Smartphone, Gamepad2, ClipboardList, Cloud, LockKeyhole, BookOpen, FileText];
const RICH_LABELS = {
  de: {
    languagePairs: 'Häufige Sprachkombinationen',
    itProjects: 'Typische IT- & Softwareprojekte',
    internationalIt: 'Internationale Software- & IT-Projekte',
    nationwide: 'Deutschlandweit für Sie im Einsatz',
    industryProfile: 'Industrie, Produktion & Maschinenbau',
    serviceProfile: 'Leistungsprofil',
    qualityProfile: 'Qualität und Einsatz',
    processProfile: 'Ablauf und Anfrage',
    compactFields: ['Präzise Kommunikation', 'Fachlich geprüft', 'Schnelle Organisation', 'Persönliche Beratung'],
    industryFields: ['Maschinenbau', 'Automatisierung', 'Logistik', 'Qualitätsmanagement', 'Sicherheitsunterlagen', 'Exportdokumente'],
    pairs: ['Englisch–Deutsch', 'Französisch–Deutsch', 'Spanisch–Deutsch', 'Italienisch–Deutsch', 'Arabisch–Deutsch', 'Türkisch–Deutsch', 'Polnisch–Deutsch', 'Russisch–Deutsch'],
  },
  en: {
    languagePairs: 'Frequent language pairs',
    itProjects: 'Typical IT & software projects',
    internationalIt: 'International software & IT projects',
    nationwide: 'Available across Germany',
    industryProfile: 'Industry, production & mechanical engineering',
    serviceProfile: 'Service profile',
    qualityProfile: 'Quality and use',
    processProfile: 'Process and request',
    compactFields: ['Precise communication', 'Expert checked', 'Fast coordination', 'Personal advice'],
    industryFields: ['Mechanical engineering', 'Automation', 'Logistics', 'Quality management', 'Safety documents', 'Export documents'],
    pairs: ['English–German', 'French–German', 'Spanish–German', 'Italian–German', 'Arabic–German', 'Turkish–German', 'Polish–German', 'Russian–German'],
  },
  ar: {
    languagePairs: 'أزواج لغوية شائعة',
    itProjects: 'مشاريع تقنية وبرمجيات نموذجية',
    internationalIt: 'مشاريع برمجيات وتقنية دولية',
    nationwide: 'متاحون في كل ألمانيا',
    industryProfile: 'الصناعة والإنتاج والهندسة الميكانيكية',
    serviceProfile: 'ملف الخدمة',
    qualityProfile: 'الجودة والاستخدام',
    processProfile: 'الخطوات والطلب',
    compactFields: ['تواصل دقيق', 'مراجعة تخصصية', 'تنظيم سريع', 'استشارة شخصية'],
    industryFields: ['الهندسة الميكانيكية', 'الأتمتة', 'اللوجستيات', 'إدارة الجودة', 'وثائق السلامة', 'وثائق التصدير'],
    pairs: ['الإنجليزية–الألمانية', 'الفرنسية–الألمانية', 'الإسبانية–الألمانية', 'الإيطالية–الألمانية', 'العربية–الألمانية', 'التركية–الألمانية', 'البولندية–الألمانية', 'الروسية–الألمانية'],
  },
  tr: {
    languagePairs: 'Sık dil kombinasyonları',
    itProjects: 'Tipik BT ve yazılım projeleri',
    internationalIt: 'Uluslararası yazılım ve BT projeleri',
    nationwide: 'Almanya genelinde hizmet',
    industryProfile: 'Sanayi, üretim ve makine mühendisliği',
    serviceProfile: 'Hizmet profili',
    qualityProfile: 'Kalite ve kullanım',
    processProfile: 'Süreç ve talep',
    compactFields: ['Net iletişim', 'Uzman kontrolü', 'Hızlı organizasyon', 'Kişisel danışmanlık'],
    industryFields: ['Makine mühendisliği', 'Otomasyon', 'Lojistik', 'Kalite yönetimi', 'Güvenlik belgeleri', 'İhracat belgeleri'],
    pairs: ['İngilizce–Almanca', 'Fransızca–Almanca', 'İspanyolca–Almanca', 'İtalyanca–Almanca', 'Arapça–Almanca', 'Türkçe–Almanca', 'Lehçe–Almanca', 'Rusça–Almanca'],
  },
  ru: {
    languagePairs: 'Частые языковые пары',
    itProjects: 'Типичные IT- и software-проекты',
    internationalIt: 'Международные software- и IT-проекты',
    nationwide: 'Работаем по всей Германии',
    industryProfile: 'Промышленность, производство и машиностроение',
    serviceProfile: 'Профиль услуги',
    qualityProfile: 'Качество и применение',
    processProfile: 'Процесс и запрос',
    compactFields: ['Точная коммуникация', 'Проверка экспертом', 'Быстрая организация', 'Личная консультация'],
    industryFields: ['Машиностроение', 'Автоматизация', 'Логистика', 'Управление качеством', 'Документы по безопасности', 'Экспортные документы'],
    pairs: ['Английский–немецкий', 'Французский–немецкий', 'Испанский–немецкий', 'Итальянский–немецкий', 'Арабский–немецкий', 'Турецкий–немецкий', 'Польский–немецкий', 'Русский–немецкий'],
  },
  fr: {
    languagePairs: 'Combinaisons linguistiques fréquentes',
    itProjects: 'Projets IT et logiciels typiques',
    internationalIt: 'Projets logiciels et IT internationaux',
    nationwide: 'Disponible dans toute l’Allemagne',
    industryProfile: 'Industrie, production et construction mécanique',
    serviceProfile: 'Profil du service',
    qualityProfile: 'Qualité et utilisation',
    processProfile: 'Processus et demande',
    compactFields: ['Communication précise', 'Contrôle expert', 'Organisation rapide', 'Conseil personnel'],
    industryFields: ['Construction mécanique', 'Automatisation', 'Logistique', 'Gestion qualité', 'Documents de sécurité', 'Documents d’exportation'],
    pairs: ['Anglais–allemand', 'Français–allemand', 'Espagnol–allemand', 'Italien–allemand', 'Arabe–allemand', 'Turc–allemand', 'Polonais–allemand', 'Russe–allemand'],
  },
  uk: {
    languagePairs: 'Поширені мовні пари',
    itProjects: 'Типові IT- та software-проєкти',
    internationalIt: 'Міжнародні software- та IT-проєкти',
    nationwide: 'Працюємо по всій Німеччині',
    industryProfile: 'Промисловість, виробництво та машинобудування',
    serviceProfile: 'Профіль послуги',
    qualityProfile: 'Якість і застосування',
    processProfile: 'Процес і запит',
    compactFields: ['Точна комунікація', 'Фахова перевірка', 'Швидка організація', 'Особиста консультація'],
    industryFields: ['Машинобудування', 'Автоматизація', 'Логістика', 'Управління якістю', 'Документи з безпеки', 'Експортні документи'],
    pairs: ['Англійська–німецька', 'Французька–німецька', 'Іспанська–німецька', 'Італійська–німецька', 'Арабська–німецька', 'Турецька–німецька', 'Польська–німецька', 'Російська–німецька'],
  },
};

const TEXT_FIXES = [
  [/Pr\?senz/g, 'Präsenz'],
  [/\?ber/g, 'Über'],
  [/Gesch\?fts/g, 'Geschäfts'],
  [/Vertragsabschl\?sse/g, 'Vertragsabschlüsse'],
  [/Beh\?rden/g, 'Behörden'],
  [/Kaufvertr\?ge/g, 'Kaufverträge'],
  [/Ehevertr\?ge/g, 'Eheverträge'],
  [/Gesellschaftsgr\?ndungen/g, 'Gesellschaftsgründungen'],
  [/F\?hrerscheine/g, 'Führerscheine'],
  [/Beschl\?sse/g, 'Beschlüsse'],
  [/Eheschlie\?ungen/g, 'Eheschließungen'],
  [/Beh\?rdentermine/g, 'Behördentermine'],
  [/Anh\?rungen/g, 'Anhörungen'],
];

function normalizeText(text = '') {
  return TEXT_FIXES.reduce((value, [pattern, replacement]) => value.replace(pattern, replacement), String(text));
}

function shorten(text = '', max = 260) {
  const clean = normalizeText(text).replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const boundary = clean.lastIndexOf('.', max);
  return `${clean.slice(0, boundary > 130 ? boundary + 1 : max).trim()}…`;
}

function uniqueList(items) {
  return [...new Set(items.filter(Boolean).map((item) => normalizeText(item).replace(/\s+/g, ' ').trim()))];
}

function getVisualContent(active, copy) {
  const paragraphs = uniqueList(active?.paragraphs || [active?.text]);
  const longParagraphs = paragraphs.filter((item) => item.length > 105);
  const shortItems = paragraphs.filter((item) => item.length <= 105 && !item.includes('___'));
  const examples = uniqueList([...(active?.examples || []), ...shortItems]).slice(0, 6);
  const highlights = [
    active?.group === 'interpreting' ? copy.interpretingLanguages : copy.trustB,
    copy.trustA,
    copy.trustC,
  ];

  return {
    lead: shorten(longParagraphs[0] || active?.text || '', 390),
    detailParagraphs: longParagraphs.slice(1, 3).map((item) => shorten(item, 260)),
    examples: examples.length ? examples : highlights,
    highlights,
  };
}

function getOfferHref(lang) {
  return lang === 'de' ? '/angebot' : `/${lang}/angebot`;
}

function getServiceImage(active) {
  return SERVICE_IMAGES[active?.group] || SERVICE_IMAGES.specialist;
}

function getServiceTheme(active) {
  return SERVICE_THEMES[active?.id] || SERVICE_THEMES[active?.group] || { icon: BadgeCheck, tone: 'navy' };
}

function buildGroupedItems(paragraphs, groups) {
  return groups.map(([titleIndex, start, end], index) => ({
    title: normalizeText(paragraphs[titleIndex] || ''),
    items: paragraphs.slice(start, end).map(normalizeText).filter(Boolean),
    Icon: RICH_GROUP_ICONS[index] || BadgeCheck,
  })).filter((group) => group.title);
}

function chunkItems(items, size = 4) {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

function isListHeading(text = '') {
  return /^(wir übersetzen|typische|dazu gehören|häufig|so läuft|these|typical|we translate|nous traduisons|nous proposons|نترجم|تشمل|نموذجية|типичные|ми перекладаємо|çevirdiğimiz)/i.test(text.trim());
}

function isQuestionText(text = '') {
  return /[?؟]\s*$/.test(text.trim());
}

function getUsableShortItems(paragraphs, active, richLabels) {
  return uniqueList([
    ...(active?.examples || []),
    ...paragraphs.filter((item) => item.length <= 125 && !isListHeading(item) && !isQuestionText(item)),
    ...richLabels.compactFields,
  ]).slice(0, 18);
}

function buildGenericGroups(paragraphs, active, visualCopy, richLabels) {
  const shortItems = getUsableShortItems(paragraphs, active, richLabels);
  const titles = [
    visualCopy.typical,
    richLabels.serviceProfile,
    richLabels.qualityProfile,
    richLabels.processProfile,
  ];

  return chunkItems(shortItems, 4).slice(0, 4).map((items, index) => ({
    title: titles[index] || visualCopy.highlights,
    items,
    Icon: RICH_GROUP_ICONS[index] || BadgeCheck,
  })).filter((group) => group.items.length);
}

function getLongParagraphs(paragraphs) {
  return paragraphs.filter((item) => item.length > 125 && !isQuestionText(item));
}

function getCtaParagraph(paragraphs, visualCopy) {
  const questionIndex = paragraphs.findIndex(isQuestionText);
  if (questionIndex >= 0) {
    return [paragraphs[questionIndex], paragraphs[questionIndex + 1]]
      .filter(Boolean)
      .join(' ');
  }
  const longParagraphs = getLongParagraphs(paragraphs);
  return longParagraphs[longParagraphs.length - 1] || visualCopy.ctaSub;
}

function getContentSegments(active, visualCopy, lang = 'de') {
  const richLabels = RICH_LABELS[lang] || RICH_LABELS.de;
  const paragraphs = (active?.paragraphs || []).map(normalizeText);

  if (active?.id === 'it-software') {
    return buildGroupedItems(paragraphs, [
      [3, 4, 8],
      [8, 9, 12],
      [12, 13, 16],
      [16, 17, 20],
      [20, 21, 24],
      [24, 25, 28],
      [28, 29, 32],
      [32, 33, 36],
    ]);
  }

  if (active?.id === 'industrie-produktion') {
    return [
      { title: paragraphs[1] || visualCopy.typical, items: paragraphs.slice(2, 8), Icon: Factory },
      { title: visualCopy.highlights, items: richLabels.industryFields, Icon: Wrench },
    ];
  }

  const segments = [];
  for (let index = 0; index < paragraphs.length; index += 1) {
    const text = paragraphs[index];
    const next = paragraphs[index + 1];
    const looksLikeHeading = isListHeading(text) || (text.length <= 85 && next && next.length <= 130 && !isQuestionText(text));
    if (!looksLikeHeading) continue;

    const items = [];
    for (let cursor = index + 1; cursor < paragraphs.length; cursor += 1) {
      const item = paragraphs[cursor];
      if (!item || isQuestionText(item)) break;
      if (item.length > 150) break;
      if (isListHeading(item) && items.length) break;
      items.push(item);
    }

    if (items.length >= 2) {
      segments.push({
        title: text.replace(/:$/, ''),
        items: uniqueList(items).slice(0, 8),
        Icon: RICH_GROUP_ICONS[segments.length] || BadgeCheck,
      });
      index += items.length;
    }
  }

  if (segments.length) return segments.slice(0, 8);

  return chunkItems(getUsableShortItems(paragraphs, active, richLabels), 4).slice(0, 4).map((items, index) => ({
    title: [visualCopy.typical, richLabels.serviceProfile, richLabels.qualityProfile, richLabels.processProfile][index] || visualCopy.highlights,
    items,
    Icon: RICH_GROUP_ICONS[index] || BadgeCheck,
  }));
}

function getRichServiceData(active, visualCopy, lang = 'de') {
  if (!RICH_SERVICE_IDS.has(active?.id)) return null;

  const richLabels = RICH_LABELS[lang] || RICH_LABELS.de;
  const paragraphs = (active?.paragraphs || []).map(normalizeText);
  const isIt = active.id === 'it-software';
  const ctaText = normalizeText(active?.cta || visualCopy.request);

  if (isIt) {
    const groups = buildGroupedItems(paragraphs, [
      [3, 4, 8],
      [8, 9, 12],
      [12, 13, 16],
      [16, 17, 20],
      [20, 21, 24],
      [24, 25, 28],
      [28, 29, 32],
      [32, 33, 36],
    ]);

    return {
      title: normalizeText(active.label || active.title),
      introTitle: normalizeText(active.title),
      intro: paragraphs[0],
      competenceTitle: visualCopy.highlights,
      competence: paragraphs[1],
      groupsTitle: paragraphs[2] || visualCopy.typical,
      groups,
      sideCards: [
        {
          Icon: Smartphone,
          title: richLabels.itProjects,
          items: groups.slice(0, 6).map((group) => group.title),
        },
        {
          Icon: Globe2,
          title: richLabels.languagePairs,
          items: richLabels.pairs,
        },
      ],
      wideBlocks: [
        {
          Icon: Cloud,
          title: richLabels.internationalIt,
          text: paragraphs[1],
          checks: groups.slice(0, 8).map((group) => group.title),
        },
        {
          Icon: MapPin,
          title: richLabels.nationwide,
          text: paragraphs[36],
          checks: [visualCopy.trustC, visualCopy.trustA, visualCopy.trustB],
        },
      ],
      ctaText,
      ctaParagraph: paragraphs[37],
      footerTiles: groups.slice(0, 6),
    };
  }

  if (active.id === 'industrie-produktion') {
    const typicalItems = paragraphs.slice(2, 8).map(normalizeText).filter(Boolean);
    const groups = [
      {
        title: paragraphs[1] || visualCopy.typical,
        items: typicalItems,
        Icon: ClipboardList,
      },
      {
        title: visualCopy.highlights,
        items: richLabels.industryFields,
        Icon: Factory,
      },
    ];

    return {
      title: normalizeText(active.label || active.title),
      introTitle: normalizeText(active.title),
      intro: paragraphs[0],
      competenceTitle: visualCopy.highlights,
      competence: paragraphs[8],
      groupsTitle: paragraphs[1] || visualCopy.typical,
      groups,
      sideCards: [
        {
          Icon: Factory,
          title: visualCopy.typical,
          items: typicalItems.slice(0, 6),
        },
        {
          Icon: Globe2,
          title: richLabels.languagePairs,
          items: richLabels.pairs,
        },
      ],
      wideBlocks: [
        {
          Icon: Factory,
          title: richLabels.industryProfile,
          text: paragraphs[8],
          checks: richLabels.industryFields,
        },
        {
          Icon: MapPin,
          title: richLabels.nationwide,
          text: paragraphs[9],
          checks: [visualCopy.trustC, visualCopy.trustA, visualCopy.trustB],
        },
      ],
      ctaText,
      ctaParagraph: paragraphs[10],
      footerTiles: groups[0].items.slice(0, 6).map((item, index) => ({
        title: item,
        items: [visualCopy.trustA],
        Icon: RICH_GROUP_ICONS[index] || Factory,
      })),
    };
  }

  const activeTheme = getServiceTheme(active);
  const longParagraphs = getLongParagraphs(paragraphs);
  const groups = buildGenericGroups(paragraphs, active, visualCopy, richLabels);
  const shortItems = getUsableShortItems(paragraphs, active, richLabels);
  const wideParagraphs = longParagraphs.slice(2, 4);

  return {
    title: normalizeText(active.label || active.title),
    introTitle: normalizeText(active.title),
    intro: longParagraphs[0] || paragraphs[0] || active?.text || '',
    competenceTitle: visualCopy.highlights,
    competence: longParagraphs[1] || paragraphs[1] || visualCopy.ctaSub,
    groupsTitle: isListHeading(paragraphs[1]) ? paragraphs[1] : visualCopy.typical,
    groups,
    sideCards: [
      {
        Icon: activeTheme.icon || BadgeCheck,
        title: richLabels.serviceProfile,
        items: shortItems.slice(0, 6),
      },
      {
        Icon: Globe2,
        title: active?.group === 'interpreting' ? visualCopy.interpretingLanguages : richLabels.languagePairs,
        items: active?.group === 'interpreting' ? [visualCopy.trustC, visualCopy.trustA, visualCopy.ctaSub] : richLabels.pairs,
      },
    ],
    wideBlocks: [
      {
        Icon: activeTheme.icon || BadgeCheck,
        title: richLabels.qualityProfile,
        text: wideParagraphs[0] || longParagraphs[1] || visualCopy.ctaSub,
        checks: [visualCopy.trustA, visualCopy.trustB, visualCopy.trustC],
      },
      {
        Icon: MapPin,
        title: richLabels.nationwide,
        text: wideParagraphs[1] || longParagraphs[2] || longParagraphs[0] || visualCopy.ctaSub,
        checks: shortItems.slice(0, 4),
      },
    ],
    ctaText,
    ctaParagraph: getCtaParagraph(paragraphs, visualCopy),
    footerTiles: (groups.length ? groups.flatMap((group) => group.items) : shortItems).slice(0, 6).map((item, index) => ({
      title: item,
      items: [visualCopy.ctaSub],
      Icon: RICH_GROUP_ICONS[index] || BadgeCheck,
    })),
  };
}

function RichServicePanel({ active, visualCopy, lang }) {
  const rich = getRichServiceData(active, visualCopy, lang);
  if (!rich) return null;
  if (active?.id === 'it-software') {
    return <ItSoftwareSheet active={active} visualCopy={visualCopy} lang={lang} />;
  }
  if (active?.id === 'wirtschaft-finanzen') {
    return <WirtschaftFinanzenSheet active={active} visualCopy={visualCopy} lang={lang} />;
  }
  if (active?.id === 'recht') {
    return <RechtSheet active={active} visualCopy={visualCopy} lang={lang} />;
  }
  if (active?.id === 'beglaubigte-uebersetzungen') {
    return <BeglaubigteUebersetzungSheet active={active} visualCopy={visualCopy} lang={lang} />;
  }
  if (POINT_GRID_SHEETS[active?.id]) {
    return <PointGridSheet active={active} data={localizePointGridSheet(active, POINT_GRID_SHEETS[active.id], visualCopy, lang)} lang={lang} />;
  }
  if (active?.group === 'translation') {
    return <CertifiedTranslationSheet active={active} rich={rich} visualCopy={visualCopy} lang={lang} />;
  }
  if (active?.group === 'interpreting') {
    return <InterpretingSheet active={active} rich={rich} visualCopy={visualCopy} lang={lang} />;
  }
  return <SpecialistSheet active={active} rich={rich} visualCopy={visualCopy} lang={lang} />;
}

function IconBubble({ icon: Icon }) {
  return (
    <span className="pdf-icon-bubble" aria-hidden="true">
      <Icon />
    </span>
  );
}

const IT_ASSET_BASE = '/assets/it-software/';
const DOLMETSCHER_ASSET_BASE = '/assets/dolmetscher/';
const BEEIDIGTE_ASSET_BASE = '/assets/beeidigte-dolmetscher/';
const RECHT_ASSET_BASE = '/assets/recht/';
const STANDESAMT_ASSET_BASE = '/assets/standesamt-dolmetscher/';
const WIRTSCHAFT_ASSET_BASE = '/assets/wirtschaft-finanzen/';
const BEGLAUBIGTE_ASSET_BASE = '/assets/beglaubigte-uebersetzung/';
const POINT_CONTENT_ASSET_BASE = '/assets/points-content/';

const DOLMETSCHER_SHEET = {
  kicker: 'Dolmetscherdienste',
  title: 'Dolmetschen',
  introRows: [
    {
      asset: 'mannschaft.png',
      text: 'Professionelle Dolmetscherdienste für Unternehmen, Behörden, Gerichte, medizinische Einrichtungen und Privatpersonen.',
    },
    {
      asset: 'platzhalter.png',
      text: 'Seit 2019 unterstützt unser Dolmetscher- und Übersetzungsbüro Mandanten in Osnabrück, Bielefeld, Kiel, Mainz, Stuttgart, Berlin sowie bundesweit – auf Wunsch auch international.',
    },
    {
      asset: 'save-the-world.png',
      text: 'Wir vermitteln qualifizierte Dolmetscher in über 190 Sprachen für Präsenztermine, Online-Meetings, Videokonferenzen und Telefondolmetschen – schnell, zuverlässig und professionell.',
    },
  ],
  benefits: [
    ['ÜBER 190 SPRACHEN', 'Dolmetscher für nahezu alle Sprachen und Dialekte weltweit.', 'save-the-world.png'],
    ['ERFAHRENE DOLMETSCHER', 'Qualifizierte und geprüfte Dolmetscher mit langjähriger Erfahrung und hoher Fachkompetenz.', 'benutzer.png'],
    ['FLEXIBLE EINSATZFORMEN', 'Kurzfristige Einsätze, individuelle Terminplanung und bundesweite Verfügbarkeit.', 'flexibel.png'],
  ],
  processTitle: 'So geht’s eine Dolmetscher Bestellung',
  process: [
    ['1', 'Anfrage per E-Mail senden', 'Sprache, Auftragsort und Uhrzeit mitteilen.', 'email.png'],
    ['2', 'Angebot erhalten & bestätigen', 'Preis prüfen und Angebot bestätigen.', 'bestatigung.png'],
    ['3', 'Dolmetscher vor Ort', 'Der Dolmetscher ist zum vereinbarten Termin für Sie vor Ort.', 'ubersetzer.png'],
  ],
  cta: 'Kostenlose Dolmetscheranfrage',
};

const DOLMETSCHER_SHEET_BY_LANG = {
  de: DOLMETSCHER_SHEET,
  en: {
    kicker: 'Interpreting services',
    title: 'Interpreting',
    introRows: [
      {
        asset: 'mannschaft.png',
        text: 'Professional interpreting services for companies, authorities, courts, medical institutions and private clients.',
      },
      {
        asset: 'platzhalter.png',
        text: 'Since 2019, our interpreting and translation office has supported clients in Osnabrück, Bielefeld, Kiel, Mainz, Stuttgart, Berlin and throughout Germany – internationally as well on request.',
      },
      {
        asset: 'save-the-world.png',
        text: 'We arrange qualified interpreters in over 190 languages for on-site appointments, online meetings, video conferences and telephone interpreting – quickly, reliably and professionally.',
      },
    ],
    benefits: [
      ['OVER 190 LANGUAGES', 'Interpreters for almost all languages and dialects worldwide.', 'save-the-world.png'],
      ['EXPERIENCED INTERPRETERS', 'Qualified and checked interpreters with many years of experience and strong subject expertise.', 'benutzer.png'],
      ['FLEXIBLE ASSIGNMENT TYPES', 'Short-notice assignments, individual appointment planning and nationwide availability.', 'flexibel.png'],
    ],
    processTitle: 'How an interpreter booking works',
    process: [
      ['1', 'Send request by e-mail', 'Provide language, assignment location and time.', 'email.png'],
      ['2', 'Receive and confirm offer', 'Check the price and confirm the offer.', 'bestatigung.png'],
      ['3', 'Interpreter on site', 'The interpreter is there for you at the agreed time and place.', 'ubersetzer.png'],
    ],
    cta: 'Free interpreter request',
  },
  ar: {
    kicker: 'خدمات الترجمة الفورية',
    title: 'الترجمة الفورية',
    introRows: [
      {
        asset: 'mannschaft.png',
        text: 'خدمات ترجمة فورية احترافية للشركات والجهات الحكومية والمحاكم والمؤسسات الطبية والعملاء من القطاع الخاص.',
      },
      {
        asset: 'platzhalter.png',
        text: 'منذ عام 2019، يدعم مكتبنا للترجمة الفورية والتحريرية العملاء في أوسنابروك وبيليفيلد وكيل وماينز وشتوتغارت وبرلين، وكذلك في جميع أنحاء ألمانيا، وعلى المستوى الدولي عند الطلب.',
      },
      {
        asset: 'save-the-world.png',
        text: 'نوفر مترجمين فوريين مؤهلين بأكثر من 190 لغة للمواعيد الحضورية والاجتماعات عبر الإنترنت ومؤتمرات الفيديو والترجمة عبر الهاتف، بسرعة وموثوقية واحترافية.',
      },
    ],
    benefits: [
      ['أكثر من 190 لغة', 'مترجمون فوريون لجميع اللغات واللهجات تقريبا حول العالم.', 'save-the-world.png'],
      ['مترجمون فوريون ذوو خبرة', 'مترجمون مؤهلون ومراجعون يتمتعون بخبرة طويلة وكفاءة تخصصية عالية.', 'benutzer.png'],
      ['أشكال استخدام مرنة', 'مواعيد عاجلة، تخطيط فردي للمواعيد وتوفر في جميع أنحاء ألمانيا.', 'flexibel.png'],
    ],
    processTitle: 'هكذا يتم طلب مترجم فوري',
    process: [
      ['1', 'إرسال طلب عبر البريد الإلكتروني', 'اذكر اللغة ومكان المهمة والوقت.', 'email.png'],
      ['2', 'استلام العرض وتأكيده', 'راجع السعر وأكد العرض.', 'bestatigung.png'],
      ['3', 'المترجم في الموعد', 'يكون المترجم حاضرا في المكان والوقت المتفق عليهما.', 'ubersetzer.png'],
    ],
    cta: 'طلب مترجم فوري مجاني',
  },
  tr: {
    kicker: 'Tercümanlık hizmetleri',
    title: 'Tercümanlık',
    introRows: [
      {
        asset: 'mannschaft.png',
        text: 'Şirketler, resmi kurumlar, mahkemeler, tıbbi kuruluşlar ve özel müşteriler için profesyonel tercümanlık hizmetleri.',
      },
      {
        asset: 'platzhalter.png',
        text: 'Tercümanlık ve çeviri büromuz 2019 yılından beri Osnabrück, Bielefeld, Kiel, Mainz, Stuttgart, Berlin ve Almanya genelindeki müşterilere destek verir; talep üzerine uluslararası hizmet de sunar.',
      },
      {
        asset: 'save-the-world.png',
        text: 'Yerinde randevular, çevrim içi toplantılar, video konferanslar ve telefon tercümanlığı için 190’dan fazla dilde nitelikli tercümanlar sağlıyoruz; hızlı, güvenilir ve profesyonel.',
      },
    ],
    benefits: [
      ['190’DAN FAZLA DİL', 'Dünya çapında neredeyse tüm diller ve lehçeler için tercümanlar.', 'save-the-world.png'],
      ['DENEYİMLİ TERCÜMANLAR', 'Uzun yıllara dayanan deneyime ve güçlü uzmanlığa sahip nitelikli ve kontrol edilmiş tercümanlar.', 'benutzer.png'],
      ['ESNEK GÖREV TÜRLERİ', 'Kısa süreli görevlendirmeler, kişiye özel randevu planlaması ve Almanya genelinde erişilebilirlik.', 'flexibel.png'],
    ],
    processTitle: 'Tercüman rezervasyonu nasıl işler',
    process: [
      ['1', 'E-posta ile talep gönderin', 'Dil, görev yeri ve saati belirtin.', 'email.png'],
      ['2', 'Teklifi alın ve onaylayın', 'Fiyatı kontrol edin ve teklifi onaylayın.', 'bestatigung.png'],
      ['3', 'Tercüman randevuda', 'Tercüman belirlenen yer ve zamanda sizin için hazır olur.', 'ubersetzer.png'],
    ],
    cta: 'Ücretsiz tercüman talebi',
  },
  ru: {
    kicker: 'Услуги устного перевода',
    title: 'Устный перевод',
    introRows: [
      {
        asset: 'mannschaft.png',
        text: 'Профессиональные услуги устного перевода для компаний, государственных органов, судов, медицинских учреждений и частных клиентов.',
      },
      {
        asset: 'platzhalter.png',
        text: 'С 2019 года наше бюро устного и письменного перевода помогает клиентам в Оснабрюке, Билефельде, Киле, Майнце, Штутгарте, Берлине и по всей Германии, а по запросу также на международном уровне.',
      },
      {
        asset: 'save-the-world.png',
        text: 'Мы подбираем квалифицированных устных переводчиков более чем для 190 языков для очных встреч, онлайн-встреч, видеоконференций и телефонного перевода — быстро, надежно и профессионально.',
      },
    ],
    benefits: [
      ['БОЛЕЕ 190 ЯЗЫКОВ', 'Устные переводчики почти для всех языков и диалектов по всему миру.', 'save-the-world.png'],
      ['ОПЫТНЫЕ ПЕРЕВОДЧИКИ', 'Квалифицированные и проверенные устные переводчики с многолетним опытом и высокой профессиональной компетенцией.', 'benutzer.png'],
      ['ГИБКИЕ ФОРМАТЫ РАБОТЫ', 'Срочные выезды, индивидуальное планирование встреч и доступность по всей Германии.', 'flexibel.png'],
    ],
    processTitle: 'Как проходит заказ устного переводчика',
    process: [
      ['1', 'Отправьте запрос по e-mail', 'Укажите язык, место задания и время.', 'email.png'],
      ['2', 'Получите и подтвердите предложение', 'Проверьте цену и подтвердите предложение.', 'bestatigung.png'],
      ['3', 'Переводчик на месте', 'Переводчик будет для вас в согласованное время и в согласованном месте.', 'ubersetzer.png'],
    ],
    cta: 'Бесплатный запрос устного переводчика',
  },
  fr: {
    kicker: 'Services d’interprétation',
    title: 'Interprétation',
    introRows: [
      {
        asset: 'mannschaft.png',
        text: 'Services d’interprétation professionnels pour entreprises, administrations, tribunaux, établissements médicaux et clients privés.',
      },
      {
        asset: 'platzhalter.png',
        text: 'Depuis 2019, notre bureau d’interprétation et de traduction accompagne des clients à Osnabrück, Bielefeld, Kiel, Mayence, Stuttgart, Berlin et dans toute l’Allemagne, ainsi qu’à l’international sur demande.',
      },
      {
        asset: 'save-the-world.png',
        text: 'Nous organisons des interprètes qualifiés dans plus de 190 langues pour des rendez-vous sur place, réunions en ligne, visioconférences et interprétation téléphonique — rapidement, fiablement et professionnellement.',
      },
    ],
    benefits: [
      ['PLUS DE 190 LANGUES', 'Des interprètes pour presque toutes les langues et tous les dialectes dans le monde.', 'save-the-world.png'],
      ['INTERPRÈTES EXPÉRIMENTÉS', 'Des interprètes qualifiés et vérifiés, avec de nombreuses années d’expérience et une solide expertise.', 'benutzer.png'],
      ['FORMATS D’INTERVENTION FLEXIBLES', 'Missions à court terme, planification individuelle des rendez-vous et disponibilité dans toute l’Allemagne.', 'flexibel.png'],
    ],
    processTitle: 'Comment se déroule une réservation d’interprète',
    process: [
      ['1', 'Envoyer une demande par e-mail', 'Indiquez la langue, le lieu de mission et l’heure.', 'email.png'],
      ['2', 'Recevoir et confirmer l’offre', 'Vérifiez le prix et confirmez l’offre.', 'bestatigung.png'],
      ['3', 'Interprète sur place', 'L’interprète est présent pour vous au lieu et à l’heure convenus.', 'ubersetzer.png'],
    ],
    cta: 'Demande gratuite d’interprète',
  },
  uk: {
    kicker: 'Послуги усного перекладу',
    title: 'Усний переклад',
    introRows: [
      {
        asset: 'mannschaft.png',
        text: 'Професійні послуги усного перекладу для компаній, органів влади, судів, медичних установ і приватних клієнтів.',
      },
      {
        asset: 'platzhalter.png',
        text: 'З 2019 року наше бюро усного та письмового перекладу підтримує клієнтів в Оснабрюку, Білефельді, Кілі, Майнці, Штутгарті, Берліні та по всій Німеччині, а за запитом також міжнародно.',
      },
      {
        asset: 'save-the-world.png',
        text: 'Ми організовуємо кваліфікованих усних перекладачів понад 190 мовами для очних зустрічей, онлайн-зустрічей, відеоконференцій і телефонного перекладу — швидко, надійно та професійно.',
      },
    ],
    benefits: [
      ['ПОНАД 190 МОВ', 'Усні перекладачі майже для всіх мов і діалектів у світі.', 'save-the-world.png'],
      ['ДОСВІДЧЕНІ ПЕРЕКЛАДАЧІ', 'Кваліфіковані та перевірені усні перекладачі з багаторічним досвідом і високою фаховою компетентністю.', 'benutzer.png'],
      ['ГНУЧКІ ФОРМАТИ РОБОТИ', 'Термінові виїзди, індивідуальне планування зустрічей і доступність по всій Німеччині.', 'flexibel.png'],
    ],
    processTitle: 'Як відбувається замовлення усного перекладача',
    process: [
      ['1', 'Надішліть запит електронною поштою', 'Вкажіть мову, місце виконання та час.', 'email.png'],
      ['2', 'Отримайте та підтвердьте пропозицію', 'Перевірте ціну та підтвердьте пропозицію.', 'bestatigung.png'],
      ['3', 'Перекладач на місці', 'Перекладач буде для вас у погоджений час і в погодженому місці.', 'ubersetzer.png'],
    ],
    cta: 'Безкоштовний запит усного перекладача',
  },
};

const BEEIDIGTE_DOLMETSCHER_SHEET = {
  kicker: 'Dolmetschen',
  title: 'Beeidigte Dolmetscher',
  introRows: [
    {
      asset: 'dolmetscher.png',
      text: 'Unsere allgemein beeidigten Dolmetscher begleiten Sie zuverlässig bei Terminen bei Behörden, Gerichten, Notaren, Standesämtern, Anhörungen sowie in Konsulaten und Botschaften.',
    },
    {
      asset: 'netzwerk.png',
      paragraphs: [
        'Dank unseres bundesweiten Netzwerks mit über 8.000 qualifizierten Dolmetschern und Übersetzern finden wir für nahezu jede Sprache den passenden Ansprechpartner. Unsere Muttersprachler sind fachlich qualifiziert und – soweit erforderlich – allgemein beeidigt bzw. ermächtigt.',
        'Ob bei der Ausländerbehörde, vor Gericht, beim Notar oder im Standesamt – wir sorgen für eine präzise, neutrale und rechtssichere Sprachmittlung, damit Ihre Kommunikation reibungslos und offiziell anerkannt erfolgt.',
      ],
    },
  ],
  features: [
    ['Amtlich beeidigt', 'Beeidigte Dolmetscher für Behörden, Gerichte, Notare und offizielle Termine.', 'gericht.png'],
    ['Rechtssicher', 'Präzise Dolmetschleistungen für Anhörungen, Verfahren und behördliche Gespräche.', 'gesetz.png'],
    ['Vielseitig einsetzbar', 'Dolmetscher für Standesamt, Ausländerbehörde, Konsulat und weitere Fachbereiche.', 'vielseitig-einsetzbar.png'],
    ['Vertraulichkeit', 'Vertrauliche Behandlung Ihrer Daten, Dokumente und persönlichen Anliegen.', 'schild.png'],
  ],
};

const STANDESAMT_DOLMETSCHER_SHEET = {
  kicker: 'Dolmetschen',
  title: 'Standesamt-Dolmetscher',
  introTitle: 'Standesamt-Dolmetscher für Ihre Hochzeit',
  intro: 'Für Ihre standesamtliche Trauung stellen wir zuverlässige Dolmetscher, damit beide Partner jedes Wort verstehen und die Eheschließung rechtswirksam erfolgen kann.',
  details: [
    'Unsere beeidigten Standesamt-Dolmetscher begleiten Sie zum Standesamt, erläutern alle Erklärungen in Ihrer Sprache und sorgen für eine reibungslose Verständigung.',
    'So können Sie sich ganz auf Ihren besonderen Tag konzentrieren – wir übernehmen die sprachliche Begleitung.',
  ],
};

const WIRTSCHAFT_FINANZEN_SHEET = {
  kicker: 'Fachübersetzungen',
  title: 'Wirtschaft & Finanzen',
  introTitle: 'Übersetzungen für Wirtschaft & Finanzen',
  intro: 'Wir unterstützen Unternehmen, Kanzleien, Banken und Versicherungen mit präzisen Fachübersetzungen im Bereich Wirtschaft und Finanzen.',
  features: [
    ['Internationaler Geschäftsverkehr', 'Wir übersetzen Wirtschafts- und Finanzdokumente für Unternehmen – professionell, präzise und termingerecht.', 'globales-geschaft.png'],
    ['Banken & Versicherungen', 'Fachübersetzungen für Banken, Versicherungen und Finanzdienstleister.', 'bank.png'],
    ['Bilanzierung & Controlling', 'Übersetzungen von Bilanzen, Reports und Controlling-Unterlagen.', 'bilanz.png'],
    ['Verträge & Compliance', 'Rechtssichere Übersetzungen von Verträgen und Richtlinien.', 'compliance-dokument.png'],
  ],
};

const BEGLAUBIGTE_UEBERSETZUNG_SHEET = {
  kicker: 'Übersetzungen',
  title: 'Beglaubigte Übersetzungen',
  introTitle: 'Beglaubigte Übersetzungen',
  intro: 'Wir fertigen beglaubigte Übersetzungen für Behörden, Gerichte, Standesämter, Hochschulen, Notare und weitere öffentliche Einrichtungen an. Unsere beglaubigten Übersetzungen werden deutschlandweit offiziell anerkannt.',
  documentsTitle: 'Typische Dokumente',
  documentsLead: 'Zu den Dokumenten, die wir täglich beglaubigt übersetzen, gehören insbesondere:',
  documents: [
    'Geburts-, Heirats- und Sterbeurkunden',
    'Ausweise und Reisepässe',
    'Zeugnisse und Diplome',
    'Führerscheine',
    'Scheidungsunterlagen',
    'Verträge und Vollmachten',
  ],
  languagesTitle: 'Häufige Sprachkombinationen',
  languagesLead: 'Zu unseren häufigsten Sprachkombinationen gehören:',
  languages: [
    'Arabisch – Deutsch',
    'Englisch – Deutsch',
    'Französisch – Deutsch',
    'Türkisch – Deutsch',
    'Russisch – Deutsch',
    'Ukrainisch – Deutsch',
    'Persisch – Deutsch',
    'Rumänisch – Deutsch',
    'Spanisch – Deutsch',
    'Portugiesisch – Deutsch',
    'Albanisch – Deutsch',
    'Serbisch – Deutsch',
    'und viele weitere Sprachen.',
  ],
  processTitle: 'So einfach läuft Ihre beglaubigte Übersetzung ab',
  process: [
    ['1.', 'Dokumente fotografieren oder einscannen', 'word-media/image5.png'],
    ['2.', 'Dokumente senden & Preis erfahren', 'word-media/image6.png'],
    ['3.', 'Adresse per E-Mail senden & Preis bestätigen', 'word-media/image7.png'],
    ['4.', 'Übersetzung per Post erhalten & Rechnung bezahlen', 'word-media/image8.png'],
  ],
  benefits: [
    ['Behördlich anerkannt', 'Beglaubigte Übersetzungen für Visa, Einbürgerung, Anerkennungsverfahren und offizielle Anträge.', 'word-media/image9.png'],
    ['Vier-Augen-Prinzip', 'Jede Übersetzung wird von einem zweiten qualifizierten Linguisten geprüft.', 'word-media/image10.png'],
    ['Terminologiemanagement', 'Einheitliche Fachterminologie für präzise und normgerechte Übersetzungen.', 'word-media/image11.png'],
    ['Versand deutschlandweit', 'Schneller Versand per Post oder Kurier – deutschlandweit und zuverlässig.', 'word-media/image12.png'],
  ],
};

const POINT_GRID_SHEETS = {
  simultandolmetscher: {
    assetBase: `${POINT_CONTENT_ASSET_BASE}simultandolmetscher/`,
    kicker: 'Dolmetschen',
    title: 'Simultandolmetscher',
    wordGrid: { columns: 4, iconSpan: 1, copySpan: 3, featureSpans: [1, 1, 1, 1] },
    rows: [
      {
        icon: 'dolmetscher.png',
        paragraphs: [
          'Unsere Simultandolmetscher sorgen dafür, dass internationale Konferenzen, Tagungen und Veranstaltungen reibungslos mehrsprachig ablaufen.',
        ],
      },
      {
        icon: 'globus.png',
        listTitle: 'Wir bieten professionelles Echtzeit-Dolmetschen unter anderem in den Sprachkombinationen:',
        items: ['Deutsch–Englisch', 'Deutsch–Französisch', 'Deutsch–Russisch', 'Deutsch–Spanisch', 'Deutsch–Italienisch', 'Deutsch–Arabisch', 'sowie in vielen weiteren europäischen und außereuropäischen Sprachen'],
      },
      {
        icon: 'benutzer.png',
        paragraphs: [
          'Wir vermitteln qualifizierte Dolmetscher in über 190 Sprachen für Präsenztermine, Online-Meetings, Videokonferenzen und Telefondolmetschen – schnell, zuverlässig und professionell.',
        ],
        request: true,
      },
    ],
    features: [
      ['Simultandolmetschen', 'Echtzeit-Dolmetschen für Konferenzen, Tagungen und internationale Veranstaltungen.', 'headset.png'],
      ['Viele Sprachkombinationen', 'Professionelle Simultandolmetscher für Deutsch und zahlreiche internationale Sprachen.', 'sprachen.png'],
      ['Erfahrene Teams', 'Qualifizierte Simultandolmetscher mit umfangreicher Konferenz- und Fachkompetenz.', 'coworking.png'],
      ['Moderne Technik', 'Dolmetschkabinen, Empfängeranlagen und professionelle Konferenztechnik aus einer Hand.', 'digitale-transformation.png'],
    ],
  },
  notardolmetscher: {
    assetBase: `${POINT_CONTENT_ASSET_BASE}notardolmetscher/`,
    kicker: 'Fachübersetzungen',
    title: 'Notardolmetscher',
    wordGrid: { columns: 5, iconSpan: 2, copySpan: 3, featureSpans: [1, 2, 1, 1] },
    rows: [
      {
        icon: 'regierung.png',
        paragraphs: [
          'Bei notariellen Beurkundungen – etwa Kaufverträgen, Eheverträgen, Gesellschaftsgründungen oder Vollmachten – ist präzises Dolmetschen unverzichtbar.',
          'Unsere Notardolmetscher arbeiten regelmäßig mit Notariaten zusammen und sind mit den Abläufen vor Ort bestens vertraut.',
          'Wir stellen sicher, dass alle Beteiligten jedes Detail verstehen – unabhängig davon, ob der Termin ein- oder mehrsprachig stattfindet.',
        ],
      },
    ],
    features: [
      ['Präzision', 'Präzise Sprachmittlung für notarielle Beurkundungen und Verträge.', 'fokus.png'],
      ['Rechtssicherheit', 'Vollständige und rechtssichere Verständigung bei notariellen Terminen.', 'dritte-seite.png'],
      ['Erfahrung', 'Regelmäßige Zusammenarbeit mit Notariaten und umfassende Praxiserfahrung.', 'erfahrung.png'],
      ['Flexibel & zuverlässig', 'Kurzfristige Termine und bundesweite Einsätze auf Anfrage möglich.', 'qualitat.png'],
    ],
    request: true,
  },
  'fachuebersetzung-overview': {
    assetBase: `${POINT_CONTENT_ASSET_BASE}fachuebersetzung-overview/`,
    kicker: 'Fachübersetzungen',
    title: 'Was sind Fachübersetzungen?',
    wordGrid: { columns: 4, iconSpan: 1, copySpan: 3, featureSpans: [2, 2, 2, 2, 2, 2, 2, 2] },
    rows: [
      {
        icon: 'wirtschaft.png',
        paragraphs: [
          'Fachübersetzungen erfordern weit mehr als Sprachkenntnisse. Sie setzen fundiertes Fachwissen und Erfahrung im jeweiligen Fachgebiet voraus. Deshalb arbeiten wir ausschließlich mit qualifizierten Fachübersetzern.',
          'Unsere Fachübersetzer übertragen Inhalte sprachlich korrekt, fachlich präzise und zielgruppengerecht – für technische, juristische, medizinische, wissenschaftliche und wirtschaftliche Dokumente.',
        ],
        request: true,
      },
    ],
    sectionTitle: 'Unsere Fachübersetzungsbereiche:',
    features: [
      ['Recht', 'Verträge, Urteile, Gutachten und juristische Dokumente.', 'gericht.png'],
      ['Ingenieurwesen', 'Technische Dokumentationen, Handbücher und Spezifikationen.', 'ingenieurwesen.png'],
      ['Medizin & Zahnmedizin', 'Patientenunterlagen, Befunde, Studien und medizinische Fachtexte.', 'rotes-kreuz.png'],
      ['Pharmazie', 'Studien, Fachinformationen und Zulassungsunterlagen.', 'medizinisch.png'],
      ['Literatur', 'Bücher, Fachtexte, Artikel und kulturelle Inhalte.', 'online-bildung.png'],
      ['IT & Software', 'Software, Apps, Handbücher und technische Dokumentationen.', 'it-service.png'],
      ['Chemie & Biowissenschaften', 'Patente, Laborberichte und wissenschaftliche Texte.', 'chemie.png'],
      ['Industrie & Produktion', 'Produktionsunterlagen, Prozesse und Qualitätsdokumente.', 'industrie.png'],
    ],
    request: true,
  },
  ingenieurwesen: {
    assetBase: `${POINT_CONTENT_ASSET_BASE}ingenieurwesen/`,
    kicker: 'Fachübersetzungen',
    title: 'Ingenieurwesen',
    wordGrid: { columns: 4, iconSpan: 1, copySpan: 3, featureSpans: [2, 1, 1] },
    rows: [
      {
        icon: 'ingenieurwesen.png',
        title: 'Übersetzungsbüro für Technik und Ingenieurwesen',
        paragraphs: [
          'Als Fachübersetzungsbüro für Technik und Ingenieurwesen unterstützen wir Hersteller, Ingenieurbüros, Planungsbüros, Maschinenbauer und Industrieunternehmen mit präzisen technischen Übersetzungen.',
          'Unsere technischen Fachübersetzungen werden von qualifizierten Übersetzern mit ingenieurwissenschaftlichem Hintergrund angefertigt. Als Muttersprachler ihrer jeweiligen Zielsprache verbinden sie technisches Fachwissen mit sprachlicher Präzision und einer einheitlichen Fachterminologie. So erhalten Sie hochwertige, fachlich korrekte und verständliche Übersetzungen – alles aus einer Hand.',
        ],
      },
      {
        icon: 'unterlagen.png',
        title: 'Wir übersetzen regelmäßig folgende technische Unterlagen:',
        items: ['Bedienungsanleitungen', 'Sicherheitsdatenblätter', 'Wartungshandbücher', 'Patente', 'Konstruktionsunterlagen', 'CAD-Begleitdokumente', 'Ausschreibungen', 'Technische Spezifikationen'],
        columns: 2,
      },
      {
        icon: 'fabrik.png',
        title: 'Internationale Technik- und Industrieprojekte',
        lead: 'Unsere technischen Übersetzungen unterstützen Sie bei:',
        items: ['Internationalen Ausschreibungen', 'Maschinenexporten', 'CE-Dokumentationen', 'Technischen Schulungen', 'Anlagenbauprojekten', 'Produktlokalisierung', 'Sicherheitsdokumentationen', 'Weltweitem Vertrieb'],
        columns: 2,
      },
    ],
    features: [
      ['Maschinenbau', 'Fachübersetzungen für Maschinen, Anlagen und technische Systeme.', 'maschinenbau.png'],
      ['Elektrotechnik', 'Präzise Übersetzungen für Elektrotechnik und Steuerungstechnik.', 'leistung.png'],
      ['Internationale Projekte', 'Übersetzungen für Export, Ausschreibungen und internationale Vorhaben.', 'abgeschlossene-aufgabe (1).png'],
    ],
    request: true,
  },
  'medizin-dental': {
    assetBase: `${POINT_CONTENT_ASSET_BASE}medizin-dental/`,
    kicker: 'Fachübersetzungen',
    title: 'Medizin & Dentalmedizin',
    wordGrid: { columns: 3, iconSpan: 1, copySpan: 2, featureSpans: [2, 1] },
    rows: [
      {
        icon: 'medizinisches-symbol.png',
        title: 'Medizinische Fachübersetzungen',
        paragraphs: [
          'Als spezialisiertes Fachübersetzungsbüro für Medizin und Dentalmedizin unterstützen wir Kliniken, Praxen, medizinische Einrichtungen, Dentalfirmen, Hersteller und Fachverlage mit präzisen und fachlich geprüften Übersetzungen.',
          'Unsere Übersetzer verfügen über langjährige Erfahrung und eine akademische Ausbildung in ihrem jeweiligen Fachgebiet. Viele unserer Fachübersetzer sind Muttersprachler ihrer Zielsprache und beherrschen zusätzlich Deutsch auf muttersprachlichem Niveau. So verbinden wir fachliche Kompetenz mit sprachlicher Präzision und gewährleisten hochwertige Fachübersetzungen.',
        ],
      },
      {
        icon: 'zahne.png',
        title: 'Spezialisierte Dental- und Zahntechnik-Übersetzungen',
        lead: 'Wir verfügen über Erfahrung in folgenden Bereichen:',
        items: ['CAD/CAM-Systeme', 'Intraoralscanner', 'Dentalsoftware', '3D-Druck', 'Implantatsysteme', 'Keramiksysteme', 'Füllungsmaterialien', 'Dentallabortechnik'],
        columns: 2,
      },
      {
        icon: 'stethoskop.png',
        title: 'Gesundheitswesen & Medizintechnik',
        lead: 'Unsere Übersetzungen unterstützen:',
        items: ['Kliniken und Krankenhäuser', 'Arzt- und Zahnarztpraxen', 'Medizintechnik-Hersteller', 'Dentallabore', 'Klinische Studien', 'Medizinische Software', 'Patientenkommunikation', 'Internationale Zulassungen'],
        columns: 2,
      },
    ],
    features: [
      ['Dentalmedizin & Zahntechnik', 'Fachübersetzungen für Zahnmedizin, Zahntechnik, Dentalfirmen und CAD/CAM-Systeme.', 'dental.png'],
      ['Internationale Gesundheitskommunikation', 'Übersetzungen für Studien, Zulassungen und internationale Fachkommunikation.', 'gesundheit.png'],
    ],
    request: true,
  },
  pharmazeutik: {
    assetBase: `${POINT_CONTENT_ASSET_BASE}pharmazeutik/`,
    kicker: 'Fachübersetzungen',
    title: 'Pharmazeutik & Arzneimittel',
    wordGrid: { columns: 4, iconSpan: 2, copySpan: 2, featureSpans: [1, 2, 1] },
    rows: [
      {
        icon: 'pharmazeutik.png',
        paragraphs: [
          'Als spezialisiertes Fachübersetzungsbüro für Pharmazie unterstützen wir Pharmaunternehmen, Apotheken, Kliniken, CROs (Clinical Research Organizations), Hersteller von Medizinprodukten sowie Behörden mit fachlich präzisen Arzneimittelübersetzungen.',
          'Unsere pharmazeutischen Fachübersetzungen werden von qualifizierten Pharmazeuten aus unserem Team angefertigt, die ihre jeweilige Fremdsprache sowie Deutsch sicher beherrschen. Dadurch verbinden wir fundiertes pharmazeutisches Fachwissen mit sprachlicher Präzision und gewährleisten fachgerechte, hochwertige Übersetzungen.',
        ],
      },
      {
        icon: 'rezept (1).png',
        title: 'Pharmazeutische Dokumente',
        lead: 'Wir übersetzen unter anderem:',
        items: ['Fachinformationen (SmPC)', 'Packungsbeilagen (PIL)', 'Arzneimittelverpackungen', 'Etiketten & Faltschachteln', 'Zulassungsunterlagen', 'Einreichungsdossiers', 'Klinische Studien', 'Patienteninformationen', 'GMP-Dokumente', 'SOPs & Arbeitsanweisungen'],
        columns: 2,
      },
      {
        icon: 'durchfuhrbarkeit.png',
        title: 'Internationale Pharma- und Zulassungsprojekte',
        lead: 'Unsere Übersetzungen unterstützen:',
        items: ['Internationale Arzneimittelzulassungen', 'Klinische Studien', 'GMP-Dokumentationen', 'Medizinprodukte', 'Pharmakovigilanz', 'Arzneimittelverpackungen', 'Patienteninformationen', 'Mehrsprachige Produktdokumentationen'],
        columns: 2,
      },
    ],
    features: [
      ['Arzneimittelübersetzungen', 'Präzise Übersetzungen für Arzneimittel, Packungsbeilagen und Zulassungsunterlagen.', 'wissenschaft.png'],
      ['Klinische Forschung', 'Übersetzungen für Studien, Protokolle, Einwilligungserklärungen und Patienteninformationen.', 'klinische-studie.png'],
      ['Pharma & Biotechnologie', 'Einheitliche Fachbegriffe nach aktuellen regulatorischen Anforderungen.', 'biotechnologie (1).png'],
    ],
    request: true,
  },
  literatur: {
    assetBase: `${POINT_CONTENT_ASSET_BASE}literatur/`,
    kicker: 'Fachübersetzungen',
    title: 'Literatur & Kultur',
    wordGrid: { columns: 3, iconSpan: 1, copySpan: 2, featureSpans: [2, 1] },
    rows: [
      {
        icon: 'literarisch.png',
        title: 'Literarische Fachübersetzungen',
        paragraphs: ['Als Fachübersetzungsbüro für Literatur und Kultur unterstützen wir Verlage, Autorinnen und Autoren, Theater, Filmproduktionen, Kulturinstitutionen, Museen und Agenturen mit hochwertigen literarischen Übersetzungen.'],
      },
      {
        icon: 'biografie.png',
        title: 'Literarische und kulturelle Texte',
        lead: 'Wir übersetzen unter anderem:',
        items: ['Romane', 'Erzählungen', 'Kinder- und Jugendbücher', 'Lyrik', 'Essays', 'Biografien', 'Sachbücher', 'Theaterstücke', 'Drehbücher', 'Hörspieltexte', 'Katalogtexte', 'Ausstellungstexte'],
        columns: 2,
      },
      {
        icon: 'kultur.png',
        title: 'Verlage, Autoren & Kulturinstitutionen',
        lead: 'Unsere Übersetzungen unterstützen:',
        items: ['Buchübersetzungen', 'Literaturprojekte', 'Verlagsprogramme', 'Theaterproduktionen', 'Filmproduktionen', 'Museumsausstellungen', 'Mehrsprachige Marketingkampagnen', 'Internationale Kulturprojekte'],
        columns: 2,
      },
    ],
    features: [
      ['Kultur & Medien', 'Übersetzungen für Theater, Film, Hörspiele, Magazine und Kulturprojekte.', 'klappe.png'],
      ['Lektorat & Korrektorat', 'Professionelles Lektorat und Korrektorat für sprachliche und stilistische Qualität.', 'dokumentieren.png'],
    ],
    request: true,
  },
  'chemie-biowissenschaften': {
    assetBase: `${POINT_CONTENT_ASSET_BASE}chemie-biowissenschaften/`,
    kicker: 'Fachübersetzungen',
    title: 'Chemie & Biowissenschaften',
    wordGrid: { columns: 4, iconSpan: 1, copySpan: 3, featureSpans: [2, 1, 1] },
    rows: [
      {
        icon: 'chemie.png',
        title: 'Fachübersetzungen für Chemie & Biowissenschaften',
        paragraphs: ['Als Fachübersetzungsbüro für Chemie und Biowissenschaften unterstützen wir Chemieunternehmen, Labore, Forschungsinstitute, Hochschulen, Biotech-Unternehmen sowie Hersteller von Labor- und Analysegeräten mit präzisen wissenschaftlichen Übersetzungen.'],
      },
      {
        icon: 'labor-ausstattung.png',
        title: 'Naturwissenschaftliche Fachkompetenz',
        lead: 'Unsere Fachübersetzer verfügen über Erfahrung in:',
        items: ['Organischer Chemie', 'Anorganischer Chemie', 'Polymerchemie', 'Materialwissenschaften', 'Analytischer Chemie', 'Umweltanalytik', 'Biochemie', 'Molekularbiologie', 'Genetik', 'Biotechnologie'],
        columns: 2,
      },
    ],
    features: [
      ['Chemische Fachübersetzungen', 'Übersetzungen für chemische Dokumente, Sicherheitsdatenblätter und Analyseunterlagen.', 'flasche.png'],
      ['Biowissenschaften & Life Sciences', 'Fachübersetzungen für Biotechnologie, Molekularbiologie und wissenschaftliche Forschung.', 'data-science.png'],
      ['Labor & Forschung', 'Übersetzungen für Laborberichte, Studien, Prüfberichte und Forschungsdokumente.', 'buch.png'],
    ],
    request: true,
  },
};

const RECHT_SHEET = {
  kicker: 'Fachübersetzungen',
  title: 'Recht',
  introTitle: 'Juristische Fachübersetzungen',
  intro: [
    'Wir erstellen präzise Fachübersetzungen für Kanzleien, Notare, Gerichte, Unternehmen, Behörden und Privatpersonen.',
    'Wir übersetzen Verträge, Urteile, Beschlüsse, Vollmachten, Satzungen, Klageschriften, Urkunden und viele weitere juristische Dokumente.',
  ],
  documentsTitle: 'Typische Rechtsdokumente, die wir regelmäßig übersetzen:',
  documents: [
    'Verträge',
    'Gesellschaftsverträge',
    'Vollmachten',
    'Gerichtsurteile',
    'Beschlüsse',
    'Satzungen',
    'Klageschriften',
    'Notarielle Urkunden',
  ],
  features: [
    ['Internationale Rechtskommunikation', 'Für Kanzleien, Unternehmen, Behörden und internationale Verfahren.', 'internationale-beziehungen.png'],
    ['Rechtssichere Übersetzungen', 'Für Verträge, Gerichtsdokumente, Gutachten und Schriftsätze.', 'juristisches-papier.png'],
    ['Juristische Fachterminologie', 'Einheitliche Fachbegriffe und höchste Übersetzungsqualität.', 'juristische-dienstleistung.png'],
    ['Verträge & Urkunden', 'Immobilienverträge, Vollmachten, Maklerverträge und notarielle Urkunden.', 'zertifikat.png'],
  ],
};

const IT_SOFTWARE_SHEET = {
  title: 'IT & Software',
  sections: [
    {
      asset: 'technology.png',
      title: 'IT- & Softwareübersetzungen',
      text: 'Als Übersetzungsbüro für IT, Software und Lokalisierung unterstützen wir Softwarehersteller, Start-ups, Agenturen, Systemhäuser und IT-Abteilungen bei der fachgerechten Übersetzung und Lokalisierung digitaler Produkte.',
    },
    {
      asset: 'mobile-development.png',
      title: 'Apps, Software & Gaming',
      items: [
        'Mobile Apps',
        'UI-Texte',
        'Push-Benachrichtigungen',
        'App-Store-Texte',
        'Spieltexte',
        'Storylines',
        'Tutorials',
        'Hilfetexte',
      ],
    },
    {
      asset: 'file.png',
      title: 'Software & Technische Dokumentation',
      lead: 'Wir übersetzen unter anderem:',
      items: [
        'API-Dokumentationen',
        'Developer Guides',
        'Technische Spezifikationen',
        'Release Notes',
        'Changelogs',
        'Benutzerhandbücher',
        'Administratorhandbücher',
        'Installationsanleitungen',
        'Konfigurationsanleitungen',
      ],
    },
    {
      asset: 'technical-support.png',
      title: 'Technische Fachkompetenz',
      lead: 'Unsere Fachübersetzer verfügen über Erfahrung in:',
      items: [
        'Softwareentwicklung',
        'Cloud-Infrastrukturen',
        'IT-Sicherheit',
        'Datenbanken',
        'DevOps',
        'Systemarchitekturen',
        'Softwarelokalisierung',
        'Compliance',
      ],
    },
  ],
  languageCard: {
    asset: 'earth-grid.png',
    title: 'Häufige Sprachkombinationen',
    items: [
      'Englisch–Deutsch',
      'Französisch–Deutsch',
      'Spanisch–Deutsch',
      'Italienisch–Deutsch',
      'Arabisch–Deutsch',
      'Türkisch–Deutsch',
      'Polnisch–Deutsch',
      'Russisch–Deutsch',
      'Niederländisch–Deutsch',
    ],
  },
  international: {
    asset: 'connection.png',
    title: 'Internationale Software- & IT-Projekte',
    lead: 'Unsere Übersetzungen unterstützen:',
    items: [
      'API-Dokumentationen',
      'IT-Sicherheitsrichtlinien',
      'Cloud-Architekturen',
      'DevOps-Runbooks',
      'DSGVO-Dokumentationen',
      'Softwarelokalisierung',
      'E-Learning-Plattformen',
      'Enterprise-Software',
    ],
  },
  workflow: [
    'Wir arbeiten mit XML-, YAML-, JSON-, PO-, XLIFF- und CSV-Dateien und integrieren uns auf Wunsch direkt in bestehende Lokalisierungs-Workflows, Git-Repositories und CI/CD-Pipelines.',
    'Unsere IT-Fachübersetzer verfügen über fundiertes technisches Verständnis in den Bereichen Softwareentwicklung, Cloud-Infrastruktur, IT-Sicherheit, Datenbanken und DevOps. Dadurch stellen wir sicher, dass Benutzeroberflächen, Fehlermeldungen, Tooltips, technische Dokumentationen und Softwareinhalte nicht nur sprachlich präzise, sondern auch fachlich korrekt, konsistent und benutzerfreundlich übersetzt werden.',
  ],
  nationwide: {
    asset: 'pin.png',
    title: 'Deutschlandweit für Sie im Einsatz',
    text: 'Als deutschlandweit tätiges IT-Übersetzungsbüro unterstützen wir Unternehmen, Start-ups, Softwarehersteller und IT-Dienstleister in Städten wie Berlin, Hamburg, München, Stuttgart, Hannover, Frankfurt, Köln und Osnabrück sowie Remote-Teams in ganz Europa.',
  },
  cta: {
    asset: 'question.png',
    question: 'Sie benötigen eine Fachübersetzung im Bereich IT oder Softwarelokalisierung?',
    text: 'Teilen Sie uns einfach mit, welche Inhalte übersetzt werden sollen, in welche Sprache die Übersetzung erfolgen soll und ob besondere Anforderungen an Terminologie, Format oder Lokalisierung bestehen. Auf dieser Grundlage erhalten Sie von uns zeitnah ein kostenloses und unverbindliches Angebot mit transparenten Konditionen und einer realistischen Lieferzeit.',
    button: 'Kostenlose Anfrage',
  },
  bottom: [
    ['SOFTWARE & LOKALISIERUNG', 'Lokalisierung von Software, Webanwendungen und IT-Produkten in zahlreiche Sprachen.', 'technology.png'],
    ['CLOUD & DEVOPS', 'Übersetzungen für Cloud-Architekturen, DevOps-Dokumentationen, Runbooks und IT-Infrastrukturen.', 'cloud-service.png'],
    ['IT-SICHERHEIT & DSGVO', 'Fachgerechte Übersetzungen für Sicherheitsrichtlinien, Datenschutzdokumente und Compliance-Anforderungen.', 'shield.png'],
    ['APPS & GAMING', 'Lokalisierung von Apps, Spielen und Benutzeroberflächen für optimale Nutzererlebnisse weltweit.', 'mobile-development.png'],
    ['TECHNISCHE DOKUMENTATION', 'Übersetzung von API-Dokumentationen, Benutzerhandbüchern, Installationsanleitungen und technischen Spezifikationen.', 'file.png'],
    ['DEUTSCHLANDWEIT TÄTIG', 'Ihr zuverlässiger Partner für IT-Übersetzungen und Softwarelokalisierung – bundesweit und international.', 'germany-map.png'],
  ],
};

function DatabaseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.66 3.13 3 7 3s7-1.34 7-3V5" />
      <path d="M5 11v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
    </svg>
  );
}

function ItAssetBubble({ asset, alt = '' }) {
  return (
    <span className="it-asset-bubble" aria-hidden={alt ? undefined : 'true'}>
      <img src={`${IT_ASSET_BASE}${asset}`} alt={alt} loading="lazy" />
    </span>
  );
}

function DolmetscherAsset({ asset, className = '', alt = '' }) {
  return (
    <span className={`dolm-asset ${className}`} aria-hidden={alt ? undefined : 'true'}>
      <img src={`${DOLMETSCHER_ASSET_BASE}${asset}`} alt={alt} loading="lazy" />
    </span>
  );
}

function BeeidigteAsset({ asset, className = '', alt = '' }) {
  return (
    <span className={`beeidigt-asset ${className}`} aria-hidden={alt ? undefined : 'true'}>
      <img src={`${BEEIDIGTE_ASSET_BASE}${asset}`} alt={alt} loading="lazy" />
    </span>
  );
}

function StandesamtAsset({ asset, className = '', alt = '' }) {
  return (
    <span className={`standesamt-asset ${className}`} aria-hidden={alt ? undefined : 'true'}>
      <img src={`${STANDESAMT_ASSET_BASE}${asset}`} alt={alt} loading="lazy" />
    </span>
  );
}

function WirtschaftAsset({ asset, className = '', alt = '' }) {
  return (
    <span className={`wirtschaft-asset ${className}`} aria-hidden={alt ? undefined : 'true'}>
      <img src={`${WIRTSCHAFT_ASSET_BASE}${asset}`} alt={alt} loading="lazy" />
    </span>
  );
}

function BeglaubigteAsset({ asset, className = '', alt = '' }) {
  return (
    <span className={`beglaubigte-asset ${className}`} aria-hidden={alt ? undefined : 'true'}>
      <img src={`${BEGLAUBIGTE_ASSET_BASE}${asset}`} alt={alt} loading="lazy" />
    </span>
  );
}

function PointGridAsset({ base, asset, className = '', alt = '' }) {
  return (
    <span className={`point-grid-asset ${className}`} aria-hidden={alt ? undefined : 'true'}>
      <img src={`${base}${asset}`} alt={alt} loading="lazy" />
    </span>
  );
}

const REQUEST_CARD_COPY = {
  de: { title: 'Unverbindliche Anfrage', translation: 'Übersetzungsanfrage ›', interpreting: 'Dolmetscher-Anfrage ›' },
  en: { title: 'Non-binding request', translation: 'Translation request ›', interpreting: 'Interpreter request ›' },
  ar: { title: 'طلب غير ملزم', translation: 'طلب ترجمة ›', interpreting: 'طلب مترجم فوري ›' },
  tr: { title: 'Bağlayıcı olmayan talep', translation: 'Çeviri talebi ›', interpreting: 'Tercüman talebi ›' },
  ru: { title: 'Запрос без обязательств', translation: 'Запрос перевода ›', interpreting: 'Запрос устного переводчика ›' },
  fr: { title: 'Demande sans engagement', translation: 'Demande de traduction ›', interpreting: 'Demande d’interprète ›' },
  uk: { title: 'Запит без зобов’язань', translation: 'Запит перекладу ›', interpreting: 'Запит усного перекладача ›' },
};

function RequestCard({ lang = 'de', className = '' }) {
  const copy = REQUEST_CARD_COPY[lang] || REQUEST_CARD_COPY.de;

  return (
    <div className={`dolm-request-card ${className}`.trim()} aria-label={copy.title}>
      <span className="dolm-request-info">i</span>
      <div>
        <strong>{copy.title}</strong>
        <a href={getOfferHref(lang)}>{copy.translation}</a>
        <a href={getOfferHref(lang)}>{copy.interpreting}</a>
      </div>
    </div>
  );
}

function splitSentences(text = '', max = 3) {
  return String(text)
    .split(/(?<=[.!?؟])\s+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, max);
}


const SERVICE_SHEET_TEXT_TRANSLATIONS = {
  'Medizinische Fachübersetzungen': { en: 'Medical specialist translations', ar: 'ترجمات طبية متخصصة', tr: 'Tıbbi uzman çeviriler', ru: 'Медицинские специализированные переводы', fr: 'Traductions médicales spécialisées', uk: 'Медичні фахові переклади' },
  'Spezialisierte Dental- und Zahntechnik-Übersetzungen': { en: 'Specialized dental and dental-technology translations', ar: 'ترجمات متخصصة لطب الأسنان وتقنية الأسنان', tr: 'Diş hekimliği ve diş teknolojisi için uzman çeviriler', ru: 'Специализированные переводы для стоматологии и зуботехники', fr: 'Traductions spécialisées en dentisterie et technologie dentaire', uk: 'Спеціалізовані переклади для стоматології та зуботехніки' },
  'Wir verfügen über Erfahrung in folgenden Bereichen:': { en: 'We have experience in the following areas:', ar: 'لدينا خبرة في المجالات التالية:', tr: 'Aşağıdaki alanlarda deneyim sahibiyiz:', ru: 'У нас есть опыт в следующих областях:', fr: 'Nous disposons d’une expérience dans les domaines suivants :', uk: 'Ми маємо досвід у таких сферах:' },
  'Gesundheitswesen & Medizintechnik': { en: 'Healthcare and medical technology', ar: 'الرعاية الصحية والتقنية الطبية', tr: 'Sağlık sektörü ve medikal teknoloji', ru: 'Здравоохранение и медицинская техника', fr: 'Santé et technologie médicale', uk: 'Охорона здоров’я та медична техніка' },
  'Unsere Übersetzungen unterstützen:': { en: 'Our translations support:', ar: 'تدعم ترجماتنا:', tr: 'Çevirilerimiz şunları destekler:', ru: 'Наши переводы поддерживают:', fr: 'Nos traductions accompagnent :', uk: 'Наші переклади підтримують:' },
  'CAD/CAM-Systeme': { en: 'CAD/CAM systems', ar: 'أنظمة CAD/CAM', tr: 'CAD/CAM sistemleri', ru: 'CAD/CAM-системы', fr: 'Systèmes CAD/CAM', uk: 'CAD/CAM-системи' },
  'Intraoralscanner': { en: 'Intraoral scanners', ar: 'ماسحات داخل الفم', tr: 'Ağız içi tarayıcılar', ru: 'Интраоральные сканеры', fr: 'Scanners intra-oraux', uk: 'Інтраоральні сканери' },
  'Dentalsoftware': { en: 'Dental software', ar: 'برمجيات طب الأسنان', tr: 'Dental yazılım', ru: 'Стоматологическое ПО', fr: 'Logiciels dentaires', uk: 'Стоматологічне програмне забезпечення' },
  '3D-Druck': { en: '3D printing', ar: 'الطباعة ثلاثية الأبعاد', tr: '3D baskı', ru: '3D-печать', fr: 'Impression 3D', uk: '3D-друк' },
  'Implantatsysteme': { en: 'Implant systems', ar: 'أنظمة الزرعات', tr: 'İmplant sistemleri', ru: 'Имплантационные системы', fr: 'Systèmes d’implants', uk: 'Імплантаційні системи' },
  'Keramiksysteme': { en: 'Ceramic systems', ar: 'أنظمة السيراميك', tr: 'Seramik sistemleri', ru: 'Керамические системы', fr: 'Systèmes céramiques', uk: 'Керамічні системи' },
  'Füllungsmaterialien': { en: 'Filling materials', ar: 'مواد الحشو', tr: 'Dolgu malzemeleri', ru: 'Пломбировочные материалы', fr: 'Matériaux d’obturation', uk: 'Пломбувальні матеріали' },
  'Dentallabortechnik': { en: 'Dental laboratory technology', ar: 'تقنيات مختبرات الأسنان', tr: 'Diş laboratuvarı teknolojisi', ru: 'Зуботехнические лабораторные технологии', fr: 'Technologie de laboratoire dentaire', uk: 'Технології зуботехнічних лабораторій' },
  'Kliniken und Krankenhäuser': { en: 'Clinics and hospitals', ar: 'العيادات والمستشفيات', tr: 'Klinikler ve hastaneler', ru: 'Клиники и больницы', fr: 'Cliniques et hôpitaux', uk: 'Клініки та лікарні' },
  'Arzt- und Zahnarztpraxen': { en: 'Medical and dental practices', ar: 'عيادات الأطباء وأطباء الأسنان', tr: 'Doktor ve diş hekimi muayenehaneleri', ru: 'Медицинские и стоматологические практики', fr: 'Cabinets médicaux et dentaires', uk: 'Медичні та стоматологічні практики' },
  'Medizintechnik-Hersteller': { en: 'Medical technology manufacturers', ar: 'مصنّعو التقنية الطبية', tr: 'Medikal teknoloji üreticileri', ru: 'Производители медицинской техники', fr: 'Fabricants de technologie médicale', uk: 'Виробники медичної техніки' },
  'Dentallabore': { en: 'Dental laboratories', ar: 'مختبرات الأسنان', tr: 'Diş laboratuvarları', ru: 'Зуботехнические лаборатории', fr: 'Laboratoires dentaires', uk: 'Зуботехнічні лабораторії' },
  'Klinische Studien': { en: 'Clinical studies', ar: 'الدراسات السريرية', tr: 'Klinik çalışmalar', ru: 'Клинические исследования', fr: 'Études cliniques', uk: 'Клінічні дослідження' },
  'Medizinische Software': { en: 'Medical software', ar: 'برمجيات طبية', tr: 'Tıbbi yazılım', ru: 'Медицинское ПО', fr: 'Logiciels médicaux', uk: 'Медичне програмне забезпечення' },
  'Patientenkommunikation': { en: 'Patient communication', ar: 'التواصل مع المرضى', tr: 'Hasta iletişimi', ru: 'Коммуникация с пациентами', fr: 'Communication patient', uk: 'Комунікація з пацієнтами' },
  'Internationale Zulassungen': { en: 'International approvals', ar: 'التراخيص الدولية', tr: 'Uluslararası ruhsatlandırmalar', ru: 'Международные регистрации', fr: 'Autorisations internationales', uk: 'Міжнародні реєстрації' },
  'Fachübersetzungen für Chemie & Biowissenschaften': { en: 'Specialist translations for chemistry and life sciences', ar: 'ترجمات متخصصة للكيمياء وعلوم الحياة', tr: 'Kimya ve yaşam bilimleri için uzman çeviriler', ru: 'Специализированные переводы для химии и наук о жизни', fr: 'Traductions spécialisées pour la chimie et les sciences de la vie', uk: 'Фахові переклади для хімії та наук про життя' },
  'Naturwissenschaftliche Fachkompetenz': { en: 'Scientific specialist expertise', ar: 'خبرة تخصصية في العلوم الطبيعية', tr: 'Doğa bilimleri uzmanlığı', ru: 'Естественнонаучная компетенция', fr: 'Expertise scientifique spécialisée', uk: 'Природничо-наукова фахова компетентність' },
  'Unsere Fachübersetzer verfügen über Erfahrung in:': { en: 'Our specialist translators have experience in:', ar: 'يتمتع مترجمونا المتخصصون بخبرة في:', tr: 'Uzman çevirmenlerimiz şu alanlarda deneyimlidir:', ru: 'Наши специализированные переводчики имеют опыт в:', fr: 'Nos traducteurs spécialisés ont de l’expérience en :', uk: 'Наші фахові перекладачі мають досвід у:' },
  'Organischer Chemie': { en: 'Organic chemistry', ar: 'الكيمياء العضوية', tr: 'Organik kimya', ru: 'Органическая химия', fr: 'Chimie organique', uk: 'Органічна хімія' },
  'Anorganischer Chemie': { en: 'Inorganic chemistry', ar: 'الكيمياء غير العضوية', tr: 'Anorganik kimya', ru: 'Неорганическая химия', fr: 'Chimie inorganique', uk: 'Неорганічна хімія' },
  'Polymerchemie': { en: 'Polymer chemistry', ar: 'كيمياء البوليمرات', tr: 'Polimer kimyası', ru: 'Химия полимеров', fr: 'Chimie des polymères', uk: 'Хімія полімерів' },
  'Materialwissenschaften': { en: 'Materials science', ar: 'علوم المواد', tr: 'Malzeme bilimleri', ru: 'Материаловедение', fr: 'Science des matériaux', uk: 'Матеріалознавство' },
  'Analytischer Chemie': { en: 'Analytical chemistry', ar: 'الكيمياء التحليلية', tr: 'Analitik kimya', ru: 'Аналитическая химия', fr: 'Chimie analytique', uk: 'Аналітична хімія' },
  'Umweltanalytik': { en: 'Environmental analytics', ar: 'التحليل البيئي', tr: 'Çevre analitiği', ru: 'Экологическая аналитика', fr: 'Analyse environnementale', uk: 'Екологічна аналітика' },
  'Biochemie': { en: 'Biochemistry', ar: 'الكيمياء الحيوية', tr: 'Biyokimya', ru: 'Биохимия', fr: 'Biochimie', uk: 'Біохімія' },
  'Molekularbiologie': { en: 'Molecular biology', ar: 'علم الأحياء الجزيئي', tr: 'Moleküler biyoloji', ru: 'Молекулярная биология', fr: 'Biologie moléculaire', uk: 'Молекулярна біологія' },
  'Genetik': { en: 'Genetics', ar: 'علم الوراثة', tr: 'Genetik', ru: 'Генетика', fr: 'Génétique', uk: 'Генетика' },
  'Biotechnologie': { en: 'Biotechnology', ar: 'التكنولوجيا الحيوية', tr: 'Biyoteknoloji', ru: 'Биотехнология', fr: 'Biotechnologie', uk: 'Біотехнологія' },
  'Chemische Fachübersetzungen': { en: 'Chemical specialist translations', ar: 'ترجمات كيميائية متخصصة', tr: 'Kimyasal uzman çeviriler', ru: 'Химические специализированные переводы', fr: 'Traductions spécialisées en chimie', uk: 'Хімічні фахові переклади' },
  'Übersetzungen für chemische Dokumente, Sicherheitsdatenblätter und Analyseunterlagen.': { en: 'Translations for chemical documents, safety data sheets and analytical materials.', ar: 'ترجمات للوثائق الكيميائية وأوراق بيانات السلامة ووثائق التحليل.', tr: 'Kimyasal belgeler, güvenlik bilgi formları ve analiz dokümanları için çeviriler.', ru: 'Переводы химических документов, паспортов безопасности и аналитических материалов.', fr: 'Traductions de documents chimiques, fiches de données de sécurité et dossiers d’analyse.', uk: 'Переклади хімічних документів, паспортів безпеки та аналітичних матеріалів.' },
  'Biowissenschaften & Life Sciences': { en: 'Biosciences and life sciences', ar: 'العلوم الحيوية وعلوم الحياة', tr: 'Biyobilimler ve yaşam bilimleri', ru: 'Биологические науки и науки о жизни', fr: 'Biosciences et sciences de la vie', uk: 'Біонауки та науки про життя' },
  'Fachübersetzungen für Biotechnologie, Molekularbiologie und wissenschaftliche Forschung.': { en: 'Specialist translations for biotechnology, molecular biology and scientific research.', ar: 'ترجمات متخصصة للتكنولوجيا الحيوية وعلم الأحياء الجزيئي والبحث العلمي.', tr: 'Biyoteknoloji, moleküler biyoloji ve bilimsel araştırmalar için uzman çeviriler.', ru: 'Специализированные переводы для биотехнологии, молекулярной биологии и научных исследований.', fr: 'Traductions spécialisées pour la biotechnologie, la biologie moléculaire et la recherche scientifique.', uk: 'Фахові переклади для біотехнології, молекулярної біології та наукових досліджень.' },
  'Labor & Forschung': { en: 'Laboratory and research', ar: 'المختبر والبحث', tr: 'Laboratuvar ve araştırma', ru: 'Лаборатория и исследования', fr: 'Laboratoire et recherche', uk: 'Лабораторія та дослідження' },
  'Übersetzungen für Laborberichte, Studien, Prüfberichte und Forschungsdokumente.': { en: 'Translations for laboratory reports, studies, test reports and research documents.', ar: 'ترجمات لتقارير المختبرات والدراسات وتقارير الاختبار ووثائق البحث.', tr: 'Laboratuvar raporları, çalışmalar, test raporları ve araştırma belgeleri için çeviriler.', ru: 'Переводы лабораторных отчетов, исследований, протоколов испытаний и исследовательских документов.', fr: 'Traductions de rapports de laboratoire, études, rapports d’essai et documents de recherche.', uk: 'Переклади лабораторних звітів, досліджень, протоколів випробувань і дослідницьких документів.' },
  'Juristische Fachübersetzungen': { en: 'Legal specialist translations', ar: 'ترجمات قانونية متخصصة', tr: 'Hukuki uzman çeviriler', ru: 'Юридические специализированные переводы', fr: 'Traductions juridiques spécialisées', uk: 'Юридичні фахові переклади' },
  'Wir erstellen präzise Fachübersetzungen für Kanzleien, Notare, Gerichte, Unternehmen, Behörden und Privatpersonen.': { en: 'We prepare precise specialist translations for law firms, notaries, courts, companies, authorities and private clients.', ar: 'نعد ترجمات قانونية متخصصة ودقيقة للمحامين وكتاب العدل والمحاكم والشركات والجهات الحكومية والعملاء الأفراد.', tr: 'Hukuk büroları, noterler, mahkemeler, şirketler, resmi kurumlar ve özel müşteriler için hassas uzman çeviriler hazırlıyoruz.', ru: 'Мы выполняем точные специализированные переводы для юридических фирм, нотариусов, судов, компаний, органов власти и частных клиентов.', fr: 'Nous réalisons des traductions spécialisées précises pour cabinets d’avocats, notaires, tribunaux, entreprises, administrations et particuliers.', uk: 'Ми виконуємо точні фахові переклади для юридичних фірм, нотаріусів, судів, компаній, органів влади та приватних клієнтів.' },
  'Wir übersetzen Verträge, Urteile, Beschlüsse, Vollmachten, Satzungen, Klageschriften, Urkunden und viele weitere juristische Dokumente.': { en: 'We translate contracts, judgments, decisions, powers of attorney, statutes, statements of claim, certificates and many other legal documents.', ar: 'نترجم العقود والأحكام والقرارات والتوكيلات والأنظمة الأساسية ولوائح الدعوى والوثائق الرسمية والعديد من المستندات القانونية الأخرى.', tr: 'Sözleşmeleri, kararları, hükümleri, vekaletnameleri, tüzükleri, dava dilekçelerini, belgeleri ve daha birçok hukuki dokümanı çeviriyoruz.', ru: 'Мы переводим договоры, судебные решения, постановления, доверенности, уставы, исковые заявления, документы и многие другие юридические материалы.', fr: 'Nous traduisons contrats, jugements, décisions, procurations, statuts, actes de procédure, certificats et de nombreux autres documents juridiques.', uk: 'Ми перекладаємо договори, судові рішення, постанови, довіреності, статути, позовні заяви, документи та багато інших юридичних матеріалів.' },
  'Unsere allgemein beeidigten Dolmetscher begleiten Sie zuverlässig bei Terminen bei Behörden, Gerichten, Notaren, Standesämtern, Anhörungen sowie in Konsulaten und Botschaften.': { en: 'Our generally sworn interpreters reliably support you at appointments with authorities, courts, notaries, registry offices, hearings, consulates and embassies.', ar: 'يرافقكم مترجمونا الفوريون المحلفون بشكل موثوق في المواعيد لدى الجهات الحكومية والمحاكم وكتاب العدل ومكاتب الزواج وجلسات الاستماع والقنصليات والسفارات.', tr: 'Genel yeminli tercümanlarımız resmi kurumlar, mahkemeler, noterler, nüfus/evlendirme daireleri, duruşmalar, konsolosluklar ve büyükelçiliklerdeki randevularınızda size güvenilir şekilde eşlik eder.', ru: 'Наши присяжные устные переводчики надежно сопровождают вас на встречах в органах власти, судах, у нотариусов, в ЗАГСах, на слушаниях, в консульствах и посольствах.', fr: 'Nos interprètes généralement assermentés vous accompagnent de manière fiable lors de rendez-vous auprès des administrations, tribunaux, notaires, services d’état civil, auditions, consulats et ambassades.', uk: 'Наші присяжні усні перекладачі надійно супроводжують вас під час зустрічей в органах влади, судах, у нотаріусів, РАЦСах, на слуханнях, у консульствах і посольствах.' },
  'Dank unseres bundesweiten Netzwerks mit über 8.000 qualifizierten Dolmetschern und Übersetzern finden wir für nahezu jede Sprache den passenden Ansprechpartner. Unsere Muttersprachler sind fachlich qualifiziert und – soweit erforderlich – allgemein beeidigt bzw. ermächtigt.': { en: 'Thanks to our nationwide network of more than 8,000 qualified interpreters and translators, we find the right contact for almost every language. Our native speakers are professionally qualified and, where required, generally sworn or authorized.', ar: 'بفضل شبكتنا المنتشرة في جميع أنحاء ألمانيا والتي تضم أكثر من 8,000 مترجم فوري وتحريري مؤهل، نجد الشخص المناسب لكل لغة تقريبا. متحدثونا الأصليون مؤهلون مهنيا ومحلفون أو مخولون عند الحاجة.', tr: 'Almanya genelindeki 8.000’den fazla nitelikli tercüman ve çevirmen ağımız sayesinde neredeyse her dil için uygun uzmanı buluyoruz. Ana dili uzmanlarımız mesleki olarak yetkindir ve gerektiğinde genel yeminli veya yetkilidir.', ru: 'Благодаря нашей общегерманской сети из более чем 8 000 квалифицированных устных и письменных переводчиков мы находим подходящего специалиста почти для любого языка. Наши носители языка профессионально квалифицированы и, при необходимости, присяжные или уполномоченные.', fr: 'Grâce à notre réseau national de plus de 8 000 interprètes et traducteurs qualifiés, nous trouvons le bon interlocuteur pour presque chaque langue. Nos locuteurs natifs sont qualifiés professionnellement et, si nécessaire, assermentés ou habilités.', uk: 'Завдяки нашій загальнонімецькій мережі з понад 8 000 кваліфікованих усних і письмових перекладачів ми знаходимо відповідного фахівця майже для кожної мови. Наші носії мови мають професійну кваліфікацію і, за потреби, є присяжними або уповноваженими.' },
  'Ob bei der Ausländerbehörde, vor Gericht, beim Notar oder im Standesamt – wir sorgen für eine präzise, neutrale und rechtssichere Sprachmittlung, damit Ihre Kommunikation reibungslos und offiziell anerkannt erfolgt.': { en: 'Whether at the immigration office, in court, at a notary or at the registry office, we ensure precise, neutral and legally reliable interpreting so your communication runs smoothly and is officially recognized.', ar: 'سواء في مكتب الأجانب أو أمام المحكمة أو لدى كاتب العدل أو في مكتب الزواج، نضمن ترجمة فورية دقيقة ومحايدة وموثوقة قانونيا حتى تسير تواصلكم بسلاسة ويتم الاعتراف به رسميا.', tr: 'Yabancılar dairesinde, mahkemede, noterde veya evlendirme dairesinde; iletişiminizin sorunsuz ve resmi olarak kabul edilebilir olması için hassas, tarafsız ve hukuken güvenilir tercümanlık sağlarız.', ru: 'Будь то ведомство по делам иностранцев, суд, нотариус или ЗАГС, мы обеспечиваем точный, нейтральный и юридически надежный устный перевод, чтобы ваша коммуникация проходила гладко и официально признавалась.', fr: 'Que ce soit auprès du service des étrangers, au tribunal, chez le notaire ou à l’état civil, nous assurons une interprétation précise, neutre et juridiquement fiable afin que votre communication soit fluide et officiellement reconnue.', uk: 'Чи то у відомстві у справах іноземців, у суді, у нотаріуса чи в РАЦСі, ми забезпечуємо точний, нейтральний і юридично надійний усний переклад, щоб ваша комунікація проходила безперешкодно й офіційно визнавалася.' },
  'Für Ihre standesamtliche Trauung stellen wir zuverlässige Dolmetscher, damit beide Partner jedes Wort verstehen und die Eheschließung rechtswirksam erfolgen kann.': { en: 'For your civil wedding, we provide reliable interpreters so both partners understand every word and the marriage can be legally valid.', ar: 'لحفل الزواج المدني نوفر مترجمين فوريين موثوقين حتى يفهم الطرفان كل كلمة ويتم عقد الزواج بصورة قانونية صحيحة.', tr: 'Resmi nikahınız için her iki eşin de her kelimeyi anlaması ve evliliğin hukuken geçerli şekilde yapılabilmesi için güvenilir tercümanlar sağlıyoruz.', ru: 'Для вашей регистрации брака мы предоставляем надежных переводчиков, чтобы оба партнера понимали каждое слово и брак был заключен юридически действительно.', fr: 'Pour votre mariage civil, nous fournissons des interprètes fiables afin que les deux partenaires comprennent chaque mot et que le mariage soit juridiquement valable.', uk: 'Для вашого цивільного шлюбу ми надаємо надійних перекладачів, щоб обидва партнери розуміли кожне слово і шлюб був юридично чинним.' },
  'Unsere beeidigten Standesamt-Dolmetscher begleiten Sie zum Standesamt, erläutern alle Erklärungen in Ihrer Sprache und sorgen für eine reibungslose Verständigung.': { en: 'Our sworn registry-office interpreters accompany you to the registry office, explain all statements in your language and ensure smooth communication.', ar: 'يرافقكم مترجمونا المحلفون إلى مكتب الزواج، ويوضحون جميع الإقرارات بلغتكم ويضمنون تواصلا سلسا.', tr: 'Yeminli evlendirme dairesi tercümanlarımız size evlendirme dairesinde eşlik eder, tüm beyanları dilinizde açıklar ve sorunsuz iletişim sağlar.', ru: 'Наши присяжные переводчики для ЗАГСа сопровождают вас в ЗАГС, объясняют все заявления на вашем языке и обеспечивают беспрепятственное взаимопонимание.', fr: 'Nos interprètes assermentés pour l’état civil vous accompagnent au service d’état civil, expliquent toutes les déclarations dans votre langue et assurent une communication fluide.', uk: 'Наші присяжні перекладачі для РАЦСу супроводжують вас до РАЦСу, пояснюють усі заяви вашою мовою та забезпечують безперешкодне порозуміння.' },
  'So können Sie sich ganz auf Ihren besonderen Tag konzentrieren – wir übernehmen die sprachliche Begleitung.': { en: 'This lets you focus fully on your special day while we take care of the language support.', ar: 'وبذلك يمكنكم التركيز تماما على يومكم الخاص، بينما نتولى نحن الدعم اللغوي.', tr: 'Böylece siz özel gününüze tamamen odaklanabilirsiniz; dil desteğini biz üstleniriz.', ru: 'Так вы можете полностью сосредоточиться на своем особенном дне, а языковое сопровождение берем на себя мы.', fr: 'Vous pouvez ainsi vous concentrer pleinement sur votre journée spéciale pendant que nous prenons en charge l’accompagnement linguistique.', uk: 'Так ви можете повністю зосередитися на своєму особливому дні, а мовний супровід беремо на себе ми.' },
  'Wir unterstützen Unternehmen, Kanzleien, Banken und Versicherungen mit präzisen Fachübersetzungen im Bereich Wirtschaft und Finanzen.': { en: 'We support companies, law firms, banks and insurance providers with precise specialist translations in business and finance.', ar: 'ندعم الشركات ومكاتب المحاماة والبنوك وشركات التأمين بترجمات متخصصة دقيقة في مجال الأعمال والمال.', tr: 'Şirketleri, hukuk bürolarını, bankaları ve sigorta şirketlerini ekonomi ve finans alanında hassas uzman çevirilerle destekliyoruz.', ru: 'Мы поддерживаем компании, юридические фирмы, банки и страховые компании точными специализированными переводами в области экономики и финансов.', fr: 'Nous accompagnons entreprises, cabinets d’avocats, banques et assurances avec des traductions spécialisées précises dans le domaine économique et financier.', uk: 'Ми підтримуємо компанії, юридичні фірми, банки та страхові компанії точними фаховими перекладами у сфері економіки й фінансів.' },
  'Dolmetscherdienste': { en: 'Interpreting services', ar: 'خدمات الترجمة الفورية', tr: 'Tercümanlık hizmetleri', ru: 'Услуги устного перевода', fr: 'Services d’interprétation', uk: 'Послуги усного перекладу' },
  'Fachübersetzungen': { en: 'Specialist translations', ar: 'ترجمات متخصصة', tr: 'Uzman çeviriler', ru: 'Специализированные переводы', fr: 'Traductions spécialisées', uk: 'Фахові переклади' },
  'Fachübersetzung': { en: 'Specialist translation', ar: 'ترجمة متخصصة', tr: 'Uzman çeviri', ru: 'Специализированный перевод', fr: 'Traduction spécialisée', uk: 'Фаховий переклад' },
  'Übersetzung': { en: 'Translation', ar: 'ترجمة', tr: 'Çeviri', ru: 'Перевод', fr: 'Traduction', uk: 'Переклад' },
  'Was sind Fachübersetzungen?': { en: 'What are specialist translations?', ar: 'ما هي الترجمات المتخصصة؟', tr: 'Uzman çeviriler nedir?', ru: 'Что такое специализированные переводы?', fr: 'Que sont les traductions spécialisées ?', uk: 'Що таке фахові переклади?' },
  'Unsere Fachübersetzungsbereiche:': { en: 'Our specialist translation areas:', ar: 'مجالات الترجمة المتخصصة لدينا:', tr: 'Uzman çeviri alanlarımız:', ru: 'Наши направления специализированного перевода:', fr: 'Nos domaines de traduction spécialisée :', uk: 'Наші напрями фахового перекладу:' },
  'Über 190 Sprachen': { en: 'Over 190 languages', ar: 'أكثر من 190 لغة', tr: '190’dan fazla dil', ru: 'Более 190 языков', fr: 'Plus de 190 langues', uk: 'Понад 190 мов' },
  'Erfahrene Dolmetscher': { en: 'Experienced interpreters', ar: 'مترجمون فوريون ذوو خبرة', tr: 'Deneyimli tercümanlar', ru: 'Опытные устные переводчики', fr: 'Interprètes expérimentés', uk: 'Досвідчені усні перекладачі' },
  'Flexible Einsatzformen': { en: 'Flexible assignment formats', ar: 'أشكال عمل مرنة', tr: 'Esnek görev biçimleri', ru: 'Гибкие форматы работы', fr: 'Formats d’intervention flexibles', uk: 'Гнучкі формати роботи' },
  'Simultandolmetschen': { en: 'Simultaneous interpreting', ar: 'ترجمة فورية متزامنة', tr: 'Simultane tercümanlık', ru: 'Синхронный перевод', fr: 'Interprétation simultanée', uk: 'Синхронний переклад' },
  'Viele Sprachkombinationen': { en: 'Many language combinations', ar: 'تركيبات لغوية عديدة', tr: 'Birçok dil kombinasyonu', ru: 'Многие языковые комбинации', fr: 'Nombreuses combinaisons linguistiques', uk: 'Багато мовних комбінацій' },
  'Erfahrene Teams': { en: 'Experienced teams', ar: 'فرق ذات خبرة', tr: 'Deneyimli ekipler', ru: 'Опытные команды', fr: 'Équipes expérimentées', uk: 'Досвідчені команди' },
  'Moderne Technik': { en: 'Modern technology', ar: 'تقنية حديثة', tr: 'Modern teknoloji', ru: 'Современная техника', fr: 'Technologie moderne', uk: 'Сучасна техніка' },
  'Präzision': { en: 'Precision', ar: 'الدقة', tr: 'Hassasiyet', ru: 'Точность', fr: 'Précision', uk: 'Точність' },
  'Rechtssicherheit': { en: 'Legal certainty', ar: 'الأمان القانوني', tr: 'Hukuki güvence', ru: 'Правовая надежность', fr: 'Sécurité juridique', uk: 'Правова надійність' },
  'Erfahrung': { en: 'Experience', ar: 'الخبرة', tr: 'Deneyim', ru: 'Опыт', fr: 'Expérience', uk: 'Досвід' },
  'Flexibel & zuverlässig': { en: 'Flexible and reliable', ar: 'مرن وموثوق', tr: 'Esnek ve güvenilir', ru: 'Гибко и надежно', fr: 'Flexible et fiable', uk: 'Гнучко та надійно' },
  'Amtlich beeidigt': { en: 'Officially sworn', ar: 'محلف رسميا', tr: 'Resmi yeminli', ru: 'Официально присяжный', fr: 'Assermenté officiellement', uk: 'Офіційно присяжний' },
  'Rechtssicher': { en: 'Legally reliable', ar: 'موثوق قانونيا', tr: 'Hukuken güvenilir', ru: 'Юридически надежно', fr: 'Juridiquement fiable', uk: 'Юридично надійно' },
  'Vielseitig einsetzbar': { en: 'Versatile use', ar: 'استخدامات متعددة', tr: 'Çok yönlü kullanım', ru: 'Универсальное применение', fr: 'Utilisation polyvalente', uk: 'Універсальне застосування' },
  'Vertraulichkeit': { en: 'Confidentiality', ar: 'السرية', tr: 'Gizlilik', ru: 'Конфиденциальность', fr: 'Confidentialité', uk: 'Конфіденційність' },
  'Internationale Rechtskommunikation': { en: 'International legal communication', ar: 'تواصل قانوني دولي', tr: 'Uluslararası hukuk iletişimi', ru: 'Международная юридическая коммуникация', fr: 'Communication juridique internationale', uk: 'Міжнародна правова комунікація' },
  'Rechtssichere Übersetzungen': { en: 'Legally reliable translations', ar: 'ترجمات موثوقة قانونيا', tr: 'Hukuken güvenilir çeviriler', ru: 'Юридически надежные переводы', fr: 'Traductions juridiquement fiables', uk: 'Юридично надійні переклади' },
  'Juristische Fachterminologie': { en: 'Legal terminology', ar: 'مصطلحات قانونية متخصصة', tr: 'Hukuki terminoloji', ru: 'Юридическая терминология', fr: 'Terminologie juridique', uk: 'Юридична термінологія' },
  'Verträge & Urkunden': { en: 'Contracts and certificates', ar: 'العقود والوثائق', tr: 'Sözleşmeler ve belgeler', ru: 'Договоры и документы', fr: 'Contrats et actes', uk: 'Договори та документи' },
  'Recht': { en: 'Law', ar: 'القانون', tr: 'Hukuk', ru: 'Право', fr: 'Droit', uk: 'Право' },
  'Ingenieurwesen': { en: 'Engineering', ar: 'الهندسة', tr: 'Mühendislik', ru: 'Инженерия', fr: 'Ingénierie', uk: 'Інженерія' },
  'Medizin & Zahnmedizin': { en: 'Medicine and dentistry', ar: 'الطب وطب الأسنان', tr: 'Tıp ve diş hekimliği', ru: 'Медицина и стоматология', fr: 'Médecine et dentisterie', uk: 'Медицина та стоматологія' },
  'Pharmazie': { en: 'Pharmacy', ar: 'الصيدلة', tr: 'Eczacılık', ru: 'Фармацевтика', fr: 'Pharmacie', uk: 'Фармація' },
  'Literatur': { en: 'Literature', ar: 'الأدب', tr: 'Edebiyat', ru: 'Литература', fr: 'Littérature', uk: 'Література' },
  'IT & Software': { en: 'IT and software', ar: 'تقنية المعلومات والبرمجيات', tr: 'BT ve yazılım', ru: 'IT и программное обеспечение', fr: 'IT et logiciels', uk: 'IT та програмне забезпечення' },
  'Chemie & Biowissenschaften': { en: 'Chemistry and life sciences', ar: 'الكيمياء وعلوم الحياة', tr: 'Kimya ve yaşam bilimleri', ru: 'Химия и науки о жизни', fr: 'Chimie et sciences de la vie', uk: 'Хімія та науки про життя' },
  'Industrie & Produktion': { en: 'Industry and production', ar: 'الصناعة والإنتاج', tr: 'Sanayi ve üretim', ru: 'Промышленность и производство', fr: 'Industrie et production', uk: 'Промисловість і виробництво' },
  'Typische Rechtsdokumente, die wir regelmäßig übersetzen:': { en: 'Typical legal documents we regularly translate:', ar: 'وثائق قانونية نموذجية نترجمها بانتظام:', tr: 'Düzenli olarak çevirdiğimiz tipik hukuki belgeler:', ru: 'Типичные юридические документы, которые мы регулярно переводим:', fr: 'Documents juridiques typiques que nous traduisons régulièrement :', uk: 'Типові юридичні документи, які ми регулярно перекладаємо:' },
  'Wir stellen sicher, dass alle Beteiligten jedes Detail verstehen – unabhängig davon, ob der Termin ein- oder mehrsprachig stattfindet.': { en: 'We make sure everyone involved understands every detail, regardless of whether the appointment is monolingual or multilingual.', ar: 'نضمن أن يفهم جميع المشاركين كل التفاصيل، سواء كان الموعد بلغة واحدة أو بعدة لغات.', tr: 'Randevu tek dilli veya çok dilli olsun, tüm katılımcıların her ayrıntıyı anlamasını sağlarız.', ru: 'Мы гарантируем, что все участники понимают каждую деталь, независимо от того, проходит встреча на одном или нескольких языках.', fr: 'Nous veillons à ce que toutes les personnes concernées comprennent chaque détail, que le rendez-vous soit monolingue ou multilingue.', uk: 'Ми забезпечуємо, щоб усі учасники розуміли кожну деталь, незалежно від того, чи зустріч проходить однією мовою чи кількома.' },
  'Präzise Sprachmittlung für notarielle Beurkundungen und Verträge.': { en: 'Precise interpreting for notarial certifications and contracts.', ar: 'ترجمة فورية دقيقة للتوثيقات والعقود لدى كاتب العدل.', tr: 'Noter tasdikleri ve sözleşmeler için hassas sözlü çeviri.', ru: 'Точный устный перевод для нотариальных удостоверений и договоров.', fr: 'Interprétation précise pour les actes notariés et les contrats.', uk: 'Точний усний переклад для нотаріальних посвідчень і договорів.' },
  'Vollständige und rechtssichere Verständigung bei notariellen Terminen.': { en: 'Complete and legally reliable communication at notary appointments.', ar: 'تواصل كامل وموثوق قانونيا في مواعيد كاتب العدل.', tr: 'Noter randevularında eksiksiz ve hukuken güvenilir iletişim.', ru: 'Полное и юридически надежное взаимопонимание на нотариальных встречах.', fr: 'Communication complète et juridiquement fiable lors des rendez-vous notariés.', uk: 'Повна та юридично надійна комунікація під час нотаріальних зустрічей.' },
  'Regelmäßige Zusammenarbeit mit Notariaten und umfassende Praxiserfahrung.': { en: 'Regular cooperation with notary offices and extensive practical experience.', ar: 'تعاون منتظم مع مكاتب كاتب العدل وخبرة عملية واسعة.', tr: 'Noterliklerle düzenli iş birliği ve kapsamlı uygulama deneyimi.', ru: 'Регулярное сотрудничество с нотариальными конторами и обширный практический опыт.', fr: 'Collaboration régulière avec des études notariales et grande expérience pratique.', uk: 'Регулярна співпраця з нотаріальними конторами та широкий практичний досвід.' },
  'Kurzfristige Termine und bundesweite Einsätze auf Anfrage möglich.': { en: 'Short-notice appointments and nationwide assignments are possible on request.', ar: 'يمكن توفير مواعيد عاجلة ومهام في جميع أنحاء ألمانيا عند الطلب.', tr: 'Talep üzerine kısa süreli randevular ve Almanya genelinde görevlendirmeler mümkündür.', ru: 'По запросу возможны срочные встречи и выезды по всей Германии.', fr: 'Rendez-vous à court terme et interventions dans toute l’Allemagne possibles sur demande.', uk: 'За запитом можливі термінові зустрічі та виїзди по всій Німеччині.' },
  'Für Kanzleien, Unternehmen, Behörden und internationale Verfahren.': { en: 'For law firms, companies, authorities and international proceedings.', ar: 'للمحامين والشركات والجهات الحكومية والإجراءات الدولية.', tr: 'Hukuk büroları, şirketler, resmi kurumlar ve uluslararası süreçler için.', ru: 'Для юридических фирм, компаний, органов власти и международных процедур.', fr: 'Pour cabinets d’avocats, entreprises, administrations et procédures internationales.', uk: 'Для юридичних фірм, компаній, органів влади та міжнародних процедур.' },
  'Für Verträge, Gerichtsdokumente, Gutachten und Schriftsätze.': { en: 'For contracts, court documents, expert opinions and pleadings.', ar: 'للعقود ووثائق المحاكم والتقارير القانونية والمذكرات.', tr: 'Sözleşmeler, mahkeme belgeleri, bilirkişi raporları ve dilekçeler için.', ru: 'Для договоров, судебных документов, заключений и процессуальных документов.', fr: 'Pour contrats, documents judiciaires, expertises et écritures juridiques.', uk: 'Для договорів, судових документів, експертних висновків і процесуальних документів.' },
  'Einheitliche Fachbegriffe und höchste Übersetzungsqualität.': { en: 'Consistent specialist terminology and the highest translation quality.', ar: 'مصطلحات متخصصة موحدة وأعلى جودة ترجمة.', tr: 'Tutarlı uzman terminoloji ve en yüksek çeviri kalitesi.', ru: 'Единая специализированная терминология и высочайшее качество перевода.', fr: 'Terminologie spécialisée cohérente et qualité de traduction maximale.', uk: 'Узгоджена фахова термінологія та найвища якість перекладу.' },
  'Immobilienverträge, Vollmachten, Maklerverträge und notarielle Urkunden.': { en: 'Real estate contracts, powers of attorney, brokerage contracts and notarial deeds.', ar: 'عقود العقارات والتوكيلات وعقود الوساطة والوثائق الموثقة.', tr: 'Gayrimenkul sözleşmeleri, vekaletnameler, aracılık sözleşmeleri ve noter belgeleri.', ru: 'Договоры недвижимости, доверенности, брокерские договоры и нотариальные документы.', fr: 'Contrats immobiliers, procurations, mandats de courtage et actes notariés.', uk: 'Договори нерухомості, довіреності, брокерські договори та нотаріальні документи.' },
  'Beeidigte Dolmetscher für Behörden, Gerichte, Notare und offizielle Termine.': { en: 'Sworn interpreters for authorities, courts, notaries and official appointments.', ar: 'مترجمون فوريون محلفون للجهات الحكومية والمحاكم وكتاب العدل والمواعيد الرسمية.', tr: 'Resmi kurumlar, mahkemeler, noterler ve resmi randevular için yeminli tercümanlar.', ru: 'Присяжные устные переводчики для ведомств, судов, нотариусов и официальных встреч.', fr: 'Interprètes assermentés pour administrations, tribunaux, notaires et rendez-vous officiels.', uk: 'Присяжні усні перекладачі для органів влади, судів, нотаріусів та офіційних зустрічей.' },
  'Präzise Dolmetschleistungen für Anhörungen, Verfahren und behördliche Gespräche.': { en: 'Precise interpreting for hearings, proceedings and official conversations.', ar: 'ترجمة فورية دقيقة لجلسات الاستماع والإجراءات والمحادثات الرسمية.', tr: 'Duruşmalar, işlemler ve resmi görüşmeler için hassas tercümanlık.', ru: 'Точный устный перевод для слушаний, процедур и официальных бесед.', fr: 'Interprétation précise pour auditions, procédures et entretiens administratifs.', uk: 'Точний усний переклад для слухань, процедур та офіційних розмов.' },
  'Dolmetscher für Standesamt, Ausländerbehörde, Konsulat und weitere Fachbereiche.': { en: 'Interpreters for registry offices, immigration authorities, consulates and other specialist areas.', ar: 'مترجمون لمكتب الزواج ومصلحة الأجانب والقنصليات ومجالات تخصصية أخرى.', tr: 'Nikah dairesi, yabancılar dairesi, konsolosluk ve diğer uzman alanlar için tercümanlar.', ru: 'Переводчики для ЗАГСа, ведомства по делам иностранцев, консульства и других сфер.', fr: 'Interprètes pour état civil, services des étrangers, consulats et autres domaines spécialisés.', uk: 'Перекладачі для РАЦСу, відомства у справах іноземців, консульства та інших сфер.' },
  'Vertrauliche Behandlung Ihrer Daten, Dokumente und persönlichen Anliegen.': { en: 'Confidential handling of your data, documents and personal matters.', ar: 'معالجة سرية لبياناتك ووثائقك وطلباتك الشخصية.', tr: 'Verilerinizin, belgelerinizin ve kişisel konularınızın gizli şekilde işlenmesi.', ru: 'Конфиденциальная обработка ваших данных, документов и личных вопросов.', fr: 'Traitement confidentiel de vos données, documents et demandes personnelles.', uk: 'Конфіденційна обробка ваших даних, документів та особистих питань.' },
  'Verträge, Urteile, Gutachten und juristische Dokumente.': { en: 'Contracts, judgments, expert opinions and legal documents.', ar: 'العقود والأحكام والتقارير القانونية والوثائق القانونية.', tr: 'Sözleşmeler, kararlar, raporlar ve hukuki belgeler.', ru: 'Договоры, судебные решения, заключения и юридические документы.', fr: 'Contrats, jugements, expertises et documents juridiques.', uk: 'Договори, судові рішення, висновки та юридичні документи.' },
  'Technische Dokumentationen, Handbücher und Spezifikationen.': { en: 'Technical documentation, manuals and specifications.', ar: 'الوثائق التقنية والأدلة والمواصفات.', tr: 'Teknik dokümantasyon, kılavuzlar ve şartnameler.', ru: 'Техническая документация, руководства и спецификации.', fr: 'Documentations techniques, manuels et spécifications.', uk: 'Технічна документація, посібники та специфікації.' },
  'Patientenunterlagen, Befunde, Studien und medizinische Fachtexte.': { en: 'Patient records, findings, studies and specialist medical texts.', ar: 'ملفات المرضى والنتائج والدراسات والنصوص الطبية المتخصصة.', tr: 'Hasta belgeleri, bulgular, çalışmalar ve tıbbi uzman metinleri.', ru: 'Документы пациентов, заключения, исследования и медицинские специализированные тексты.', fr: 'Dossiers patients, résultats, études et textes médicaux spécialisés.', uk: 'Документи пацієнтів, висновки, дослідження та фахові медичні тексти.' },
  'Studien, Fachinformationen und Zulassungsunterlagen.': { en: 'Studies, specialist information and approval documents.', ar: 'الدراسات والمعلومات المتخصصة ووثائق الترخيص.', tr: 'Çalışmalar, uzman bilgileri ve ruhsat belgeleri.', ru: 'Исследования, специализированная информация и регистрационные документы.', fr: 'Études, informations spécialisées et dossiers d’autorisation.', uk: 'Дослідження, фахова інформація та реєстраційні документи.' },
  'Bücher, Fachtexte, Artikel und kulturelle Inhalte.': { en: 'Books, specialist texts, articles and cultural content.', ar: 'الكتب والنصوص المتخصصة والمقالات والمحتوى الثقافي.', tr: 'Kitaplar, uzman metinler, makaleler ve kültürel içerikler.', ru: 'Книги, специализированные тексты, статьи и культурный контент.', fr: 'Livres, textes spécialisés, articles et contenus culturels.', uk: 'Книги, фахові тексти, статті та культурний контент.' },
  'Software, Apps, Handbücher und technische Dokumentationen.': { en: 'Software, apps, manuals and technical documentation.', ar: 'البرمجيات والتطبيقات والأدلة والوثائق التقنية.', tr: 'Yazılım, uygulamalar, kılavuzlar ve teknik dokümantasyon.', ru: 'Программное обеспечение, приложения, руководства и техническая документация.', fr: 'Logiciels, applications, manuels et documentation technique.', uk: 'Програмне забезпечення, застосунки, посібники та технічна документація.' },
  'Patente, Laborberichte und wissenschaftliche Texte.': { en: 'Patents, laboratory reports and scientific texts.', ar: 'براءات الاختراع وتقارير المختبر والنصوص العلمية.', tr: 'Patentler, laboratuvar raporları ve bilimsel metinler.', ru: 'Патенты, лабораторные отчеты и научные тексты.', fr: 'Brevets, rapports de laboratoire et textes scientifiques.', uk: 'Патенти, лабораторні звіти та наукові тексти.' },
  'Produktionsunterlagen, Prozesse und Qualitätsdokumente.': { en: 'Production documents, processes and quality documents.', ar: 'وثائق الإنتاج والعمليات ووثائق الجودة.', tr: 'Üretim belgeleri, süreçler ve kalite dokümanları.', ru: 'Производственная документация, процессы и документы качества.', fr: 'Documents de production, processus et documents qualité.', uk: 'Виробнича документація, процеси та документи якості.' },
  'Wir übersetzen Wirtschafts- und Finanzdokumente für Unternehmen – professionell, präzise und termingerecht.': { en: 'We translate business and financial documents for companies professionally, precisely and on time.', ar: 'نترجم الوثائق الاقتصادية والمالية للشركات باحترافية ودقة وفي الموعد المحدد.', tr: 'Şirketler için ekonomi ve finans belgelerini profesyonel, hassas ve zamanında çeviriyoruz.', ru: 'Мы профессионально, точно и в срок переводим деловые и финансовые документы для компаний.', fr: 'Nous traduisons les documents économiques et financiers des entreprises avec professionnalisme, précision et ponctualité.', uk: 'Ми професійно, точно та вчасно перекладаємо економічні й фінансові документи для компаній.' },
  'Fachübersetzungen für Banken, Versicherungen und Finanzdienstleister.': { en: 'Specialist translations for banks, insurers and financial service providers.', ar: 'ترجمات متخصصة للبنوك وشركات التأمين ومقدمي الخدمات المالية.', tr: 'Bankalar, sigorta şirketleri ve finans hizmet sağlayıcıları için uzman çeviriler.', ru: 'Специализированные переводы для банков, страховых компаний и поставщиков финансовых услуг.', fr: 'Traductions spécialisées pour banques, assurances et prestataires financiers.', uk: 'Фахові переклади для банків, страхових компаній і фінансових установ.' },
  'Übersetzungen von Bilanzen, Reports und Controlling-Unterlagen.': { en: 'Translations of balance sheets, reports and controlling documents.', ar: 'ترجمة الميزانيات والتقارير ومستندات الرقابة المالية.', tr: 'Bilançolar, raporlar ve kontrol belgelerinin çevirileri.', ru: 'Переводы балансов, отчетов и документов контроллинга.', fr: 'Traductions de bilans, rapports et documents de contrôle de gestion.', uk: 'Переклади балансів, звітів і документів контролінгу.' },
  'Rechtssichere Übersetzungen von Verträgen und Richtlinien.': { en: 'Legally reliable translations of contracts and policies.', ar: 'ترجمات موثوقة قانونيا للعقود والسياسات.', tr: 'Sözleşmeler ve yönergeler için hukuken güvenilir çeviriler.', ru: 'Юридически надежные переводы договоров и регламентов.', fr: 'Traductions juridiquement fiables de contrats et de directives.', uk: 'Юридично надійні переклади договорів і правил.' },
  'Dokumente fotografieren oder einscannen': { en: 'Photograph or scan documents', ar: 'تصوير المستندات أو مسحها ضوئيا', tr: 'Belgeleri fotoğraflayın veya tarayın', ru: 'Сфотографируйте или отсканируйте документы', fr: 'Photographier ou scanner les documents', uk: 'Сфотографуйте або відскануйте документи' },
  'Dokumente senden & Preis erfahren': { en: 'Send documents and receive the price', ar: 'إرسال المستندات ومعرفة السعر', tr: 'Belgeleri gönderin ve fiyatı öğrenin', ru: 'Отправьте документы и узнайте цену', fr: 'Envoyer les documents et recevoir le prix', uk: 'Надішліть документи та дізнайтеся ціну' },
  'Adresse per E-Mail senden & Preis bestätigen': { en: 'Send address by e-mail and confirm the price', ar: 'إرسال العنوان بالبريد الإلكتروني وتأكيد السعر', tr: 'Adresi e-posta ile gönderin ve fiyatı onaylayın', ru: 'Отправьте адрес по e-mail и подтвердите цену', fr: 'Envoyer l’adresse par e-mail et confirmer le prix', uk: 'Надішліть адресу електронною поштою та підтвердьте ціну' },
  'Übersetzung per Post erhalten & Rechnung bezahlen': { en: 'Receive the translation by post and pay the invoice', ar: 'استلام الترجمة بالبريد ودفع الفاتورة', tr: 'Çeviriyi posta ile alın ve faturayı ödeyin', ru: 'Получите перевод по почте и оплатите счет', fr: 'Recevoir la traduction par courrier et payer la facture', uk: 'Отримайте переклад поштою та оплатіть рахунок' },
  'Beglaubigte Übersetzungen für Visa, Einbürgerung, Anerkennungsverfahren und offizielle Anträge.': { en: 'Certified translations for visas, naturalization, recognition procedures and official applications.', ar: 'ترجمات معتمدة للتأشيرات والتجنيس وإجراءات الاعتراف والطلبات الرسمية.', tr: 'Vizeler, vatandaşlık, denklik işlemleri ve resmi başvurular için yeminli çeviriler.', ru: 'Заверенные переводы для виз, натурализации, процедур признания и официальных заявлений.', fr: 'Traductions certifiées pour visas, naturalisation, procédures de reconnaissance et demandes officielles.', uk: 'Засвідчені переклади для віз, натуралізації, процедур визнання та офіційних заяв.' },
  'Jede Übersetzung wird von einem zweiten qualifizierten Linguisten geprüft.': { en: 'Every translation is checked by a second qualified linguist.', ar: 'تتم مراجعة كل ترجمة من قبل لغوي مؤهل ثان.', tr: 'Her çeviri ikinci bir nitelikli dil uzmanı tarafından kontrol edilir.', ru: 'Каждый перевод проверяется вторым квалифицированным лингвистом.', fr: 'Chaque traduction est contrôlée par un deuxième linguiste qualifié.', uk: 'Кожен переклад перевіряється другим кваліфікованим лінгвістом.' },
  'Einheitliche Fachterminologie für präzise und normgerechte Übersetzungen.': { en: 'Consistent specialist terminology for precise and standards-compliant translations.', ar: 'مصطلحات متخصصة موحدة لترجمات دقيقة ومتوافقة مع المعايير.', tr: 'Hassas ve standartlara uygun çeviriler için tutarlı uzman terminoloji.', ru: 'Единая специализированная терминология для точных и соответствующих нормам переводов.', fr: 'Terminologie spécialisée cohérente pour des traductions précises et conformes aux normes.', uk: 'Узгоджена фахова термінологія для точних перекладів, що відповідають нормам.' },
  'Schneller Versand per Post oder Kurier – deutschlandweit und zuverlässig.': { en: 'Fast delivery by post or courier throughout Germany, reliably.', ar: 'إرسال سريع بالبريد أو البريد السريع في جميع أنحاء ألمانيا وبموثوقية.', tr: 'Posta veya kurye ile Almanya genelinde hızlı ve güvenilir gönderim.', ru: 'Быстрая и надежная доставка почтой или курьером по всей Германии.', fr: 'Envoi rapide par courrier ou coursier dans toute l’Allemagne, de manière fiable.', uk: 'Швидка та надійна доставка поштою або кур’єром по всій Німеччині.' },
  'Echtzeit-Dolmetschen für Konferenzen, Tagungen und internationale Veranstaltungen.': { en: 'Real-time interpreting for conferences, meetings and international events.', ar: 'ترجمة فورية مباشرة للمؤتمرات والاجتماعات والفعاليات الدولية.', tr: 'Konferanslar, toplantılar ve uluslararası etkinlikler için gerçek zamanlı tercümanlık.', ru: 'Синхронный перевод в реальном времени для конференций, совещаний и международных мероприятий.', fr: 'Interprétation en temps réel pour conférences, réunions et événements internationaux.', uk: 'Переклад у реальному часі для конференцій, нарад і міжнародних заходів.' },
  'Professionelle Simultandolmetscher für Deutsch und zahlreiche internationale Sprachen.': { en: 'Professional simultaneous interpreters for German and many international languages.', ar: 'مترجمون فوريون متزامنون محترفون للألمانية والعديد من اللغات الدولية.', tr: 'Almanca ve çok sayıda uluslararası dil için profesyonel simultane tercümanlar.', ru: 'Профессиональные синхронные переводчики для немецкого и многих международных языков.', fr: 'Interprètes simultanés professionnels pour l’allemand et de nombreuses langues internationales.', uk: 'Професійні синхронні перекладачі для німецької та багатьох міжнародних мов.' },
  'Qualifizierte Simultandolmetscher mit umfangreicher Konferenz- und Fachkompetenz.': { en: 'Qualified simultaneous interpreters with extensive conference and subject expertise.', ar: 'مترجمون فوريون متزامنون مؤهلون بخبرة واسعة في المؤتمرات والمجالات المتخصصة.', tr: 'Kapsamlı konferans ve alan uzmanlığına sahip nitelikli simultane tercümanlar.', ru: 'Квалифицированные синхронные переводчики с большим опытом конференций и предметной экспертизой.', fr: 'Interprètes simultanés qualifiés avec une solide expertise de conférence et de domaine.', uk: 'Кваліфіковані синхронні перекладачі з великим конференційним і фаховим досвідом.' },
  'Dolmetschkabinen, Empfängeranlagen und professionelle Konferenztechnik aus einer Hand.': { en: 'Interpreting booths, receiver systems and professional conference technology from one source.', ar: 'كبائن ترجمة وأنظمة استقبال وتقنيات مؤتمرات احترافية من جهة واحدة.', tr: 'Tercüman kabinleri, alıcı sistemleri ve profesyonel konferans teknolojisi tek elden.', ru: 'Кабины переводчиков, приемное оборудование и профессиональная конференц-техника из одних рук.', fr: 'Cabines d’interprétation, systèmes de réception et technique de conférence professionnelle auprès d’un seul prestataire.', uk: 'Кабіни перекладачів, приймальні системи та професійна конференц-техніка з одного джерела.' },
  'Fachübersetzungen für Maschinen, Anlagen und technische Systeme.': { en: 'Specialist translations for machines, plants and technical systems.', ar: 'ترجمات متخصصة للآلات والمنشآت والأنظمة التقنية.', tr: 'Makineler, tesisler ve teknik sistemler için uzman çeviriler.', ru: 'Специализированные переводы для машин, установок и технических систем.', fr: 'Traductions spécialisées pour machines, installations et systèmes techniques.', uk: 'Фахові переклади для машин, установок і технічних систем.' },
  'Präzise Übersetzungen für Elektrotechnik und Steuerungstechnik.': { en: 'Precise translations for electrical engineering and control technology.', ar: 'ترجمات دقيقة للهندسة الكهربائية وتقنية التحكم.', tr: 'Elektrik mühendisliği ve kontrol teknolojisi için hassas çeviriler.', ru: 'Точные переводы для электротехники и техники управления.', fr: 'Traductions précises pour l’électrotechnique et l’automatisation.', uk: 'Точні переклади для електротехніки та систем керування.' },
  'Übersetzungen für Export, Ausschreibungen und internationale Vorhaben.': { en: 'Translations for export, tenders and international projects.', ar: 'ترجمات للتصدير والمناقصات والمشاريع الدولية.', tr: 'İhracat, ihaleler ve uluslararası projeler için çeviriler.', ru: 'Переводы для экспорта, тендеров и международных проектов.', fr: 'Traductions pour export, appels d’offres et projets internationaux.', uk: 'Переклади для експорту, тендерів та міжнародних проєктів.' },
  'Fachübersetzungen für Zahnmedizin, Zahntechnik, Dentalfirmen und CAD/CAM-Systeme.': { en: 'Specialist translations for dentistry, dental technology, dental companies and CAD/CAM systems.', ar: 'ترجمات متخصصة لطب الأسنان وتقنية الأسنان وشركات الأسنان وأنظمة CAD/CAM.', tr: 'Diş hekimliği, diş teknolojisi, dental firmalar ve CAD/CAM sistemleri için uzman çeviriler.', ru: 'Специализированные переводы для стоматологии, зуботехники, стоматологических компаний и CAD/CAM-систем.', fr: 'Traductions spécialisées pour dentisterie, technologie dentaire, entreprises dentaires et systèmes CAD/CAM.', uk: 'Фахові переклади для стоматології, зуботехніки, стоматологічних компаній і CAD/CAM-систем.' },
  'Übersetzungen für Studien, Zulassungen und internationale Fachkommunikation.': { en: 'Translations for studies, approvals and international specialist communication.', ar: 'ترجمات للدراسات والتراخيص والتواصل التخصصي الدولي.', tr: 'Çalışmalar, ruhsatlandırmalar ve uluslararası uzman iletişimi için çeviriler.', ru: 'Переводы для исследований, регистраций и международной профессиональной коммуникации.', fr: 'Traductions pour études, autorisations et communication spécialisée internationale.', uk: 'Переклади для досліджень, реєстрацій і міжнародної фахової комунікації.' },
  'Präzise Übersetzungen für Arzneimittel, Packungsbeilagen und Zulassungsunterlagen.': { en: 'Precise translations for medicines, package leaflets and approval documents.', ar: 'ترجمات دقيقة للأدوية والنشرات ووثائق الترخيص.', tr: 'İlaçlar, prospektüsler ve ruhsat belgeleri için hassas çeviriler.', ru: 'Точные переводы для лекарств, инструкций и регистрационных документов.', fr: 'Traductions précises pour médicaments, notices et dossiers d’autorisation.', uk: 'Точні переклади для лікарських засобів, інструкцій і реєстраційних документів.' },
  'Übersetzungen für Studien, Protokolle, Einwilligungserklärungen und Patienteninformationen.': { en: 'Translations for studies, protocols, consent forms and patient information.', ar: 'ترجمات للدراسات والبروتوكولات ونماذج الموافقة ومعلومات المرضى.', tr: 'Çalışmalar, protokoller, onam formları ve hasta bilgileri için çeviriler.', ru: 'Переводы исследований, протоколов, форм согласия и информации для пациентов.', fr: 'Traductions pour études, protocoles, consentements et informations patients.', uk: 'Переклади досліджень, протоколів, форм згоди та інформації для пацієнтів.' },
  'Einheitliche Fachbegriffe nach aktuellen regulatorischen Anforderungen.': { en: 'Consistent terminology according to current regulatory requirements.', ar: 'مصطلحات متخصصة موحدة وفق المتطلبات التنظيمية الحالية.', tr: 'Güncel düzenleyici gerekliliklere uygun tutarlı uzman terimler.', ru: 'Единая терминология в соответствии с актуальными регуляторными требованиями.', fr: 'Terminologie cohérente selon les exigences réglementaires actuelles.', uk: 'Узгоджена термінологія відповідно до актуальних регуляторних вимог.' },
  'Übersetzungen für Theater, Film, Hörspiele, Magazine und Kulturprojekte.': { en: 'Translations for theatre, film, audio plays, magazines and cultural projects.', ar: 'ترجمات للمسرح والسينما والمسرحيات الصوتية والمجلات والمشاريع الثقافية.', tr: 'Tiyatro, film, radyo oyunları, dergiler ve kültür projeleri için çeviriler.', ru: 'Переводы для театра, кино, аудиоспектаклей, журналов и культурных проектов.', fr: 'Traductions pour théâtre, film, pièces audio, magazines et projets culturels.', uk: 'Переклади для театру, кіно, аудіоп’єс, журналів і культурних проєктів.' },
  'Professionelles Lektorat und Korrektorat für sprachliche und stilistische Qualität.': { en: 'Professional editing and proofreading for linguistic and stylistic quality.', ar: 'تحرير وتدقيق احترافي للجودة اللغوية والأسلوبية.', tr: 'Dilsel ve üslup kalitesi için profesyonel redaksiyon ve düzeltme.', ru: 'Профессиональная редактура и корректура для языкового и стилистического качества.', fr: 'Révision et correction professionnelles pour la qualité linguistique et stylistique.', uk: 'Професійне редагування та коректура для мовної й стилістичної якості.' },
  'Lokalisierung von Software, Webanwendungen und IT-Produkten in zahlreiche Sprachen.': { en: 'Localization of software, web applications and IT products into many languages.', ar: 'توطين البرمجيات وتطبيقات الويب ومنتجات تقنية المعلومات إلى لغات عديدة.', tr: 'Yazılım, web uygulamaları ve BT ürünlerinin birçok dile yerelleştirilmesi.', ru: 'Локализация программного обеспечения, веб-приложений и IT-продуктов на многие языки.', fr: 'Localisation de logiciels, applications web et produits IT dans de nombreuses langues.', uk: 'Локалізація програмного забезпечення, вебзастосунків та IT-продуктів багатьма мовами.' },
  'Übersetzungen für Cloud-Architekturen, DevOps-Dokumentationen, Runbooks und IT-Infrastrukturen.': { en: 'Translations for cloud architectures, DevOps documentation, runbooks and IT infrastructures.', ar: 'ترجمات لهندسات السحابة ووثائق DevOps ودلائل التشغيل والبنى التحتية لتقنية المعلومات.', tr: 'Bulut mimarileri, DevOps dokümantasyonu, runbooklar ve BT altyapıları için çeviriler.', ru: 'Переводы для облачных архитектур, DevOps-документации, runbook и IT-инфраструктур.', fr: 'Traductions pour architectures cloud, documentation DevOps, runbooks et infrastructures IT.', uk: 'Переклади для хмарних архітектур, DevOps-документації, runbook та IT-інфраструктур.' },
  'Fachgerechte Übersetzungen für Sicherheitsrichtlinien, Datenschutzdokumente und Compliance-Anforderungen.': { en: 'Specialist translations for security policies, data protection documents and compliance requirements.', ar: 'ترجمات متخصصة لسياسات الأمان ووثائق حماية البيانات ومتطلبات الامتثال.', tr: 'Güvenlik politikaları, veri koruma belgeleri ve uyum gereklilikleri için uzman çeviriler.', ru: 'Профессиональные переводы политик безопасности, документов защиты данных и требований комплаенса.', fr: 'Traductions spécialisées pour politiques de sécurité, documents de protection des données et exigences de conformité.', uk: 'Фахові переклади політик безпеки, документів захисту даних і вимог комплаєнсу.' },
  'Lokalisierung von Apps, Spielen und Benutzeroberflächen für optimale Nutzererlebnisse weltweit.': { en: 'Localization of apps, games and user interfaces for optimal user experiences worldwide.', ar: 'توطين التطبيقات والألعاب وواجهات المستخدم لتجربة استخدام مثالية عالميا.', tr: 'Dünya çapında en iyi kullanıcı deneyimleri için uygulama, oyun ve kullanıcı arayüzü yerelleştirmesi.', ru: 'Локализация приложений, игр и интерфейсов для оптимального пользовательского опыта по всему миру.', fr: 'Localisation d’applications, jeux et interfaces pour une expérience utilisateur optimale dans le monde entier.', uk: 'Локалізація застосунків, ігор та інтерфейсів для оптимального користувацького досвіду у світі.' },
  'Übersetzung von API-Dokumentationen, Benutzerhandbüchern, Installationsanleitungen und technischen Spezifikationen.': { en: 'Translation of API documentation, user manuals, installation guides and technical specifications.', ar: 'ترجمة وثائق API وأدلة المستخدم وتعليمات التثبيت والمواصفات التقنية.', tr: 'API dokümantasyonu, kullanıcı kılavuzları, kurulum talimatları ve teknik şartnamelerin çevirisi.', ru: 'Перевод API-документации, руководств пользователя, инструкций по установке и технических спецификаций.', fr: 'Traduction de documentations API, manuels utilisateur, guides d’installation et spécifications techniques.', uk: 'Переклад API-документації, посібників користувача, інструкцій зі встановлення та технічних специфікацій.' },
  'Ihr zuverlässiger Partner für IT-Übersetzungen und Softwarelokalisierung – bundesweit und international.': { en: 'Your reliable partner for IT translations and software localization throughout Germany and internationally.', ar: 'شريكك الموثوق لترجمات تقنية المعلومات وتوطين البرمجيات في ألمانيا وعلى المستوى الدولي.', tr: 'Almanya genelinde ve uluslararası IT çevirileri ve yazılım yerelleştirmesi için güvenilir ortağınız.', ru: 'Ваш надежный партнер по IT-переводам и локализации программного обеспечения в Германии и за рубежом.', fr: 'Votre partenaire fiable pour les traductions IT et la localisation logicielle en Allemagne et à l’international.', uk: 'Ваш надійний партнер для IT-перекладів і локалізації програмного забезпечення в Німеччині та міжнародно.' },
  'Übersetzungsbüro für Technik und Ingenieurwesen': { en: 'Translation office for technology and engineering', ar: 'مكتب ترجمة للتقنية والهندسة', tr: 'Teknik ve mühendislik çeviri bürosu', ru: 'Бюро переводов для техники и инженерии', fr: 'Bureau de traduction pour technique et ingénierie', uk: 'Бюро перекладів для техніки та інженерії' },
  'Wir übersetzen regelmäßig folgende technische Unterlagen:': { en: 'We regularly translate the following technical documents:', ar: 'نترجم بانتظام المستندات التقنية التالية:', tr: 'Aşağıdaki teknik belgeleri düzenli olarak çeviriyoruz:', ru: 'Мы регулярно переводим следующие технические документы:', fr: 'Nous traduisons régulièrement les documents techniques suivants :', uk: 'Ми регулярно перекладаємо такі технічні документи:' },
  'Bedienungsanleitungen': { en: 'Operating manuals', ar: 'تعليمات التشغيل', tr: 'Kullanım kılavuzları', ru: 'Инструкции по эксплуатации', fr: 'Modes d’emploi', uk: 'Інструкції з експлуатації' },
  'Sicherheitsdatenblätter': { en: 'Safety data sheets', ar: 'أوراق بيانات السلامة', tr: 'Güvenlik bilgi formları', ru: 'Паспорта безопасности', fr: 'Fiches de données de sécurité', uk: 'Паспорти безпеки' },
  'Wartungshandbücher': { en: 'Maintenance manuals', ar: 'أدلة الصيانة', tr: 'Bakım kılavuzları', ru: 'Руководства по техническому обслуживанию', fr: 'Manuels de maintenance', uk: 'Посібники з технічного обслуговування' },
  'Patente': { en: 'Patents', ar: 'براءات الاختراع', tr: 'Patentler', ru: 'Патенты', fr: 'Brevets', uk: 'Патенти' },
  'Konstruktionsunterlagen': { en: 'Design documents', ar: 'وثائق التصميم', tr: 'Tasarım belgeleri', ru: 'Конструкторская документация', fr: 'Documents de conception', uk: 'Конструкторська документація' },
  'CAD-Begleitdokumente': { en: 'CAD accompanying documents', ar: 'وثائق CAD المرفقة', tr: 'CAD ek belgeleri', ru: 'Сопроводительные документы CAD', fr: 'Documents d’accompagnement CAD', uk: 'Супровідні документи CAD' },
  'Ausschreibungen': { en: 'Tenders', ar: 'المناقصات', tr: 'İhaleler', ru: 'Тендеры', fr: 'Appels d’offres', uk: 'Тендери' },
  'Technische Spezifikationen': { en: 'Technical specifications', ar: 'المواصفات التقنية', tr: 'Teknik şartnameler', ru: 'Технические спецификации', fr: 'Spécifications techniques', uk: 'Технічні специфікації' },
  'Internationale Technik- und Industrieprojekte': { en: 'International technical and industrial projects', ar: 'مشاريع تقنية وصناعية دولية', tr: 'Uluslararası teknik ve endüstriyel projeler', ru: 'Международные технические и промышленные проекты', fr: 'Projets techniques et industriels internationaux', uk: 'Міжнародні технічні та промислові проєкти' },
  'Unsere technischen Übersetzungen unterstützen Sie bei:': { en: 'Our technical translations support you with:', ar: 'تدعمكم ترجماتنا التقنية في:', tr: 'Teknik çevirilerimiz sizi şu alanlarda destekler:', ru: 'Наши технические переводы помогают вам в:', fr: 'Nos traductions techniques vous accompagnent pour :', uk: 'Наші технічні переклади допомагають вам у:' },
  'Internationalen Ausschreibungen': { en: 'International tenders', ar: 'المناقصات الدولية', tr: 'Uluslararası ihaleler', ru: 'Международные тендеры', fr: 'Appels d’offres internationaux', uk: 'Міжнародні тендери' },
  'Maschinenexporten': { en: 'Machine exports', ar: 'تصدير الآلات', tr: 'Makine ihracatı', ru: 'Экспорт машин', fr: 'Exportation de machines', uk: 'Експорт машин' },
  'CE-Dokumentationen': { en: 'CE documentation', ar: 'وثائق CE', tr: 'CE dokümantasyonu', ru: 'CE-документация', fr: 'Documentation CE', uk: 'CE-документація' },
  'Technischen Schulungen': { en: 'Technical training', ar: 'التدريبات التقنية', tr: 'Teknik eğitimler', ru: 'Техническое обучение', fr: 'Formations techniques', uk: 'Технічне навчання' },
  'Anlagenbauprojekten': { en: 'Plant engineering projects', ar: 'مشاريع بناء المنشآت', tr: 'Tesis mühendisliği projeleri', ru: 'Проекты промышленного строительства', fr: 'Projets d’ingénierie d’installations', uk: 'Проєкти будівництва установок' },
  'Produktlokalisierung': { en: 'Product localization', ar: 'توطين المنتجات', tr: 'Ürün yerelleştirmesi', ru: 'Локализация продуктов', fr: 'Localisation de produits', uk: 'Локалізація продуктів' },
  'Sicherheitsdokumentationen': { en: 'Safety documentation', ar: 'وثائق السلامة', tr: 'Güvenlik dokümantasyonu', ru: 'Документация по безопасности', fr: 'Documentation de sécurité', uk: 'Документація з безпеки' },
  'Weltweitem Vertrieb': { en: 'Worldwide distribution', ar: 'التوزيع العالمي', tr: 'Dünya çapında satış', ru: 'Международные продажи', fr: 'Distribution mondiale', uk: 'Світова дистрибуція' },
  'Maschinenbau': { en: 'Mechanical engineering', ar: 'الهندسة الميكانيكية', tr: 'Makine mühendisliği', ru: 'Машиностроение', fr: 'Génie mécanique', uk: 'Машинобудування' },
  'Elektrotechnik': { en: 'Electrical engineering', ar: 'الهندسة الكهربائية', tr: 'Elektrik mühendisliği', ru: 'Электротехника', fr: 'Électrotechnique', uk: 'Електротехніка' },
  'Internationale Projekte': { en: 'International projects', ar: 'مشاريع دولية', tr: 'Uluslararası projeler', ru: 'Международные проекты', fr: 'Projets internationaux', uk: 'Міжнародні проєкти' },
  'IT- & Softwareübersetzungen': { en: 'IT and software translations', ar: 'ترجمات تقنية المعلومات والبرمجيات', tr: 'BT ve yazılım çevirileri', ru: 'IT- и программные переводы', fr: 'Traductions IT et logiciels', uk: 'IT- та програмні переклади' },
  'Apps, Software & Gaming': { en: 'Apps, software and gaming', ar: 'التطبيقات والبرمجيات والألعاب', tr: 'Uygulamalar, yazılım ve oyun', ru: 'Приложения, ПО и игры', fr: 'Applications, logiciels et jeux', uk: 'Застосунки, програмне забезпечення та ігри' },
  'Mobile Apps': { en: 'Mobile apps', ar: 'تطبيقات الهاتف المحمول', tr: 'Mobil uygulamalar', ru: 'Мобильные приложения', fr: 'Applications mobiles', uk: 'Мобільні застосунки' },
  'UI-Texte': { en: 'UI texts', ar: 'نصوص واجهة المستخدم', tr: 'Arayüz metinleri', ru: 'Тексты интерфейса', fr: 'Textes d’interface', uk: 'Тексти інтерфейсу' },
  'Push-Benachrichtigungen': { en: 'Push notifications', ar: 'إشعارات الدفع', tr: 'Anlık bildirimler', ru: 'Push-уведомления', fr: 'Notifications push', uk: 'Push-сповіщення' },
  'App-Store-Texte': { en: 'App store texts', ar: 'نصوص متجر التطبيقات', tr: 'Uygulama mağazası metinleri', ru: 'Тексты для магазинов приложений', fr: 'Textes pour app stores', uk: 'Тексти для магазинів застосунків' },
  'Spieltexte': { en: 'Game texts', ar: 'نصوص الألعاب', tr: 'Oyun metinleri', ru: 'Игровые тексты', fr: 'Textes de jeux', uk: 'Ігрові тексти' },
  'Storylines': { en: 'Storylines', ar: 'الخطوط القصصية', tr: 'Hikaye akışları', ru: 'Сюжетные линии', fr: 'Intrigues', uk: 'Сюжетні лінії' },
  'Tutorials': { en: 'Tutorials', ar: 'الشروحات التعليمية', tr: 'Eğitim içerikleri', ru: 'Обучающие материалы', fr: 'Tutoriels', uk: 'Навчальні матеріали' },
  'Hilfetexte': { en: 'Help texts', ar: 'نصوص المساعدة', tr: 'Yardım metinleri', ru: 'Справочные тексты', fr: 'Textes d’aide', uk: 'Довідкові тексти' },
  'Software & Technische Dokumentation': { en: 'Software and technical documentation', ar: 'البرمجيات والوثائق التقنية', tr: 'Yazılım ve teknik dokümantasyon', ru: 'Программное обеспечение и техническая документация', fr: 'Logiciels et documentation technique', uk: 'Програмне забезпечення та технічна документація' },
  'Wir übersetzen unter anderem:': { en: 'We translate, among other things:', ar: 'نترجم من بين أمور أخرى:', tr: 'Diğerlerinin yanı sıra şunları çeviriyoruz:', ru: 'Мы переводим, в частности:', fr: 'Nous traduisons notamment :', uk: 'Ми перекладаємо, зокрема:' },
  'API-Dokumentationen': { en: 'API documentation', ar: 'وثائق API', tr: 'API dokümantasyonu', ru: 'API-документация', fr: 'Documentation API', uk: 'API-документація' },
  'Developer Guides': { en: 'Developer guides', ar: 'أدلة المطورين', tr: 'Geliştirici kılavuzları', ru: 'Руководства для разработчиков', fr: 'Guides développeur', uk: 'Посібники для розробників' },
  'Release Notes': { en: 'Release notes', ar: 'ملاحظات الإصدارات', tr: 'Sürüm notları', ru: 'Примечания к релизам', fr: 'Notes de version', uk: 'Примітки до релізів' },
  'Changelogs': { en: 'Changelogs', ar: 'سجلات التغييرات', tr: 'Değişiklik günlükleri', ru: 'Журналы изменений', fr: 'Journaux des modifications', uk: 'Журнали змін' },
  'Benutzerhandbücher': { en: 'User manuals', ar: 'أدلة المستخدم', tr: 'Kullanıcı kılavuzları', ru: 'Руководства пользователя', fr: 'Manuels utilisateur', uk: 'Посібники користувача' },
  'Administratorhandbücher': { en: 'Administrator manuals', ar: 'أدلة المسؤولين', tr: 'Yönetici kılavuzları', ru: 'Руководства администратора', fr: 'Manuels administrateur', uk: 'Посібники адміністратора' },
  'Installationsanleitungen': { en: 'Installation instructions', ar: 'تعليمات التثبيت', tr: 'Kurulum talimatları', ru: 'Инструкции по установке', fr: 'Instructions d’installation', uk: 'Інструкції зі встановлення' },
  'Konfigurationsanleitungen': { en: 'Configuration instructions', ar: 'تعليمات الإعداد', tr: 'Yapılandırma talimatları', ru: 'Инструкции по настройке', fr: 'Instructions de configuration', uk: 'Інструкції з налаштування' },
  'Häufige Sprachkombinationen': { en: 'Common language combinations', ar: 'أزواج لغوية شائعة', tr: 'Sık kullanılan dil kombinasyonları', ru: 'Частые языковые пары', fr: 'Combinaisons linguistiques fréquentes', uk: 'Поширені мовні пари' },
  'Englisch–Deutsch': { en: 'English-German', ar: 'الإنجليزية – الألمانية', tr: 'İngilizce-Almanca', ru: 'Английский-немецкий', fr: 'Anglais-allemand', uk: 'Англійська-німецька' },
  'Französisch–Deutsch': { en: 'French-German', ar: 'الفرنسية – الألمانية', tr: 'Fransızca-Almanca', ru: 'Французский-немецкий', fr: 'Français-allemand', uk: 'Французька-німецька' },
  'Spanisch–Deutsch': { en: 'Spanish-German', ar: 'الإسبانية – الألمانية', tr: 'İspanyolca-Almanca', ru: 'Испанский-немецкий', fr: 'Espagnol-allemand', uk: 'Іспанська-німецька' },
  'Italienisch–Deutsch': { en: 'Italian-German', ar: 'الإيطالية – الألمانية', tr: 'İtalyanca-Almanca', ru: 'Итальянский-немецкий', fr: 'Italien-allemand', uk: 'Італійська-німецька' },
  'Arabisch–Deutsch': { en: 'Arabic-German', ar: 'العربية – الألمانية', tr: 'Arapça-Almanca', ru: 'Арабский-немецкий', fr: 'Arabe-allemand', uk: 'Арабська-німецька' },
  'Türkisch–Deutsch': { en: 'Turkish-German', ar: 'التركية – الألمانية', tr: 'Türkçe-Almanca', ru: 'Турецкий-немецкий', fr: 'Turc-allemand', uk: 'Турецька-німецька' },
  'Polnisch–Deutsch': { en: 'Polish-German', ar: 'البولندية – الألمانية', tr: 'Lehçe-Almanca', ru: 'Польский-немецкий', fr: 'Polonais-allemand', uk: 'Польська-німецька' },
  'Russisch–Deutsch': { en: 'Russian-German', ar: 'الروسية – الألمانية', tr: 'Rusça-Almanca', ru: 'Русский-немецкий', fr: 'Russe-allemand', uk: 'Російська-німецька' },
  'Niederländisch–Deutsch': { en: 'Dutch-German', ar: 'الهولندية – الألمانية', tr: 'Felemenkçe-Almanca', ru: 'Нидерландский-немецкий', fr: 'Néerlandais-allemand', uk: 'Нідерландська-німецька' },
  'Technische Fachkompetenz': { en: 'Technical specialist expertise', ar: 'خبرة تقنية متخصصة', tr: 'Teknik uzmanlık', ru: 'Техническая экспертиза', fr: 'Expertise technique spécialisée', uk: 'Технічна фахова компетентність' },
  'Softwareentwicklung': { en: 'Software development', ar: 'تطوير البرمجيات', tr: 'Yazılım geliştirme', ru: 'Разработка программного обеспечения', fr: 'Développement logiciel', uk: 'Розробка програмного забезпечення' },
  'Cloud-Infrastrukturen': { en: 'Cloud infrastructures', ar: 'بنى السحابة التحتية', tr: 'Bulut altyapıları', ru: 'Облачные инфраструктуры', fr: 'Infrastructures cloud', uk: 'Хмарні інфраструктури' },
  'IT-Sicherheit': { en: 'IT security', ar: 'أمن تقنية المعلومات', tr: 'BT güvenliği', ru: 'IT-безопасность', fr: 'Sécurité IT', uk: 'IT-безпека' },
  'Datenbanken': { en: 'Databases', ar: 'قواعد البيانات', tr: 'Veritabanları', ru: 'Базы данных', fr: 'Bases de données', uk: 'Бази даних' },
  'DevOps': { en: 'DevOps', ar: 'DevOps', tr: 'DevOps', ru: 'DevOps', fr: 'DevOps', uk: 'DevOps' },
  'Systemarchitekturen': { en: 'System architectures', ar: 'معماريات الأنظمة', tr: 'Sistem mimarileri', ru: 'Системные архитектуры', fr: 'Architectures système', uk: 'Системні архітектури' },
  'Softwarelokalisierung': { en: 'Software localization', ar: 'توطين البرمجيات', tr: 'Yazılım yerelleştirmesi', ru: 'Локализация программного обеспечения', fr: 'Localisation logicielle', uk: 'Локалізація програмного забезпечення' },
  'Compliance': { en: 'Compliance', ar: 'الامتثال', tr: 'Uyumluluk', ru: 'Комплаенс', fr: 'Conformité', uk: 'Комплаєнс' },
  'Internationale Software- & IT-Projekte': { en: 'International software and IT projects', ar: 'مشاريع برمجيات وتقنية معلومات دولية', tr: 'Uluslararası yazılım ve BT projeleri', ru: 'Международные программные и IT-проекты', fr: 'Projets logiciels et IT internationaux', uk: 'Міжнародні програмні та IT-проєкти' },
  'IT-Sicherheitsrichtlinien': { en: 'IT security guidelines', ar: 'إرشادات أمن تقنية المعلومات', tr: 'BT güvenlik yönergeleri', ru: 'Руководства по IT-безопасности', fr: 'Directives de sécurité IT', uk: 'Настанови з IT-безпеки' },
  'Cloud-Architekturen': { en: 'Cloud architectures', ar: 'معماريات السحابة', tr: 'Bulut mimarileri', ru: 'Облачные архитектуры', fr: 'Architectures cloud', uk: 'Хмарні архітектури' },
  'DevOps-Runbooks': { en: 'DevOps runbooks', ar: 'أدلة تشغيل DevOps', tr: 'DevOps runbookları', ru: 'Runbook для DevOps', fr: 'Runbooks DevOps', uk: 'Runbook для DevOps' },
  'DSGVO-Dokumentationen': { en: 'GDPR documentation', ar: 'وثائق حماية البيانات DSGVO', tr: 'KVKK/GDPR dokümantasyonu', ru: 'Документация GDPR', fr: 'Documentation RGPD', uk: 'Документація GDPR' },
  'E-Learning-Plattformen': { en: 'E-learning platforms', ar: 'منصات التعلم الإلكتروني', tr: 'E-öğrenme platformları', ru: 'Платформы электронного обучения', fr: 'Plateformes e-learning', uk: 'Платформи електронного навчання' },
  'Enterprise-Software': { en: 'Enterprise software', ar: 'برمجيات المؤسسات', tr: 'Kurumsal yazılım', ru: 'Корпоративное ПО', fr: 'Logiciels d’entreprise', uk: 'Корпоративне програмне забезпечення' },
  'Deutschlandweit für Sie im Einsatz': { en: 'Available for you throughout Germany', ar: 'في خدمتكم في جميع أنحاء ألمانيا', tr: 'Almanya genelinde hizmetinizde', ru: 'К вашим услугам по всей Германии', fr: 'À votre service dans toute l’Allemagne', uk: 'До ваших послуг по всій Німеччині' },
  'Sie benötigen eine Fachübersetzung im Bereich IT oder Softwarelokalisierung?': { en: 'Do you need a specialist translation in IT or software localization?', ar: 'هل تحتاج إلى ترجمة متخصصة في تقنية المعلومات أو توطين البرمجيات؟', tr: 'BT veya yazılım yerelleştirmesi alanında uzman çeviriye mi ihtiyacınız var?', ru: 'Вам нужен специализированный перевод в области IT или локализации ПО?', fr: 'Vous avez besoin d’une traduction spécialisée en IT ou localisation logicielle ?', uk: 'Вам потрібен фаховий переклад у сфері IT або локалізації програмного забезпечення?' },
  'Kostenlose Anfrage': { en: 'Free request', ar: 'طلب مجاني', tr: 'Ücretsiz talep', ru: 'Бесплатный запрос', fr: 'Demande gratuite', uk: 'Безкоштовний запит' },
  'SOFTWARE & LOKALISIERUNG': { en: 'Software and localization', ar: 'البرمجيات والتوطين', tr: 'Yazılım ve yerelleştirme', ru: 'ПО и локализация', fr: 'Logiciels et localisation', uk: 'ПЗ і локалізація' },
  'CLOUD & DEVOPS': { en: 'Cloud and DevOps', ar: 'السحابة وDevOps', tr: 'Bulut ve DevOps', ru: 'Облако и DevOps', fr: 'Cloud et DevOps', uk: 'Хмара та DevOps' },
  'IT-SICHERHEIT & DSGVO': { en: 'IT security and GDPR', ar: 'أمن تقنية المعلومات وحماية البيانات', tr: 'BT güvenliği ve GDPR', ru: 'IT-безопасность и GDPR', fr: 'Sécurité IT et RGPD', uk: 'IT-безпека та GDPR' },
  'APPS & GAMING': { en: 'Apps and gaming', ar: 'التطبيقات والألعاب', tr: 'Uygulamalar ve oyun', ru: 'Приложения и игры', fr: 'Applications et jeux', uk: 'Застосунки та ігри' },
  'TECHNISCHE DOKUMENTATION': { en: 'Technical documentation', ar: 'الوثائق التقنية', tr: 'Teknik dokümantasyon', ru: 'Техническая документация', fr: 'Documentation technique', uk: 'Технічна документація' },
  'DEUTSCHLANDWEIT TÄTIG': { en: 'Active throughout Germany', ar: 'نشاط في كل ألمانيا', tr: 'Almanya genelinde faaliyet', ru: 'Работаем по всей Германии', fr: 'Actif dans toute l’Allemagne', uk: 'Працюємо по всій Німеччині' },
};

Object.assign(SERVICE_SHEET_TEXT_TRANSLATIONS, {
  'Dolmetschen': { en: 'Interpreting', ar: 'الترجمة الفورية', tr: 'Sözlü tercüme', ru: 'Устный перевод', fr: 'Interprétation', uk: 'Усний переклад' },
  'Simultandolmetscher': { en: 'Simultaneous interpreters', ar: 'مترجمون فوريون متزامنون', tr: 'Simultane tercümanlar', ru: 'Синхронные переводчики', fr: 'Interprètes simultanés', uk: 'Синхронні перекладачі' },
  'Unsere Simultandolmetscher sorgen dafür, dass internationale Konferenzen, Tagungen und Veranstaltungen reibungslos mehrsprachig ablaufen.': { en: 'Our simultaneous interpreters ensure that international conferences, meetings and events run smoothly in several languages.', ar: 'يضمن مترجمونا الفوريون المتزامنون سير المؤتمرات والاجتماعات والفعاليات الدولية بسلاسة بعدة لغات.' },
  'Wir bieten professionelles Echtzeit-Dolmetschen unter anderem in den Sprachkombinationen:': { en: 'We offer professional real-time interpreting, including the following language combinations:', ar: 'نقدم ترجمة فورية مباشرة احترافية، من بينها الأزواج اللغوية التالية:' },
  'Deutsch–Englisch': { en: 'German-English', ar: 'الألمانية – الإنجليزية', tr: 'Almanca-İngilizce', ru: 'Немецкий-английский', fr: 'Allemand-anglais', uk: 'Німецька-англійська' },
  'Deutsch–Französisch': { en: 'German-French', ar: 'الألمانية – الفرنسية', tr: 'Almanca-Fransızca', ru: 'Немецкий-французский', fr: 'Allemand-français', uk: 'Німецька-французька' },
  'Deutsch–Russisch': { en: 'German-Russian', ar: 'الألمانية – الروسية', tr: 'Almanca-Rusça', ru: 'Немецкий-русский', fr: 'Allemand-russe', uk: 'Німецька-російська' },
  'Deutsch–Spanisch': { en: 'German-Spanish', ar: 'الألمانية – الإسبانية', tr: 'Almanca-İspanyolca', ru: 'Немецкий-испанский', fr: 'Allemand-espagnol', uk: 'Німецька-іспанська' },
  'Deutsch–Italienisch': { en: 'German-Italian', ar: 'الألمانية – الإيطالية', tr: 'Almanca-İtalyanca', ru: 'Немецкий-итальянский', fr: 'Allemand-italien', uk: 'Німецька-італійська' },
  'Deutsch–Arabisch': { en: 'German-Arabic', ar: 'الألمانية – العربية', tr: 'Almanca-Arapça', ru: 'Немецкий-арабский', fr: 'Allemand-arabe', uk: 'Німецька-арабська' },
  'sowie in vielen weiteren europäischen und außereuropäischen Sprachen': { en: 'as well as many other European and non-European languages', ar: 'وكذلك العديد من اللغات الأوروبية وغير الأوروبية الأخرى' },
  'Wir vermitteln qualifizierte Dolmetscher in über 190 Sprachen für Präsenztermine, Online-Meetings, Videokonferenzen und Telefondolmetschen – schnell, zuverlässig und professionell.': { en: 'We arrange qualified interpreters in more than 190 languages for on-site appointments, online meetings, video conferences and telephone interpreting, quickly, reliably and professionally.', ar: 'نوفر مترجمين فوريين مؤهلين بأكثر من 190 لغة للمواعيد الحضورية والاجتماعات عبر الإنترنت ومؤتمرات الفيديو والترجمة الهاتفية، بسرعة وموثوقية واحترافية.' },
  'Notardolmetscher': { en: 'Notary interpreters', ar: 'مترجمو كاتب العدل', tr: 'Noter tercümanları', ru: 'Переводчики для нотариуса', fr: 'Interprètes notariaux', uk: 'Перекладачі для нотаріуса' },
  'Bei notariellen Beurkundungen – etwa Kaufverträgen, Eheverträgen, Gesellschaftsgründungen oder Vollmachten – ist präzises Dolmetschen unverzichtbar.': { en: 'Precise interpreting is essential for notarial certifications such as purchase contracts, marriage contracts, company formations or powers of attorney.', ar: 'في التصديقات التوثيقية مثل عقود البيع أو عقود الزواج أو تأسيس الشركات أو التوكيلات، تكون الترجمة الفورية الدقيقة أمرا ضروريا.' },
  'Unsere Notardolmetscher arbeiten regelmäßig mit Notariaten zusammen und sind mit den Abläufen vor Ort bestens vertraut.': { en: 'Our notary interpreters regularly work with notary offices and are highly familiar with local procedures.', ar: 'يعمل مترجمو كاتب العدل لدينا بانتظام مع مكاتب التوثيق وهم على دراية كاملة بالإجراءات المتبعة هناك.' },
  'Fachübersetzungen erfordern weit mehr als Sprachkenntnisse. Sie setzen fundiertes Fachwissen und Erfahrung im jeweiligen Fachgebiet voraus. Deshalb arbeiten wir ausschließlich mit qualifizierten Fachübersetzern.': { en: 'Specialist translations require much more than language skills. They require sound subject knowledge and experience in the relevant field. That is why we work exclusively with qualified specialist translators.', ar: 'تتطلب الترجمات المتخصصة أكثر بكثير من المعرفة اللغوية؛ فهي تحتاج إلى معرفة تخصصية راسخة وخبرة في المجال المعني. لذلك نعمل حصرا مع مترجمين متخصصين مؤهلين.' },
  'Unsere Fachübersetzer übertragen Inhalte sprachlich korrekt, fachlich präzise und zielgruppengerecht – für technische, juristische, medizinische, wissenschaftliche und wirtschaftliche Dokumente.': { en: 'Our specialist translators render content linguistically correctly, technically precisely and appropriately for the target audience, for technical, legal, medical, scientific and business documents.', ar: 'ينقل مترجمونا المتخصصون المحتوى بدقة لغوية وتخصصية وبما يناسب الجمهور المستهدف، للوثائق التقنية والقانونية والطبية والعلمية والاقتصادية.' },
  'Als Fachübersetzungsbüro für Technik und Ingenieurwesen unterstützen wir Hersteller, Ingenieurbüros, Planungsbüros, Maschinenbauer und Industrieunternehmen mit präzisen technischen Übersetzungen.': { en: 'As a specialist translation office for technology and engineering, we support manufacturers, engineering offices, planning offices, machine builders and industrial companies with precise technical translations.', ar: 'بصفتنا مكتب ترجمة متخصصا في التقنية والهندسة، ندعم المصنّعين والمكاتب الهندسية ومكاتب التخطيط وشركات بناء الآلات والشركات الصناعية بترجمات تقنية دقيقة.' },
  'Unsere technischen Fachübersetzungen werden von qualifizierten Übersetzern mit ingenieurwissenschaftlichem Hintergrund angefertigt. Als Muttersprachler ihrer jeweiligen Zielsprache verbinden sie technisches Fachwissen mit sprachlicher Präzision und einer einheitlichen Fachterminologie. So erhalten Sie hochwertige, fachlich korrekte und verständliche Übersetzungen – alles aus einer Hand.': { en: 'Our technical specialist translations are prepared by qualified translators with an engineering background. As native speakers of the target language, they combine technical expertise with linguistic precision and consistent terminology, giving you high-quality, correct and clear translations from one source.', ar: 'تُنجز ترجماتنا التقنية المتخصصة بواسطة مترجمين مؤهلين ذوي خلفية هندسية. وبصفتهم متحدثين أصليين للغة الهدف، يجمعون بين المعرفة التقنية والدقة اللغوية والمصطلحات الموحدة، لتحصلوا على ترجمات عالية الجودة ودقيقة ومفهومة من جهة واحدة.' },
  'Medizin & Dentalmedizin': { en: 'Medicine and dentistry', ar: 'الطب وطب الأسنان', tr: 'Tıp ve diş hekimliği', ru: 'Медицина и стоматология', fr: 'Médecine et dentisterie', uk: 'Медицина та стоматологія' },
  'Als spezialisiertes Fachübersetzungsbüro für Medizin und Dentalmedizin unterstützen wir Kliniken, Praxen, medizinische Einrichtungen, Dentalfirmen, Hersteller und Fachverlage mit präzisen und fachlich geprüften Übersetzungen.': { en: 'As a specialist translation office for medicine and dentistry, we support clinics, practices, medical institutions, dental companies, manufacturers and specialist publishers with precise, professionally checked translations.', ar: 'بصفتنا مكتب ترجمة متخصصا في الطب وطب الأسنان، ندعم العيادات والممارسات والمؤسسات الطبية وشركات الأسنان والمصنّعين ودور النشر المتخصصة بترجمات دقيقة ومراجعة تخصصيا.' },
  'Unsere Übersetzer verfügen über langjährige Erfahrung und eine akademische Ausbildung in ihrem jeweiligen Fachgebiet. Viele unserer Fachübersetzer sind Muttersprachler ihrer Zielsprache und beherrschen zusätzlich Deutsch auf muttersprachlichem Niveau. So verbinden wir fachliche Kompetenz mit sprachlicher Präzision und gewährleisten hochwertige Fachübersetzungen.': { en: 'Our translators have many years of experience and academic training in their respective fields. Many are native speakers of the target language and also command German at native-speaker level, combining subject expertise with linguistic precision.', ar: 'يمتلك مترجمونا سنوات طويلة من الخبرة وتأهيلا أكاديميا في مجالاتهم. كثير من مترجمينا المتخصصين متحدثون أصليون للغة الهدف ويتقنون الألمانية أيضا بمستوى متقدم جدا، وبذلك نجمع بين الكفاءة التخصصية والدقة اللغوية.' },
  'Dentalmedizin & Zahntechnik': { en: 'Dentistry and dental technology', ar: 'طب الأسنان وتقنية الأسنان', tr: 'Diş hekimliği ve diş teknolojisi', ru: 'Стоматология и зуботехника', fr: 'Dentisterie et technologie dentaire', uk: 'Стоматологія та зуботехніка' },
  'Internationale Gesundheitskommunikation': { en: 'International health communication', ar: 'التواصل الصحي الدولي', tr: 'Uluslararası sağlık iletişimi', ru: 'Международная медицинская коммуникация', fr: 'Communication santé internationale', uk: 'Міжнародна медична комунікація' },
  'Pharmazeutik & Arzneimittel': { en: 'Pharmaceutics and medicines', ar: 'الصيدلة والأدوية', tr: 'Farmasötik ve ilaçlar', ru: 'Фармацевтика и лекарственные средства', fr: 'Pharmaceutique et médicaments', uk: 'Фармацевтика та лікарські засоби' },
  'Als spezialisiertes Fachübersetzungsbüro für Pharmazie unterstützen wir Pharmaunternehmen, Apotheken, Kliniken, CROs (Clinical Research Organizations), Hersteller von Medizinprodukten sowie Behörden mit fachlich präzisen Arzneimittelübersetzungen.': { en: 'As a specialist translation office for pharmacy, we support pharmaceutical companies, pharmacies, clinics, CROs, medical device manufacturers and authorities with precise pharmaceutical translations.', ar: 'بصفتنا مكتب ترجمة متخصصا في الصيدلة، ندعم شركات الأدوية والصيدليات والعيادات ومنظمات الأبحاث السريرية ومصنّعي الأجهزة الطبية والجهات الحكومية بترجمات دوائية دقيقة.' },
  'Unsere pharmazeutischen Fachübersetzungen werden von qualifizierten Pharmazeuten aus unserem Team angefertigt, die ihre jeweilige Fremdsprache sowie Deutsch sicher beherrschen. Dadurch verbinden wir fundiertes pharmazeutisches Fachwissen mit sprachlicher Präzision und gewährleisten fachgerechte, hochwertige Übersetzungen.': { en: 'Our pharmaceutical specialist translations are prepared by qualified pharmacists in our team who have a strong command of both the foreign language and German. This combines pharmaceutical expertise with linguistic precision.', ar: 'تُنجز ترجماتنا الصيدلانية المتخصصة بواسطة صيادلة مؤهلين من فريقنا يتقنون اللغة الأجنبية المعنية والألمانية. وبذلك نجمع بين المعرفة الصيدلانية المتعمقة والدقة اللغوية.' },
  'Pharmazeutische Dokumente': { en: 'Pharmaceutical documents', ar: 'وثائق صيدلانية', tr: 'Farmasötik belgeler', ru: 'Фармацевтические документы', fr: 'Documents pharmaceutiques', uk: 'Фармацевтичні документи' },
  'Fachinformationen (SmPC)': { en: 'Product information (SmPC)', ar: 'معلومات المنتج (SmPC)' },
  'Packungsbeilagen (PIL)': { en: 'Package leaflets (PIL)', ar: 'النشرات الداخلية (PIL)' },
  'Arzneimittelverpackungen': { en: 'Medicine packaging', ar: 'عبوات الأدوية' },
  'Etiketten & Faltschachteln': { en: 'Labels and folding cartons', ar: 'الملصقات والعلب المطوية' },
  'Zulassungsunterlagen': { en: 'Approval documents', ar: 'وثائق الترخيص' },
  'Einreichungsdossiers': { en: 'Submission dossiers', ar: 'ملفات التقديم' },
  'Patienteninformationen': { en: 'Patient information', ar: 'معلومات المرضى' },
  'GMP-Dokumente': { en: 'GMP documents', ar: 'وثائق GMP' },
  'SOPs & Arbeitsanweisungen': { en: 'SOPs and work instructions', ar: 'إجراءات التشغيل القياسية وتعليمات العمل' },
  'Internationale Pharma- und Zulassungsprojekte': { en: 'International pharmaceutical and approval projects', ar: 'مشاريع صيدلانية وترخيص دولية' },
  'Internationale Arzneimittelzulassungen': { en: 'International medicine approvals', ar: 'تراخيص أدوية دولية' },
  'GMP-Dokumentationen': { en: 'GMP documentation', ar: 'وثائق GMP' },
  'Medizinprodukte': { en: 'Medical devices', ar: 'الأجهزة الطبية' },
  'Pharmakovigilanz': { en: 'Pharmacovigilance', ar: 'اليقظة الدوائية' },
  'Mehrsprachige Produktdokumentationen': { en: 'Multilingual product documentation', ar: 'وثائق منتجات متعددة اللغات' },
  'Arzneimittelübersetzungen': { en: 'Medicine translations', ar: 'ترجمات الأدوية' },
  'Klinische Forschung': { en: 'Clinical research', ar: 'البحث السريري' },
  'Pharma & Biotechnologie': { en: 'Pharma and biotechnology', ar: 'الصيدلة والتكنولوجيا الحيوية' },
  'Literatur & Kultur': { en: 'Literature and culture', ar: 'الأدب والثقافة', tr: 'Edebiyat ve kültür', ru: 'Литература и культура', fr: 'Littérature et culture', uk: 'Література та культура' },
  'Literarische Fachübersetzungen': { en: 'Literary specialist translations', ar: 'ترجمات أدبية متخصصة' },
  'Als Fachübersetzungsbüro für Literatur und Kultur unterstützen wir Verlage, Autorinnen und Autoren, Theater, Filmproduktionen, Kulturinstitutionen, Museen und Agenturen mit hochwertigen literarischen Übersetzungen.': { en: 'As a specialist translation office for literature and culture, we support publishers, authors, theatres, film productions, cultural institutions, museums and agencies with high-quality literary translations.', ar: 'بصفتنا مكتب ترجمة متخصصا في الأدب والثقافة، ندعم دور النشر والمؤلفين والمسارح والإنتاج السينمائي والمؤسسات الثقافية والمتاحف والوكالات بترجمات أدبية عالية الجودة.' },
  'Literarische und kulturelle Texte': { en: 'Literary and cultural texts', ar: 'نصوص أدبية وثقافية' },
  'Romane': { en: 'Novels', ar: 'الروايات' },
  'Erzählungen': { en: 'Short stories', ar: 'القصص' },
  'Kinder- und Jugendbücher': { en: 'Children’s and young adult books', ar: 'كتب الأطفال واليافعين' },
  'Lyrik': { en: 'Poetry', ar: 'الشعر' },
  'Essays': { en: 'Essays', ar: 'المقالات الأدبية' },
  'Biografien': { en: 'Biographies', ar: 'السير الذاتية' },
  'Sachbücher': { en: 'Non-fiction books', ar: 'كتب غير روائية' },
  'Theaterstücke': { en: 'Plays', ar: 'المسرحيات' },
  'Drehbücher': { en: 'Screenplays', ar: 'السيناريوهات' },
  'Hörspieltexte': { en: 'Radio play texts', ar: 'نصوص المسرحيات الصوتية' },
  'Katalogtexte': { en: 'Catalogue texts', ar: 'نصوص الكتالوجات' },
  'Ausstellungstexte': { en: 'Exhibition texts', ar: 'نصوص المعارض' },
  'Verlage, Autoren & Kulturinstitutionen': { en: 'Publishers, authors and cultural institutions', ar: 'دور النشر والمؤلفون والمؤسسات الثقافية' },
  'Buchübersetzungen': { en: 'Book translations', ar: 'ترجمات الكتب' },
  'Literaturprojekte': { en: 'Literary projects', ar: 'مشاريع أدبية' },
  'Verlagsprogramme': { en: 'Publishing programmes', ar: 'برامج النشر' },
  'Theaterproduktionen': { en: 'Theatre productions', ar: 'إنتاجات مسرحية' },
  'Filmproduktionen': { en: 'Film productions', ar: 'إنتاجات سينمائية' },
  'Museumsausstellungen': { en: 'Museum exhibitions', ar: 'معارض المتاحف' },
  'Mehrsprachige Marketingkampagnen': { en: 'Multilingual marketing campaigns', ar: 'حملات تسويقية متعددة اللغات' },
  'Internationale Kulturprojekte': { en: 'International cultural projects', ar: 'مشاريع ثقافية دولية' },
  'Kultur & Medien': { en: 'Culture and media', ar: 'الثقافة والإعلام' },
  'Lektorat & Korrektorat': { en: 'Editing and proofreading', ar: 'التحرير والتدقيق اللغوي' },
  'Als Fachübersetzungsbüro für Chemie und Biowissenschaften unterstützen wir Chemieunternehmen, Labore, Forschungsinstitute, Hochschulen, Biotech-Unternehmen sowie Hersteller von Labor- und Analysegeräten mit präzisen wissenschaftlichen Übersetzungen.': { en: 'As a specialist translation office for chemistry and life sciences, we support chemical companies, laboratories, research institutes, universities, biotech companies and manufacturers of laboratory and analytical equipment with precise scientific translations.', ar: 'بصفتنا مكتب ترجمة متخصصا في الكيمياء وعلوم الحياة، ندعم الشركات الكيميائية والمختبرات ومعاهد البحث والجامعات وشركات التكنولوجيا الحيوية ومصنّعي أجهزة المختبر والتحليل بترجمات علمية دقيقة.' },
  'Verträge': { en: 'Contracts', ar: 'العقود' },
  'Gesellschaftsverträge': { en: 'Articles of association', ar: 'عقود الشركات' },
  'Vollmachten': { en: 'Powers of attorney', ar: 'التوكيلات' },
  'Gerichtsurteile': { en: 'Court judgments', ar: 'الأحكام القضائية' },
  'Beschlüsse': { en: 'Decisions', ar: 'القرارات' },
  'Satzungen': { en: 'Statutes', ar: 'الأنظمة الأساسية' },
  'Klageschriften': { en: 'Statements of claim', ar: 'لوائح الدعوى' },
  'Notarielle Urkunden': { en: 'Notarial deeds', ar: 'الوثائق الموثقة' },
  'Als Übersetzungsbüro für IT, Software und Lokalisierung unterstützen wir Softwarehersteller, Start-ups, Agenturen, Systemhäuser und IT-Abteilungen bei der fachgerechten Übersetzung und Lokalisierung digitaler Produkte.': { en: 'As a translation office for IT, software and localization, we support software manufacturers, start-ups, agencies, system houses and IT departments with professional translation and localization of digital products.', ar: 'بصفتنا مكتب ترجمة لتقنية المعلومات والبرمجيات والتوطين، ندعم مصنّعي البرامج والشركات الناشئة والوكالات وشركات الأنظمة وأقسام تقنية المعلومات في الترجمة المتخصصة وتوطين المنتجات الرقمية.' },
  'Wir arbeiten mit XML-, YAML-, JSON-, PO-, XLIFF- und CSV-Dateien und integrieren uns auf Wunsch direkt in bestehende Lokalisierungs-Workflows, Git-Repositories und CI/CD-Pipelines.': { en: 'We work with XML, YAML, JSON, PO, XLIFF and CSV files and, on request, integrate directly into existing localization workflows, Git repositories and CI/CD pipelines.', ar: 'نعمل مع ملفات XML وYAML وJSON وPO وXLIFF وCSV، ونندمج عند الطلب مباشرة في سير عمل التوطين القائم ومستودعات Git وخطوط CI/CD.' },
  'Unsere IT-Fachübersetzer verfügen über fundiertes technisches Verständnis in den Bereichen Softwareentwicklung, Cloud-Infrastruktur, IT-Sicherheit, Datenbanken und DevOps. Dadurch stellen wir sicher, dass Benutzeroberflächen, Fehlermeldungen, Tooltips, technische Dokumentationen und Softwareinhalte nicht nur sprachlich präzise, sondern auch fachlich korrekt, konsistent und benutzerfreundlich übersetzt werden.': { en: 'Our IT specialist translators have sound technical understanding in software development, cloud infrastructure, IT security, databases and DevOps. This ensures that user interfaces, error messages, tooltips, technical documentation and software content are translated not only precisely, but also correctly, consistently and user-friendly.', ar: 'يمتلك مترجمونا المتخصصون في تقنية المعلومات فهما تقنيا راسخا في تطوير البرمجيات والبنية السحابية وأمن المعلومات وقواعد البيانات وDevOps. لذلك نضمن ترجمة الواجهات ورسائل الخطأ والتلميحات والوثائق التقنية ومحتوى البرمجيات بدقة لغوية وصحة تخصصية واتساق وسهولة استخدام.' },
  'Als deutschlandweit tätiges IT-Übersetzungsbüro unterstützen wir Unternehmen, Start-ups, Softwarehersteller und IT-Dienstleister in Städten wie Berlin, Hamburg, München, Stuttgart, Hannover, Frankfurt, Köln und Osnabrück sowie Remote-Teams in ganz Europa.': { en: 'As an IT translation office active throughout Germany, we support companies, start-ups, software manufacturers and IT service providers in cities such as Berlin, Hamburg, Munich, Stuttgart, Hanover, Frankfurt, Cologne and Osnabrück, as well as remote teams across Europe.', ar: 'بصفتنا مكتب ترجمة لتقنية المعلومات يعمل في جميع أنحاء ألمانيا، ندعم الشركات والشركات الناشئة ومصنّعي البرمجيات ومقدمي خدمات تقنية المعلومات في مدن مثل برلين وهامبورغ وميونخ وشتوتغارت وهانوفر وفرانكفورت وكولونيا وأوسنابروك، وكذلك الفرق البعيدة في كل أوروبا.' },
  'Teilen Sie uns einfach mit, welche Inhalte übersetzt werden sollen, in welche Sprache die Übersetzung erfolgen soll und ob besondere Anforderungen an Terminologie, Format oder Lokalisierung bestehen. Auf dieser Grundlage erhalten Sie von uns zeitnah ein kostenloses und unverbindliches Angebot mit transparenten Konditionen und einer realistischen Lieferzeit.': { en: 'Simply tell us which content should be translated, into which language, and whether there are special requirements for terminology, format or localization. On this basis, you will promptly receive a free, non-binding offer with transparent conditions and a realistic delivery time.', ar: 'أخبرونا ببساطة بالمحتوى المطلوب ترجمته، واللغة المطلوبة، وما إذا كانت هناك متطلبات خاصة للمصطلحات أو التنسيق أو التوطين. وبناء على ذلك تحصلون سريعا على عرض مجاني وغير ملزم بشروط واضحة ومدة تسليم واقعية.' },
});

function translateServiceSheetText(text, lang = 'de', fallback = '') {
  if (lang === 'de' || !text) return text;
  const normalized = normalizeText(text);
  const translated = SERVICE_SHEET_TEXT_TRANSLATIONS[normalized];
  return translated?.[lang] || translated?.en || normalizeText(fallback) || normalized;
}

function localizeFeatures(active, fallbackFeatures = [], visualCopy, lang = 'de') {
  if (lang === 'de') return fallbackFeatures;
  return fallbackFeatures.map(([title, text, asset]) => [
    translateServiceSheetText(title, lang),
    translateServiceSheetText(text, lang),
    asset,
  ]);
}

function localizePointGridSheet(active, data, visualCopy, lang = 'de') {
  if (lang === 'de') return data;

  const paragraphs = (active?.paragraphs || []).map(normalizeText).filter(Boolean);
  let paragraphIndex = 0;
  const localizedRows = data.rows.map((row, index) => {
    const nextRow = { ...row };

    if (index === 0) {
      nextRow.title = normalizeText(active?.title || active?.label || translateServiceSheetText(row.title, lang));
    } else if (row.title) {
      nextRow.title = translateServiceSheetText(row.title, lang);
    }

    if (row.paragraphs?.length) {
      const available = paragraphs.slice(paragraphIndex, paragraphIndex + row.paragraphs.length);
      nextRow.paragraphs = row.paragraphs.map((text, itemIndex) => translateServiceSheetText(text, lang, available[itemIndex]));
      paragraphIndex += row.paragraphs.length;
    }

    if (row.lead) nextRow.lead = translateServiceSheetText(row.lead, lang);
    if (row.listTitle) nextRow.listTitle = translateServiceSheetText(row.listTitle, lang);
    if (row.items?.length) {
      nextRow.items = row.items.map((item) => translateServiceSheetText(item, lang));
    }
    return nextRow;
  });

  return {
    ...data,
    kicker: normalizeText(active?.kicker || data.kicker),
    title: normalizeText(active?.label || active?.title || data.title),
    sectionTitle: data.sectionTitle ? translateServiceSheetText(data.sectionTitle, lang) : data.sectionTitle,
    rows: localizedRows,
    features: localizeFeatures(active, data.features, visualCopy, lang),
  };
}

function RechtAsset({ asset, className = '', alt = '' }) {
  return (
    <span className={`recht-asset ${className}`} aria-hidden={alt ? undefined : 'true'}>
      <img src={`${RECHT_ASSET_BASE}${asset}`} alt={alt} loading="lazy" />
    </span>
  );
}

function PointGridSheet({ active, data, lang = 'de' }) {
  const featureCount = data.features?.length || 0;
  const grid = data.wordGrid || {};
  const tableCols = grid.columns || 2;
  const iconSpan = grid.iconSpan || 1;
  const copySpan = grid.copySpan || Math.max(tableCols - iconSpan, 1);
  const featureSpans = grid.featureSpans || [];
  const bottomCols = grid.featureColumns || tableCols || Math.min(Math.max(featureCount, 2), 4);
  const template = `repeat(${tableCols}, minmax(0, 1fr))`;

  return (
    <div className="point-grid-sheet" data-service-id={active.id}>
      <span className="point-grid-kicker">{data.kicker}</span>
      <h3>{data.title}</h3>

      <section className="point-grid-table" style={{ '--point-table-cols': template }} aria-label={`${data.title} Übersicht`}>
        {data.rows.map((row, index) => (
          <Fragment key={`${data.title}-${index}`}>
            <div className="point-grid-icon-cell" style={{ gridColumn: `span ${row.iconSpan || iconSpan}` }}>
              <PointGridAsset base={data.assetBase} asset={row.icon} />
            </div>
            <div className="point-grid-copy-cell" style={{ gridColumn: `span ${row.copySpan || copySpan}` }}>
              {row.title && <h4>{row.title}</h4>}
              {(row.paragraphs || []).map((text) => <p key={text}>{text}</p>)}
              {row.listTitle && <h4>{row.listTitle}</h4>}
              {row.lead && <p>{row.lead}</p>}
              {row.items?.length ? (
                <ul className={row.columns === 2 ? 'point-grid-list point-grid-list--two' : 'point-grid-list'}>
                  {row.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : null}
              {(row.request || (data.request && index === 0)) && (
                <RequestCard lang={lang} className="point-grid-request-card" />
              )}
            </div>
          </Fragment>
        ))}
      </section>

      {data.sectionTitle && <h4 className="point-grid-section-title">{data.sectionTitle}</h4>}
      {data.features?.length ? (
        <section className="point-grid-card-grid" style={{ '--point-cols': bottomCols }} aria-label={`${data.title} Details`}>
          {data.features.map(([title, text, asset], index) => (
            <article className="point-grid-card" style={{ gridColumn: `span ${featureSpans[index] || 1}` }} key={title}>
              <PointGridAsset base={data.assetBase} asset={asset} />
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </section>
      ) : null}
    </div>
  );
}

function getLocalizedItSoftwareSheet(active, visualCopy, lang = 'de') {
  if (lang === 'de') return IT_SOFTWARE_SHEET;
  const paragraphs = (active?.paragraphs || []).map(normalizeText).filter(Boolean);
  return {
    ...IT_SOFTWARE_SHEET,
    title: normalizeText(active?.label || active?.title || IT_SOFTWARE_SHEET.title),
    sections: IT_SOFTWARE_SHEET.sections.map((section) => ({
      ...section,
      title: translateServiceSheetText(section.title, lang),
      lead: section.lead ? translateServiceSheetText(section.lead, lang) : section.lead,
      text: section.text ? translateServiceSheetText(section.text, lang, paragraphs[0]) : section.text,
      items: section.items?.map((item) => translateServiceSheetText(item, lang)),
    })),
    languageCard: {
      ...IT_SOFTWARE_SHEET.languageCard,
      title: translateServiceSheetText(IT_SOFTWARE_SHEET.languageCard.title, lang),
      items: IT_SOFTWARE_SHEET.languageCard.items.map((item) => translateServiceSheetText(item, lang)),
    },
    international: {
      ...IT_SOFTWARE_SHEET.international,
      title: translateServiceSheetText(IT_SOFTWARE_SHEET.international.title, lang),
      lead: translateServiceSheetText(IT_SOFTWARE_SHEET.international.lead, lang),
      items: IT_SOFTWARE_SHEET.international.items.map((item) => translateServiceSheetText(item, lang)),
    },
    workflow: IT_SOFTWARE_SHEET.workflow.map((text, index) => translateServiceSheetText(text, lang, paragraphs[index])),
    nationwide: {
      ...IT_SOFTWARE_SHEET.nationwide,
      title: translateServiceSheetText(IT_SOFTWARE_SHEET.nationwide.title, lang),
      text: translateServiceSheetText(IT_SOFTWARE_SHEET.nationwide.text, lang, paragraphs[36]),
    },
    cta: {
      ...IT_SOFTWARE_SHEET.cta,
      question: translateServiceSheetText(IT_SOFTWARE_SHEET.cta.question, lang),
      text: translateServiceSheetText(IT_SOFTWARE_SHEET.cta.text, lang, paragraphs[37]),
      button: normalizeText(active?.cta || visualCopy.request),
    },
    bottom: IT_SOFTWARE_SHEET.bottom.map(([title, text, asset]) => [
      translateServiceSheetText(title, lang),
      translateServiceSheetText(text, lang),
      asset,
    ]),
  };
}

function ItSoftwareSheet({ active, visualCopy, lang = 'de' }) {
  const data = getLocalizedItSoftwareSheet(active, visualCopy, lang);
  const [intro, apps, docs, competence] = data.sections;
  const renderList = (items, className = 'it-doc-list') => (
    <ul className={className}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );

  return (
    <div className="it-word-sheet" data-service-id={active.id}>
      <h3 className="it-word-title">{data.title}</h3>

      <section className="it-word-cell it-word-icon it-word-icon--intro">
        <ItAssetBubble asset={intro.asset} />
      </section>
      <section className="it-word-cell it-word-copy it-word-copy--intro">
        <h4>{intro.title}</h4>
        <p>{intro.text}</p>
      </section>

      <section className="it-word-cell it-word-icon it-word-icon--apps">
        <ItAssetBubble asset={apps.asset} />
      </section>
      <section className="it-word-cell it-word-copy it-word-copy--apps">
        <h4>{apps.title}</h4>
        {renderList(apps.items)}
      </section>

      <section className="it-word-cell it-word-icon it-word-icon--docs">
        <ItAssetBubble asset={docs.asset} />
      </section>
      <section className="it-word-cell it-word-copy it-word-copy--docs">
        <h4>{docs.title}</h4>
        <p>{docs.lead}</p>
        {renderList(docs.items)}
      </section>

      <section className="it-word-cell it-word-icon it-word-icon--languages">
        <ItAssetBubble asset={data.languageCard.asset} />
      </section>
      <section className="it-word-cell it-word-copy it-word-copy--languages">
        <h4>{data.languageCard.title}</h4>
        {renderList(data.languageCard.items)}
      </section>

      <section className="it-word-cell it-word-icon it-word-icon--competence">
        <ItAssetBubble asset={competence.asset} />
      </section>
      <section className="it-word-cell it-word-copy it-word-copy--competence">
        <h4>{competence.title}</h4>
        <p>{competence.lead}</p>
        {renderList(competence.items, 'it-doc-list it-doc-list--two-columns')}
      </section>

      <section className="it-word-cell it-word-icon it-word-icon--international">
        <ItAssetBubble asset={data.international.asset} />
      </section>
      <section className="it-word-cell it-word-copy it-word-copy--international">
        <h4>{data.international.title}</h4>
        <p>{data.international.lead}</p>
        <div className="it-word-checks">
          {data.international.items.map((item) => (
            <span className="it-word-check-item" key={item}>
              <span className="it-word-checkmark" aria-hidden="true">✓</span>
              <span className="it-word-check-text">{item}</span>
            </span>
          ))}
        </div>
      </section>

      <section className="it-word-cell it-word-copy it-word-copy--workflow">
        {data.workflow.map((text) => <p key={text}>{text}</p>)}
      </section>

      <section className="it-word-cell it-word-icon it-word-icon--nationwide">
        <ItAssetBubble asset={data.nationwide.asset} />
      </section>
      <section className="it-word-cell it-word-copy it-word-copy--nationwide">
        <h4>{data.nationwide.title}</h4>
        <p>{data.nationwide.text}</p>
      </section>

      <section className="it-word-cell it-word-icon it-word-icon--cta">
        <ItAssetBubble asset={data.cta.asset} />
      </section>
      <section className="it-word-cell it-word-copy it-word-copy--cta">
        <h4>{data.cta.question}</h4>
        <p>{data.cta.text}</p>
        <a href={getOfferHref(lang)} className="it-doc-btn">
          {data.cta.button} <ArrowRight aria-hidden="true" />
        </a>
      </section>

      <section className="it-word-bottom-strip">
        {data.bottom.map(([title, text, asset]) => (
          <article className="it-doc-bottom-tile" key={title}>
            <img src={`${IT_ASSET_BASE}${asset}`} alt="" loading="lazy" />
            <div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function SpecialistSheet({ active, rich, visualCopy, lang }) {
  const ActiveIcon = getServiceTheme(active).icon || BadgeCheck;
  const richLabels = RICH_LABELS[lang] || RICH_LABELS.de;
  const paragraphs = (active?.paragraphs || []).map(normalizeText);
  const longParagraphs = getLongParagraphs(paragraphs);
  const segments = getContentSegments(active, visualCopy, lang);
  const sideItems = (segments[0]?.items || rich.sideCards[0]?.items || []).slice(0, 7);
  const languagePairs = richLabels.pairs.slice(0, 8);
  const bottomTiles = (segments.flatMap((segment) => segment.items).length ? segments.flatMap((segment) => segment.items) : rich.footerTiles.map((tile) => tile.title)).slice(0, 6);

  return (
    <div className="pdf-service-sheet pdf-service-sheet--specialist" data-service-id={active.id}>
      <section className="pdf-top-grid">
        <div className="pdf-main-column">
          <h3>{rich.title}</h3>
          <div className="pdf-info-row">
            <IconBubble icon={ActiveIcon} />
            <div>
              <h4>{rich.introTitle}</h4>
              <p>{rich.intro}</p>
            </div>
          </div>
          <div className="pdf-info-row">
            <IconBubble icon={ShieldCheck} />
            <div>
              <h4>{rich.competenceTitle}</h4>
              <p>{rich.competence}</p>
            </div>
          </div>
          {longParagraphs[2] && (
            <div className="pdf-info-row">
              <IconBubble icon={MapPin} />
              <div>
                <h4>{richLabels.nationwide}</h4>
                <p>{longParagraphs[2]}</p>
              </div>
            </div>
          )}
        </div>

        <div className="pdf-side-stack">
          <article className="pdf-side-card">
            <IconBubble icon={ClipboardList} />
            <h4>{segments[0]?.title || visualCopy.typical}</h4>
            <ul>{sideItems.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="pdf-side-card">
            <IconBubble icon={Globe2} />
            <h4>{richLabels.languagePairs}</h4>
            <ul>{languagePairs.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="pdf-topic-section" aria-labelledby={`${active.id}-typical`}>
        <div className="pdf-section-title">
          <IconBubble icon={segments[0]?.Icon || Cloud} />
          <h4 id={`${active.id}-typical`}>{rich.groupsTitle}</h4>
        </div>
        <div className="pdf-topic-grid">
          {segments.map(({ Icon, title, items }) => (
            <article className="pdf-topic-card" key={title}>
              <IconBubble icon={Icon} />
              <h5>{title}</h5>
              <ul>
                {items.slice(0, 4).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="pdf-wide-card">
        <IconBubble icon={MapPin} />
        <div>
          <h4>{richLabels.nationwide}</h4>
          <p>{longParagraphs[longParagraphs.length - 2] || rich.wideBlocks[1]?.text || visualCopy.ctaSub}</p>
        </div>
      </section>

      <section className="pdf-cta-card">
        <IconBubble icon={HelpIcon(active)} />
        <div>
          <h4>{rich.ctaText}</h4>
          <p>{rich.ctaParagraph}</p>
        </div>
        <a href={getOfferHref(lang)} className="pdf-blue-btn">
          {rich.ctaText} <ArrowRight aria-hidden="true" />
        </a>
      </section>

      <div className="pdf-bottom-strip">
        {bottomTiles.map((item, index) => {
          const Icon = RICH_GROUP_ICONS[index] || BadgeCheck;
          return (
            <div className="pdf-bottom-tile" key={item}>
              <Icon aria-hidden="true" />
              <strong>{item}</strong>
              <span>{visualCopy.ctaSub}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RechtSheet({ active, visualCopy, lang = 'de' }) {
  const data = lang === 'de' ? RECHT_SHEET : (() => {
    const paragraphs = (active?.paragraphs || []).map(normalizeText).filter(Boolean);
    const examples = (active?.examples || []).map(normalizeText).filter(Boolean);
    return {
      ...RECHT_SHEET,
      kicker: normalizeText(active?.kicker || RECHT_SHEET.kicker),
      title: normalizeText(active?.label || active?.title || RECHT_SHEET.title),
      introTitle: normalizeText(active?.title || active?.label || RECHT_SHEET.introTitle),
      intro: RECHT_SHEET.intro.map((text, index) => translateServiceSheetText(text, lang, paragraphs[index])),
      documentsTitle: translateServiceSheetText(RECHT_SHEET.documentsTitle, lang),
      documents: RECHT_SHEET.documents.map((item, index) => translateServiceSheetText(item, lang, examples[index])),
      features: localizeFeatures(active, RECHT_SHEET.features, visualCopy, lang),
    };
  })();

  return (
    <div className="recht-word-sheet" data-service-id={active.id}>
      <div className="recht-word-title">
        <span>{data.kicker}</span>
        <h3>{data.title}</h3>
      </div>

      <div className="recht-word-icon recht-word-icon--intro">
        <RechtAsset asset="gericht.png" />
      </div>
      <section className="recht-word-copy recht-word-copy--intro" aria-label="Recht Fachübersetzungen">
        <div>
          <h4>{data.introTitle}</h4>
          {data.intro.map((text) => <p key={text}>{text}</p>)}
        </div>
        <RequestCard lang={lang} className="recht-request-card" />
      </section>

      <div className="recht-word-icon recht-word-icon--documents">
        <RechtAsset asset="dokument.png" />
      </div>
      <section className="recht-word-copy recht-word-copy--documents" aria-label="Typische Rechtsdokumente">
        <h4>{data.documentsTitle}</h4>
        <ul>
          {data.documents.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="recht-word-bottom-strip" aria-label="Recht Vorteile">
        {data.features.map(([title, text, asset]) => (
          <article className="recht-word-bottom-tile" key={title}>
            <RechtAsset asset={asset} />
            <div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function HelpIcon(active) {
  if (active?.group === 'interpreting') return Headphones;
  if (active?.group === 'translation') return FileText;
  return BadgeCheck;
}

function DolmetschenReferenceSheet({ active, visualCopy, lang }) {
  const data = DOLMETSCHER_SHEET_BY_LANG[lang] || DOLMETSCHER_SHEET_BY_LANG.de;
  const kicker = normalizeText(data.kicker || active?.kicker || SIDE_LABELS[lang]?.specialist || DOLMETSCHER_SHEET.kicker);
  return (
    <div className="dolm-doc-sheet" data-service-id={active.id}>
      <span className="dolm-doc-kicker">{kicker}</span>
      <h3>{data.title}</h3>

      <section className="dolm-doc-table" aria-label="Dolmetschen Übersicht">
        <div className="dolm-doc-icon-cell dolm-doc-icon-cell--top">
          <DolmetscherAsset asset="mannschaft.png" />
        </div>
        <div className="dolm-doc-copy-cell">
          <p>{data.introRows[0].text}</p>
        </div>

        <div className="dolm-doc-icon-cell dolm-doc-icon-cell--wide">
          <DolmetscherAsset asset="platzhalter.png" />
        </div>
        <div className="dolm-doc-copy-cell dolm-doc-copy-cell--wide">
          <p>{data.introRows[1].text}</p>
          <p>{data.introRows[2].text}</p>
          <RequestCard lang={lang} />
        </div>

      </section>

      <h4 className="dolm-doc-process-title">{data.processTitle}</h4>

      <section className="dolm-doc-card-grid" aria-label="So geht die Dolmetscher Bestellung">
        {data.process.map(([step, title, text, asset]) => (
          <article className="dolm-doc-card dolm-doc-card--process" key={step}>
            <DolmetscherAsset asset={asset} />
            <span>{step}.</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="dolm-doc-card-grid dolm-doc-card-grid--benefits" aria-label="Dolmetschen Vorteile">
        {data.benefits.map(([title, text, asset]) => (
          <article className="dolm-doc-card dolm-doc-card--benefit" key={title}>
            <DolmetscherAsset asset={asset} />
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function WirtschaftFinanzenSheet({ active, visualCopy, lang = 'de' }) {
  const data = lang === 'de' ? WIRTSCHAFT_FINANZEN_SHEET : (() => {
    const paragraphs = (active?.paragraphs || []).map(normalizeText).filter(Boolean);
    return {
      ...WIRTSCHAFT_FINANZEN_SHEET,
      kicker: normalizeText(active?.kicker || WIRTSCHAFT_FINANZEN_SHEET.kicker),
      title: normalizeText(active?.label || active?.title || WIRTSCHAFT_FINANZEN_SHEET.title),
      introTitle: normalizeText(active?.title || active?.label || WIRTSCHAFT_FINANZEN_SHEET.introTitle),
      intro: translateServiceSheetText(WIRTSCHAFT_FINANZEN_SHEET.intro, lang, paragraphs[0] || active?.text),
      features: localizeFeatures(active, WIRTSCHAFT_FINANZEN_SHEET.features, visualCopy, lang),
    };
  })();

  return (
    <div className="wirtschaft-doc-sheet" data-service-id={active.id}>
      <span className="wirtschaft-doc-kicker">{data.kicker}</span>
      <h3>{data.title}</h3>

      <section className="wirtschaft-doc-table" aria-label="Wirtschaft und Finanzen Übersicht">
        <div className="wirtschaft-doc-icon-cell">
          <WirtschaftAsset asset="wirtschaft.png" />
        </div>
        <div className="wirtschaft-doc-copy-cell">
          <h4>{data.introTitle}</h4>
          <p>{data.intro}</p>
          <RequestCard lang={lang} className="wirtschaft-request-card" />
        </div>
      </section>

      <section className="wirtschaft-doc-card-grid" aria-label="Wirtschaft und Finanzen Vorteile">
        {data.features.map(([title, text, asset]) => (
          <article className="wirtschaft-doc-card" key={title}>
            <WirtschaftAsset asset={asset} />
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function BeglaubigteUebersetzungSheet({ active, visualCopy, lang = 'de' }) {
  const data = lang === 'de' ? BEGLAUBIGTE_UEBERSETZUNG_SHEET : (() => {
    const paragraphs = (active?.paragraphs || []).map(normalizeText).filter(Boolean);
    const examples = (active?.examples || []).map(normalizeText).filter(Boolean);
    return {
      ...BEGLAUBIGTE_UEBERSETZUNG_SHEET,
      kicker: normalizeText(active?.kicker || BEGLAUBIGTE_UEBERSETZUNG_SHEET.kicker),
      title: normalizeText(active?.title || active?.label || BEGLAUBIGTE_UEBERSETZUNG_SHEET.title),
      introTitle: normalizeText(active?.title || active?.label || BEGLAUBIGTE_UEBERSETZUNG_SHEET.introTitle),
      intro: translateServiceSheetText(BEGLAUBIGTE_UEBERSETZUNG_SHEET.intro, lang, paragraphs[0] || active?.text),
      documentsTitle: translateServiceSheetText(BEGLAUBIGTE_UEBERSETZUNG_SHEET.documentsTitle, lang, paragraphs[1]),
      documentsLead: translateServiceSheetText(BEGLAUBIGTE_UEBERSETZUNG_SHEET.documentsLead, lang),
      documents: BEGLAUBIGTE_UEBERSETZUNG_SHEET.documents.map((item, index) => translateServiceSheetText(item, lang, examples[index] || paragraphs[index + 2])),
      languagesTitle: translateServiceSheetText(BEGLAUBIGTE_UEBERSETZUNG_SHEET.languagesTitle, lang, paragraphs[10]),
      languagesLead: translateServiceSheetText(BEGLAUBIGTE_UEBERSETZUNG_SHEET.languagesLead, lang),
      languages: BEGLAUBIGTE_UEBERSETZUNG_SHEET.languages.map((item, index) => translateServiceSheetText(item, lang, paragraphs[index + 11])),
      processTitle: translateServiceSheetText(BEGLAUBIGTE_UEBERSETZUNG_SHEET.processTitle, lang),
      process: BEGLAUBIGTE_UEBERSETZUNG_SHEET.process.map(([step, text, asset]) => [
        step,
        translateServiceSheetText(text, lang),
        asset,
      ]),
      benefits: localizeFeatures(active, BEGLAUBIGTE_UEBERSETZUNG_SHEET.benefits, visualCopy, lang),
    };
  })();

  return (
    <div className="beglaubigte-doc-sheet" data-service-id={active.id}>
      <span className="beglaubigte-doc-kicker">{data.kicker}</span>
      <h3>{data.title}</h3>

      <section className="beglaubigte-doc-table" aria-label="Beglaubigte Übersetzungen Übersicht">
        <div className="beglaubigte-doc-icon-cell beglaubigte-doc-icon-cell--intro">
          <BeglaubigteAsset asset="word-media/image1.png" />
        </div>
        <div className="beglaubigte-doc-copy-cell beglaubigte-doc-copy-cell--intro">
          <h4>{data.introTitle}</h4>
          <p>{data.intro}</p>
          <RequestCard lang={lang} className="beglaubigte-request-card" />
        </div>

        <div className="beglaubigte-doc-icon-cell beglaubigte-doc-icon-cell--documents">
          <BeglaubigteAsset asset="word-media/image3.png" />
        </div>
        <div className="beglaubigte-doc-copy-cell beglaubigte-doc-copy-cell--documents">
          <h4>{data.documentsTitle}</h4>
          <p>{data.documentsLead}</p>
          <ul>
            {data.documents.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div className="beglaubigte-doc-icon-cell beglaubigte-doc-icon-cell--languages">
          <BeglaubigteAsset asset="word-media/image4.png" />
        </div>
        <div className="beglaubigte-doc-copy-cell beglaubigte-doc-copy-cell--languages">
          <h4>{data.languagesTitle}</h4>
          <p>{data.languagesLead}</p>
          <ul>
            {data.languages.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <h4 className="beglaubigte-doc-process-title">{data.processTitle}</h4>
      <section className="beglaubigte-doc-process-grid" aria-label="Ablauf beglaubigte Übersetzung">
        {data.process.map(([step, text, asset]) => (
          <article className="beglaubigte-doc-process-card" key={step}>
            <BeglaubigteAsset asset={asset} />
            <strong>{step}</strong>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="beglaubigte-doc-card-grid" aria-label="Beglaubigte Übersetzung Vorteile">
        {data.benefits.map(([title, text, asset]) => (
          <article className="beglaubigte-doc-card" key={title}>
            <BeglaubigteAsset asset={asset} />
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function BeeidigteDolmetscherSheet({ active, visualCopy, lang = 'de' }) {
  const data = lang === 'de' ? BEEIDIGTE_DOLMETSCHER_SHEET : (() => {
    const paragraphs = (active?.paragraphs || []).map(normalizeText).filter(Boolean);
    const parts = splitSentences(paragraphs[0], 2);
    return {
      ...BEEIDIGTE_DOLMETSCHER_SHEET,
      kicker: normalizeText(active?.kicker || BEEIDIGTE_DOLMETSCHER_SHEET.kicker),
      title: normalizeText(active?.label || active?.title || BEEIDIGTE_DOLMETSCHER_SHEET.title),
      introRows: [
        {
          ...BEEIDIGTE_DOLMETSCHER_SHEET.introRows[0],
          text: translateServiceSheetText(BEEIDIGTE_DOLMETSCHER_SHEET.introRows[0].text, lang, parts[0] || paragraphs[0]),
        },
        {
          ...BEEIDIGTE_DOLMETSCHER_SHEET.introRows[1],
          paragraphs: BEEIDIGTE_DOLMETSCHER_SHEET.introRows[1].paragraphs.map((text, index) => translateServiceSheetText(text, lang, index === 0 ? (parts[1] || paragraphs[1]) : paragraphs[1])),
        },
      ],
      features: localizeFeatures(active, BEEIDIGTE_DOLMETSCHER_SHEET.features, visualCopy, lang),
    };
  })();

  return (
    <div className="beeidigt-doc-sheet" data-service-id={active.id}>
      <span className="beeidigt-doc-kicker">{data.kicker}</span>
      <h3>{data.title}</h3>

      <section className="beeidigt-doc-table" aria-label="Beeidigte Dolmetscher Übersicht">
        <div className="beeidigt-doc-icon-cell beeidigt-doc-icon-cell--top">
          <BeeidigteAsset asset={data.introRows[0].asset} />
        </div>
        <div className="beeidigt-doc-copy-cell">
          <p>{data.introRows[0].text}</p>
        </div>

        <div className="beeidigt-doc-icon-cell beeidigt-doc-icon-cell--wide">
          <BeeidigteAsset asset={data.introRows[1].asset} />
        </div>
        <div className="beeidigt-doc-copy-cell beeidigt-doc-copy-cell--wide">
          {data.introRows[1].paragraphs.map((text) => <p key={text}>{text}</p>)}
          <RequestCard lang={lang} className="beeidigt-request-card" />
        </div>
      </section>

      <section className="beeidigt-doc-card-grid" aria-label="Beeidigte Dolmetscher Vorteile">
        {data.features.map(([title, text, asset]) => (
          <article className="beeidigt-doc-card" key={title}>
            <BeeidigteAsset asset={asset} />
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function StandesamtDolmetscherSheet({ active, visualCopy, lang = 'de' }) {
  const data = lang === 'de' ? STANDESAMT_DOLMETSCHER_SHEET : (() => {
    const paragraphs = (active?.paragraphs || []).map(normalizeText).filter(Boolean);
    const parts = splitSentences(paragraphs[0], 3);
    return {
      ...STANDESAMT_DOLMETSCHER_SHEET,
      kicker: normalizeText(active?.kicker || STANDESAMT_DOLMETSCHER_SHEET.kicker),
      title: normalizeText(active?.label || active?.title || STANDESAMT_DOLMETSCHER_SHEET.title),
      introTitle: normalizeText(active?.title || active?.label || STANDESAMT_DOLMETSCHER_SHEET.introTitle),
      intro: translateServiceSheetText(STANDESAMT_DOLMETSCHER_SHEET.intro, lang, parts[0] || paragraphs[0]),
      details: STANDESAMT_DOLMETSCHER_SHEET.details.map((text, index) => translateServiceSheetText(text, lang, parts[index + 1] || paragraphs[index + 1])),
    };
  })();

  return (
    <div className="standesamt-doc-sheet" data-service-id={active.id}>
      <span className="standesamt-doc-kicker">{data.kicker}</span>
      <h3>{data.title}</h3>

      <section className="standesamt-doc-table" aria-label="Standesamt Dolmetscher Übersicht">
        <div className="standesamt-doc-icon-cell standesamt-doc-icon-cell--top">
          <StandesamtAsset asset="eheringe.png" />
        </div>
        <div className="standesamt-doc-copy-cell">
          <h4>{data.introTitle}</h4>
          <p>{data.intro}</p>
        </div>

        <div className="standesamt-doc-icon-cell standesamt-doc-icon-cell--wide">
          <StandesamtAsset asset="regierung.png" />
        </div>
        <div className="standesamt-doc-copy-cell standesamt-doc-copy-cell--wide">
          {data.details.map((text) => <p key={text}>{text}</p>)}
          <RequestCard lang={lang} className="standesamt-request-card" />
        </div>
      </section>
    </div>
  );
}

function InterpretingSheet({ active, rich, visualCopy, lang }) {
  const ActiveIcon = getServiceTheme(active).icon || Headphones;
  const richLabels = RICH_LABELS[lang] || RICH_LABELS.de;
  const paragraphs = (active?.paragraphs || []).map(normalizeText);
  const longParagraphs = getLongParagraphs(paragraphs);
  const details = getUsableShortItems(paragraphs, active, richLabels).slice(0, 6);
  const isOverview = active.id === 'dolmetschen-overview';
  const steps = [
    [visualCopy.request, visualCopy.requestText, Send],
    [visualCopy.review, visualCopy.reviewText, ClipboardList],
    [visualCopy.delivery, visualCopy.deliveryText, UsersRound],
  ];

  if (isOverview) {
    return <DolmetschenReferenceSheet active={active} visualCopy={visualCopy} lang={lang} />;
  }
  if (active.id === 'beeidigte-dolmetscher') {
    return <BeeidigteDolmetscherSheet active={active} visualCopy={visualCopy} lang={lang} />;
  }
  if (active.id === 'standesamt-dolmetscher') {
    return <StandesamtDolmetscherSheet active={active} visualCopy={visualCopy} lang={lang} />;
  }

  return (
    <div className="pdf-service-sheet pdf-service-sheet--interpreting" data-service-id={active.id}>
      <section className="pdf-interpreter-hero">
        <div className="pdf-main-column">
          <h3>{rich.title}</h3>
          {(isOverview ? longParagraphs.slice(0, 3) : [rich.intro, rich.competence, rich.ctaParagraph]).filter(Boolean).map((text, index) => {
            const Icon = [ActiveIcon, MapPin, Globe2][index] || BadgeCheck;
            const title = [rich.introTitle, richLabels.nationwide, richLabels.serviceProfile][index] || visualCopy.details;
            return (
              <div className="pdf-info-row" key={`${title}-${index}`}>
                <IconBubble icon={Icon} />
                <div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              </div>
            );
          })}
        </div>
        <figure className="pdf-interpreter-visual pdf-visual-placeholder" aria-hidden="true">
          <span />
        </figure>
      </section>

      <div className="pdf-benefit-strip">
        {[visualCopy.interpretingLanguages, visualCopy.trustA, richLabels.serviceProfile, visualCopy.trustC].map((item, index) => {
          const Icon = [Globe2, UsersRound, Landmark, Video][index] || BadgeCheck;
          return (
            <div className="pdf-benefit-item" key={item}>
              <Icon aria-hidden="true" />
              <strong>{item}</strong>
              <span>{details[index] || visualCopy.ctaSub}</span>
            </div>
          );
        })}
      </div>

      <section className="pdf-process-board">
        <h4>{visualCopy.process}</h4>
        <div className="pdf-process-grid">
          {steps.map(([title, text, Icon], index) => (
            <article className="pdf-process-card" key={title}>
              <b>{index + 1}</b>
              <Icon aria-hidden="true" />
              <h5>{title}</h5>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pdf-cta-card">
        <IconBubble icon={HelpIcon(active)} />
        <div>
          <h4>{rich.ctaText}</h4>
          <p>{rich.ctaParagraph}</p>
        </div>
        <a href={getOfferHref(lang)} className="pdf-blue-btn">
          {rich.ctaText} <ArrowRight aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}

function CertifiedTranslationSheet({ active, rich, visualCopy, lang }) {
  const richLabels = RICH_LABELS[lang] || RICH_LABELS.de;
  const paragraphs = (active?.paragraphs || []).map(normalizeText);
  const documents = paragraphs.slice(2, 9).filter(Boolean);
  const languagePairs = paragraphs.slice(11, 28).filter((item) => item && item.length < 60);
  const processText = paragraphs.slice(29, 33).filter(Boolean);
  const processSteps = processText.length ? processText : [
    visualCopy.requestText,
    visualCopy.reviewText,
    visualCopy.deliveryText,
  ];

  return (
    <div className="pdf-service-sheet pdf-service-sheet--translation" data-service-id={active.id}>
      <section className="pdf-top-grid">
        <div className="pdf-main-column">
          <h3>{rich.title}</h3>
          <div className="pdf-info-row">
            <IconBubble icon={FileText} />
            <div>
              <h4>{rich.introTitle}</h4>
              <p>{rich.intro}</p>
            </div>
          </div>
          <div className="pdf-info-row">
            <IconBubble icon={ShieldCheck} />
            <div>
              <h4>{rich.competenceTitle}</h4>
              <p>{rich.competence}</p>
            </div>
          </div>
        </div>
        <div className="pdf-side-stack">
          <article className="pdf-side-card">
            <IconBubble icon={ClipboardList} />
            <h4>{paragraphs[1] || visualCopy.typical}</h4>
            <ul>{documents.slice(0, 7).map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article className="pdf-side-card">
            <IconBubble icon={Globe2} />
            <h4>{richLabels.languagePairs}</h4>
            <ul>{(languagePairs.length ? languagePairs : richLabels.pairs).slice(0, 8).map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="pdf-certified-process">
        <h4>{visualCopy.process}</h4>
        <div className="pdf-certified-grid">
          {processSteps.slice(0, 6).map((item, index) => {
            const Icon = [FileText, Send, ClipboardList, Stamp, CheckCircle2, ShieldCheck][index] || BadgeCheck;
            return (
              <article className="pdf-certified-step" key={`${item}-${index}`}>
                <b>{index + 1}</b>
                <Icon aria-hidden="true" />
                <p>{item.replace(/^\d+\.\s*/, '')}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="pdf-cta-card">
        <IconBubble icon={Stamp} />
        <div>
          <h4>{rich.ctaText}</h4>
          <p>{getCtaParagraph(paragraphs, visualCopy)}</p>
        </div>
        <a href={getOfferHref(lang)} className="pdf-blue-btn">
          {rich.ctaText} <ArrowRight aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}

export default function Services() {
  const { lang } = useI18n();
  const navItems = useMemo(() => getServiceNavigation(lang), [lang]);
  const interpretingItems = navItems.filter((item) => item.group === 'interpreting');
  const translationItem = navItems.find((item) => item.group === 'translation');
  const specialtyItems = navItems.filter((item) => item.group === 'specialist');
  const ui = serviceUi[lang] || serviceUi.de;
  const side = SIDE_LABELS[lang] || SIDE_LABELS.de;
  const visualCopy = VISUAL_COPY[lang] || VISUAL_COPY.de;
  const specialtyOverview = useMemo(() => ({
    id: 'fachuebersetzung-overview',
    group: 'specialist',
    label: side.specialist,
    title: ui.title.replace(/\.$/, ''),
    kicker: ui.kicker,
    text: ui.sub,
    paragraphs: [
      ui.sub,
      visualCopy.ctaSub,
      ...specialtyItems.slice(0, 9).map((item) => item.label),
    ],
    examples: specialtyItems.slice(0, 6).map((item) => item.label),
    cta: visualCopy.request,
  }), [side.specialist, specialtyItems, ui.kicker, ui.sub, ui.title, visualCopy.ctaSub, visualCopy.request]);
  const [activeId, setActiveId] = useState(navItems[0]?.id);
  const sectionRef = useRef(null);
  const [drawerAvailable, setDrawerAvailable] = useState(false);
  const active = activeId === specialtyOverview.id ? specialtyOverview : navItems.find((item) => item.id === activeId) || navItems[0];
  const activeVisual = getVisualContent(active, visualCopy);
  const activeCta = normalizeText(active?.cta || visualCopy.request);
  const activeImage = getServiceImage(active);
  const activeTheme = getServiceTheme(active);
  const ActiveThemeIcon = activeTheme.icon;
  const richService = getRichServiceData(active, visualCopy, lang);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const steps = [
    [visualCopy.request, visualCopy.requestText, Send],
    [visualCopy.review, visualCopy.reviewText, ClipboardList],
    [visualCopy.delivery, visualCopy.deliveryText, CheckCircle2],
  ];

  useEffect(() => {
    setActiveId(navItems[0]?.id);
    setSidebarOpen(false);
  }, [lang, navItems]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof window === 'undefined') {
      setDrawerAvailable(false);
      return undefined;
    }

    let frame = 0;
    const updateAvailability = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        setDrawerAvailable(rect.top < viewportHeight - 72 && rect.bottom > 72);
      });
    };

    updateAvailability();
    window.addEventListener('scroll', updateAvailability, { passive: true });
    window.addEventListener('resize', updateAvailability);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateAvailability);
      window.removeEventListener('resize', updateAvailability);
    };
  }, []);

  return (
    <section className="services" id="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="specialties" id="fachuebersetzungen" ref={sectionRef}>
          <div className="section-head specialties-head">
            <h2 data-reveal="">{ui.title}</h2>
            <p data-reveal="" style={{ '--ri': 1 }}>
              {ui.sub}
            </p>
          </div>

          <button
            type="button"
            className={`specialty-drawer-toggle specialty-drawer-toggle--services${lang === 'ar' ? ' is-rtl' : ''}${drawerAvailable || sidebarOpen ? ' is-visible' : ''}`}
            onClick={() => setSidebarOpen(true)}
            aria-expanded={sidebarOpen}
            aria-controls="leistungen-point-menu"
            aria-label={side.specialist}
          >
            <span className="specialty-drawer-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>

          <div className="specialty-layout" data-reveal="" style={{ '--ri': 0 }}>
            <aside
              id="leistungen-point-menu"
              className={`specialty-sidebar${lang === 'ar' ? ' is-rtl' : ''}${sidebarOpen ? ' is-open' : ''}`}
              aria-label="Fachübersetzungen Navigation"
            >
              <button
                type="button"
                className="specialty-drawer-close"
                onClick={() => setSidebarOpen(false)}
                aria-label={side.close}
              >
                ×
              </button>
              <button
                type="button"
                className={`specialty-side-row specialty-side-row--strong${active?.id === interpretingItems[0]?.id ? ' active' : ''}`}
                onClick={() => {
                  setActiveId(interpretingItems[0]?.id);
                  setSidebarOpen(false);
                }}
                aria-pressed={active?.id === interpretingItems[0]?.id}
              >
                {side.interpreting} <span aria-hidden="true">›</span>
              </button>

              {interpretingItems.length > 1 && (
                <div className="specialty-side-subnav">
                  {interpretingItems.slice(1).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`specialty-side-row specialty-side-row--sub${item.id === 'standesamt-dolmetscher' ? ' specialty-side-row--strong' : ''}${active?.id === item.id ? ' active' : ''}`}
                      onClick={() => {
                        setActiveId(item.id);
                        setSidebarOpen(false);
                      }}
                      aria-pressed={active?.id === item.id}
                    >
                      {item.label} <span aria-hidden="true">›</span>
                    </button>
                  ))}
                </div>
              )}

              <button
                type="button"
                className={`specialty-side-row specialty-side-row--strong${active?.id === translationItem?.id ? ' active' : ''}`}
                onClick={() => {
                  setActiveId(translationItem?.id);
                  setSidebarOpen(false);
                }}
                aria-pressed={active?.id === translationItem?.id}
              >
                {side.translation} <span aria-hidden="true">›</span>
              </button>

              <button
                type="button"
                className={`specialty-side-row specialty-side-row--active specialty-side-row--strong${active?.id === specialtyOverview.id ? ' active' : ''}`}
                onClick={() => {
                  setActiveId(specialtyOverview.id);
                  setSidebarOpen(false);
                }}
                aria-pressed={active?.id === specialtyOverview.id}
              >
                {side.specialist} <span aria-hidden="true">›</span>
              </button>

              <div className="specialty-side-subnav">
                {specialtyItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`specialty-side-row specialty-side-row--sub${active?.id === item.id ? ' active' : ''}`}
                    onClick={() => {
                      setActiveId(item.id);
                      setSidebarOpen(false);
                    }}
                    aria-pressed={active?.id === item.id}
                  >
                    {item.label} <span aria-hidden="true">›</span>
                  </button>
                ))}
              </div>

              <a href="/#faq" className="specialty-side-row specialty-side-row--strong">
                {side.faq} <span aria-hidden="true">›</span>
              </a>
            </aside>
            <button
              type="button"
              className={`specialty-drawer-backdrop${sidebarOpen ? ' is-open' : ''}`}
              onClick={() => setSidebarOpen(false)}
              aria-label={side.close}
            />

            <article
              className={`service-visual-panel${richService ? ' service-visual-panel--rich' : ''}`}
              data-active-service={active?.id}
              aria-live="polite"
            >
              {richService ? (
                <RichServicePanel active={active} visualCopy={visualCopy} lang={lang} />
              ) : (
              <>
                <div className="service-visual-hero">
                <div className="service-visual-copy">
                  <span className="service-visual-kicker">{normalizeText(active?.kicker || visualCopy.overview)}</span>
                  <h3>{normalizeText(active?.title)}</h3>
                  <p>{activeVisual.lead}</p>
                </div>
                <figure className={`service-visual-art service-visual-art--${activeTheme.tone}`} aria-hidden="true">
                  <div className="service-topic-card">
                    <div className="service-topic-mark">
                      <ActiveThemeIcon />
                    </div>
                    <span>{normalizeText(active?.label || active?.kicker || visualCopy.overview)}</span>
                    <strong>{normalizeText(active?.title)}</strong>
                    <p>{activeVisual.examples[0] || activeVisual.highlights[0]}</p>
                    <div className="service-topic-metrics">
                      {activeVisual.highlights.map((item) => (
                        <small key={item}>{item}</small>
                      ))}
                    </div>
                  </div>
                  <div className="service-visual-illustration">
                    <img src={activeImage} alt="" loading="lazy" decoding="async" />
                  </div>
                </figure>
              </div>

              <div className="service-info-grid">
                <section className="service-info-card service-info-card--list">
                  <span className="service-info-label">{visualCopy.typical}</span>
                  <ul>
                    {activeVisual.examples.map((item, index) => {
                      const Icon = FEATURE_ICONS[index] || CheckCircle2;
                      return (
                        <li key={item}>
                          <span className="service-info-icon" aria-hidden="true">
                            <Icon />
                          </span>
                          <span>{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </section>

                <section className="service-info-card">
                  <span className="service-info-label">{visualCopy.details}</span>
                  <div className="service-detail-list">
                    {(activeVisual.detailParagraphs.length ? activeVisual.detailParagraphs : [visualCopy.ctaSub]).map((paragraph, index) => {
                      const Icon = DETAIL_ICONS[index] || FileText;
                      return (
                        <div className="service-detail-item" key={paragraph}>
                          <Icon aria-hidden="true" />
                          <p>{paragraph}</p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              <section className="service-process-card">
                <span className="service-info-label">{visualCopy.process}</span>
                <div className="service-process-steps">
                  {steps.map(([title, text, Icon], index) => (
                    <div className="service-process-step" key={title}>
                      <div className="service-process-body">
                        <b>{String(index + 1).padStart(2, '0')}</b>
                        <Icon aria-hidden="true" />
                        <strong>{title}</strong>
                        <p>{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="service-visual-cta">
                <div>
                  <strong>{activeCta}</strong>
                  <span>{visualCopy.ctaSub}</span>
                </div>
                <a href={getOfferHref(lang)} className="service-green-btn">
                  {activeCta} <ArrowRight aria-hidden="true" />
                </a>
              </div>
              </>
              )}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
