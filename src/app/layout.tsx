import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getLocale } from "@/lib/i18n/get-locale";
import { Providers } from "@/components/providers";
import { Navigation } from "@/components/layout/navigation";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kreativbüro Hipp | Medical Technology Design",
  description: "Solutions for innovative medical technology products of tomorrow. Located in Tuttlingen – the heart of the world centre of medical technology.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers locale={locale}>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
