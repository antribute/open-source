import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React, { useState } from 'react';
import { Classed, classed } from 'utils/classed';
import { getNearestColorSchemeAttribute } from 'utils/getNearestColorSchemeAttribute';

type TooltipContentElementProps = Classed.ComponentProps<typeof TooltipContentElement>;

const TooltipContentElement = classed(
  TooltipPrimitive.TooltipContent,
  'radix-side-top:animate-slide-down-fade',
  'radix-side-right:animate-slide-left-fade',
  'radix-side-bottom:animate-slide-up-fade',
  'radix-side-left:animate-slide-right-fade',
  'inline-flex items-center py-8 px-10',
  'text-sm font-body',
  'rounded',
  'bg-surface-soft text-content-strong',
  'ring-1 ring-inset ring-content-tint',
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
  const [colorSchemeAttribute, setColorSchemeAttribute] = useState<string | undefined>();

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={100} {...props}>
        <TooltipPrimitive.Trigger
          asChild={triggerAsChild}
          {...triggerProps}
          onMouseOverCapture={(e) => {
            triggerProps?.onMouseOverCapture?.(e);
            setColorSchemeAttribute(getNearestColorSchemeAttribute(e.currentTarget));
          }}
        >
          {children}
        </TooltipPrimitive.Trigger>

        {colorSchemeAttribute && (
          <TooltipPrimitive.Portal>
            <TooltipContentElement
              data-color-scheme={colorSchemeAttribute}
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
        )}
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
