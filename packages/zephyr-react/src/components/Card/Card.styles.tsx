import { ScrollArea } from 'components/ScrollArea/ScrollArea';
import { PaperElement } from 'components/Paper/Paper.styles';
import { Classed, classed } from 'utils/classed';

// Container

export type CardContainerElementProps = React.ComponentProps<typeof CardContainerElement>;

export const CardContainerElement = classed.div(
  PaperElement,
  'rounded-md',

  {
    variants: {},
  }
);

// Title Section

export type CardTitleSectionElementProps = React.ComponentProps<typeof CardTitleSectionElement>;

export const CardTitleSectionElement = classed(
  'div',
  'flex relative w-full justify-between items-center',
  'border-b border-boundary-tint/5 pb-8 text-content-strong',
  'text-content-high',
  {
    variants: {},
  }
);

// Title

export type CardTitleElementProps = React.ComponentProps<typeof CardTitleElement>;

export const CardTitleElement = classed(
  'h6',
  'text-md font-heading !font-bold !text-content-intense',
  'flex-grow',

  {
    variants: {},
  }
);

// Description

export const CardDescriptionElement = classed(
  'div',
  'group-surface-neutral:text-content-inverse',

  {
    variants: {},
  }
);

// Group Spacer

export const CardGroupSpacerElement = classed(
  'div',
  'flex items-center flex-wrap gap-8',

  {
    variants: {
      grow: {
        true: 'flex-grow',
      },
    },
  }
);

// Body
export const CardBodySectionElement = classed(
  ScrollArea,
  'w-full my-8',
  'font-body',
  'text-content-moderate',
  'flex flex-col gap-16',

  {
    variants: {},
  }
);

// Footer
export type CardFooterElementVariants = Classed.VariantProps<typeof CardFooterElement>;

export type CardFooterElementProps = React.ComponentProps<typeof CardFooterElement>;

export const CardFooterElement = classed(
  'p',
  'flex flex-wrap justify-end items-center gap-8 gap-y-6 pt-8 px-4 border-t border-highlight mt-auto',
  {
    variants: {},
  }
);
