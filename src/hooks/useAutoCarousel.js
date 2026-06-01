import { useCallback, useEffect, useRef } from 'react';

const RESUME_DELAY = 1800;

export function useAutoCarousel({ cardSelector, gap, speed = 22, resetKey = '' }) {
  const scrollerRef = useRef(null);
  const pauseUntilRef = useRef(0);
  const directionRef = useRef(1);
  const dragRef = useRef(null);

  const pauseForInteraction = useCallback((delay = RESUME_DELAY) => {
    pauseUntilRef.current = Math.max(pauseUntilRef.current, performance.now() + delay);
  }, []);

  const scrollCards = useCallback((direction) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const card = scroller.querySelector(cardSelector);
    const amount = card ? card.getBoundingClientRect().width + gap : scroller.clientWidth * 0.8;
    const rtl = getComputedStyle(scroller).direction === 'rtl';
    pauseForInteraction();
    scroller.scrollBy({ left: (rtl ? -direction : direction) * amount, behavior: 'smooth' });
  }, [cardSelector, gap, pauseForInteraction]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const intervalId = window.setInterval(() => {
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;

      if (maxScroll > 1 && performance.now() >= pauseUntilRef.current && !dragRef.current) {
        const rtl = getComputedStyle(scroller).direction === 'rtl';
        const current = Math.abs(scroller.scrollLeft);
        const next = current + ((speed / 25) * directionRef.current);

        if (next >= maxScroll) directionRef.current = -1;
        if (next <= 0) directionRef.current = 1;

        const clamped = Math.min(Math.max(next, 0), maxScroll);
        scroller.scrollLeft = rtl ? -clamped : clamped;
      }
    }, 40);

    return () => window.clearInterval(intervalId);
  }, [resetKey, speed]);

  const handlePointerDown = useCallback((event) => {
    if (event.button !== 0 || event.target.closest('a, button, .leaflet-container')) return;
    pauseUntilRef.current = Number.POSITIVE_INFINITY;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
      dragged: false,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }, []);

  const handlePointerMove = useCallback((event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 4) drag.dragged = true;
    event.currentTarget.scrollLeft = drag.startScrollLeft - distance;
  }, []);

  const finishDrag = useCallback((event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    pauseUntilRef.current = performance.now() + RESUME_DELAY;
    window.setTimeout(() => {
      dragRef.current = null;
    }, 0);
  }, []);

  const interactionProps = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: finishDrag,
    onPointerCancel: finishDrag,
    onTouchStart: () => {
      pauseUntilRef.current = Number.POSITIVE_INFINITY;
    },
    onTouchEnd: () => {
      pauseUntilRef.current = performance.now() + RESUME_DELAY;
    },
    onWheel: () => pauseForInteraction(),
    onMouseEnter: () => {
      pauseUntilRef.current = Number.POSITIVE_INFINITY;
    },
    onMouseLeave: () => {
      if (!dragRef.current) pauseUntilRef.current = performance.now() + 650;
    },
    onFocusCapture: () => {
      pauseUntilRef.current = Number.POSITIVE_INFINITY;
    },
    onBlurCapture: () => {
      pauseUntilRef.current = performance.now() + RESUME_DELAY;
    },
  };

  return { interactionProps, scrollerRef, scrollCards };
}
