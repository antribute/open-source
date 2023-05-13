/* eslint-disable tailwindcss/no-custom-classname */
import clsx from 'clsx';
import { Classed, classed, expandVariant } from 'utils/classed';

export type BaseListItemElementProps = Classed.ComponentProps<typeof BaseListItemElement>;

export const listItemSizingClassName = clsx(
  'relative w-full py-12 flex flex-col gap-y-4 px-16',
  'group-data-antribute-list-rounded-items:rounded-md',
  'group-data-antribute-list-no-item-gutters:px-0'
);

export const BaseListItemElement = classed.span(
  listItemSizingClassName,
  'group-data-antribute-list-hoverable-items:opacity-0',

  {
    variants: {
      highlight: {
        true: clsx(
          'bg-highlight-subtle text-content-intense',
          '[text-shadow:_-0.5px_0_0px_rgb(var(--color-content)/20%)] transition-[text-shadow] duration-500 dark:[text-shadow:initial]'
        ),
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
      paddingY: {
        none: 'py-0',
        xs: 'py-4',
        sm: 'py-8',
        md: 'py-12',
        lg: 'py-16',
      },
      paddingX: {
        none: 'px-0',
        xs: 'px-8',
        sm: 'px-12',
        md: 'px-16',
        lg: 'px-24',
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
