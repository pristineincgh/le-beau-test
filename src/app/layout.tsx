import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Le Beau',
  description: 'Le Beau - Luxury Beauty Experience',
  openGraph: {
    title: 'Le Beau',
    description: 'Le Beau - Luxury Beauty Experience',
  },
  icons: {
    icon: './favicon.ico',
    apple: './apple-icon.png',
  },
  manifest: './manifest.json',
  other: {
    'apple-mobile-web-app-title': 'Le Beau',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Le Beau" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster position="top-center" richColors />

        {/* Google Translate Widget */}
        {/* <div className="gtranslate_wrapper"></div>

        <Script id="gtranslate-settings">
          {`window.gtranslateSettings = {"default_language":"en","detect_browser_language":true,"languages":["en","fr","it","es"],"wrapper_selector":".gtranslate_wrapper","switcher_horizontal_position":"right","float_switcher_open_direction":"bottom"}`}
        </Script>
        <Script
          src="https://cdn.gtranslate.net/widgets/latest/float.js"
          defer
        ></Script> */}
      </body>
    </html>
  );
}
