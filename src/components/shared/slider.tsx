'use client';

import { cn } from '../../lib/utils';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';

const slider1 = [
  {
    color: 'linear-gradient(135deg, #094142 0%, #00b0db 100%)',
    src: 'slider3.jpg',
  },
  {
    color: 'linear-gradient(90deg, #00b0db 0%, #ee7103 100%)',
    src: 'slider5.jpg',
  },
  {
    color: 'linear-gradient(90deg, #ee7103 0%, #00b0db 100%)',
    src: 'slider2.jpg',
  },
  {
    color: 'linear-gradient(135deg, #00b0db 0%, #094142 100%)',
    src: 'slider7.jpg',
  },
];

const slider2 = [
  {
    color: 'linear-gradient(135deg, #00b0db 0%, #094142 100%)',
    src: 'slider2.jpg',
  },
  {
    color: 'linear-gradient(90deg, #ee7103 0%, #00b0db 100%)',
    src: 'slider1.jpg',
  },
  {
    color: 'linear-gradient(90deg, #00b0db 0%, #ee7103 100%)',
    src: 'slider7.jpg',
  },
  {
    color: 'linear-gradient(135deg, #094142 0%, #00b0db 100%)',
    src: 'slider3.jpg',
  },
];

const SlidingImages = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [150, 0]);

  const locale = useLocale();
  const isArabic = locale === 'ar';

  const t = useTranslations('HomePage.Community');

  return (
    <div
      ref={container}
      className={cn(
        'flex flex-col gap-[3vw] relative bg-[#E9EAEB] mt-16 md:mt-[200px] z-[1]'
      )}
    >
      <div className="w-full py-4 xl:py-8 text-start bg-[#E9EAEB] px-8 xl:px-[100px] ">
        <h5
          className={cn(
            'text-2xl xl:text-6xl text-[#ee7103]',
            isArabic ? 'arabic-title-bold' : 'latin-title-bold'
          )}
        >
          {t('heading')}
        </h5>
      </div>
      <motion.div
        style={{ x: x1 }}
        className={cn(
          'hidden md:flex relative gap-[3vw] w-[120vw]  ',
          isArabic ? 'right-[-10vw]' : 'left-[-10vw]'
        )}
      >
        {slider1.map((project, index) => {
          return (
            <div
              key={index}
              className={cn('w-1/4 h-[20vw] flex justify-center items-center ')}
              style={{ backgroundImage: project.color }}
            >
              <Link
                href={`/${locale}`}
                className="w-full h-full flex justify-center items-center group"
              >
                <div
                  className={cn('relative w-[80%] h-[80%] overflow-hidden ')}
                >
                  <Image
                    fill={true}
                    alt={'image'}
                    src={`/images/${project.src}`}
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </motion.div>
      <motion.div
        style={{ x: x2 }}
        className={cn(
          'hidden md:flex relative gap-[3vw] w-[120vw]  ',
          isArabic ? 'right-[-10vw]' : 'left-[-10vw]'
        )}
      >
        {slider2.map((project, index) => {
          return (
            <div
              key={index}
              className={cn('w-1/4 h-[20vw] flex justify-center items-center ')}
              style={{ backgroundImage: project.color }}
            >
              <Link
                href={`/${locale}`}
                className="w-full h-full flex justify-center items-center group"
              >
                <div
                  className={cn('relative w-[80%] h-[80%] overflow-hidden ')}
                >
                  <Image
                    fill={true}
                    alt={'image'}
                    src={`/images/${project.src}`}
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </motion.div>
      <motion.div
        style={{ height }}
        className={cn('relative mt-24 bg-[#141516]')}
      >
        <div
          className={cn(
            'h-full md:h-[250%] w-[120%] -left-[10%] custom-border-radius bg-[#E9EAEB] absolute z-[1] '
          )}
          style={{ boxShadow: '0px 60px 50px rgba(0, 0, 0, 0.748)' }}
        ></div>
      </motion.div>
    </div>
  );
};

export default SlidingImages;
