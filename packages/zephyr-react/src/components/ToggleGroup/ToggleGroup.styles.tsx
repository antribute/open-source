import { classed } from '@tw-classed/react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { inputComponentVariants } from 'styles/input-component.variants';
import { Classed, classTheme, mergeVariants } from 'utils/classed';
import { ColorProp, FontWeightProp } from 'types/styles';
import { ElementPositonData } from './ToggleGroup.helpers';

export type ToggleGroupItemElementVariantProps = Classed.VariantProps<
  typeof ToggleGroupItemElement
>;

export type ToggleGroupItemElementProps = Classed.VariantProps<typeof ToggleGroupItemElement>;

export const ToggleGroupItemElement = classed(
  ToggleGroupPrimitive.Item,
  'whitespace-nowrap flex-grow border-y relative',
  'first:rounded-l-md last:rounded-r-md',
  '  focus:ring-2  focus:z-10',
  'hover:text-white',
  'bg-surface dark:bg-surface-inverse-light',
  'border-gray-light/50 border-light-gray dark:border-white/5',
  'radix-state-on:text-white radix-state-off:text-content-muted radix-state-off:dark:text-content-inverse-weak',

  {
    variants: {
      color: {
        primary: classTheme({
          light:
            'radix-state-on:bg-primary radix-state-on:border-primary hover:border-primary-dark hover:bg-primary-dark',
          dark: 'dark:radix-state-on:bg-primary dark:radix-state-on:border-primary dark:hover:border-primary-dark dark:hover:bg-primary-dark',
        }),
        secondary: classTheme({
          light:
            'radix-state-on:bg-secondary radix-state-on:border-secondary hover:border-secondary-dark hover:bg-secondary-dark',
          dark: 'dark:radix-state-on:bg-secondary dark:radix-state-on:border-secondary dark:hover:border-secondary-dark dark:hover:bg-secondary-dark',
        }),
        caution: classTheme({
          light:
            'radix-state-on:bg-caution radix-state-on:border-caution hover:border-caution-dark hover:bg-caution-dark',
          dark: 'dark:radix-state-on:bg-caution dark:radix-state-on:border-caution dark:hover:border-caution-dark dark:hover:bg-caution-dark',
        }),
        danger: classTheme({
          light:
            'radix-state-on:bg-danger radix-state-on:border-danger hover:border-danger-dark hover:bg-danger-dark',
          dark: 'dark:radix-state-on:bg-danger dark:radix-state-on:border-danger dark:hover:border-danger-dark dark:hover:bg-danger-dark',
        }),
        positive: classTheme({
          light:
            'radix-state-on:bg-positive radix-state-on:border-positive hover:border-positive-dark hover:bg-positive-dark',
          dark: 'dark:radix-state-on:bg-positive dark:radix-state-on:border-positive dark:hover:border-positive-dark dark:hover:bg-positive-dark',
        }),
      } satisfies Partial<Record<ColorProp, string>>,

      size: mergeVariants([
        inputComponentVariants.size.textSize,
        inputComponentVariants.size.paddingY,
        inputComponentVariants.size.paddingX,
      ]),

      fontWeight: {
        medium: 'font-medium',
        semibold: 'font-semibold',
      } satisfies Partial<Record<FontWeightProp, string>>,
    },

    defaultVariants: {
      fontWeight: 'medium',
    },
  }
);

/**
 * All this just to make sure that the selected item's
 * neighboring border is the same color as the selected element
 */
export const getToggleItemBorderWidth = ({
  isLeftSiblingSelected,
  isRightSiblingSelected,
  isFirst,
  isLast,
  isMiddle,
  isSelected,
}: ElementPositonData) => {
  if (isSelected) {
    return 'border-l border-r';
  }

  if (isLeftSiblingSelected && isLast) {
    return 'border-r border-l-0';
  }

  if (isRightSiblingSelected && isFirst) {
    return 'border-l border-r-0';
  }

  if (isLeftSiblingSelected) {
    return 'border-l-0 border-r';
  }

  if (isRightSiblingSelected) {
    return 'border-r-0';
  }

  if (isFirst) {
    return 'border-l border-r';
  }

  if (isLast) {
    return 'border-r';
  }

  if (isMiddle) {
    return 'border-r';
  }
  return '';
};
