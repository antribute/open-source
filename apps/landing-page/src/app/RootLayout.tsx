'use client';

import { TrackingProvider } from '@antribute/tracking';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <SessionProvider>
      <TrackingProvider value={{ token: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN }}>
        {children}
      </TrackingProvider>
    </SessionProvider>
  );
}

export default RootLayout;
