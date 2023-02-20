// List Item Element (Base)

import clsx from 'clsx';
import { Classed, classed } from 'utils/classed';

export type BaseListItemElementProps = Classed.ComponentProps<typeof BaseListItem>;

export const BaseListItem = classed.span(
  'relative w-full py-12 flex flex-col gap-y-4',
  'group-data-[rounded-items=true]:rounded-md',
  'group-data-[no-gutters=true]:px-0 group-data-[no-gutters=false]:px-16',
  'text-content-weak',
  {
    variants: {
      highlight: {
        true: clsx(
          'bg-surface-soft dark:bg-surface-inverse-light/80',
          'text-content-intense dark:text-content-inverse-intense'
        ),
        false: 'bg-transparent',
      },

      hoverable: {
        true: clsx(
          'cursor-pointer hover:bg-surface-soft dark:hover:bg-surface-inverse-light/80',
          'hover:text-content-intense dark:hover:text-content-inverse-intense'
        ),
      },
      gap: {
        false: '',
        sm: '!my-4 first:!mt-0 last:!mb-0',
      },
    },

    defaultVariants: {
      highlight: false,
      hoverable: false,
      gap: 'sm',
    },

    compoundVariants: [{ hoverable: true, class: 'select-none' }],
  }
);
