import { HorizontalResizeIcon, VerticalResizeIcon } from 'components/Icon/ResizeIcon';
import { forwardRef } from 'react';
import type { Direction } from 'react-resizable-panels';
import {
  PanelResizeHandle as PanelResizeHandlePrimitive,
  PanelResizeHandleProps as PanelResizeHandlePrimitiveProps,
} from 'react-resizable-panels';
import { classed } from 'utils/classed';
// TODO: Ask Tyler if we still need this
// import './test.css';
import { clsx } from 'config/plugins/custom-classes-plugin/class-style-utils';

const ResizeHandle = classed(
  PanelResizeHandlePrimitive,
  clsx(
    'group',
    'flex-0 h-auto relative',
    'transition-colors',
    'rounded-md outline-none',
    'gradient-mask-y-20',
    'bg-transparent data-[resize-handle-active]:bg-highlight-tint'
  ),
  {
    variants: {
      direction: {
        horizontal: 'mx-4',
        vertical: 'my-4',
      } satisfies Record<Direction, string>,
    },
  }
);

const ResizeHandleInner = classed(
  'div',
  'absolute inset-1/4',
  'rounded-sm',
  'flex items-center justify-center',
  'text-content-weak',
  'opacity-0 group-hover:opacity-20 group-active:opacity-100',
  'transition-opacity'
);

export interface PanelResizeHandleProps extends PanelResizeHandlePrimitiveProps {
  direction: Direction;
  gap?: number;
}

export const PanelResizeHandle = forwardRef<HTMLDivElement, PanelResizeHandleProps>(
  ({ direction, gap = 16, ...props }, ref) => {
    return (
      <ResizeHandle
        {...props}
        direction={direction}
        style={{
          width: direction === 'horizontal' ? gap : undefined,
          height: direction === 'vertical' ? gap : undefined,
          ...props.style,
        }}
      >
        <ResizeHandleInner ref={ref}>
          <div className="h-14 w-14 shrink-0">
            {direction === 'vertical' ? (
              <VerticalResizeIcon autoSize />
            ) : (
              <HorizontalResizeIcon autoSize />
            )}
          </div>
        </ResizeHandleInner>
      </ResizeHandle>
    );
  }
);
