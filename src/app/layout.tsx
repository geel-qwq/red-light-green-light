import type { Metadata } from "next";
import { Koulen, Instrument_Sans } from "next/font/google";
import SessionProvider from "@/components/SessionProvider";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import "./globals.css";

const koulenFont = Koulen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-koulen",
});

const instrumentSansFont = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "ilLUMENate",
  description: "Municipal street lighting monitoring and management",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${koulenFont.variable} ${instrumentSansFont.variable}`}
      >
        <SessionProvider>
          <ThemeProviderWrapper>
            {children}
          </ThemeProviderWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
