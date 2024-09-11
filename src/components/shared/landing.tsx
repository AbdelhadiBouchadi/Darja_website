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
    '/images/slider1.jpg',
    '/images/slider2.jpg',
    '/images/slider3.jpg',
    '/images/slider4.jpg',
    '/images/slider5.jpg',
    '/images/slider6.png',
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
