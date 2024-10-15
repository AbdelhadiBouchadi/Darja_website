'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import LocaleSwitcher from './locale-switcher-select';

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
    <NavigationMenu className="h-full w-screen justify-between">
      <NavigationMenuList className="h-[15vh] w-screen justify-between">
        <NavigationMenuItem className="w-full h-full flex justify-center items-center">
          <NavigationMenuTrigger
            className={cn(
              ' text-xl text-[#00b0db] bg-transparent font-extrabold',

              isArabic ? 'arabic-subtitle-regular' : 'latin-subtitle-regular'
            )}
          >
            {t('Navigation.derivecasa')}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-[#094142]">
            <ul
              className="flex flex-col w-[400px] gap-3 p-4 "
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {deriveNavKeys.map((deriveNav, i) => (
                <NavigationMenuLink
                  key={`b_${i}`}
                  href={`/${locale}${t(`Navigation.${deriveNav}.href`)}`}
                  className={cn(
                    'group inline-flex h-10 w-max items-center justify-center rounded-md  px-4 py-2 text-xl transition-colors hover:bg-[#ee7103] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-[#00b0db] text-[#00b0db] font-extrabold',
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
            <NavigationMenuItem
              key={`b_${i}`}
              className="w-full h-full mx-auto flex justify-center items-center border-l-2 border-white"
            >
              <NavigationMenuLink
                href={`/${locale}${t(`Navigation.${key}.href`)}`}
                className={cn(
                  'group  h-10 w-max items-center justify-center  px-4 py-2 transition-colors bg-[#094142] text-[#00b0db] disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-[#00b0db] data-[state=open]:bg-[#00b0db] text-xl font-extrabold ',
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
        <NavigationMenuItem className="w-full h-full flex justify-center items-center border-l-2 border-white mx-auto">
          <LocaleSwitcher />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNav;
