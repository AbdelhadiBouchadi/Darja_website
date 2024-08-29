import { Transition } from '@/components/shared/preloader';
import { useTranslations } from 'next-intl';
import React from 'react';

const Community = () => {
  const t = useTranslations('Layout');

  const pageName = t('Navigation.community.title');

  return (
    <Transition pageName={pageName}>
      <div>Community</div>
    </Transition>
  );
};

export default Community;
