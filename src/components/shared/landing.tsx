'use client';

import { motion } from 'framer-motion';
import { cn, landingSlideUp } from '@/lib/utils';
import { ImagesSlider } from './images-slider';
import { useLocale, useTranslations } from 'next-intl';

const Landing = () => {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const images = [
    '/images/slider-1.jpg',
    '/images/slider-2.jpg',
    '/images/slider-3.jpg',
  ];

  return (
    <motion.main
      variants={landingSlideUp}
      initial="initial"
      animate="enter"
      className="relative flex h-screen overflow-hidden"
    >
      <ImagesSlider images={images}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p
            className={cn(
              'font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4',
              isArabic ? 'arabic-title-bold' : 'latin-title-bold'
            )}
          >
            {t('Hero.title')}
          </motion.p>
        </motion.div>
      </ImagesSlider>
    </motion.main>
  );
};

export default Landing;
