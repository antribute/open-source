import { HorizontalResizeIcon, VerticalResizeIcon } from 'components/Icon/ResizeIcon';
import type { Direction } from 'react-resizable-panels';
import {
  PanelResizeHandle as PanelResizeHandlePrimitive,
  PanelResizeHandleProps as PanelResizeHandlePrimitiveProps,
} from 'react-resizable-panels';
import { classed } from 'utils/classed';

const ResizeHandle = classed(
  PanelResizeHandlePrimitive,
  'flex-0 w-22 h-auto  relative rounded-md outline-none data-[resize-handle-active]:bg-highlight-tint'
);

const ResizeHandleInner = classed(
  'div',
  // 'absolute top-1/4 bottom-1/4 left-1/4 right-1/4 rounded-sm transition-colors'
  'absolute inset-1/4 rounded-sm transition-colors',
  'i-heroicons-dr'
);

interface PanelResizeHandlePros extends PanelResizeHandlePrimitiveProps {
  direction: Direction;
}

export function PanelResizeHandle({ direction, ...props }: PanelResizeHandlePros) {
  return (
    <ResizeHandle {...props}>
      <ResizeHandleInner>
        {direction === 'vertical' ? (
          <VerticalResizeIcon autoSize />
        ) : (
          <HorizontalResizeIcon autoSize />
        )}
      </ResizeHandleInner>
    </ResizeHandle>
  );
}
