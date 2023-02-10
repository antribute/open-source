import clsx from 'clsx';
import { colorVariants } from 'styles/colors.variants';
import { inputComponentVariants } from 'styles/input-component.variants';
import { textVariants } from 'styles/text.variants';
import { Classed, classTheme, classed, mergeVariants } from 'utils/classed';

export type ButtonVariant = 'contained' | 'soft' | 'text' | 'outlined' | 'outlined-filled';

export type ButtonElementVariants = Classed.VariantProps<typeof ButtonElement>;

export type ButtonElementProps = React.ComponentProps<typeof ButtonElement>;

export const ButtonElement = classed(
  'button',
  'cursor-pointer inline-flex items-center select-none align-middle',
  'disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-default disabled:border-gray-200 relative',
  {
    variants: {
      loading: {
        true: 'cursor-default',
      },
      size: mergeVariants(inputComponentVariants.size),
      fontWeight: textVariants.fontWeight,
      noWrap: {
        true: 'whitespace-nowrap',
      },
      fullWidth: {
        true: 'w-full',
      },
      variant: {
        contained: clsx('border border-solid border-transparent'),
        soft: clsx('border bg-transparent'),
        outlined: clsx('border bg-transparent'),
        'outlined-filled': clsx('border bg-transparent'),
        text: clsx('border border-transparent'),
      } satisfies Record<ButtonVariant, string>,
      rounded: {
        sm: clsx('rounded'),
        default: clsx('rounded-md'),
        full: clsx('rounded-full'),
      },
      color: {
        ...mergeVariants([
          colorVariants.bg,
          colorVariants.text,
          colorVariants.border,
          colorVariants.hoverDark,
        ]),
      },
    },

    defaultVariants: {
      size: 'md',
      rounded: 'default',
      noWrap: true,
      fontWeight: 'medium',
      color: 'primary',
      variant: 'contained',
    },

    compoundVariants: [
      { variant: 'contained', class: 'text-white' },
      // --- Colors ---
      {
        variant: 'contained',
        color: 'surface',
        class: classTheme({
          light: [
            'bg-surface',
            'hover:border-surface-moderate',
            'hover:bg-surface-light',
            'text-surface-inverse',
          ],
          dark: [
            'dark:bg-surface-inverse',
            'dark:hover:border-surface-inverse',
            'dark:hover:bg-inverse',
            'dark:text-surface',
          ],
        }),
      },
      {
        variant: 'contained',
        color: 'surface-soft',
        class: classTheme({
          light: [
            'bg-surface-600',
            'hover:border-surface-moderate',
            'hover:bg-surface-light',
            'text-surface-inverse-soft',
          ],
          dark: [
            'dark:bg-surface-inverse-soft',
            'dark:hover:border-surface-inverse-soft',
            'dark:hover:bg-inverse-soft',
            'dark:text-surface-soft',
          ],
        }),
      },
      {
        variant: 'contained',
        color: 'surface-light',
        class: classTheme({
          light: [
            'bg-gray-100',
            'hover:border-surface-moderate',
            'hover:bg-surface-light',
            'text-surface-inverse-light',
          ],
          dark: [
            'dark:bg-surface-inverse-light',
            'dark:hover:border-surface-inverse-light',
            'dark:hover:bg-inverse-light',
            'dark:text-surface-light',
          ],
        }),
      },
      {
        variant: 'contained',
        color: 'surface-dark',
        class: classTheme({
          light: [
            'bg-surface-dark',
            'hover:border-surface-moderate',
            'hover:bg-surface-dark',
            'text-surface-inverse-dark',
          ],
          dark: [
            'dark:bg-surface-inverse-dark',
            'dark:hover:bg-inverse-dark',
            'dark:text-surface-dark',
            'dark:border-surface-inverse-dark',
          ],
        }),
      },
      {
        variant: 'contained',
        color: 'inverse',
        class: classTheme({
          light: [
            'bg-content-strong',
            'hover:border-content-moderate',
            'hover:bg-content-moderate',
            'text-content-inverse-strong',
          ],
          dark: [
            'dark:bg-content-inverse-strong',
            'dark:hover:border-content-inverse-strong',
            'dark:hover:bg-gray-soft',
            'dark:text-content-strong',
          ],
        }),
      },
      {
        variant: 'contained',
        color: 'primary',
        class: clsx('bg-primary hover:border-primary-dark hover:bg-primary-dark'),
      },
      {
        variant: 'contained',
        color: 'secondary',
        class: clsx('bg-secondary hover:border-secondary-dark hover:bg-secondary-dark'),
      },
      {
        variant: 'contained',
        color: 'positive',
        class: clsx('bg-positive hover:border-positive-dark hover:bg-positive-dark '),
      },
      {
        variant: 'contained',
        color: 'danger',
        class: clsx('bg-danger hover:border-danger-dark hover:bg-danger-dark'),
      },
      {
        variant: 'contained',
        color: 'caution',
        class: clsx('bg-caution hover:border-caution-dark hover:bg-caution-dark'),
      },

      // Text Variant
      {
        variant: 'text',
        class: clsx('border-transparent bg-transparent'),
      },
      // --- Colors ---
      {
        variant: 'text',
        color: 'primary',
        class: clsx('hover:bg-current/10  text-primary'),
      },
      {
        variant: 'text',
        color: 'secondary',
        class: clsx('hover:bg-current/10  text-primary'),
      },
      {
        variant: 'text',
        color: 'positive',
        class: clsx('hover:bg-current/10  text-positive'),
      },
      {
        variant: 'text',
        color: 'danger',
        class: clsx('hover:bg-current/10  text-danger'),
      },
      {
        variant: 'text',
        color: 'caution',
        class: clsx('hover:bg-current/10  text-caution'),
      },

      // Outlined Variant
      {
        variant: 'outlined',
        class: clsx('border'),
      },
      // --- Colors ---
      {
        variant: 'outlined',
        class: 'bg-transparent',
      },
      {
        variant: 'outlined',
        color: 'primary',
        class: clsx('hover:bg-current/10 text-primary'),
      },
      {
        variant: 'outlined',
        color: 'secondary',
        class: clsx('hover:bg-current/10 text-primary'),
      },
      {
        variant: 'outlined',
        color: 'positive',
        class: clsx('hover:bg-current/10 text-positive'),
      },
      {
        variant: 'outlined',
        color: 'danger',
        class: clsx('hover:bg-current/10 text-danger'),
      },
      {
        variant: 'outlined',
        color: 'caution',
        class: clsx('hover:bg-current/10 text-caution'),
      },

      // Outlined-Filled Variant
      {
        variant: 'outlined-filled',
        class: clsx('border text-white'),
      },
      // --- Colors ---
      {
        variant: 'outlined-filled',
        color: 'primary',
        class: clsx('bg-current/10 hover:bg-current/10  text-primary'),
      },
      {
        variant: 'outlined-filled',
        color: 'secondary',
        class: clsx('bg-current/10 hover:bg-current/10  text-primary'),
      },
      {
        variant: 'outlined-filled',
        color: 'positive',
        class: clsx('bg-current/10 hover:bg-current/10  text-positive'),
      },
      {
        variant: 'outlined-filled',
        color: 'danger',
        class: clsx('bg-current/10 hover:bg-current/10  text-danger'),
      },
      {
        variant: 'outlined-filled',
        color: 'caution',
        class: clsx('bg-current/10 hover:bg-current/10  text-caution'),
      },
      // soft Variant
      {
        variant: 'soft',
        class: clsx('border-transparent'),
      },
      // --- Colors ---
      {
        variant: 'soft',
        color: 'primary',
        class: clsx('bg-current/10 hover:bg-current/10  text-primary'),
      },
      {
        variant: 'soft',
        color: 'secondary',
        class: clsx('bg-current/10 hover:bg-current/10  text-primary'),
      },
      {
        variant: 'soft',
        color: 'positive',
        class: clsx('bg-current/10 hover:bg-current/10  text-positive'),
      },
      {
        variant: 'soft',
        color: 'danger',
        class: clsx('bg-current/10 hover:bg-current/10  text-danger'),
      },
      {
        variant: 'soft',
        color: 'caution',
        class: clsx('bg-current/10 hover:bg-current/10  text-caution'),
      },
    ],
  }
);
