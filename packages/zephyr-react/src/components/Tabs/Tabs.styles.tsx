import { Classed, classed, mergeVariants } from 'utils/classed';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { inputComponentVariants } from 'styles/input-component.variants';

export type TabsListElementVariants = Classed.VariantProps<typeof TabsListElement>;

export type TabsListElementProps = React.ComponentProps<typeof TabsListElement>;

export const TabsListElement = classed(
  TabsPrimitive.List,
  'flex space-x-2  border-divider-weak dark:border-divider-inverse-weak',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row border-b',
        vertical: 'flex-col border-r',
      },
      size: mergeVariants([
        inputComponentVariants.size.textSize,
        inputComponentVariants.size.lineHeight,
        inputComponentVariants.size.paddingX,
      ]),
    },
    defaultVariants: {
      orientation: 'horizontal',
      size: 'md',
    },
  }
);

export type TabsListItemElementVariants = Classed.VariantProps<typeof TabsListItemElement>;

export type TabsListItemElementProps = React.ComponentProps<typeof TabsListItemElement>;

export const TabsListItemElement = classed(
  TabsPrimitive.Trigger,
  'py-4 px-4 inline-flex items-center justify-center gap-2 font-medium  border-b-2 border-transparent text-center whitespace-nowrap',

  {
    variants: {
      activeColor: {
        primary:
          'radix-state-active:border-primary-500 radix-state-active:text-primary-500 hover:text-primary-700',
      },
    },
    defaultVariants: {
      activeColor: 'primary',
    },
  }
);
