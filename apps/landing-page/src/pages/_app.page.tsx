import type { AppProps } from 'next/app';
import '@antribute/zephyr-core/zephyr-core.css';

export default function App({ Component, pageProps }: AppProps) {
  // NextJS requires prop spreading for this top-level file
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}