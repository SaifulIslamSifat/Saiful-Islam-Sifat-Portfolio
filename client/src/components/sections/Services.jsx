import { motion } from 'framer-motion';
import { services } from '../../data/services';
import { fadeUp, stagger, viewport } from '../../animations/variants';
import SectionHeading from '../ui/SectionHeading';
import Icon from '../ui/Icon';

const numberedServices = [
  {
    num: '01',
    title: 'Full-Stack Web Development',
    text: 'Building responsive, high-performance web applications with clean frontend architecture and scalable backend interfaces.',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'Vite', 'REST APIs'],
    icon: 'MonitorSmartphone',
  },
  {
    num: '02',
    title: 'Machine Learning & Predictive Systems',
    text: 'Applying data preprocessing, feature engineering, and classification algorithms for predictive analytics and data insights.',
    tags: ['Python', 'Scikit-Learn', 'Pandas', 'Data Preprocessing', 'NLP'],
    icon: 'BrainCircuit',
  },
  {
    num: '03',
    title: 'Software Quality Assurance & Testing',
    text: 'Executing functional testing, test case design, and quality assurance workflows to ensure software reliability.',
    tags: ['Manual Testing', 'QA Fundamentals', 'Bug Reporting', 'Verification'],
    icon: 'Bug',
  },
  {
    num: '04',
    title: 'CMS & International Client Relations',
    text: 'Requirement analysis, WordPress site customization, and professional communication for international clients.',
    tags: ['WordPress', 'Client Communication', 'CMS Customization', 'Fiverr'],
    icon: 'LayoutTemplate',
  },
];

export default function Services() {
  return (
    <section id="services" className="section border-t border-line/40">
      <SectionHeading
        eyebrow="02 / Services"
        title="What I Bring to the Table"
        subtitle="Core focus areas spanning modern web development, applied machine learning, software quality, and technical client solutions."
      />

      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="grid gap-6 sm:grid-cols-2"
      >
        {numberedServices.map((s) => (
          <motion.div
            key={s.num}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="group relative flex flex-col justify-between rounded-2xl border border-line bg-surface p-7 transition duration-300 hover:border-[#283238] hover:bg-surface-hover"
          >
            <div>
              {/* Header with Monospace Number and Icon */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl font-bold tracking-wider text-lime">
                  {s.num}
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-line/60 bg-surface text-muted transition group-hover:text-lime group-hover:border-lime/30">
                  <Icon name={s.icon} size={20} />
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl font-bold text-ink transition group-hover:text-lime">
                {s.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                {s.text}
              </p>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2 border-t border-line/50 pt-4">
              {s.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line bg-surface/90 px-3 py-1 font-mono text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
