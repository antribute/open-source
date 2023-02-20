import { Classed, classed } from 'utils/classed';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { PaperElement } from 'components/Paper/Paper.styles';

// Content

export type DialogContentElementVariants = Classed.VariantProps<typeof DialogContentElement>;

export type DialogContentElementProps = React.ComponentProps<typeof DialogContentElement>;

export const DialogContentElement = classed(
  DialogPrimitive.Content,
  PaperElement,
  'fixed z-50',
  'w-[95vw] rounded-lg p-4 md:w-full',
  'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
  'bg-white dark:bg-gray-800',
  'border-boundary dark:border-boundary-inverse',
  'shadow-2xl dark:shadow-white/5',
  'focus:ring-boundary dark:focus:ring-boundary-inverse',
  {
    variants: {
      maxWidth: {
        auto: 'max-w-auto',
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
      },
    },

    defaultVariants: {
      maxWidth: 'md',
    },
  }
);

// Overlay
export type DialogOverlayElementVariants = Classed.VariantProps<typeof DialogOverlayElement>;

export type DialogOverlayElementProps = React.ComponentProps<typeof DialogOverlayElement>;

export const DialogOverlayElement = classed(
  DialogPrimitive.Overlay,
  'fixed inset-0 z-20 bg-black/50',
  {
    variants: {},
  }
);

// Heading
export type DialogHeadingElementVariants = Classed.VariantProps<typeof DialogHeadingElement>;

export type DialogHeadingElementProps = React.ComponentProps<typeof DialogHeadingElement>;

export const DialogHeadingElement = classed(
  DialogPrimitive.Title,
  'text-md font-heading text-content-strong dark:text-content-inverse-strong',
  {
    variants: {},
  }
);

// Description
export type DialogDescriptionElementVariants = Classed.VariantProps<
  typeof DialogDescriptionElement
>;

export type DialogDescriptionElementProps = React.ComponentProps<typeof DialogDescriptionElement>;

export const DialogDescriptionElement = classed(
  DialogPrimitive.Description,
  'text-md font-body text-content-moderate dark:text-content-inverse-moderate',
  {
    variants: {},
  }
);

// Title
export type DialogTitleElementVariants = Classed.VariantProps<typeof DialogTitleElement>;

export type DialogTitleElementProps = React.ComponentProps<typeof DialogTitleElement>;

export const DialogTitleElement = classed(
  DialogPrimitive.Title,
  DialogHeadingElement,
  'flex relative w-full',
  'border-b border-boundary-faint dark:border-boundary-inverse pb-8 text-content dark:text-content-inverse-strong',
  {
    variants: {},
  }
);

// Body
export type DialogBodyElementVariants = Classed.VariantProps<typeof DialogBodyElement>;

export type DialogBodyElementProps = React.ComponentProps<typeof DialogBodyElement>;

export const DialogBodyElement = classed('div', 'w-full my-8', {
  variants: {},
});

// Footer
export type DialogFooterElementVariants = Classed.VariantProps<typeof DialogFooterElement>;

export type DialogFooterElementProps = React.ComponentProps<typeof DialogFooterElement>;

export const DialogFooterElement = classed(
  DialogPrimitive.Description,
  'flex justify-end items-center gap-x-8 pt-8 px-4 border-t border-boundary-faint dark:border-boundary-inverse-faint',
  {
    variants: {},
  }
);

// Close Icon

export const DialogCloseButtonIconElement = classed(
  'button',
  'inline-flex absolute right-0 h-20 w-20 shrink-0 items-center justify-center rounded-full text-sm text-content-weak transition-all ring-0  focus:outline-none focus:ring-0 dark:text-content-inverse-weak',
  {
    variants: {},
  }
);
