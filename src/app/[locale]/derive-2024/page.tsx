import DeriveHeader from '@/components/shared/DeriveHeader';
import { Transition } from '@/components/shared/preloader';
import { useTranslations } from 'next-intl';
import React from 'react';

const DerivePage = () => {
  const t = useTranslations('Layout');

  const pageName = t('Navigation.derive.title');

  return (
    <Transition pageName={pageName}>
      <DeriveHeader />
    </Transition>
  );
};

export default DerivePage;
