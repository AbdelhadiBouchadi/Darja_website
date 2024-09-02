import Description from '../../components/shared/description';
import Landing from '../../components/shared/landing';
import { Transition } from '../../components/shared/preloader';
import React from 'react';
import Projects from '../../components/shared/projects';
import SlidingImages from '../../components/shared/slider';
import Contact from '../../components/shared/contact';

const Home = () => {
  return (
    <Transition>
      <Landing />
      <Description />
      <Projects />
      <SlidingImages />
      <Contact />
    </Transition>
  );
};

export default Home;
