import { Briefcase, ArrowUpRight } from 'lucide-react';
import { experience } from '../../data/experience';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';

export default function Experience() {
  return (
    <section id="experience" className="section border-t border-line/40">
      <SectionHeading
        eyebrow="07 / Experience"
        title="Experience · Career & Research"
        subtitle="Professional roles in international client relations and field-based humanitarian research."
      />

      <div className="space-y-6">
        {experience.map((e) => (
          <Reveal
            key={e.id}
            className="group rounded-2xl border border-line bg-surface p-6 sm:p-8 transition duration-300 hover:border-[#283238] hover:bg-surface-hover"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-lime">
                  {e.organization}
                </span>
                <h3 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">
                  {e.position}
                </h3>
              </div>

              {e.duration && (
                <span className="rounded-full border border-line bg-bg px-4 py-1 font-mono text-xs text-muted">
                  {e.duration}
                </span>
              )}
            </div>

            <ul className="mt-5 space-y-2 border-t border-line/50 pt-4 text-sm leading-relaxed text-muted sm:text-base">
              {e.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-2 rounded-xl border border-line/60 bg-bg/80 p-4 font-mono text-xs">
              <span className="font-bold text-lime uppercase tracking-wider">Highlight:</span>
              <span className="text-muted">{e.highlight}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
