import { Html, Head, Main, NextScript } from 'next/document';

function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>
      <body className="min-h-screen w-screen bg-light-gray-light dark:bg-dark-gray-light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
