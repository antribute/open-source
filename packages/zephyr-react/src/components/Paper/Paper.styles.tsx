import clsx from 'clsx';
import { Classed, classTheme, classed } from 'utils/classed';

export type PaperElementBackgroundVariantProps = Classed.VariantProps<typeof PaperElement>;

export type PaperElementVariantProps = Classed.VariantProps<typeof PaperElement>;

export type PaperElementProps = React.ComponentProps<typeof PaperElement>;

export const PaperElementBackground = classed('div', {
  variants: {
    border: {
      true: 'border border-solid border-boundary-subtle dark:border-boundary-inverse-subtle',
    },
    hoverHighlight: {
      true: classTheme({
        light: 'hover:bg-surface-200',
        dark: 'dark:hover:bg-surface-inverse-soft ',
      }),
    },
    color: {
      surface: classTheme({
        light: 'bg-surface',
        dark: 'dark:bg-surface-inverse',
      }),
      'surface-soft': classTheme({
        light: 'bg-surface-100',
        dark: 'dark:bg-surface-inverse-soft text-neutral-dark',
      }),
      'surface-light': classTheme({
        light: 'bg-surface-light text-neutral-dark',
        dark: 'dark:bg-surface-inverse-light',
      }),
      'surface-dark': classTheme({
        light: 'bg-surface-800',
        dark: 'dark:bg-surface-inverse-600',
      }),
      neutral: clsx(
        'bg-neutral text-content-inverse-intense',
        'border-boundary-intense',
        'dark:border-boundary-inverse-intense'
      ),
      'neutral-light': clsx('bg-neutral-light text-content-inverse-intense'),
    },
  },
  compoundVariants: [
    {
      color: 'surface',
      hoverHighlight: true,
      class: 'hover:bg-surface-soft dark:hover:bg-surface-inverse-600',
    },
    {
      color: 'surface-soft',
      hoverHighlight: true,
      class: 'hover:bg-surface-200 dark:hover:bg-surface-inverse-soft',
    },
    {
      color: 'surface-light',
      hoverHighlight: true,
      class: 'hover:bg-surface-soft dark:hover:bg-surface-inverse-500',
    },
    {
      color: 'surface-dark',
      hoverHighlight: true,
      class: 'hover:bg-surface-light dark:hover:bg-surface-inverse-700',
    },
    {
      color: 'neutral',
      hoverHighlight: true,
      class: 'dark:hover:bg-neutral-dark',
    },
  ],
  defaultVariants: {
    color: 'surface',
  },
});

export const PaperElement = classed(
  'div',
  PaperElementBackground,
  classTheme({
    class: 'group bg-surface inline-block rounded-md text-left ',
    light: 'text-content-moderate',
    dark: 'dark:text-content-inverse-moderate',
  }),
  {
    variants: {
      padding: {
        false: '',
        none: 'p-0',
        xs: 'p-4',
        sm: 'p-8',
        md: 'p-18',
        lg: 'p-24',
      },

      overflow: {
        visible: 'overflow-visible',
        hidden: 'overflow-hidden',
      },

      loading: {
        true: classTheme({
          class: 'animate-pulse',
          light: 'text-content-weak',
          dark: 'dark:text-content-inverse-weak',
        }),
      },
    },

    defaultVariants: {
      padding: 'md',
      overflow: 'hidden',
    },
  }
);
