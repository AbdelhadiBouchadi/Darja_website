'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { cn, descOpacity, descSlideUp, landingSlideUp } from '../../lib/utils';
import SubHeader from './SubHeader';
import Description from './description';
import { useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const Landing = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const isInView = useInView(imageContainerRef);
  const t = useTranslations('HomePage');

  // Scroll-based animation setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'], // When section starts and ends
  });

  // Create a zoom effect: scaling from 1 to 1.3 based on scroll position
  const backgroundSize = useTransform(
    scrollYProgress,
    [0.4, 1],
    ['10%', '130%']
  );

  return (
    <section ref={sectionRef} data-scroll-section="">
      <motion.main
        variants={landingSlideUp}
        initial="initial"
        animate="enter"
        className="relative flex min-h-screen"
      >
        <SubHeader />
        <Description />
      </motion.main>
      <motion.div
        ref={imageContainerRef}
        className="bg-description w-full min-h-screen mt-24 md:mt-64 relative"
        style={{ backgroundSize }}
      >
        <motion.div
          className="absolute left-0 top-1/2 bottom-1/2 xl:top-32 xl:bottom-0 2xl:top-72 xl:bg-[#E9EAEB] xl:py-12 2xl:py-36 xl:max-w-[40%] flex flex-col justify-center items-center gap-4 2xl:gap8 text-[#00b0db] xl:text-black/90"
          variants={descOpacity}
          animate={isInView ? 'open' : 'closed'}
        >
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              'xl:text-lg 2xl:text-2xl w-[80%] 2xl:w-[50%] font-semibold m-0 ',
              isArabic ? 'arabic-subtitle-regular' : 'latin-subtitle-regular'
            )}
          >
            {t('Hero.subtitle4')}
          </motion.p>
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              'xl:text-lg 2xl:text-2xl w-[80%] 2xl:w-[50%] font-semibold m-0 ',
              isArabic ? 'arabic-subtitle-regular' : 'latin-subtitle-regular'
            )}
          >
            {t('Hero.subtitle5')}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Landing;
