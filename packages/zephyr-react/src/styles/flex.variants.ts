import clsx from 'clsx';
import { FlexAlignItemsProp, FlexJustifyItemsProp } from 'types/styles';

export const flexAlignItemsVariants = {
  center: 'items-center',
  start: 'items-start',
  end: 'items-end',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
} satisfies Record<FlexAlignItemsProp, string>;

export const flexJustifyItemsVariants = {
  center: 'justify-center',
  start: 'justify-start',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} satisfies Record<FlexJustifyItemsProp, string>;
