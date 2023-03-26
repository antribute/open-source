import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { pick } from 'lodash-es';
import React, { useState } from 'react';
import { Classed, classed } from 'utils/classed';
import { getNearestColorSchemeAttribute } from 'utils/getNearestColorSchemeAttribute';

type TooltipContentElementProps = Classed.ComponentProps<typeof TooltipContentElement>;

type TooltipContentElementVariantProps = Classed.VariantProps<typeof TooltipContentElement>;

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
      selectNone: {
        true: 'select-none',
      },
    },
    defaultVariants: {
      maxWidth: 'md',
    },
  }
);

type PickedTooltipContentPrimitiveProps = Pick<
  TooltipPrimitive.TooltipContentProps,
  | 'align'
  | 'alignOffset'
  | 'aria-label'
  | 'side'
  | 'sideOffset'
  | 'arrowPadding'
  | 'sticky'
  | 'hideWhenDetached'
  | 'avoidCollisions'
  | 'collisionBoundary'
  | 'collisionPadding'
>;

interface TooltipContentProps
  extends PickedTooltipContentPrimitiveProps,
    TooltipContentElementVariantProps {
  stopPropogation?: boolean;
  onTooltipClick?: TooltipContentElementProps['onClick'];
}

type TooltipTriggerProps = TooltipPrimitive.TooltipTriggerProps;

type TooltipRootProps = Pick<
  TooltipPrimitive.TooltipProps,
  'defaultOpen' | 'open' | 'onOpenChange' | 'delayDuration' | 'disableHoverableContent'
>;

export type TooltipProps = {
  tooltip?: React.ReactNode;
  triggerProps?: TooltipTriggerProps;
  triggerAsChild?: boolean;
  children?: React.ReactNode;
  forceMount?: boolean;
} & TooltipRootProps &
  TooltipContentProps;

const contentPropKeys = Object.keys({
  maxWidth: undefined,
  selectNone: undefined,
  'aria-label': undefined,
  side: undefined,
  sideOffset: undefined,
  align: undefined,
  alignOffset: undefined,
  arrowPadding: undefined,
  collisionBoundary: undefined,
  collisionPadding: undefined,
  sticky: undefined,
  hideWhenDetached: undefined,
  avoidCollisions: undefined,
  stopPropogation: undefined,
  onTooltipClick: undefined,
} satisfies TooltipContentProps);

const tooltipRootPropKeys = Object.keys({
  defaultOpen: undefined,
  open: undefined,
  onOpenChange: undefined,
  delayDuration: undefined,
  disableHoverableContent: undefined,
} satisfies TooltipRootProps);

export const Tooltip = ({
  children,
  tooltip,
  triggerProps,
  triggerAsChild = true,
  forceMount,
  ...props
}: TooltipProps) => {
  const [colorSchemeAttribute, setColorSchemeAttribute] = useState<string | undefined>();

  const { onTooltipClick, stopPropogation, ...contentProps } = pick(
    props,
    contentPropKeys
  ) as TooltipContentProps;

  const tooltipRootProps = pick(props, tooltipRootPropKeys) as TooltipRootProps;

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={100} {...tooltipRootProps}>
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
              collisionPadding={4}
              side="bottom"
              {...contentProps}
              onClick={(e) => {
                if (stopPropogation) {
                  e.stopPropagation();
                }
                onTooltipClick?.(e);
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
