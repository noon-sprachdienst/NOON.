import { useState } from 'react';
import { useI18n } from '../hooks/useI18n';

const LOCATIONS = [
  { id: 'osnabrueck', tag: '01 · HQ', city: 'Osnabrück', addr: 'Möserstr. 14\n49074 Osnabrück', maps: 'https://maps.google.com/?q=Möserstraße+14,+49074+Osnabrück' },
  { id: 'stuttgart',  tag: '02',       city: 'Stuttgart',  addr: 'Königstr. 82\n70173 Stuttgart',   maps: 'https://maps.google.com/?q=Königstraße+82,+70173+Stuttgart' },
  { id: 'berlin',     tag: '03',       city: 'Berlin',     addr: 'Friedrichstr. 191\n10117 Berlin', maps: 'https://maps.google.com/?q=Friedrichstraße+191,+10117+Berlin' },
  { id: 'bielefeld',  tag: '04',       city: 'Bielefeld',  addr: 'Niederwall 21\n33602 Bielefeld',  maps: 'https://maps.google.com/?q=Niederwall+21,+33602+Bielefeld' },
  { id: 'mainz',      tag: '05',       city: 'Mainz',      addr: 'Schillerplatz 7\n55116 Mainz',    maps: 'https://maps.google.com/?q=Schillerplatz+7,+55116+Mainz' },
  { id: 'kiel',       tag: '06',       city: 'Kiel',       addr: 'Holstenstr. 64\n24103 Kiel',      maps: 'https://maps.google.com/?q=Holstenstraße+64,+24103+Kiel' },
];

export default function Beratung() {
  const { t } = useI18n();
  const [active, setActive] = useState('osnabrueck');

  return (
    <section className="beratung" id="beratung" aria-labelledby="beratung-heading">
      <div className="container">
        <div className="beratung-top">
          <div className="beratung-visual" data-reveal="" style={{ '--ri': 0 }}>
            <img
              src="/assets/Voice-chat-pana.svg"
              alt=""
              aria-hidden="true"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 20 }}
            />
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
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  ),
                  text: t('beratung.pers.info1'),
                },
                {
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  ),
                  text: t('foot.hours'),
                },
                {
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M22 16.92V21a2 2 0 01-2 2A19 19 0 011 4a2 2 0 012-2h4a2 2 0 012 2 12 12 0 00.7 4 2 2 0 01-.45 2L7 12a16 16 0 006 6l2-1.25a2 2 0 012-.45 12 12 0 004 .7 2 2 0 011 1.92z"/>
                    </svg>
                  ),
                  text: '+49 541 80 14 84 00',
                },
              ].map(({ icon, text }, i) => (
                <div key={i} className="beratung-info-row">
                  {icon}
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <div className="beratung-ctas">
              <a href="#contact" className="btn btn-primary">
                {t('beratung.appt')} <span className="arrow">→</span>
              </a>
              <a href="tel:+4916095627666" className="btn btn-secondary">
                {t('beratung.cta2')}
              </a>
            </div>
          </div>
        </div>

        {/* Location selector */}
        <div className="location-selector" data-reveal="" style={{ '--ri': 2 }}>
          <div className="loc-label">{t('beratung.loc.select')}</div>
          <div className="loc-grid" role="group" aria-label="Standorte">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                type="button"
                className={`loc-btn${active === loc.id ? ' active' : ''}`}
                onClick={() => setActive(loc.id)}
                aria-pressed={active === loc.id}
              >
                <span className="loc-num">{loc.tag}</span>
                <span className="loc-city">{loc.city}</span>
                <span className="loc-addr">{loc.addr.split('\n')[1]}</span>
              </button>
            ))}
          </div>
          {/* Active location detail */}
          {LOCATIONS.filter(l => l.id === active).map((loc) => (
            <div key={loc.id} style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
              <a
                href={loc.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {t('map.open')} — {loc.city}, {loc.addr.split('\n')[0]}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
