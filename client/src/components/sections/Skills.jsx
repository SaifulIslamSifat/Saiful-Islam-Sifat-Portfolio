import { motion } from 'framer-motion';
import { skillCategories, languages } from '../../data/skills';
import { fadeUp, stagger, viewport } from '../../animations/variants';
import SectionHeading from '../ui/SectionHeading';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading
        eyebrow="02 / Skills"
        title="Technical Skills"
        subtitle="Organized by area. Levels are stated honestly: where no level is shown, it is general familiarity."
      />
      <motion.div
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillCategories.map((cat) => (
          <motion.article
            key={cat.id}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-5 transition-colors hover:border-cyan/40"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan/10 text-cyan">
                <Icon name={cat.icon} size={20} />
              </span>
              <h3 className="font-display text-lg font-semibold">{cat.title}</h3>
            </div>
            <ul className="flex flex-wrap gap-2">
              {cat.items.map((item) => {
                const { name, level } = typeof item === 'string' ? { name: item } : item;
                return (
                  <li key={name} className="rounded-lg border border-line/10 px-3 py-1.5 text-sm">
                    {name}
                    {level && <span className="ml-2 font-mono text-xs text-cyan">{level}</span>}
                  </li>
                );
              })}
            </ul>
          </motion.article>
        ))}
      </motion.div>

      <Reveal className="glass mt-8 rounded-2xl p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">Language Proficiency</h3>
        {languages.map((l) => (
          <div key={l.language}>
            <p className="mb-3 text-sm font-medium text-cyan">{l.language}</p>
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {l.skills.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs uppercase tracking-wider text-muted">{s.label}</dt>
                  <dd className="font-display text-lg font-semibold">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
