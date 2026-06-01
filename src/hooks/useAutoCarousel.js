import { useCallback, useEffect, useRef } from 'react';

const RESUME_DELAY = 1800;

export function useAutoCarousel({ cardSelector, gap, speed = 22, resetKey = '' }) {
  const scrollerRef = useRef(null);
  const pauseUntilRef = useRef(0);
  const directionRef = useRef(1);
  const dragRef = useRef(null);
  const frameRef = useRef(0);
  const autoPositionRef = useRef(null);

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
    autoPositionRef.current = null;
    scroller.scrollBy({ left: (rtl ? -direction : direction) * amount, behavior: 'smooth' });
  }, [cardSelector, gap, pauseForInteraction]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    let previousTime = performance.now();
    const animate = (now) => {
      const elapsed = Math.min(now - previousTime, 80);
      previousTime = now;
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;

      if (
        maxScroll > 1
        && document.visibilityState === 'visible'
        && now >= pauseUntilRef.current
        && !dragRef.current
      ) {
        const rtl = getComputedStyle(scroller).direction === 'rtl';
        const current = Math.abs(scroller.scrollLeft);
        if (autoPositionRef.current === null || Math.abs(current - autoPositionRef.current) > 2) {
          autoPositionRef.current = current;
        }
        const next = autoPositionRef.current + ((speed / 1000) * elapsed * directionRef.current);

        if (next >= maxScroll) directionRef.current = -1;
        if (next <= 0) directionRef.current = 1;

        const clamped = Math.min(Math.max(next, 0), maxScroll);
        autoPositionRef.current = clamped;
        scroller.scrollLeft = rtl ? -clamped : clamped;
      }
      frameRef.current = window.requestAnimationFrame(animate);
    };
    frameRef.current = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameRef.current);
  }, [resetKey, speed]);

  const handlePointerDown = useCallback((event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('a, button')) return;
    pauseForInteraction(10000);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
      dragged: false,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }, [pauseForInteraction]);

  const handlePointerMove = useCallback((event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 4) drag.dragged = true;
    autoPositionRef.current = null;
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

  const handleTouchStart = useCallback((event) => {
    autoPositionRef.current = null;
    pauseForInteraction(4500);
  }, [pauseForInteraction]);

  const handleTouchEnd = useCallback(() => {
    pauseUntilRef.current = performance.now() + RESUME_DELAY;
  }, []);

  const interactionProps = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: finishDrag,
    onPointerCancel: finishDrag,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchEnd,
    onWheel: () => pauseForInteraction(),
    onFocusCapture: () => pauseForInteraction(4500),
    onBlurCapture: () => {
      pauseUntilRef.current = performance.now() + RESUME_DELAY;
    },
  };

  return { interactionProps, scrollerRef, scrollCards };
}
