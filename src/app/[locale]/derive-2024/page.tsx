import { useTranslations } from 'next-intl';
import React from 'react';
import { Transition } from '../../../components/shared/preloader';
import DeriveHeader from '../../../components/shared/DeriveHeader';
import DriveProjects from '@/components/shared/DeriveProjects';

const DerivePage = () => {
  const t = useTranslations('Layout');

  const pageName = t('Navigation.derive.title');

  return (
    <Transition pageName={pageName}>
      <DeriveHeader />
      <DriveProjects />
    </Transition>
  );
};

export default DerivePage;
