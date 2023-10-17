import type { Virtualizer, VirtualizerOptions } from '@tanstack/react-virtual';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useMemo, useRef } from 'react';
import useMousePosition from '@react-hook/mouse-position';
import { isEqual } from 'lodash-es';
import type { MousePosition } from 'hooks/useMousePosition';
import type { Rows } from './Table.types';

export type TableVirtualizerProps = Pick<
  VirtualizerOptions<Element, Element>,
  'estimateSize' | 'overscan' | 'debug'
>;

export interface UseTableVirtualizerProps {
  rows: Rows;
  virtualizerProps?: TableVirtualizerProps;
}

function useScrollingData<T extends HTMLElement>({
  isScrolling,
  scrollOffset,
}: Virtualizer<T, Element>) {
  const prevMousePositionSinceScrollStart = useRef<MousePosition>();
  const prevMousePositionSinceScrollEnd = useRef<MousePosition>();

  const mouseData = useMousePosition(document.body, { fps: 20 });

  const mousePosition = useMemo(() => {
    return { x: mouseData.x, y: mouseData.y };
  }, [mouseData.x, mouseData.y]);

  const mousePositionAtScrollStart = useRef<MousePosition | undefined>();

  const mousePositionAtScrollEnd = useRef<MousePosition | undefined>();

  useEffect(() => {
    if (isScrolling && !mousePositionAtScrollStart.current) {
      mousePositionAtScrollStart.current = mousePosition;
    }
    if (!isScrolling && mousePositionAtScrollStart.current) {
      mousePositionAtScrollStart.current = undefined;
    }

    if (isScrolling) {
      prevMousePositionSinceScrollStart.current = mousePosition;
    } else {
      prevMousePositionSinceScrollStart.current = undefined;
    }

    if (!isScrolling && !mousePositionAtScrollEnd.current) {
      mousePositionAtScrollEnd.current = mousePosition;
    }

    if (isScrolling && mousePositionAtScrollEnd.current) {
      mousePositionAtScrollEnd.current = undefined;
    }

    if (!isScrolling) {
      prevMousePositionSinceScrollEnd.current = mousePosition;
    } else {
      prevMousePositionSinceScrollEnd.current = undefined;
    }
  }, [isScrolling, mousePosition, scrollOffset]);

  const mouseMovedSinceScrollStart = !isEqual(
    mousePositionAtScrollStart.current,
    prevMousePositionSinceScrollStart.current
  );

  const mouseMovedSinceScrollEnd = !isEqual(
    mousePositionAtScrollEnd.current,
    prevMousePositionSinceScrollEnd.current
  );

  const scrollOffsetSinceMouseMoveDuringScroll = useRef<number | undefined>();

  useEffect(() => {
    if (isScrolling && mouseMovedSinceScrollStart) {
      scrollOffsetSinceMouseMoveDuringScroll.current = scrollOffset;
    } else {
      scrollOffsetSinceMouseMoveDuringScroll.current = undefined;
    }
  }, [isScrolling, mouseMovedSinceScrollStart, scrollOffset]);

  const hasScrollOffsetSinceMouseMoveDuringScroll =
    Boolean(scrollOffsetSinceMouseMoveDuringScroll.current) &&
    scrollOffset !== scrollOffsetSinceMouseMoveDuringScroll.current;

  return {
    isScrolling,
    hasScrollOffsetSinceMouseMoveDuringScroll,
    mouseMovedSinceScrollStart,
    mouseMovedSinceScrollEnd,
  };
}

export function useTableVirtualizer({ rows }: UseTableVirtualizerProps) {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    overscan: 10,
    estimateSize: () => 50,
  });

  const scrollData = useScrollingData(virtualizer);

  return {
    virtualizer,
    tableContainerRef,
    getTablePadding,
    ...scrollData,
  };
}

function getTablePadding<T extends HTMLElement>(virtualizer: Virtualizer<T, Element>) {
  const { getVirtualItems, getTotalSize } = virtualizer;
  const virtualRows = getVirtualItems();
  const totalSize = getTotalSize();

  if (virtualRows.length > 0) {
    const firstVirtualRow = virtualRows[0];
    const lastVirtualRow = virtualRows[virtualRows.length - 1];
    return {
      paddingTop: firstVirtualRow?.start ?? 0,
      paddingBottom: totalSize - (lastVirtualRow?.end ?? 0),
    };
  }

  return {
    paddingTop: 0,
    paddingBottom: 0,
  };
}
