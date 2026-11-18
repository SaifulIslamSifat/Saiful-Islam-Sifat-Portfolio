import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Router navigation does not scroll on its own. This handles "/#projects" links coming back
// from detail pages, and resets to the top when opening a new page.
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    // Wait a tick so the target page has rendered before looking for the element.
    const t = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    }, 50);
    return () => clearTimeout(t);
  }, [pathname, hash]);

  return null;
}
