import { defineBuildConfig } from 'unbuild';
import { replaceTscAliasPaths } from 'tsc-alias';

import { commonConfig, cjsEntry, esmEntry } from './unbuild.config.base';

export default defineBuildConfig({
  entries: [
    {
      ...cjsEntry,
      esbuild: {
        jsx: 'automatic',
      },
    },
    {
      ...esmEntry,
      esbuild: {
        jsx: 'automatic',
      },
    },
  ],
  ...commonConfig,
});
