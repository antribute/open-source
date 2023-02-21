'use client';

import { useTracking } from '@antribute/tracking';
import Image from 'next/image';
import { useEffect } from 'react';

function RootPage() {
  const track = useTracking();
  useEffect(() => {
    track('index-view');
  }, [track]);

  return (
    <div className="container mx-auto flex h-full min-h-screen flex-col items-center justify-center px-24 text-content-moderate dark:text-content-inverse-moderate">
      <div className="mb-16 flex items-center">
        <Image alt="" height="80" width="80" src="/icon.png" />
        <h1 className="ml-16 text-h2 font-heading sm:text-h1">Hello, World!</h1>
      </div>
      <p className="mb-32 max-w-512 text-lg font-body leading-lg sm:text-center">
        We&apos;re Antribute, a team of world-class engineers with one goal: create the best tech to
        support the even better ideas.
      </p>
      <div className="flex">
        <a
          className="text-md font-body text-neutral hover:text-neutral-light"
          href="https://linkedin.com/company/antribute"
          onClick={() => track('index-linkedin-click')}
          rel="noopener noreferrer"
          target="_blank"
        >
          LinkedIn
        </a>
        <div className="w-16" />
        <a
          className="text-md font-body text-neutral hover:text-neutral-light"
          href="https://twitter.com/antribute"
          onClick={() => track('index-twitter-click')}
          rel="noopener noreferrer"
          target="_blank"
        >
          Twitter
        </a>
      </div>
    </div>
  );
}

export default RootPage;
