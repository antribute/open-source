import clsx from 'clsx';
import { HeadingLevel, SizeProp } from 'types/styles';

const headingTextSize = {
  h1: clsx('text-h1'),
  h2: clsx('text-h2'),
  h3: clsx('text-h3'),
  h4: clsx('text-h4'),
  h5: clsx('text-h5'),
  h6: clsx('text-h6'),
} satisfies Record<HeadingLevel, string>;

const textSize = {
  xs: clsx('text-xs'),
  sm: clsx('text-sm'),
  md: clsx('text-md'),
  lg: clsx('text-lg'),
} satisfies Record<SizeProp, string>;

export const textVariants = {
  fontWeight: {
    regular: clsx('font-regular'),
    medium: clsx('font-medium'),
    bold: clsx('font-bold'),
  },
  size: {
    ...textSize,
    ...headingTextSize,
  },
  font: {
    body: 'font-body',
    heading: 'font-heading',
    mono: 'font-mono',
  },
  leading: {
    xs: clsx('leading-xs'),
    sm: clsx('leading-sm'),
    md: clsx('leading-md'),
    lg: clsx('leading-lg'),
  },
  spaceY: {
    xs: clsx('space-y-4'),
    sm: clsx('space-y-6'),
    md: clsx('space-y-8'),
    lg: clsx('space-y-16'),
  },
  spaceX: {
    xs: clsx('space-x-4'),
    sm: clsx('space-x-6'),
    md: clsx('space-x-8'),
    lg: clsx('space-x-16'),
  },
  color: {
    current: clsx('text-current'),
    tint: clsx('text-content-tint'),
    ghost: clsx('text-content-ghost'),
    subtle: clsx('text-content-subtle'),
    weak: clsx('text-content-weak'),
    moderate: clsx('text-content-moderate'),
    high: clsx('text-content-high'),
    intense: clsx('text-content-intense'),
    strong: clsx('text-content-intense'),
    inverse: clsx('text-inverse'),
    danger: clsx('text-danger'),
  },
  align: {
    center: clsx('text-center'),
    right: clsx('text-right'),
    left: clsx('text-left'),
  },
};
