import clsx from 'clsx';
import { colorVariants } from 'styles/colors.variants';
import { inputComponentVariants } from 'styles/input-component.variants';
import { textVariants } from 'styles/text.variants';
import { Classed, classTheme, classed, mergeVariants } from 'utils/classed';

export type ButtonVariant = 'contained' | 'soft' | 'text' | 'outlined' | 'outlined-filled';

export type ButtonElementVariantProps = Classed.VariantProps<typeof ButtonElement>;

export type ButtonElementProps = React.ComponentProps<typeof ButtonElement>;

export const ButtonElement = classed.button(
  'cursor-pointer inline-flex items-center justify-center select-none align-middle',
  'disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-default disabled:border-gray-200 relative',
  {
    variants: {
      loading: {
        true: 'cursor-default',
      },
      size: mergeVariants([
        inputComponentVariants.size.lineHeight,
        inputComponentVariants.size.paddingX,
        inputComponentVariants.size.paddingY,
        inputComponentVariants.size.textSize,
      ]),
      fontWeight: textVariants.fontWeight,
      noWrap: {
        true: 'whitespace-nowrap',
      },
      justify: {
        center: 'justify-center',
        start: 'justify-start',
        end: 'justify-end',
      },
      fullWidth: {
        true: 'w-full',
      },
      variant: {
        contained: clsx('border border-solid border-transparent'),
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        soft: clsx('border !border-transparent !bg-opacity-10 hover:!bg-opacity-20'),
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        outlined: clsx('border !bg-transparent hover:bg-opacity-10 focus:ring-opacity-50'),
        'outlined-filled': clsx('border bg-transparent'),
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        text: clsx(
          'inline py-0 px-2 underline-offset-4  ring-inset focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20',
          'border !border-transparent hover:bg-opacity-30',
          '!bg-transparent '
        ),
      } satisfies Record<ButtonVariant, string>,
      rounded: {
        sm: clsx('rounded'),
        default: clsx('rounded-md'),
        full: clsx('rounded-full'),
      },
      color: {
        ...mergeVariants(
          [
            colorVariants.bg,
            colorVariants.text,
            colorVariants.border,
            colorVariants.hoverDark,
            colorVariants.focusRing,
          ],
          {
            pick: [
              'neutral',
              'surface',
              'inverse',
              'primary',
              'info',
              'positive',
              'danger',
              'caution',
            ],
          }
        ),
      },
    },

    defaultVariants: {
      size: 'md',
      rounded: 'default',
      noWrap: true,
      fontWeight: 'medium',
      color: 'neutral',
      justify: 'center',
      variant: 'contained',
    },

    compoundVariants: [
      // Contained
      { variant: 'contained', class: 'text-white' },
      // {
      //   variant: 'contained',
      //   color: 'neutral',
      //   class: clsx(
      //     '!bg-neutral',
      //     'hover:border-neutral',
      //     'hover:bg-neutral-dark',
      //     'dark:text-content-inverse-intense/80',
      //     'focus:ring-black/30 dark:focus:ring-white/30'
      //   ),
      // },

      {
        variant: 'contained',
        color: 'inverse',
        class: classTheme({
          light: [
            'bg-content-intense',
            'text-content-inverse-intense',
            'hover:border-content-moderate',
            'hover:bg-content-moderate',
            'focus:ring-black/30',
          ],
          dark: [
            'dark:bg-content-inverse-intense',
            'dark:text-content-high',
            'dark:hover:border-content-inverse-intense',
            'dark:hover:bg-gray-soft',
            'dark:focus:ring-white/50',
          ],
        }),
      },
      {
        variant: 'contained',
        color: 'surface',
        class: classTheme({
          light: [
            'bg-surface hover:bg-surface-100 border',
            'text-content-moderate',
            'border-black/10 hover:border-black/10',
            'focus:ring-content-intense',
          ],
          dark: [
            'dark:bg-surface-inverse dark:hover:bg-surface-inverse-light',
            'dark:text-content-inverse',
            'dark:border-white/5',
            'dark:focus:ring-content-inverse-weak',
          ],
        }),
      },
      {
        variant: 'contained',
        color: 'neutral',
        class: clsx(
          'bg-neutral text-neutral-50 hover:border-neutral-dark hover:bg-neutral-dark focus:ring-neutral-light'
        ),
      },
      {
        variant: 'contained',
        color: 'primary',
        class: clsx(
          'bg-neutral text-neutral-50 hover:border-neutral-dark hover:bg-neutral-dark focus:ring-neutral-light'
        ),
      },
      {
        variant: 'contained',
        color: 'info',
        class: clsx(
          'bg-info text-info-50 hover:border-info-dark hover:bg-info-dark focus:ring-info-light'
        ),
      },
      {
        variant: 'contained',
        color: 'positive',
        class: clsx(
          'bg-positive text-positive-50 hover:border-positive-dark hover:bg-positive-dark focus:ring-positive-light'
        ),
      },
      {
        variant: 'contained',
        color: 'danger',
        class: clsx(
          'bg-danger text-danger-50 hover:border-danger-dark hover:bg-danger-dark focus:ring-danger-light'
        ),
      },
      {
        variant: 'contained',
        color: 'caution',
        class: clsx(
          'bg-caution text-caution-50 hover:border-caution-dark hover:bg-caution-dark focus:ring-caution-400'
        ),
      },

      // Outlined Variant

      {
        variant: 'soft',
        color: 'surface',
        class: clsx('dark:bg-neutral/30'),
      },

      // Outlined-Filled Variant
      {
        variant: 'outlined-filled',
        class: clsx('border text-white'),
      },

      // Soft Variant
      {
        variant: 'soft',
        color: 'neutral',
        class: clsx('bg-neutral/20 hover:bg-neutral/40'),
      },
      {
        variant: 'soft',
        color: 'surface',
        class: clsx('!bg-surface-dark/5 hover:!bg-surface-dark/10'),
      },
      {
        variant: 'soft',
        color: 'inverse',
        class: clsx('hover:bg-white'),
      },
    ],
  }
);
