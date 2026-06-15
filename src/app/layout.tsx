import type { Metadata } from "next";
import "./globals.css";

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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
