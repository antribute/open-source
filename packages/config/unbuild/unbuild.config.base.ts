import { defineBuildConfig } from 'unbuild';
import type { BuildConfig, MkdistBuildEntry } from 'unbuild';
import { replaceTscAliasPaths } from 'tsc-alias';

export const commonConfig: Omit<BuildConfig, 'entries'> = {
  hooks: {
    'build:done': async (ctx) => {
      // We love using TypeScript aliases and absolute imports here at Antribute, however our
      // primarily esbuild tooling doesn't support this out of the box for non-bundled packages so
      // we have to hook into build:done and run tsc-alias
      await replaceTscAliasPaths({ outDir: ctx.options.outDir });
    },
  },
  outDir: 'dist',
  declaration: true,
};

export const commonEntry: MkdistBuildEntry = {
  cleanDist: false,
  builder: 'mkdist',
  input: './src',
  pattern: ['**/*.ts', '**/*.tsx', '!**/*.test.ts', '!**/*.test.tsx'],
};

export const cjsEntry: MkdistBuildEntry = {
  ...commonEntry,
  format: 'cjs' as const,
};

export const esmEntry: MkdistBuildEntry = {
  ...commonEntry,
  format: 'esm' as const,
};

export default defineBuildConfig({
  entries: [cjsEntry, esmEntry],
  ...commonConfig,
});
