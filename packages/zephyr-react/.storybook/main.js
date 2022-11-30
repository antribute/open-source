const { mergeConfig } = require('vite');
const { default: tsconfigPaths } = require('vite-tsconfig-paths');

module.exports = {
  stories: ['../src/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    docsPage: true,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  async viteFinal(config, options) {
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
    });
  },
};
