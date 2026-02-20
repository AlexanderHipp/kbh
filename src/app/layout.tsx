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
  title: "Studio | Visual Production",
  description: "Minimal production. Maximum clarity. From concept to a coherent series of visuals.",
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
