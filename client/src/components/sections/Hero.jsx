import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { profile } from '../../data/profile';
import SocialLinks from '../ui/SocialLinks';
import HeroVisual from '../three/HeroVisual';

// Hero: rotating tagline + lazy-loaded interactive 3D structure (CSS orb fallback).
export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      if (!document.hidden) setI((n) => (n + 1) % profile.rotatingTaglines.length);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 font-mono text-sm text-cyan"
          >
            {profile.greeting}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-gradient animate-shimmer text-6xl font-bold leading-none sm:text-7xl md:text-8xl"
          >
            SIFAT.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-lg font-medium sm:text-xl"
          >
            Computer Science and Engineering Graduate.
          </motion.p>

          <div className="mt-3 h-8 overflow-hidden" aria-live="off">
            <AnimatePresence mode="wait">
              <motion.p
                key={i}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-lg text-cyan"
              >
                {profile.rotatingTaglines[i]}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="mt-5 max-w-xl text-muted sm:text-lg">{profile.heroLine}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              Explore My Work
            </a>
            <a href="#contact" className="btn-ghost">
              Contact Me
            </a>
            {profile.cvUrl && (
              <a href={profile.cvUrl} download className="btn-ghost">
                <Download size={16} aria-hidden="true" /> Download CV
              </a>
            )}
          </div>

          <SocialLinks className="mt-8" />
        </div>

        <div className="mx-auto w-4/5 max-w-sm lg:max-w-none">
          <HeroVisual />
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full text-muted"
      >
        <ArrowDown size={20} className="animate-bounce" />
      </a>
    </section>
  );
}
