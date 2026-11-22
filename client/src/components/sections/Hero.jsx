import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Github, Mail } from 'lucide-react';
import { profile } from '../../data/profile';
import HeroVisual from '../three/HeroVisual';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[92svh] pt-28 pb-16 flex flex-col justify-center overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        
        {/* Status Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/90 px-4 py-1.5 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-muted">
            {profile.fullName} · Available for opportunities
          </span>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Hero Copy */}
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.08]"
            >
              Building digital experiences that connect people and solve problems.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted"
            >
              Computer Science & Engineering graduate and developer focused on crafting responsive web applications, exploring machine learning models, and delivering thoughtful software solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a href="#projects" className="btn-primary">
                <span>View Selected Work</span>
                <ArrowUpRight size={16} />
              </a>

              <a href="#contact" className="btn-ghost">
                <span>Start a Project</span>
              </a>

              <a
                href="https://github.com/SaifulIslamSifat"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !px-4"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
            </motion.div>
          </div>

          {/* 3D / Orb Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto w-4/5 max-w-sm lg:col-span-5 lg:max-w-none"
          >
            <HeroVisual />
          </motion.div>
        </div>

        {/* Results & Stats Bar (inspired by reference #results) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-4 border-t border-line/60 pt-8 sm:grid-cols-4"
        >
          <div className="card !p-4">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">Education</span>
            <p className="mt-1 font-display text-lg font-bold text-ink">B.Sc. in CSE</p>
            <p className="font-mono text-xs text-lime">IIUC Graduate</p>
          </div>

          <div className="card !p-4">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">GitHub Repos</span>
            <p className="mt-1 font-display text-lg font-bold text-ink">4+ Active</p>
            <p className="font-mono text-xs text-lime">Web & ML Codebases</p>
          </div>

          <div className="card !p-4">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">Client Focus</span>
            <p className="mt-1 font-display text-lg font-bold text-ink">Fiverr</p>
            <p className="font-mono text-xs text-lime">International Relations</p>
          </div>

          <div className="card !p-4">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">Field Research</span>
            <p className="mt-1 font-display text-lg font-bold text-ink">IRC Project</p>
            <p className="font-mono text-xs text-lime">Team Lead & Research</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
