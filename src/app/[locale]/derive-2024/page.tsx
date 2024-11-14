import { useTranslations } from 'next-intl';
import React from 'react';
import { Transition } from '../../../components/shared/preloader';
import Contact from '../../../components/shared/contact';
import ProgramLanding from '@/components/shared/ProgramLanding';
import SlidingImages from '@/components/shared/slider';
import ProgramSection from '@/components/shared/ProgramsSection';

const DerivePage = () => {
  const t = useTranslations('Layout');
  const pageName = t('Navigation.derive.title');

  return (
    <Transition pageName={pageName}>
      {/* <ProgramLanding /> */}
      <ProgramSection />
      <SlidingImages />
      <Contact />
    </Transition>
  );
};

export default DerivePage;
