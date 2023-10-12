import { defineBuildConfig } from 'unbuild';
import { replaceTscAliasPaths } from 'tsc-alias';

import baseConfig from './unbuild.config.base';

export default defineBuildConfig({
  ...baseConfig,
  entries: [
    {
      ...baseConfig.entries[0],
      esbuild: {
        jsx: 'automatic',
      },
    },
    {
      ...baseConfig.entries[1],
      esbuild: {
        jsx: 'automatic',
      },
    },
  ],
});
