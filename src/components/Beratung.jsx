import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEarthAmericas,
  faEnvelopeCircleCheck,
  faLanguage,
  faMessage,
  faPhoneVolume,
} from '@fortawesome/free-solid-svg-icons';
import { Clock3, MapPin, PhoneCall } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { CONTACT } from '../config/contact.js';

export default function Beratung() {
  const { t, lang } = useI18n();
  const appointmentPath = lang && lang !== 'de' ? `/${lang}/termin` : '/termin';

  return (
    <section className="beratung" id="beratung" aria-labelledby="beratung-heading">
      <div className="container">
        <div className="beratung-top">
          <div className="beratung-visual" data-reveal="" style={{ '--ri': 0 }}>
            <ContactOrbitGraphic />
          </div>

          <div className="beratung-text" data-reveal="" style={{ '--ri': 1 }}>
            <div className="beratung-eyebrow">{t('beratung.pers.eyebrow')}</div>
            <h2 id="beratung-heading" className="beratung-h2">
              {t('beratung.pers.h2').split('\n').map((line, index, arr) => (
                <span key={line}>
                  {line}
                  {index < arr.length - 1 ? <br /> : null}
                </span>
              ))}
            </h2>
            <p className="beratung-sub">
              {t('beratung.pers.sub')}
            </p>
            <div className="beratung-info">
              {[
                {
                  icon: <MapPin size={15} strokeWidth={1.8} />,
                  text: t('beratung.pers.info1'),
                },
                {
                  icon: <Clock3 size={15} strokeWidth={1.8} />,
                  text: t('foot.hours'),
                },
                {
                  icon: <PhoneCall size={15} strokeWidth={1.8} />,
                  text: CONTACT.phones[0].label,
                },
              ].map(({ icon, text }, i) => (
                <div key={i} className="beratung-info-row">
                  {icon}
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <div className="beratung-ctas">
              <a href={appointmentPath} className="btn btn-primary">
                {t('beratung.appt')} <span className="arrow">→</span>
              </a>
              <PhoneMenuButton label={t('beratung.cta2')} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneMenuButton({ label }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const closeOnOutsideClick = (event) => {
      if (menuRef.current?.contains(event.target)) return;
      setOpen(false);
    };

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return (
    <div className="beratung-call-menu" ref={menuRef}>
      <button
        type="button"
        className="btn btn-secondary"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
      </button>
      {open && (
        <div className="beratung-call-options" role="menu" aria-label="Telefonnummer auswaehlen">
          {CONTACT.phones.map((phone) => (
            <a key={phone.href} href={phone.href} role="menuitem" onClick={() => setOpen(false)}>
              {phone.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function ContactOrbitGraphic() {
  const orbitItems = [
    {
      className: 'orbit-mail',
      icon: faEnvelopeCircleCheck,
    },
    {
      className: 'orbit-wa',
      src: '/assets/orbit-whatsapp.png',
      alt: 'WhatsApp',
    },
    {
      className: 'orbit-phone',
      icon: faPhoneVolume,
    },
    {
      className: 'orbit-globe',
      icon: faEarthAmericas,
    },
    {
      className: 'orbit-chat',
      icon: faMessage,
    },
    {
      className: 'orbit-hours',
      label: '24/7',
    },
    {
      className: 'orbit-lang',
      icon: faLanguage,
    },
  ];

  return (
    <div className="contact-orbit" aria-hidden="true">
      <div className="contact-orbit-ring" />
      <div className="contact-orbit-center">
        <FontAwesomeIcon icon={faPhoneVolume} />
      </div>
      {orbitItems.map((item) => (
        <div key={item.className} className={`contact-orbit-item ${item.className}`}>
          {item.badge ? <span className="contact-orbit-badge">{item.badge}</span> : null}
          {item.icon ? (
            <FontAwesomeIcon icon={item.icon} />
          ) : item.label ? (
            <span>{item.label}</span>
          ) : (
            <img src={item.src} alt={item.alt || ''} loading="lazy" />
          )}
        </div>
      ))}
    </div>
  );
}
