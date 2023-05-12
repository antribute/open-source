import clsx from 'clsx';
import type { TailwindColorKey } from '@antribute/zephyr-core';

const basicColors = {
  primary: null,
  secondary: null,
  info: null,
  inverse: null,
  danger: null,
  success: null,
  caution: null,
  heart: null,
} satisfies Partial<Record<TailwindColorKey, null>>;

type BasicColorsMap = typeof basicColors;

type BasicColorMapKey = keyof BasicColorsMap;

export type BasicColor<TPick extends BasicColorMapKey | `!${BasicColorMapKey}` = BasicColorMapKey> =
  TPick extends `!${infer K}` ? Exclude<BasicColorMapKey, K> : TPick;

export const colorSchemeVariants = {
  filledAccent: {
    base: {
      primary: 'filled-accent-primary',
      secondary: 'filled-accent-secondary',
      inverse: 'filled-accent-inverse',
      heart: 'filled-accent-heart',
      info: 'filled-accent-info',
      success: 'filled-accent-success',
      danger: 'filled-accent-danger',
      caution: 'filled-accent-caution',
    },

    hover: {
      primary: 'filled-hover-accent-primary',
      secondary: 'filled-hover-accent-secondary',
      inverse: 'filled-hover-accent-inverse',
      heart: 'filled-hover-accent-heart',
      info: 'filled-hover-accent-info',
      success: 'filled-hover-accent-success',
      danger: 'filled-hover-accent-danger',
      caution: 'filled-hover-accent-caution',
    },
  },

  glassAccent: {
    base: {
      primary: 'glass-accent-primary',
      secondary: 'glass-accent-secondary',
      inverse: 'glass-accent-inverse',
      heart: 'glass-accent-heart',
      info: 'glass-accent-info',
      success: 'glass-accent-success',
      danger: 'glass-accent-danger',
      caution: 'glass-accent-caution',
    },
    hover: {
      primary: 'hover:glass-accent-primary',
      secondary: 'hover:glass-accent-secondary',
      inverse: 'hover:glass-accent-inverse',
      heart: 'hover:glass-accent-heart',
      info: 'hover:glass-accent-info',
      success: 'hover:glass-accent-success',
      danger: 'hover:glass-accent-danger',
      caution: 'hover:glass-accent-caution',
    },
  },

  ghost: {
    base: {
      primary: 'ghost-accent-primary',
      secondary: 'ghost-accent-secondary',
      inverse: 'ghost-accent-inverse',
      heart: 'ghost-accent-heart',
      info: 'ghost-accent-info',
      success: 'ghost-accent-success',
      danger: 'ghost-accent-danger',
      caution: 'ghost-accent-caution',
    },
  },

  bg: {
    base: {
      primary: clsx('bg-primary'),
      success: clsx('bg-success'),
      danger: clsx('bg-danger'),
      caution: clsx('bg-caution'),
      inverse: clsx('bg-inverse'),
      heart: clsx('bg-heart'),
      info: clsx('bg-info'),
      secondary: clsx('bg-secondary'),
    },
    hover: {
      primary: clsx('hover:bg-primary'),
      success: clsx('hover:bg-success'),
      danger: clsx('hover:bg-danger'),
      caution: clsx('hover:bg-caution'),
      inverse: clsx('hover:bg-inverse'),
      heart: clsx('hover:bg-heart'),
      info: clsx('hover:bg-info'),
      secondary: clsx('hover:bg-secondary'),
    },
  },

  ring: {
    base: {
      primary: 'ring-boundary-weak',
      secondary: 'ring-boundary-weak',
      inverse: 'text-inverse ring-inverse ',
      heart: 'text-heart ring-heart ',
      info: 'text-info ring-info ',
      success: 'text-success ring-success ',
      danger: 'text-danger ring-danger ',
      caution: 'text-caution ring-caution ',
    },
  },

  shadow: {
    base: {
      primary: 'shadow-primary/70',
      secondary: 'shadow-secondary/70',
      inverse: 'shadow-inverse/70',
      heart: 'shadow-heart/70',
      info: 'shadow-info/70',
      success: 'shadow-success/70',
      danger: 'shadow-danger/70',
      caution: 'shadow-caution/70',
    },
  },

  gradientDarkToLightTr: {
    base: {
      primary: clsx('bg-gradient-primary-dark-to-light-tr'),
      secondary: clsx('bg-gradient-secondary-dark-to-light-tr'),
      inverse: clsx('bg-gradient-inverse-dark-to-light-tr'),
      heart: clsx('bg-gradient-heart-dark-to-light-tr'),
      info: clsx('bg-gradient-info-dark-to-light-tr'),
      success: clsx('bg-gradient-success-dark-to-light-tr'),
      danger: clsx('bg-gradient-danger-dark-to-light-tr'),
      caution: clsx('bg-gradient-caution-dark-to-light-tr'),
    },
  },
} satisfies Record<
  string,
  {
    base: Record<BasicColor, string>;
  } & Partial<Record<string, Record<BasicColor, string>>>
>;
