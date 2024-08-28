import Contact from '@/components/shared/contact';
import Description from '@/components/shared/description';
import Landing from '@/components/shared/landing';
import { Transition } from '@/components/shared/preloader';
import Projects from '@/components/shared/projects';
import SlidingImages from '@/components/shared/slider';
import React from 'react';

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
