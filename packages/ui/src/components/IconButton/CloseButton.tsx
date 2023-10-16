import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import type { IconButtonProps } from 'components/IconButton/IconButton';
import { IconButton } from 'components/IconButton/IconButton';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type CloseButtonProps = Omit<IconButtonProps, 'children'> & {
  animated?: boolean;
};
export const CloseButton = forwardRef<HTMLButtonElement, Omit<CloseButtonProps, 'as'>>(
  ({ className, animated, color = 'secondary', ...props }, ref) => {
    return (
      <IconButton
        ref={ref}
        size="sm"
        variant="ghost"
        color={color}
        rounded
        {...props}
        className={twMerge(
          clsx('text-content-subtle hover:text-content-weak', {
            'opacity-50 transition-opacity duration-300 ease-in-out group-hover:opacity-100':
              animated,
          }),
          className
        )}
      >
        <XMarkIcon className={clsx('fill-current')} />
      </IconButton>
    );
  }
);
