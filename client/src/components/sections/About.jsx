import { GraduationCap } from 'lucide-react';
import { profile } from '../../data/profile';
import { education } from '../../data/education';
import profileImg from '../../assets/profile.png';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';

export default function About() {
  const degree = education[0];
  return (
    <section id="about" className="section">
      <SectionHeading eyebrow="01 / About" title="About Me" />
      <div className="grid items-start gap-10 md:grid-cols-5">
        <Reveal className="md:col-span-2">
          <div className="relative mx-auto max-w-xs">
            <div className="absolute -inset-3 rounded-[2rem] bg-brand-gradient opacity-40 blur-xl" aria-hidden="true" />
            <div className="glass relative overflow-hidden rounded-[2rem] p-2">
              <img
                src={profileImg}
                alt={`Portrait of ${profile.fullName}`}
                width="400"
                height="600"
                loading="lazy"
                className="aspect-[3/4] w-full rounded-[1.6rem] object-cover object-top"
              />
            </div>
          </div>
        </Reveal>

        <div className="space-y-6 md:col-span-3">
          <Reveal className="space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <Reveal className="glass flex items-start gap-4 rounded-2xl p-5">
            <GraduationCap className="mt-1 shrink-0 text-cyan" aria-hidden="true" />
            <div>
              <p className="font-display font-semibold">
                {degree.level} in {degree.title}
              </p>
              <p className="text-sm text-muted">
                {degree.institution} · {degree.year} · {degree.result}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal className="glass rounded-2xl p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan">Technical Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.technicalInterests.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </Reveal>
            <Reveal className="glass rounded-2xl p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-violet">Professional Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.professionalInterests.map((t) => (
                  <span key={t} className="chip !border-violet/30 !bg-violet/10 !text-violet">{t}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
