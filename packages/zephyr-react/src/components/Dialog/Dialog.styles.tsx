import { classed } from 'utils/classed';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { PaperElement } from 'components/Paper/Paper.styles';
import {
  CardBodySectionElement,
  CardFooterSectionElement,
  CardTitleElement,
  CardTitleSectionElement,
} from 'components/Card/Card.styles';

// Content

export type DialogContentElementProps = React.ComponentProps<typeof DialogContentElement>;

export const DialogContentElement = classed(
  DialogPrimitive.Content,
  PaperElement,
  'fixed z-50',
  'w-[95vw] rounded-lg md:w-full',
  'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
  'bg-surface',
  'border-boundary-subtle dark:border-boundary-inverse-subtle',
  'shadow-2xl dark:shadow-white/5',
  'focus:ring-boundary-subtle dark:focus:ring-boundary-inverse-subtle',
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

export type DialogOverlayElementProps = React.ComponentProps<typeof DialogOverlayElement>;

export const DialogOverlayElement = classed(
  DialogPrimitive.Overlay,
  'fixed inset-0 z-20 bg-black/50',
  {
    variants: {},
  }
);

// Heading

export type DialogHeadingElementProps = React.ComponentProps<typeof DialogHeadingElement>;

export const DialogHeadingElement = classed(CardTitleElement);

export type DialogDescriptionElementProps = React.ComponentProps<typeof DialogDescriptionElement>;

export const DialogDescriptionElement = classed(
  DialogPrimitive.Description,
  'text-md font-body text-content-moderate',
  {
    variants: {},
  }
);

// Title

export type DialogTitleSectionElementProps = React.ComponentProps<typeof DialogTitleElement>;

export const DialogTitleSectionElement = classed(DialogPrimitive.Title, CardTitleSectionElement);

// Body Section

export type DialogBodyElementProps = React.ComponentProps<typeof DialogBodyElement>;

export const DialogBodyElement = classed('div', CardBodySectionElement);

// Footer Section

export type DialogFooterElementProps = React.ComponentProps<typeof DialogFooterElement>;

export const DialogFooterElement = classed(DialogPrimitive.Description, CardFooterSectionElement);

// Title

export type DialogTitleElementProps = React.ComponentProps<typeof DialogTitleElement>;

export const DialogTitleElement = classed(DialogPrimitive.Title, CardTitleElement);

// Close Icon

export const DialogCloseButtonIconElement = classed(
  'button',
  'inline-flex absolute right-0 h-20 w-20 shrink-0 items-center justify-center rounded-full text-sm transition-all ring-0  focus:outline-none focus:ring-0 text-content-weak',
  {
    variants: {},
  }
);
