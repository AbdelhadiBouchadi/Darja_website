import AboutDarja from '@/components/shared/AboutDarja';
import AboutSection from '@/components/shared/AboutSection';
import Apropos from '@/components/shared/Apropos';
import Contact from '@/components/shared/contact';
import Creation from '@/components/shared/Creation';
import { Transition } from '@/components/shared/preloader';
import Residence from '@/components/shared/Residence';
import Transmission from '@/components/shared/Transmission';
import { useTranslations } from 'next-intl';
import React from 'react';

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
