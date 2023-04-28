import { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default <StorybookConfig>{
  stories: ['../src/**/*.mdx', '../src/**/*.stories.tsx'],
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
    autodocs: 'tag',
  },
  async viteFinal(config, options) {
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
    });
  },
};
