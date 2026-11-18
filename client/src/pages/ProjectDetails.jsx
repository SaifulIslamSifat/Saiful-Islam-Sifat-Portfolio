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
      document.title = 'SIFAT | Saiful Islam Sefat – CSE Graduate & Aspiring Full-Stack Developer';
    };
  }, [project]);

  if (loading) {
    return (
      <main className="grid min-h-[60svh] place-items-center pt-32" role="status" aria-label="Loading project">
        <p className="text-muted">Loading…</p>
      </main>
    );
  }
  if (!project) return <NotFound />;

  return (
    <main className="mx-auto max-w-3xl px-5 pb-20 pt-32 sm:px-8">
      <Link to="/#projects" className="btn-ghost mb-8 !py-2 text-sm">
        <ArrowLeft size={16} aria-hidden="true" /> Back to projects
      </Link>
      {project.image ? (
        <img src={project.image} alt={`${project.title} screenshot`} className="mb-8 h-48 w-full rounded-3xl object-cover sm:h-72" />
      ) : (
        <div className={`mb-8 h-48 rounded-3xl bg-gradient-to-br ${project.accent}`} aria-hidden="true" />
      )}
      <span className="chip">{project.category}</span>
      <h1 className="mt-3 text-3xl font-bold sm:text-5xl">{project.title}</h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">{project.details || project.summary}</p>

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan">Technologies</h2>
        {project.technologies?.length ? (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        ) : (
          <p className="text-muted">To be added.</p>
        )}
      </div>

      {(project.githubUrl || project.liveUrl) && (
        <div className="mt-8 flex gap-3">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Github size={16} aria-hidden="true" /> Source
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <ExternalLink size={16} aria-hidden="true" /> Live demo
            </a>
          )}
        </div>
      )}
    </main>
  );
}
