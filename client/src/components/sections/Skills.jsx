import { motion } from 'framer-motion';
import { skillCategories, languages } from '../../data/skills';
import { fadeUp, stagger, viewport } from '../../animations/variants';
import SectionHeading from '../ui/SectionHeading';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';

export default function Skills() {
  return (
    <section id="skills" className="section border-t border-line/40">
      <SectionHeading
        eyebrow="08 / Capabilities"
        title="Technical Skills & Tools"
        subtitle="Tools, languages, and technologies categorized with honest proficiency levels."
      />

      <motion.div
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillCategories.map((cat) => (
          <motion.article
            key={cat.id}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:border-[#283238] hover:bg-surface-hover"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="font-display text-base font-bold text-ink">{cat.title}</span>
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-bg text-lime">
                <Icon name={cat.icon} size={16} />
              </span>
            </div>

            <ul className="flex flex-wrap gap-2">
              {cat.items.map((item) => {
                const { name, level } = typeof item === 'string' ? { name: item } : item;
                return (
                  <li
                    key={name}
                    className="flex items-center gap-1.5 rounded-lg border border-line bg-bg/90 px-3 py-1 font-mono text-xs text-muted"
                  >
                    <span>{name}</span>
                    {level && (
                      <span className="text-[10px] text-lime font-semibold">({level})</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.article>
        ))}
      </motion.div>

      {/* Language Proficiency Strip */}
      <Reveal className="mt-8 rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-lime">
          Language Proficiency
        </h3>
        {languages.map((l) => (
          <div key={l.language}>
            <p className="mb-4 font-display text-lg font-bold text-ink">{l.language}</p>
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {l.skills.map((s) => (
                <div key={s.label} className="rounded-xl border border-line/50 bg-bg p-4">
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted">{s.label}</dt>
                  <dd className="mt-1 font-display text-base font-bold text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
