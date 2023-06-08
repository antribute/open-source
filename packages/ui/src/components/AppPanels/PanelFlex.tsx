/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import React, { useMemo, useRef } from 'react';
import useDimensions from 'react-cool-dimensions';
import {
  Direction,
  ImperativePanelGroupHandle,
  PanelGroup as PrimitivePanelGroup,
  PanelGroupProps as PrimitivePanelGroupProps,
} from 'react-resizable-panels';
import { createCtx } from 'utils/createContext';
import { measureElement } from 'utils/measureElement';
import {
  PanelSizeBreakpointMap,
  UsePanelSizeBreakpointsReturn,
  usePanelSizeBreakpoints,
} from 'components/AppPanels/usePanelSizeBreakpoints';
import { hasChildren } from 'react-children-utilities';
import { notEmpty } from 'utils';
import { scaleNumbers } from 'components/AppPanels/helpers';
import { ZeroTo100 } from 'types/numeric-types';
import { get } from 'lodash-es';
import { DEFAULT_MIN_PANEL_SIZE, type PanelProps } from './Panel';
import { PanelResizeHandle } from './PanelSpacer';

export interface PanelFlexProps<TBreakpoints extends PanelSizeBreakpointMap>
  extends Omit<PrimitivePanelGroupProps, 'children'> {
  breakpoints?: TBreakpoints;
  resizeable?: boolean;
  children: this['breakpoints'] extends undefined
    ? React.ReactNode
    :
        | (({ sizes }: { sizes: UsePanelSizeBreakpointsReturn<TBreakpoints> }) => React.ReactNode)
        | React.ReactNode;
}

export const { Provider: PanelFlexProvider, useContext: panelGroupContext } = createCtx<{
  panelGroupWidth: number | null;
  panelGroupHeight: number | null;
  panelGroupRelativeSize: number | null;
  direction: Direction;
}>();

export const PanelGroup = <T extends PanelSizeBreakpointMap<ZeroTo100>>({
  children: childrenProp,
  resizeable,
  direction,
  breakpoints,
  ...props
}: PanelFlexProps<T>) => {
  const {
    observe,
    width: panelGroupWidth,
    height: panelGroupHeight,
  } = useDimensions({ useBorderBoxSize: false });

  const panelGroupRef = useRef<ImperativePanelGroupHandle>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  const { width: resizerWidth, height: resizerHeight } = measureElement(resizerRef);

  const sizes = usePanelSizeBreakpoints<T>({ breakpoints });
  const { rows, panelGroupRelativeSize } = useMemo(() => {
    let resizerCount = 0;

    const children = (
      typeof childrenProp === 'function' ? childrenProp({ sizes }) : childrenProp
    ) as React.ReactNode;

    const childrenNodes = React.Children.toArray(
      typeof childrenProp === 'function' && hasChildren(children)
        ? children.props.children
        : children
    );

    const panelNodes = childrenNodes.map((node) => {
      if (
        React.isValidElement<PanelProps>(node) &&
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        node.props &&
        (node.props.defaultSize ?? 1) >= 1
      ) {
        return node;
      }
      return undefined;
    });

    // Prevent the sum total minSize of all panels in the group from exceeding 100
    // to avoid react-resizeable-panels error.
    const scaledMinSizes = scaleNumbers(
      panelNodes.map((e) => e?.props.minSize),
      100 - DEFAULT_MIN_PANEL_SIZE
    );

    const rows = panelNodes.filter(notEmpty).flatMap((node, index, arr) => {
      const minSize = scaledMinSizes[index];

      const order = index + 1;

      const child = React.cloneElement(node, {
        key: node.props.id ?? `panel-${order}-${get(node, 'props.id', '')}`,
        order,
        minSize: minSize || 10,
      });

      if (resizeable && index !== arr.length - 1) {
        resizerCount += 1;
        return [
          child,
          <PanelResizeHandle
            direction={direction}
            ref={resizerRef}
            key={`handle-${order}-${index}`}
          />,
        ];
      }
      return child;
    });

    const totalResizerWidth = resizerWidth * resizerCount;

    const totalResizerHeight = resizerHeight * resizerCount;

    const panelGroupRelativeSize =
      direction === 'horizontal'
        ? panelGroupWidth - totalResizerWidth
        : panelGroupHeight - totalResizerHeight;

    return { rows, panelGroupRelativeSize };
  }, [
    childrenProp,
    sizes,
    resizerWidth,
    resizerHeight,
    direction,
    panelGroupWidth,
    panelGroupHeight,
    resizeable,
  ]);

  return (
    <PanelFlexProvider
      value={{ panelGroupWidth, panelGroupHeight, direction, panelGroupRelativeSize }}
    >
      <div ref={observe} className="w-full h-full">
        <PrimitivePanelGroup direction={direction} {...props} ref={panelGroupRef} id="imperative">
          {rows}
        </PrimitivePanelGroup>
      </div>
    </PanelFlexProvider>
  );
};
