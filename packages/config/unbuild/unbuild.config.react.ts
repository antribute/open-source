import { defineBuildConfig } from 'unbuild';

import { cjsEntry, commonConfig, esmEntry } from './unbuild.config.base';

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
