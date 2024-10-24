'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { Transition } from '../../../components/shared/preloader';
import Contact from '../../../components/shared/contact';
import ProgramLanding from '@/components/shared/ProgramLanding';
import Projects from '@/components/shared/projects';
import SlidingImages from '@/components/shared/slider';

const DerivePage = () => {
  const t = useTranslations('Layout');
  const pageName = t('Navigation.derive.title');

  return (
    <Transition pageName={pageName}>
      <ProgramLanding />
      <Projects />
      <SlidingImages />
      <Contact />
    </Transition>
  );
};

export default DerivePage;
