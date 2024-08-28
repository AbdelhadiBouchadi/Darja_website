'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
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
import { GlobeIcon } from 'lucide-react';

export default function LocaleSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('LanguageSwitcher');

  function handleLocaleChange(nextLocale: string) {
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="bg-transparent">
        <Button
          type="button"
          variant="default"
          size="icon"
          className="group transition-all duration-300"
        >
          <GlobeIcon className="size-8 text-[#00b0db] group-hover:text-white " />
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
