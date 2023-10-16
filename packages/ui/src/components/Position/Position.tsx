import { positionVariants } from 'styles/position.variants';
import type { Classed } from 'utils/classed';
import { classed } from 'utils/classed';

export type PositionElementVariantProps = Classed.VariantProps<typeof PositionElement>;

export type PositionElementProps = React.ComponentProps<typeof PositionElement>;

const PositionElement = classed('div', 'absolute', {
  variants: {
    position: positionVariants,
  },
});

type PositionProps = PositionElementProps;

export const Position = (props: PositionProps) => {
  return <PositionElement {...props} />;
};
