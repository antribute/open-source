/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import tailwindCssRadixPlugin from 'tailwindcss-radix';
import tailwindCssFormsPlugin from '@tailwindcss/forms';
import tailwindCssTypographyPlugin from '@tailwindcss/typography';
import createVariantGroupTransformer from 'tailwind-group-variant';

import type { Config } from 'tailwindcss';
// eslint-disable-next-line import/extensions
import defaultTailwindTheme from 'tailwindcss/defaultTheme';

import plugin from 'tailwindcss/plugin';
import { PluginAPI } from 'tailwindcss/types/config';
import { colors as colorPalette } from './colors/colors';
import { keyframes } from './keyframes';
import { animation } from './animation';
import { multiThemePlugin } from './plugins/multi-theme-plugin';
import { colorSchemeTokens } from './colors/color-schemes';

export const create8PtGrid = (max = 512) => {
  const finalGrid: Record<string, string> = {
    auto: 'auto',
    0: '0px',
    1: '1px',
  };

  let currentGridStep = 2;

  while (currentGridStep <= max) {
    finalGrid[currentGridStep.toString()] = `${currentGridStep}px`;

    if (currentGridStep < 40) {
      currentGridStep += 2;
    } else {
      currentGridStep += 8;
    }
  }

  return finalGrid;
};

const config = {
  plugins: [
    tailwindCssRadixPlugin,
    tailwindCssFormsPlugin,
    tailwindCssTypographyPlugin,
    buttonPlugin(),
    multiThemePlugin(),
  ],
  content: {
    files: [
      './*.{htm,html}',
      './public/*.{htm,html}',
      './src/**/*.{ts,tsx}',
      './node_modules/@antribute/zephyr-core/dist/index.js',
    ],
    transform: createVariantGroupTransformer(),
  },
  presets: [],
  darkMode: ['class', '[data-mode="dark"]'],

  theme: {
    ...defaultTailwindTheme,

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
    // backdropBlur: ({ theme }) => theme('blur'),
    // backdropBrightness: ({ theme }) => theme('brightness'),
    // backdropContrast: ({ theme }) => theme('contrast'),
    // backdropGrayscale: ({ theme }) => theme('grayscale'),
    // backdropHueRotate: ({ theme }) => theme('hueRotate'),
    // backdropInvert: ({ theme }) => theme('invert'),
    // backdropOpacity: ({ theme }) => theme('opacity'),
    // backdropSaturate: ({ theme }) => theme('saturate'),
    // backdropSepia: ({ theme }) => theme('sepia'),
    // backgroundColor: ({ theme }) => theme('colors'),
    // backgroundOpacity: ({ theme }) => theme('opacity'),

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

    outlineColor: ({ theme }) => theme('colors'),
    padding: ({ theme }) => theme('spacing'),
    placeholderColor: ({ theme }) => theme('colors'),
    placeholderOpacity: ({ theme }) => theme('opacity'),
    ringColor: ({ theme }) => ({
      DEFAULT: theme('colors.highlight.moderate', colorPalette.highlight.moderate) as string,
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

type TailwindConfiguration = typeof config;

// const t = (path: Path<TailwindConfiguration['theme']>): string => {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
//   const v = getByPath(config.theme, path) as any;

//   return typeof v === 'object' ? getByPath(v, 'DEFAULT') : v;
// };

export default config;

function buttonPlugin() {
  return plugin(({ addComponents, addVariant }) => {
    type ColorName = keyof TailwindConfiguration['theme']['colors'];
    // type Variant = 'contained' | 'outlined' | 'soft';

    type VariantClassName<
      TClassName extends `.${string}`,
      TExtraColorNames extends string = string,
      TColorName extends TExtraColorNames | ColorName = TExtraColorNames | ColorName
    > = `${TClassName}-${TColorName}`;

    type CustomClass<T extends `.${string}`, TExtraColorNames extends string = string> = Partial<
      Record<VariantClassName<T, TExtraColorNames>, Record<string, Record<string, string>>>
    >;

    type CustomClasses<
      TClassName extends string,
      TVariantName extends string,
      TExtraColorNames extends string = string
    > = CustomClass<`.${TClassName}-${TVariantName}`, TExtraColorNames>;

    type Color =
      | 'inverse'
      | 'neutral-light'
      | 'neutral-dark'
      | 'surface-light'
      | 'surface-dark'
      | ColorName;

    // Used for tailwind intellisense
    const classed = <T extends Record<string, unknown>>(o: T) => {
      return o;
    };

    // type SurfaceColor = (typeof surfaceColors)[number];

    // function getSurfaceGroupClass<TColor extends SurfaceColor>(
    //   colorName: TColor,
    //   className: string
    // ) {
    //   const surfaceGroupVariant = getSurfaceColorName(colorName);

    //   const classname = className.trim().split(' ');

    //   return classname.map((className) => `${surfaceGroupVariant}:${className}`).join(' ');
    // }

    // function createSurfaceGroupClassNameMap(surfaceColorMap: Record<SurfaceColor, string>) {
    //   return Object.fromEntries(
    //     Object.entries(surfaceColorMap).map(([key, value]) => [
    //       key,
    //       getSurfaceGroupClass(key as SurfaceColor, value),
    //     ])
    //   ) as Record<SurfaceColor, string>;
    // }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const surfaceSoftTextColorMap = createSurfaceGroupClassNameMap({
    //   neutral: 'text-content-inverse-intense',
    //   surface: 'text-content-inverse-intense',
    //   'neutral-light': 'text-content-inverse-intense',
    //   'neutral-dark': 'text-content-inverse-intense',
    //   'surface-light': 'text-content-inverse-intense',
    //   'surface-dark': 'text-content-inverse-intense',
    // });

    function addGroupVariant(name: string) {
      addVariant(`group-${name}`, `:merge(.group).${name} &`); // custom CSS
    }

    function getSurfaceColors() {
      const surfaceColors = ['neutral', 'surface'] as const;

      return surfaceColors.flatMap((color) => {
        const surfaceName = color.startsWith('surface') ? color : `surface-${color}`;

        const root = surfaceName;
        const base = `${surfaceName}-base`;
        const light = `${surfaceName}-light`;
        const dark = `${surfaceName}-dark`;

        return [root, base, light, dark];
      });
    }

    const surfaceColors = getSurfaceColors();

    surfaceColors.forEach((color) => {
      addGroupVariant(color);
    });

    const boxVariants = classed({
      // Contained
      '.box-contained-neutral': {
        [`@apply bg-neutral-600 text-content-inverse-intense hover:bg-neutral-700`]: {},
      },
      '.box-contained-neutral-light': {
        '@apply bg-neutral-400 text-content-inverse-intense hover:bg-neutral-500': {},
      },
      '.box-contained-neutral-dark': {
        '@apply bg-neutral-800 hover:bg-neutral-900 text-content-inverse-intense': {},
      },
      // '.box-contained-primary': {
      //   '@apply bg-primary text-content-inverse-intense': {},
      // },
      '.box-contained-info': {
        '@apply bg-neutral text-content-inverse-intense': {},
      },
      '.box-contained-positive': {
        '@apply bg-positive text-content-inverse-intense': {},
      },
      '.box-contained-caution': {
        '@apply bg-caution-500 text-content-inverse-intense': {},
      },
      '.box-contained-danger': {
        '@apply bg-danger text-content-inverse-intense': {},
      },
      '.box-contained-surface': {
        '@apply bg-surface text-content-intense dark:bg-surface-inverse dark:text-content-inverse-intense':
          {},
      },
      '.box-contained-surface-light': {
        '@apply bg-surface-light text-content-intense dark:bg-surface-inverse-light dark:text-content-inverse-intense':
          {},
      },
      '.box-contained-surface-dark': {
        '@apply bg-surface-dark text-content-intense dark:bg-surface-inverse-dark dark:text-content-inverse-intense':
          {},
      },
      '.box-contained-inverse': {
        '@apply bg-surface-inverse text-content-inverse-intense dark:bg-surface dark:text-content-intense':
          {},
      },

      // Glass
      '.box-soft-neutral': {
        [`@apply bg-neutral-600/10 text-neutral-dark dark:text-content-inverse-intense hover:bg-neutral-700/10`]:
          {},
      },
      '.box-soft-neutral-light': {
        [`@apply bg-neutral-400/10 text-neutral-dark dark:text-content-inverse-intense hover:bg-neutral-500/10`]:
          {},
      },
      '.box-soft-neutral-dark': {
        [`@apply bg-neutral-800/10 text-neutral-dark dark:text-content-inverse-intense hover:bg-neutral-900/10`]:
          {},
      },
      // '.box-soft-primary': {
      //   '@apply bg-primary/10 text-primary': {},
      // },
      '.box-soft-positive': {
        '@apply bg-positive/10 text-positive': {},
      },
      '.box-soft-caution': {
        '@apply bg-caution/10 text-caution': {},
      },
      '.box-soft-danger': {
        '@apply bg-danger/10 text-danger': {},
      },
      '.box-soft-surface': {
        '@apply bg-surface/10 text-content-intense dark:bg-surface-inverse/10 dark:text-content-inverse-intense':
          {},
      },
      '.box-soft-surface-light': {
        '@apply bg-surface-light/10 text-content-intense dark:bg-surface-inverse-light/10 dark:text-content-inverse-intense':
          {},
      },
      '.box-soft-surface-dark': {
        '@apply bg-surface-dark/10 text-content-intense dark:bg-surface-inverse-dark/10 dark:text-content-inverse-intense':
          {},
      },
      '.box-soft-inverse': {
        '@apply bg-surface-inverse/10 text-content-intense dark:bg-content-inverse/10 dark:text-content-inverse-intense contrast-125':
          {},
      },
    } satisfies CustomClasses<'box', 'contained' | 'outlined' | 'soft', Color>);

    addComponents(boxVariants);
  });
}

// function surfaceGroupSafelist() {
//   const selectors = ['', 'hover:', 'active:'];

//   const prefixes = ['text-', 'bg-', 'ring-', 'focus-'];

//   const safelist = [
//     'surface',
//     'surface-light',
//     'surface-dark',
//     'surface-inverse',
//     'surface-neutral',
//     'surface-neutral-light',
//     'surface-neutral-dark',
//     'surface-transparent',
//   ].flatMap((color) => {
//     const group = `group-[.is-${color}]`;

//     return [`${group}`, `${group}:hover`].flatMap((selector) => [
//       `${selector}:text-{textColor}`,
//       `${selector}:bg-{backgroundColor}`,
//     ]);
//   });

//   console.log('Surface group safelist', safelist);

//   return safelist;
// }
