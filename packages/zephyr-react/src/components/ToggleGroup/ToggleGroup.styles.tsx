import { classed } from '@tw-classed/react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { inputComponentVariants } from 'styles/input-component.variants';
import { Classed, classTheme, expandVariant, mergeVariants } from 'utils/classed';
import { ColorProp, FontWeightProp } from 'types/styles';
import { ElementPositonData } from './ToggleGroup.helpers';

export type ToggleGroupElementVariantProps = Classed.VariantProps<typeof ToggleGroupElement>;

export const ToggleGroupElement = classed(
  ToggleGroupPrimitive.ToggleGroup,
  'group inline-flex shadow-sm rounded-md bg-surface',
  {
    variants: {
      fullWidth: {
        true: 'flex w-full',
      },
    },
    defaultVariants: {
      fullWidth: false,
    },
  }
);

export type ToggleGroupItemElementVariantProps = Classed.VariantProps<
  typeof ToggleGroupItemElement
>;

export type ToggleGroupItemElementProps = Classed.VariantProps<typeof ToggleGroupItemElement>;

export const ToggleGroupItemElement = classed(
  ToggleGroupPrimitive.Item,
  'relative',
  'border-y',
  'whitespace-nowrap',
  'ring-offset-0',
  'flex-grow shrink-0',
  'first:rounded-l-md last:rounded-r-md',
  'select-none',
  expandVariant(
    `radix-state-on:(text-primary-content,bg-primary-dark,border-boundary-subtle)
    radix-state-off:(text-content-subtle,border-boundary-subtle)
    radix-state-off:hover:(text-content-weak,bg-highlight-subtle)
    focus-visible:(outline-none,outline-offset-0,outline-content,rounded-sm)
    `
  ),

  {
    variants: {
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
