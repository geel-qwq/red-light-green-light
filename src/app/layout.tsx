import type { Metadata } from "next";
import "./globals.css";
import { Koulen, Instrument_Sans } from 'next/font/google';


const koulenFont = Koulen({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-koulen',
});

const instrumentSansFont = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument',
});

export const metadata: Metadata = {
  title: "ilLUMENate",
  description: "Municipal street lighting monitoring and management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${koulenFont.variable} ${instrumentSansFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
