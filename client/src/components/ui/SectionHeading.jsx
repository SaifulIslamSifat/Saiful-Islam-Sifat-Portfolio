import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, subtitle, className = '' }) {
  return (
    <Reveal className={`mb-12 max-w-3xl ${className}`}>
      {eyebrow && (
        <div className="mb-3 inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime">
            {eyebrow}
          </p>
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
