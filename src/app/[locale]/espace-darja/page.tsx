import { useTranslations } from 'next-intl';
import React from 'react';
import { Transition } from '../../../components/shared/preloader';
import AboutDarja from '../../../components/shared/AboutDarja';
import AboutSection from '../../../components/shared/AboutSection';
import Apropos from '../../../components/shared/Apropos';
import Residence from '../../../components/shared/Residence';
import Creation from '../../../components/shared/Creation';
import Transmission from '../../../components/shared/Transmission';
import Contact from '../../../components/shared/contact';

const EspaceDarja = () => {
  const t = useTranslations('Layout');

  const pageName = t('Navigation.darja.title');

  return (
    <Transition pageName={pageName}>
      <AboutDarja />
      <AboutSection />
      <Apropos />
      <Residence />
      <Creation />
      <Transmission />
      <Contact />
    </Transition>
  );
};

export default EspaceDarja;
