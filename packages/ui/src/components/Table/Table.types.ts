import type {
  Cell as _Cell,
  ColumnDef as _ColumnDef,
  Header as _Header,
  Row as _Row,
  RowData as _RowData,
  Table as _Table,
  TableOptions as _TableOptions,
} from '@tanstack/react-table';

export type ReactTableOptions<TData = unknown> = _TableOptions<TData>;

export type ReactTable<TData = unknown> = _Table<TData>;

export type Cell<TData = unknown, TValue = unknown> = _Cell<TData, TValue>;

export type Header<TData = unknown, TValue = unknown> = _Header<TData, TValue>;

export type Row<TData = unknown> = _Row<TData>;

export type Rows<TData = unknown> = Row<TData>[];

export type ColumnDef<TData extends _RowData = _RowData, TValue = unknown> = _ColumnDef<
  TData,
  TValue
>;

export type TableColumns<TData extends _RowData> = ColumnDef<TData>[];
