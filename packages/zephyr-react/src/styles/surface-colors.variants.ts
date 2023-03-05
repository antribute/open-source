/* eslint-disable tailwindcss/no-custom-classname */
import clsx from 'clsx';
import { mapValues, pick } from 'lodash-es';
import { mergeVariants } from 'utils/classed';
import { notEmpty } from 'utils/notEmpty';

export type SurfaceColor = (typeof surfaceColors)[number];

export const surfaceColors = [
  'surface-transparent',
  'surface',
  'surface-light',
  'surface-dark',
  'surface-neutral',
  'surface-neutral-light',
  'surface-neutral-dark',
  'surface-inverse',
] as const;

export const surfaceColorVariants = {
  bg: {
    'surface-transparent': clsx('bg-transparent'),
    surface: clsx('bg-surface dark:bg-surface-inverse'),
    'surface-light': clsx('bg-surface-light dark:bg-surface-inverse-100'),
    'surface-dark': clsx('bg-surface-dark dark:bg-surface-inverse-400'),
    'surface-neutral': clsx('bg-neutral dark:bg-neutral'),
    'surface-neutral-light': clsx('bg-neutral-light dark:bg-neutral-light'),
    'surface-neutral-dark': clsx('bg-neutral-dark dark:bg-neutral-dark'),
    // 'surface-inverse': clsx('bg-content-intense dark:bg-content-inverse-intense'),
    'surface-inverse': clsx('bg-content-intense dark:bg-content-inverse-intense'),
  },
  bgHoverDark: {
    'surface-transparent': clsx('hover:bg-highlight'),
    surface: clsx('hover:bg-surface-soft dark:hover:bg-surface-inverse-soft'),
    'surface-light': clsx('hover:bg-surface-300 dark:hover:bg-surface-inverse-300'),
    'surface-dark': clsx('hover:bg-surface-500 dark:hover:bg-surface-inverse-dark'),

    'surface-neutral': clsx('hover:bg-neutral-700 dark:hover:bg-neutral-700'),
    'surface-neutral-light': clsx('hover:bg-neutral-500 dark:hover:bg-neutral-500'),
    'surface-neutral-dark': clsx('hover:bg-neutral-900 dark:hover:bg-neutral-900 '),
    'surface-inverse': clsx('hover:bg-content-intense dark:hover:bg-content-intense'),
  },
  textBgContrast: {
    'surface-transparent': 'text-content-intense dark:text-content-inverse-intense',
    // 'surface-inverse': 'text-content-inverse-intense',
    surface: 'text-content-intense dark:text-content-inverse-intense',
    'surface-light': 'text-content-intense dark:text-content-inverse-intense',
    'surface-dark': 'text-content-intense dark:text-content-inverse-intense',
    'surface-neutral': 'text-content-inverse-intense',
    'surface-inverse': 'text-content-inverse-intense',
    'surface-neutral-light': 'text-content-inverse-intense',
    'surface-neutral-dark': 'text-content-inverse-intense',
  },
} satisfies Record<string, Record<SurfaceColor, string>>;

// Surface Group Text Color Selector Variants
// export const surfaceGroupTextVariants = {
//   text: mergeVariants({
//     // Surface
//     surface: {
//       intense: clsx(
//         'group-[.is-surface]:text-content-intense',
//         'dark:group-[.is-surface]:text-content-inverse-moderate'
//       ),
//       moderate: clsx(
//         'group-[.is-surface]:text-content-intense',
//         'dark:group-[.is-surface]:text-content-inverse-moderate'
//       ),
//       weak: clsx(
//         'group-[.is-surface]:text-content-intense',
//         'dark:group-[.is-surface]:text-content-inverse-weak'
//       ),
//     },
//     'surface-light': {
//       intense: clsx(
//         'group-[.is-surface-light]:text-content-intense',
//         'dark:group-[.is-surface-light]:text-content-inverse-moderate'
//       ),
//       moderate: clsx(
//         'group-[.is-surface-light]:text-content-intense',
//         'dark:group-[.is-surface-light]:text-content-inverse-moderate'
//       ),
//       weak: clsx(
//         'group-[.is-surface-light]:text-content-intense',
//         'dark:group-[.is-surface-light]:text-content-inverse-weak'
//       ),
//     },
//     'surface-dark': {
//       intense: clsx(
//         'group-[.is-surface-dark]:text-content-intense',
//         'dark:group-[.is-surface-dark]:text-content-inverse-intense'
//       ),
//       moderate: clsx(
//         'group-[.is-surface-dark]:text-content-intense',
//         'dark:group-[.is-surface-dark]:text-content-inverse-moderate'
//       ),
//       weak: clsx(
//         'group-[.is-surface-dark]:text-content-intense',
//         'dark:group-[.is-surface-dark]:text-content-inverse-weak'
//       ),
//     },

//     // Neutral
//     "surface-neutral": {
//       intense: clsx('group-[.is-surface-neutral]:text-content-inverse-intense'),
//       moderate: clsx('group-[.is-surface-neutral]:text-content-inverse-moderate'),
//       weak: clsx('group-[.is-surface-neutral]:text-content-inverse-weak'),
//     },
//     'surface-neutral-light': {
//       intense: clsx('group-[.is-surface-neutral-light]:text-content-inverse-intense'),
//       moderate: clsx('group-[.is-surface-neutral-light]:text-content-inverse-moderate'),
//       weak: clsx('group-[.is-surface-neutral-light]:text-content-inverse-weak'),
//     },
//     'surface-neutral-dark': {
//       intense: clsx('group-[.is-surface-neutral-dark]:text-content-inverse-intense'),
//       moderate: clsx('group-[.is-surface-neutral-dark]:text-content-inverse-moderate'),
//       weak: clsx('group-[.is-surface-neutral-dark]:text-content-inverse-weak'),
//     },

//     // Inverse
//     "surface-inverse": {
//       intense: clsx(
//         'group-[.is-surface-inverse]:text-content-inverse-intense',
//         'dark:group-[.is-surface-inverse]:text-content-moderate'
//       ),
//       moderate: clsx(
//         'group-[.is-surface-inverse]:text-content-inverse-intense',
//         'dark:group-[.is-surface-inverse]:text-content-moderate'
//       ),
//       weak: clsx(
//         'group-[.is-surface-inverse]:text-content-inverse-intense',
//         'dark:group-[.is-surface-inverse]:text-content-weak'
//       ),
//     },

//     // Transparent
//     "surface-transparent": {
//       intense: clsx('group-[.is-surface-transparent]:text-content-inverse-intense'),
//       moderate: clsx('group-[.is-surface-transparent]:text-content-inverse-moderate'),
//       weak: clsx('group-[.is-surface-transparent]:text-content-inverse-weak'),
//     },
//   } satisfies Record<SurfaceColor, Record<'intense' | 'moderate' | 'weak', string>>),
// };

type TextContentColor = 'intense' | 'moderate' | 'weak';

const textContentLight = {
  intense: 'text-content-intense',
  moderate: 'text-content-moderate',
  weak: 'text-content-weak',
} satisfies Record<TextContentColor, string>;

const textContentDark = {
  intense: 'text-content-inverse-intense',
  moderate: 'text-content-inverse-moderate',
  weak: 'text-content-inverse-weak',
} satisfies Record<TextContentColor, string>;

const textContent = {
  intense: {
    light: textContentLight.intense,
    dark: textContentDark.intense,
  },
  moderate: {
    light: textContentLight.moderate,
    dark: textContentDark.moderate,
  },
  weak: {
    light: textContentLight.weak,
    dark: textContentDark.weak,
  },
} satisfies Record<TextContentColor, Record<'dark' | 'light', string>>;

const textContentInverse = {
  intense: {
    light: textContentDark.intense,
    dark: textContentLight.intense,
  },
  moderate: {
    light: textContentDark.moderate,
    dark: textContentLight.moderate,
  },
  weak: {
    light: textContentDark.weak,
    dark: textContentLight.weak,
  },
} satisfies Record<TextContentColor, Record<'dark' | 'light', string>>;

// const textColorsLight = {
//   intense: textColors.intense.light,
//   moderate: textColors.moderate.light,
//   weak: textColors.weak.light,
// } satisfies Record<'intense' | 'moderate' | 'weak', string>;

type SurfaceColorMap = Record<
  SurfaceColor,
  Record<'intense' | 'moderate' | 'weak', string | Record<'dark' | 'light', string>>
>;

const surfaceColorMap = {
  'surface-transparent': textContent,
  surface: textContent,
  'surface-light': textContent,
  'surface-dark': textContent,
  'surface-neutral': textContentDark,
  'surface-neutral-light': textContentDark,
  'surface-neutral-dark': textContentDark,
  'surface-inverse': textContentDark,
} satisfies SurfaceColorMap;

export const surfaceGroupTextVariants = {
  text: generateGroupTextColors(surfaceColorMap),
  hoverText: generateGroupTextColors(surfaceColorMap, { selector: 'hover:' }),
};

function generateGroupTextColors(
  surfaceColorMap: SurfaceColorMap,
  options?: { selector?: `${string}:` | '' }
) {
  const { selector = '' } = options ?? {};
  const result = mapValues(surfaceColorMap, (variants, surfaceColor) => {
    const groupSelector = `group-[.is-${surfaceColor}]:`;

    return mapValues(variants, (c) => {
      const { light, dark } = typeof c === 'string' ? { light: c, dark: undefined } : c;

      const lightMode = `${light}`;

      const darkMode = dark ? `dark:${dark}` : undefined;

      return [lightMode, darkMode]
        .filter(notEmpty)
        .map((c) => `${selector}${groupSelector}${c}`)
        .join(' ')
        .trimEnd();
    });
  });

  return mergeVariants(result);
}
