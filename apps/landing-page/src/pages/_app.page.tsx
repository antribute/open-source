/* eslint-disable react/jsx-props-no-spreading */
import { TrackingProvider } from '@antribute/tracking';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

import '@antribute/zephyr-core/zephyr-core.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session as Session}>
      <TrackingProvider value={{ token: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN }}>
        <Component {...pageProps} />
      </TrackingProvider>
    </SessionProvider>
  );
}
