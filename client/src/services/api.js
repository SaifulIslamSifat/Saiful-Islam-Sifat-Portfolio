// All backend calls live here. VITE_API_URL is empty in dev (Vite proxies /api to :5000).
const BASE = import.meta.env.VITE_API_URL || '';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || 'Something went wrong. Please try again.');
    err.status = res.status;
    err.errors = data.errors;
    throw err;
  }
  return data;
}

export const sendContactMessage = (payload) =>
  request('/api/contact', { method: 'POST', body: JSON.stringify(payload) });

// Database-driven projects (hooks fall back to local data if the API is unavailable).
export const fetchProjects = (options) => request('/api/projects', options);
export const fetchProject = (id, options) => request(`/api/projects/${encodeURIComponent(id)}`, options);
