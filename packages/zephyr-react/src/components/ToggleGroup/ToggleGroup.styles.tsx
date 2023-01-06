import { ElementPositonData } from './ToggleGroup.helpers';

import { classed } from '@tw-classed/react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { inputComponentVariants } from 'styles/input-component.variants';
import { Classed, mergeVariants } from 'utils/classed';
import { ColorProp, FontWeightProp } from 'types/styles';

export type ToggleGroupItemElementVariantProps = Classed.VariantProps<
  typeof ToggleGroupItemElement
>;

export type ToggleGroupItemElementProps = Classed.VariantProps<typeof ToggleGroupItemElement>;

export const ToggleGroupItemElement = classed(
  ToggleGroupPrimitive.Item,
  'text-type-soft radix-state-on:text-white hover:text-white whitespace-nowrap first:rounded-l-md last:rounded-r-md border-y flex-grow bg-white border-light-gray',

  {
    variants: {
      color: {
        primary:
          'radix-state-on:bg-primary radix-state-on:border-primary hover:border-primary-dark hover:bg-primary-dark',
        secondary:
          'radix-state-on:bg-secondary radix-state-on:border-secondary hover:border-secondary-dark hover:bg-secondary-dark',
        caution:
          'radix-state-on:bg-caution radix-state-on:border-caution hover:border-caution-dark hover:bg-caution-dark',
        danger:
          'radix-state-on:bg-danger radix-state-on:border-danger hover:border-danger-dark hover:bg-danger-dark',
        positive:
          'radix-state-on:bg-positive radix-state-on:border-positive hover:border-positive-dark hover:bg-positive-dark',
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
  return;
};
