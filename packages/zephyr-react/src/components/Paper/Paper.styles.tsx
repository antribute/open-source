/* eslint-disable tailwindcss/no-custom-classname */
import clsx from 'clsx';
import { surfaceColorVariants } from 'styles/surface-colors.variants';
import {
  Classed,
  classTheme,
  classed,
  generateCompoundVariants,
  mergeVariants,
} from 'utils/classed';

export type PaperElementBackgroundVariantProps = Classed.VariantProps<typeof PaperElement>;

export type PaperElementVariantProps = Classed.VariantProps<typeof PaperElement>;

export type PaperElementProps = React.ComponentProps<typeof PaperElement>;

export const PaperElementBackground = classed('div', 'border-boundary-ghost', {
  variants: {
    border: {
      // true: 'border border-solid border-boundary-subtle dark:border-boundary-inverse-subtle',
      true: 'border-2',
      thin: 'border',
    },
    hoverHighlight: {
      true: 'hover:bg-surface-dark',
    },

    shadow: {
      true: 'shadow-xl',
    },
  },
});

export const PaperElement = classed(
  'div',
  PaperElementBackground,
  'relative',
  'bg-surface',
  'text-left text-content',
  {
    variants: {
      padding: {
        true: 'p-16',
      },
      overflow: {
        visible: 'overflow-visible',
        hidden: 'overflow-hidden',
      },
      transparent: {
        true: 'bg-transparent',
      },
      rounded: {
        true: 'rounded-md',
      },
      cursorPointer: {
        true: 'cursor-pointer',
      },
      texture: {
        noise: 'noisy-surface-texture conic-gradient',
      },
      loading: {
        true: clsx(''),
      },
    },

    defaultVariants: {
      overflow: 'hidden',
      rounded: true,
      padding: 'true',
    },
  }
);
