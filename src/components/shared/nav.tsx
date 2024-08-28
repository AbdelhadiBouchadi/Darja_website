'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { cn, perspective, slideIn } from '@/lib/utils';
import { TextReveal } from '../ui/typography';
import { useLocale, useTranslations } from 'next-intl';

interface NavProps {
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

const Nav = ({ setIsActive }: NavProps) => {
  const MotionLink = motion(Link);
  const t = useTranslations('Layout');
  const navKeys = [
    'home',
    'about',
    'derive',
    'previous',
    'darja',
    'community',
    'contact',
  ];
  const socialKeys = ['instagram', 'facebook', 'whatsapp'];
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <div
      className={cn(
        'flex justify-between flex-col w-full h-full px-10 pt-[100px] pb-[50px] z-[999]',
        isArabic ? 'arabic-title-bold' : 'latin-title-bold'
      )}
    >
      <div className="flex gap-2 flex-col">
        {navKeys.map((key, i) => {
          return (
            <div
              key={`b_${i}`}
              className="linkContainer"
              onClick={() => setIsActive(false)}
            >
              <Link
                href={t(`Navigation.${key}.href`)}
                className="flex flex-wrap overflow-hidden"
              >
                <motion.div
                  variants={perspective}
                  custom={i}
                  initial="initial"
                  animate="enter"
                  whileHover="whileHover"
                  whileTap="whileHover"
                  exit="exit"
                  className="text-3xl text-background flex items-center justify-between"
                >
                  <motion.span
                    variants={{
                      initial: { x: isArabic ? 20 : -20 },
                      whileHover: { x: 0 },
                    }}
                  >
                    <ArrowRight className={`${isArabic ? 'rotate-180' : ''}`} />
                  </motion.span>
                  <motion.span
                    variants={{
                      initial: { x: 0 },
                      whileHover: { x: isArabic ? -20 : 20 },
                    }}
                  >
                    {t(`Navigation.${key}.title`)}
                  </motion.span>
                </motion.div>
              </Link>
            </div>
          );
        })}
      </div>
      <motion.div className="flex flex-wrap">
        {socialKeys.map((key, i) => {
          return (
            <MotionLink
              href={t(`Socials.${key}.url`)}
              className=" w-1/2 mt-1 text-background text-lg"
              variants={slideIn}
              custom={i}
              initial="initial"
              animate="enter"
              exit="exit"
              key={i}
              target="_blank"
            >
              <TextReveal>{t(`Socials.${key}.title`)}</TextReveal>
            </MotionLink>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Nav;
