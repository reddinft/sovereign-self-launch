import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PostHogProvider } from '@/components/PostHogProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sovereign-self-launch.vercel.app'),
  title: 'Sovereign Self — Your private AI chief of staff',
  description: "Zuckerberg's building one for himself. Yours stays private. Join the founding cohort.",
  openGraph: {
    title: 'Sovereign Self — Your private AI chief of staff',
    description: "Zuckerberg's building one for himself. Yours stays private.",
    url: 'https://sovereign-self-launch.vercel.app',
    siteName: 'Sovereign Self',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'Sovereign Self — Your private AI chief of staff',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sovereign Self — Your private AI chief of staff',
    description: "Zuckerberg's building one for himself. Yours stays private.",
    images: ['/og'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
