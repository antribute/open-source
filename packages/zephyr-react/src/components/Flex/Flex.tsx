import { Classed, classed } from 'utils/classed';

const FlexElement = classed('div', 'flex', {
  variants: {
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
    centerAlign: {
      true: 'justify-center items-center',
    },
    inlineFlex: {
      true: 'inline-flex',
    },
    gap: {
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-8',
      lg: 'gap-24',
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
  },
  defaultVariants: { gap: 'md' },
});

export type FlexProps = { className?: string; children?: React.ReactNode } & Partial<
  Classed.VariantProps<typeof FlexElement>
>;

export const Flex = (props: FlexProps) => {
  return <FlexElement {...props} />;
};
