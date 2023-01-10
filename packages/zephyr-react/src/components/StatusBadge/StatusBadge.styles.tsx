import clsx from 'clsx';
import { ButtonElement } from 'components/Button/Button.styles';
import { colorVariants } from 'styles/colors.variants';
import { inputComponentVariants } from 'styles/input-component.variants';
import { fontWeightMap } from 'styles/text.variants';
import { ColorProp } from 'types/styles';
import { Classed, classed, mergeVariants } from 'utils/classed';

export type StatusBadgeElementVariants = Classed.VariantProps<typeof StatusBadgeElement>;

export type StatusBadgeElementProps = React.ComponentProps<typeof StatusBadgeElement>;

export const StatusBadgeElement = classed(
  'div',
  'group inline-flex items-center gap-8 font-medium border border-storm-50 bg-white rounded-full select-none ',
  {
    variants: {
      size: mergeVariants([
        inputComponentVariants.size.paddingX,
        inputComponentVariants.size.lineHeight,
        inputComponentVariants.size.textSize,
      ]),

      color: mergeVariants([colorVariants.border, colorVariants.text]),

      variant: {
        text: 'px-0 py-0 border-none bg-transparent',
        pill: '',
        dropdown: 'cursor-pointer',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'pill',
      color: 'primary',
    },
  }
);

export const StatusBadgeDot = classed('div', 'rounded-full inline-block bg-red-500', {
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
});
