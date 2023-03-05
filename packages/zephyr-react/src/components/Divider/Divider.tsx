import { classed } from 'utils/classed';

const DividerElement = classed('hr', {
  variants: {
    color: {
      tint: 'border-highlight-tint',
      subtle: 'border-highlight-subtle',
      weak: 'border-highlight-weak',
      moderate: 'border-highlight',
      high: 'border-highlight-high',
    },
  },
});

export type DividerProps = React.ComponentProps<typeof DividerElement>;

export const Divider = (props: DividerProps) => {
  return <DividerElement {...props} className="bg-danger" />;
};
