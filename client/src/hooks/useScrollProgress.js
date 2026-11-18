import { useEffect, useState } from 'react';

// Scroll progress (0-1) and whether the page is scrolled past a threshold.
export default function useScrollProgress(threshold = 400) {
  const [progress, setProgress] = useState(0);
  const [past, setPast] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setPast(window.scrollY > threshold);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { progress, past };
}
