'use client';

import { useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { AnimatePresence, motion } from 'framer-motion';
import { TextReveal } from '../ui/typography';
import { cn, menu } from '../../lib/utils';
import Nav from './nav';
import { Transition } from '../ui/transitions';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcher from './locale-switcher-select';
import Image from 'next/image';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');
  const t = useTranslations('Layout');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <>
      <Transition className="absolute md:top-8 top-4 md:left-8 left-6 z-30 hover:text-[#00b0db]/60 text-[#00b0db] flex md:hidden ">
        <Link href={`/${locale}`}>
          <Image
            src="/assets/derive-logo.png"
            width={60}
            height={60}
            alt="logo_image"
          />
        </Link>
      </Transition>

      <motion.div
        initial={{
          height: isActive ? '100%' : '0',
        }}
        animate={{
          height: isActive ? (isMobile ? '100%' : '94%') : '0',
        }}
        className={cn(
          'fixed md:right-12 right-0 z-20 flex md:hidden',
          isActive ? 'top-0' : 'top-6'
        )}
      >
        <motion.div
          className="md:w-[480px] w-full h-full bg-[#00b0db] relative rounded-3xl"
          variants={menu(isMobile)}
          animate={isActive ? 'open' : 'closed'}
          initial="closed"
        >
          <AnimatePresence>
            {isActive && <Nav setIsActive={setIsActive} />}
          </AnimatePresence>
        </motion.div>
        <Button
          isActive={isActive}
          toggleMenu={() => {
            setIsActive(!isActive);
          }}
        />
      </motion.div>
    </>
  );
};

export default Header;

function Button({
  isActive,
  toggleMenu,
}: {
  isActive: boolean;
  toggleMenu: () => void;
}) {
  const t = useTranslations('Layout');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <>
      <div className="absolute md:top-0 top-4 right-4 md:right-0 w-[100px] h-10 rounded-full overflow-hidden cursor-pointer">
        <motion.div
          className={cn(
            'relative w-full h-full',
            isArabic ? 'arabic-subtitle-bold' : 'latin-subtitle-bold'
          )}
          animate={{ top: isActive ? '-100%' : '0%' }}
          transition={{
            duration: 0.5,
            type: 'tween',
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <motion.div
            className="bg-[#00b0db] h-full w-full grid place-items-center text-gray-50"
            onClick={() => {
              toggleMenu();
            }}
          >
            <TextReveal
              className={cn('capitalize font-bold', isArabic ? 'text-xl' : '')}
            >
              {t('Menu.menu').toString()}
            </TextReveal>
          </motion.div>
          <motion.div
            className="bg-[#ee7103] h-full w-full grid place-items-center text-gray-50"
            onClick={() => {
              toggleMenu();
            }}
          >
            <TextReveal
              className={cn('capitalize font-bold', isArabic ? 'text-xl' : '')}
            >
              {t('Menu.close').toString()}
            </TextReveal>
          </motion.div>
        </motion.div>
      </div>
      <div className="fixed  top-10 right-32 z-30 hover:text-gray-600/80 text-gray-950/40">
        <LocaleSwitcher />
      </div>
    </>
  );
}
