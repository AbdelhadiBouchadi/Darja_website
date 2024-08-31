import AboutDarja from '@/components/shared/AboutDarja';
import AboutSection from '@/components/shared/AboutSection';
import { Transition } from '@/components/shared/preloader';
import { useTranslations } from 'next-intl';
import React from 'react';

const EspaceDarja = () => {
  const t = useTranslations('Layout');

  const pageName = t('Navigation.darja.title');

  return (
    <Transition pageName={pageName}>
      <AboutDarja />
      <AboutSection />
    </Transition>
  );
};

export default EspaceDarja;
