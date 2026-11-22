import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink, Code } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import { fadeUp, stagger, viewport } from '../../animations/variants';
import SectionHeading from '../ui/SectionHeading';

export default function Projects() {
  const { projects } = useProjects();
  const [filter, setFilter] = useState('All');
  const categories = useMemo(() => ['All', ...new Set(projects.map((p) => p.category))], [projects]);
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section border-t border-line/40">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
        <SectionHeading
          eyebrow="03 / Selected Work"
          title="Featured Projects & Code"
          subtitle="A selection of machine learning systems, full-stack applications, and open-source repositories."
          className="!mb-0"
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition ${
                filter === c
                  ? 'bg-lime text-[#090d0f] font-bold'
                  : 'border border-line bg-surface text-muted hover:text-ink hover:border-line/90'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={filter}
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {visible.map((p, idx) => (
            <motion.article
              key={p.slug || p._id}
              variants={fadeUp}
              whileHover={{ y: -5 }}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:border-[#283238] hover:bg-surface-hover"
            >
              <div>
                {/* Visual Header / Banner */}
                <div className="relative flex h-48 items-center justify-between overflow-hidden border-b border-line/60 bg-gradient-to-br from-surface to-surface-hover p-6">
                  {/* Subtle grid in background */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                  
                  {/* Category Pill */}
                  <span className="relative z-10 rounded-full border border-line bg-surface/90 px-3 py-1 font-mono text-xs text-lime">
                    {p.category}
                  </span>

                  {/* Watermark Index */}
                  <span className="relative z-10 font-mono text-4xl font-black text-line/80 select-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-ink transition group-hover:text-lime">
                    {p.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-muted line-clamp-3">
                    {p.summary}
                  </p>

                  {/* Tech Stack Pills */}
                  {p.technologies && p.technologies.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-line/60 bg-surface/80 px-2.5 py-0.5 font-mono text-[11px] text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between border-t border-line/50 p-6 pt-4">
                <Link
                  to={`/projects/${p.slug}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-ink transition hover:text-lime"
                >
                  <span>Details</span>
                  <ArrowUpRight size={14} />
                </Link>

                <div className="flex items-center gap-2">
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.title} on GitHub`}
                      className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-muted transition hover:border-lime/40 hover:text-lime"
                    >
                      <Github size={15} />
                    </a>
                  )}

                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.title} live demo`}
                      className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-muted transition hover:border-lime/40 hover:text-lime"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
