import { colorVariants } from 'styles/colors.variants';
import { Classed, classed, mergeVariants } from 'utils/classed';

const StatusDotElement = classed(
  'div',
  'flex-none rounded-full p-4 !bg-opacity-20 overflow-hidden relative',
  {
    variants: {
      color: mergeVariants([colorVariants.text, colorVariants.bg]),
    },
  }
);

export type StatusDotProps = Classed.VariantProps<typeof StatusDotElement>;

export const StatusDot = ({ color, ...props }: StatusDotProps) => {
  return (
    <StatusDotElement color={color} {...props}>
      <div className="h-10 w-10 rounded-full bg-current  noisy-surface-texture before:overflow-hidden before:rounded-full" />
    </StatusDotElement>
  );
};
