/* eslint-disable tailwindcss/no-custom-classname */
import clsx from 'clsx';
import { surfaceGroupTextVariants } from 'styles/surface-colors.variants';
import { Classed, classed, expandVariant } from 'utils/classed';

export type BaseListItemElementProps = Classed.ComponentProps<typeof BaseListItem>;

export const BaseListItem = classed.span(
  'relative w-full py-12 flex flex-col gap-y-4',
  'group-data-[rounded-items=true]:rounded-md',
  'group-data-[no-gutters=true]:px-0 group-data-[no-gutters=false]:px-16',

  {
    variants: {
      highlight: {
        true: clsx(
          '!bg-highlight hover:!bg-highlight',
          'backdrop-contrast-100 hover:backdrop-contrast-[0.94] dark:backdrop-contrast-[0.94]'
          // surfaceGroupTextVariants.intense
          // // Neutral
          // 'group-[.is-surface-neutral]:!text-content-inverse-intense',
          // // Neutral Light
          // 'group-[.is-surface-neutral-light]:!text-content-inverse-intense',
          // 'group-[.is-surface-neutral-light]:backdrop-contrast-[0.89]'
        ),
      },
      hoverable: {
        true: clsx(
          'cursor-pointer select-none',
          // 'hover:text-content-high dark:hover:text-content-inverse-high',
          'hover:bg-highlight-weak dark:hover:bg-highlight'
          // surfaceGroupTextVariants.weak
          // // Neutral
          // 'hover:group-[.is-surface-neutral]:text-content-inverse-high',
          // 'hover:group-[.is-surface-neutral]:backdrop-contrast-[0.97]',
          // // Neutral Light
          // 'hover:group-[.is-surface-neutral-light]:text-content-inverse-high',
          // 'hover:group-[.is-surface-neutral-light]:backdrop-contrast-[0.93]'
        ),
      },

      active: {
        true: clsx(
          'bg-highlight',
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
        // true: 'text-content-weak dark:text-content-inverse-weak hover:text-neutral-400',
      },

      gap: {
        false: '',
        sm: '!my-4 first:!mt-0 last:!mb-0',
      },
    },

    compoundVariants: [
      // {
      //   inactive: true,
      //   highlight: true,
      //   class: '!text-neutral-500',
      // },
      {
        highlight: true,
        class: expandVariant(
          clsx(
            'group-surface-neutral:(text-content-inverse-intense,backdrop-contrast-[0.94])',
            'group-surface-neutral-light:(backdrop-contrast-[0.84])'
          )
        ),
      },
      {
        highlight: false,
        class: expandVariant(
          clsx(
            'group-surface-neutral:(text-content-inverse-high,hover:backdrop-contrast-[0.90])',
            'group-surface-neutral-light:(hover:backdrop-contrast-[0.91])'
          )
        ),
      },
    ],

    defaultVariants: {
      highlight: false,
      hoverable: false,
      gap: 'sm',
    },
  }
);
