export const CONTACT = {
  email: 'info@noon-sprachdienst.de',
  whatsappUrl: 'https://wa.me/4916095627666',
  phones: [
    { href: 'tel:+4916095627666', label: '+49 160 956 27 666' },
  ],
};

// Public Google Business Profiles, read from the owner dashboards on 18.11.2026. Used for the
// "Google Maps" and review links and as sameAs in the structured data. Köln and Essen are
// service-area profiles without an office.
export const GOOGLE_PROFILES = {
  osnabrueck: '13887095511845644260',
  stuttgart: '11749183929183528728',
  berlin: '15531121026152172476',
  bielefeld: '2312780833579880556',
  mainz: '11996835313261089182',
  kiel: '18136115173052841764',
  serviceArea1: '13612274780464947385',
  serviceArea2: '5344216374986806367',
};

export const googleProfileUrl = (key) => (GOOGLE_PROFILES[key] ? `https://maps.google.com/?cid=${GOOGLE_PROFILES[key]}` : null);
