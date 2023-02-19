import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { classed } from 'utils/classed';
import { TableContext, TableProvider } from 'components/Table/Table.context';
import { TableBody } from 'components/Table/components/TableBody';
import { DataRow } from 'components/Table/components/DataRow';
import { DataCell } from 'components/Table/components/DataCell';
import { HeaderCell } from 'components/Table/components/HeaderCell';
import { TableContainer } from 'components/Table/components/TableContainer';
import { THeaderElement } from 'components/Table/components/THeaderElement';
import { TableElement } from 'components/Table/components/TableElement';
import type { RowData } from '@tanstack/react-table';
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
    getCoreRowModel: getCoreRowModel(),
  });

  return table;
};

const HeaderRowElement = classed('tr');

interface TableProps<TData extends RowData = unknown>
  extends Omit<UseTableProps<TData>, 'meta'>,
    TableComponentMetaProps<TData> {}

function getTableMetaProps<T = unknown>({ onRowClick }: TableProps<T>): TableComponentMetaProps<T> {
  return { onRowClick };
}

export const Table = <T,>({ ...props }: TableProps<T>) => {
  const meta = getTableMetaProps(props);
  const table = useTable({ ...props, meta }) as ReactTable;

  const { rows } = table.getRowModel();

  const { tableContainerRef, virtualRows, rowVirtualizer, tablePadding } = useTableVirtualizer({
    rows,
  });

  const ctx: TableContext = {
    table,
  };

  return (
    <TableProvider value={ctx}>
      <div className="h-400 overflow-auto" ref={tableContainerRef}>
        <TableElement>
          <THeaderElement>
            {table.getHeaderGroups().map((headerGroup) => (
              <HeaderRowElement key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <HeaderCell key={header.id} header={header} />
                ))}
              </HeaderRowElement>
            ))}
          </THeaderElement>

          <TableBody tablePadding={tablePadding}>
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index]!;

              return (
                <DataRow
                  row={row}
                  key={virtualRow.key}
                  ref={rowVirtualizer.measureElement}
                  data-index={virtualRow.index}
                >
                  {row.getVisibleCells().map((cell) => (
                    <DataCell key={cell.id} cell={cell} />
                  ))}
                </DataRow>
              );
            })}
          </TableBody>
        </TableElement>
      </div>
    </TableProvider>
  );
};
