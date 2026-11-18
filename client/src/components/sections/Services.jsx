import { motion } from 'framer-motion';
import { services } from '../../data/services';
import { fadeUp, stagger, viewport } from '../../animations/variants';
import SectionHeading from '../ui/SectionHeading';
import Icon from '../ui/Icon';

export default function Services() {
  return (
    <section id="services" className="section">
      <SectionHeading eyebrow="07 / Interests" title="What I Do & What I'm Exploring" />
      <motion.ul
        variants={stagger(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((s) => (
          <motion.li
            key={s.title}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-6 transition-colors hover:border-violet/50"
          >
            <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-violet/10 text-violet">
              <Icon name={s.icon} size={22} />
            </span>
            <h3 className="font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.text}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
