import { Github, Linkedin, Facebook, Mail, Link2 } from 'lucide-react';
import { profile } from '../../data/profile';

const icons = { github: Github, linkedin: Linkedin, facebook: Facebook, mail: Mail };

// Renders nothing until approved links are added in data/profile.js.
export default function SocialLinks({ className = '' }) {
  if (!profile.socials.length) return null;
  return (
    <ul className={`flex gap-3 ${className}`}>
      {profile.socials.map((s) => {
        const Cmp = icons[s.icon] || Link2;
        return (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="glass grid h-11 w-11 place-items-center rounded-full text-muted transition hover:-translate-y-0.5 hover:text-cyan"
            >
              <Cmp size={18} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
