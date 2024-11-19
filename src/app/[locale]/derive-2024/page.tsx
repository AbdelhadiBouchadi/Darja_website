import { useTranslations } from 'next-intl';
import React from 'react';
import { Transition } from '../../../components/shared/preloader';
import Contact from '../../../components/shared/contact';
import SlidingImages from '@/components/shared/slider';
import ProgramSection from '@/components/shared/ProgramsSection';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DerivePage = () => {
  const t = useTranslations('Layout');
  const pageName = t('Navigation.derive.title');

  return (
    // <Transition pageName={pageName}>

    // </Transition>
    <>
      <ProgramSection />
      <SlidingImages />
      <Contact />
    </>
  );
};

export default DerivePage;
