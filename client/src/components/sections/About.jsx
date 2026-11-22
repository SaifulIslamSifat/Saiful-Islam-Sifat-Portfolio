import { GraduationCap, Code2, Globe, Compass } from 'lucide-react';
import { profile } from '../../data/profile';
import { education } from '../../data/education';
import profileImg from '../../assets/profile.png';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';

export default function About() {
  const degree = education[0];

  return (
    <section id="about" className="section border-t border-line/40">
      <SectionHeading
        eyebrow="06 / About"
        title="Background & Drive"
        subtitle="A snapshot of my academic journey, technical curiosities, and professional mindset."
      />

      <div className="grid items-start gap-10 lg:grid-cols-12">
        {/* Profile Image Column */}
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm overflow-hidden rounded-3xl border border-line bg-surface p-3 shadow-xl">
            <img
              src={profileImg}
              alt={`Portrait of ${profile.fullName}`}
              width="400"
              height="600"
              loading="lazy"
              className="aspect-[3/4] w-full rounded-2xl object-cover object-top filter grayscale contrast-105 hover:grayscale-0 transition duration-500"
            />
            <div className="p-4 pt-5">
              <p className="font-display text-lg font-bold text-ink">{profile.fullName}</p>
              <p className="font-mono text-xs text-lime">{profile.title.split('|')[0].trim()}</p>
            </div>
          </div>
        </Reveal>

        {/* Narrative & Highlights Column */}
        <div className="space-y-6 lg:col-span-7">
          <Reveal className="space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            {profile.about.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </Reveal>

          {/* Academic Degree Card */}
          <Reveal className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-lime/10 text-lime">
              <GraduationCap size={24} />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-ink">
                {degree.level} in {degree.title}
              </p>
              <p className="mt-1 font-mono text-xs text-muted">
                {degree.institution} · {degree.year} · <span className="text-lime">{degree.result}</span>
              </p>
            </div>
          </Reveal>

          {/* Interests Breakdown */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex items-center gap-2 mb-3">
                <Code2 size={16} className="text-lime" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  Technical Interests
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.technicalInterests.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-bg px-3 py-1 font-mono text-xs text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex items-center gap-2 mb-3">
                <Globe size={16} className="text-lime" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  Professional Focus
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.professionalInterests.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-bg px-3 py-1 font-mono text-xs text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
