/* eslint-disable react/prop-types */
import { useTableContext } from 'components/Table/Table.context';
import { getTableMeta } from 'components/Table/helpers';
import { classed } from 'utils/classed';
import React, { useEffect } from 'react';
import { Row as _Row } from '../Table.types';

const DataRowElement = classed('tr', 'border-b border-highlight-ghost', {
  variants: {
    tint: {
      true: 'bg-highlight-tint',
    },
    // Used to lightly highlight a row while scrolling
    subtleHover: {
      true: 'active:bg-highlight-ghost',
    },
    clickable: {
      true: 'cursor-pointer hover:bg-highlight-ghost relative',
    },
    transition: {
      true: 'transition-colors delay-75 duration-500 will-change-auto active:transition-none',
    },
  },
  compoundVariants: [{ subtleHover: true, clickable: true, class: 'hover:bg-surface-dark/0' }],
});

type DataRowProps = {
  row: _Row;
  isScrolling?: boolean;
  mouseMovedSinceScrollStart?: boolean;
  mouseMovedSinceScrollEnd?: boolean;
  hasScrollOffsetSinceMouseMoveDuringScroll?: boolean;
} & React.ComponentProps<typeof DataRowElement>;

const Row = React.forwardRef<HTMLTableRowElement, DataRowProps>(
  (
    {
      row,
      isScrolling,
      onClick,
      mouseMovedSinceScrollStart,
      mouseMovedSinceScrollEnd,
      hasScrollOffsetSinceMouseMoveDuringScroll,
      ...props
    },
    forwardedRef
  ) => {
    const { table } = useTableContext();

    const { onRowClick } = getTableMeta(table) ?? {};

    const isClickable =
      Boolean(onRowClick) &&
      (!isScrolling || (mouseMovedSinceScrollStart && !hasScrollOffsetSinceMouseMoveDuringScroll));

    function handleRowClick(e: React.MouseEvent<HTMLTableRowElement>) {
      if (isClickable) {
        const data = row.original;
        onClick?.(e);
        onRowClick?.(data);
      }
    }

    return (
      <DataRowElement
        ref={forwardedRef}
        clickable={isClickable}
        transition={!isScrolling && !mouseMovedSinceScrollEnd}
        onClick={(e) => handleRowClick(e)}
        {...props}
      />
    );
  }
);

export const DataRow = React.memo(Row);
