import { useTranslations } from 'next-intl';
import React from 'react';
import { Transition } from '../../../components/shared/preloader';
import PreviousHeader from '../../../components/shared/PreviousHeader';
import ComingSoon from '@/components/shared/ComingSoon';

const Previously = () => {
  const t = useTranslations('Layout');

  const pageName = t('Navigation.previous.title');

  return (
    <Transition pageName={pageName}>
      <ComingSoon />
    </Transition>
  );
};

export default Previously;
