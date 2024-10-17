import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

const SubHeader = () => {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('Layout.SubHeader');

  return (
    <div className="subheader w-full flex items-center justify-between py-6 absolute top-[15vh] left-0 px-4">
      <div
        className={cn(
          'flex flex-col justify-center items-start text-[#094142] text-xl lg:text-3xl font-semibold ',
          isArabic ? 'arabic-subtitle-regular' : 'latin-subtitle-regular'
        )}
      >
        <span> {t('derive')} </span>
        <span> {t('casa')} </span>
      </div>
      <div
        className={cn(
          'flex flex-col justify-center  text-[#ee7103] text-xl lg:text-3xl font-semibold',
          isArabic
            ? 'arabic-subtitle-regular items-start'
            : 'latin-subtitle-regular items-end'
        )}
        dir="ltr"
      >
        <span> {t('date')} </span>
        <span> {t('lieu')} </span>
      </div>
    </div>
  );
};

export default SubHeader;
