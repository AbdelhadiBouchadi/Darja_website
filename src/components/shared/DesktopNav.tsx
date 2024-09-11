'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const DesktopNav = () => {
  const t = useTranslations('Layout');
  const navKeys = ['darja', 'community', 'contact'];
  const deriveNavKeys = ['about', 'derive', 'previous'];
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
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              'bg-transparent hover:bg-[#00b0db] text-xl ',
              isScrolled ? 'text-[#141516] ' : 'text-background',
              isArabic ? 'arabic-subtitle-regular' : 'latin-subtitle-regular'
            )}
          >
            {t('Navigation.derivecasa')}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-[#00b0db]">
            <ul
              className="flex flex-col w-[400px] gap-3 p-4 "
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {deriveNavKeys.map((deriveNav, i) => (
                <NavigationMenuLink
                  key={`b_${i}`}
                  href={`/${locale}${t(`Navigation.${deriveNav}.href`)}`}
                  className={cn(
                    'group inline-flex h-10 w-max items-center justify-center rounded-md  px-4 py-2 text-xl font-medium transition-colors hover:bg-[#ee7103] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-[#00b0db] data-[state=open]:bg-[#00b0db]',
                    isScrolled ? 'text-[#141516] ' : 'text-background',
                    isArabic
                      ? 'arabic-subtitle-regular'
                      : 'latin-subtitle-regular'
                  )}
                >
                  {t(`Navigation.${deriveNav}.title`)}
                </NavigationMenuLink>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {navKeys.map((key, i) => {
          return (
            <NavigationMenuItem key={`b_${i}`}>
              <NavigationMenuLink
                href={`/${locale}${t(`Navigation.${key}.href`)}`}
                className={cn(
                  'group inline-flex h-10 w-max items-center justify-center rounded-md  px-4 py-2  font-medium transition-colors hover:bg-[#00b0db] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-[#00b0db] data-[state=open]:bg-[#00b0db] text-xl',
                  isScrolled ? 'text-[#141516] ' : 'text-background',
                  isArabic
                    ? 'arabic-subtitle-regular'
                    : 'latin-subtitle-regular'
                )}
              >
                {t(`Navigation.${key}.title`)}
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNav;
