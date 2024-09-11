'use client';

import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import LocaleSwitcher from './locale-switcher-select';
import DesktopNav from './DesktopNav';

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
        'w-full justify-between hidden md:flex md:justify-between md:items-center py-2 px-4 fixed top-0 z-40 transition-all duration-300',
        isScrolled
          ? 'bg-gray-200/60 backdrop-blur-sm backdrop-filter shadow-md '
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
      <DesktopNav />
      <div className=" hover:text-gray-600/80 text-gray-950/40">
        <LocaleSwitcher />
      </div>
    </div>
  );
};

export default DesktopHeader;
