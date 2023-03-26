import { ScrollArea } from 'components/ScrollArea/ScrollArea';
import { Classed, classed, expandVariant } from 'utils/classed';
import { Paper } from 'components/Paper';

// Container

export type CardContainerElementProps = React.ComponentProps<typeof CardContainerElement>;

export const CardContainerElement = classed(Paper, 'flex flex-col shrink-0', 'rounded-md group');

// Title Section

export type CardTitleSectionElementProps = React.ComponentProps<typeof CardTitleSectionElement>;

export const CardTitleSectionElement = classed(
  'div',
  'pb-8',
  'relative w-full',
  'text-content-high',
  'flex justify-between items-center',
  'border-b border-boundary-tint/5',
  'mb-8',
  expandVariant('group-data-antribute-card-padding-none:(px-10,border-highlight-weak,pt-8)'),
  {
    variants: {},
  }
);

// Body Section

export const CardBodySectionElement = classed(
  'div',
  'w-full pt-8 mb-8',
  'font-body',
  'text-content-moderate',
  'flex flex-col gap-16',
  'min-h-0 grow overflow-y-auto',
  expandVariant('group-data-antribute-card-padding-none:(px-10,mb-0)'),
  {
    variants: {},
  }
);

// Scroll Body Section

export const CardScrollBodySectionElement = classed(ScrollArea, CardBodySectionElement);

// Footer Section

export type CardFooterElementVariants = Classed.VariantProps<typeof CardFooterSectionElement>;

export type CardFooterElementProps = React.ComponentProps<typeof CardFooterSectionElement>;

export const CardFooterSectionElement = classed(
  'p',
  'flex flex-wrap shrink-0 mt-auto',
  'justify-end items-center gap-8 gap-y-6 pt-8 px-4 border-t border-highlight ',
  expandVariant('group-data-antribute-card-padding-none:(px-10,pb-8)'),
  {
    variants: {},
  }
);

// Title

export type CardTitleElementProps = React.ComponentProps<typeof CardTitleElement>;

export const CardTitleElement = classed(
  'h6',
  'flex-grow',
  'text-md font-heading !font-bold text-content-intense',
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

export const CardGroupSpacerElement = classed('div', 'flex items-center flex-wrap gap-8', {
  variants: {
    grow: {
      true: 'flex-grow',
    },
  },
});
