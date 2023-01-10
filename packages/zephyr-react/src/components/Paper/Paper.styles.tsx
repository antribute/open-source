import { SizeProp } from 'types/styles';
import { Classed, classed } from 'utils/classed';

export type PaperElementVariantProps = Classed.VariantProps<typeof PaperElement>;

export type PaperElementProps = React.ComponentProps<typeof PaperElement>;

export const PaperElement = classed(
  'div',
  'p-80 inline-block rounded-md bg-white dark:bg-dark-gray-light',
  {
    variants: {
      border: {
        true: 'border border-solid border-light-gray-dark',
      },
      shadow: {
        true: 'shadow',
      },
      size: {
        xs: '',
        sm: '',
        md: 'p-24',
        lg: '',
      } satisfies Record<SizeProp, string>,
    },
    defaultVariants: {
      size: 'md',
    },
  }
);
