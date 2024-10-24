'use client';

import { cn, descOpacity, landingSlideUp } from '@/lib/utils';
import { useInView, motion, useTransform, useScroll } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import SubHeader from './SubHeader';
import { useLocale, useTranslations } from 'next-intl';

const ProgramLanding = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const isInView = useInView(imageContainerRef);
  const [isMobile, setIsMobile] = useState(false);
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t2 = useTranslations('HomePage');

  // Detect if the user is on a smaller screen (e.g., mobile)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768); // Example breakpoint (768px)
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll-based animation setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'], // When section starts and ends
  });

  // Create a zoom effect: scaling from 1 to 1.3 based on scroll position
  const backgroundSize = useTransform(
    scrollYProgress,
    [0.4, 1],
    isMobile ? ['cover', 'cover'] : ['80%', '130%']
  );

  return (
    <section ref={sectionRef} data-scroll-section="">
      <motion.main
        variants={landingSlideUp}
        initial="initial"
        animate="enter"
        className="relative flex h-full w-full"
      >
        <SubHeader />
      </motion.main>
      <motion.div
        ref={imageContainerRef}
        className="bg-derive w-full min-h-screen  relative my-64 xl:my-80 2xl:my-96"
        style={{ backgroundSize }}
      >
        <motion.div
          className="absolute right-0 top-0 h-[80%] xl:bg-[#E9EAEB]  xl:w-[40%] flex flex-col justify-center items-center gap-4 2xl:gap8 text-[#00b0db] xl:text-black/90"
          variants={descOpacity}
          animate={isInView ? 'open' : 'closed'}
        >
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              'text-sm 2xl:text-2xl w-[80%] 2xl:w-[50%] font-semibold m-0 ',
              isArabic ? 'arabic-subtitle-regular' : 'latin-subtitle-regular'
            )}
          >
            {t2('Hero.description')}
          </motion.p>
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              'text-sm 2xl:text-2xl w-[80%] 2xl:w-[50%] font-semibold m-0 ',
              isArabic ? 'arabic-subtitle-regular' : 'latin-subtitle-regular'
            )}
          >
            {t2('Hero.subtitle')}
          </motion.p>
        </motion.div>
        <motion.div
          className="absolute left-0 -bottom-64 h-[80%] xl:bg-[#E9EAEB]  xl:w-[40%] flex flex-col justify-center items-center gap-4 2xl:gap8 text-[#00b0db] xl:text-black/90"
          variants={descOpacity}
          animate={isInView ? 'open' : 'closed'}
        >
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              'text-sm 2xl:text-2xl w-[80%] 2xl:w-[50%] font-semibold m-0 ',
              isArabic ? 'arabic-subtitle-regular' : 'latin-subtitle-regular'
            )}
          >
            {t2('Hero.subtitle2')}
          </motion.p>
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              'text-sm 2xl:text-2xl w-[80%] 2xl:w-[50%] font-semibold m-0 ',
              isArabic ? 'arabic-subtitle-regular' : 'latin-subtitle-regular'
            )}
          >
            {t2('Hero.subtitle3')}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProgramLanding;
