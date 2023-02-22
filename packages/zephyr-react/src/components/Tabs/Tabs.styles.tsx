import { Classed, classTheme, classed, mergeVariants } from 'utils/classed';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { inputComponentVariants } from 'styles/input-component.variants';
import { PaperElementBackground } from 'components/Paper/Paper.styles';
import { mapValues } from 'lodash-es';
import { getRelativeSizeProp } from 'utils/getRelativeSizeProp';
import { SizeProp } from 'types/styles';

export type TabsListElementVariants = Classed.VariantProps<typeof TabsListElement>;

export type TabsListElementProps = React.ComponentProps<typeof TabsListElement>;

export const TabsListElement = classed(
  TabsPrimitive.List,
  'border-boundary-weak dark:border-boundary-inverse-weak',
  'bg-surface-soft dark:bg-surface-inverse-light',
  'inline-flex items-center justify-center p-4 rounded-md',

  {
    variants: {
      variant: {
        segment: '',
      },
      // orientation: {
      //   horizontal: 'flex-row border-b',
      //   vertical: 'flex-col border-r',
      // },
      size: mergeVariants([
        mapValues(inputComponentVariants.size.textSize, (_, size) =>
          getRelativeSizeProp(-1, { relativeSize: size as SizeProp })
        ),
        inputComponentVariants.size.lineHeight,
        inputComponentVariants.size.height,
        // inputComponentVariants.size.paddingX,
      ]),
    },
    defaultVariants: {
      // orientation: 'horizontal',
      variant: 'segment',
      size: 'md',
    },
  }
);

export type TabsListItemElementVariants = Classed.VariantProps<typeof TabsListItemElement>;

export type TabsListItemElementProps = React.ComponentProps<typeof TabsListItemElement>;

export const TabsListItemElement = classed(
  TabsPrimitive.Trigger,
  'inline-flex min-w-[104px] items-center justify-center rounded-[0.185rem]  p-4 font-medium  transition-all  disabled:pointer-events-none disabled:opacity-50',
  'text-content-moderate dark:text-content-inverse-moderate',
  'radix-state-active:bg-surface-50 dark:radix-state-active:bg-surface-inverse-dark',
  'radix-state-active:text-content-moderate dark:radix-state-active:text-content-inverse-moderate',
  'radix-state-active:shadow-sm shadow-sm',

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
