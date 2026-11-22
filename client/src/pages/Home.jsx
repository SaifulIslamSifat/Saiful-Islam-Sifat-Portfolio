import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Projects from '../components/sections/Projects';
import Process from '../components/sections/Process';
import Transformation from '../components/sections/Transformation';
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';
import Skills from '../components/sections/Skills';
import Education from '../components/sections/Education';
import Training from '../components/sections/Training';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Process />
      <Transformation />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Training />
      <Contact />
    </>
  );
}
