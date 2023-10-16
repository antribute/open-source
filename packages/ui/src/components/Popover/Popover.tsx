import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { classed } from 'utils/classed';
import { CloseButton } from 'components/IconButton';

const PopoverContentElement = classed(
  PopoverPrimitive.Content,
  'bg-surface p-8 rounded border border-highlight relative z-0',
  {
    variants: {
      backgroundNoise: {
        true: 'noisy-surface-texture',
      },
      closeButton: {
        true: 'pr-40',
      },
    },
    defaultVariants: {
      backgroundNoise: true,
    },
  }
);

export interface PopoverContentProps extends PopoverPrimitive.PopoverContentImplProps {
  children?: React.ReactNode;
  showArrow?: boolean;
  showCloseButton?: boolean;
  closeOnInteractOutside?: boolean;
  backgroundNoise?: boolean;
}

<svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clipPath="url(#clip0_3_4)">
    <path
      d="M0 0H10L6.06066 3.93934C5.47487 4.52513 4.52513 4.52513 3.93934 3.93934L0 0Z"
      fill="black"
    />
  </g>
  <defs>
    <clipPath id="clip0_3_4">
      <rect width="10" height="5" fill="white" />
    </clipPath>
  </defs>
</svg>;

const PopoverContent = ({
  children,
  showArrow,
  closeOnInteractOutside = true,
  showCloseButton: showCloseButtonProp,
  className,
  backgroundNoise,
  ...props
}: PopoverContentProps) => {
  const showCloseButton = showCloseButtonProp ?? !closeOnInteractOutside;

  return (
    <PopoverPrimitive.Portal>
      <PopoverContentElement
        sideOffset={5}
        collisionPadding={5}
        backgroundNoise={backgroundNoise}
        {...props}
        onInteractOutside={(e) => {
          if (!closeOnInteractOutside) {
            e.preventDefault();
          }
        }}
        className={className}
        closeButton={showCloseButton}
      >
        {children}
        {showCloseButton && (
          <PopoverPrimitive.Close asChild aria-label="Close">
            <CloseButton
              size="xs"
              rounded
              color="secondary"
              className="absolute right-[3px] top-[5.8px] noisy-surface-texture"
            />
          </PopoverPrimitive.Close>
        )}
        {showArrow && (
          <>
            <PopoverPrimitive.Arrow className="fill-highlight-subtle relative top-px" />
            <PopoverPrimitive.Arrow className="fill-surface scale-105 relative" />
          </>
        )}
      </PopoverContentElement>
    </PopoverPrimitive.Portal>
  );
};

export type PopoverRootProps = PopoverPrimitive.PopoverProps;

const PopoverRoot = (props: PopoverRootProps) => {
  return <PopoverPrimitive.Root {...props} />;
};

export type PopoverTriggerProps = PopoverPrimitive.PopoverTriggerProps;

const PopoverTrigger = (props: PopoverTriggerProps) => {
  return <PopoverPrimitive.Trigger asChild {...props} />;
};

const Close = PopoverPrimitive.Close;

const Root = PopoverRoot;

const Content = PopoverContent;

const Trigger = PopoverTrigger;

const PrimitiveContent = PopoverPrimitive.Content;

const Portal = PopoverPrimitive.Portal;

const Anchor = PopoverPrimitive.Anchor;

export { Root, Trigger, Content, Close, PrimitiveContent, Portal, Anchor };
