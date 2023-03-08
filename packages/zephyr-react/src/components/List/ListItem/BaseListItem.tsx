/* eslint-disable tailwindcss/no-custom-classname */
import clsx from 'clsx';
import { Classed, classed, expandVariant } from 'utils/classed';

export type BaseListItemElementProps = Classed.ComponentProps<typeof BaseListItem>;

export const BaseListItem = classed.span(
  'relative w-full py-12 flex flex-col gap-y-4',
  'group-data-[rounded-items=true]:rounded-md',
  'group-data-[no-gutters=true]:px-0 group-data-[no-gutters=false]:px-16',

  {
    variants: {
      highlight: {
        true: clsx('bg-highlight text-content-intense'),
      },
      hoverable: {
        true: clsx('hover:bg-highlight-weak cursor-pointer select-none'),
      },

      active: {
        true: clsx(
          'bg-highlight',
          expandVariant(
            "before:(content-[''],absolute,left-0,top-0,h-full,w-2,rounded-sm,bg-highlight)"
          )
          // This style is for showing a caret to indicate the active item
          // [
          //   "before:content-['']",
          //   'before:absolute before:left-0 before:top-0',
          //   'before:h-full before:w-2',
          //   'before:rounded-sm',
          //   'before:bg-neutral-300 dark:before:bg-highlight',
          //   'before:backdrop-contrast-[.7]',
          // ]
        ),
      },
      inactive: {
        true: '',
      },

      gap: {
        false: '',
        sm: '!my-4 first:!mt-0 last:!mb-0',
      },
    },

    compoundVariants: [
      {
        inactive: true,
        highlight: false,
        class: 'text-content-weak hover:text-content-high',
      },
    ],

    defaultVariants: {
      highlight: false,
      hoverable: false,
      gap: 'sm',
    },
  }
);
