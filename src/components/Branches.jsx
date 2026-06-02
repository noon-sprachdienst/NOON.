import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import { useAutoCarousel } from '../hooks/useAutoCarousel';

const BRANCHES = [
  { id: 'osnabrueck', tag: '01 · HQ', city: 'Osnabrück', addr: 'Möserstr. 14, 49074 Osnabrück',     lat: 52.2770, lng: 8.0432, hoursKey: 'branches.hours.osnabrueck', maps: 'https://maps.google.com/?q=Möserstraße+14,+49074+Osnabrück' },
  { id: 'stuttgart',  tag: '02',       city: 'Stuttgart',  addr: 'Königstr. 82, 70173 Stuttgart',     lat: 48.7784, lng: 9.1800, hoursKey: 'branches.hours.stuttgart',  maps: 'https://maps.google.com/?q=Königstraße+82,+70173+Stuttgart' },
  { id: 'berlin',     tag: '03',       city: 'Berlin',     addr: 'Friedrichstr. 191, 10117 Berlin',   lat: 52.5225, lng: 13.3870, hoursKey: 'branches.hours.berlin',   maps: 'https://maps.google.com/?q=Friedrichstraße+191,+10117+Berlin' },
  { id: 'bielefeld',  tag: '04',       city: 'Bielefeld',  addr: 'Niederwall 21, 33602 Bielefeld',    lat: 52.0211, lng: 8.5325, hoursKey: 'branches.hours.bielefeld', maps: 'https://maps.google.com/?q=Niederwall+21,+33602+Bielefeld' },
  { id: 'mainz',      tag: '05',       city: 'Mainz',      addr: 'Schillerplatz 7, 55116 Mainz',      lat: 49.9997, lng: 8.2721, hoursKey: 'branches.hours.mainz',     maps: 'https://maps.google.com/?q=Schillerplatz+7,+55116+Mainz' },
  { id: 'kiel',       tag: '06',       city: 'Kiel',       addr: 'Holstenstr. 64, 24103 Kiel',        lat: 54.3213, lng: 10.1350, hoursKey: 'branches.hours.kiel',     maps: 'https://maps.google.com/?q=Holstenstraße+64,+24103+Kiel' },
];

export default function Branches() {
  const { t } = useI18n();
  const [externalMapsAllowed, setExternalMapsAllowed] = useState(() => (
    localStorage.getItem('noon_cookie') === 'all'
  ));
  const { interactionProps, scrollerRef, scrollCards } = useAutoCarousel({
    cardSelector: '.map-card',
    gap: 16,
    speed: 21,
  });

  useEffect(() => {
    const updateConsent = (event) => setExternalMapsAllowed(event.detail === 'all');
    window.addEventListener('noonConsentChanged', updateConsent);
    return () => window.removeEventListener('noonConsentChanged', updateConsent);
  }, []);

  return (
    <section className="branches" id="branches" aria-labelledby="branches-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="branches-heading" data-reveal="">{t('branches.title')}</h2>
          <p data-reveal="" style={{ '--ri': 1 }}>{t('branches.sub')}</p>
        </div>
        <div className="carousel-actions" aria-label="Standorte scrollen">
          <button type="button" className="scroll-btn" onClick={() => scrollCards(-1)} aria-label="Vorherige Standorte">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button type="button" className="scroll-btn" onClick={() => scrollCards(1)} aria-label="Nächste Standorte">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
        <div
          className="grid hide-scrollbar"
          ref={scrollerRef}
          {...interactionProps}
        >
          {BRANCHES.map((branch, i) => (
            <BranchCard key={branch.id} branch={branch} t={t} index={i} externalMapsAllowed={externalMapsAllowed} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BranchCard({ branch, t, index, externalMapsAllowed }) {
  const cardRef = useRef(null);
  const mapRef = useRef(null);
  const leafletRef = useRef(null);
  const [mapEnabled, setMapEnabled] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!externalMapsAllowed || !card || mapEnabled) return undefined;

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      setMapEnabled(true);
      observer.disconnect();
    }, { rootMargin: '160px' });

    observer.observe(card);
    return () => observer.disconnect();
  }, [externalMapsAllowed, mapEnabled]);

  useEffect(() => {
    if (!mapEnabled || !mapRef.current || leafletRef.current) return undefined;

    let cancelled = false;
    import('leaflet').then((module) => {
      if (cancelled || !mapRef.current || leafletRef.current) return;
      const L = module.default;
      const map = L.map(mapRef.current, {
        center: [branch.lat, branch.lng],
        zoom: 15,
        zoomControl: true,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: false,
        doubleClickZoom: true,
        boxZoom: false,
        keyboard: false,
      });
      leafletRef.current = map;
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
      }).addTo(map);
      const icon = L.divIcon({
        className: '',
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 10.5 16 26 16 26S32 26.5 32 16C32 7.163 24.837 0 16 0z" fill="#A4192C"/>
          <circle cx="16" cy="16" r="7" fill="white"/>
        </svg>`,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
      });
      L.marker([branch.lat, branch.lng], { icon }).addTo(map);
    }).catch(() => {});

    return () => {
      cancelled = true;
      leafletRef.current?.remove();
      leafletRef.current = null;
    };
  }, [mapEnabled, branch.lat, branch.lng]);

  return (
    <article className="map-card" data-reveal="" style={{ '--ri': index % 3 }} aria-label={`Büro ${branch.city}`} ref={cardRef}>
      <div className="map-canvas">
        <img
          className="map-preview"
          src={`/assets/maps/${branch.id}.jpg`}
          alt=""
          loading="lazy"
          decoding="async"
          draggable="false"
        />
        {mapEnabled && <div className="map-live" ref={mapRef} />}
        <span className="map-attribution">© OpenStreetMap contributors</span>
      </div>
      <div className="map-card-body">
        <div className="city-row">
          <span className="city">{branch.city}</span>
          <span className="num-tag">{branch.tag}</span>
        </div>
        <div className="addr">{branch.addr}</div>
        <div className="open">{t('foot.hours')}</div>
        <div style={{ marginTop: 14 }}>
          <a
            href={branch.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {t('map.open')}
          </a>
        </div>
      </div>
    </article>
  );
}
