'use client';

import { motion } from 'framer-motion';
import { cn, landingSlideUp } from '../../lib/utils';
import { ImagesSlider } from './images-slider';
import { useLocale, useTranslations } from 'next-intl';

const Landing = () => {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const images = [
    '/images/image-slider4.png',
    '/images/slider-1.png',
    '/images/slider-2.png',
    '/images/slider-3.png',
  ];

  return (
    <motion.main
      variants={landingSlideUp}
      initial="initial"
      animate="enter"
      className="relative flex h-screen overflow-hidden"
    >
      <ImagesSlider images={images}></ImagesSlider>
    </motion.main>
  );
};

export default Landing;
