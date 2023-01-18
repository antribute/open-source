import type { ReactElement } from 'react';

import RootPage from './RootPage';
import RootLayout from './RootLayout';

function Page() {
  return <RootPage />;
}

// This is a special function that gets called only on the Root page of the app. Our root layout
// must be a server component, however we want to pass some shared providers for tracking, auth,
// etc. to our landing page, and this is the recommended way to do so
Page.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default Page;
