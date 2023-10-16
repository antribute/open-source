import antfu from '@antfu/eslint-config';

export default antfu({
  // We use Prettier, so any style configs are getting disabled
  jsonc: false,
  stylistic: false,
  typescript: true,
  vue: false,
  yaml: false,
  overrides: {
    typescript: {
      // We use Bun, so let's disable any node-specific rules
      'node/prefer-global/process': ['off'],
      'unicorn/prefer-node-protocol': ['off'],
    },
  },
});
