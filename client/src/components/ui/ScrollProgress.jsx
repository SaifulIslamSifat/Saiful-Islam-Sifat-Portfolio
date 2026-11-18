import { ArrowUp } from 'lucide-react';
import useScrollProgress from '../../hooks/useScrollProgress';

// Top progress bar + back-to-top button.
export default function ScrollProgress() {
  const { progress, past } = useScrollProgress(500);
  return (
    <>
      <div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[60] h-[3px] origin-left bg-brand-gradient"
        style={{ transform: `scaleX(${progress})`, width: '100%' }}
      />
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`glass fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full transition duration-300 hover:border-cyan/60 ${
          past ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
