import { Transition } from '@/components/shared/preloader';
import { useTranslations } from 'next-intl';
import React from 'react';

const Previously = () => {
  const t = useTranslations('Layout');

  const pageName = t('Navigation.previous.title');

  return (
    <Transition pageName={pageName}>
      <div>Previously</div>
    </Transition>
  );
};

export default Previously;
