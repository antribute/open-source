'use client';

import { TrackingProvider } from '@antribute/tracking';
import type { ReactNode } from 'react';
import { AntributeUiProvider } from '@antribute/zephyr-react';

interface RootLayoutProps {
  children: ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <TrackingProvider value={{ token: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN }}>
      <AntributeUiProvider>{children}</AntributeUiProvider>
    </TrackingProvider>
  );
}

export default RootLayout;
