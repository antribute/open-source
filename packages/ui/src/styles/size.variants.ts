import clsx from 'clsx';
import type { SizeProp } from 'types/styles';

export const sizeVariants = {
  width: {
    xs: clsx('w-28'),
    sm: clsx('w-34'),
    md: clsx('w-40'),
    lg: clsx('w-48'),
  },
  height: {
    xs: clsx('h-28'),
    sm: clsx('h-34'),
    md: clsx('h-40'),
    lg: clsx('h-48'),
  },

  inlineWidth: {
    xs: clsx('w-16 text-xs'),
    sm: clsx('w-20 text-xs'),
    md: clsx('w-22 text-xs'),
    lg: clsx('w-26 text-xs'),
  },

  inlineHeight: {
    xs: clsx('h-16 text-xs'),
    sm: clsx('h-20 text-xs'),
    md: clsx('h-22 text-xs'),
    lg: clsx('h-26 text-xs'),
  },
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
    xs: 'py-4',
    sm: 'py-6',
    md: 'py-8',
    lg: 'py-10',
  },
  paddingX: {
    xs: clsx('px-4'),
    sm: clsx('px-6'),
    md: clsx('px-8'),
    lg: clsx('px-10'),
  },
  extraPaddingX: {
    xs: clsx('px-14'),
    sm: clsx('px-16'),
    md: clsx('px-18'),
    lg: clsx('px-20'),
  },
} satisfies Record<string, Record<SizeProp, string>>;
