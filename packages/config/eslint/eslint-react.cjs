const base = require('./eslint-base.cjs');

/** @type {import('eslint-plugin-tailwindcss')['configs']['recommended']['rules']} */
const tailwindRules = {
  /** Unnecessary rules*/
  'tailwindcss/classnames-order': 'off',
  'tailwindcss/no-custom-classname': 'off',
};

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },

  plugins: ['@typescript-eslint', 'tailwindcss'],
  rules: {
    ...base.rules,
    ...tailwindRules,
    'react/function-component-definition': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/no-array-index-key': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-unstable-nested-components': [
      'off',
      {
        allowAsProps: true | false,
        customValidators: [] /* optional array of validators used for propTypes validation */,
      },
    ],
    // This makes typings for `@tw-classed/react` work
    '@typescript-eslint/no-unsafe-assignment': 'off',

    // This allows us to import devdeps in tests
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.stories.tsx', '**/*.test.ts', '**/*.test.tsx'],
      },
    ],
    // This allows us to "export { default } from which is nice for reducing boilerplate"
    'no-restricted-exports': 'off',
    // We use React 18, this is no longer needed
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    tailwindcss: {
      callees: ['clsx', 'twsx'],
      // config: './node_modules/@antribute/zephyr-core/tailwind.config.cjs',
      config: './tailwind.config.cjs',
      removeDuplicates: true,
    },
  },
};
