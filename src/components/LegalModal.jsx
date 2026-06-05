import { useState, useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';

/* ── Impressum: always German (§ 5 TMG) ── */
const ImpressumBody = ({ lang }) => {
  const NOTE = {
    de: null,
    en: 'This imprint is required by German law (§ 5 TMG) and is therefore provided in German.',
    ar: 'هذا الإفصاح القانوني مطلوب بموجب القانون الألماني (§ 5 TMG) وبالتالي يُقدَّم باللغة الألمانية.',
    tr: 'Bu künye, Alman hukuku (§ 5 TMG) gereği zorunlu olup bu nedenle Almanca sunulmaktadır.',
    ru: 'Этот выходной лист предусмотрен немецким законом (§ 5 TMG) и поэтому предоставляется на немецком языке.',
    fr: "Cet impressum est requis par la loi allemande (§ 5 TMG) et est donc fourni en allemand.",
    uk: 'Цей вихідний листок вимагається німецьким законодавством (§ 5 TMG) і тому надається німецькою мовою.',
  };
  const note = NOTE[lang] || NOTE.en;
  return (
    <div className="legal-body">
      {note && (
        <p style={{ background: '#f5f5f5', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 20, color: '#555' }}>
          ℹ️ {note}
        </p>
      )}
      <h3>Angaben gemäß § 5 TMG</h3>
      <p>
        <strong>Noon Sprachdienst</strong><br/>
        Möserstraße 14<br/>
        49074 Osnabrück<br/>
        Deutschland
      </p>
      <h3>Kontakt</h3>
      <p>
        Mobil: +49 160 956 27 666<br/>
        E-Mail: info@noon-sprachdienst.de
      </p>
      <h3>Weitere Standorte</h3>
      <p>
        Königstraße 82, 70173 Stuttgart<br/>
        Friedrichstraße 191, 10117 Berlin<br/>
        Niederwall 21, 33602 Bielefeld<br/>
        Schillerplatz 7, 55116 Mainz<br/>
        Holstenstraße 64, 24103 Kiel
      </p>
      <h3>Haftung für Inhalte</h3>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach
        den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
        jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
        oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>
      <p>
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
        allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst
        ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
        entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
      </p>
      <h3>Haftung für Links</h3>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
        Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
        Betreiber verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
        mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung
        nicht erkennbar.
      </p>
      <h3>Urheberrecht</h3>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
        deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
        Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers.
      </p>
      <h3>Streitschlichtung</h3>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </div>
  );
};

/* ── Datenschutz content per language ── */
const DATENSCHUTZ = {
  de: (
    <div className="legal-body">
      <h3>1. Datenschutz auf einen Blick</h3>
      <h4>Allgemeine Hinweise</h4>
      <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
      <h4>Datenerfassung auf dieser Website</h4>
      <p><strong>Wer ist verantwortlich?</strong><br/>Noon Sprachdienst, Möserstraße 14, 49074 Osnabrück — info@noon-sprachdienst.de</p>
      <h3>2. Ihre Rechte</h3>
      <p>Sie haben jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung oder Löschung (Art. 16, 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerruf einer erteilten Einwilligung</li>
      </ul>
      <h3>3. Cookies</h3>
      <p><strong>Essentielle Cookies</strong> sind für den Betrieb der Website unbedingt erforderlich (Art. 6 Abs. 1 lit. f DSGVO). <strong>Analyse-Cookies</strong> werden nur mit Ihrer Einwilligung gesetzt (Art. 6 Abs. 1 lit. a DSGVO). Sie können Ihre Einwilligung jederzeit über unseren Cookie-Banner widerrufen.</p>
      <p>Nach Ihrer Einwilligung erfassen wir ausschließlich pseudonyme Nutzungsdaten: besuchte Seiten, ungefähre Verweildauer, gekürzte Herkunfts-Domain, grobe Standortangaben (Land und gegebenenfalls Stadt), Sprache, Geräteklasse, Browser, Betriebssystem und Klicks auf Kontakt-Schaltflächen. Wir speichern keine IP-Adressen, Kontaktdaten, Nachrichten oder hochgeladenen Dokumente in der Website-Analyse. Analyseereignisse werden nach 90 Tagen gelöscht. Für die technische Bereitstellung nutzen wir Vercel und Google Firebase / Cloud Firestore.</p>
      <h3>4. Kontaktformular</h3>
      <p>Anfragen über das Kontaktformular werden inklusive Ihrer Kontaktdaten zur Bearbeitung gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.</p>
      <h3>5. Datenübertragung in Drittstaaten</h3>
      <p>Wir wählen für Cloud Firestore einen Speicherort in der EU. Bei der Nutzung von Vercel und Google Firebase können Zugriffe oder Verarbeitungen durch Dienstleister außerhalb der EU/EWR nicht vollständig ausgeschlossen werden. Soweit erforderlich, erfolgen diese auf Grundlage geeigneter Datenschutzgarantien und Auftragsverarbeitungsvereinbarungen.</p>
      <p style={{ marginTop: 32, fontSize: 13, color: '#888' }}>Stand: {new Date().getFullYear()} — info@noon-sprachdienst.de</p>
    </div>
  ),
  en: (
    <div className="legal-body">
      <h3>1. Privacy at a Glance</h3>
      <h4>General Information</h4>
      <p>The following information gives a simple overview of what happens to your personal data when you visit this website.</p>
      <h4>Data Collection</h4>
      <p><strong>Who is responsible?</strong><br/>Noon Sprachdienst, Möserstraße 14, 49074 Osnabrück — info@noon-sprachdienst.de</p>
      <h3>2. Your Rights</h3>
      <p>You have the right at any time to:</p>
      <ul>
        <li>Access your stored data (Art. 15 GDPR)</li>
        <li>Rectification or deletion (Art. 16, 17 GDPR)</li>
        <li>Restriction of processing (Art. 18 GDPR)</li>
        <li>Object to processing (Art. 21 GDPR)</li>
        <li>Data portability (Art. 20 GDPR)</li>
        <li>Withdraw a given consent at any time</li>
      </ul>
      <h3>3. Cookies</h3>
      <p><strong>Essential cookies</strong> are required for the website to function (Art. 6(1)(f) GDPR). <strong>Analytics cookies</strong> are only set with your consent (Art. 6(1)(a) GDPR). You can withdraw your consent at any time via our cookie banner.</p>
      <p>After consent, we collect pseudonymous usage data only: visited pages, approximate time on page, shortened referrer domain, coarse location (country and optionally city), language, device category, browser, operating system and contact-button clicks. Website analytics do not store IP addresses, contact details, messages or uploaded documents. Analytics events are deleted after 90 days. Vercel and Google Firebase / Cloud Firestore provide the technical infrastructure.</p>
      <h3>4. Contact Form</h3>
      <p>Enquiries via the contact form are stored including your contact details for processing purposes. Legal basis: Art. 6(1)(b) GDPR.</p>
      <h3>5. International Transfers</h3>
      <p>We select an EU storage location for Cloud Firestore. Access or processing by Vercel and Google Firebase service providers outside the EU/EEA cannot be fully excluded. Where required, appropriate data-protection safeguards and processing agreements apply.</p>
      <p style={{ marginTop: 32, fontSize: 13, color: '#888' }}>As of: {new Date().getFullYear()} — info@noon-sprachdienst.de</p>
    </div>
  ),
  ar: (
    <div className="legal-body" dir="rtl">
      <h3>١. الخصوصية في لمحة</h3>
      <h4>معلومات عامة</h4>
      <p>تقدم المعلومات التالية نظرة عامة بسيطة حول ما يحدث لبياناتك الشخصية عند زيارة هذا الموقع.</p>
      <h4>جمع البيانات</h4>
      <p><strong>من المسؤول؟</strong><br/>Noon Sprachdienst، Möserstraße 14، 49074 Osnabrück — info@noon-sprachdienst.de</p>
      <h3>٢. حقوقك</h3>
      <p>لديك في أي وقت الحق في:</p>
      <ul>
        <li>الاطلاع على بياناتك المخزنة (المادة 15 GDPR)</li>
        <li>التصحيح أو الحذف (المادة 16، 17 GDPR)</li>
        <li>تقييد المعالجة (المادة 18 GDPR)</li>
        <li>الاعتراض على المعالجة (المادة 21 GDPR)</li>
        <li>قابلية نقل البيانات (المادة 20 GDPR)</li>
        <li>سحب الموافقة الممنوحة في أي وقت</li>
      </ul>
      <h3>٣. ملفات تعريف الارتباط</h3>
      <p><strong>ملفات الارتباط الأساسية</strong> ضرورية لتشغيل الموقع. <strong>ملفات تعريف التحليل</strong> تُضبط فقط بموافقتك. يمكنك سحب موافقتك في أي وقت عبر شريط ملفات الارتباط.</p>
      <h3>٤. نموذج التواصل</h3>
      <p>يتم تخزين استفساراتك عبر نموذج التواصل لأغراض المعالجة.</p>
      <h3>٥. النقل الدولي للبيانات</h3>
      <p>نختار موقع تخزين داخل الاتحاد الأوروبي لخدمة Cloud Firestore. لا يمكن استبعاد الوصول أو المعالجة بشكل كامل من قبل مزودي خدمات Vercel وGoogle Firebase خارج الاتحاد الأوروبي. عند الحاجة تُطبّق ضمانات مناسبة لحماية البيانات واتفاقيات لمعالجة البيانات.</p>
      <p style={{ marginTop: 32, fontSize: 13, color: '#888' }}>اعتبارًا من: {new Date().getFullYear()} — info@noon-sprachdienst.de</p>
    </div>
  ),
  tr: (
    <div className="legal-body">
      <h3>1. Gizlilik Özeti</h3>
      <h4>Genel Bilgiler</h4>
      <p>Aşağıdaki bilgiler, bu web sitesini ziyaret ettiğinizde kişisel verilerinizle neler yapıldığına dair basit bir genel bakış sunmaktadır.</p>
      <h4>Veri Toplama</h4>
      <p><strong>Kim sorumlu?</strong><br/>Noon Sprachdienst, Möserstraße 14, 49074 Osnabrück — info@noon-sprachdienst.de</p>
      <h3>2. Haklarınız</h3>
      <p>Her zaman şu haklara sahipsiniz:</p>
      <ul>
        <li>Saklanan verilerinize erişim (GDPR Madde 15)</li>
        <li>Düzeltme veya silme (GDPR Madde 16, 17)</li>
        <li>İşlemenin kısıtlanması (GDPR Madde 18)</li>
        <li>İşlemeye itiraz (GDPR Madde 21)</li>
        <li>Veri taşınabilirliği (GDPR Madde 20)</li>
        <li>Verilen rızayı geri çekme</li>
      </ul>
      <h3>3. Çerezler</h3>
      <p><strong>Zorunlu çerezler</strong> web sitesinin çalışması için gereklidir. <strong>Analiz çerezleri</strong> yalnızca onayınızla kullanılır. Onayınızı çerez bannerı aracılığıyla istediğiniz zaman geri çekebilirsiniz.</p>
      <h3>4. İletişim Formu</h3>
      <p>İletişim formu üzerinden gelen başvurular, işleme amaçlı olarak iletişim bilgilerinizle birlikte saklanır.</p>
      <h3>5. Uluslararası Veri Transferleri</h3>
      <p>Cloud Firestore için AB içinde bir depolama konumu seçiyoruz. Vercel ve Google Firebase hizmet sağlayıcıları tarafından AB/AEA dışından erişim veya işleme tamamen hariç tutulamaz. Gerektiğinde uygun veri koruma güvenceleri ve veri işleme sözleşmeleri uygulanır.</p>
      <p style={{ marginTop: 32, fontSize: 13, color: '#888' }}>Tarih: {new Date().getFullYear()} — info@noon-sprachdienst.de</p>
    </div>
  ),
  ru: (
    <div className="legal-body">
      <h3>1. Конфиденциальность: краткий обзор</h3>
      <h4>Общая информация</h4>
      <p>Следующая информация даёт простой обзор того, что происходит с вашими персональными данными при посещении этого сайта.</p>
      <h4>Сбор данных</h4>
      <p><strong>Кто несёт ответственность?</strong><br/>Noon Sprachdienst, Möserstraße 14, 49074 Osnabrück — info@noon-sprachdienst.de</p>
      <h3>2. Ваши права</h3>
      <p>Вы вправе в любое время:</p>
      <ul>
        <li>Получить доступ к хранящимся данным (ст. 15 GDPR)</li>
        <li>Потребовать исправления или удаления (ст. 16, 17 GDPR)</li>
        <li>Ограничить обработку данных (ст. 18 GDPR)</li>
        <li>Возразить против обработки (ст. 21 GDPR)</li>
        <li>Получить данные в переносимом формате (ст. 20 GDPR)</li>
        <li>Отозвать данное согласие</li>
      </ul>
      <h3>3. Файлы cookie</h3>
      <p><strong>Необходимые cookies</strong> требуются для работы сайта. <strong>Аналитические cookies</strong> устанавливаются только с вашего согласия. Вы можете отозвать согласие в любое время через наш баннер.</p>
      <h3>4. Контактная форма</h3>
      <p>Запросы через контактную форму сохраняются вместе с контактными данными для обработки обращения.</p>
      <h3>5. Международная передача данных</h3>
      <p>Для Cloud Firestore выбирается место хранения в ЕС. Нельзя полностью исключить доступ или обработку со стороны поставщиков услуг Vercel и Google Firebase за пределами ЕС/ЕЭЗ. При необходимости применяются соответствующие гарантии защиты данных и соглашения об обработке.</p>
      <p style={{ marginTop: 32, fontSize: 13, color: '#888' }}>Актуально с: {new Date().getFullYear()} — info@noon-sprachdienst.de</p>
    </div>
  ),
  fr: (
    <div className="legal-body">
      <h3>1. Confidentialité en un coup d'œil</h3>
      <h4>Informations générales</h4>
      <p>Les informations suivantes donnent un aperçu simple de ce qui se passe avec vos données personnelles lorsque vous visitez ce site.</p>
      <h4>Collecte de données</h4>
      <p><strong>Qui est responsable ?</strong><br/>Noon Sprachdienst, Möserstraße 14, 49074 Osnabrück — info@noon-sprachdienst.de</p>
      <h3>2. Vos droits</h3>
      <p>Vous avez à tout moment le droit de :</p>
      <ul>
        <li>Accéder à vos données stockées (Art. 15 RGPD)</li>
        <li>Rectification ou suppression (Art. 16, 17 RGPD)</li>
        <li>Limitation du traitement (Art. 18 RGPD)</li>
        <li>Opposition au traitement (Art. 21 RGPD)</li>
        <li>Portabilité des données (Art. 20 RGPD)</li>
        <li>Retirer un consentement donné à tout moment</li>
      </ul>
      <h3>3. Cookies</h3>
      <p>Les <strong>cookies essentiels</strong> sont nécessaires au fonctionnement du site. Les <strong>cookies analytiques</strong> ne sont définis qu'avec votre consentement. Vous pouvez retirer votre consentement à tout moment via notre bandeau de cookies.</p>
      <h3>4. Formulaire de contact</h3>
      <p>Les demandes via le formulaire de contact sont stockées avec vos coordonnées à des fins de traitement.</p>
      <h3>5. Transferts internationaux</h3>
      <p>Nous choisissons un lieu de stockage situé dans l’UE pour Cloud Firestore. Un accès ou un traitement par les prestataires Vercel et Google Firebase hors UE/EEE ne peut pas être totalement exclu. Lorsque cela est nécessaire, des garanties appropriées et des accords de traitement s’appliquent.</p>
      <p style={{ marginTop: 32, fontSize: 13, color: '#888' }}>En vigueur au : {new Date().getFullYear()} — info@noon-sprachdienst.de</p>
    </div>
  ),
  uk: (
    <div className="legal-body">
      <h3>1. Конфіденційність: короткий огляд</h3>
      <h4>Загальна інформація</h4>
      <p>Наступна інформація дає простий огляд того, що відбувається з вашими персональними даними при відвідуванні цього сайту.</p>
      <h4>Збір даних</h4>
      <p><strong>Хто несе відповідальність?</strong><br/>Noon Sprachdienst, Möserstraße 14, 49074 Osnabrück — info@noon-sprachdienst.de</p>
      <h3>2. Ваші права</h3>
      <p>Ви маєте право в будь-який час:</p>
      <ul>
        <li>Отримати доступ до збережених даних (ст. 15 GDPR)</li>
        <li>Вимагати виправлення або видалення (ст. 16, 17 GDPR)</li>
        <li>Обмежити обробку даних (ст. 18 GDPR)</li>
        <li>Заперечити проти обробки (ст. 21 GDPR)</li>
        <li>Отримати дані в переносному форматі (ст. 20 GDPR)</li>
        <li>Відкликати надану згоду</li>
      </ul>
      <h3>3. Файли cookie</h3>
      <p><strong>Необхідні cookies</strong> потрібні для роботи сайту. <strong>Аналітичні cookies</strong> встановлюються лише з вашої згоди. Ви можете відкликати згоду в будь-який час через наш банер.</p>
      <h3>4. Контактна форма</h3>
      <p>Запити через контактну форму зберігаються разом з контактними даними для обробки звернення.</p>
      <h3>5. Міжнародна передача даних</h3>
      <p>Для Cloud Firestore обирається місце зберігання в ЄС. Неможливо повністю виключити доступ або обробку постачальниками послуг Vercel і Google Firebase за межами ЄС/ЄЕП. За потреби застосовуються належні гарантії захисту даних та угоди про обробку.</p>
      <p style={{ marginTop: 32, fontSize: 13, color: '#888' }}>Чинно з: {new Date().getFullYear()} — info@noon-sprachdienst.de</p>
    </div>
  ),
};

/* ── AGB content per language ── */
const AGB = {
  de: (
    <div className="legal-body">
      <h3>§ 1 Geltungsbereich</h3>
      <p>Diese AGB gelten für alle Verträge zwischen Noon Sprachdienst und dem Auftraggeber über Übersetzungs-, Dolmetsch- und sonstige Sprachdienstleistungen.</p>
      <h3>§ 2 Vertragsschluss</h3>
      <p>Ein Vertrag kommt durch schriftliche oder mündliche Auftragserteilung und deren Bestätigung durch Noon zustande. Angebote sind freibleibend bis zur schriftlichen Bestätigung.</p>
      <h3>§ 3 Leistungen</h3>
      <p>Noon erbringt Übersetzungsleistungen, Dolmetschdienste, beglaubigte Übersetzungen und Fachübersetzungen gemäß der vereinbarten Auftragsbestätigung. Beglaubigte Übersetzungen werden von staatlich anerkannten, vereidigten Übersetzern angefertigt.</p>
      <h3>§ 4 Preise &amp; Zahlung</h3>
      <p>Es gelten die vereinbarten oder auf der Website ausgewiesenen Preise zzgl. gesetzlicher MwSt. Die Zahlung ist nach Rechnungsstellung fällig.</p>
      <h3>§ 5 Lieferzeiten</h3>
      <p>Vereinbarte Liefertermine sind verbindlich. Bei unvorhersehbaren Verzögerungen wird der Auftraggeber unverzüglich informiert. Express-Aufträge werden gesondert vereinbart.</p>
      <h3>§ 6 Reklamationen</h3>
      <p>Mängel sind innerhalb von 14 Tagen nach Lieferung schriftlich anzuzeigen. Noon hat das Recht zur Nachbesserung.</p>
      <h3>§ 7 Haftung</h3>
      <p>Noon haftet bei Vorsatz und grober Fahrlässigkeit nach gesetzlichen Vorschriften. Bei leichter Fahrlässigkeit ist die Haftung auf den vertragstypisch vorhersehbaren Schaden begrenzt.</p>
      <h3>§ 8 Vertraulichkeit</h3>
      <p>Alle übermittelten Dokumente werden vertraulich behandelt. Mitarbeiter und Übersetzer sind zur Verschwiegenheit verpflichtet.</p>
      <h3>§ 9 Gerichtsstand</h3>
      <p>Es gilt deutsches Recht. Gerichtsstand ist Osnabrück für Kaufleute und juristische Personen des öffentlichen Rechts.</p>
      <p style={{ marginTop: 32, fontSize: 13, color: '#888' }}>Stand: {new Date().getFullYear()} — Noon Sprachdienst, Möserstraße 14, 49074 Osnabrück</p>
    </div>
  ),
  en: (
    <div className="legal-body">
      <h3>§ 1 Scope</h3>
      <p>These Terms & Conditions apply to all contracts between Noon Sprachdienst and the client for translation, interpreting and other language services.</p>
      <h3>§ 2 Contract Formation</h3>
      <p>A contract is formed upon written or verbal order placement and its confirmation by Noon. Quotations are non-binding until confirmed in writing.</p>
      <h3>§ 3 Services</h3>
      <p>Noon provides translation, interpreting, certified translations and specialised translations as per the agreed order confirmation. Certified translations are prepared by state-approved sworn translators.</p>
      <h3>§ 4 Prices &amp; Payment</h3>
      <p>Agreed prices or those shown on the website apply, plus applicable VAT. Payment is due upon receipt of invoice.</p>
      <h3>§ 5 Delivery Times</h3>
      <p>Agreed delivery dates are binding. The client is notified immediately in the event of unforeseen delays. Express orders are agreed separately.</p>
      <h3>§ 6 Complaints</h3>
      <p>Defects must be reported in writing within 14 days of delivery. Noon has the right to rectify any defects.</p>
      <h3>§ 7 Liability</h3>
      <p>Noon is liable for intent and gross negligence under statutory provisions. Liability for slight negligence is limited to foreseeable damages.</p>
      <h3>§ 8 Confidentiality</h3>
      <p>All documents submitted are treated confidentially. Staff and translators are bound to secrecy.</p>
      <h3>§ 9 Jurisdiction</h3>
      <p>German law applies. Place of jurisdiction is Osnabrück for merchants and legal entities under public law.</p>
      <p style={{ marginTop: 32, fontSize: 13, color: '#888' }}>As of: {new Date().getFullYear()} — Noon Sprachdienst, Möserstraße 14, 49074 Osnabrück</p>
    </div>
  ),
  ar: (
    <div className="legal-body" dir="rtl">
      <h3>§ ١ نطاق التطبيق</h3>
      <p>تسري هذه الشروط على جميع العقود بين Noon Sprachdienst والعميل المتعلقة بخدمات الترجمة التحريرية والفورية وسائر الخدمات اللغوية.</p>
      <h3>§ ٢ إبرام العقد</h3>
      <p>يُبرم العقد عند تقديم الطلب كتابيًا أو شفهيًا وتأكيده من قِبَل Noon. تبقى العروض غير ملزمة حتى التأكيد الكتابي.</p>
      <h3>§ ٣ الخدمات</h3>
      <p>تقدم Noon خدمات الترجمة والترجمة الفورية والترجمات المعتمدة والتخصصية وفق تأكيد الطلب المتفق عليه. تُنجز الترجمات المعتمدة من قِبَل مترجمين محلَّفين معتمدين من الدولة.</p>
      <h3>§ ٤ الأسعار والدفع</h3>
      <p>تُطبَّق الأسعار المتفق عليها أو المُعلنة على الموقع بالإضافة إلى ضريبة القيمة المضافة المقررة. يستحق السداد عند استلام الفاتورة.</p>
      <h3>§ ٥ مواعيد التسليم</h3>
      <p>مواعيد التسليم المتفق عليها ملزمة. يُخطَر العميل فورًا عند حدوث تأخيرات غير متوقعة. تُتفاوض طلبات الإكسبريس بصورة منفصلة.</p>
      <h3>§ ٦ الشكاوى</h3>
      <p>يجب الإبلاغ عن العيوب كتابيًا في غضون 14 يومًا من التسليم. تحق لـ Noon فرصة التصحيح.</p>
      <h3>§ ٧ المسؤولية</h3>
      <p>تتحمل Noon المسؤولية في حالات القصد والإهمال الجسيم وفق الأحكام القانونية. تقتصر المسؤولية عن الإهمال البسيط على الأضرار المتوقعة تعاقديًا.</p>
      <h3>§ ٨ السرية</h3>
      <p>تُعالَج جميع الوثائق المُرسلة بسرية تامة. يلتزم الموظفون والمترجمون بالسرية.</p>
      <h3>§ ٩ الاختصاص القضائي</h3>
      <p>يسري القانون الألماني. مكان الاختصاص هو Osnabrück للتجار والكيانات القانونية العامة.</p>
      <p style={{ marginTop: 32, fontSize: 13, color: '#888' }}>اعتبارًا من: {new Date().getFullYear()} — Noon Sprachdienst, Möserstraße 14, 49074 Osnabrück</p>
    </div>
  ),
  tr: (
    <div className="legal-body">
      <h3>§ 1 Kapsam</h3>
      <p>Bu Genel Koşullar, Noon Sprachdienst ile müşteri arasındaki tüm çeviri, tercümanlık ve diğer dil hizmetleri sözleşmelerine uygulanır.</p>
      <h3>§ 2 Sözleşme Kurulumu</h3>
      <p>Sözleşme, yazılı veya sözlü sipariş verilmesi ve Noon'un bu siparişi onaylaması ile kurulur. Teklifler, yazılı olarak onaylanana kadar bağlayıcı değildir.</p>
      <h3>§ 3 Hizmetler</h3>
      <p>Noon, kararlaştırılan sipariş onayına göre çeviri, tercümanlık, onaylı çeviri ve teknik çeviri hizmetleri sunar. Onaylı çeviriler, devlet tarafından tanınan yeminli çevirmenler tarafından hazırlanır.</p>
      <h3>§ 4 Fiyatlar ve Ödeme</h3>
      <p>Kararlaştırılan veya web sitesinde belirtilen fiyatlar geçerlidir; bu fiyatlara yasal KDV eklenir. Ödeme, fatura alındığında yapılmalıdır.</p>
      <h3>§ 5 Teslimat Süreleri</h3>
      <p>Kararlaştırılan teslimat tarihleri bağlayıcıdır. Öngörülemeyen gecikmeler derhal müşteriye bildirilir. Ekspres siparişler ayrıca kararlaştırılır.</p>
      <h3>§ 6 Şikayetler</h3>
      <p>Eksiklikler, teslimattan itibaren 14 gün içinde yazılı olarak bildirilmelidir. Noon'un düzeltme hakkı saklıdır.</p>
      <h3>§ 7 Sorumluluk</h3>
      <p>Noon, kast ve ağır ihmal durumlarında yasal hükümlere göre sorumludur. Hafif ihmal durumunda sorumluluk öngörülebilir zararlarla sınırlıdır.</p>
      <h3>§ 8 Gizlilik</h3>
      <p>İletilen tüm belgeler gizli tutulur. Personel ve çevirmenler gizlilik yükümlülüğüne tabidir.</p>
      <h3>§ 9 Yetki Alanı</h3>
      <p>Alman hukuku geçerlidir. Tacirler ve kamu hukuku tüzel kişileri için yetki alanı Osnabrück'tür.</p>
      <p style={{ marginTop: 32, fontSize: 13, color: '#888' }}>Tarih: {new Date().getFullYear()} — Noon Sprachdienst, Möserstraße 14, 49074 Osnabrück</p>
    </div>
  ),
  ru: (
    <div className="legal-body">
      <h3>§ 1 Область применения</h3>
      <p>Настоящие Общие условия применяются ко всем договорам между Noon Sprachdienst и заказчиком по услугам письменного перевода, устного перевода и иным языковым услугам.</p>
      <h3>§ 2 Заключение договора</h3>
      <p>Договор заключается путём письменного или устного размещения заказа и его подтверждения со стороны Noon. Коммерческие предложения не являются обязательными до письменного подтверждения.</p>
      <h3>§ 3 Услуги</h3>
      <p>Noon оказывает услуги письменного и устного перевода, заверенного и специализированного перевода согласно согласованному подтверждению заказа. Заверенные переводы выполняются государственно признанными присяжными переводчиками.</p>
      <h3>§ 4 Цены и оплата</h3>
      <p>Применяются согласованные или указанные на сайте цены плюс применимый НДС. Оплата производится после выставления счёта.</p>
      <h3>§ 5 Сроки поставки</h3>
      <p>Согласованные сроки поставки являются обязательными. О непредвиденных задержках заказчик уведомляется незамедлительно. Срочные заказы согласуются отдельно.</p>
      <h3>§ 6 Рекламации</h3>
      <p>Недостатки необходимо сообщать в письменной форме в течение 14 дней с момента поставки. Noon имеет право на устранение недостатков.</p>
      <h3>§ 7 Ответственность</h3>
      <p>Noon несёт ответственность за умысел и грубую халатность в соответствии с законодательными положениями. При лёгкой халатности ответственность ограничивается предвидимым ущербом.</p>
      <h3>§ 8 Конфиденциальность</h3>
      <p>Все переданные документы обрабатываются конфиденциально. Сотрудники и переводчики обязаны соблюдать конфиденциальность.</p>
      <h3>§ 9 Юрисдикция</h3>
      <p>Применяется немецкое право. Местом рассмотрения споров для коммерческих организаций и юридических лиц публичного права является Оснабрюк.</p>
      <p style={{ marginTop: 32, fontSize: 13, color: '#888' }}>Актуально с: {new Date().getFullYear()} — Noon Sprachdienst, Möserstraße 14, 49074 Osnabrück</p>
    </div>
  ),
  fr: (
    <div className="legal-body">
      <h3>§ 1 Champ d'application</h3>
      <p>Les présentes CGV s'appliquent à tous les contrats entre Noon Sprachdienst et le client concernant des services de traduction, d'interprétation et autres services linguistiques.</p>
      <h3>§ 2 Formation du contrat</h3>
      <p>Le contrat est formé par la passation d'une commande écrite ou orale et sa confirmation par Noon. Les devis ne sont pas contraignants jusqu'à confirmation écrite.</p>
      <h3>§ 3 Prestations</h3>
      <p>Noon fournit des traductions, des interprétations, des traductions certifiées et des traductions spécialisées conformément à la confirmation de commande convenue. Les traductions certifiées sont réalisées par des traducteurs assermentés agréés par l'État.</p>
      <h3>§ 4 Prix et paiement</h3>
      <p>Les prix convenus ou affichés sur le site s'appliquent, majorés de la TVA applicable. Le paiement est dû à réception de la facture.</p>
      <h3>§ 5 Délais de livraison</h3>
      <p>Les dates de livraison convenues sont contraignantes. Le client est informé immédiatement en cas de retards imprévus. Les commandes express sont convenues séparément.</p>
      <h3>§ 6 Réclamations</h3>
      <p>Les défauts doivent être signalés par écrit dans les 14 jours suivant la livraison. Noon a le droit de rectifier les défauts.</p>
      <h3>§ 7 Responsabilité</h3>
      <p>Noon est responsable en cas d'intention et de négligence grave conformément aux dispositions légales. La responsabilité pour négligence légère est limitée aux dommages prévisibles.</p>
      <h3>§ 8 Confidentialité</h3>
      <p>Tous les documents transmis sont traités de manière confidentielle. Le personnel et les traducteurs sont tenus au secret.</p>
      <h3>§ 9 Juridiction compétente</h3>
      <p>Le droit allemand s'applique. Le lieu de juridiction est Osnabrück pour les commerçants et personnes morales de droit public.</p>
      <p style={{ marginTop: 32, fontSize: 13, color: '#888' }}>En vigueur au : {new Date().getFullYear()} — Noon Sprachdienst, Möserstraße 14, 49074 Osnabrück</p>
    </div>
  ),
  uk: (
    <div className="legal-body">
      <h3>§ 1 Сфера застосування</h3>
      <p>Ці Загальні умови застосовуються до всіх договорів між Noon Sprachdienst та замовником щодо послуг письмового перекладу, усного перекладу та інших мовних послуг.</p>
      <h3>§ 2 Укладення договору</h3>
      <p>Договір укладається шляхом письмового або усного розміщення замовлення та його підтвердження з боку Noon. Комерційні пропозиції є необов'язковими до письмового підтвердження.</p>
      <h3>§ 3 Послуги</h3>
      <p>Noon надає послуги письмового та усного перекладу, засвідченого та спеціалізованого перекладу відповідно до погодженого підтвердження замовлення. Засвідчені переклади виконуються державно визнаними присяжними перекладачами.</p>
      <h3>§ 4 Ціни та оплата</h3>
      <p>Застосовуються погоджені або вказані на сайті ціни плюс чинний ПДВ. Оплата здійснюється після виставлення рахунку.</p>
      <h3>§ 5 Терміни доставки</h3>
      <p>Погоджені терміни доставки є обов'язковими. Замовник негайно повідомляється про непередбачені затримки. Термінові замовлення погоджуються окремо.</p>
      <h3>§ 6 Рекламації</h3>
      <p>Недоліки необхідно повідомляти письмово протягом 14 днів з моменту доставки. Noon має право на усунення недоліків.</p>
      <h3>§ 7 Відповідальність</h3>
      <p>Noon несе відповідальність за умисел та грубу недбалість відповідно до законодавчих положень. При легкій недбалості відповідальність обмежується передбачуваними збитками.</p>
      <h3>§ 8 Конфіденційність</h3>
      <p>Всі передані документи обробляються конфіденційно. Співробітники та перекладачі зобов'язані дотримуватися конфіденційності.</p>
      <h3>§ 9 Юрисдикція</h3>
      <p>Застосовується німецьке право. Місцем розгляду спорів для комерційних організацій та юридичних осіб публічного права є Оснабрюк.</p>
      <p style={{ marginTop: 32, fontSize: 13, color: '#888' }}>Чинно з: {new Date().getFullYear()} — Noon Sprachdienst, Möserstraße 14, 49074 Osnabrück</p>
    </div>
  ),
};

/* ── Tab labels per language ── */
const TAB_LABELS = {
  de: { impressum: 'Impressum', datenschutz: 'Datenschutz', agb: 'AGB', close: 'Schließen' },
  en: { impressum: 'Imprint',   datenschutz: 'Privacy',     agb: 'T&Cs', close: 'Close' },
  ar: { impressum: 'الإفصاح',   datenschutz: 'الخصوصية',   agb: 'الشروط', close: 'إغلاق' },
  tr: { impressum: 'Künye',     datenschutz: 'Gizlilik',    agb: 'Koşullar', close: 'Kapat' },
  ru: { impressum: 'Выходные данные', datenschutz: 'Конфиденциальность', agb: 'Условия', close: 'Закрыть' },
  fr: { impressum: 'Mentions légales', datenschutz: 'Confidentialité', agb: 'CGV', close: 'Fermer' },
  uk: { impressum: 'Відомості', datenschutz: 'Конфіденційність', agb: 'Умови', close: 'Закрити' },
};

/* ── Page titles per language ── */
const PAGE_TITLES = {
  de: { impressum: 'Impressum', datenschutz: 'Datenschutzerklärung', agb: 'Allgemeine Geschäftsbedingungen' },
  en: { impressum: 'Legal Notice', datenschutz: 'Privacy Policy', agb: 'Terms & Conditions' },
  ar: { impressum: 'الإفصاح القانوني', datenschutz: 'سياسة الخصوصية', agb: 'الشروط والأحكام العامة' },
  tr: { impressum: 'Künye', datenschutz: 'Gizlilik Politikası', agb: 'Genel Koşullar' },
  ru: { impressum: 'Выходные данные', datenschutz: 'Политика конфиденциальности', agb: 'Общие условия' },
  fr: { impressum: 'Mentions légales', datenschutz: 'Politique de confidentialité', agb: 'Conditions générales de vente' },
  uk: { impressum: 'Вихідний лист', datenschutz: 'Політика конфіденційності', agb: 'Загальні умови' },
};

export default function LegalModal() {
  const [open, setOpen] = useState(null); // 'impressum' | 'datenschutz' | 'agb' | null
  const { lang } = useI18n();

  useEffect(() => {
    const handler = (e) => setOpen(e.detail);
    window.addEventListener('openLegal', handler);
    return () => window.removeEventListener('openLegal', handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const tabs = TAB_LABELS[lang] || TAB_LABELS.de;
  const titles = PAGE_TITLES[lang] || PAGE_TITLES.de;
  const isRtl = lang === 'ar';

  const getBody = () => {
    if (open === 'impressum') return <ImpressumBody lang={lang} />;
    if (open === 'datenschutz') return DATENSCHUTZ[lang] || DATENSCHUTZ.de;
    if (open === 'agb') return AGB[lang] || AGB.de;
    return null;
  };

  return (
    <div
      className="legal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={titles[open]}
      dir={isRtl ? 'rtl' : 'ltr'}
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(null); }}
    >
      <div className="legal-modal">
        <div className="legal-header">
          <h2>{titles[open]}</h2>
          <button
            className="legal-close"
            type="button"
            aria-label={tabs.close}
            onClick={() => setOpen(null)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div className="legal-scroll">
          {getBody()}
        </div>
        <div className="legal-footer">
          <div className="legal-tabs">
            {['impressum', 'datenschutz', 'agb'].map((key) => (
              <button
                key={key}
                className={`legal-tab${open === key ? ' active' : ''}`}
                type="button"
                onClick={() => setOpen(key)}
              >
                {tabs[key]}
              </button>
            ))}
          </div>
          <button className="btn btn-primary btn-sm" type="button" onClick={() => setOpen(null)}>
            {tabs.close}
          </button>
        </div>
      </div>
    </div>
  );
}
