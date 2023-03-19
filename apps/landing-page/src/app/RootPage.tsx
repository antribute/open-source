'use client';

import { useTracking } from '@antribute/tracking';
import Image from 'next/image';
import { useEffect } from 'react';
import { useDarkMode, Button } from '@antribute/zephyr-react';

function RootPage() {
  const track = useTracking();
  useEffect(() => {
    track('index-view');
  }, [track]);

  useDarkMode();

  return (
    <div className="text-content-moderate container mx-auto flex h-full min-h-screen flex-col items-center justify-center px-24">
      <div className="mb-16 flex items-center">
        <Image alt="" height="80" width="80" src="/icon.png" />
        <h1 className="text-h2 text-content-intense font-heading sm:text-h1 ml-16">Antribute</h1>
      </div>
      <p className="max-w-512 font-body leading-lg mb-32 text-lg sm:text-center">
        <span className="text-content-moderate">
          A team of world-class engineers with one goal:
        </span>
        <br />
        <span className="text-content-high">
          create the best tech to support the even better ideas.
        </span>
      </p>
      <div className="flex">
        <a
          className="text-md font-body text-content-moderate hover:text-content-intense"
          href="https://linkedin.com/company/antribute"
          onClick={() => track('index-linkedin-click')}
          rel="noopener noreferrer"
          target="_blank"
        >
          LinkedIn
        </a>
        <div className="w-16" />
        <a
          className="text-md font-body text-content-moderate hover:text-content-intense"
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
