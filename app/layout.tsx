import { Metadata, Viewport } from 'next';
import { PropsWithChildren } from 'react';
import { getURL } from '@/utils/helpers';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import { RootProvider } from 'fumadocs-ui/provider';
import { TRPCReactProvider } from '@/trpc/react';

import '@/styles/globals.css';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading'
});

export const metadata: Metadata = {
  metadataBase: new URL(getURL() || 'https://hahz.live'),
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
      name: 'Wizard of Hahz',
      url: 'https://hahz.live'
    }
  ],
  creator: 'Wizard of Hahz',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hahz.live',
    title: 'hahz.live',
    description:
      'Your Front Row Seat to Motivation, Tech, & Spiritual — Live by the Wizard of Hahz',
    siteName: 'hahz.live'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'hahz.live',
    description:
      'Your Front Row Seat to Motivation, Tech, & Spiritual — Live by the Wizard of Hahz',
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

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <RootProvider>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </RootProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}