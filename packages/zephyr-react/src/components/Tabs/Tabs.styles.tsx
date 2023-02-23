import { Classed, classTheme, classed, mergeVariants } from 'utils/classed';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { inputComponentVariants } from 'styles/input-component.variants';
import { PaperElementBackground } from 'components/Paper/Paper.styles';
import { mapValues } from 'lodash-es';
import { getRelativeSizeProp } from 'utils/getRelativeSizeProp';
import { SizeProp } from 'types/styles';
import { twMerge } from 'tailwind-merge';

export type TabsListElementVariants = Classed.VariantProps<typeof TabsListElement>;

export type TabsListElementProps = React.ComponentProps<typeof TabsListElement>;

export const TabsListElement = classed(
  TabsPrimitive.List,
  'border-boundary-weak dark:border-boundary-inverse-weak',
  // 'bg-surface-soft dark:bg-surface-inverse-light',
  'bg-neutral-100/50 dark:bg-neutral-900/50',
  'inline-flex items-center gap-4 justify-center p-4 rounded-md',
  {
    variants: {
      size: mergeVariants([
        inputComponentVariants.size.lineHeight,
        inputComponentVariants.size.height,
      ]),
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type TabsListItemElementVariants = Classed.VariantProps<typeof TabsListItemElement>;

export type TabsListItemElementProps = React.ComponentProps<typeof TabsListItemElement>;

export const TabsListItemElement = classed(
  TabsPrimitive.Trigger,
  'inline-flex min-w-[104px] items-center justify-center rounded-[0.185rem]  p-4 font-medium  transition-all  disabled:pointer-events-none disabled:opacity-50',
  'radix-state-inactive:text-content-weak dark:radix-state-inactive:text-content-inverse-weak',
  'radix-state-active:text-content-high dark:radix-state-active:text-content-inverse-high',
  'radix-state-active:bg-surface-50 dark:radix-state-active:bg-surface-inverse-dark',
  'radix-state-active:shadow-sm',
  'radix-state-inactive:hover:bg-highlight',
  'radix-state-active:border border-highlight',

  {
    variants: {
      activeColor: {
        primary: '',
      },
    },
    defaultVariants: {
      activeColor: 'primary',
    },
  }
);
