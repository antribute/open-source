import clsx from 'clsx';
import { InputSizeVariant } from 'styles/input-component.variants';
import { Classed, classTheme, classed } from 'utils/classed';

export type ButtonVariant = 'contained' | 'soft' | 'text' | 'outlined' | 'outlined-filled';

export type BaseInputElementVariantProps = Classed.VariantProps<typeof BaseInputElement>;

export type BaseInputElementProps = React.ComponentProps<typeof BaseInputElement>; //

export const placeholderClassName = clsx(
  'placeholder:select-none  placeholder:font-body',
  'focus:placeholder:text-content-moderate/40',
  'font-medium text-content-moderate placeholder:text-content-moderate/30 dark:text-content-inverse-moderate dark:placeholder:text-content-inverse-weak/40 dark:focus:placeholder:text-content-inverse-weak/50'
);

export const PlaceholderElement = classed(
  'span',
  'select-none font-body focus-within:text-content-moderate/40 text-content-moderate/30 dark:text-content-inverse-weak'
);

export const BaseInputElement = classed(
  'input',
  InputSizeVariant,

  placeholderClassName,

  classTheme({
    class: [
      'font-medium',
      'rounded-md',
      'transition-all',
      'relative border-[1.5px] border-solid peer',
      'ring-0 outline-none focus-within:ring-1',
      'flex items-center gap-8 p-8 select-none',
    ],

    light: [
      'bg-white',
      'text-content-moderate',
      'border-slate/20',
      '',
      'shadow-gray-light/20',
      'focus-within:border-content-strong focus-within:ring-content-strong',
    ],
    dark: [
      'dark:bg-surface-inverse',
      'dark:text-content-inverse-moderate',
      'dark:border-boundary-inverse-subtle',
      'dark:shadow-surface-inverse/50',
      'dark:ring-surface-inverse',
      'dark:focus-within:ring-surface-inverse',
      'dark:focus-within:ring-opacity-20',
      'dark:focus-within:border-content-inverse-weak dark:focus-within:ring-content-inverse-weak',
    ],
  }),

  {
    variants: {
      shadow: {
        true: 'shadow-md',
        false: 'shadow-none',
      },

      inputState: {
        success: clsx(
          classTheme({
            class: 'focus-within:ring-[3px] focus-within:ring-opacity-20',
            light: [
              'border-positive',
              'focus-within:ring-positive',
              'focus-within:border-positive',
            ],
            dark: [
              'dark:border-positive',
              'focus-within:dark:ring-positive',
              'focus-within:dark:border-positive',
            ],
          })
        ),
        error: clsx(
          classTheme({
            class: 'focus-within:ring-[3px] focus-within:ring-opacity-20 !border-danger',
            light: ['border-danger', 'focus-within:ring-danger', 'focus-within:border-danger'],
            dark: [
              'dark:border-danger',
              'focus-within:dark:ring-danger',
              'focus-within:dark:border-danger',
            ],
          })
        ),
      },
    },
    defaultVariants: {
      shadow: true,
    },
  }
);
