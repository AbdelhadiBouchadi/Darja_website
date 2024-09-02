import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Providers } from '@/components/shared/providers';
import Header from '@/components/shared/header';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Darja',
  description:
    "Rejoignez-nous à Darja, le festival de musique ultime célébrant la diversité des rythmes et des cultures. Vivez une fusion de sons traditionnels et contemporains, avec des performances d'artistes de renommée mondiale dans une ambiance inoubliable. Découvrez la magie de la musique à Darja !",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${inter.className} ${
          locale === 'ar' ? '__rtl_lang text-right' : ''
        } bg-[#E9EAEB] text-gray-950 relative`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Header />
            {children}
            <Toaster position="top-right" />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
