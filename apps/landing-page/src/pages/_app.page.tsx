/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';

import '@antribute/zephyr-core/zephyr-core.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
