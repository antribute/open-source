import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './*.{htm,html}',
    './public/*.{htm,html}',
    './src/**/*.{ts,tsx}',
    './node_modules/@antribute/zephyr-core/dist/index.js',
  ],
};

export default config;
