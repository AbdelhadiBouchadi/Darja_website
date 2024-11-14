'use client';

import { cn, descOpacity, landingSlideUp } from '@/lib/utils';
import { useInView, motion, useTransform, useScroll } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import SubHeader from './SubHeader';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import RoundedBtn from './rounded';
import { Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
});

const ProgramLanding = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const isInView = useInView(imageContainerRef);
  const [isMobile, setIsMobile] = useState(false);
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('Derive2024');
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
    <section
      ref={sectionRef}
      data-scroll-section=""
      className="border-[#094142] border-b-2"
    >
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
        className="bg-derive w-full min-h-screen relative py-8 mb-8 md:my-64 xl:my-80 2xl:my-96 flex flex-col lg:flex-row lg:items-center border-b-2"
        style={{ backgroundSize }}
      >
        <motion.div
          className="lg:absolute lg:right-0 lg:top-0 lg:bg-[#E9EAEB] lg:w-[30%] 2xl:w-[20%] flex flex-col justify-center items-center bg-white/50 h-fit gap-4 py-4 my-16 px-4 lg:px-6"
          variants={descOpacity}
          animate={isInView ? 'open' : 'closed'}
        >
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              'text-lg lg:text-xl 2xl:text-2xl w-full font-bold text-[#094142] m-0',
              jakarta.className
            )}
          >
            {t2('Hero.description')}
          </motion.p>
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              'text-lg lg:text-xl 2xl:text-2xl w-full font-bold text-[#094142] m-0',
              jakarta.className
            )}
          >
            {t2('Hero.subtitle')}
          </motion.p>
        </motion.div>
        <motion.div
          className="lg:absolute lg:left-0 lg:-bottom-64 lg:h-auto lg:bg-[#E9EAEB] lg:w-[40%] 2xl:w-[70%] hidden lg:flex flex-col justify-start py-4 lg:py-6 items-start gap-4 2xl:gap-8 text-[#00b0db] md:text-black/90 px-4 lg:px-6"
          variants={descOpacity}
          animate={isInView ? 'open' : 'closed'}
        >
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              'text-lg lg:text-xl 2xl:text-2xl w-full font-bold text-[#094142] m-0',
              jakarta.className
            )}
          >
            {t2('Hero.subtitle2')}
          </motion.p>
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              'text-lg lg:text-xl 2xl:text-2xl w-full font-bold text-[#094142] m-0',
              jakarta.className
            )}
          >
            {t2('Hero.subtitle3')}
          </motion.p>
          <Link href="#program_section" className="hidden lg:flex w-full mt-4">
            <RoundedBtn className="relative text-base group inline-flex items-center justify-center overflow-hidden rounded-full font-bold ring-offset-background transition-colors before:absolute before:left-[-10%] before:h-0 before:w-[120%] before:translate-y-3/4 before:scale-0 before:rounded-full before:pb-[120%] before:content-[''] after:absolute after:inset-0 after:h-full after:w-full after:-translate-y-full after:rounded-full after:transition-transform after:duration-300 after:ease-in-expo after:content-[''] hover:before:translate-y-0 hover:before:scale-100 hover:before:transition-transform hover:before:duration-300 hover:before:ease-in-expo hover:after:translate-y-0 hover:after:transition-transform hover:after:delay-300 hover:after:duration-75 hover:after:ease-linear focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:border-2 hover:border-solid hover:border-[#094142] before:bg-[#094142] after:bg-[#094142] px-8 py-3 before:-top-1/2 hover:text-background">
              <p
                className={cn(
                  'relative z-[1] transition-colors duration-400 text-[#E9EAEB] md:text-[#094142] group-hover:text-[#00b0db] m-0 text-xl md:text-2xl',
                  isArabic ? 'arabic-title-bold' : 'latin-title-bold capitalize'
                )}
              >
                {t('more')}
              </p>
            </RoundedBtn>
          </Link>
        </motion.div>
        <Link href="#program_section" className="lg:hidden mt-8 self-center">
          <RoundedBtn className="relative text-base group inline-flex items-center justify-center overflow-hidden rounded-full font-bold ring-offset-background transition-colors before:absolute before:left-[-10%] before:h-0 before:w-[120%] before:translate-y-3/4 before:scale-0 before:rounded-full before:pb-[120%] before:content-[''] after:absolute after:inset-0 after:h-full after:w-full after:-translate-y-full after:rounded-full after:transition-transform after:duration-300 after:ease-in-expo after:content-[''] hover:before:translate-y-0 hover:before:scale-100 hover:before:transition-transform hover:before:duration-300 hover:before:ease-in-expo hover:after:translate-y-0 hover:after:transition-transform hover:after:delay-300 hover:after:duration-75 hover:after:ease-linear focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:border-2 hover:border-solid hover:border-[#094142] before:bg-[#094142] after:bg-[#094142] px-8 py-3 before:-top-1/2 hover:text-background">
            <p
              className={cn(
                'relative z-[1] transition-colors duration-400 text-[#094142] group-hover:text-[#00b0db] m-0 text-xl md:text-2xl',
                isArabic ? 'arabic-title-bold' : 'latin-title-bold capitalize'
              )}
            >
              {t('more')}
            </p>
          </RoundedBtn>
        </Link>
      </motion.div>
    </section>
  );
};

export default ProgramLanding;
