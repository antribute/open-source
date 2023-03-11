import { Classed, classed, expandVariant, mergeVariants } from 'utils/classed';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { inputComponentVariants } from 'styles/input-component.variants';
import { highlightBackdropContrastClass } from 'styles/highlightContrast';

export type TabsContainerElementVariants = Classed.VariantProps<typeof TabsContainerElement>;

export type TabsContainerElementProps = React.ComponentProps<typeof TabsContainerElement>;

export const TabsContainerElement = classed(
  TabsPrimitive.Root,
  'inline-flex',
  'radix-orientation-horizontal:flex-col radix-orientation-horizontal: gap-x-8',
  'radix-orientation-vertical:flex-row gap-y-8'
);

export type TabsListElementProps = React.ComponentProps<typeof TabsListElement>;

export const TabsListElement = classed(
  TabsPrimitive.List,
  'border-highlight-tint border relative z-0',
  'bg-highlight-ghost',
  'inline-flex items-center gap-4 justify-center p-4 px-2',
  expandVariant('radix-orientation-horizontal:(flex-row,rounded-md)'),
  expandVariant('radix-orientation-vertical:(flex-col,rounded-[0.185rem,h-auto])'),

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
  'min-w-[104px] p-4 px-16 flex-grow relative z-10',
  'inline-flex items-center justify-center',
  'rounded-[0.185rem] font-medium select-none',
  'transition-all duration-75',
  'border border-transparent',
  'disabled:pointer-events-none disabled:opacity-50',
  expandVariant(
    'radix-state-active:(text-content-strong,bg-surface-soft,shadow,shadow-palette-black/10,border-content-tint)'
  ),
  expandVariant('radix-state-inactive:(text-content-weak,transition-none,hover:bg-highlight-ghost)')
);

export type TabsViewContainerElementProps = React.ComponentProps<typeof TabsViewContainerElement>;

export const TabsViewContainerElement = classed('div', 'p-6');
