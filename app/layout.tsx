import type { Metadata } from 'next';
import './globals.css';
import { PostHogProvider } from '@/components/PostHogProvider';
import { DM_Sans, Instrument_Serif } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sovereign-self-launch.vercel.app'),
  title: 'ReddiOS — Your private AI chief of staff',
  description: "Zuckerberg's building one for himself. ReddiOS stays private. Join the founding cohort.",
  openGraph: {
    title: 'ReddiOS — Your private AI chief of staff',
    description: "Zuckerberg's building one for himself. ReddiOS stays private.",
    url: 'https://sovereign-self-launch.vercel.app',
    siteName: 'ReddiOS',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'ReddiOS — Your private AI chief of staff',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReddiOS — Your private AI chief of staff',
    description: "Zuckerberg's building one for himself. ReddiOS stays private.",
    images: ['/og'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${dmSans.variable} ${instrumentSerif.variable} font-sans`}>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
