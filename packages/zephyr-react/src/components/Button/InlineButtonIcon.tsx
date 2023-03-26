import React from 'react';
import { Classed, classed } from 'utils/classed';

const InlineButtonIconElement = classed('span', 'flex items-center justify-center', {
  variants: {
    size: {
      xs: 'h-12 w-12',
      sm: 'h-14 w-14',
      md: 'h-16 w-16',
      lg: 'h-18 w-18',
    },

    offset: {
      right: '-mr-6',
      left: '-ml-6',
    },
  },
  defaultVariants: { size: 'md' },
});

export type InlineButtonIconProps = {
  icon?: React.ReactNode;
  className?: string;
  position: 'left' | 'right';
  offset?: boolean;
} & Omit<Classed.VariantProps<typeof InlineButtonIconElement>, 'offset'>;

export const InlineButtonIcon = ({
  offset,
  position,
  size,
  icon,
  className,
}: InlineButtonIconProps) => {
  return Boolean(className || icon) ? (
    <InlineButtonIconElement
      size={size}
      className={className}
      offset={offset ? position : undefined}
    >
      {icon}
    </InlineButtonIconElement>
  ) : null;
};
