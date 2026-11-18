import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan">{eyebrow}</p>
      <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-muted sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
