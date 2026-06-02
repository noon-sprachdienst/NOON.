import { useEffect, useRef, useState } from 'react';

const COLORS = ['#06b6d4', '#3b82f6', '#6366f1'];
const RING_PROPAGATION_SPEED = 3;

const routes = [
  { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.1 },
  { order: 1, startLat: 28.6139, startLng: 77.209, endLat: 3.139, endLng: 101.6869, arcAlt: 0.2 },
  { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -1.303396, endLng: 36.852443, arcAlt: 0.5 },
  { order: 2, startLat: 1.3521, startLng: 103.8198, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.2 },
  { order: 2, startLat: 51.5072, startLng: -0.1276, endLat: 3.139, endLng: 101.6869, arcAlt: 0.3 },
  { order: 2, startLat: -15.785493, startLng: -47.909029, endLat: 36.162809, endLng: -115.119411, arcAlt: 0.3 },
  { order: 3, startLat: -33.8688, startLng: 151.2093, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3 },
  { order: 3, startLat: 21.3099, startLng: -157.8581, endLat: 40.7128, endLng: -74.006, arcAlt: 0.3 },
  { order: 3, startLat: -6.2088, startLng: 106.8456, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3 },
  { order: 4, startLat: 11.986597, startLng: 8.571831, endLat: -15.595412, endLng: -56.05918, arcAlt: 0.5 },
  { order: 4, startLat: -34.6037, startLng: -58.3816, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.7 },
  { order: 4, startLat: 51.5072, startLng: -0.1276, endLat: 48.8566, endLng: 2.3522, arcAlt: 0.1 },
  { order: 5, startLat: 14.5995, startLng: 120.9842, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3 },
  { order: 5, startLat: 1.3521, startLng: 103.8198, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.2 },
  { order: 5, startLat: 34.0522, startLng: -118.2437, endLat: 48.8566, endLng: 2.3522, arcAlt: 0.2 },
  { order: 6, startLat: -15.432563, startLng: 28.315853, endLat: 1.094136, endLng: -63.34546, arcAlt: 0.7 },
  { order: 6, startLat: 37.5665, startLng: 126.978, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.1 },
  { order: 6, startLat: 22.3193, startLng: 114.1694, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3 },
  { order: 7, startLat: 48.8566, startLng: 2.3522, endLat: 52.52, endLng: 13.405, arcAlt: 0.1 },
  { order: 7, startLat: 52.52, startLng: 13.405, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2 },
  { order: 8, startLat: -8.833221, startLng: 13.264837, endLat: -33.936138, endLng: 18.436529, arcAlt: 0.2 },
  { order: 8, startLat: 49.2827, startLng: -123.1207, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.2 },
  { order: 9, startLat: 22.3193, startLng: 114.1694, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.7 },
  { order: 10, startLat: -22.9068, startLng: -43.1729, endLat: 28.6139, endLng: 77.209, arcAlt: 0.7 },
  { order: 10, startLat: 34.0522, startLng: -118.2437, endLat: 31.2304, endLng: 121.4737, arcAlt: 0.3 },
  { order: 11, startLat: 41.9028, startLng: 12.4964, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2 },
  { order: 12, startLat: 35.6762, startLng: 139.6503, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.2 },
  { order: 13, startLat: 52.52, startLng: 13.405, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3 },
  { order: 14, startLat: -33.936138, startLng: 18.436529, endLat: 21.395643, endLng: 39.883798, arcAlt: 0.3 },
].map((route, index) => ({ ...route, color: COLORS[index % COLORS.length] }));

function hexToRgb(hex) {
  const value = Number.parseInt(hex.slice(1), 16);
  return { r: value >> 16, g: (value >> 8) & 255, b: value & 255 };
}

function buildRingPoints() {
  const points = routes.flatMap((route) => {
    const { r, g, b } = hexToRgb(route.color);
    const point = (lat, lng) => ({
      lat,
      lng,
      size: 4,
      color: (time) => `rgba(${r}, ${g}, ${b}, ${1 - time})`,
    });
    return [point(route.startLat, route.startLng), point(route.endLat, route.endLng)];
  });

  return points.filter((point, index, list) => (
    list.findIndex((candidate) => candidate.lat === point.lat && candidate.lng === point.lng) === index
  ));
}

export default function HeroGlobe() {
  const mountRef = useRef(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let cancelled = false;
    let frameId;
    let ringInterval;
    let renderer;
    let controls;
    let resizeObserver;
    let scene;
    let firstFrame = true;
    let idleId;

    const setup = async () => {
      const lowPower = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
      const [THREE, { OrbitControls }, { default: ThreeGlobe }, response] = await Promise.all([
        import('three'),
        import('three/examples/jsm/controls/OrbitControls.js'),
        import('three-globe'),
        fetch('/data/globe.json'),
      ]);
      if (!response.ok) throw new Error(`Unable to load globe data (${response.status})`);
      const countries = await response.json();
      if (cancelled) return;

      scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0xffffff, 400, 2000);

      const camera = new THREE.PerspectiveCamera(50, 1.2, 180, 1800);
      camera.position.set(0, 0, 300);

      renderer = new THREE.WebGLRenderer({ antialias: !lowPower, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1 : 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.className = 'hero-globe-canvas';
      renderer.domElement.setAttribute('aria-label', 'Interactive rotating globe with international language service connections');
      renderer.domElement.setAttribute('role', 'img');
      mount.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0x38bdf8, 0.6));
      const leftLight = new THREE.DirectionalLight(0xffffff, 1);
      leftLight.position.set(-400, 100, 400);
      scene.add(leftLight);
      const topLight = new THREE.DirectionalLight(0xffffff, 1);
      topLight.position.set(-200, 500, 200);
      scene.add(topLight);
      const pointLight = new THREE.PointLight(0xffffff, 0.8);
      pointLight.position.set(-200, 500, 200);
      scene.add(pointLight);

      const ringPoints = lowPower ? [] : buildRingPoints();
      const activeRoutes = lowPower ? routes.filter((_, index) => index % 2 === 0) : routes;
      const globe = new ThreeGlobe({ waitForGlobeReady: true, animateIn: true })
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(lowPower ? 2 : 3)
        .hexPolygonMargin(0.7)
        .hexPolygonColor(() => 'rgba(255,255,255,0.7)')
        .showAtmosphere(true)
        .atmosphereColor('#ffffff')
        .atmosphereAltitude(0.1)
        .arcsData(activeRoutes)
        .arcStartLat('startLat')
        .arcStartLng('startLng')
        .arcEndLat('endLat')
        .arcEndLng('endLng')
        .arcColor('color')
        .arcAltitude('arcAlt')
        .arcStroke(() => 0.3)
        .arcDashLength(0.9)
        .arcDashInitialGap('order')
        .arcDashGap(15)
        .arcDashAnimateTime(1000)
        .ringsData([])
        .ringColor((point) => point.color)
        .ringMaxRadius(3)
        .ringPropagationSpeed(RING_PROPAGATION_SPEED)
        .ringRepeatPeriod(900);

      const globeMaterial = globe.globeMaterial();
      globeMaterial.color = new THREE.Color('#062056');
      globeMaterial.emissive = new THREE.Color('#062056');
      globeMaterial.emissiveIntensity = 0.1;
      globeMaterial.shininess = 0.9;
      scene.add(globe);

      if (!lowPower) {
        ringInterval = window.setInterval(() => {
          const selected = ringPoints.filter((_, index) => (index + Math.floor(Date.now() / 2000)) % 3 !== 0);
          globe.ringsData(selected);
        }, 2000);
      }

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.rotateSpeed = 0.45;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.minPolarAngle = Math.PI / 3.5;
      controls.maxPolarAngle = Math.PI - (Math.PI / 3);

      const resize = () => {
        const { width, height } = mount.getBoundingClientRect();
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);
      resize();

      const animate = () => {
        controls.update();
        renderer.render(scene, camera);
        if (firstFrame && !cancelled) {
          firstFrame = false;
          setStatus('ready');
        }
        frameId = requestAnimationFrame(animate);
      };
      animate();
    };

    const start = () => setup().catch((error) => {
        console.error('Unable to initialize hero globe', error);
        if (!cancelled) setStatus('error');
      });
    if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(start, { timeout: 450 });
    else idleId = window.setTimeout(start, 120);

    return () => {
      cancelled = true;
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      cancelAnimationFrame(frameId);
      window.clearInterval(ringInterval);
      resizeObserver?.disconnect();
      controls?.dispose();
      scene?.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material?.dispose();
        }
      });
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, []);

  return (
    <div className={`hero-globe hero-globe--${status}`} ref={mountRef} />
  );
}
