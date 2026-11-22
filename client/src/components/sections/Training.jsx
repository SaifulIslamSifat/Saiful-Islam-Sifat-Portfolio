import { motion } from 'framer-motion';
import { training } from '../../data/training';
import { fadeUp, stagger, viewport } from '../../animations/variants';
import SectionHeading from '../ui/SectionHeading';
import Icon from '../ui/Icon';

export default function Training() {
  return (
    <section id="training" className="section border-t border-line/40">
      <SectionHeading
        eyebrow="10 / Certifications"
        title="Training & Certifications"
        subtitle="Specialized professional training programs in software quality assurance and graphic design."
      />

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="grid gap-6 md:grid-cols-2"
      >
        {training.map((t) => (
          <motion.article
            key={t.id}
            variants={fadeUp}
            className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-7 transition duration-300 hover:border-[#283238] hover:bg-surface-hover"
          >
            <div>
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl border border-line bg-bg text-lime">
                <Icon name={t.icon} size={24} />
              </span>

              <h3 className="font-display text-xl font-bold text-ink">{t.title}</h3>
              <p className="mt-2 text-sm text-muted">{t.organization}</p>
            </div>

            {t.qualification && (
              <div className="mt-6 border-t border-line/50 pt-4">
                <span className="rounded-full border border-line bg-bg px-3 py-1 font-mono text-xs text-lime">
                  {t.qualification}
                </span>
              </div>
            )}
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
