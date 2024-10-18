'use client';

import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import RoundedBtn from './rounded';
import { cn } from '../../lib/utils';
import Project from './project';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { getHomepagePosts } from '@/lib/actions/post.actions';

interface Project {
  _id: string;
  frenchTitle: string;
  arabicTitle: string;
  imageSource: string;
}

const scaleAnimation = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export default function Projects() {
  const [modal, setModal] = useState<{ active: boolean; index: number }>({
    active: false,
    index: 0,
  });
  const [posts, setPosts] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  const xMoveContainer = useRef<(x: number) => void>();
  const yMoveContainer = useRef<(y: number) => void>();
  const xMoveCursor = useRef<(x: number) => void>();
  const yMoveCursor = useRef<(y: number) => void>();
  const xMoveCursorLabel = useRef<(x: number) => void>();
  const yMoveCursorLabel = useRef<(y: number) => void>();

  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('HomePage.Work');

  const moreWork = t('moreWork');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getHomepagePosts(); // Fetch posts from server action
        setPosts(response);
      } catch (err) {
        setError('Failed to load homepage posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (modalContainer.current && cursor.current && cursorLabel.current) {
      xMoveContainer.current = gsap.quickTo(modalContainer.current, 'left', {
        duration: 0.8,
        ease: 'power3',
      });
      yMoveContainer.current = gsap.quickTo(modalContainer.current, 'top', {
        duration: 0.8,
        ease: 'power3',
      });
      xMoveCursor.current = gsap.quickTo(cursor.current, 'left', {
        duration: 0.5,
        ease: 'power3',
      });
      yMoveCursor.current = gsap.quickTo(cursor.current, 'top', {
        duration: 0.5,
        ease: 'power3',
      });
      xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, 'left', {
        duration: 0.45,
        ease: 'power3',
      });
      yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, 'top', {
        duration: 0.45,
        ease: 'power3',
      });
    }
  }, []);

  const moveItems = (x: number, y: number) => {
    xMoveContainer.current?.(x);
    yMoveContainer.current?.(y);
    xMoveCursor.current?.(x);
    yMoveCursor.current?.(y);
    xMoveCursorLabel.current?.(x);
    yMoveCursorLabel.current?.(y);
  };

  const manageModal = (
    active: boolean,
    index: number,
    x: number,
    y: number
  ) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  return (
    <main
      onMouseMove={(e: MouseEvent) => {
        moveItems(e.clientX, e.clientY);
      }}
      className={cn(
        'flex flex-col items-center xl:mt-[200px] mb-0 md:my-32 bg-[#094142] '
      )}
    >
      <div className={cn('w-full flex flex-col items-center justify-center ')}>
        <div className="w-full py-4 xl:py-8 text-end bg-[#E9EAEB] px-8 xl:px-[100px] ">
          <h5
            className={cn(
              'text-2xl xl:text-6xl text-[#ee7103]',
              isArabic ? 'arabic-title-bold' : 'latin-title-bold'
            )}
          >
            {t('heading')}
          </h5>
        </div>

        <div className="w-full px-8 xl:px-[100px]">
          {posts.map((project, index) => (
            <Link
              href={`/${locale}/derive-2024/posts/${project._id}`}
              key={index}
              className="w-full"
            >
              <Project
                index={index}
                title={isArabic ? project.arabicTitle : project.frenchTitle}
                manageModal={manageModal}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full py-8 bg-[#E9EAEB] px-8 xl:px-[100px]">
        <Link href={`/${locale}/derive-2024`}>
          <RoundedBtn className='relative text-base group inline-flex items-center justify-center overflow-hidden rounded-full font-bold ring-offset-background transition-colors before:absolute before:left-[-10%] before:h-0 before:w-[120%] before:translate-y-3/4 before:scale-0 before:rounded-full before:pb-[120%] before:content-[""] after:absolute after:inset-0 after:h-full after:w-full after:-translate-y-full after:rounded-full after:transition-transform after:duration-300 after:ease-in-expo after:content-[""] hover:before:translate-y-0 hover:before:scale-100 hover:before:transition-transform hover:before:duration-300 hover:before:ease-in-expo hover:after:translate-y-0 hover:after:transition-transform hover:after:delay-300 hover:after:duration-75 hover:after:ease-linear focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:border-2 hover:border-solid  hover:border-[#094142] before:bg-[#094142] after:bg-[#094142] px-16 py-4 before:-top-1/2 hover:text-background'>
            <p
              className={cn(
                'relative z-[1] transition-colors duration-400 text-[#094142] group-hover:text-[#00b0db] m-0 text-2xl md:text-4xl ',
                isArabic ? 'arabic-title-bold' : 'latin-title-bold'
              )}
            >
              {' '}
              {moreWork}{' '}
            </p>
          </RoundedBtn>
        </Link>
      </div>
      <>
        <motion.div
          ref={modalContainer}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? 'enter' : 'closed'}
          className={cn(
            'w-[400px] h-[350px] fixed top-1/2 left-1/2 bg-white pointer-events-none overflow-hidden z-[3] '
          )}
        >
          <div
            style={{ top: index * -100 + '%' }}
            className={cn(
              'w-full h-full relative transition-[top] duration-500 ease-[cubic-bezier(0.76, 0, 0.24, 1)]'
            )}
          >
            {posts.map((project, idx) => {
              const { imageSource, _id } = project;
              return (
                <div
                  className={cn(
                    'w-full h-full flex items-center justify-center'
                  )}
                  style={{ backgroundColor: '#00b0db' }}
                  key={`modal_${idx}`}
                >
                  <Image
                    src={imageSource}
                    width={300}
                    height={0}
                    alt="image"
                    className="h-auto"
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
        <motion.div
          ref={cursor}
          className={cn(
            'w-[80px] h-[80px] rounded-full bg-[#00b0db] text-white fixed z-[3] flex items-center justify-center text-lg font-light pointer-events-none '
          )}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? 'enter' : 'closed'}
        ></motion.div>
        <motion.div
          ref={cursorLabel}
          className={cn(
            'w-[80px] h-[80px] rounded-full bg-[#00b0db] text-white fixed z-[3] flex items-center justify-center text-lg font-light pointer-events-none bg-transparent ',
            isArabic ? 'arabic-title-bold text-2xl' : 'latin-title-bold'
          )}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? 'enter' : 'closed'}
        >
          {t('view')}
        </motion.div>
      </>
    </main>
  );
}
