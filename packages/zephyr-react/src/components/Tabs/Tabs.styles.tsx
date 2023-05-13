import { Classed, classed, expandVariant, mergeVariants } from 'utils/classed';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { inputComponentVariants } from 'styles/input-component.variants';
import { highlightBackdropContrastClass } from 'styles/highlightContrast';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export type TabsContainerElementVariants = Classed.VariantProps<typeof TabsContainerElement>;

export type TabsContainerElementProps = React.ComponentProps<typeof TabsContainerElement>;

export const TabsContainerElement = classed(
  TabsPrimitive.Root,
  'group',
  'gap-16',
  'flex',
  'radix-orientation-horizontal:flex-col',
  'radix-orientation-vertical:flex-row',
  'relative'
);

export type TabsListElementProps = React.ComponentProps<typeof TabsListElement>;

export const TabsListElement = classed(
  motion(TabsPrimitive.List),
  'border-highlight-tint border-[0.5px] relative z-0 ',
  'bg-highlight-ghost',
  'items-center gap-4 justify-center p-[3px]',
  'whitespace-nowrap',
  expandVariant(`
  radix-orientation-horizontal:(flex,flex-row,rounded-md,min-w-fit)
  radix-orientation-vertical:(inline-flex,flex-col,rounded-[0.185rem],h-auto,min-h-fit)
  `),
  'flex-start',
  'shrink-0',

  {
    variants: {
      size: mergeVariants([
        inputComponentVariants.size.lineHeight,
        // inputComponentVariants.size.height,
      ]),
      contrast: {
        true: highlightBackdropContrastClass,
      },
      fullWidth: {
        true: 'w-full flex',
      },
    },

    defaultVariants: {
      size: 'md',
      contrast: true,
    },
  }
);

export type TabsListItemElementProps = React.ComponentProps<typeof TabsListItemElement>;

const MotionTrigger = motion(TabsPrimitive.Trigger);

const activeTabVariant = clsx(
  'radix-state-active:text-content-intense',
  'radix-state-active:ring-1',
  'radix-state-active:ring-boundary-weak/30',
  'radix-state-active:bg-surface-soft',
  'radix-state-active:shadow-sm',
  'radix-state-active:shadow-surface-dark/30',
  'radix-state-active:sm:sticky',
  'radix-state-active:z-20',
  'radix-state-active:left-[3px]',
  'radix-state-active:right-[3px]'
);

const inactiveTabVariant = clsx(
  'radix-state-inactive:text-content-subtle',
  'radix-state-inactive:transition-none',
  'radix-state-inactive:hover:bg-highlight-ghost'
);

const disabledTabVariant = clsx('disabled:pointer-events-none');

export const TabsListItemElement = classed(
  MotionTrigger,
  'group',
  'relative',
  'z-10',
  'shrink-0',
  'flex-grow',
  'min-w-[104px]',
  'p-4 px-16',
  'inline-flex',
  'justify-center',
  'items-center',
  'rounded-[0.185rem]',
  'select-none',
  'font-medium',
  'border-[1.5px]',
  'border-transparent',
  'transition-all',
  'duration-75',
  activeTabVariant,
  inactiveTabVariant,
  disabledTabVariant
);

export type TabsViewContainerElementProps = React.ComponentProps<typeof TabsViewContainerElement>;

export const TabsViewContainerElement = classed('div', 'grow');
