'use client';

import { motion } from 'framer-motion';
import { cn, landingSlideUp } from '../../lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import SubHeader from './SubHeader';
import Description from './description';

const Landing = () => {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <motion.main
      variants={landingSlideUp}
      initial="initial"
      animate="enter"
      className="relative flex min-h-screen"
    >
      <SubHeader />
      <Description />
    </motion.main>
  );
};

export default Landing;
