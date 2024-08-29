'use client';

import React from 'react';
import Image from 'next/image';
import { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import RoundedBtn from './rounded';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

const Contact = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('HomePage.Contact');

  return (
    <motion.div
      style={{ y }}
      ref={container}
      className={cn(
        'flex flex-col justify-center items-center bg-[#141516] relative text-white '
      )}
    >
      <div
        className={cn(
          'pt-[200px] w-full max-w-[1800px] bg-[#141516] ',
          isArabic ? 'arabic-title-bold' : 'latin-title-bold'
        )}
      >
        <div
          className={cn(
            'border-b border-gray-500 pb-24 mx-16 xl:mx-[200px] relative'
          )}
        >
          <div
            className={cn(
              'w-[100px] h-[100px] relative rounded-full overflow-hidden flex justify-center items-center '
            )}
          >
            <Image
              fill={true}
              alt={'image'}
              src={`/images/background.jpg`}
              className="object-cover"
            />
          </div>
          <h2 className="text-[5vw] m-0 font-light text-[#696443] ">
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
                backgroundColor={'#696443'}
                className={cn(
                  'w-[180px] h-[180px] bg-[#00b0db] text-white rounded-full absolute flex items-center justify-center'
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
              isArabic ? 'right-[100%] ' : 'left-[100%]'
            )}
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="#696443"
            />
          </motion.svg>
        </div>
        <div
          className={cn(
            'flex flex-col lg:flex-row gap-[20px] mx-16  lg:mx-[200px] my-[180px] '
          )}
        >
          <Link href="mailto:darja@darjaprod.com" target="_blank">
            <RoundedBtn className="relative group inline-flex items-center justify-center overflow-hidden rounded-full ring-offset-background transition-colors before:absolute before:left-[-10%] before:h-0 before:w-[120%] before:translate-y-3/4 before:scale-0 before:rounded-full before:pb-[120%] before:content-[''] after:absolute after:inset-0 after:h-full after:w-full after:-translate-y-full after:rounded-full after:transition-transform after:duration-300 after:ease-in-expo after:content-[''] hover:before:translate-y-0 hover:before:scale-100 hover:before:transition-transform hover:before:duration-300 hover:before:ease-in-expo hover:after:translate-y-0 hover:after:transition-transform hover:after:delay-300 hover:after:duration-75 hover:after:ease-linear focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-solid border-[#696443] before:bg-[#00b0db] after:bg-[#00b0db] px-16 py-4 text-base before:-top-1/2 hover:text-background">
              <p
                className={cn(
                  'relative z-[1] transition-colors duration-400 group-hover:text-white m-0 text-lg latin-title-bold text-[#696443] '
                )}
                dir="ltr"
              >
                info@darja_mail.com
              </p>
            </RoundedBtn>
          </Link>
          <Link href="https://wa.me/+33627847430">
            <RoundedBtn className="relative group inline-flex items-center justify-center overflow-hidden rounded-full ring-offset-background transition-colors before:absolute before:left-[-10%] before:h-0 before:w-[120%] before:translate-y-3/4 before:scale-0 before:rounded-full before:pb-[120%] before:content-[''] after:absolute after:inset-0 after:h-full after:w-full after:-translate-y-full after:rounded-full after:transition-transform after:duration-300 after:ease-in-expo after:content-[''] hover:before:translate-y-0 hover:before:scale-100 hover:before:transition-transform hover:before:duration-300 hover:before:ease-in-expo hover:after:translate-y-0 hover:after:transition-transform hover:after:delay-300 hover:after:duration-75 hover:after:ease-linear focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-solid border-[#696443] before:bg-[#00b0db] after:bg-[#00b0db] px-16 py-4 text-base before:-top-1/2 hover:text-white">
              <p
                className={cn(
                  'relative z-[1] transition-colors duration-400 group-hover:text-white m-0 text-lg latin-title-bold text-[#696443] '
                )}
                dir="ltr"
              >
                +33 6 27 84 74 30
              </p>
            </RoundedBtn>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
