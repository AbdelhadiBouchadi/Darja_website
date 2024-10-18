'use client';

import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import RoundedBtn from './rounded';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { cn } from '../../lib/utils';

const Contact = () => {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('HomePage.Contact');

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    isArabic ? [-60, 0] : [120, 90]
  );

  const btn1Ref = useRef<HTMLAnchorElement>(null);
  const btn2Ref = useRef<HTMLAnchorElement>(null);
  const [maxBtnWidth, setMaxBtnWidth] = useState<number | null>(null);

  useEffect(() => {
    const btn1Width = btn1Ref.current?.offsetWidth || 0;
    const btn2Width = btn2Ref.current?.offsetWidth || 0;
    const maxWidth = Math.max(btn1Width, btn2Width);
    setMaxBtnWidth(maxWidth);
  }, []);

  return (
    <motion.div
      style={{ y }}
      ref={container}
      className={cn('flex flex-col justify-center items-center  relative')}
    >
      <div
        className={cn(
          'pt-[180px] w-full max-w-[1800px] bg-[#094142]',
          isArabic ? 'arabic-title-bold' : 'latin-title-bold'
        )}
      >
        <div
          className={cn(
            'border-b border-gray-500 pb-24 mx-16 xl:mx-[200px] relative'
          )}
        >
          <h2 className="text-4xl md:text-[5vw] m-0 md:my-6 font-light text-[#ee7103] ">
            {' '}
            {t('heading')}{' '}
          </h2>
          <motion.div
            style={{ x }}
            className={cn(
              'absolute top-[calc(100%-75px)] ',
              isArabic ? 'right-[calc(100%-250px)]' : 'left-[calc(100%-250px)]'
            )}
          >
            <Link href={`/${locale}/contact`}>
              <RoundedBtn
                backgroundColor={'#00b0db'}
                className={cn(
                  'roundedBtnSize bg-[#ee7103] text-white rounded-full absolute flex items-center justify-center'
                )}
              >
                <p
                  className={cn(
                    'm-0 text-lg font-light z-[2] relative ',
                    isArabic ? 'text-xl' : ''
                  )}
                >
                  {t('action')}
                </p>
              </RoundedBtn>
            </Link>
          </motion.div>
          <motion.svg
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              'absolute top-[30%] ',
              isArabic ? 'right-[100%]  ' : 'left-[100%]'
            )}
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="#ee7103"
            />
          </motion.svg>
        </div>
        <div
          className={cn(
            'flex flex-col lg:flex-row gap-[20px] mx-16  lg:mx-[200px] mt-[180px] mb-[50px] '
          )}
        >
          <Link
            href="mailto:darja.ar2d@gmail.com"
            target="_blank"
            ref={btn1Ref}
          >
            <RoundedBtn
              className="relative group inline-flex items-center justify-center overflow-hidden rounded-full ring-offset-background transition-colors before:absolute before:left-[-10%] before:h-0 before:w-[120%] before:translate-y-3/4 before:scale-0 before:rounded-full before:pb-[120%] before:content-[''] after:absolute after:inset-0 after:h-full after:w-full after:-translate-y-full after:rounded-full after:transition-transform after:duration-300 after:ease-in-expo after:content-[''] hover:before:translate-y-0 hover:before:scale-100 hover:before:transition-transform hover:before:duration-300 hover:before:ease-in-expo hover:after:translate-y-0 hover:after:transition-transform hover:after:delay-300 hover:after:duration-75 hover:after:ease-linear focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-solid border-[#ee7103] before:bg-[#ee7103] after:bg-[#ee7103] px-16 py-4 text-base before:-top-1/2 hover:text-background"
              style={{ width: maxBtnWidth || 'auto' }}
            >
              <p
                className={cn(
                  'relative z-[1] transition-colors duration-400 group-hover:text-white m-0 text-lg latin-title-bold text-[#ee7103] '
                )}
                dir="ltr"
              >
                darja.ar2d@gmail.com
              </p>
            </RoundedBtn>
          </Link>
          <Link href="tel:+212663052322" ref={btn2Ref}>
            <RoundedBtn
              className="relative group inline-flex items-center justify-center overflow-hidden rounded-full ring-offset-background transition-colors before:absolute before:left-[-10%] before:h-0 before:w-[120%] before:translate-y-3/4 before:scale-0 before:rounded-full before:pb-[120%] before:content-[''] after:absolute after:inset-0 after:h-full after:w-full after:-translate-y-full after:rounded-full after:transition-transform after:duration-300 after:ease-in-expo after:content-[''] hover:before:translate-y-0 hover:before:scale-100 hover:before:transition-transform hover:before:duration-300 hover:before:ease-in-expo hover:after:translate-y-0 hover:after:transition-transform hover:after:delay-300 hover:after:duration-75 hover:after:ease-linear focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-solid border-[#ee7103] before:bg-[#ee7103] after:bg-[#ee7103] px-16 py-4 text-base before:-top-1/2 hover:text-white"
              style={{ width: maxBtnWidth || 'auto' }}
            >
              <p
                className={cn(
                  'relative z-[1] transition-colors duration-400 group-hover:text-white m-0 text-lg latin-title-bold text-[#ee7103] '
                )}
                dir="ltr"
              >
                +212 6 63 05 23 22
              </p>
            </RoundedBtn>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
