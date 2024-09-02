import { useTranslations } from 'next-intl';
import React from 'react';
import { Transition } from '../../../components/shared/preloader';
import ContactSection from '../../../components/shared/ContactPage';

const ContactPage = () => {
  const t = useTranslations('Layout');

  const pageName = t('Navigation.contact.title');

  return (
    <Transition pageName={pageName}>
      <ContactSection />
    </Transition>
  );
};

export default ContactPage;
