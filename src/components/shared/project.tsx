'use client';

import { cn } from '../../lib/utils';
import { useLocale } from 'next-intl';
import React from 'react';

interface ProjectProps {
  index: number;
  title: string;
  manageModal: (active: boolean, index: number, x: number, y: number) => void;
  category: string;
}

const Project = ({ index, title, manageModal, category }: ProjectProps) => {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <div
      onMouseEnter={(e) => manageModal(true, index, e.clientX, e.clientY)}
      onMouseLeave={(e) => manageModal(false, index, e.clientX, e.clientY)}
      className={cn(
        'flex w-full justify-between items-center px-8 py-8 xl:py-[50px] xl:px-[100px] border-t border-t-[#C9C9C9] cursor-pointer transition-all duration-200 last:border-b last:border-b-[#C9C9C9] hover:opacity-50 group'
      )}
    >
      <h2
        className={cn(
          'font-normal text-2xl md:text-4xl xl:text-[60px] transition-all duration-300 group-hover:transform group-hover:-translate-x-2  ',
          isArabic ? 'arabic-title-bold' : 'latin-title-bold'
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          'font-normal text-lg transition-all duration-300 group-hover:transform group-hover:translate-x-2 text-[#696443]',
          isArabic ? 'arabic-subtitle-regular' : 'latin-subtitle-regular'
        )}
      >
        {category}
      </p>
    </div>
  );
};

export default Project;
