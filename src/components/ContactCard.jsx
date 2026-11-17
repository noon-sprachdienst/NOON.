import { CONTACT } from '../config/contact.js';
import { LEGAL_INFO } from '../data/legalInfo.js';
import { CmsText } from './cms/Editable.jsx';

const BRANCH_LABEL = { de: 'Standort', en: 'Office', ar: 'الفرع', tr: 'Şube', ru: 'Филиал', fr: 'Agence', uk: 'Філія' };

const PhoneIcon = () => (
  <div className="info-ic" aria-hidden="true">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 16.92V21a2 2 0 01-2 2A19 19 0 011 4a2 2 0 012-2h4a2 2 0 012 2 12 12 0 00.7 4 2 2 0 01-.45 2L7 12a16 16 0 006 6l2-1.25a2 2 0 012-.45 12 12 0 004 .7 2 2 0 011 1.92z" />
    </svg>
  </div>
);
const MailIcon = () => (
  <div className="info-ic" aria-hidden="true">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 7l9 6 9-6" />
      <rect x="3" y="5" width="18" height="14" rx="2" />
    </svg>
  </div>
);
const PinIcon = () => (
  <div className="info-ic" aria-hidden="true">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  </div>
);
const WhatsAppIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.824 11.824 0 013.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24z" />
  </svg>
);

// Contact card next to the quote form. Its texts, hiding and style come from the CMS
// (config.contact, keys "contact.*"). Phone, e-mail and address are shared site data
// (config/contact.js); on an office page (`branch`) the office's own details are shown.
export default function ContactCard({ branch = null, lang }) {
  const phones = branch?.phone ? [branch.phone] : CONTACT.phones;
  const whatsappUrl = branch?.whatsappUrl || CONTACT.whatsappUrl;
  return (
    <div className="contact-card" data-reveal="" style={{ '--ri': 0 }}>
      <CmsText k="contact.title" as="h3" />
      <CmsText k="contact.sub" as="p" className="sub" />

      <div className="info-list">
        <div className="info-row">
          <PhoneIcon />
          <div>
            <CmsText k="contact.phoneLabel" as="div" className="info-lbl" />
            <div className="info-val info-val-stack">
              {phones.map((phone) => <a key={phone.href} href={phone.href}>{phone.label}</a>)}
            </div>
          </div>
        </div>

        <div className="info-row">
          <MailIcon />
          <div>
            <CmsText k="contact.emailLabel" as="div" className="info-lbl" />
            <div className="info-val"><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div>
          </div>
        </div>

        <div className="info-row">
          <PinIcon />
          <div>
            {/* Office pages name the office ("Standort Kiel"); the CMS text is the head-office label. */}
            {branch
              ? <div className="info-lbl">{`${BRANCH_LABEL[lang] || BRANCH_LABEL.de} ${branch.city}`}</div>
              : <CmsText k="contact.hqLabel" as="div" className="info-lbl" />}
            <div className="info-val">{branch ? `${branch.street} · ${branch.postalCode} ${branch.city}` : `${LEGAL_INFO.street} · ${LEGAL_INFO.postalCity.replace(/^\d+\s*/, '')}`}</div>
          </div>
        </div>
      </div>

      <CmsText k="contact.hours" as="div" className="contact-hours" />

      <CmsText k="contact.whatsapp" as="a" className="btn wa-btn" href={whatsappUrl} target="_blank" rel="noopener noreferrer"
        before={<WhatsAppIcon />} />
    </div>
  );
}
