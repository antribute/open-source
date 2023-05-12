import { classed } from '@tw-classed/react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { inputComponentVariants } from 'styles/input-component.variants';
import { Classed, expandVariant, mergeVariants } from 'utils/classed';
import { FontWeightProp } from 'types/styles';
import { ElementPositonData } from './ToggleGroup.helpers';

export type ToggleGroupContainerElementVariantProps = Classed.VariantProps<
  typeof ToggleGroupContainerElement
>;

export const ToggleGroupContainerElement = classed(
  ToggleGroupPrimitive.ToggleGroup,
  'group inline-flex  bg-surface-soft',
  {
    variants: {
      variant: {
        ghost: 'gap-4 bg-transparent shadow-none',
        outlined: 'rounded-md shadow-sm',
      },
      fullWidth: {
        true: 'flex w-full',
      },
      border: {
        true: 'shadow-sm  rounded-md',
        false: '',
      },
    },
    defaultVariants: {
      fullWidth: false,
      variant: 'outlined',
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
  'group/tgi',
  'whitespace-nowrap',
  'flex items-center justify-center',
  'ring-offset-0',
  'flex-grow shrink-0',
  'select-none',
  'before-absolute-content',
  expandVariant(
    `radix-state-on:(text-primary-content,bg-primary,border-highlight-strong)
    radix-state-off:(text-content-subtle,border-boundary-ghost,focus-visible:text-content-weak)
    radix-state-off:hover:(text-content-weak,bg-highlight-subtle)
    focus-visible:(outline-none,-outline-offset-2,ring-2)
    radix-state-off:focus-visible:(outline-primary-content/70,ring-highlight-intense,text-content-high)
    radix-state-on:focus-visible:(outline-primary,outline-offset-0,ring-inset,ring-[1.5px],ring-primary-content/90)
    `
  ),

  {
    variants: {
      size: mergeVariants([
        inputComponentVariants.size.textSize,
        inputComponentVariants.size.paddingY,
        inputComponentVariants.size.paddingX,
      ]),

      border: {
        true: 'first:rounded-l-md last:rounded-r-md outline-offset',
        false: 'rounded-md border-none radix-state-on:bg-secondary/20 radix-state-on:text-content',
      },

      fontWeight: {
        medium: 'font-medium',
        semibold: 'font-semibold',
      } satisfies Partial<Record<FontWeightProp, string>>,
    },

    defaultVariants: {
      fontWeight: 'medium',
      border: true,
    },
  }
);

export const ToggleGroupItemOutline = classed(
  'div',
  'absolute inset-0',
  expandVariant(
    `
    group-radix-state-on:(-left-px,-right-px)
    group-radix-state-on:(first:border-r-2,middle:border-l-2,right:border-l-2)
    `
  )
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
    return 'border-r border-l-0 border-l-0';
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
