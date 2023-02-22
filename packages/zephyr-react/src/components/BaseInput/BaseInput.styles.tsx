import clsx from 'clsx';
import { InputSizeVariant } from 'styles/input-component.variants';
import { Classed, classTheme, classed, classedCore } from 'utils/classed';

export type ButtonVariant = 'contained' | 'soft' | 'text' | 'outlined' | 'outlined-filled';

export type BaseInputElementVariantProps = Classed.VariantProps<typeof BaseInputElement>;

export type BaseInputElementProps = React.ComponentProps<typeof BaseInputElement>; //

export const placeholderClassName = classedCore({
  variants: {
    placeholderSelector: {
      true: clsx(
        'placeholder:font-body',
        'placeholder:text-content-ghost focus:placeholder:text-content-subtle',
        'dark:placeholder:text-content-inverse-ghost dark:focus:placeholder:text-content-inverse-subtle'
      ),
    },
    placeholderContainer: {
      true: clsx(
        'font-body',
        'text-content-ghost focus:text-content-subtle',
        'dark:text-content-inverse-ghost dark:focus:text-content-inverse-subtle'
      ),
    },
  },
  defaultVariants: {
    placeholderSelector: true,
  },
});

export const PlaceholderElement = classed('span', placeholderClassName, {
  defaultVariants: {
    placeholderContainer: true,
  },
});

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
      'flex items-center gap-8 p-8 select-none focus:outline-none',
    ],

    light: [
      'bg-surface',
      'text-content-strong',
      'border-boundary-subtle focus-within:border-boundary-focus',
      'shadow-gray-light/20',
      'focus-within:ring-boundary-focus',
    ],
    dark: [
      'dark:bg-surface-inverse',
      'dark:text-content-inverse-moderate',
      'dark:border-boundary-inverse-subtle dark:focus-within:border-boundary-inverse-focus',
      'dark:shadow-surface-inverse/50',
      'dark:focus-within:ring-boundary-inverse-focus',
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
