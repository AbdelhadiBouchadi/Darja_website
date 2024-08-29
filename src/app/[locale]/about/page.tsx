import { Transition } from '@/components/shared/preloader';
import { useTranslations } from 'next-intl';
import React from 'react';

const AboutPage = () => {
  const t = useTranslations('Layout');

  const pageName = t('Navigation.about.title');

  return (
    <Transition pageName={pageName}>
      <div>AboutPage</div>
    </Transition>
  );
};

export default AboutPage;
