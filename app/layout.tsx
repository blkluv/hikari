import { Metadata } from 'next';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/utils/helpers';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import type { Viewport } from 'next';
import { RootProvider } from 'fumadocs-ui/provider';
import { TRPCReactProvider } from '@/trpc/react';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
};

import '@/styles/globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  // src: "../assets/fonts/NotoSansMono-VariableFont_wdth,wght.ttf",
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading'
});

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    'spiritual live class',
    'tech live classes',
    'wizard of hahz',
    'Hahz Terry',
    'Crypto live class'
  ],
  authors: [
    {
      name: 'wizard of hahz',
      url: 'https://hahz.live'
    }
  ],
  creator: 'wizrd of hahz',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'hahz.live',
    title: 'hahz.live',
    description: 'Your Front Row Seat to Motivation, Tech, & Spiritual — Live by the Wizard of Hahz',
    siteName: 'hahz.live'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'hahz.live',
    description: 'Your Front Row Seat to Motivation, Tech, & Spiritual — Live by the Wizard of Hahz',
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@wizardofhahz'
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: `${siteConfig.url}/site.webmanifest`
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-mono antialiased',
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <RootProvider>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </RootProvider>
          <Toaster />
          {/* <TailwindIndicator /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
