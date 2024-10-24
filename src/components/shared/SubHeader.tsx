import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

const SubHeader = () => {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('Layout.SubHeader');

  return (
    <>
      <div className="subheader w-full flex flex-col items-center justify-between py-6 absolute top-[15vh] left-0 px-4">
        <div className="w-full flex justify-between items-center">
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
        <div className="w-screen h-[0.125rem] my-10 bg-[#094142] " />
      </div>
    </>
  );
};

export default SubHeader;
