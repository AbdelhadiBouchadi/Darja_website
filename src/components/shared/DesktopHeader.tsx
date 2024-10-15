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
        'w-screen justify-center hidden xl:flex xl:justify-center xl:items-center fixed top-0 z-40 transition-all duration-300 gap-20 bg-[#094142] h-[15vh] '
      )}
    >
      <DesktopNav />
    </div>
  );
};

export default DesktopHeader;
