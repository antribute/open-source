/* eslint-disable tailwindcss/no-custom-classname */
import clsx from 'clsx';
import { Classed, classed, expandVariant } from 'utils/classed';

export type BaseListItemElementProps = Classed.ComponentProps<typeof BaseListItem>;

export const BaseListItem = classed.span(
  'relative w-full py-12 flex flex-col gap-y-4',
  'px-16',
  expandVariant(`
  group-data-antribute-list-rounded-items:(rounded-md)
  group-data-antribute-list-no-item-gutters:(px-0)
  group-data-antribute-list-hoverable-items:(opacity-0)
  
  `),

  {
    variants: {
      highlight: {
        true: clsx('bg-highlight-subtle text-content-intense'),
      },
      hoverable: {
        true: clsx('hover:bg-highlight-ghost cursor-pointer select-none'),
      },
      active: {
        true: clsx(
          'bg-highlight-ghost',
          // This style is for showing a caret to indicate the active item
          expandVariant(
            "before:(content-[''],absolute,left-0,top-0,h-full,w-2,rounded-sm,bg-highlight)"
          )
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
      {
        highlight: true,
        hoverable: true,
        class: 'hover:bg-highlight-subtle',
      },
    ],

    defaultVariants: {
      highlight: false,
      hoverable: false,
      gap: 'sm',
    },
  }
);
