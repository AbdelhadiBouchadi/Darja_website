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
  const imageContainerRef2 = useRef(null);
  const imageContainerRef3 = useRef(null);
  const isInView = useInView(imageContainerRef);
  const isInView2 = useInView(imageContainerRef2);
  const isInView3 = useInView(imageContainerRef3);
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
    target: imageContainerRef,
    offset: ['start end', 'end end'], // When section starts and ends
  });

  // Create a zoom effect: scaling from 1 to 1.3 based on scroll position
  const backgroundSize = useTransform(
    scrollYProgress,
    [0.4, 1],
    isMobile ? ['cover', 'cover'] : ['100%', '130%']
  );

  return (
    <section ref={sectionRef} data-scroll-section="" className="">
      <div className="relative flex h-full w-full">
        <SubHeader />
      </div>
      <motion.div
        ref={imageContainerRef}
        className={cn(
          'bg-derive w-full min-h-screen relative py-8 lg:mt-72 2xl:mt-80  flex flex-col lg:flex-row lg:items-center border-b-2 z-20',
          isArabic ? 'text-lg' : 'text-sm'
        )}
        style={{ backgroundSize }}
      >
        <motion.div
          className="lg:absolute lg:right-0 lg:-bottom-32 lg:h-auto lg:bg-[#E9EAEB] lg:w-[40%] bg-white/70 h-fit  my-16 lg:flex flex-col justify-start py-4 lg:py-6 items-start gap-4 2xl:gap-8 text-[#00b0db] md:text-black/90 px-4 lg:px-6"
          variants={descOpacity}
          animate={isInView ? 'open' : 'closed'}
        >
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              'w-full font-bold text-[#094142] m-0',
              jakarta.className
            )}
          >
            {t('text3')}
          </motion.p>
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              'w-full font-bold text-[#094142] m-0',
              jakarta.className
            )}
          >
            {t('text4')}
          </motion.p>
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              ' w-full font-bold text-[#094142] m-0',
              jakarta.className
            )}
          >
            {t('text5')}
          </motion.p>
        </motion.div>
        <motion.div
          className="lg:absolute lg:left-0 lg:top-0 lg:h-auto lg:bg-[#E9EAEB] lg:w-[40%] bg-white/70 h-fit lg:flex flex-col justify-start py-4 lg:py-6 items-start gap-4 2xl:gap-8 text-[#00b0db] md:text-black/90 px-4 lg:px-6"
          variants={descOpacity}
          animate={isInView ? 'open' : 'closed'}
        >
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              ' w-full font-bold text-[#094142] m-0',
              jakarta.className
            )}
          >
            {t('heading')}
          </motion.p>
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              ' w-full font-bold text-[#094142] m-0',
              jakarta.className
            )}
          >
            {t('text1')}
          </motion.p>
          <motion.p
            variants={descOpacity}
            animate={isInView ? 'open' : 'closed'}
            className={cn(
              ' w-full font-bold text-[#094142] m-0',
              jakarta.className
            )}
          >
            {t('text2')}
          </motion.p>
        </motion.div>
      </motion.div>
      <motion.div
        ref={imageContainerRef2}
        className={cn(
          'bg-derive2 w-full min-h-screen relative py-8 flex flex-col lg:flex-row lg:items-center border-b-2 z-10',
          isArabic ? 'text-lg' : 'text-sm'
        )}
        style={{ backgroundSize }}
      >
        {locale === 'fr' && (
          <>
            <motion.div
              className="hidden lg:absolute lg:right-0 lg:-bottom-16 lg:h-auto lg:bg-[#E9EAEB] lg:w-[40%] bg-white/70 h-fit  my-16 lg:flex flex-col justify-start py-4 lg:py-6 items-start gap-4 2xl:gap-8 text-[#00b0db] md:text-black/90 px-4 lg:px-6"
              variants={descOpacity}
              animate={isInView2 ? 'open' : 'closed'}
            >
              <motion.p
                variants={descOpacity}
                animate={isInView2 ? 'open' : 'closed'}
                className={cn(
                  ' w-full font-bold text-[#094142] m-0',
                  jakarta.className
                )}
              >
                {t('text10')}
              </motion.p>
              <motion.p
                variants={descOpacity}
                animate={isInView2 ? 'open' : 'closed'}
                className={cn(
                  ' w-full font-bold text-[#094142] m-0',
                  jakarta.className
                )}
              >
                {t('text11')}
              </motion.p>
              <motion.p
                variants={descOpacity}
                animate={isInView2 ? 'open' : 'closed'}
                className={cn(
                  ' w-full font-bold text-[#094142] m-0',
                  jakarta.className
                )}
              >
                {t('text12')}
              </motion.p>
              <motion.p
                variants={descOpacity}
                animate={isInView2 ? 'open' : 'closed'}
                className={cn(
                  ' w-full font-bold text-[#094142] m-0',
                  jakarta.className
                )}
              >
                {t('bottom')}
              </motion.p>
            </motion.div>
          </>
        )}
        <motion.div
          className="lg:absolute lg:left-0 lg:top-0 lg:h-auto lg:bg-[#E9EAEB] lg:w-[40%] bg-white/70 h-fit   lg:flex flex-col justify-start py-4 lg:py-6 items-start gap-4 2xl:gap-8 text-[#00b0db] md:text-black/90 px-4 lg:px-6"
          variants={descOpacity}
          animate={isInView2 ? 'open' : 'closed'}
        >
          <motion.p
            variants={descOpacity}
            animate={isInView2 ? 'open' : 'closed'}
            className={cn(
              ' w-full font-bold text-[#094142] m-0',
              jakarta.className
            )}
          >
            {t('text6')}
          </motion.p>
          {locale === 'ar' && (
            <motion.p
              variants={descOpacity}
              animate={isInView2 ? 'open' : 'closed'}
              className={cn(
                ' w-full font-bold text-[#094142] m-0',
                jakarta.className
              )}
            >
              {t('bottom')}
            </motion.p>
          )}
          {locale === 'fr' && (
            <>
              <motion.p
                variants={descOpacity}
                animate={isInView2 ? 'open' : 'closed'}
                className={cn(
                  ' w-full font-bold text-[#094142] m-0',
                  jakarta.className
                )}
              >
                {t('text7')}
              </motion.p>
              <motion.p
                variants={descOpacity}
                animate={isInView2 ? 'open' : 'closed'}
                className={cn(
                  ' w-full font-bold text-[#094142] m-0',
                  jakarta.className
                )}
              >
                {t('text8')}
              </motion.p>
              <motion.p
                variants={descOpacity}
                animate={isInView2 ? 'open' : 'closed'}
                className={cn(
                  ' w-full font-bold text-[#094142] m-0',
                  jakarta.className
                )}
              >
                {t('text9')}
              </motion.p>
            </>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DeriveLanding;
