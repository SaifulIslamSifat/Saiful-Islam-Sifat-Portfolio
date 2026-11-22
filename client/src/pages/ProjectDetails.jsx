import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { useProject } from '../hooks/useProjects';
import NotFound from './NotFound';

export default function ProjectDetails() {
  const { slug } = useParams();
  const { project, loading } = useProject(slug);

  useEffect(() => {
    if (project) document.title = `${project.title} | SIFAT`;
    return () => {
      document.title = 'SIFAT | Saiful Islam Sifat – CSE Graduate & Full-Stack Developer';
    };
  }, [project]);

  if (loading) {
    return (
      <main className="grid min-h-[60svh] place-items-center pt-32" role="status" aria-label="Loading project">
        <p className="font-mono text-sm text-muted">Loading project details…</p>
      </main>
    );
  }
  if (!project) return <NotFound />;

  return (
    <main className="mx-auto max-w-4xl px-5 pb-24 pt-32 sm:px-8">
      <Link
        to="/#projects"
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted transition hover:border-lime/40 hover:text-ink"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        <span>Back to projects</span>
      </Link>

      <div className="rounded-3xl border border-line bg-surface p-6 sm:p-10">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="mb-8 h-56 w-full rounded-2xl object-cover sm:h-80"
          />
        ) : (
          <div className="relative mb-8 flex h-56 w-full items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-surface to-surface-hover overflow-hidden sm:h-72">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <span className="relative z-10 font-mono text-3xl font-bold uppercase tracking-widest text-lime/40">
              {project.category}
            </span>
          </div>
        )}

        <span className="rounded-full border border-line bg-bg px-3 py-1 font-mono text-xs text-lime">
          {project.category}
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-5xl">
          {project.title}
        </h1>

        <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
          {project.details || project.summary}
        </p>

        <div className="mt-8 border-t border-line/60 pt-6">
          <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-lime">
            Technologies & Tools
          </h2>
          {project.technologies?.length ? (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-bg px-3 py-1 font-mono text-xs text-ink"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : (
            <p className="font-mono text-xs text-muted">To be added.</p>
          )}
        </div>

        {(project.githubUrl || project.liveUrl) && (
          <div className="mt-8 flex flex-wrap gap-3 border-t border-line/60 pt-6">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Github size={16} aria-hidden="true" />
                <span>Source Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <ExternalLink size={16} aria-hidden="true" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
