import { Classed, classed } from 'utils/classed';
export type CheckboxElementVariants = Classed.VariantProps<typeof CheckboxElement>;

export type CheckboxElementProps = React.ComponentProps<typeof CheckboxElement>;

export const CheckboxElement = classed(
  'input',
  'form-checkbox cursor-pointer border-light-gray-dark accent-primary checked:text-primary peer rounded-sm',
  'focus:ring-offset-0 focus:ring-2 focus:ring-primary-dark',
  {
    variants: {
      focusRing: {
        false: 'focus:ring-0',
        true: 'focus:ring-2 focus:ring-primary-soft',
      },
      size: {
        xs: 'h-16 w-16',
        sm: 'h-20 w-20',
        md: 'h-24 w-24',
        lg: 'h-28 w-28',
      },
    },
    defaultVariants: {
      size: 'md',
      focusRing: true,
    },
  }
);
