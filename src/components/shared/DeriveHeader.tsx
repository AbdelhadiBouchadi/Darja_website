'use client';

import { useInView, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import React, { useRef } from 'react';

const DeriveHeader = () => {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('Derive2024');

  const container = useRef(null);
  const isInView = useInView(container);

  return <div>DeriveHeader</div>;
};

export default DeriveHeader;
