import clsx from 'clsx';
import { Classed, classed } from 'utils/classed';

export type BaseListItemElementProps = Classed.ComponentProps<typeof BaseListItem>;

export const BaseListItem = classed.span(
  'relative w-full py-12 flex flex-col gap-y-4',
  'group-data-[rounded-items=true]:rounded-md',
  'group-data-[no-gutters=true]:px-0 group-data-[no-gutters=false]:px-16',

  {
    variants: {
      highlight: {
        true: clsx(
          '!bg-highlight-moderate hover:!bg-highlight-moderate',
          'text-content-intense dark:!text-content-inverse-intense',

          'backdrop-contrast-100 hover:backdrop-contrast-[0.94] dark:backdrop-contrast-[0.94]',
          // Neutral
          'group-[.is-surface-neutral]:!text-content-inverse-intense',
          // Neutral Light
          'group-[.is-surface-neutral-light]:!text-content-inverse-intense',
          'group-[.is-surface-neutral-light]:backdrop-contrast-[0.88]'
        ),
      },
      hoverable: {
        true: clsx(
          'cursor-pointer select-none',
          'hover:text-content-high dark:hover:text-content-inverse-high',
          'hover:bg-highlight-weak dark:hover:bg-highlight',
          // Neutral
          'hover:group-[.is-surface-neutral]:text-content-inverse-high',
          // Neutral Light
          'hover:group-[.is-surface-neutral-light]:text-content-inverse-high',
          'hover:group-[.is-surface-neutral-light]:backdrop-contrast-[0.93]'
        ),
      },

      active: {
        true: clsx(
          'bg-highlight-moderate',
          'text-neutral-400 dark:text-content-inverse-strong',
          // This style is for showing a caret to indicate the active item
          [
            "before:content-['']",
            'before:absolute before:left-0 before:top-0',
            'before:h-full before:w-2',
            'before:rounded-sm',
            'before:bg-neutral-300 dark:before:bg-highlight',
            'before:backdrop-contrast-[.7]',
          ]
        ),
      },
      inactive: {
        true: 'text-content-weak dark:text-content-inverse-weak hover:text-neutral-400',
      },

      gap: {
        false: '',
        sm: '!my-4 first:!mt-0 last:!mb-0',
      },
    },

    compoundVariants: [
      {
        inactive: true,
        highlight: true,
        class: '!text-neutral-500',
      },
    ],

    defaultVariants: {
      highlight: false,
      hoverable: false,
      gap: 'sm',
    },
  }
);
