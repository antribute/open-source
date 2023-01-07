import { classed } from '@tw-classed/react';
import { InputSizeVariant, inputComponentVariants } from 'styles/input-component.variants';
import { Classed } from 'utils/classed';

export type BaseInputContainerElementVariantProps = Classed.VariantProps<
  typeof BaseInputContainerElement
>;

export const BaseInputContainerElement = classed(
  'div',
  'relative inline-flex items-center',
  InputSizeVariant
);

export type BaseInputIconSlotElementVariantProps = Classed.VariantProps<
  typeof BaseInputIconSlotElement
>;

export const BaseInputIconSlotElement = classed(
  'div',
  'absolute inset-y-0 inline-flex items-center jusitfy-center flex-nowrap gap-8  select-none peer-placeholder-shown:text-gray-400',
  {
    variants: {
      size: inputComponentVariants.size.textSize,
      pointerEvents: {
        true: 'pointer-events-auto',
        false: 'pointer-events-none',
      },
    },
    defaultVariants: {
      pointerEvents: false,
      size: 'md',
    },
  }
);
