import React from 'react';
import Projects from '../../components/shared/projects';
import SlidingImages from '../../components/shared/slider';
import Contact from '../../components/shared/contact';
import ProgramLanding from '@/components/shared/ProgramLanding';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <ProgramLanding />
      <Projects />
      <SlidingImages />
      <Contact />
    </div>
  );
};

export default Home;
