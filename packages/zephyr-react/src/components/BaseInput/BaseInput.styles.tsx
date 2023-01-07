import clsx from 'clsx';
import { InputSizeVariant, inputComponentVariants } from 'styles/input-component.variants';
import { Classed, classed, mergeVariants } from 'utils/classed';

export type ButtonVariant = 'contained' | 'soft' | 'text' | 'outlined' | 'outlined-filled';

export type BaseInputElementVariantProps = Classed.VariantProps<typeof BaseInputElement>;

export type BaseInputElementProps = React.ComponentProps<typeof BaseInputElement>; //

export const BaseInputElement = classed(
  'input',
  'relative bg-white border border-solid peer border-light-gray-dark',
  'placeholder:select-none placeholder:font-body',
  'text-gray-900 placeholder-type-soft',
  'focus:ring-primary focus:border-primary focus:ring-1 outline-none',
  'rounded-md',
  InputSizeVariant,
  {
    variants: {
      inputState: {
        success: clsx(
          'focus:ring-positive focus:border-positive focus:ring-1 outline-none',
          'border-positive',
          'placeholder-positive-soft'
          // 'text-positive-dark',
          // 'bg-positive-soft'
        ),
        error: clsx(
          'focus:ring-danger focus:border-danger focus:ring-1 outline-none',
          'border-danger',
          'placeholder-danger-soft'
          // 'text-danger-dark',
          // 'bg-danger-soft'
        ),
      },
    },
  }
);