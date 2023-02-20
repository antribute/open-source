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
} satisfies Record<string, Record<SizeProp, string>>;
