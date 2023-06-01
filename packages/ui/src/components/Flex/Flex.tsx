import { Classed, classed } from 'utils/classed';

export type FlexProps = { className?: string; children?: React.ReactNode } & Partial<
  Classed.VariantProps<typeof Flex>
>;

export const flexGapVariants = {
  false: 'gap-0',
  true: 'gap-8',
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-8',
  lg: 'gap-16',
  xl: 'gap-24',
};

export const Flex = classed('div', 'flex', {
  defaultVariants: {},
  variants: {
    row: {
      true: 'flex-row',
      reverse: 'flex-row-reverse',
    },
    column: {
      true: 'flex-col',
      reverse: 'flex-col-reverse',
    },
    dir: {
      row: 'flex-row',
      column: 'flex-col',
    },
    inlineFlex: {
      true: 'inline-flex',
    },
    noFlex: {
      true: '',
    },
    flexNone: {
      true: 'flex-none',
    },
    wrap: {
      true: 'flex-wrap',
      reverse: 'flex-wrap-reverse wrap',
    },
    grow: {
      true: 'flex-grow',
    },
    shrink: {
      true: 'flex-shrink',
    },

    auto: {
      true: 'flex-auto',
    },
    basisAuto: {
      true: 'basis-auto',
    },
    centerAlign: {
      true: 'justify-center items-center',
    },

    gap: flexGapVariants,
    textAlign: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      end: 'text-end',
      start: 'text-start',
      justify: 'text-justify',
    },
    justify: {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    align: {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },

    alignSelf: {
      start: 'self-start',
      center: 'self-center',
      end: 'self-end',
      stretch: 'self-stretch',
      baseline: 'self-baseline',
      auto: 'self-auto',
    },
    justifySelf: {
      auto: 'justify-self-auto',
      start: 'justify-self-start',
      end: 'justify-self-end',
      center: 'justify-self-center',
      stretch: 'justify-self-stretch',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
});
