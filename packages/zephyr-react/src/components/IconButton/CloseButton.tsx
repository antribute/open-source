import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { IconButton, IconButtonProps } from 'components/IconButton/IconButton';

export type CloseButtonProps = Pick<
  IconButtonProps,
  'color' | 'hoverBackgroundColor' | 'variant' | 'size' | 'className' | 'onClick'
>;
export const CloseButton = ({ className, color = 'primary', ...props }: CloseButtonProps) => {
  return (
    <IconButton size="sm" variant="ghost" {...props} color={color} className={className}>
      <XMarkIcon className={clsx({ 'fill-content': color === 'primary' })} />
    </IconButton>
  );
};
