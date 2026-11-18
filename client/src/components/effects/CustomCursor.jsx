import { useEffect, useRef } from 'react';

// Desktop-only cursor (fine pointer + hover). Touch devices keep native interaction.
// Uses transforms and one rAF loop; the loop idles when the pointer stops.
export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    document.documentElement.classList.add('has-custom-cursor');
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0, hovering = false, visible = false;

    const render = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      const scale = hovering ? 1.9 : 1;
      ring.current.style.transform = `translate3d(${pos.x}px,${pos.y}px,0) translate(-50%,-50%) scale(${scale})`;
      dot.current.style.transform = `translate3d(${target.x}px,${target.y}px,0) translate(-50%,-50%)`;
      if (Math.abs(target.x - pos.x) > 0.1 || Math.abs(target.y - pos.y) > 0.1) {
        raf = requestAnimationFrame(render);
      } else {
        raf = 0;
      }
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(render); };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        pos.x = target.x; pos.y = target.y;
        dot.current.style.opacity = '1';
        ring.current.style.opacity = '1';
      }
      hovering = !!e.target.closest('a, button, input, textarea, [role="button"], label');
      kick();
    };
    const onLeave = () => {
      visible = false;
      dot.current.style.opacity = '0';
      ring.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[150] h-9 w-9 rounded-full border border-cyan/60 opacity-0 transition-[opacity] duration-200"
      />
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[150] h-1.5 w-1.5 rounded-full bg-cyan opacity-0"
      />
    </>
  );
}
