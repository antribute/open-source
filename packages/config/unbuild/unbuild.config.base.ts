import { defineBuildConfig } from 'unbuild';
import { replaceTscAliasPaths } from 'tsc-alias';

export default defineBuildConfig({
  entries: [
    {
      cleanDist: false,
      format: 'cjs',
      builder: 'mkdist',
      input: './src',
    },
    {
      cleanDist: false,
      format: 'esm',
      builder: 'mkdist',
      input: './src',
    },
  ],
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
});
