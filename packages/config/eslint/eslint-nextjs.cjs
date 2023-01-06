module.exports = {
  extends: [
    './eslint-base.cjs',
    'plugin:tailwindcss/recommended',
    'plugin:@next/next/recommended',
    'plugin:@next/next/core-web-vitals',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', '@next/next', 'tailwindcss'],
  rules: {
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
      config: './node_modules/@antribute/zephyr-core/tailwind.config.cjs',
      removeDuplicates: true,
    },
  },
};
