import AboutDarja from '@/components/shared/AboutDarja';
import { Transition } from '@/components/shared/preloader';
import { useTranslations } from 'next-intl';
import React from 'react';

const EspaceDarja = () => {
  const t = useTranslations('Layout');

  const pageName = t('Navigation.darja.title');

  return (
    <Transition pageName={pageName} >
      <AboutDarja />

    </Transition>
  );
};

export default EspaceDarja;
