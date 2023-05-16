const base = require('./eslint-base.cjs');
const react = require('./eslint-react.cjs');

module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'plugin:tailwindcss/recommended',
    'plugin:@next/next/recommended',
    'plugin:@next/next/core-web-vitals',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', '@next/next', 'tailwindcss'],
  rules: {
    ...base.rules,
    ...react.rules,
    // This allows us to import devdeps in tests
  },
  settings: {
    tailwindcss: {
      callees: ['clsx', 'twsx'],
      config: './node_modules/@antribute/ui/dist/tailwindConfig.js',
      removeDuplicates: true,
    },
  },
};
