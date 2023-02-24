import clsx from 'clsx';
import { colorVariants } from 'styles/colors.variants';
import { inputComponentVariants } from 'styles/input-component.variants';
import { sizeVariants } from 'styles/size.variants';
import { Classed, classTheme, classed, mergeVariants } from 'utils/classed';

export type StatusBadgeElementVariants = Classed.VariantProps<typeof StatusBadgeElement>;

export type StatusBadgeElementProps = Classed.ComponentProps<typeof StatusBadgeElement>;

const disabledClass = classTheme({
  light: 'disabled:bg-boundary-ghost disabled:border-boundary-ghost disabled:text-content-subtle',
  dark: 'dark:disabled:bg-boundary-inverse-ghost dark:disabled:border-boundary-inverse-ghost dark:disabled:text-content-inverse-subtle',
});

export const StatusBadgeElement = classed(
  'button',
  'group inline-flex items-center gap-6 font-medium border  text-white rounded-full select-none transition-all ring-0 focus:ring-0 ring-transparent',
  'border-boundary-ghost dark:border-boundary-inverse-ghost  outline-none border-none',
  disabledClass,

  {
    variants: {
      size: mergeVariants([
        inputComponentVariants.size.paddingX,
        inputComponentVariants.size.lineHeight,
        inputComponentVariants.size.textSize,
      ]),

      color: mergeVariants([
        colorVariants.bg,
        colorVariants.border,
        colorVariants.hoverDark,
        colorVariants.text,
      ]),

      variant: {
        text: 'px-0 py-0 border-none bg-transparent',
        outlined: 'bg-opacity-10',
        contained: clsx('text-white', 'bg-gradient-to-r from-white/5 via-white/5 to-transparent'),
        dropdown: 'cursor-pointer',
      },

      clickable: {
        true: 'cursor-pointer',
        false: 'cursor-default focus:ring-0',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'contained',
      clickable: false,
    },

    compoundVariants: [
      // { disabled: true, class: clsx('cursor-default hover:bg-current') },
      {
        color: 'surface',
        class: clsx(
          'bg-surface dark:bg-surface-inverse',
          'text-content-intense dark:text-content-inverse-intense',
          'border-boundary-weak dark:border-boundary-inverse-weak',
          'from-transparent via-transparent to-transparent '
        ),
      },
      {
        color: 'surface',
        class: 'bg-neutral/5',
        // class: clsx(
        //   'bg-surface dark:bg-surface-inverse',
        //   'text-content-intense dark:text-content-inverse-intense',
        //   'border-boundary-weak dark:border-boundary-inverse-weak',
        //   'from-transparent via-transparent to-transparent '
        // ),
      },
    ],
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
