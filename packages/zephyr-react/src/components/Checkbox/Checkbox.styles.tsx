import { Classed, classed } from 'utils/classed';

export type CheckboxElementVariants = Classed.VariantProps<typeof CheckboxElement>;

export type CheckboxElementProps = React.ComponentProps<typeof CheckboxElement>;

export const CheckboxElement = classed(
  'input',
  'border-gray-light',
  'dark:bg-surface-inverse-elevated dark:border-white-alpha-soft dark:checked:bg-neutral-light',
  'checked:bg-neutral',
  'form-checkbox cursor-pointer  accent-neutral checked:text-neutral peer rounded-sm ring-0',
  // 'focus:ring-offset-0 focus:ring-0 focus:ring-neutral-dark',
  {
    variants: {
      focusRing: {
        false: 'focus:ring-0',
        // true: 'focus:ring-2',
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
