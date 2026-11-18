import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollProgress from '../components/ui/ScrollProgress';
import ParticleBackground from '../components/effects/ParticleBackground';
import CustomCursor from '../components/effects/CustomCursor';
import ScrollToHash from '../components/ui/ScrollToHash';

export default function MainLayout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <div className="ambient" aria-hidden="true" />
      <ParticleBackground />
      <CustomCursor />
      <ScrollToHash />
      <ScrollProgress />
      <Navbar />
      <div id="main">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
