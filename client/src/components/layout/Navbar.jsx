import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { navLinks, profile } from '../../data/profile';
import { useTheme } from '../../context/ThemeContext';
import useScrollSpy from '../../hooks/useScrollSpy';

const ids = navLinks.map((l) => l.id);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(ids);
  const { theme, toggleTheme } = useTheme();

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-line bg-surface/80 px-4 py-2.5 backdrop-blur-md shadow-lg shadow-black/20"
      >
        {/* Brand Monogram */}
        <a
          href="#home"
          className="flex items-center gap-2 font-display text-base font-bold tracking-widest text-ink transition hover:opacity-80"
          aria-label={`${profile.brand} home`}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-xs font-mono font-bold text-[#090d0f]">
            SS
          </span>
          <span className="hidden sm:inline font-mono text-sm tracking-wider">{profile.brand}</span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={`rounded-full px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition ${
                  active === l.id
                    ? 'bg-line/60 text-ink font-semibold'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right CTA & Controls */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#090d0f] transition hover:brightness-105"
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={14} />
          </a>

          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="grid h-8 w-8 place-items-center rounded-full border border-line bg-surface text-muted transition hover:text-ink hover:border-line/80"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-8 w-8 place-items-center rounded-full border border-line bg-surface text-muted md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-5xl rounded-3xl border border-line bg-surface/95 p-4 backdrop-blur-xl shadow-2xl md:hidden"
          >
            <ul className="grid gap-1">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-[44px] items-center rounded-xl px-4 text-sm font-mono uppercase tracking-wider ${
                      active === l.id ? 'bg-lime/10 text-lime font-semibold' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex min-h-[44px] items-center justify-center rounded-xl bg-lime text-sm font-mono font-bold uppercase tracking-wider text-[#090d0f]"
                >
                  Let's Talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
