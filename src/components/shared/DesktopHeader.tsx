'use client';

import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import LocaleSwitcher from './locale-switcher-select';

const DesktopHeader = () => {
  const t = useTranslations('Layout');
  const navKeys = [
    'about',
    'derive',
    'previous',
    'darja',
    'community',
    'contact',
  ];
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50); // Change the value as needed
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'w-full justify-between hidden md:flex md:justify-between md:items-center py-2 px-4 fixed top-0 z-40 transition-all duration-300 ',
        isScrolled
          ? 'bg-gray-200/60 backdrop-blur-sm backdrop-filter '
          : 'bg-transparent bg-opacity-60'
      )}
    >
      <Link href={`/${locale}`} className="flex justify-center items-center">
        <Image
          src="/assets/derive-logo.png"
          width={60}
          height={60}
          alt="logo_image"
        />
      </Link>
      <div className="flex gap-2 md:gap-4 lg:gap-6 2xl:gap-8">
        {navKeys.map((key, i) => {
          return (
            <div key={`b_${i}`} className="flex ">
              <Link
                href={`/${locale}${t(`Navigation.${key}.href`)}`}
                className="flex flex-wrap overflow-hidden"
              >
                <div
                  className={cn(
                    'text-xl  flex items-center justify-center',
                    isScrolled ? 'text-[#141516] ' : 'text-background'
                  )}
                >
                  <span>{t(`Navigation.${key}.title`)}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className=" hover:text-gray-600/80 text-gray-950/40">
        <LocaleSwitcher />
      </div>
    </div>
  );
};

export default DesktopHeader;
