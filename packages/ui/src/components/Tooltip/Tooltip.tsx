import { ColorSchemeName } from '@antribute/zephyr-core';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React, { CSSProperties, useState } from 'react';
import { Classed, classed } from 'utils/classed';
import { getNearestColorSchemeAttribute } from 'utils/getNearestColorSchemeAttribute';
import { pickProps } from 'utils/pickProps';

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
  'z-50 relative',

  {
    variants: {
      size: {
        xs: 'text-xs py-2 px-4',
        sm: 'text-sm py-4 px-6',
        md: 'text-md py-6 px-8',
        lg: 'text-lg py-4 px-12',
      },
      maxWidth: {
        false: '',
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
      selectNone: true,
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
  className?: string;
  style?: CSSProperties;
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
} & TooltipRootProps &
  TooltipContentProps;

export const Tooltip = (props: TooltipProps) => {
  const [colorSchemDataAttribute, setColorSchemeAttribute] = useState<
    ColorSchemeName | undefined
  >();

  const { children, tooltip, triggerProps, triggerAsChild } = pickProps(props, {
    triggerAsChild: true,
    children: '_pick_',
    tooltip: '_pick_',
    triggerProps: {},
    forceMount: '_pick_',
  });

  const { onTooltipClick, stopPropogation, ...contentProps } = pickProps<TooltipContentProps>(
    props,
    {
      side: 'bottom',
      className: '_pick_',
      maxWidth: '_pick_',
      selectNone: '_pick_',
      'aria-label': '_pick_',
      align: '_pick_',
      arrowPadding: '_pick_',
      collisionBoundary: '_pick_',
      sticky: '_pick_',
      hideWhenDetached: '_pick_',
      avoidCollisions: '_pick_',
      stopPropogation: '_pick_',
      onTooltipClick: '_pick_',
      style: '_pick_',
    }
  );

  const tooltipRootProps = pickProps<TooltipRootProps>(props, {
    defaultOpen: '_pick_',
    open: '_pick_',
    onOpenChange: '_pick_',
    delayDuration: '_pick_',
    disableHoverableContent: '_pick_',
  });

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={100} {...tooltipRootProps}>
        <TooltipPrimitive.Trigger
          asChild={triggerAsChild}
          {...triggerProps}
          onMouseOverCapture={(e) => {
            triggerProps.onMouseOverCapture?.(e);
            setColorSchemeAttribute(getNearestColorSchemeAttribute(e.currentTarget));
          }}
        >
          {children}
        </TooltipPrimitive.Trigger>

        {colorSchemDataAttribute && (
          <TooltipPrimitive.Portal>
            <TooltipContent colorScheme={colorSchemDataAttribute} {...contentProps}>
              {tooltip}
            </TooltipContent>
          </TooltipPrimitive.Portal>
        )}
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export const TooltipContent = ({
  children,
  colorScheme,
  onTooltipClick,
  stopPropogation,

  asChild,
  ...contentProps
}: {
  colorScheme?: ColorSchemeName;
  children?: React.ReactNode;
  asChild?: boolean;
} & TooltipContentProps) => {
  return (
    <TooltipContentElement
      size="md"
      sideOffset={4}
      collisionPadding={4}
      alignOffset={4}
      data-color-scheme={colorScheme}
      asChild={asChild}
      {...contentProps}
      onClick={(e) => {
        if (stopPropogation) {
          e.stopPropagation();
        }
        onTooltipClick?.(e);
      }}
    >
      {children}
    </TooltipContentElement>
  );
};

Tooltip.Provider = TooltipPrimitive.Provider;

Tooltip.Root = TooltipPrimitive.Root;

Tooltip.Trigger = TooltipPrimitive.Trigger;

Tooltip.Portal = TooltipPrimitive.Portal;

Tooltip.PrimitiveContent = TooltipPrimitive.Content;

Tooltip.Content = TooltipContent;
