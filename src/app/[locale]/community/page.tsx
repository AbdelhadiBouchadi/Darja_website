import { useTranslations } from 'next-intl';
import React from 'react';
import { Transition } from '../../../components/shared/preloader';
import ComingSoon from '@/components/shared/ComingSoon';

const Community = () => {
  const t = useTranslations('Layout');

  const pageName = t('Navigation.community.title');

  return (
    <Transition pageName={pageName}>
      <ComingSoon />
    </Transition>
  );
};

export default Community;
