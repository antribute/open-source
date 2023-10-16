import clsx from 'clsx';
import type { HeadingLevel, SizeProp } from 'types/styles';

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
    none: clsx('leading-none'),
    xs: clsx('leading-xs'),
    sm: clsx('leading-sm'),
    md: clsx('leading-md'),
    lg: clsx('leading-lg'),
    h1: clsx('leading-h1'),
    h2: clsx('leading-h2'),
    h3: clsx('leading-h3'),
    h4: clsx('leading-h4'),
    h5: clsx('leading-h5'),
    h6: clsx('leading-h6'),
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
    inherit: clsx('text-inherit'),
    current: clsx('text-current'),
    tint: clsx('text-content-tint'),
    ghost: clsx('text-content-ghost'),
    subtle: clsx('text-content-subtle'),
    medium: clsx('text-content'),
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
    start: clsx('text-left'),
    end: clsx('text-end'),
  },
  maxLines: {
    1: 'line-clamp-1',
    2: 'line-clamp-2',
    3: 'line-clamp-3',
    4: 'line-clamp-4',
    5: 'line-clamp-5',
    6: 'line-clamp-6',
  },
};
