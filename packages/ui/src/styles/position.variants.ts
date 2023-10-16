import clsx from 'clsx';
import { mapValues } from 'lodash-es';
import type { PositionProp } from 'types/styles';

export const positionVariants = {
  'top-center': '-translate-y-1/2 translate-x-1/2 right-1/2',
  'top-left': '-translate-y-1/2 -translate-x-1/2 right-auto top-0 left-0',
  'top-right': '-translate-y-1/2 translate-x-1/2 left-auto top-0 right-0',
  'middle-center': '-translate-y-1/2 -translate-x-1/2 top-2/4 left-1/2',
  'middle-left': '-translate-y-1/2 -translate-x-1/2 right-auto left-0 top-2/4',
  'middle-right': '-translate-y-1/2 translate-x-1/2 left-auto right-0 top-2/4',
  'bottom-center': 'translate-y-1/2 translate-x-1/2 bottom-0 right-1/2',
  'bottom-left': 'translate-y-1/2 -translate-x-1/2 right-auto bottom-0 left-0',
  'bottom-right': 'translate-y-1/2 translate-x-1/2 left-auto bottom-0 right-0',
} satisfies Record<PositionProp, string>;

export const absolutePositionVariants = mapValues(positionVariants, (className) =>
  clsx(className, 'absolute')
);
