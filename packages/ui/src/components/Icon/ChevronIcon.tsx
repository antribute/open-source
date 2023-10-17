import { ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { iconSizeVariants } from 'components/Avatar';
import type { SizeProp } from 'types/styles';
import { classed } from 'utils/classed';

const ChevronContainerElement = classed(
  'div',
  'shrink-0',
  'relative',
  'flex flex-col items-center justify-center',
  'text-boundary-moderate/60',
  {
    variants: {
      size: iconSizeVariants,
    },
  }
);

export type ChevronIconVariant = 'up' | 'down' | 'up-down';

export const ChevronIcon = ({
  className,
  variant = 'up-down',
  size = 'xs',
}: {
  className?: string;
  variant?: ChevronIconVariant;
  size?: SizeProp<'base' | 'inline'>;
}) => {
  return (
    <ChevronContainerElement className={className} size={size}>
      {variant === 'up' && <ChevronUpDownIcon />}
      {variant === 'down' && <ChevronUpDownIcon />}
      {variant === 'up-down' && <ChevronUpDownIcon />}
    </ChevronContainerElement>
  );
};
