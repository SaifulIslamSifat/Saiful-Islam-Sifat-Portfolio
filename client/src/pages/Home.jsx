import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Training from '../components/sections/Training';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Education from '../components/sections/Education';
import Services from '../components/sections/Services';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Training />
      <Projects />
      <Experience />
      <Education />
      <Services />
      <Contact />
    </>
  );
}
