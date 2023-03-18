import { classed } from '@tw-classed/react';
import { BaseInputElement } from 'components/BaseInput/BaseInput.styles';
import {
  InputComponentWidthVariant,
  inputComponentVariants,
} from 'styles/input-component.variants';
import { Classed } from 'utils/classed';

export type BaseInputContainerElementVariantProps = Classed.VariantProps<
  typeof BaseInputContainerElement
>;

export const BaseInputContainerElement = classed(
  'div',
  'flex items-center relative overflow-hidden group',
  // Tailwind Arbitrary Group (https://tailwindcss.com/docs/hover-focus-and-other-states#arbitrary-groups)
  // eslint-disable-next-line tailwindcss/no-custom-classname
  // clsx('group-[.is-contained]/input:w-full', 'group/base-input is-contained'),
  InputComponentWidthVariant,
  BaseInputElement,
  {
    defaultVariants: {
      width: 'auto',
    },
  }
);

export type BaseInputIconSlotElementVariantProps = Classed.VariantProps<
  typeof BaseInputIconSlotElement
>;

export const BaseInputIconSlotElement = classed(
  'div',
  'inline-flex items-center jusitfy-center flex-nowrap gap-8  select-none peer-placeholder-shown:text-gray-400',
  'peer-placeholder-shown:text-light-gray-dark text-type-soft',
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
