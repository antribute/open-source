import clsx from 'clsx';

export const textVariants = {
  variant: {
    body: 'font-body',
    heading: 'font-heading',
    mono: 'font-mono',
  },
  fontWeight: {
    medium: clsx('font-medium'),
    bold: clsx('font-bold'),
  },
  size: {
    xs: clsx('text-xs'),
    sm: clsx('text-sm'),
    md: clsx('text-md'),
    lg: clsx('text-lg'),
  },
  color: {
    tint: clsx('text-content-tint'),
    ghost: clsx('text-content-ghost'),
    subtle: clsx('text-content-subtle'),
    weak: clsx('text-content-weak'),
    moderate: clsx('text-content-moderate'),
    high: clsx('text-content-high'),
    strong: clsx('text-content-intense'),
    inverse: clsx('text-inverse'),
    danger: clsx('text-danger'),
  },
};
