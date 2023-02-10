import { classed } from '@tw-classed/react';
import { classedVariantMap, mergeVariants } from 'utils/classed';

export const inputComponentVariants = classedVariantMap({
  size: {
    textSize: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
    },
    lineHeight: {
      xs: 'leading-xs',
      sm: 'leading-sm',
      md: 'leading-md',
      lg: 'leading-lg',
    },
    paddingY: {
      xs: 'py-6',
      sm: 'py-8',
      md: 'py-8',
      lg: 'py-8',
    },
    paddingX: {
      xs: 'px-6',
      sm: 'px-6',
      md: 'px-8',
      lg: 'px-10',
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
