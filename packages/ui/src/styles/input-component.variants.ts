import { classed } from '@tw-classed/react';
import clsx from 'clsx';
import { sizeVariants } from 'styles/size.variants';
import { OrientationProp } from 'types/styles';
import { classedVariantMap, mergeVariants } from 'utils/classed';

export const inputComponentVariants = classedVariantMap({
  size: sizeVariants,
  rounded: {
    roundedLeft: 'rounded-r-0 rounded-l-md',
    roundedRight: 'rounded-l-0 rounded-r-md',
    rounded: 'rounded-md',
  },
});

export const InputComponentOrientationVariant = classed('div', {
  variants: {
    orientation: {
      horizontal: 'inline-flex flex-row items-center ',
      vertical: 'flex flex-col justify-center',
    } satisfies Record<OrientationProp, string>,
  },
});

const inputComponentWidths = {
  xs: clsx('w-168'),
  sm: clsx('w-184'),
  md: clsx('w-216'),
  lg: clsx('w-400'),
};

const inputComponentMinWidths = {
  none: '',
  xs: clsx('min-w-[168px]'),
  sm: clsx('min-w-[184px]'),
  md: clsx('min-w-[216px]'),
  lg: clsx('min-w-[400px]'),
};

export type InputWidth = 'autoWidth' | 'fullWidth' | 'fixedWidth';

export const InputComponentWidthVariant = classed('div', {
  variants: {
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
    },
    minWidth: inputComponentMinWidths,

    width: {
      autoWidth: 'w-auto',
      fullWidth: '!w-full',
      fixedWidth: '',
    } satisfies Record<InputWidth, string>,
  },
  defaultVariants: {
    width: 'fixedWidth',
    size: 'md',
  },
  compoundVariants: [
    { size: 'xs', width: 'fixedWidth', class: inputComponentWidths.xs },
    { size: 'sm', width: 'fixedWidth', class: inputComponentWidths.sm },
    { size: 'md', width: 'fixedWidth', class: inputComponentWidths.md },
    { size: 'lg', width: 'fixedWidth', class: inputComponentWidths.lg },
  ],
});

export const inputSizeVariants = mergeVariants([
  inputComponentVariants.size.lineHeight,
  inputComponentVariants.size.paddingX,
  inputComponentVariants.size.paddingY,
  inputComponentVariants.size.textSize,
]);

export const InputSizeVariant = classed('div', 'inline-flex', {
  variants: {
    size: inputSizeVariants,
  },
});
