import { positionVariants } from 'styles/position.variants';
import { Classed, classed } from 'utils/classed';

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
