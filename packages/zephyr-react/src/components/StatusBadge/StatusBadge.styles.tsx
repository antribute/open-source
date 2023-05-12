import clsx from 'clsx';
import { colorVariants, filledAccents } from 'styles/colors.variants';
import { inputComponentVariants } from 'styles/input-component.variants';
import { getRelativeSizeProp, objectMap } from 'utils';
import { Classed, classTheme, classed, mergeVariants } from 'utils/classed';

export type StatusBadgeElementVariants = Classed.VariantProps<typeof StatusBadgeElement>;

export type StatusBadgeElementProps = Classed.ComponentProps<typeof StatusBadgeElement>;

const disabledClass = classTheme({
  light: 'disabled:bg-boundary-ghost disabled:border-boundary-ghost disabled:text-content-subtle',
  dark: 'dark:disabled:bg-boundary-inverse-ghost dark:disabled:border-boundary-inverse-ghost dark:disabled:text-content-inverse-subtle',
});

export const StatusBadgeElement = classed(
  'button',
  'group inline-flex items-center justify-center gap-6 font-medium border select-none transition-all ring-0 focus:ring-0 ring-transparent',
  'border-boundary-ghost dark:border-boundary-inverse-ghost  outline-none border-none text-primary-content',
  disabledClass,

  {
    variants: {
      size: mergeVariants([
        inputComponentVariants.size.paddingX,
        inputComponentVariants.size.inlineHeight,
        inputComponentVariants.size.lineHeight,
        inputComponentVariants.size.textSize,
      ]),

      color: mergeVariants([filledAccents]),

      variant: {
        text: 'px-0 py-0 border-none bg-transparent',
        outlined: 'bg-opacity-10',
        contained: clsx('from-palette-white/5 via-palette-white/5 bg-gradient-to-r to-transparent'),
        dropdown: 'cursor-pointer',
      },

      clickable: {
        true: 'cursor-pointer',
        false: 'cursor-default focus:ring-0',
      },

      rounded: {
        true: 'rounded',
        false: '',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'contained',
      clickable: false,
      rounded: 'full',
    },
  }
);

export const StatusBadgeDot = classed(
  'div',
  'rounded-full inline-block border filter brightness-125 border-white border-opacity-10',
  {
    variants: {
      dotPosition: {
        left: 'order-first',
        right: 'order-last',
      },
      size: {
        xs: 'w-8 h-8',
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-10 h-10',
        xl: 'w-14 h-14',
      },
      color: mergeVariants([colorVariants.bg, colorVariants.text]),
    },
    defaultVariants: {
      dotPosition: 'left',
      size: 'md',
    },
  }
);
