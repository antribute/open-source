import { Classed, classTheme, classed } from 'utils/classed';

export type PaperElementVariantProps = Classed.VariantProps<typeof PaperElement>;

export type PaperElementProps = React.ComponentProps<typeof PaperElement>;

export const PaperElement = classed(
  'div',

  classTheme({
    class: 'bg-surface inline-block rounded-md hover:bg-surface-elevated text-left',
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
        default: classTheme({
          light: 'bg-surface border-black-alpha-200',
          dark: 'dark:bg-surface-inverse dark:border-white-alpha-soft',
        }),
        secondary: classTheme({
          light: 'bg-surface-700 border-black-alpha-50',
          dark: 'dark:bg-surface-inverse-light dark:border-white-alpha-soft',
        }),
        tertiary: classTheme({
          light: 'bg-surface-light border-black-alpha-soft',
          dark: 'dark:bg-surface-inverse-dark dark:border-white-alpha-soft',
        }),
      },
    },
    defaultVariants: {
      padding: 'md',
      color: 'default',
      border: true,
    },
  }
);
