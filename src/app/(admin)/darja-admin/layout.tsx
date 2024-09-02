import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Espace Darja Admin',
  description:
    "Rejoignez-nous à Darja, le festival de musique ultime célébrant la diversité des rythmes et des cultures. Vivez une fusion de sons traditionnels et contemporains, avec des performances d'artistes de renommée mondiale dans une ambiance inoubliable. Découvrez la magie de la musique à Darja !",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${inter.className} 
        } bg-[#E9EAEB] text-gray-950 relative`}
      >
        {children}
      </body>
    </html>
  );
}
