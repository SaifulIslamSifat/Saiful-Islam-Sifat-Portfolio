import { education } from '../../data/education';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';

export default function Education() {
  return (
    <section id="education" className="section border-t border-line/40">
      <SectionHeading
        eyebrow="09 / Academic History"
        title="Education"
        subtitle="Formal academic degrees and educational foundation in Science and Computer Engineering."
      />

      <div className="grid gap-6 sm:grid-cols-3">
        {education.map((e) => (
          <Reveal
            key={e.id}
            className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:border-[#283238] hover:bg-surface-hover"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-lime">
                  {e.level}
                </span>
                <span className="font-mono text-xs text-muted">{e.year}</span>
              </div>

              <h3 className="mt-3 font-display text-lg font-bold text-ink">
                {e.title}
              </h3>

              <p className="mt-2 text-sm text-muted">
                {e.institution}
              </p>
            </div>

            <div className="mt-6 border-t border-line/50 pt-4">
              <span className="font-mono text-xs text-muted">Result: </span>
              <span className="font-mono text-xs font-bold text-lime">{e.result}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
