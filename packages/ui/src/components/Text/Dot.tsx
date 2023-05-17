import { classed } from 'utils/classed';

type TextDotProps = React.ComponentProps<typeof TextDotElement>;

const TextDotElement = classed('svg', 'flex-none fill-current', {
  variants: {
    size: {
      xs: 'h-2 w-2',
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const Dot = (props: TextDotProps) => (
  <TextDotElement viewBox="0 0 2 2" {...props}>
    <circle cx={1} cy={1} r={1} />
  </TextDotElement>
);
