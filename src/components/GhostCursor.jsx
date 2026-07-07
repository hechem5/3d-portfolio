import { useEffect, useRef } from 'react';
import './GhostCursorCSS.css';

/**
 * Lightweight ghost cursor — uses DOM elements moved via JS.
 * Zero canvas, zero layout impact, works everywhere.
 */
export default function GhostCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const trail = trailRef.current;
    if (!dot || !ring || !trail) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let trailX = -100, trailY = -100;
    let rafId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Dot follows instantly
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';

      // Ring lags slightly
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';

      // Trail lags more
      trailX += (mouseX - trailX) * 0.08;
      trailY += (mouseY - trailY) * 0.08;
      trail.style.left = trailX + 'px';
      trail.style.top = trailY + 'px';

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="ghost-cursor-dot" />
      <div ref={ringRef} className="ghost-cursor-ring" />
      <div ref={trailRef} className="ghost-cursor-trail" />
    </>
  );
}
