import { ArrowUpRight, Github } from 'lucide-react';
import { profile } from '../../data/profile';

export default function Footer() {
  return (
    <footer className="border-t border-line/60 bg-surface/40 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 sm:flex-row sm:px-8">
        
        {/* Brand & Monogram */}
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-xs font-mono font-bold text-[#090d0f]">
            SIS
          </span>
          <div>
            <p className="font-display text-sm font-bold tracking-wider text-ink">
              {profile.fullName}
            </p>
            <p className="font-mono text-xs text-muted">
              CSE Graduate · Full-Stack & ML
            </p>
          </div>
        </div>

        {/* Social / Direct Outbound Links */}
        <div className="flex items-center gap-6 font-mono text-xs text-muted">
          <a
            href="https://github.com/SaifulIslamSifat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition hover:text-lime"
          >
            <span>GitHub</span>
            <ArrowUpRight size={13} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1 transition hover:text-lime"
          >
            <span>Contact</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Copyright */}
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.fullName}
        </p>
      </div>
    </footer>
  );
}
