import type { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ADK Example TODO List',
  description: 'An example TODO list app showcasing the Antribute Development Toolkit',
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
