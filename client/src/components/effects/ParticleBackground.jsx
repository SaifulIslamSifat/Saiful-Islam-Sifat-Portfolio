import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const COLORS = ['59,130,246', '34,211,238', '139,92,246']; // electric, cyan, violet

// Fixed full-screen canvas: floating particles with depth and faint connecting lines.
// Performance: DPR capped at 1.5, fewer particles on small screens, loop pauses when the
// tab is hidden, and reduced-motion users get a single static frame.
export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let w = 0, h = 0, raf = 0, running = false, particles = [];
    const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const build = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mobile = w < 768;
      const count = Math.min(mobile ? 32 : 80, Math.floor((w * h) / (mobile ? 16000 : 20000)));
      particles = Array.from({ length: count }, () => {
        const depth = Math.random(); // 0 far, 1 near
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          depth,
          r: 0.6 + depth * 1.8,
          vx: (Math.random() - 0.5) * (0.12 + depth * 0.35),
          vy: (Math.random() - 0.5) * (0.12 + depth * 0.35),
          c: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      });
    };

    const linkDist = () => (w < 768 ? 95 : 130);

    const draw = (move) => {
      ctx.clearRect(0, 0, w, h);
      const max = linkDist();

      for (const p of particles) {
        if (move) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -10) p.x = w + 10;
          else if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          else if (p.y > h + 10) p.y = -10;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.c},${0.25 + p.depth * 0.55})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Connecting lines (squared distance check avoids sqrt for most pairs)
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < max * max) {
            const alpha = (1 - Math.sqrt(d2) / max) * 0.18;
            ctx.strokeStyle = `rgba(${a.c},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // Gentle cursor glow links on desktop
        const mx = a.x - mouse.x, my = a.y - mouse.y;
        const md2 = mx * mx + my * my;
        if (md2 < 150 * 150) {
          ctx.strokeStyle = `rgba(34,211,238,${(1 - Math.sqrt(md2) / 150) * 0.35})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    };

    const loop = () => {
      draw(true);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    const onMouse = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { build(); if (reduced) draw(false); }, 150);
    };

    build();
    if (reduced) draw(false);
    else start();

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    return () => {
      stop();
      clearTimeout(resizeTimer);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-[5]" />;
}
