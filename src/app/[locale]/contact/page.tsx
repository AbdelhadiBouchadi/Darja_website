import { Transition } from '@/components/shared/preloader';
import { useTranslations } from 'next-intl';
import React from 'react';

const ContactPage = () => {
  const t = useTranslations('Layout');

  const pageName = t('Navigation.contact.title');

  return (
    <Transition pageName={pageName}>
      <div>ContactPage</div>
    </Transition>
  );
};

export default ContactPage;
