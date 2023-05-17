import { buttonVariants } from 'components/Button/Button.styles';
import { colorSchemeVariants } from 'styles/color-scheme-variants';
import { inputComponentVariants } from 'styles/input-component.variants';
import { Classed, classTheme, classed, mergeVariants } from 'utils/classed';

export type StatusBadgeElementVariants = Classed.VariantProps<typeof StatusBadgeElement>;

export type StatusBadgeElementProps = Classed.ComponentProps<typeof StatusBadgeElement>;

const disabledClass = classTheme({
  light: 'disabled:bg-boundary-ghost disabled:border-boundary-ghost disabled:text-content-subtle',
  dark: 'dark:disabled:bg-boundary-inverse-ghost dark:disabled:border-boundary-inverse-ghost dark:disabled:text-content-inverse-subtle',
});

export const StatusBadgeElement = classed(
  'button',
  'group inline-flex items-center justify-center gap-6 font-medium border select-none transition-all  ring-transparent',
  'border-boundary-ghost dark:border-boundary-inverse-ghost  outline-none border-none text-primary-content',
  disabledClass,

  {
    defaultVariants: {
      size: 'md',
      variant: 'filled',
      clickable: false,
      rounded: 'full',
    },

    variants: {
      ...buttonVariants.variants,
      // color: buttonVariants.variants.color,
      size: mergeVariants([
        inputComponentVariants.size.paddingX,
        inputComponentVariants.size.inlineHeight,
        inputComponentVariants.size.lineHeight,
        inputComponentVariants.size.textSize,
      ]),

      // variant: {
      //   text: clsx('p-0 border-none bg-transparent'),
      //   outlined: clsx('text-content ring-1 ring-primary focus:ring-primary focus:ring-1'),
      //   contained: clsx('bg-primary text-palette-white'),
      //   dropdown: 'cursor-pointer',
      // },

      clickable: {
        true: 'cursor-pointer',
        false: 'cursor-default',
      },

      rounded: {
        true: 'rounded',
        false: '',
        full: 'rounded-full',
      },
    },
    compoundVariants: [...buttonVariants.compoundVariants],
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
      color: mergeVariants([colorSchemeVariants.filledAccent.base]),
    },
    defaultVariants: {
      dotPosition: 'left',
      size: 'md',
    },
  }
);
