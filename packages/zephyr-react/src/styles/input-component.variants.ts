import { VariantProps, classed } from '@tw-classed/react';
import clsx from 'clsx';
import { Classed, classedVariantMap, mergeVariants } from 'utils/classed';

export const inputComponentVariants = classedVariantMap({
  size: {
    textSize: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
    },
    lineHeight: {
      sm: 'leading-sm',
      md: 'leading-md',
      lg: 'leading-lg',
    },
    paddingX: {
      sm: 'px-8',
      md: 'px-16',
      lg: 'px-24',
    },
    paddingY: {
      sm: 'py-8',
      md: 'py-16',
      lg: 'py-24',
    },
  },

  rounded: {
    roundedLeft: 'rounded-r-0 rounded-l-md',
    roundedRight: 'rounded-l-0 rounded-r-md',
    rounded: 'rounded-md',
  },
});

export const InputSizeVariant = classed('input', {
  variants: {
    width: {
      auto: 'w-auto',
      full: 'w-full',
      fixed: 'w-177',
    },
    size: mergeVariants(inputComponentVariants.size),
    defaultVariants: {
      size: 'md',
      width: 'fixed',
    },
  },
  compoundVariants: [
    { size: 'sm', width: 'fixed', class: 'w-136' },
    { size: 'md', width: 'fixed', class: 'w-177' },
    { size: 'lg', width: 'fixed', class: 'w-200' },
  ],
});
