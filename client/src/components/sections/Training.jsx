import { motion } from 'framer-motion';
import { training } from '../../data/training';
import { fadeUp, stagger, viewport } from '../../animations/variants';
import SectionHeading from '../ui/SectionHeading';
import Icon from '../ui/Icon';

export default function Training() {
  return (
    <section id="training" className="section">
      <SectionHeading eyebrow="03 / Training" title="Training & Certifications" />
      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="grid gap-6 md:grid-cols-2"
      >
        {training.map((t) => (
          <motion.article
            key={t.id}
            variants={fadeUp}
            className="glass relative overflow-hidden rounded-3xl p-7"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-gradient opacity-20 blur-2xl" aria-hidden="true" />
            <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white">
              <Icon name={t.icon} size={24} />
            </span>
            <h3 className="text-xl font-semibold leading-snug">{t.title}</h3>
            <p className="mt-2 text-muted">{t.organization}</p>
            {t.qualification && <p className="mt-3 chip">{t.qualification}</p>}
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
