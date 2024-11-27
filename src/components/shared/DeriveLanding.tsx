'use client';

import { cn, descOpacity, landingSlideUp } from '@/lib/utils';
import { useInView, motion, useTransform, useScroll } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import SubHeader from './SubHeader';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import RoundedBtn from './rounded';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Image from 'next/image';
import { PlayCircleIcon } from 'lucide-react';
import { fadeIn } from '@/variants';
import TeaserModal from './TeaserModal';

const jakarta = Plus_Jakarta_Sans({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
});

const DeriveLanding = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const isInView = useInView(imageContainerRef);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('Derive2024.background');
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
    <section ref={sectionRef} data-scroll-section="" className="">
      <div className="relative flex h-full w-full">
        <SubHeader />
      </div>
      <motion.div
        ref={imageContainerRef}
        className="bg-derive w-full min-h-screen relative py-8 mb-8 lg:mt-72 md:mb-16 2xl:my-80  flex flex-col lg:flex-row lg:items-center border-b-2"
        style={{ backgroundSize }}
      >
        <motion.div
          className="hidden lg:absolute lg:left-0 lg:-bottom-72 lg:h-auto lg:bg-[#E9EAEB] lg:w-[40%] bg-white/70 h-fit  my-16 lg:flex flex-col justify-start py-4 lg:py-6 items-start gap-4 2xl:gap-8 text-[#00b0db] md:text-black/90 px-4 lg:px-6"
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
            {t('text3')}
          </motion.p>
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              'text-lg lg:text-xl 2xl:text-2xl w-full font-bold text-[#094142] m-0',
              jakarta.className
            )}
          >
            {t('text4')}
          </motion.p>
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              'text-lg lg:text-xl 2xl:text-2xl w-full font-bold text-[#094142] m-0',
              jakarta.className
            )}
          >
            {t('text5')}
          </motion.p>
        </motion.div>
        <motion.div
          className="lg:absolute lg:right-0 lg:top-0 lg:h-auto lg:bg-[#E9EAEB] lg:w-[40%] bg-white/70 h-fit  my-16 lg:flex flex-col justify-start py-4 lg:py-6 items-start gap-4 2xl:gap-8 text-[#00b0db] md:text-black/90 px-4 lg:px-6"
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
            {t('heading')}
          </motion.p>
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              'text-lg lg:text-xl 2xl:text-2xl w-full font-bold text-[#094142] m-0',
              jakarta.className
            )}
          >
            {t('text1')}
          </motion.p>
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              'text-lg lg:text-xl 2xl:text-2xl w-full font-bold text-[#094142] m-0',
              jakarta.className
            )}
          >
            {t('text2')}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DeriveLanding;
