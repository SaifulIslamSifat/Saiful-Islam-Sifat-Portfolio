import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import { fadeUp, stagger, viewport } from '../../animations/variants';
import SectionHeading from '../ui/SectionHeading';

export default function Projects() {
  const { projects } = useProjects();
  const [filter, setFilter] = useState('All');
  const categories = useMemo(() => ['All', ...new Set(projects.map((p) => p.category))], [projects]);
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section">
      <SectionHeading
        eyebrow="04 / Projects"
        title="Academic Projects"
        subtitle="Projects from my university studies. Screenshots, technologies and links will be added as they are verified."
      />

      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`min-h-[44px] rounded-full px-5 text-sm font-medium transition ${
              filter === c ? 'bg-brand-gradient text-white' : 'glass text-muted hover:text-ink'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div
        key={filter}
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="grid gap-6 sm:grid-cols-2"
      >
        <AnimatePresence>
          {visible.map((p, idx) => (
            <motion.article
              key={p.slug || p._id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="glass group overflow-hidden rounded-3xl"
            >
              {/* Placeholder illustration until real screenshots exist */}
              {p.image ? (
                <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" className="h-44 w-full object-cover" />
              ) : (
                <div className={`relative grid h-44 place-items-center bg-gradient-to-br ${p.accent} opacity-90`} aria-hidden="true">
                  <span className="font-display text-6xl font-bold text-white/25">{String(idx + 1).padStart(2, '0')}</span>
                </div>
              )}
              <div className="p-6">
                <span className="chip">{p.category}</span>
                <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-muted">{p.summary}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link to={`/projects/${p.slug}`} className="btn-primary !py-2 text-sm">
                    View Details <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} on GitHub`} className="btn-ghost !px-4 !py-2">
                      <Github size={16} aria-hidden="true" />
                    </a>
                  )}
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} live demo`} className="btn-ghost !px-4 !py-2">
                      <ExternalLink size={16} aria-hidden="true" />
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
