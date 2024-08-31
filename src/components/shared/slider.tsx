'use client';

import { cn } from '@/lib/utils';
import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useRef } from 'react';

const slider1 = [
  {
    color: '#141516',
    src: 'c2.jpg',
  },
  {
    color: '#00b0db',
    src: 'decimal.jpg',
  },
  {
    color: '#141516',
    src: 'funny.jpg',
  },
  {
    color: '#ee7103',
    src: 'google.jpg',
  },
];

const slider2 = [
  {
    color: '#ee7103',
    src: 'maven.jpg',
  },
  {
    color: '#141516',
    src: 'panda.jpg',
  },
  {
    color: '#00b0db',
    src: 'powell.jpg',
  },
  {
    color: '#141516',
    src: 'wix.jpg',
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
          'hidden md:flex relative gap-[3vw] w-[120vw] left-[-10vw] '
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
          'hidden md:flex relative gap-[3vw] w-[120vw] left-[-10vw] '
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
        className={cn('relative mt-[100px] bg-[#141516]')}
      >
        <div
          className={cn(
            'h-full md:h-[1550%] w-[120%] -left-[10%] custom-border-radius bg-[#E9EAEB] absolute z-[1] '
          )}
          style={{ boxShadow: '0px 60px 50px rgba(0, 0, 0, 0.748)' }}
        ></div>
      </motion.div>
    </div>
  );
};

export default SlidingImages;
