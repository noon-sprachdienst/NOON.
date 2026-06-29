import { useState } from 'react';
import { Clock3, Globe2, Mail, MapPin, Phone, Send, ShieldCheck, UsersRound } from 'lucide-react';
import { CONTACT } from '../config/contact.js';
import { useI18n } from '../hooks/useI18n.jsx';

const MAX_FILES = 6;
const MAX_TOTAL_FILE_BYTES = 3 * 1024 * 1024;

const COPY = {
  de: {
    sideTitle: 'Arbeiten Sie mit uns.',
    sideText: 'Werden Sie Teil unseres Netzwerks und unterstützen Sie uns als Dolmetscher, Übersetzer oder Sprachmittler.',
    benefits: [
      ['Fachliche Zusammenarbeit', 'Wir arbeiten nur mit qualifizierten Fachkräften zusammen.'],
      ['Internationale Aufträge', 'Projekte in über 190 Sprachen weltweit.'],
      ['Vertraulich & sicher', 'Ihre Daten werden vertraulich behandelt.'],
    ],
    hours: 'Mo – Sa · 24/7 telefonisch erreichbar',
    formTitle: 'Bewerbung einreichen.',
    formSub: 'Füllen Sie das Formular aus und wir prüfen Ihre Bewerbung schnellstmöglich.',
    firstName: 'Vorname',
    lastName: 'Nachname',
    email: 'E-Mail-Adresse',
    phone: 'Telefonnummer',
    languages: 'Sprache(n), die Sie anbieten',
    choose: 'Bitte auswählen',
    multi: 'Mehrfachauswahl möglich',
    message: 'Kurze Nachricht',
    upload: 'Lebenslauf hochladen',
    uploadHint: 'PDF, Word oder Bilder | bis zu 6 Dateien | insgesamt max. 3 MB',
    submit: 'Bewerbung senden',
    sending: 'Bewerbung wird gesendet ...',
    sent: 'Bewerbung gesendet. Wir melden uns schnellstmöglich.',
    sendError: 'Senden fehlgeschlagen. Bitte versuchen Sie es erneut.',
    languageError: 'Bitte wählen Sie mindestens eine Sprache aus.',
    countError: 'Bitte wählen Sie höchstens 6 Dateien aus.',
    sizeError: 'Die ausgewählten Dateien sind größer als 3 MB.',
    privacy: 'Ihre Daten werden vertraulich behandelt und ausschließlich zur Bearbeitung Ihrer Bewerbung verwendet.',
    messagePrefix: 'Kurze Nachricht:',
    offeredLanguages: 'Sprache(n):',
    service: 'Bewerbung',
    firstPlaceholder: 'z. B. Maria',
    lastPlaceholder: 'z. B. Schmidt',
    emailPlaceholder: 'z. B. maria.schmidt@email.de',
    phonePlaceholder: 'z. B. +49 160 12345678',
    messagePlaceholder: 'z. B. Ich bin beeidigter Dolmetscher für Arabisch und Deutsch und verfüge über Erfahrung bei Gerichten, Behörden und medizinischen Einrichtungen.',
    languageOptions: ['Arabisch', 'Deutsch', 'Englisch', 'Türkisch', 'Russisch', 'Ukrainisch', 'Französisch', 'Persisch', 'Kurdisch', 'Polnisch', 'Tigrinya', 'Andere Sprache'],
  },
  en: {
    sideTitle: 'Work with us.',
    sideText: 'Become part of our network and support us as an interpreter, translator or language mediator.',
    benefits: [
      ['Professional cooperation', 'We work only with qualified language professionals.'],
      ['International assignments', 'Projects in more than 190 languages worldwide.'],
      ['Confidential & secure', 'Your data will be handled confidentially.'],
    ],
    hours: 'Mon – Sat · reachable by phone 24/7',
    formTitle: 'Submit your application.',
    formSub: 'Complete the form and we will review your application as quickly as possible.',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'E-mail address',
    phone: 'Phone number',
    languages: 'Language(s) you offer',
    choose: 'Please select',
    multi: 'Multiple selection possible',
    message: 'Short message',
    upload: 'Upload CV',
    uploadHint: 'PDF, Word or images | up to 6 files | 3 MB total',
    submit: 'Send application',
    sending: 'Sending application ...',
    sent: 'Application sent. We will contact you as soon as possible.',
    sendError: 'Could not send. Please try again.',
    languageError: 'Please select at least one language.',
    countError: 'Please select no more than 6 files.',
    sizeError: 'The selected files exceed the 3 MB limit.',
    privacy: 'Your data will be treated confidentially and used only to process your application.',
    messagePrefix: 'Short message:',
    offeredLanguages: 'Language(s):',
    service: 'Application',
    firstPlaceholder: 'e.g. Maria',
    lastPlaceholder: 'e.g. Schmidt',
    emailPlaceholder: 'e.g. maria.schmidt@email.com',
    phonePlaceholder: 'e.g. +49 160 12345678',
    messagePlaceholder: 'e.g. I am a sworn interpreter for Arabic and German and have experience with courts, authorities and medical institutions.',
    languageOptions: ['Arabic', 'German', 'English', 'Turkish', 'Russian', 'Ukrainian', 'French', 'Persian', 'Kurdish', 'Polish', 'Tigrinya', 'Other language'],
  },
  ar: {
    sideTitle: 'اعملوا معنا.',
    sideText: 'انضموا إلى شبكتنا وادعمونا كمترجمين فوريين أو مترجمين تحريريين أو وسطاء لغويين.',
    benefits: [
      ['تعاون مهني', 'نعمل فقط مع متخصصين مؤهلين في اللغات.'],
      ['مهام دولية', 'مشاريع بأكثر من 190 لغة حول العالم.'],
      ['سرية وأمان', 'يتم التعامل مع بياناتكم بسرية.'],
    ],
    hours: 'الاثنين – السبت · متاحون هاتفيا 24/7',
    formTitle: 'إرسال طلب العمل.',
    formSub: 'املأوا النموذج وسنراجع طلبكم في أسرع وقت ممكن.',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    languages: 'اللغة أو اللغات التي تقدمونها',
    choose: 'يرجى الاختيار',
    multi: 'يمكن اختيار أكثر من لغة',
    message: 'رسالة قصيرة',
    upload: 'تحميل السيرة الذاتية',
    uploadHint: 'PDF أو Word أو صور | حتى 6 ملفات | 3 ميغابايت إجمالا',
    submit: 'إرسال الطلب',
    sending: 'جار إرسال الطلب ...',
    sent: 'تم إرسال الطلب. سنتواصل معكم في أقرب وقت ممكن.',
    sendError: 'تعذر الإرسال. يرجى المحاولة مرة أخرى.',
    languageError: 'يرجى اختيار لغة واحدة على الأقل.',
    countError: 'يرجى اختيار 6 ملفات كحد أقصى.',
    sizeError: 'حجم الملفات المختارة يتجاوز 3 ميغابايت.',
    privacy: 'سيتم التعامل مع بياناتكم بسرية واستخدامها فقط لمعالجة طلبكم.',
    messagePrefix: 'رسالة قصيرة:',
    offeredLanguages: 'اللغة أو اللغات:',
    service: 'طلب عمل',
    firstPlaceholder: 'مثلا: ماريا',
    lastPlaceholder: 'مثلا: شميدت',
    emailPlaceholder: 'مثلا: maria.schmidt@email.com',
    phonePlaceholder: 'مثلا: +49 160 12345678',
    messagePlaceholder: 'مثلا: أنا مترجم محلف للعربية والألمانية ولدي خبرة مع المحاكم والجهات الحكومية والمؤسسات الطبية.',
    languageOptions: ['العربية', 'الألمانية', 'الإنجليزية', 'التركية', 'الروسية', 'الأوكرانية', 'الفرنسية', 'الفارسية', 'الكردية', 'البولندية', 'التغرينية', 'لغة أخرى'],
  },
  tr: {
    sideTitle: 'Bizimle çalışın.',
    sideText: 'Ağımızın bir parçası olun ve tercüman, çevirmen veya dil aracısı olarak bize destek verin.',
    benefits: [
      ['Profesyonel iş birliği', 'Yalnızca nitelikli uzmanlarla çalışıyoruz.'],
      ['Uluslararası işler', 'Dünya çapında 190’dan fazla dilde projeler.'],
      ['Gizli ve güvenli', 'Verileriniz gizli şekilde işlenir.'],
    ],
    hours: 'Pzt – Cmt · telefonla 24/7 ulaşılabilir',
    formTitle: 'Başvurunuzu gönderin.',
    formSub: 'Formu doldurun, başvurunuzu en kısa sürede inceleyelim.',
    firstName: 'Ad',
    lastName: 'Soyad',
    email: 'E-posta adresi',
    phone: 'Telefon numarası',
    languages: 'Sunduğunuz dil(ler)',
    choose: 'Lütfen seçin',
    multi: 'Birden fazla seçim yapılabilir',
    message: 'Kısa mesaj',
    upload: 'CV yükle',
    uploadHint: 'PDF, Word veya görseller | en fazla 6 dosya | toplam 3 MB',
    submit: 'Başvuruyu gönder',
    sending: 'Başvuru gönderiliyor ...',
    sent: 'Başvuru gönderildi. En kısa sürede sizinle iletişime geçeceğiz.',
    sendError: 'Gönderilemedi. Lütfen tekrar deneyin.',
    languageError: 'Lütfen en az bir dil seçin.',
    countError: 'Lütfen en fazla 6 dosya seçin.',
    sizeError: 'Seçilen dosyalar 3 MB sınırını aşıyor.',
    privacy: 'Verileriniz gizli tutulur ve yalnızca başvurunuzun işlenmesi için kullanılır.',
    messagePrefix: 'Kısa mesaj:',
    offeredLanguages: 'Dil(ler):',
    service: 'Başvuru',
    firstPlaceholder: 'örn. Maria',
    lastPlaceholder: 'örn. Schmidt',
    emailPlaceholder: 'örn. maria.schmidt@email.com',
    phonePlaceholder: 'örn. +49 160 12345678',
    messagePlaceholder: 'örn. Arapça ve Almanca için yeminli tercümanım; mahkemeler, resmi kurumlar ve tıbbi kurumlarda deneyimim var.',
    languageOptions: ['Arapça', 'Almanca', 'İngilizce', 'Türkçe', 'Rusça', 'Ukraynaca', 'Fransızca', 'Farsça', 'Kürtçe', 'Lehçe', 'Tigrinya', 'Diğer dil'],
  },
  ru: {
    sideTitle: 'Работайте с нами.',
    sideText: 'Станьте частью нашей сети и поддержите нас как устный переводчик, письменный переводчик или языковой посредник.',
    benefits: [
      ['Профессиональное сотрудничество', 'Мы работаем только с квалифицированными специалистами.'],
      ['Международные заказы', 'Проекты более чем на 190 языках по всему миру.'],
      ['Конфиденциально и безопасно', 'Ваши данные обрабатываются конфиденциально.'],
    ],
    hours: 'Пн – Сб · по телефону 24/7',
    formTitle: 'Отправить заявку.',
    formSub: 'Заполните форму, и мы рассмотрим вашу заявку как можно скорее.',
    firstName: 'Имя',
    lastName: 'Фамилия',
    email: 'E-mail',
    phone: 'Телефон',
    languages: 'Язык(и), которые вы предлагаете',
    choose: 'Пожалуйста, выберите',
    multi: 'Можно выбрать несколько вариантов',
    message: 'Короткое сообщение',
    upload: 'Загрузить резюме',
    uploadHint: 'PDF, Word или изображения | до 6 файлов | всего 3 МБ',
    submit: 'Отправить заявку',
    sending: 'Заявка отправляется ...',
    sent: 'Заявка отправлена. Мы свяжемся с вами как можно скорее.',
    sendError: 'Не удалось отправить. Попробуйте еще раз.',
    languageError: 'Выберите хотя бы один язык.',
    countError: 'Выберите не более 6 файлов.',
    sizeError: 'Выбранные файлы превышают лимит 3 МБ.',
    privacy: 'Ваши данные будут обрабатываться конфиденциально и использоваться только для обработки заявки.',
    messagePrefix: 'Короткое сообщение:',
    offeredLanguages: 'Язык(и):',
    service: 'Заявка',
    firstPlaceholder: 'например, Мария',
    lastPlaceholder: 'например, Шмидт',
    emailPlaceholder: 'например, maria.schmidt@email.com',
    phonePlaceholder: 'например, +49 160 12345678',
    messagePlaceholder: 'например, я присяжный переводчик арабского и немецкого языков с опытом работы в судах, ведомствах и медицинских учреждениях.',
    languageOptions: ['Арабский', 'Немецкий', 'Английский', 'Турецкий', 'Русский', 'Украинский', 'Французский', 'Персидский', 'Курдский', 'Польский', 'Тигринья', 'Другой язык'],
  },
  fr: {
    sideTitle: 'Travaillez avec nous.',
    sideText: 'Rejoignez notre réseau et accompagnez-nous comme interprète, traducteur ou médiateur linguistique.',
    benefits: [
      ['Collaboration professionnelle', 'Nous travaillons uniquement avec des spécialistes qualifiés.'],
      ['Missions internationales', 'Projets dans plus de 190 langues dans le monde.'],
      ['Confidentiel et sécurisé', 'Vos données sont traitées de manière confidentielle.'],
    ],
    hours: 'Lun – Sam · joignables par téléphone 24/7',
    formTitle: 'Envoyer une candidature.',
    formSub: 'Remplissez le formulaire et nous examinerons votre candidature rapidement.',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Adresse e-mail',
    phone: 'Numéro de téléphone',
    languages: 'Langue(s) proposées',
    choose: 'Veuillez sélectionner',
    multi: 'Sélection multiple possible',
    message: 'Message court',
    upload: 'Télécharger le CV',
    uploadHint: 'PDF, Word ou images | jusqu’à 6 fichiers | 3 Mo au total',
    submit: 'Envoyer la candidature',
    sending: 'Envoi de la candidature ...',
    sent: 'Candidature envoyée. Nous vous contacterons dès que possible.',
    sendError: 'Envoi impossible. Veuillez réessayer.',
    languageError: 'Veuillez sélectionner au moins une langue.',
    countError: 'Veuillez sélectionner au maximum 6 fichiers.',
    sizeError: 'Les fichiers sélectionnés dépassent la limite de 3 Mo.',
    privacy: 'Vos données sont traitées confidentiellement et utilisées uniquement pour votre candidature.',
    messagePrefix: 'Message court:',
    offeredLanguages: 'Langue(s):',
    service: 'Candidature',
    firstPlaceholder: 'p. ex. Maria',
    lastPlaceholder: 'p. ex. Schmidt',
    emailPlaceholder: 'p. ex. maria.schmidt@email.com',
    phonePlaceholder: 'p. ex. +49 160 12345678',
    messagePlaceholder: 'p. ex. Je suis interprète assermenté pour l’arabe et l’allemand et j’ai de l’expérience auprès des tribunaux, administrations et établissements médicaux.',
    languageOptions: ['Arabe', 'Allemand', 'Anglais', 'Turc', 'Russe', 'Ukrainien', 'Français', 'Persan', 'Kurde', 'Polonais', 'Tigrinya', 'Autre langue'],
  },
  uk: {
    sideTitle: 'Працюйте з нами.',
    sideText: 'Станьте частиною нашої мережі та підтримуйте нас як усний перекладач, письмовий перекладач або мовний посередник.',
    benefits: [
      ['Професійна співпраця', 'Ми працюємо лише з кваліфікованими фахівцями.'],
      ['Міжнародні замовлення', 'Проєкти більш ніж 190 мовами по всьому світу.'],
      ['Конфіденційно та безпечно', 'Ваші дані обробляються конфіденційно.'],
    ],
    hours: 'Пн – Сб · телефоном 24/7',
    formTitle: 'Надіслати заявку.',
    formSub: 'Заповніть форму, і ми розглянемо вашу заявку якомога швидше.',
    firstName: 'Ім’я',
    lastName: 'Прізвище',
    email: 'E-mail',
    phone: 'Телефон',
    languages: 'Мова або мови, які ви пропонуєте',
    choose: 'Будь ласка, виберіть',
    multi: 'Можна вибрати кілька варіантів',
    message: 'Коротке повідомлення',
    upload: 'Завантажити резюме',
    uploadHint: 'PDF, Word або зображення | до 6 файлів | загалом 3 МБ',
    submit: 'Надіслати заявку',
    sending: 'Заявка надсилається ...',
    sent: 'Заявку надіслано. Ми зв’яжемося з вами якнайшвидше.',
    sendError: 'Не вдалося надіслати. Спробуйте ще раз.',
    languageError: 'Виберіть принаймні одну мову.',
    countError: 'Виберіть не більше 6 файлів.',
    sizeError: 'Вибрані файли перевищують ліміт 3 МБ.',
    privacy: 'Ваші дані обробляються конфіденційно та використовуються лише для розгляду заявки.',
    messagePrefix: 'Коротке повідомлення:',
    offeredLanguages: 'Мова/мови:',
    service: 'Заявка',
    firstPlaceholder: 'наприклад, Марія',
    lastPlaceholder: 'наприклад, Шмідт',
    emailPlaceholder: 'наприклад, maria.schmidt@email.com',
    phonePlaceholder: 'наприклад, +49 160 12345678',
    messagePlaceholder: 'наприклад, я присяжний перекладач арабської та німецької мов і маю досвід у судах, органах влади та медичних установах.',
    languageOptions: ['Арабська', 'Німецька', 'Англійська', 'Турецька', 'Російська', 'Українська', 'Французька', 'Перська', 'Курдська', 'Польська', 'Тигринья', 'Інша мова'],
  },
};

const BENEFIT_ICONS = [UsersRound, Globe2, ShieldCheck];
const initialStatus = { type: 'idle', message: '' };
const SUBMIT_ERROR_MESSAGES = {
  de: {
    apiMissing: 'Der Versand ist gerade nicht erreichbar. Bitte versuchen Sie es erneut oder senden Sie Ihre Bewerbung direkt per E-Mail an info@noon-sprachdienst.de.',
    tooLarge: 'Die ausgewählten Dateien sind größer als 3 MB. Bitte senden Sie größere Anhänge direkt per E-Mail.',
    unsupported: 'Eine Datei wird nicht unterstützt. Bitte verwenden Sie PDF, Word oder Bilder.',
    unavailable: 'Der E-Mail-Versand ist aktuell nicht verfügbar. Bitte SMTP-Umgebungsvariablen prüfen.',
  },
  en: {
    apiMissing: 'Sending is currently unavailable. Please try again or send your application directly by email to info@noon-sprachdienst.de.',
    tooLarge: 'The selected files exceed 3 MB. Please send larger attachments directly by email.',
    unsupported: 'One file type is not supported. Please use PDF, Word or images.',
    unavailable: 'Email delivery is not available right now. Please check the SMTP environment variables.',
  },
  ar: {
    apiMissing: 'الإرسال غير متاح حاليا. يرجى المحاولة مرة أخرى أو إرسال طلبكم مباشرة عبر البريد الإلكتروني info@noon-sprachdienst.de.',
    tooLarge: 'الملفات المختارة أكبر من 3 ميغابايت. يرجى إرسال المرفقات الأكبر مباشرة عبر البريد الإلكتروني.',
    unsupported: 'نوع أحد الملفات غير مدعوم. يرجى استخدام PDF أو Word أو الصور.',
    unavailable: 'إرسال البريد غير متاح حاليا. يرجى التحقق من إعدادات SMTP في Vercel.',
  },
  tr: {
    apiMissing: 'Gönderim şu anda kullanılamıyor. Lütfen tekrar deneyin veya başvurunuzu doğrudan info@noon-sprachdienst.de adresine e-posta ile gönderin.',
    tooLarge: 'Seçilen dosyalar 3 MB sınırını aşıyor. Daha büyük ekleri doğrudan e-posta ile gönderin.',
    unsupported: 'Bir dosya türü desteklenmiyor. Lütfen PDF, Word veya görsel kullanın.',
    unavailable: 'E-posta gönderimi şu anda kullanılamıyor. Lütfen SMTP ortam değişkenlerini kontrol edin.',
  },
  ru: {
    apiMissing: 'Отправка сейчас недоступна. Попробуйте еще раз или отправьте заявку напрямую по e-mail info@noon-sprachdienst.de.',
    tooLarge: 'Выбранные файлы превышают 3 МБ. Более крупные вложения отправьте напрямую по e-mail.',
    unsupported: 'Один тип файла не поддерживается. Используйте PDF, Word или изображения.',
    unavailable: 'Отправка e-mail сейчас недоступна. Проверьте SMTP-переменные окружения.',
  },
  fr: {
    apiMissing: 'L’envoi est actuellement indisponible. Veuillez réessayer ou envoyer votre candidature directement par e-mail à info@noon-sprachdienst.de.',
    tooLarge: 'Les fichiers sélectionnés dépassent 3 Mo. Envoyez les pièces plus volumineuses directement par e-mail.',
    unsupported: 'Un type de fichier n’est pas pris en charge. Utilisez PDF, Word ou images.',
    unavailable: 'L’envoi d’e-mail est actuellement indisponible. Vérifiez les variables SMTP.',
  },
  uk: {
    apiMissing: 'Надсилання зараз недоступне. Спробуйте ще раз або надішліть заявку напряму на e-mail info@noon-sprachdienst.de.',
    tooLarge: 'Вибрані файли перевищують 3 МБ. Більші вкладення надішліть напряму електронною поштою.',
    unsupported: 'Один тип файлу не підтримується. Використовуйте PDF, Word або зображення.',
    unavailable: 'Надсилання e-mail зараз недоступне. Перевірте SMTP-змінні середовища.',
  },
};

async function getSubmitErrorMessage(response, lang, fallback) {
  const messages = SUBMIT_ERROR_MESSAGES[lang] || SUBMIT_ERROR_MESSAGES.de;
  const contentType = response.headers.get('content-type') || '';

  if (response.status === 404 || !contentType.includes('application/json')) return messages.apiMissing;

  let error = '';
  try {
    const body = await response.json();
    error = String(body?.error || '');
  } catch {
    return fallback;
  }

  if (response.status === 413 || error.includes('too large')) return messages.tooLarge;
  if (error.includes('Unsupported attachment') || error.includes('Too many attachments')) return messages.unsupported;
  if (response.status === 503 || error.includes('delivery unavailable')) return messages.unavailable;
  return error || fallback;
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Application() {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.de;
  const [status, setStatus] = useState(initialStatus);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [startedAt] = useState(() => Date.now());

  const getUploadError = (files) => {
    if (files.length > MAX_FILES) return copy.countError;
    const totalBytes = files.reduce((total, file) => total + file.size, 0);
    if (totalBytes > MAX_TOTAL_FILE_BYTES) return copy.sizeError;
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status.type === 'sending') return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const files = data.getAll('files').filter((file) => file?.size);
    const uploadError = getUploadError(files);

    if (!selectedLanguages.length) {
      setStatus({ type: 'error', message: copy.languageError });
      return;
    }

    if (uploadError) {
      setStatus({ type: 'error', message: uploadError });
      return;
    }

    setStatus({ type: 'sending', message: copy.sending });

    try {
      const offeredLanguages = data.getAll('languages').join(', ') || '-';
      const payload = {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        phone: data.get('phone'),
        sourceLanguage: offeredLanguages,
        targetLanguage: '-',
        service: copy.service,
        language: lang,
        startedAt,
        website: data.get('website'),
        message: [
          `${copy.offeredLanguages} ${offeredLanguages}`,
          '',
          copy.messagePrefix,
          data.get('message') || '-',
        ].join('\n'),
        files: await Promise.all(files.map(async (file) => ({
          name: file.name,
          type: file.type,
          content: await readFileAsBase64(file),
        }))),
      };

      const response = await fetch('/api/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const message = await getSubmitErrorMessage(response, lang, copy.sendError);
        setStatus({ type: 'error', message });
        return;
      }
      form.reset();
      setSelectedLanguages([]);
      setLanguageOpen(false);
      setStatus({ type: 'success', message: copy.sent });
    } catch (error) {
      setStatus({ type: 'error', message: error?.message || copy.sendError });
    }
  };

  return (
    <section className="application-page" aria-labelledby="application-heading">
      <div className="application-shell">
        <aside className="application-side-card">
          <h1>{copy.sideTitle}</h1>
          <p className="application-side-copy">{copy.sideText}</p>

          <div className="application-benefits">
            {copy.benefits.map(([title, text], index) => {
              const Icon = BENEFIT_ICONS[index];
              return (
                <div className="application-benefit" key={title}>
                  <div className="application-benefit-icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.9} />
                  </div>
                  <div>
                    <h2>{title}</h2>
                    <p>{text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="application-contact-box">
            <a href={CONTACT.phones[0].href}>
              <Phone size={18} strokeWidth={1.8} />
              <span>{CONTACT.phones[0].label}</span>
            </a>
            <a href={`mailto:${CONTACT.email}`}>
              <Mail size={18} strokeWidth={1.8} />
              <span>{CONTACT.email}</span>
            </a>
            <div>
              <MapPin size={18} strokeWidth={1.8} />
              <span>Paul-Oeser-Straße 1 · Osnabrück</span>
            </div>
            <div>
              <Clock3 size={18} strokeWidth={1.8} />
              <span>{copy.hours}</span>
            </div>
          </div>
        </aside>

        <form className="application-form-card" onSubmit={handleSubmit}>
          <div className="application-form-head">
            <h2 id="application-heading">{copy.formTitle}</h2>
            <p>{copy.formSub}</p>
          </div>

          <div className="application-form-grid">
            <div className="application-field">
              <label htmlFor="app-first">{copy.firstName}</label>
              <input id="app-first" name="firstName" type="text" placeholder={copy.firstPlaceholder} required autoComplete="given-name" />
            </div>
            <div className="application-field">
              <label htmlFor="app-last">{copy.lastName}</label>
              <input id="app-last" name="lastName" type="text" placeholder={copy.lastPlaceholder} required autoComplete="family-name" />
            </div>
            <div className="application-field">
              <label htmlFor="app-email">{copy.email}</label>
              <input id="app-email" name="email" type="email" placeholder={copy.emailPlaceholder} required autoComplete="email" />
            </div>
            <div className="application-field">
              <label htmlFor="app-phone">{copy.phone}</label>
              <input id="app-phone" name="phone" type="tel" placeholder={copy.phonePlaceholder} autoComplete="tel" />
            </div>
          </div>

          <div className="application-field">
            <label htmlFor="app-languages">{copy.languages}</label>
            <div className={`application-language-picker${languageOpen ? ' open' : ''}`}>
              <button
                id="app-languages"
                className="application-language-trigger"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={languageOpen}
                onClick={() => setLanguageOpen((value) => !value)}
              >
                <span>{selectedLanguages.length ? selectedLanguages.join(', ') : copy.choose}</span>
                <span aria-hidden="true">⌄</span>
              </button>
              {languageOpen && (
                <div className="application-language-menu" role="listbox" aria-multiselectable="true">
                  {copy.languageOptions.map((language) => {
                    const checked = selectedLanguages.includes(language);
                    return (
                      <label key={language} className="application-language-option">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            setSelectedLanguages((current) => (
                              current.includes(language)
                                ? current.filter((item) => item !== language)
                                : [...current, language]
                            ));
                          }}
                        />
                        <span>{language}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
            {selectedLanguages.map((language) => (
              <input key={language} type="hidden" name="languages" value={language} />
            ))}
            {!selectedLanguages.length && <input type="hidden" name="languages" value="" />}
            <p className="application-hint">{copy.multi}</p>
          </div>

          <div className="application-field">
            <label htmlFor="app-message">{copy.message}</label>
            <textarea id="app-message" name="message" placeholder={copy.messagePlaceholder} />
          </div>

          <div className="application-field">
            <label htmlFor="app-files">{copy.upload}</label>
            <input
              id="app-files"
              name="files"
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.heic,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png,image/webp,image/heic"
              multiple
              onChange={(event) => {
                const message = getUploadError([...event.currentTarget.files]);
                setStatus(message ? { type: 'error', message } : initialStatus);
              }}
            />
            <p className="application-hint">{copy.uploadHint}</p>
          </div>

          <input className="form-honeypot" type="text" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" />

          {status.type !== 'idle' && (
            <p className={`application-feedback application-feedback--${status.type === 'success' ? 'success' : 'error'}`} role={status.type === 'error' ? 'alert' : 'status'}>
              {status.message}
            </p>
          )}

          <button className="application-submit" type="submit" disabled={status.type === 'sending'}>
            <Send size={20} strokeWidth={2} />
            <span>{status.type === 'sending' ? copy.sending : copy.submit}</span>
            <span aria-hidden="true">→</span>
          </button>

          <p className="application-privacy">
            <ShieldCheck size={15} strokeWidth={2} aria-hidden="true" />
            <span>{copy.privacy}</span>
          </p>
        </form>
      </div>
    </section>
  );
}
