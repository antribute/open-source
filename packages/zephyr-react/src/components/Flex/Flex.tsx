import { flexAlignItemsVariants } from 'styles/flex.variants';
import { Classed, classed } from 'utils/classed';

export type FlexElementVariantProps = Classed.VariantProps<typeof FlexElement>;

export type FlexElementProps = React.ComponentProps<typeof FlexElement>;

const FlexElement = classed('div', 'flex', {
  variants: {
    align: flexAlignItemsVariants,
  },
});

type FlexProps = FlexElementProps;

export const Flex = (props: FlexProps) => {
  return <FlexElement {...props} />;
};
