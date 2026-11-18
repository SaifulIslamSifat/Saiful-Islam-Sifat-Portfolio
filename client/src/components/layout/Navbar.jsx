import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
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
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Primary"
        className="glass mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full px-4 py-2 sm:px-6"
      >
        <a href="#home" className="font-display text-lg font-bold tracking-widest" aria-label={`${profile.brand} home`}>
          <span className="text-gradient">{profile.brand}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={`rounded-full px-3 py-2 text-sm transition ${
                  active === l.id ? 'bg-cyan/15 text-cyan' : 'text-muted hover:text-ink'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="grid h-11 w-11 place-items-center rounded-full text-muted transition hover:text-ink"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded-full lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass mx-3 mt-2 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-3xl p-3 lg:hidden"
          >
            <ul className="grid gap-1">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-[48px] items-center rounded-2xl px-4 text-base font-medium ${
                      active === l.id ? 'bg-cyan/15 text-cyan' : 'text-ink'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
