import { useEffect, useRef, useState } from 'react';

// Tracks whether an element is on screen so off-screen animation can be paused.
export default function useInViewport(options = { threshold: 0.05 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), options);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView];
}
