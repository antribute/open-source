import { useTracking } from '@antribute/tracking';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';

function Home() {
  const track = useTracking();
  useEffect(() => {
    track('index-view');
  }, []);
  return (
    <>
      <Head>
        <title>Antribute - The Best Tech for Better Ideas</title>
        <meta
          name="description"
          content="We're Antribute, a team of world-class engineers with one goal: create the best tech to
        support the even better ideas"
        />
      </Head>
      <div className="container mx-auto flex h-full min-h-screen flex-col items-center justify-center px-24 text-content-moderate dark:text-content-inverse-moderate">
        <div className="mb-16 flex items-center">
          <Image alt="" height="80" width="80" src="/icon.png" />
          <h1 className="ml-16 text-h2 font-heading sm:text-h1">Hello, World!</h1>
        </div>
        <p className="mb-32 max-w-512 text-lg font-body leading-lg sm:text-center">
          We&apos;re Antribute, a team of world-class engineers with one goal: create the best tech
          to support the even better ideas.
        </p>
        <div className="flex">
          <a
            className="text-md font-body text-primary hover:text-primary-light"
            href="https://linkedin.com/company/antribute"
            onClick={() => track('index-linkedin-click')}
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
          <div className="w-16" />
          <a
            className="text-md font-body text-primary hover:text-primary-light"
            href="https://twitter.com/antribute"
            onClick={() => track('index-twitter-click')}
            rel="noopener noreferrer"
            target="_blank"
          >
            Twitter
          </a>
        </div>
      </div>
    </>
  );
}

export default Home;
