import { classed } from '@tw-classed/react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { inputComponentVariants } from 'styles/input-component.variants';
import { Classed, classTheme, mergeVariants } from 'utils/classed';
import { ColorProp, FontWeightProp } from 'types/styles';
import { ElementPositonData } from './ToggleGroup.helpers';

export type ToggleGroupElementVariantProps = Classed.VariantProps<typeof ToggleGroupElement>;

export const ToggleGroupElement = classed(
  ToggleGroupPrimitive.ToggleGroup,
  'group inline-flex shadow-sm rounded-md ',
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
  'whitespace-nowrap flex-grow border-y relative',
  'first:rounded-l-md last:rounded-r-md',
  // '  focus:ring-2  focus:z-30 focus:group-hover:ring-0',
  'focus:ring-0 focus:z-10',
  'radix-state-off:focus-visible:bg-neutral-soft dark:radix-state-off:focus-visible:bg-neutral-900/80',
  'radix-state-on:text-white hover:text-neutral-100',
  'bg-surface dark:bg-surface-inverse-light',
  'border-boundary-subtle border-light-gray dark:border-white/5',
  'hover:radix-state-off:hover:text-neutral-100 radix-state-off:hover:text-content-ghost',
  'radix-state-off:text-content-subtle dark:radix-state-off:text-content-inverse-subtle',

  'ring-inset',
  'shrink flex-1',
  'select-none',

  {
    variants: {
      color: {
        neutral: classTheme({
          light: [
            'radix-state-on:bg-neutral-light',
            'radix-state-on:border-neutral radix-state-on:focus:border-neutral/90',
            'hover:border-neutral-dark hover:bg-neutral-600',
          ],
          dark: [
            'dark:radix-state-on:bg-neutral-dark dark:radix-state-on:border-neutral',
            'dark:hover:border-neutral-dark dark:hover:bg-neutral-dark',
          ],
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
      color: 'neutral',
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
