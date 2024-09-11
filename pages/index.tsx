import { NextPage } from 'next';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

import SkillsSection from '../components/SkillsSection';

const Home: NextPage = () => {
  return (
    <Layout title="Adarsh Dabral - Software Engineer">
      <section id="home" className=" min-h-screen flex items-center  ">
        <Hero />
      
        
      </section>
      <section id="about" className="min-h-screen flex items-center">
        <About />
      </section>
      {/* <section id="skills" className="min-h-screen flex items-center"><SkillsSection/></section> */}
      <section id="projects" className="min-h-screen flex items-center">
        <SkillsSection />
      </section>
      <section id="projects" className="min-h-screen flex items-center">
        <Projects />
      </section>
      

      <section id="contact" className="min-h-screen flex items-center">
        <Contact />
      </section>
      
    </Layout>
  );
};

export default Home;