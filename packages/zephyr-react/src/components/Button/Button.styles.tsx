import clsx from 'clsx';
import { colorVariants } from 'styles/colors.variants';
import { inputComponentVariants } from 'styles/input-component.variants';
import { textVariants } from 'styles/text.variants';
import { Classed, classTheme, classed, mergeVariants } from 'utils/classed';

export type ButtonVariant = 'contained' | 'soft' | 'text' | 'outlined';

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
        outlined: clsx(
          'border bg-opacity-5 ring-1 ring-inset ring-current backdrop-contrast-[1.05] hover:bg-opacity-10 hover:backdrop-contrast-[0.95] focus:!ring-1 focus:ring-inset focus:!ring-current'
        ),
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        text: clsx(
          'inline py-0 px-2 underline-offset-4  ring-inset focus:ring-2',
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
            'bg-surface-inverse-dark',
            'text-neutral-50/95 ',
            'border-highlight',
            'hover:bg-surface-inverse-light',
          ],
          dark: [
            'dark:bg-neutral-50',
            'dark:hover:bg-surface-light',
            'dark:text-content-intense/75',
            'dark:border-boundary-weak',
          ],
        }),
      },
      {
        variant: 'contained',
        color: 'surface',
        class: classTheme({
          class: 'ring-inset !ring-1 focus:ring-inset focus:!ring-1',
          light: [
            'bg-surface hover:bg-surface-100 border',
            'text-neutral-500/70',
            'border-boundary-weak ',
            'ring-boundary-weak',
          ],
          dark: [
            'dark:bg-surface-inverse dark:hover:bg-surface-inverse-light',
            'dark:text-content-inverse',
            'dark:ring-boundary-subtle',
          ],
        }),
      },
      {
        variant: 'contained',
        color: 'neutral',
        class: clsx('bg-neutral text-neutral-50 hover:border-neutral-dark hover:bg-neutral-dark'),
      },

      {
        variant: 'contained',
        color: 'primary',
        class: clsx('bg-primary text-primary-50 hover:border-primary-dark hover:bg-primary-dark'),
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
          'bg-caution text-caution-50 hover:border-caution-dark hover:bg-caution-dark focus:ring-caution-light'
        ),
      },

      // Outlined Variant
      {
        variant: 'outlined',
        color: 'neutral',
        class: clsx('border-neutral-400 text-neutral-500 ring-neutral-400 focus:ring-neutral-400'),
      },
      {
        variant: 'outlined',
        color: 'surface',
        class: clsx(
          'bg-surface-inverse',
          'text-content-neutral boder-boundary-intense text-content-weak ring-neutral-300 focus:!ring-boundary-intense',
          'dark:text-neutral-200',
          ' dark:border-surface-inverse-50 ',
          'dark:ring-surface-inverse-50 dark:focus:!ring-surface-inverse-50'
        ),
      },
      {
        variant: 'outlined',
        color: 'inverse',
        class: clsx(
          'border-black dark:bg-surface/10',
          'dark:border-boundary-weak',
          'dark:!ring-boundary-weak'
        ),
      },
      // Soft Variant
      {
        variant: 'soft',
        color: 'surface',
        class: clsx('dark:bg-neutral/30'),
      },
      {
        variant: 'soft',
        color: 'neutral',
        class: clsx(
          'bg-neutral-300/40 text-neutral-500 hover:bg-neutral-300/40 hover:backdrop-contrast-[0.9]'
        ),
      },
      {
        variant: 'soft',
        color: 'surface',
        class: clsx(
          'bg-surface-dark backdrop-contrast-[0.95] hover:backdrop-contrast-[0.82] dark:backdrop-contrast-[.95]'
        ),
      },
      {
        variant: 'soft',
        color: 'inverse',
        class: clsx('hover:backdrop-contrast-[2]'),
      },
      {
        variant: 'soft',
        color: 'primary',
        // class: clsx(' backdrop-contrast-[0.97]'),
      },
    ],
  }
);
