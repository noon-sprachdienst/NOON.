import { useI18n } from '../hooks/useI18n';

const TESTIMONIALS_BY_LANG = {
  de: [
    { initials: 'AK', name: 'Ahmad K.',    role: 'Osnabrück',  stars: 5, google: true, text: 'Heiratsurkunde aus Syrien in 24 Stunden fertig übersetzt — alles für das Standesamt perfekt. Absolut empfehlenswert!' },
    { initials: 'FY', name: 'Fatma Y.',    role: 'Stuttgart',  stars: 5, google: true, text: 'Türkische Führerschein-Übersetzung innerhalb eines Tages. Sehr professionell, der Stempel wurde von der Behörde sofort akzeptiert.' },
    { initials: 'MI', name: 'Maria I.',    role: 'Berlin',     stars: 5, google: true, text: 'Dolmetscher beim Ausländeramt war super vorbereitet und ruhig. Wir haben alles verstanden. Danke!' },
    { initials: 'RN', name: 'Ruslan N.',   role: 'Kiel',       stars: 5, google: true, text: 'Russische Geburtsurkunden für die Anmeldung — schnell, günstig, korrekt. Haben mich sogar abends noch per WhatsApp informiert.' },
    { initials: 'LB', name: 'Leila B.',    role: 'Mainz',      stars: 5, google: true, text: 'Arabischer Führerschein, Zeugnisse und Heiratsurkunde auf einmal — alles kein Problem. Preis war absolut fair.' },
    { initials: 'TC', name: 'Tomasz C.',   role: 'Bielefeld',  stars: 5, google: true, text: 'Für mein polnisches Abitur-Zeugnis brauchte ich eine beglaubigte Übersetzung für die Uni. In 3 Tagen da. Top Service!' },
    { initials: 'SA', name: 'Sina A.',     role: 'Berlin',     stars: 5, google: true, text: 'Persische Dokumente für die Anerkennung meines Studiums. Der Übersetzer kannte alle Fachbegriffe. Wurde auf Anhieb akzeptiert.' },
    { initials: 'MÖ', name: 'Mehmet Ö.',  role: 'Stuttgart',  stars: 5, google: true, text: 'Türkische Heiratsurkunde, abends per WhatsApp gesendet. Am nächsten Morgen fertig. Unfassbar schnell.' },
    { initials: 'EV', name: 'Elena V.',    role: 'Osnabrück',  stars: 5, google: true, text: 'Sehr freundliches Team, mehrsprachig — das gibt einem ein sicheres Gefühl. Alle Unterlagen sofort korrekt, kein Nachfragen nötig.' },
    { initials: 'KB', name: 'Khalid B.',   role: 'Kiel',       stars: 5, google: true, text: 'Marokkanische Dokumente für die Familienzusammenführung. Alles wurde beim Amt sofort anerkannt. Ich empfehle Noon jedem!' },
    { initials: 'NP', name: 'Natalia P.',  role: 'Mainz',      stars: 5, google: true, text: 'Ukrainische Schuldokumente meiner Kinder — für die Schule benötigt. Sehr schnell und der Preis war fair. Super Team!' },
    { initials: 'AÇ', name: 'Ayşe Ç.',    role: 'Bielefeld',  stars: 5, google: true, text: 'Ich brauchte einen Dolmetscher für einen Gerichtstermin. Innerhalb von 24 Stunden organisiert — sehr professionell und diskret.' },
  ],
  en: [
    { initials: 'AK', name: 'Ahmad K.',    role: 'Osnabrück',  stars: 5, google: true, text: 'Syrian marriage certificate translated within 24 hours — everything perfect for the registry office. Highly recommended!' },
    { initials: 'FY', name: 'Fatma Y.',    role: 'Stuttgart',  stars: 5, google: true, text: 'Turkish driving licence translation done in one day. Very professional — the stamp was immediately accepted by the authority.' },
    { initials: 'MI', name: 'Maria I.',    role: 'Berlin',     stars: 5, google: true, text: 'The interpreter at the immigration office was well-prepared and calm. We understood everything. Thank you!' },
    { initials: 'RN', name: 'Ruslan N.',   role: 'Kiel',       stars: 5, google: true, text: 'Russian birth certificates for registration — fast, affordable, accurate. They even updated me via WhatsApp in the evening.' },
    { initials: 'LB', name: 'Leila B.',    role: 'Mainz',      stars: 5, google: true, text: 'Arabic driving licence, diplomas and marriage certificate all at once — no problem. The price was absolutely fair.' },
    { initials: 'TC', name: 'Tomasz C.',   role: 'Bielefeld',  stars: 5, google: true, text: 'I needed a certified translation of my Polish A-level certificate for university. Done in 3 days. Top service!' },
    { initials: 'SA', name: 'Sina A.',     role: 'Berlin',     stars: 5, google: true, text: 'Persian documents for my degree recognition. The translator knew all the technical terms. Accepted on the first attempt.' },
    { initials: 'MÖ', name: 'Mehmet Ö.',  role: 'Stuttgart',  stars: 5, google: true, text: 'Turkish marriage certificate sent by WhatsApp in the evening. Ready the next morning. Incredibly fast.' },
    { initials: 'EV', name: 'Elena V.',    role: 'Osnabrück',  stars: 5, google: true, text: 'Very friendly multilingual team — that gives you a sense of security. All documents correct straight away, no need to ask twice.' },
    { initials: 'KB', name: 'Khalid B.',   role: 'Kiel',       stars: 5, google: true, text: 'Moroccan documents for family reunification. Everything was immediately recognised by the authority. I recommend Noon to everyone!' },
    { initials: 'NP', name: 'Natalia P.',  role: 'Mainz',      stars: 5, google: true, text: "My children's Ukrainian school documents — needed for school enrolment. Very fast and fairly priced. Great team!" },
    { initials: 'AÇ', name: 'Ayşe Ç.',    role: 'Bielefeld',  stars: 5, google: true, text: 'I needed an interpreter for a court hearing. Arranged within 24 hours — very professional and discreet.' },
  ],
  ar: [
    { initials: 'AK', name: 'Ahmad K.',    role: 'Osnabrück',  stars: 5, google: true, text: 'تمت ترجمة شهادة الزواج السورية في 24 ساعة — كل شيء مثالي لمكتب التسجيل. أنصح بهم بشدة!' },
    { initials: 'FY', name: 'Fatma Y.',    role: 'Stuttgart',  stars: 5, google: true, text: 'ترجمة رخصة القيادة التركية في يوم واحد. احترافية عالية — قبلت الجهة الختم فوراً.' },
    { initials: 'MI', name: 'Maria I.',    role: 'Berlin',     stars: 5, google: true, text: 'كان المترجم الفوري في مكتب الهجرة مستعداً تماماً وهادئاً. فهمنا كل شيء. شكراً!' },
    { initials: 'RN', name: 'Ruslan N.',   role: 'Kiel',       stars: 5, google: true, text: 'شهادات الميلاد الروسية للتسجيل — سريعة وبأسعار معقولة ودقيقة. أبلغوني حتى في المساء عبر واتساب.' },
    { initials: 'LB', name: 'Leila B.',    role: 'Mainz',      stars: 5, google: true, text: 'رخصة القيادة العربية والشهادات وعقد الزواج دفعة واحدة — لا مشكلة. كان السعر عادلاً تماماً.' },
    { initials: 'TC', name: 'Tomasz C.',   role: 'Bielefeld',  stars: 5, google: true, text: 'احتجت ترجمة معتمدة لشهادة البكالوريا البولندية للجامعة. جاهزة في 3 أيام. خدمة رائعة!' },
    { initials: 'SA', name: 'Sina A.',     role: 'Berlin',     stars: 5, google: true, text: 'وثائق فارسية للاعتراف بشهادتي الجامعية. المترجم عرف كل المصطلحات التقنية. قُبلت من المرة الأولى.' },
    { initials: 'MÖ', name: 'Mehmet Ö.',  role: 'Stuttgart',  stars: 5, google: true, text: 'أرسلت عقد الزواج التركي مساءً عبر واتساب. كان جاهزاً صباح اليوم التالي. سرعة مذهلة.' },
    { initials: 'EV', name: 'Elena V.',    role: 'Osnabrück',  stars: 5, google: true, text: 'فريق ودود جداً ومتعدد اللغات — هذا يمنحك شعوراً بالأمان. جميع الوثائق صحيحة فوراً، دون الحاجة لطرح أسئلة.' },
    { initials: 'KB', name: 'Khalid B.',   role: 'Kiel',       stars: 5, google: true, text: 'وثائق مغربية لمّ شمل العائلة. اعترفت بها الجهة فوراً. أنصح الجميع بنون!' },
    { initials: 'NP', name: 'Natalia P.',  role: 'Mainz',      stars: 5, google: true, text: 'وثائق مدرسية أوكرانية لأطفالي — مطلوبة للالتحاق بالمدرسة. سريعة جداً وبسعر عادل. فريق رائع!' },
    { initials: 'AÇ', name: 'Ayşe Ç.',    role: 'Bielefeld',  stars: 5, google: true, text: 'احتجت مترجماً فورياً لجلسة محكمة. تم الترتيب في 24 ساعة — احترافي وسري جداً.' },
  ],
  tr: [
    { initials: 'AK', name: 'Ahmad K.',    role: 'Osnabrück',  stars: 5, google: true, text: 'Suriyeli evlilik cüzdanı 24 saatte çevrildi — nüfus müdürlüğü için her şey mükemmeldi. Kesinlikle tavsiye ederim!' },
    { initials: 'FY', name: 'Fatma Y.',    role: 'Stuttgart',  stars: 5, google: true, text: 'Türk ehliyeti bir günde çevrildi. Çok profesyonel — mühür yetkili makam tarafından hemen kabul edildi.' },
    { initials: 'MI', name: 'Maria I.',    role: 'Berlin',     stars: 5, google: true, text: 'Yabancılar dairesindeki tercüman çok hazırlıklı ve sakinmiş. Her şeyi anladık. Teşekkürler!' },
    { initials: 'RN', name: 'Ruslan N.',   role: 'Kiel',       stars: 5, google: true, text: 'Kayıt için Rusça doğum belgeleri — hızlı, uygun fiyatlı, doğru. Akşam bile WhatsApp ile bilgilendirdiler.' },
    { initials: 'LB', name: 'Leila B.',    role: 'Mainz',      stars: 5, google: true, text: 'Arapça ehliyet, diplomalar ve evlilik cüzdanı hepsi bir arada — hiç sorun yok. Fiyat kesinlikle adildi.' },
    { initials: 'TC', name: 'Tomasz C.',   role: 'Bielefeld',  stars: 5, google: true, text: 'Üniversite için Polonyaca lise diplomamın onaylı çevirisine ihtiyacım vardı. 3 günde hazır. Harika hizmet!' },
    { initials: 'SA', name: 'Sina A.',     role: 'Berlin',     stars: 5, google: true, text: 'Üniversite diplomamın tanınması için Farsça belgeler. Tercüman tüm teknik terimleri biliyordu. İlk seferinde kabul edildi.' },
    { initials: 'MÖ', name: 'Mehmet Ö.',  role: 'Stuttgart',  stars: 5, google: true, text: 'Türkçe evlilik cüzdanını akşam WhatsApp ile gönderdim. Ertesi sabah hazırdı. İnanılmaz hızlı.' },
    { initials: 'EV', name: 'Elena V.',    role: 'Osnabrück',  stars: 5, google: true, text: 'Çok samimi ve çok dilli ekip — bu size güven veriyor. Tüm belgeler hemen doğru, hiç sormaya gerek yok.' },
    { initials: 'KB', name: 'Khalid B.',   role: 'Kiel',       stars: 5, google: true, text: 'Aile birleşimi için Faslı belgeler. Her şey yetkili makam tarafından hemen tanındı. Noon\'u herkese tavsiye ederim!' },
    { initials: 'NP', name: 'Natalia P.',  role: 'Mainz',      stars: 5, google: true, text: "Çocuklarımın Ukraynaca okul belgeleri — okul kaydı için gerekli. Çok hızlı ve fiyat adildi. Harika ekip!" },
    { initials: 'AÇ', name: 'Ayşe Ç.',    role: 'Bielefeld',  stars: 5, google: true, text: 'Duruşma için tercümana ihtiyacım vardı. 24 saat içinde organize edildi — çok profesyonel ve gizli.' },
  ],
  ru: [
    { initials: 'AK', name: 'Ahmad K.',    role: 'Osnabrück',  stars: 5, google: true, text: 'Сирийское свидетельство о браке переведено за 24 часа — всё идеально для ЗАГСа. Очень рекомендую!' },
    { initials: 'FY', name: 'Fatma Y.',    role: 'Stuttgart',  stars: 5, google: true, text: 'Турецкие права переведены за один день. Очень профессионально — штамп был немедленно принят ведомством.' },
    { initials: 'MI', name: 'Maria I.',    role: 'Berlin',     stars: 5, google: true, text: 'Переводчик в ведомстве по делам иностранцев был отлично подготовлен и спокоен. Мы всё поняли. Спасибо!' },
    { initials: 'RN', name: 'Ruslan N.',   role: 'Kiel',       stars: 5, google: true, text: 'Русские свидетельства о рождении для регистрации — быстро, доступно, точно. Даже вечером написали в WhatsApp.' },
    { initials: 'LB', name: 'Leila B.',    role: 'Mainz',      stars: 5, google: true, text: 'Арабские права, дипломы и свидетельство о браке сразу — никаких проблем. Цена абсолютно честная.' },
    { initials: 'TC', name: 'Tomasz C.',   role: 'Bielefeld',  stars: 5, google: true, text: 'Мне нужен был заверенный перевод польского аттестата для университета. Готово за 3 дня. Отличный сервис!' },
    { initials: 'SA', name: 'Sina A.',     role: 'Berlin',     stars: 5, google: true, text: 'Персидские документы для признания диплома. Переводчик знал все специальные термины. Принято с первого раза.' },
    { initials: 'MÖ', name: 'Mehmet Ö.',  role: 'Stuttgart',  stars: 5, google: true, text: 'Турецкое свидетельство о браке отправил вечером через WhatsApp. Готово утром. Невероятно быстро.' },
    { initials: 'EV', name: 'Elena V.',    role: 'Osnabrück',  stars: 5, google: true, text: 'Очень дружелюбная многоязычная команда — это внушает доверие. Все документы сразу правильно, без лишних вопросов.' },
    { initials: 'KB', name: 'Khalid B.',   role: 'Kiel',       stars: 5, google: true, text: 'Марокканские документы для воссоединения семьи. Всё сразу признано ведомством. Рекомендую Noon всем!' },
    { initials: 'NP', name: 'Natalia P.',  role: 'Mainz',      stars: 5, google: true, text: 'Украинские школьные документы для детей — нужны были для зачисления. Очень быстро и по справедливой цене. Отличная команда!' },
    { initials: 'AÇ', name: 'Ayşe Ç.',    role: 'Bielefeld',  stars: 5, google: true, text: 'Мне нужен был переводчик для судебного заседания. Организовано за 24 часа — очень профессионально и конфиденциально.' },
  ],
  fr: [
    { initials: 'AK', name: 'Ahmad K.',    role: 'Osnabrück',  stars: 5, google: true, text: "Acte de mariage syrien traduit en 24 heures — parfait pour l'état civil. Absolument recommandable!" },
    { initials: 'FY', name: 'Fatma Y.',    role: 'Stuttgart',  stars: 5, google: true, text: 'Traduction du permis de conduire turc en une journée. Très professionnel — le cachet a été immédiatement accepté.' },
    { initials: 'MI', name: 'Maria I.',    role: 'Berlin',     stars: 5, google: true, text: "L'interprète à la préfecture était très bien préparé et calme. Nous avons tout compris. Merci!" },
    { initials: 'RN', name: 'Ruslan N.',   role: 'Kiel',       stars: 5, google: true, text: 'Actes de naissance russes pour l\'inscription — rapide, abordable, précis. Ils m\'ont même contacté le soir par WhatsApp.' },
    { initials: 'LB', name: 'Leila B.',    role: 'Mainz',      stars: 5, google: true, text: 'Permis arabe, diplômes et acte de mariage en une fois — aucun problème. Le prix était absolument équitable.' },
    { initials: 'TC', name: 'Tomasz C.',   role: 'Bielefeld',  stars: 5, google: true, text: 'J\'avais besoin d\'une traduction certifiée de mon baccalauréat polonais pour l\'université. Prêt en 3 jours. Excellent service!' },
    { initials: 'SA', name: 'Sina A.',     role: 'Berlin',     stars: 5, google: true, text: 'Documents persans pour la reconnaissance de mon diplôme. Le traducteur connaissait tous les termes techniques. Accepté du premier coup.' },
    { initials: 'MÖ', name: 'Mehmet Ö.',  role: 'Stuttgart',  stars: 5, google: true, text: 'Acte de mariage turc envoyé le soir par WhatsApp. Prêt le lendemain matin. D\'une rapidité incroyable.' },
    { initials: 'EV', name: 'Elena V.',    role: 'Osnabrück',  stars: 5, google: true, text: 'Équipe très accueillante et multilingue — ça inspire confiance. Tous les documents corrects immédiatement, sans questions supplémentaires.' },
    { initials: 'KB', name: 'Khalid B.',   role: 'Kiel',       stars: 5, google: true, text: 'Documents marocains pour le regroupement familial. Tout reconnu immédiatement par l\'administration. Je recommande Noon à tout le monde!' },
    { initials: 'NP', name: 'Natalia P.',  role: 'Mainz',      stars: 5, google: true, text: 'Documents scolaires ukrainiens de mes enfants — nécessaires pour l\'inscription scolaire. Très rapide et prix équitable. Super équipe!' },
    { initials: 'AÇ', name: 'Ayşe Ç.',    role: 'Bielefeld',  stars: 5, google: true, text: "J'avais besoin d'un interprète pour une audience. Organisé en 24 heures — très professionnel et discret." },
  ],
  uk: [
    { initials: 'AK', name: 'Ahmad K.',    role: 'Osnabrück',  stars: 5, google: true, text: 'Сирійське свідоцтво про шлюб перекладено за 24 години — все ідеально для РАЦСу. Дуже рекомендую!' },
    { initials: 'FY', name: 'Fatma Y.',    role: 'Stuttgart',  stars: 5, google: true, text: 'Переклад турецького водійського посвідчення за один день. Дуже професійно — печатку відразу прийняли в органі.' },
    { initials: 'MI', name: 'Maria I.',    role: 'Berlin',     stars: 5, google: true, text: 'Перекладач у відомстві у справах іноземців був чудово підготовлений і спокійний. Ми все зрозуміли. Дякую!' },
    { initials: 'RN', name: 'Ruslan N.',   role: 'Kiel',       stars: 5, google: true, text: 'Російські свідоцтва про народження для реєстрації — швидко, доступно, точно. Навіть ввечері написали у WhatsApp.' },
    { initials: 'LB', name: 'Leila B.',    role: 'Mainz',      stars: 5, google: true, text: 'Арабські права, дипломи та свідоцтво про шлюб одразу — жодних проблем. Ціна була абсолютно чесною.' },
    { initials: 'TC', name: 'Tomasz C.',   role: 'Bielefeld',  stars: 5, google: true, text: 'Мені потрібен був засвідчений переклад польського атестату для університету. Готово за 3 дні. Чудовий сервіс!' },
    { initials: 'SA', name: 'Sina A.',     role: 'Berlin',     stars: 5, google: true, text: 'Перські документи для визнання диплому. Перекладач знав усі спеціальні терміни. Прийнято з першого разу.' },
    { initials: 'MÖ', name: 'Mehmet Ö.',  role: 'Stuttgart',  stars: 5, google: true, text: 'Турецьке свідоцтво про шлюб надіслав увечері через WhatsApp. Готово вранці. Неймовірно швидко.' },
    { initials: 'EV', name: 'Elena V.',    role: 'Osnabrück',  stars: 5, google: true, text: 'Дуже привітна багатомовна команда — це викликає довіру. Всі документи одразу правильно, без зайвих запитань.' },
    { initials: 'KB', name: 'Khalid B.',   role: 'Kiel',       stars: 5, google: true, text: 'Марокканські документи для возз\'єднання сім\'ї. Все одразу визнано органом. Рекомендую Noon усім!' },
    { initials: 'NP', name: 'Natalia P.',  role: 'Mainz',      stars: 5, google: true, text: 'Українські шкільні документи моїх дітей — потрібні були для зарахування до школи. Дуже швидко і за справедливою ціною. Чудова команда!' },
    { initials: 'AÇ', name: 'Ayşe Ç.',    role: 'Bielefeld',  stars: 5, google: true, text: 'Мені потрібен був перекладач для судового засідання. Організовано за 24 години — дуже професійно і конфіденційно.' },
  ],
};

/* Human silhouette icon — neutral, professional */
function PersonIcon({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="16" fill="#E8E8E8"/>
      {/* head */}
      <circle cx="16" cy="12" r="5" fill="#BDBDBD"/>
      {/* body / torso */}
      <path
        d="M8 28c0-4.418 3.582-8 8-8s8 3.582 8 8"
        fill="#BDBDBD"
      />
    </svg>
  );
}

function Stars({ count }) {
  return (
    <span className="mini-review" aria-label={`${count} / 5`}>
      <span aria-hidden="true">{'★'.repeat(count)}</span>
    </span>
  );
}

function GoogleLogo() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Google"
      role="img"
      style={{ flexShrink: 0 }}
    >
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function Testimonials() {
  const { t, lang } = useI18n();
  const list = TESTIMONIALS_BY_LANG[lang] || TESTIMONIALS_BY_LANG.de;

  return (
    <section className="testimonials" aria-labelledby="test-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="test-heading" data-reveal="">{t('test.title')}</h2>
        </div>
        <div className="columns" role="list">
          {list.map((item, i) => (
            <article
              key={i}
              className="testimonial"
              role="listitem"
              data-reveal=""
              style={{ '--ri': i % 4 }}
            >
              <div className="head">
                <PersonIcon size={40} />
                <div>
                  <div className="name-row">
                    <span className="name">{item.name}</span>
                    <Stars count={item.stars} />
                    {item.google && <GoogleLogo />}
                  </div>
                  <div className="role">{item.role}</div>
                </div>
              </div>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
