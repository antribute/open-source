import clsx from 'clsx';
import type { Classed } from 'utils/classed';
import { classed } from 'utils/classed';

export type PaperElementBackgroundVariantProps = Classed.VariantProps<typeof PaperElement>;

export type PaperElementVariantProps = Classed.VariantProps<typeof PaperElement>;

export type PaperElementProps = React.ComponentProps<typeof PaperElement>;

export const PaperElementBackground = classed('div', 'border-highlight-subtle', {
  variants: {
    border: {
      true: 'border-2',
      thin: 'border',
    },
    hoverHighlight: {
      true: 'hover:bg-surface-dark',
    },

    shadow: {
      true: 'shadow-xl',
    },
  },
});

export const PaperElement = classed(
  'div',
  PaperElementBackground,
  'relative',
  'bg-surface',
  'text-left text-content p-16 rounded',
  {
    variants: {
      padding: {
        true: '',
        false: 'p-0',
      },
      overflow: {
        visible: 'overflow-visible',
        hidden: 'overflow-hidden',
      },
      transparent: {
        true: 'bg-transparent',
      },
      rounded: {
        true: '',
        false: 'rounded-none',
      },
      cursorPointer: {
        true: 'cursor-pointer',
      },
      texture: {
        noise: 'noisy-surface-texture conic-gradient',
      },
      loading: {
        true: clsx(''),
      },
      fullHeight: {
        true: 'h-full',
      },
      fullWidth: {
        true: 'w-full',
      },
    },

    defaultVariants: {
      overflow: 'hidden',
      rounded: true,
      padding: true,
    },
  }
);
