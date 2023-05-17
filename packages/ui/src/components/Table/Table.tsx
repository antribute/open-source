import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { classed } from 'utils/classed';
import { TableContext, TableProvider } from 'components/Table/Table.context';
import { TableBody } from 'components/Table/components/TableBody';
import { DataRow } from 'components/Table/components/DataRow';
import { DataCell } from 'components/Table/components/DataCell';
import { HeaderCell } from 'components/Table/components/HeaderCell';
import { THeaderElement } from 'components/Table/components/THeaderElement';
import { TableElement } from 'components/Table/components/TableElement';
import type { RowData } from '@tanstack/react-table';
import { CSSProperties, useRef } from 'react';
import { TableHeaderBackground } from 'components/Table/components/TableHeaderBackground';
import { ScrollViewport } from 'components/ScrollViewport';
import { twMerge } from 'tailwind-merge';
import { useTableVirtualizer } from './useTableVirtualizer';
import { ReactTable, ReactTableOptions } from './Table.types';

interface TableComponentMetaProps<TData extends RowData = unknown> {
  onRowClick?: (data: TData) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ReactTableMeta<TData extends RowData> extends TableComponentMetaProps<TData> {}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TableMeta<TData extends RowData> extends ReactTableMeta<TData> {}
}

type UseTableProps<T> = Pick<ReactTableOptions<T>, 'columns' | 'data' | 'meta'>;

export const useTable = <T,>({ data, columns, meta }: UseTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    meta,
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return table;
};

const HeaderRowElement = classed('tr');

interface TableProps<TData extends RowData = unknown>
  extends Omit<UseTableProps<TData>, 'meta'>,
    TableComponentMetaProps<TData> {
  className?: string;
  zebraRows?: boolean;
  filledHeaderBackground?: boolean;
  height?: CSSProperties['height'];
}

function getTableMetaProps<T = unknown>({ onRowClick }: TableProps<T>): TableComponentMetaProps<T> {
  return { onRowClick };
}

export const Table = <T,>({
  className,
  zebraRows,
  filledHeaderBackground,
  height,
  ...props
}: TableProps<T>) => {
  const meta = getTableMetaProps(props);
  const table = useTable({ ...props, meta }) as ReactTable;

  const { rows } = table.getRowModel();

  const {
    tableContainerRef,
    virtualizer,
    getTablePadding,
    isScrolling,
    mouseMovedSinceScrollStart,
    mouseMovedSinceScrollEnd,
    hasScrollOffsetSinceMouseMoveDuringScroll,
  } = useTableVirtualizer({
    rows,
  });

  const ctx: TableContext = {
    table,
  };

  const headerElementRef = useRef<HTMLTableSectionElement>(null);

  return (
    <TableProvider value={ctx}>
      <ScrollViewport.Container className={twMerge('bg-surface', className)}>
        <ScrollViewport.HeaderSection className="h-40"> </ScrollViewport.HeaderSection>
        <ScrollViewport.ScrollAreaContainer className="bg-inherit">
          <TableHeaderBackground headerElementRef={headerElementRef} />
          <ScrollViewport.ScrollAreaViewport ref={tableContainerRef}>
            <TableElement>
              <THeaderElement className="z-30" ref={headerElementRef}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <HeaderRowElement key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <HeaderCell key={header.id} header={header} />
                    ))}
                  </HeaderRowElement>
                ))}
              </THeaderElement>

              <TableBody tablePadding={getTablePadding(virtualizer)}>
                {virtualizer.getVirtualItems().map((virtualRow) => {
                  const row = rows[virtualRow.index]!;
                  return (
                    <DataRow
                      row={row}
                      key={row.id}
                      ref={virtualizer.measureElement}
                      data-index={virtualRow.index}
                      tint={zebraRows && virtualRow.index % 2 !== 0}
                      isScrolling={isScrolling}
                      mouseMovedSinceScrollStart={mouseMovedSinceScrollStart}
                      mouseMovedSinceScrollEnd={mouseMovedSinceScrollEnd}
                      hasScrollOffsetSinceMouseMoveDuringScroll={
                        hasScrollOffsetSinceMouseMoveDuringScroll
                      }
                    >
                      {row.getVisibleCells().map((cell) => (
                        <DataCell key={cell.id} cell={cell} height="50px" />
                      ))}
                    </DataRow>
                  );
                })}
              </TableBody>
            </TableElement>
          </ScrollViewport.ScrollAreaViewport>
        </ScrollViewport.ScrollAreaContainer>
      </ScrollViewport.Container>
    </TableProvider>
  );
};
