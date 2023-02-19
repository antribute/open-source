import { classed } from '@tw-classed/react';
import clsx from 'clsx';
import { sizeVariants } from 'styles/size.variants';
import { classedCore, classedVariantMap, mergeVariants } from 'utils/classed';

export const inputComponentVariants = classedVariantMap({
  size: sizeVariants,
  rounded: {
    roundedLeft: 'rounded-r-0 rounded-l-md',
    roundedRight: 'rounded-l-0 rounded-r-md',
    rounded: 'rounded-md',
  },
});

export const InputComponentWidthVariant = classed('div', {
  variants: {
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
    },
    width: {
      auto: 'w-auto',
      full: 'w-full',
      fixed: '',
    },
  },
  defaultVariants: {
    width: 'fixed',
    size: 'md',
  },
  compoundVariants: [
    { size: 'xs', width: 'fixed', class: clsx('w-168') },
    { size: 'sm', width: 'fixed', class: clsx('w-184') },
    { size: 'md', width: 'fixed', class: clsx('w-216') },
    { size: 'lg', width: 'fixed', class: clsx('w-256') },
  ],
});

export const InputSizeVariant = classed('input', 'inline-flex', {
  variants: {
    size: mergeVariants([
      inputComponentVariants.size.lineHeight,
      inputComponentVariants.size.paddingX,
      inputComponentVariants.size.paddingY,
      inputComponentVariants.size.textSize,
    ]),
  },
});
