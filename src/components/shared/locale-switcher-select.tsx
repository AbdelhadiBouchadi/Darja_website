'use client';

import { cn } from '../../lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, ReactNode, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('LanguageSwitcher');

  function handleLocaleChange(nextLocale: string) {
    const path = pathname.replace(`/${locale}`, `/${nextLocale}`);
    const search = searchParams.toString();
    const newUrl = search ? `${path}?${search}` : path;

    startTransition(() => {
      router.replace(newUrl);
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="bg-transparent">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="group w-full px-2 transition-all duration-300"
        >
          {/* <GlobeIcon className="size-8 text-[#00b0db] group-hover:text-white " /> */}
          <p className="latin-title-bold font-[800] text-xl text-[#00b0db]">
            {' '}
            FR / AR
          </p>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-[#00b0db] text-white">
        <DropdownMenuLabel
          className={cn(
            isArabic ? 'arabic-subtitle-bold text-xl' : 'latin-subtitle-bold'
          )}
        >
          {' '}
          {t('heading')}{' '}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
          checked={locale === 'fr'}
          onClick={() => handleLocaleChange('fr')}
          disabled={isPending}
          className={cn(
            isArabic ? 'arabic-subtitle-bold text-lg' : 'latin-subtitle-bold'
          )}
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          {t('french')}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={locale === 'ar'}
          onClick={() => handleLocaleChange('ar')}
          disabled={isPending}
          className={cn(
            isArabic ? 'arabic-subtitle-bold text-lg' : 'latin-subtitle-bold'
          )}
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          {t('arabic')}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
