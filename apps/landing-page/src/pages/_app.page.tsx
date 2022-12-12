/* eslint-disable react/jsx-props-no-spreading */
import { TrackingProvider } from '@antribute/tracking';
import type { AppProps } from 'next/app';

import '@antribute/zephyr-core/zephyr-core.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TrackingProvider value={{ token: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN }}>
      <Component {...pageProps} />
    </TrackingProvider>
  );
}
