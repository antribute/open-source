import clsx from 'clsx';
import { SizeProp } from 'types/styles';

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
    xs: clsx('w-22'),
    sm: clsx('w-24'),
    md: clsx('w-26'),
    lg: clsx('w-32'),
  },

  inlineHeight: {
    xs: clsx('h-22'),
    sm: clsx('h-24'),
    md: clsx('h-26'),
    lg: clsx('h-32'),
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
    xs: 'py-6',
    sm: 'py-8',
    md: 'py-8',
    lg: 'py-8',
  },
  paddingX: {
    xs: clsx('px-6'),
    sm: clsx('px-8'),
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