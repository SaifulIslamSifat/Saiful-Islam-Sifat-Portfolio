import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Terminal, Cpu, Rocket } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const steps = [
  {
    num: '01',
    timecode: '00:01:00',
    title: 'Discover & Architecture',
    badge: 'Phase 1 · Blueprint',
    subtitle: 'Pinning down project requirements, system architecture, and tech stack before writing code.',
    tags: ['Requirements', 'System Design', 'Schema Planning', 'Tech Stack'],
    clientRole: 'Share project scope, target goals, and functional expectations.',
    icon: Terminal,
  },
  {
    num: '02',
    timecode: '00:02:00',
    title: 'Develop, Test & Optimize',
    badge: 'Phase 2 · In Progress',
    subtitle: 'Iterative implementation of clean frontend components, backend APIs, and ML pipelines with rigorous testing.',
    tags: ['Frontend / UI', 'Backend APIs', 'ML Modeling', 'Unit & QA Testing'],
    clientRole: 'Periodic milestone review and feedback as prototypes take shape.',
    icon: Cpu,
  },
  {
    num: '03',
    timecode: '00:03:00',
    title: 'Deploy & Quality Assurance',
    badge: 'Phase 3 · Ready to Ship',
    subtitle: 'Final performance audit, cross-browser compatibility verification, and seamless production deployment.',
    tags: ['CI/CD', 'Performance Audit', 'Security Checks', 'Final Delivery'],
    clientRole: 'Final acceptance testing and sign-off on production build.',
    icon: Rocket,
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const current = steps[activeStep];
  const Icon = current.icon;

  return (
    <section id="process" className="section border-t border-line/40">
      <SectionHeading
        eyebrow="04 / Process"
        title="Engineering Workflow"
        subtitle="A disciplined development lifecycle from initial architecture to final quality verification."
      />

      {/* Timeline Console Header */}
      <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line/60 pb-6">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-lime animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-muted">
              TRACK: DEV_PIPELINE_V1
            </span>
          </div>

          <div className="font-mono text-xs tracking-widest text-lime">
            TIMECODE: {current.timecode}
          </div>
        </div>

        {/* Step Selector Tabs */}
        <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {steps.map((s, idx) => (
            <button
              key={s.num}
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition duration-200 ${
                activeStep === idx
                  ? 'border-lime/60 bg-surface-hover text-ink shadow-sm'
                  : 'border-line/40 bg-surface/40 text-muted hover:border-line hover:text-ink'
              }`}
            >
              <span
                className={`font-mono text-sm font-bold ${
                  activeStep === idx ? 'text-lime' : 'text-muted'
                }`}
              >
                {s.num}
              </span>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                {s.title.split('&')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Active Step Details Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-8 rounded-2xl border border-line bg-bg/80 p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-lime">
                  {current.badge}
                </span>
                <h3 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
                  {current.title}
                </h3>
              </div>
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-line bg-surface text-lime">
                <Icon size={24} />
              </div>
            </div>

            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {current.subtitle}
            </p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {current.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-ink"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Collaboration Note */}
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-line/60 bg-surface p-4 text-sm text-muted">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-lime" />
              <div>
                <span className="font-semibold text-ink">Collaboration Point: </span>
                <span>{current.clientRole}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
