import { education } from '../../data/education';
import SectionHeading from '../ui/SectionHeading';
import Timeline from '../ui/Timeline';

export default function Education() {
  const items = education.map((e) => ({
    id: e.id,
    content: (
      <div className="glass rounded-2xl p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan">{e.level}</p>
          <span className="font-mono text-xs text-muted">{e.year}</span>
        </div>
        <h3 className="mt-1 text-lg font-semibold">{e.title}</h3>
        <p className="text-sm text-muted">{e.institution}</p>
        <p className="mt-2 font-display font-semibold">{e.result}</p>
      </div>
    ),
  }));

  return (
    <section id="education" className="section">
      <SectionHeading eyebrow="06 / Education" title="Education" />
      <Timeline items={items} />
    </section>
  );
}
