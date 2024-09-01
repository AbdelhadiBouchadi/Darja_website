'use client';

import { cn } from '@/lib/utils';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import React, { useRef } from 'react';

const slider1 = [
  {
    color: '#141516',
    src: '14.png',
  },
  {
    color: '#00b0db',
    src: '15.png',
  },
  {
    color: '#141516',
    src: '17.png',
  },
  {
    color: '#ee7103',
    src: '18.png',
  },
];

const slider2 = [
  {
    color: '#ee7103',
    src: '19.png',
  },
  {
    color: '#141516',
    src: '31.png',
  },
  {
    color: '#00b0db',
    src: '49.png',
  },
  {
    color: '#141516',
    src: 'about-image.png',
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

  return (
    <div
      ref={container}
      className={cn(
        'flex flex-col gap-[3vw] relative bg-[#E9EAEB] mt-16 md:mt-[200px] z-[1]'
      )}
    >
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
              style={{ backgroundColor: project.color }}
            >
              <div className={cn('relative w-[80%] h-[80%] ')}>
                <Image
                  fill={true}
                  alt={'image'}
                  src={`/images/${project.src}`}
                  className="object-cover"
                />
              </div>
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
              style={{ backgroundColor: project.color }}
            >
              <div key={index} className={cn('relative w-[80%] h-[80%] ')}>
                <Image
                  fill={true}
                  alt={'image'}
                  src={`/images/${project.src}`}
                  className="object-cover"
                />
              </div>
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
