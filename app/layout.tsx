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
  title: 'Sovereign Self — Your Private AI Chief of Staff',
  description: "Zuckerberg's building one for himself. We built one for you. Runs locally on your machine. Your data never leaves. No cloud. No ads. No exceptions.",
  openGraph: {
    title: 'Sovereign Self — Your Private AI Chief of Staff',
    description: 'Your AI chief of staff. Runs locally. Works privately.',
    type: 'website',
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
