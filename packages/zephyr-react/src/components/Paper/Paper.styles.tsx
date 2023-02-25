/* eslint-disable tailwindcss/no-custom-classname */
import clsx from 'clsx';
import { Classed, classTheme, classed } from 'utils/classed';

export type PaperElementBackgroundVariantProps = Classed.VariantProps<typeof PaperElement>;

export type PaperElementVariantProps = Classed.VariantProps<typeof PaperElement>;

export type PaperElementProps = React.ComponentProps<typeof PaperElement>;

export const PaperElementBackground = classed('div', {
  variants: {
    border: {
      // true: 'border border-solid border-boundary-subtle dark:border-boundary-inverse-subtle',
      true: 'border-2 border-boundary-inverse-tint dark:border-boundary-tint',
    },
    hoverHighlight: {
      true: classTheme({
        light: 'hover:bg-surface-200',
        dark: 'dark:hover:bg-surface-inverse-soft ',
      }),
    },
    color: {
      surface: classTheme({
        // Tailwind Arbitrary Group
        class: clsx('is-surface group'),
        light: 'bg-surface',
        dark: 'dark:bg-surface-inverse',
      }),
      'surface-soft': classTheme({
        // Tailwind Arbitrary Group
        class: clsx('is-surface-soft group'),
        light: 'bg-surface-100',
        dark: 'dark:bg-surface-inverse-soft text-neutral-dark',
      }),
      'surface-light': classTheme({
        // Tailwind Arbitrary Group
        class: clsx('is-surface-light group'),
        light: 'bg-surface-200',
        dark: 'dark:bg-surface-inverse-light',
      }),
      'surface-dark': classTheme({
        // Tailwind Arbitrary Group
        class: clsx('is-surface-dark group'),
        light: 'bg-surface-400',
        dark: 'dark:bg-surface-inverse-600',
      }),
      neutral: clsx(
        // Tailwind Arbitrary Group
        'is-surface-neutral group',
        'bg-neutral text-content-inverse-intense'
      ),
      'neutral-light': clsx(
        // Tailwind Arbitrary Group
        'is-surface-neutral-light group',
        'text-content-inverse-intense',
        'bg-neutral-light'
      ),
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
      class: 'hover:bg-surface-200 dark:hover:bg-surface-inverse-dark',
    },
    {
      color: 'surface-light',
      hoverHighlight: true,
      class: 'hover:bg-surface-300 dark:hover:bg-surface-inverse-500',
    },
    {
      color: 'surface-dark',
      hoverHighlight: true,
      class: 'hover:bg-surface-dark dark:hover:bg-surface-inverse-700',
    },
    {
      color: 'neutral',
      hoverHighlight: true,
      class: 'hover:!bg-neutral-900',
    },
    {
      color: 'neutral-light',
      hoverHighlight: true,
      class: 'hover:!bg-neutral-700',
    },
    {
      color: 'neutral',
      border: true,
      class: 'border-boundary',
    },
    {
      color: 'neutral-light',
      border: true,
      class: 'border-boundary',
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
        true: clsx('animate animate-pulse'),
      },
    },

    defaultVariants: {
      padding: 'md',
      overflow: 'hidden',
    },
  }
);
