import { lazy, Suspense, useMemo, Component } from 'react';
import { useReducedMotion } from 'framer-motion';
import usePageVisible from '../../hooks/usePageVisible';
import useInViewport from '../../hooks/useInViewport';

// Three.js is code-split so it never delays first paint.
const HeroScene = lazy(() => import('./HeroScene'));

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

// Static CSS orb used when WebGL is unavailable, while loading, or if the scene errors.
export function OrbFallback() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-[12%] animate-drift rounded-full bg-brand-gradient opacity-40 blur-2xl" />
      <div className="glass absolute inset-[22%] rounded-full" />
    </div>
  );
}

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <OrbFallback /> : this.props.children;
  }
}

export default function HeroVisual() {
  const reduced = useReducedMotion();
  const visible = usePageVisible();
  const [ref, inView] = useInViewport();
  const webgl = useMemo(hasWebGL, []);

  return (
    <div ref={ref} className="relative aspect-square w-full" aria-hidden="true">
      {webgl ? (
        <SceneBoundary>
          <Suspense fallback={<OrbFallback />}>
            <HeroScene active={visible && inView} reduced={!!reduced} />
          </Suspense>
        </SceneBoundary>
      ) : (
        <OrbFallback />
      )}
    </div>
  );
}
