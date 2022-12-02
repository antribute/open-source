import Head from 'next/head';
import Image from 'next/image';

function Home() {
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
      <div className="container mx-auto flex h-full min-h-screen flex-col items-center justify-center text-center text-light-gray-type dark:text-dark-gray-type">
        <div className="mb-16 flex">
          <Image alt="" height="80" width="80" src="/icon.png" />
          <h1 className="ml-16 text-h1 font-heading">Hello, World!</h1>
        </div>
        <p className="mb-32 max-w-512 text-lg font-body leading-lg">
          We&apos;re Antribute, a team of world-class engineers with one goal: create the best tech
          to support the even better ideas.
        </p>
        <div className="flex">
          <a
            className="text-md font-body text-primary hover:text-primary-light"
            href="https://linkedin.com/company/antribute"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
          <div className="w-16" />
          <a
            className="text-md font-body text-primary hover:text-primary-light"
            href="https://twitter.com/antribute"
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