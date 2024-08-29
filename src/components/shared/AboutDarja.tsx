'use client';

import { cn } from '@/lib/utils';
import { useInView, motion, useTransform, useScroll } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useRef } from 'react';
import RoundedBtn from './rounded';

const AboutDarja = () => {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('AboutPage');
  const container = useRef(null);
  const isInView = useInView(container);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div
      className={cn(
        ' my-32 xl:my-[200px] flex flex-col justify-center 2xl:flex-row h-full '
      )}
    >
      <div
        ref={container}
        className="max-w-[1400px] relative flex flex-col gap-[50px] border-b border-gray-500 pb-24 mx-16 xl:mx-[200px] "
      >
        <h2
          className={cn(
            'text-4xl xl:text-8xl m-0 font-bold text-[#696443] ',
            isArabic ? 'arabic-title-bold' : 'latin-title-bold'
          )}
        >
          {' '}
          {t('Section.title')}{' '}
        </h2>

        <motion.div
          style={{ x }}
          className={cn(
            'absolute top-[calc(100%-75px)] ',
            isArabic ? 'right-[calc(100%-250px)]' : 'left-[calc(100%-250px)]'
          )}
        >
          <RoundedBtn
            backgroundColor={'#696443'}
            className={cn(
              'w-[180px] h-[180px] bg-[#00b0db] text-white rounded-full absolute flex items-center justify-center'
            )}
          >
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
        </motion.div>
      </div>
    </div>
  );
};

export default AboutDarja;
