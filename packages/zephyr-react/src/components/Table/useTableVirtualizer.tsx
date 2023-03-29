import { useVirtualizer, VirtualizerOptions } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { Rows } from './Table.types';

export type TableVirtualizerProps = Pick<
  VirtualizerOptions<Element, Element>,
  'estimateSize' | 'overscan' | 'debug'
>;

export interface UseTableVirtualizerProps {
  rows: Rows;
  virtualizerProps?: TableVirtualizerProps;
}

export function useTableVirtualizer({ rows }: UseTableVirtualizerProps) {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    overscan: 10,
    // Note: Without this, an infinite re-render at cetain parts occurs while at certain
    scrollPaddingEnd: 2,
    estimateSize: () => 64,
  });

  const { getVirtualItems, getTotalSize } = rowVirtualizer;

  const virtualRows = getVirtualItems();

  const totalSize = getTotalSize();

  function getTablePadding() {
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

  return {
    tableContainerRef,
    virtualRows,
    rowVirtualizer,
    tablePadding: getTablePadding(),
  };
}