import { useState } from 'react';
import { Clock3, Lock, MapPin, Phone, Send, User } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

const LOCATIONS = [
  { id: 'osnabrueck', tag: '01 · HQ', city: 'Osnabrück', zip: '49074 Osnabrück', maps: 'https://maps.google.com/?q=Möserstr.+14,+49074+Osnabrück' },
  { id: 'stuttgart', tag: '02', city: 'Stuttgart', zip: '70173 Stuttgart', maps: 'https://maps.google.com/?q=Königstr.+82,+70173+Stuttgart' },
  { id: 'berlin', tag: '03', city: 'Berlin', zip: '10117 Berlin', maps: 'https://maps.google.com/?q=Friedrichstr.+191,+10117+Berlin' },
  { id: 'bielefeld', tag: '04', city: 'Bielefeld', zip: '33602 Bielefeld', maps: 'https://maps.google.com/?q=Niederwall+21,+33602+Bielefeld' },
  { id: 'mainz', tag: '05', city: 'Mainz', zip: '55116 Mainz', maps: 'https://maps.google.com/?q=Schillerplatz+7,+55116+Mainz' },
  { id: 'kiel', tag: '06', city: 'Kiel', zip: '24103 Kiel', maps: 'https://maps.google.com/?q=Holstenstr.+64,+24103+Kiel' },
];

const COPY = {
  de: {
    eyebrow: 'Standort auswählen',
    maps: 'In Google Maps öffnen',
    title: 'Termin anfragen',
    sub: 'Füllen Sie das Formular aus und wir melden uns schnellstmöglich bei Ihnen.',
    phone: 'Telefonnummer',
    phonePlaceholder: 'z. B. +49 160 1234567',
    time: 'Gewünschte Uhrzeit',
    timePlaceholder: 'z. B. 14:30 Uhr',
    name: 'Ihr Name',
    namePlaceholder: 'z. B. Max Mustermann',
    submit: 'Anfrage senden',
    sending: 'Anfrage wird gesendet ...',
    sent: 'Anfrage gesendet. Wir melden uns schnellstmöglich.',
    error: 'Senden fehlgeschlagen. Bitte versuchen Sie es erneut.',
    privacy: 'Ihre Daten werden vertraulich behandelt.',
  },
  en: {
    eyebrow: 'Choose location',
    maps: 'Open in Google Maps',
    title: 'Request an appointment',
    sub: 'Fill in the form and we will get back to you as quickly as possible.',
    phone: 'Phone number',
    phonePlaceholder: 'e.g. +49 160 1234567',
    time: 'Preferred time',
    timePlaceholder: 'e.g. 2:30 PM',
    name: 'Your name',
    namePlaceholder: 'e.g. Max Mustermann',
    submit: 'Send request',
    sending: 'Sending request ...',
    sent: 'Request sent. We will contact you as quickly as possible.',
    error: 'Could not send. Please try again.',
    privacy: 'Your data will be treated confidentially.',
  },
  ar: {
    eyebrow: 'اختر الفرع',
    maps: 'افتح في خرائط Google',
    title: 'طلب موعد',
    sub: 'املأ النموذج وسنتواصل معك في أسرع وقت ممكن.',
    phone: 'رقم الهاتف',
    phonePlaceholder: 'مثال: +49 160 1234567',
    time: 'الوقت المطلوب',
    timePlaceholder: 'مثال: 14:30',
    name: 'اسمك',
    namePlaceholder: 'مثال: ماكس موسترمان',
    submit: 'إرسال الطلب',
    sending: 'جار إرسال الطلب ...',
    sent: 'تم إرسال الطلب. سنتواصل معك في أسرع وقت ممكن.',
    error: 'تعذر الإرسال. يرجى المحاولة مرة أخرى.',
    privacy: 'سيتم التعامل مع بياناتك بسرية.',
  },
  tr: {
    eyebrow: 'Şube seçin',
    maps: 'Google Maps’te aç',
    title: 'Randevu iste',
    sub: 'Formu doldurun, size en kısa sürede geri dönüş yapalım.',
    phone: 'Telefon numarası',
    phonePlaceholder: 'örn. +49 160 1234567',
    time: 'İstenen saat',
    timePlaceholder: 'örn. 14:30',
    name: 'Adınız',
    namePlaceholder: 'örn. Max Mustermann',
    submit: 'Talep gönder',
    sending: 'Talep gönderiliyor ...',
    sent: 'Talep gönderildi. En kısa sürede sizinle iletişime geçeceğiz.',
    error: 'Gönderilemedi. Lütfen tekrar deneyin.',
    privacy: 'Verileriniz gizli tutulur.',
  },
  ru: {
    eyebrow: 'Выберите филиал',
    maps: 'Открыть в Google Maps',
    title: 'Запросить встречу',
    sub: 'Заполните форму, и мы свяжемся с вами как можно скорее.',
    phone: 'Номер телефона',
    phonePlaceholder: 'например, +49 160 1234567',
    time: 'Желаемое время',
    timePlaceholder: 'например, 14:30',
    name: 'Ваше имя',
    namePlaceholder: 'например, Max Mustermann',
    submit: 'Отправить запрос',
    sending: 'Отправка запроса ...',
    sent: 'Запрос отправлен. Мы свяжемся с вами как можно скорее.',
    error: 'Не удалось отправить. Попробуйте еще раз.',
    privacy: 'Ваши данные будут обработаны конфиденциально.',
  },
  fr: {
    eyebrow: 'Choisir un bureau',
    maps: 'Ouvrir dans Google Maps',
    title: 'Demander un rendez-vous',
    sub: 'Remplissez le formulaire et nous vous recontacterons au plus vite.',
    phone: 'Numéro de téléphone',
    phonePlaceholder: 'ex. +49 160 1234567',
    time: 'Heure souhaitée',
    timePlaceholder: 'ex. 14:30',
    name: 'Votre nom',
    namePlaceholder: 'ex. Max Mustermann',
    submit: 'Envoyer la demande',
    sending: 'Envoi de la demande ...',
    sent: 'Demande envoyée. Nous vous contacterons au plus vite.',
    error: 'Envoi impossible. Veuillez réessayer.',
    privacy: 'Vos données seront traitées de manière confidentielle.',
  },
  uk: {
    eyebrow: 'Оберіть філію',
    maps: 'Відкрити в Google Maps',
    title: 'Запит на зустріч',
    sub: 'Заповніть форму, і ми зв’яжемося з вами якнайшвидше.',
    phone: 'Номер телефону',
    phonePlaceholder: 'наприклад, +49 160 1234567',
    time: 'Бажаний час',
    timePlaceholder: 'наприклад, 14:30',
    name: 'Ваше ім’я',
    namePlaceholder: 'наприклад, Max Mustermann',
    submit: 'Надіслати запит',
    sending: 'Надсилання запиту ...',
    sent: 'Запит надіслано. Ми зв’яжемося з вами якнайшвидше.',
    error: 'Не вдалося надіслати. Спробуйте ще раз.',
    privacy: 'Ваші дані обробляються конфіденційно.',
  },
};

export default function Appointment() {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.de;
  const [activeId, setActiveId] = useState('osnabrueck');
  const [status, setStatus] = useState('idle');
  const [startedAt] = useState(() => Date.now());
  const activeLocation = LOCATIONS.find((location) => location.id === activeId) || LOCATIONS[0];

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('sending');

    try {
      const response = await fetch('/api/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'appointment',
          name: data.get('name'),
          phone: data.get('phone'),
          appointmentTime: data.get('appointmentTime'),
          appointmentLocation: `${activeLocation.city}, ${activeLocation.zip}`,
          message: `Terminwunsch in ${activeLocation.city}: ${data.get('appointmentTime')}`,
          language: lang,
          startedAt,
          website: data.get('website'),
        }),
      });
      if (!response.ok) throw new Error('Delivery failed.');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="appointment-page" aria-labelledby="appointment-heading">
      <div className="appointment-wrap">
        <div className="appointment-location-head">{copy.eyebrow}</div>

        <div className="appointment-locations" role="list" aria-label={copy.eyebrow}>
          {LOCATIONS.map((location) => (
            <button
              type="button"
              key={location.id}
              className={`appointment-location-card${location.id === activeId ? ' active' : ''}`}
              onClick={() => setActiveId(location.id)}
              aria-pressed={location.id === activeId}
            >
              <span>{location.tag}</span>
              <strong>{location.city}</strong>
              <small>{location.zip}</small>
            </button>
          ))}
        </div>

        <a className="appointment-map-link" href={activeLocation.maps} target="_blank" rel="noopener noreferrer">
          <MapPin size={16} />
          <span>{copy.maps} — {activeLocation.city}</span>
        </a>

        <form className="appointment-card" onSubmit={handleSubmit}>
          <div className="appointment-head">
            <h1 id="appointment-heading">{copy.title}</h1>
            <p>{copy.sub}</p>
          </div>

          <label className="appointment-field">
            <span>{copy.phone}</span>
            <div className="appointment-input-wrap">
              <Phone size={19} />
              <input name="phone" type="tel" placeholder={copy.phonePlaceholder} autoComplete="tel" required />
            </div>
          </label>

          <label className="appointment-field">
            <span>{copy.time}</span>
            <div className="appointment-input-wrap">
              <Clock3 size={19} />
              <input name="appointmentTime" type="text" placeholder={copy.timePlaceholder} required />
            </div>
          </label>

          <label className="appointment-field">
            <span>{copy.name}</span>
            <div className="appointment-input-wrap">
              <User size={19} />
              <input name="name" type="text" placeholder={copy.namePlaceholder} autoComplete="name" required />
            </div>
          </label>

          <input className="form-honeypot" type="text" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" />

          {status === 'sent' && <p className="appointment-feedback appointment-feedback--success" role="status">{copy.sent}</p>}
          {status === 'error' && <p className="appointment-feedback appointment-feedback--error" role="alert">{copy.error}</p>}

          <button className="appointment-submit" type="submit" disabled={status === 'sending'}>
            <Send size={20} />
            <span>{status === 'sending' ? copy.sending : copy.submit}</span>
            <span aria-hidden="true">→</span>
          </button>

          <p className="appointment-privacy">
            <Lock size={16} />
            <span>{copy.privacy}</span>
          </p>
        </form>
      </div>
    </section>
  );
}
