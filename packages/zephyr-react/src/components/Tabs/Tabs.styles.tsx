import { Classed, classed, mergeVariants } from 'utils/classed';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { inputComponentVariants } from 'styles/input-component.variants';
import { highlightBackdropContrastClass } from 'styles/highlightContrast';

export type TabsContainerElementVariants = Classed.VariantProps<typeof TabsContainerElement>;

export type TabsContainerElementProps = React.ComponentProps<typeof TabsContainerElement>;

export const TabsContainerElement = classed(
  TabsPrimitive.Root,
  'flex relative',
  'radix-orientation-horizontal:flex-col radix-orientation-horizontal: gap-x-8',
  'radix-orientation-vertical:flex-row gap-y-8'
);

export type TabsListElementProps = React.ComponentProps<typeof TabsListElement>;

export const TabsListElement = classed(
  TabsPrimitive.List,
  '',
  'border-boundary-weak dark:border-boundary-inverse-weak ',
  // 'bg-surface-soft dark:bg-surface-inverse-light',
  'bg-neutral-100/50 dark:bg-neutral-900/50',
  'inline-flex items-center gap-4 justify-center p-4',
  'radix-orientation-horizontal:flex-row radix-orientation-vertical:flex-col',
  'radix-orientation-vertical:rounded-[0.185rem] radix-orientation-horizontal:rounded-md',
  'radix-orientation-vertical:h-auto',

  {
    variants: {
      size: mergeVariants([
        inputComponentVariants.size.lineHeight,
        inputComponentVariants.size.height,
      ]),
      contrast: {
        true: highlightBackdropContrastClass,
      },
    },
    defaultVariants: {
      size: 'md',
      contrast: true,
    },
  }
);

export type TabsListItemElementProps = React.ComponentProps<typeof TabsListItemElement>;

export const TabsListItemElement = classed(
  TabsPrimitive.Trigger,
  'min-w-[104px] p-4 ',
  'inline-flex items-center justify-center',
  'rounded-[0.185rem] font-medium select-none',
  'transition-all duration-75',
  'border border-transparent',
  'disabled:pointer-events-none disabled:opacity-50',
  'radix-state-inactive:text-content-weak dark:radix-state-inactive:text-content-inverse-weak',
  'radix-state-active:text-content-high dark:radix-state-active:text-content-inverse-high',
  'radix-state-active:bg-surface-50/95 dark:radix-state-active:bg-surface-inverse-dark/95',
  'radix-state-active:shadow-sm',
  'radix-state-inactive:hover:bg-highlight',
  'radix-state-active:border-highlight',
  'radix-state-active:transition-none'
);

export type TabsViewContainerElementProps = React.ComponentProps<typeof TabsViewContainerElement>;

export const TabsViewContainerElement = classed('div', 'p-6');
