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

export const PaperElementBackground = classed('div', {
  variants: {
    border: {
      // true: 'border border-solid border-boundary-subtle dark:border-boundary-inverse-subtle',
      true: 'border-2 border-boundary-ghost',
    },
    hoverHighlight: {
      true: 'hover:bg-surface-dark',
    },
  },
});

export const PaperElement = classed(
  'div',
  PaperElementBackground,
  'relative text-left bg-surface text-content',
  // classTheme({
  //   class: 'group relative  inline-block rounded-md text-left ',
  //   light: 'text-content-moderate',
  //   dark: 'dark:text-content-inverse-moderate',
  // }),
  {
    variants: {
      padding: {
        false: '',
        none: 'p-0',
        xs: 'p-4',
        sm: 'p-8',
        md: 'p-16',
        lg: 'p-24',
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

      loading: {
        true: clsx(''),
      },
    },

    defaultVariants: {
      padding: 'md',
      overflow: 'hidden',
      rounded: true,
    },
  }
);
