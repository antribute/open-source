import clsx from 'clsx';
import { InputSizeVariant } from 'styles/input-component.variants';
import { Classed, classTheme, classed } from 'utils/classed';

export type ButtonVariant = 'contained' | 'soft' | 'text' | 'outlined' | 'outlined-filled';

export type BaseInputElementVariantProps = Classed.VariantProps<typeof BaseInputElement>;

export type BaseInputElementProps = React.ComponentProps<typeof BaseInputElement>; //

export const BaseInputElement = classed(
  'input',
  'relative border border-solid peer',
  'placeholder:select-none placeholder:font-body',
  'focus:ring-primary focus:border-primary focus:ring-1 outline-none',
  'rounded-md',
  classTheme({
    light: [
      'bg-white',
      'text-content-moderate',
      'border-gray-light',
      'text-content-moderate',
      'placeholder-black-alpha-400',
    ],
    dark: [
      'dark:bg-surface-inverse',
      'dark:text-content-inverse-moderate',
      'dark:hover:bg-surface-inverse-raised',
      'dark:border-white-alpha-300',
      'dark:placeholder-content-inverse-weak',
    ],
  }),

  InputSizeVariant,
  {
    variants: {
      inputState: {
        success: clsx(
          classTheme({
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
            light: ['border-danger', 'focus:ring-danger', 'focus:border-danger'],
            dark: ['dark:border-danger', 'focus:dark:ring-danger', 'focus:dark:border-danger'],
          })
        ),
      },
    },
  }
);
