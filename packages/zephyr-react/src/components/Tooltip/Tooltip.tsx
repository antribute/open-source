import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React from 'react';
import { Classed, classed, deriveClassed } from 'utils/classed';
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';

type TooltipContentElementProps = Classed.ComponentProps<typeof TooltipContentElement>;

const TooltipContentElement = classed(
  TooltipPrimitive.TooltipContent,
  'radix-side-top:animate-slide-down-fade',
  'radix-side-right:animate-slide-left-fade',
  'radix-side-bottom:animate-slide-up-fade',
  'radix-side-left:animate-slide-right-fade',
  'inline-flex items-center rounded py-8 px-10',
  'text-sm font-body',
  ' bg-neutral-900 text-content-inverse-intense shadow-hover',

  {
    variants: {
      maxWidth: {
        xs: 'max-w-[20ch]',
        sm: 'max-w-[30ch]',
        md: 'max-w-[38ch]',
        lg: 'max-w-[65ch]',
      },
    },
    defaultVariants: {
      maxWidth: 'md',
    },
  }
);

type TooltipContentProps = { stopPropogation?: boolean } & TooltipContentElementProps;

type TooltipTriggerProps = TooltipPrimitive.TooltipTriggerProps;

export type TooltipProps = {
  tooltip?: React.ReactNode;
  triggerProps?: TooltipTriggerProps;
  contentProps?: TooltipContentProps;
  triggerAsChild?: boolean;
} & TooltipPrimitive.TooltipProps;

export const Tooltip = ({
  children,
  tooltip,
  triggerProps,
  contentProps,
  triggerAsChild = true,
  ...props
}: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={100} {...props}>
        <TooltipPrimitive.Trigger asChild={triggerAsChild} {...triggerProps}>
          {children}
        </TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipContentElement
            sideOffset={4}
            collisionPadding={30}
            {...contentProps}
            onClick={(e) => {
              const { stopPropogation = true, onClick } = contentProps ?? {};
              if (stopPropogation) {
                e.stopPropagation();
              }
              onClick?.(e);
            }}
          >
            {tooltip}
          </TooltipContentElement>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};