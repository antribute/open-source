import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { IconButton, IconButtonProps } from 'components/IconButton/IconButton';
import { twMerge } from 'tailwind-merge';

export type CloseButtonProps = Pick<
  IconButtonProps,
  'color' | 'hoverBackgroundColor' | 'variant' | 'size' | 'className' | 'onClick'
> & {
  animated?: boolean;
};
export const CloseButton = ({
  className,
  animated,
  color = 'primary',
  ...props
}: CloseButtonProps) => {
  return (
    <IconButton
      size="sm"
      variant="ghost"
      {...props}
      color={color}
      className={twMerge(
        clsx({
          'opacity-50 transition-opacity duration-300 ease-in-out group-hover:opacity-100':
            animated,
        }),
        className
      )}
    >
      <XMarkIcon className={clsx({ 'fill-content-intense': color === 'primary' })} />
    </IconButton>
  );
};
