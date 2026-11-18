import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-5 text-center">
      <div>
        <p className="font-mono text-sm text-cyan">Error 404</p>
        <h1 className="text-gradient mt-2 text-7xl font-bold sm:text-9xl">404</h1>
        <p className="mt-4 text-lg text-muted">This page drifted out of orbit.</p>
        <Link to="/" className="btn-primary mt-8">Back to Home</Link>
      </div>
    </main>
  );
}
