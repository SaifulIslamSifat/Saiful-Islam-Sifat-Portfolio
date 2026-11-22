import { useState, useRef } from 'react';
import { ArrowLeftRight, Check, Code2, Sparkles } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

export default function Transformation() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="transformation" className="section border-t border-line/40">
      <SectionHeading
        eyebrow="05 / Transformation"
        title="From Concept to Production"
        subtitle="Drag the slider to see how an initial idea or unstructured problem is transformed into an optimized, production-ready system."
      />

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative mx-auto h-[400px] w-full max-w-4xl select-none overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl cursor-ew-resize"
      >
        {/* "After" Layer (Optimized Production) - Base Background */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 bg-[#0d1417]">
          <div className="flex items-center justify-between border-b border-line/80 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-lime" />
              <span className="font-mono text-xs uppercase tracking-wider text-lime font-bold">
                Production-Ready System (After)
              </span>
            </div>
            <span className="rounded-full bg-lime/10 px-3 py-1 font-mono text-xs font-semibold text-lime">
              Optimized & Deployed
            </span>
          </div>

          <div className="my-auto space-y-3">
            <div className="flex items-center gap-3">
              <div className="grid h-6 w-6 place-items-center rounded-full bg-lime text-[#090d0f]">
                <Check size={14} />
              </div>
              <p className="font-display text-lg font-semibold text-ink">
                Clean, Component-Driven React Architecture & Tailwind Styling
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid h-6 w-6 place-items-center rounded-full bg-lime text-[#090d0f]">
                <Check size={14} />
              </div>
              <p className="font-display text-lg font-semibold text-ink">
                Trained & Validated ML Pipelines (Diabetes Risk Prediction)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid h-6 w-6 place-items-center rounded-full bg-lime text-[#090d0f]">
                <Check size={14} />
              </div>
              <p className="font-display text-lg font-semibold text-ink">
                Sub-Second Response Times, Mobile-First Responsiveness & Accessible UI
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-line/80 pt-4 font-mono text-xs text-muted">
            <span>Status: Verified & Live</span>
            <span className="text-lime font-bold">Performance: 99+</span>
          </div>
        </div>

        {/* "Before" Layer (Raw Concept) - Clipped by Slider */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden border-r border-lime bg-[#141b20]"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="absolute inset-0 flex flex-col justify-between p-8 w-[400px] sm:w-[650px] md:w-[896px]">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <Code2 size={18} className="text-muted" />
                <span className="font-mono text-xs uppercase tracking-wider text-muted font-bold">
                  Raw Idea / Problem Statement (Before)
                </span>
              </div>
              <span className="rounded-full bg-surface px-3 py-1 font-mono text-xs text-muted">
                Unstructured
              </span>
            </div>

            <div className="my-auto space-y-3 opacity-80">
              <p className="font-display text-base text-muted">
                • Unformatted raw datasets without missing value imputation
              </p>
              <p className="font-display text-base text-muted">
                • Basic static prototype with inconsistent device scaling
              </p>
              <p className="font-display text-base text-muted">
                • Manual workflows without automated validation or error handling
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-line pt-4 font-mono text-xs text-muted">
              <span>Status: Draft / Exploratory</span>
              <span>Needs Structure</span>
            </div>
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute inset-y-0 flex items-center justify-center pointer-events-none"
          style={{ left: `calc(${sliderPos}% - 18px)` }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-lime bg-[#090d0f] text-lime shadow-xl">
            <ArrowLeftRight size={14} />
          </div>
        </div>

        {/* Drag Helper Tooltip */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-line bg-surface/90 px-4 py-1 font-mono text-[11px] text-muted pointer-events-none">
          ← Drag to compare →
        </div>
      </div>
    </section>
  );
}
