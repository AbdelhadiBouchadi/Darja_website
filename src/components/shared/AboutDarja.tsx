'use client';

import { cn, descSlideUp } from '@/lib/utils';
import { useInView, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import React, { useRef } from 'react';
import RoundedBtn from './rounded';

const AboutDarja = () => {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('AboutPage');
  const container = useRef(null);
  const isInView = useInView(container);

  return (
    <div className="my-32 xl:my-[200px] flex flex-col justify-center 2xl:flex-row h-full">
      <div
        ref={container}
        className="max-w-[1400px] relative flex flex-col gap-[50px] border-b border-gray-500 pb-24 mx-16 xl:mx-[200px]"
      >
        <motion.h2
          variants={descSlideUp}
          animate={isInView ? 'open' : 'closed'}
          className={`text-4xl xl:text-8xl m-0 font-bold text-[#696443] ${
            isArabic ? 'arabic-title-bold' : 'latin-title-bold'
          }`}
        >
          {t('Section.title')}
        </motion.h2>
        <div
          className={`absolute top-[calc(100%-75px)] ${
            isArabic ? 'right-[calc(100%-250px)]' : 'left-[calc(100%-250px)]'
          }`}
        >
          <RoundedBtn className="roundedBtnSize bg-[#696443] text-white rounded-full absolute flex items-center justify-center">
            <div className="globe">
              <div className="globe-wrap">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle-hor"></div>
                <div className="circle-hor-middle"></div>
              </div>
            </div>
          </RoundedBtn>
        </div>
      </div>
    </div>
  );
};

export default AboutDarja;
