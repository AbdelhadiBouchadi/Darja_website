import Landing from '../../components/shared/landing';
import { Transition } from '../../components/shared/preloader';
import React from 'react';
import Projects from '../../components/shared/projects';
import SlidingImages from '../../components/shared/slider';
import Contact from '../../components/shared/contact';
import { useLocale } from 'next-intl';

const Home = () => {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <Transition
      pageName={
        isArabic
          ? 'مرحبا بكم في المنعطف البيضاوي'
          : 'Bienvenue à Dérive Casablancaise'
      }
    >
      <Landing />
      <Projects />
      <SlidingImages />
      <Contact />
    </Transition>
  );
};

export default Home;
