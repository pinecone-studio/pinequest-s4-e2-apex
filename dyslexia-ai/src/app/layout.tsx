import type { Metadata, Viewport } from 'next';
import { Fredoka, Lexend } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { ChildProvider } from '../hooks/useChild';
import SetupNotice from '../components/SetupNotice';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
});

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lexend',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lexi AI — Хамтдаа унших сурцгаая',
  description: 'Дислекситэй хүүхдэд зориулсан унших дасгалын апп.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <html lang="mn" className={`${fredoka.variable} ${lexend.variable}`}>
      <body>
        <div className="frame-outer">
          <div className="phone">
            {hasClerk ? (
              <ClerkProvider>
                <ChildProvider>{children}</ChildProvider>
              </ClerkProvider>
            ) : (
              <SetupNotice />
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
