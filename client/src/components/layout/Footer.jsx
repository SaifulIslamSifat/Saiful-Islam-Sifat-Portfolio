import { profile } from '../../data/profile';

export default function Footer() {
  return (
    <footer className="border-t border-line/10 py-8 text-center text-sm text-muted">
      <p>
        © {new Date().getFullYear()} {profile.fullName} · <span className="text-gradient font-semibold">{profile.brand}</span>
      </p>
      <p className="mt-1">{profile.tagline}</p>
    </footer>
  );
}
