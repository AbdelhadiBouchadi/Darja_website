'use client';

import React, { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { cn, descOpacity, descSlideUp } from '@/lib/utils';
import RoundedBtn from './rounded';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

const Description = () => {
  const description = useRef(null);
  const isInView = useInView(description);
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('HomePage');
  const phrase = t('Hero.description');

  return (
    <div className="px-16 xl:px-[200px] my-32 xl:my-[200px] flex flex-col justify-center 2xl:flex-row h-full ">
      <div
        ref={description}
        className="max-w-[1400px] relative flex flex-col gap-[50px] "
      >
        <p
          className={cn(
            'm-0 text-lg xl:text-3xl gap-2 xl:leading-[3rem] font-bold ',
            isArabic ? 'arabic-text-bold' : 'latin-text-semibold'
          )}
        >
          {phrase.split(' ').map((word, index) => {
            return (
              <span
                key={index}
                className="mr-1 relative overflow-hidden inline-flex"
              >
                <motion.span
                  className="mr-1"
                  variants={descSlideUp}
                  custom={index}
                  animate={isInView ? 'open' : 'closed'}
                  key={index}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>
        <motion.p
          variants={descOpacity}
          animate={isInView ? 'open' : 'closed'}
          className={cn(
            'text-lg w-[80%] font-light m-0 ',
            isArabic ? 'arabic-subtitle-regular' : 'latin-text-regular'
          )}
        >
          {t('Hero.subtitle')}
        </motion.p>
        <Link href={`/${locale}/about`}>
          <div data-scroll data-scroll-speed={0.1}>
            <RoundedBtn
              className={cn(
                'group absolute top-[95%]  roundedBtnSize bg-[#1C1D20] text-white rounded-full flex items-center justify-center cursor-pointer before:absolute before:left-[-10%] before:top-[-10%] before:h-0 before:w-[120%] before:translate-y-3/4 before:scale-0 before:rounded-full before:pb-[120%] before:content-[""] after:absolute after:inset-0 after:h-full after:w-full after:-translate-y-full after:rounded-full after:transition-transform after:duration-300 after:ease-in-expo after:content-[""] hover:before:translate-y-0 hover:before:scale-100 hover:before:transition-transform hover:before:duration-300 hover:before:ease-in-expo hover:after:translate-y-0 hover:after:transition-transform hover:after:delay-300 hover:after:duration-75 hover:after:ease-linear before:bg-[#00b0db] after:bg-[#00b0db]',
                isArabic
                  ? 'right-[calc(100%-200px)]'
                  : 'left-[calc(100%-200px)]'
              )}
            >
              <p
                className={cn(
                  'relative z-[1] transition-colors duration-400 group-hover:text-white m-0 text-lg font-light ',
                  isArabic ? 'arabic-title-bold' : 'latin-title-bold'
                )}
              >
                {t('Hero.about')}
              </p>
            </RoundedBtn>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Description;
