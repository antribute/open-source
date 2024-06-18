import type { AnyColumn, GetColumnData, Table } from 'drizzle-orm';

export type PaginationMethods = 'cursor' | 'limit-offset' | 'none';

export type ColumnOfTable<TableShape extends Table> =
  TableShape['_']['columns'][keyof TableShape['_']['columns']];

// Most of our pagination code is handled inside of @antribute/drizzle-pagination, however since we
// auto-generate pagination for readAll we have to do a little bit of duplication here

export type PaginationParamsNone = Record<string, never>;

export interface PaginationParamsCursor<CursorCol extends AnyColumn = AnyColumn> {
  cursor: GetColumnData<CursorCol> | null;
  pageSize: number;
}

export interface PaginationParamsLimitOffset {
  page: number | null;
  pageSize?: number;
}

export type PaginationParams<
  PaginationMethod extends PaginationMethods,
  CursorCol extends AnyColumn
> = PaginationMethod extends 'cursor'
  ? PaginationParamsCursor<CursorCol>
  : PaginationMethod extends 'limit-offset'
  ? PaginationParamsLimitOffset
  : PaginationMethod extends 'none'
  ? PaginationParamsNone
  : never;

export type PaginatedDataNone<RowType> = RowType[];

export interface PaginatedDataCursor<Row, CursorCol extends AnyColumn> {
  data: Row[];
  pagination: {
    next: GetColumnData<CursorCol> | null;
    total: number;
  };
}

export interface PaginatedDataLimitOffset<Row> {
  data: Row[];
  pagination: {
    next: number | null;
    prev: number | null;
    total: number;
  };
}

export type PaginatedData<
  PaginationMethod extends PaginationMethods,
  Row,
  CursorCol extends AnyColumn
> = PaginationMethod extends 'cursor'
  ? PaginatedDataCursor<Row, CursorCol>
  : PaginationMethod extends 'limit-offset'
  ? PaginatedDataLimitOffset<Row>
  : PaginationMethod extends 'none'
  ? PaginatedDataNone<Row>
  : never;

export type Methods =
  | 'createOne'
  | 'createMany'
  | 'deleteOne'
  | 'deleteMany'
  | 'readOne'
  | 'readMany'
  | 'updateOne'
  | 'updateMany';
