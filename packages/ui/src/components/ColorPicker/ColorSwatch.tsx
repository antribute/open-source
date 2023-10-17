import { classed } from 'utils/classed';

import { parseColor } from '@react-stately/color';
import type { Color } from '@react-stately/color';

const ColorSwatchElement = classed('div', 'rounded-lg flex-shrink-0 aspect', {
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      xs: 'h-8 w-8',
      sm: 'h-16 w-16',
      md: 'h-32 w-32',
      lg: 'h-64 w-64',
    },
    roundedFull: {
      true: 'rounded-full',
    },
    rounded: {
      full: 'rounded-full',
      md: 'md',
    },
  },
});

export const ColorSwatch = ({ color: colorProp }: { color: Color | string }) => {
  const color = typeof colorProp === 'string' ? parseColor(colorProp) : colorProp;

  return <ColorSwatchElement style={{ background: color.toString('css') }} />;
};
