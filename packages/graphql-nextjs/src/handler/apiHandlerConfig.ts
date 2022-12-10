import type { PageConfig } from 'next';

const config: PageConfig = {
  api: {
    // Body parser needs to be disabled to handle file uploads
    bodyParser: false,
  },
};

export default config;
