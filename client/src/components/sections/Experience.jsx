import { experience } from '../../data/experience';
import SectionHeading from '../ui/SectionHeading';
import Timeline from '../ui/Timeline';

export default function Experience() {
  const items = experience.map((e) => ({
    id: e.id,
    content: (
      <div className="glass rounded-2xl p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-xl font-semibold">{e.position}</h3>
          {e.duration && <span className="font-mono text-xs text-cyan">{e.duration}</span>}
        </div>
        <p className="mt-1 text-muted">{e.organization}</p>
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-muted marker:text-cyan sm:text-base">
          {e.responsibilities.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p className="mt-4 rounded-xl bg-cyan/10 p-3 text-sm text-ink">
          <span className="font-semibold text-cyan">Highlight: </span>
          {e.highlight}
        </p>
      </div>
    ),
  }));

  return (
    <section id="experience" className="section">
      <SectionHeading eyebrow="05 / Experience" title="Professional Experience" />
      <Timeline items={items} />
    </section>
  );
}
