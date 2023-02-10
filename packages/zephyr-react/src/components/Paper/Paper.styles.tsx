import { Classed, classTheme, classed } from 'utils/classed';

export type PaperElementVariantProps = Classed.VariantProps<typeof PaperElement>;

export type PaperElementProps = React.ComponentProps<typeof PaperElement>;

export const PaperElement = classed(
  'div',

  classTheme({
    class: 'group bg-surface inline-block rounded-md hover:bg-surface-elevated text-left ',
    light: 'text-content-moderate',
    dark: 'dark:text-content-inverse-moderate',
  }),
  {
    variants: {
      border: {
        true: 'border border-solid',
      },
      padding: {
        none: 'p-0',
        xs: 'p-4',
        sm: 'p-8',
        md: 'p-18',
        lg: 'p-24',
      },

      hoverHighlight: {
        true: classTheme({
          light: 'hover:bg-surface-200',
          dark: 'dark:hover:bg-surface-inverse-soft ',
        }),
      },
      loading: {
        true: classTheme({
          class: 'animate-pulse',
          light: 'text-content-weak',
          dark: 'dark:text-content-inverse-weak',
        }),
      },
      color: {
        surface: classTheme({
          light: 'bg-surface border-black/25 hover:bg-surface-soft',
          dark: 'dark:bg-surface-inverse dark:border-white/5',
        }),
        'surface-light': classTheme({
          light: 'bg-surface-700 border-black/25 hover:bg-surface-soft',
          dark: 'dark:bg-surface-inverse-light dark:border-white/5',
        }),
        'surface-dark': classTheme({
          light: 'bg-surface-light border-black/25',
          dark: 'dark:bg-surface-inverse-dark dark:border-white/5',
        }),
      },
    },
    defaultVariants: {
      padding: 'md',
      color: 'surface',
      border: false,
    },

    compoundVariants: [
      {
        color: 'surface',
        hoverHighlight: true,
        class: 'hover:bg-surface-soft dark:hover:bg-surface-inverse-600',
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
    ],
  }
);
