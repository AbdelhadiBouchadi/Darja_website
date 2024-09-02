import { useTranslations } from 'next-intl';
import React from 'react';
import { Transition } from '../../../components/shared/preloader';

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
