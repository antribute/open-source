import clsx from 'clsx';
import { inputComponentVariants } from 'styles/input-component.variants';
import { fontWeightMap } from 'styles/tailwind-token-maps';
import { ColorProp } from 'types/styles';
import { Classed, classed, mergeVariants } from 'utils/classed';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
export type CheckboxElementVariants = Classed.VariantProps<typeof CheckboxElement>;

export type CheckboxElementProps = React.ComponentProps<typeof CheckboxElement>;

export const CheckboxElement = classed(
  'input',
  'flex items-center justify-center rounded cursor-pointer ',
  ' border-light-gray-dark bg-light-gray-light  h-full border flex-grow  accent-primary peer ',
  'focus:ring-0 ring-0 checked:focus:ring-0 checked:focus:outline-none',

  {
    variants: {
      size: {
        xs: 'p-sm',
        sm: 'p-md',
        md: 'p-lg',
        lg: 'p-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);
