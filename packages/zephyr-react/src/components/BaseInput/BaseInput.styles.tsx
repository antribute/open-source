import clsx from 'clsx';
import { InputSizeVariant } from 'styles/input-component.variants';
import { Classed, classTheme, classed, classedCore, expandVariant } from 'utils/classed';

export type BaseInputElementVariantProps = Classed.VariantProps<typeof BaseInputElement>;

export type BaseInputElementProps = React.ComponentProps<typeof BaseInputElement>; //

export const placeholderClassName = classedCore({
  variants: {
    placeholderSelector: {
      true: clsx(
        expandVariant('placeholder:(font-body,text-content-subtle,focus:text-content-subtle)')
      ),
    },
    placeholderContainer: {
      true: clsx('font-body text-content-subtle focus:text-content-weak'),
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
  'peer',
  'bg-surface-soft',
  'hover:border-boundary-subtle',
  'font-medium rounded-md',
  'transition-all',
  'border-[1.5px] border-boundary-ghost',
  'select-none',
  'flex items-center gap-8',
  'shadow-surface-dark/20',
  'text-content-intense',
  // classTheme({
  //   class: [
  //     'font-medium',
  //     'rounded-md',
  //     'transition-all',
  //     'relative border-[1.5px] border-solid peer',
  //     'ring-0 outline-none focus-within:ring-1',
  //     'flex items-center gap-8 p-8 select-none focus:outline-none',
  //   ],

  //   light: [
  //     'bg-surface',
  //     'text-content-strong',
  //     'border-boundary-subtle focus-within:border-boundary-focus',
  //     'shadow-gray-light/20',
  //     'focus-within:ring-boundary-focus',
  //   ],
  //   dark: [
  //     'dark:bg-surface-inverse',
  //     'dark:text-content-inverse-moderate',
  //     'dark:border-boundary-inverse-subtle dark:focus-within:border-boundary-inverse-focus',
  //     'dark:shadow-surface-inverse/50',
  //     'dark:focus-within:ring-boundary-inverse-focus',
  //   ],
  // }),

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
              // 'dark:border-positive',
              'focus-within:dark:ring-positive/20',
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
              'focus-within:dark:ring-danger/20',
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
