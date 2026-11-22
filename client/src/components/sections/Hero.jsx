import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Mail, MapPin, Download, Sparkles } from 'lucide-react';
import { profile } from '../../data/profile';
import profileImg from '../../assets/profile.png';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[95svh] pt-28 pb-16 flex flex-col justify-center overflow-hidden">
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

        <div className="grid items-center gap-12 lg:grid-cols-12">
          
          {/* Hero Copy Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-lime font-bold">
                  Computer Science & Engineering Graduate
                </p>
              </div>

              {/* Full Name Prominently Featured */}
              <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-6xl md:text-7xl leading-[1.05]">
                {profile.fullName}
              </h1>

              <p className="mt-3 font-display text-xl sm:text-2xl font-semibold text-muted">
                Full-Stack Developer & Machine Learning Explorer
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted"
            >
              Building digital experiences that connect people and solve problems. Focused on modern web technologies, machine learning applications, and software quality assurance.
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

              {profile.cvUrl && (
                <a href={profile.cvUrl} download className="btn-ghost">
                  <Download size={16} />
                  <span>Resume</span>
                </a>
              )}
            </motion.div>
          </div>

          {/* User Photo Front & Center Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              
              {/* Ambient Glow behind the photo */}
              <div 
                className="absolute -inset-2 rounded-3xl bg-lime/10 blur-xl opacity-60 pointer-events-none" 
                aria-hidden="true" 
              />

              {/* Photo Card Container */}
              <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-3 shadow-2xl transition duration-500 hover:border-lime/40">
                <div className="relative overflow-hidden rounded-2xl bg-[#0d1417]">
                  <img
                    src={profileImg}
                    alt={`Portrait of ${profile.fullName}`}
                    width="440"
                    height="580"
                    loading="eager"
                    className="aspect-[3/4] w-full object-cover object-top transition duration-500 hover:scale-[1.02]"
                  />

                  {/* Floating Identity Badge on Photo */}
                  <div className="absolute inset-x-3 bottom-3 rounded-xl border border-line/80 bg-[#090d0f]/90 p-3.5 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-display text-sm font-bold text-ink">
                          {profile.fullName}
                        </p>
                        <p className="font-mono text-xs text-lime">
                          B.Sc. in CSE · IIUC Graduate
                        </p>
                      </div>
                      <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface text-lime">
                        <Sparkles size={15} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
