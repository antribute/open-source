// List Item Element (Base)

import clsx from 'clsx';
import { Classed, classed } from 'utils/classed';

export type BaseListItemElementProps = Classed.ComponentProps<typeof BaseListItem>;

export const BaseListItem = classed.span(
  'relative w-full py-12 flex flex-col gap-y-4',
  'group-data-[rounded-items=true]:rounded-md',
  'group-data-[no-gutters=true]:px-0 group-data-[no-gutters=false]:px-16',
  'text-content-weak dark:text-content-inverse',
  {
    variants: {
      highlight: {
        true: clsx(
          'bg-highlight-moderate ',
          'text-content-strong dark:!text-content-inverse-intense'
        ),
        // false: 'bg-transparent',
      },
      active: {
        true: clsx(
          // 'bg-surface-soft dark:bg-neutral/30',
          // 'bg-highlight-weak',
          'text-content-strong dark:text-content-inverse-strong'
        ),
        // false: 'bg-transparent',
      },

      hoverable: {
        true: clsx(
          'cursor-pointer select-none'
          // 'hover:text-content-strong dark:hover:text-content-inverse-strong'
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

    compoundVariants: [
      { hoverable: true, class: 'select-none' },
      { hoverable: true, highlight: false, class: 'hover:bg-highlight-moderate' },
    ],
  }
);
