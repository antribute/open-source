import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { classed } from 'utils/classed';
import { CloseButton } from 'components/IconButton';

const PopoverContentElement = classed(
  PopoverPrimitive.Content,
  'bg-surface p-8 rounded border border-highlight relative z-0',
  {
    variants: {
      closeButton: {
        true: 'pr-40',
      },
    },
  }
);

interface PopoverContentProps extends PopoverPrimitive.PopperContentProps {
  children?: React.ReactNode;
  showArrow?: boolean;
  showCloseButton?: boolean;
  closeOnInteractOutside?: boolean;
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
  ...props
}: PopoverContentProps) => {
  const showCloseButton = showCloseButtonProp ?? !closeOnInteractOutside;

  return (
    <PopoverPrimitive.Portal>
      <PopoverContentElement
        sideOffset={5}
        collisionPadding={5}
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
              className="absolute right-[3px] top-[5.8px]"
              // variant="filled"
              // rounded
              // className="border-highlight border absolute bg-surface hover:bg-surface-light  -top-8 -right-8  !h-20 !w-20 !p-4"
            />
          </PopoverPrimitive.Close>
        )}
        {showArrow && (
          <>
            <PopoverPrimitive.Arrow className="fill-highlight-high  relative top-px" />
            <PopoverPrimitive.Arrow className="fill-surface scale-105 relative " />
          </>
        )}
      </PopoverContentElement>
    </PopoverPrimitive.Portal>
  );
};

const PopoverRoot = (props: PopoverPrimitive.PopoverProps) => {
  return <PopoverPrimitive.Root {...props} />;
};

type PopoverTriggerProps = PopoverPrimitive.PopoverTriggerProps;

const PopoverTrigger = (props: PopoverTriggerProps) => {
  return <PopoverPrimitive.Trigger asChild {...props} />;
};

const Root = PopoverRoot;

const Content = PopoverContent;

const Trigger = PopoverTrigger;

export { Root, Trigger, Content };
