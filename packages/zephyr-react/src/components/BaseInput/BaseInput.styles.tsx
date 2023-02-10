import clsx from 'clsx';
import { InputSizeVariant } from 'styles/input-component.variants';
import { Classed, classTheme, classed } from 'utils/classed';

export type ButtonVariant = 'contained' | 'soft' | 'text' | 'outlined' | 'outlined-filled';

export type BaseInputElementVariantProps = Classed.VariantProps<typeof BaseInputElement>;

export type BaseInputElementProps = React.ComponentProps<typeof BaseInputElement>; //

export const BaseInputElement = classed(
  'input',
  'relative border-[1.5px] border-solid peer',
  'font-medium  placeholder:select-none placeholder:font-body',
  'ring-0 outline-none focus:ring-1 focus:border-content-strong',
  'rounded-md',
  'transition-all',

  classTheme({
    light: [
      'bg-white',
      'text-content-moderate',
      'border-slate/20',
      'placeholder-content-moderate/30 focus:placeholder-content-moderate/40',
      'shadow-gray-light/20',
      'focus:border-content-strong focus:ring-content-strong',
    ],
    dark: [
      'dark:bg-surface-inverse',
      'dark:text-content-inverse-moderate',
      'dark:border-slate/10',
      'dark:placeholder-content-inverse-weak',
      'dark:shadow-surface-inverse/50',
      'dark:ring-surface-inverse',
      'dark:focus:ring-surface-inverse',
      'dark:focus:ring-opacity-20',
      'dark:focus:border-content-inverse-weak dark:focus:ring-content-inverse-weak',
    ],
  }),

  InputSizeVariant,
  {
    variants: {
      shadow: {
        true: 'shadow-md',
        false: 'shadow-none',
      },
      inputState: {
        success: clsx(
          classTheme({
            class: 'focus:ring-[3px] focus:ring-opacity-20',
            light: ['border-positive', 'focus:ring-positive', 'focus:border-positive'],
            dark: [
              'dark:border-positive',
              'focus:dark:ring-positive',
              'focus:dark:border-positive',
            ],
          })
        ),
        error: clsx(
          classTheme({
            class: 'focus:ring-[3px] focus:ring-opacity-20',
            light: ['border-danger', 'focus:ring-danger', 'focus:border-danger'],
            dark: ['dark:border-danger', 'focus:dark:ring-danger', 'focus:dark:border-danger'],
          })
        ),
      },
    },
    defaultVariants: {
      shadow: true,
    },
  }
);
