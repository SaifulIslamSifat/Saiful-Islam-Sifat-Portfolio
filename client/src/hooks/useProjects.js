import { useEffect, useState } from 'react';
import { fetchProjects, fetchProject } from '../services/api';
import { projects as localProjects } from '../data/projects';

// Both hooks render local data immediately (no loading flicker) and upgrade to the
// database version when the API answers. If the API is down, the local data simply stays.
let listCache = null;

export function useProjects() {
  const [projects, setProjects] = useState(listCache || localProjects);
  const [source, setSource] = useState(listCache ? 'api' : 'local');

  useEffect(() => {
    if (listCache) return undefined;
    const controller = new AbortController();
    fetchProjects({ signal: controller.signal })
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length) {
          listCache = res.data;
          setProjects(res.data);
          setSource('api');
        }
      })
      .catch(() => {
        /* keep local fallback */
      });
    return () => controller.abort();
  }, []);

  return { projects, source };
}

export function useProject(slug) {
  const local = localProjects.find((p) => p.slug === slug) || null;
  const cached = listCache?.find((p) => p.slug === slug) || null;
  const [project, setProject] = useState(cached || local);
  const [loading, setLoading] = useState(!(cached || local));

  useEffect(() => {
    const controller = new AbortController();
    setProject(cached || local);
    setLoading(!(cached || local));
    fetchProject(slug, { signal: controller.signal })
      .then((res) => setProject(res.data))
      .catch((err) => {
        if (err.name === 'AbortError') return;
        // API unreachable or not found: keep local data if we have it, otherwise show 404.
        if (!local && !cached) setProject(null);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return { project, loading };
}
