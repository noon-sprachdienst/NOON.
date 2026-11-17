import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// Page width per device. Phone and tablet match the widths the site is tested at.
export const DEVICES = { desktop: 1280, tablet: 768, phone: 375 };

// Rules only for the canvas: the site's scroll-in animation never runs here, so its elements
// are shown directly; the page background is the site's.
const CANVAS_CSS = `
html, body { margin: 0; background: #FAF9F6; }
[data-reveal] { opacity: 1 !important; transform: none !important; }
`;

// Shows website sections the way they look on the site: inside a real page (an iframe that
// gets the site's and the admin's CSS) of the chosen device width, scaled down to fit the
// space. Media queries see the device width, so tablet and phone layouts are the real ones.
// Children are rendered into the page with a React portal, so clicking and typing work as in
// the rest of the admin. Reusable for any section or page.
export default function PageCanvas({ device = 'desktop', lang, dir, children }) {
  const wrapRef = useRef(null);
  const frameRef = useRef(null);
  const [root, setRoot] = useState(null);
  const [space, setSpace] = useState(0);
  const [height, setHeight] = useState(400);
  const width = DEVICES[device] || DEVICES.desktop;

  // Build the page once and keep its styles in step with the admin (Vite updates styles live).
  useEffect(() => {
    const doc = frameRef.current.contentDocument;
    doc.open();
    doc.write('<!doctype html><html><head><meta charset="utf-8"></head><body><div id="np-canvas-root"></div></body></html>');
    doc.close();
    const sync = () => {
      doc.head.querySelectorAll('[data-np-copied]').forEach((node) => node.remove());
      document.head.querySelectorAll('link[rel="stylesheet"], style').forEach((node) => {
        const copy = node.cloneNode(true);
        copy.setAttribute('data-np-copied', '');
        doc.head.appendChild(copy);
      });
      const own = doc.createElement('style');
      own.setAttribute('data-np-copied', '');
      own.textContent = CANVAS_CSS;
      doc.head.appendChild(own);
      // The admin's colour variables live on .np-root; the page needs them for the edit tools.
      const adminRoot = document.querySelector('.np-root');
      if (adminRoot) {
        const computed = getComputedStyle(adminRoot);
        [...computed].filter((name) => name.startsWith('--np-')).forEach((name) => doc.body.style.setProperty(name, computed.getPropertyValue(name)));
      }
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    setRoot(doc.getElementById('np-canvas-root'));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const html = frameRef.current?.contentDocument?.documentElement;
    if (html) { html.lang = lang; html.dir = dir; }
  }, [lang, dir, root]);

  // Page height follows its content; the scale follows the space available in the admin.
  useLayoutEffect(() => {
    if (!root) return undefined;
    const measure = () => {
      setHeight(Math.ceil(root.getBoundingClientRect().height));
      setSpace(wrapRef.current.getBoundingClientRect().width);
    };
    // Measure now as well: observers only report once the page is drawn, which a hidden tab skips.
    measure();
    const FrameObserver = frameRef.current.contentWindow.ResizeObserver;
    const inner = new FrameObserver(measure);
    inner.observe(root);
    const outer = new ResizeObserver(measure);
    outer.observe(wrapRef.current);
    return () => { inner.disconnect(); outer.disconnect(); };
  }, [root]);

  const scale = space ? Math.min(1, space / width) : 1;
  const offset = Math.max(0, (space - width * scale) / 2);
  return (
    <div className="np-canvas" ref={wrapRef} dir="ltr" style={{ height: height * scale }}>
      <iframe
        ref={frameRef}
        title="preview"
        className="np-canvas-frame"
        style={{ width, height, transform: `translateX(${offset}px) scale(${scale})` }}
      />
      {root && createPortal(children, root)}
    </div>
  );
}
