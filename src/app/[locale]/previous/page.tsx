import { Transition } from '@/components/shared/preloader';
import PreviousHeader from '@/components/shared/PreviousHeader';
import { useTranslations } from 'next-intl';
import React from 'react';

const Previously = () => {
  const t = useTranslations('Layout');

  const pageName = t('Navigation.previous.title');

  return (
    <Transition pageName={pageName}>
      <PreviousHeader />
    </Transition>
  );
};

export default Previously;
