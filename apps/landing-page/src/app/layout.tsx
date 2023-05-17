import '@antribute/ui/antribute.css';
import 'cal-sans';
import type { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Antribute - The Best Tech for Better Ideas',
  description: `We're Antribute, a team of world-class engineers with one goal: create the best tech to
        support the even better ideas`,
};

interface RootLayoutProps {
  children: ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-mode="dark" className="antialiased">
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
