/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import defaultTailwindTheme from 'tailwindcss/defaultTheme';
import { PluginAPI } from 'tailwindcss/types/config';
import type { Config } from 'tailwindcss';

// Plugins
import tailwindCssRadixPlugin from 'tailwindcss-radix';
import tailwindCssFormsPlugin from '@tailwindcss/forms';
import tailwindCssTypographyPlugin from '@tailwindcss/typography';
import tailwindLineClampPlugin from '@tailwindcss/line-clamp';
import createVariantGroupTransformer from 'tailwind-group-variant';
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons';
import { multiThemePlugin } from './plugins/multi-theme-plugin';
import { linearGradientMaskImagePlugin } from './plugins/linear-gradient-mask-image-plugin';

// eslint-disable-next-line import/extensions
import { create8PtGrid } from './helpers/create8PtGrid';
import { colorSchemeDataAttributes, colorSchemeTokens } from './colors/color-schemes';
import { colorPalette } from './colors/colors';
import { keyframes } from './keyframes';
import { animation } from './animation';
import { getTailwindDataAttributeShortcuts } from './data-attributes';
import { screens } from './screens';

const config = {
  plugins: [
    tailwindCssRadixPlugin,
    tailwindCssFormsPlugin,
    tailwindLineClampPlugin,
    tailwindCssTypographyPlugin,
    iconsPlugin({
      collections: getIconCollections(['heroicons', 'fa6-brands']),
    }),
    multiThemePlugin(),
    linearGradientMaskImagePlugin(),
  ],
  content: {
    files: [
      './*.{htm,html}',
      './public/*.{htm,html}',
      './src/**/*.{ts,tsx}',
      './node_modules/@antribute/zephyr-react/src/**/*.{js,jsx,ts,tsx}',
    ],
    transform: createVariantGroupTransformer(),
  },
  presets: [],
  darkMode: ['class', '[data-mode="dark"]'],

  theme: {
    ...defaultTailwindTheme,

    data: {
      ...colorSchemeDataAttributes,
      ...getTailwindDataAttributeShortcuts(),
    },

    screens,

    typography: (theme: PluginAPI['theme']) => ({
      DEFAULT: {
        css: {
          color: '#fafa',
          a: {
            color: theme('colors.content-inverse'),
          },
        },
      },
    }),

    keyframes,
    animation,
    accentColor: ({ theme }) => ({
      ...theme('colors'),
      auto: 'auto',
    }),
    borderColor: ({ theme }) => theme('colors'),
    borderOpacity: ({ theme }) => theme('opacity'),
    borderRadius: {
      none: '0px',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
    },
    borderSpacing: ({ theme }) => theme('spacing'),
    borderWidth: {
      DEFAULT: '1px',
      0: '0px',
      2: '2px',
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      none: 'none',
      hover: '0px 2px 5px 0px rgb(64 68 82 / 0.08), 0px 3px 9px 0px rgb(64 68 82 / 0.08)',
    },
    boxShadowColor: ({ theme }) => theme('colors'),
    caretColor: ({ theme }) => theme('colors'),
    colors: { ...colorPalette, ...colorSchemeTokens },

    divideColor: ({ theme }) => theme('borderColor'),
    divideOpacity: ({ theme }) => theme('borderOpacity'),
    divideWidth: ({ theme }) => theme('borderWidth'),
    dropShadow: {
      sm: '0 1px 1px rgb(0 0 0 / 0.05)',

      DEFAULT: ['0 1px 2px rgb(0 0 0 / 0.1)', '0 1px 1px rgb(0 0 0 / 0.06)'],

      md: ['0 4px 3px rgb(0 0 0 / 0.07)', '0 2px 2px rgb(0 0 0 / 0.06)'],

      lg: ['0 10px 8px rgb(0 0 0 / 0.04)', '0 4px 3px rgb(0 0 0 / 0.1)'],

      xl: ['0 20px 13px rgb(0 0 0 / 0.03)', '0 8px 5px rgb(0 0 0 / 0.08)'],
      '2xl': '0 25px 25px rgb(0 0 0 / 0.15)',
      none: '0 0 #0000',
    },
    fill: ({ theme }) => ({
      none: 'none',
      ...theme('colors'),
    }),
    flexBasis: ({ theme }) => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      full: '100%',
    }),
    fontFamily: {
      display: [
        'Cal Sans',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      body: [
        'Figtree',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      heading: [
        'Inter',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    fontSize: {
      h1: ['67px', { lineHeight: '80px' }],
      h2: ['50px', { lineHeight: '56px' }],
      h3: ['38px', { lineHeight: '48px' }],
      h4: ['23px', { lineHeight: '32px' }],
      h5: ['21px', { lineHeight: '24px' }],
      h6: ['16px', { lineHeight: '24px' }],
      lg: ['21px', { lineHeight: '32px' }],
      md: ['16px', { lineHeight: '24px' }],
      sm: ['14px', { lineHeight: '18px' }],
      xs: ['12px', { lineHeight: '16px' }],
    },
    fontWeight: {
      body: '400',
      regular: '400',
      medium: '500',
      bold: '600',
      heading: '700',
    },
    gap: ({ theme }) => theme('spacing'),
    gradientColorStops: ({ theme }) => theme('colors'),
    height: ({ theme }) => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      full: '100%',
      screen: '100vh',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
    }),

    inset: ({ theme }) => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      full: '100%',
    }),
    lineHeight: {
      none: '0px',
      h1: '80px',
      h2: '56px',
      h3: '48px',
      h4: '32px',
      h5: '24px',
      h6: '24px',
      lg: '32px',
      md: '24px',
      sm: '16px',
      xs: '12px',
    },
    margin: ({ theme }) => ({
      auto: 'auto',
      ...theme('spacing'),
    }),
    maxHeight: ({ theme }) => ({
      ...theme('spacing'),
      full: '100%',
      screen: '100vh',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
    }),
    maxWidth: ({ theme, breakpoints }) => ({
      none: 'none',
      0: '0px',
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      prose: '65ch',

      ...theme('spacing'),
      ...breakpoints(theme('screens')),
    }),

    outlineColor: ({ theme }) => theme('colors', 'var(--color-highlight-high)'),
    padding: ({ theme }) => theme('spacing'),
    placeholderColor: ({ theme }) => theme('colors'),
    placeholderOpacity: ({ theme }) => theme('opacity'),
    ringColor: ({ theme }) => ({
      DEFAULT: theme(
        'colors.highlight.moderate',
        colorSchemeTokens['highlight-moderate']
      ) as string,
      ...theme('colors'),
    }),
    ringOffsetColor: ({ theme }) => theme('colors'),
    ringOpacity: ({ theme }) => ({
      DEFAULT: '0.5',
      ...theme('opacity'),
    }),
    scrollMargin: ({ theme }) => ({
      ...theme('spacing'),
    }),
    scrollPadding: ({ theme }) => theme('spacing'),
    space: ({ theme }) => ({
      ...theme('spacing'),
    }),
    spacing: {
      px: '1px',
      ...create8PtGrid(),
    },
    stroke: ({ theme }) => ({
      none: 'none',
      ...theme('colors'),
    }),
    textColor: ({ theme }) => theme('colors'),
    textDecorationColor: ({ theme }) => theme('colors'),
    textIndent: ({ theme }) => ({
      ...theme('spacing'),
    }),
    textOpacity: ({ theme }) => theme('opacity'),
    translate: ({ theme }) => ({
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      full: '100%',
    }),
    width: ({ theme }) => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      full: '100%',
      screen: '100vw',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
    }),
  },
} satisfies Config;

export default config;
