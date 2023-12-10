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

// export type PaginationParams<
//   PaginationMethod extends 'none' | 'cursor' | 'limit-offset',
//   CursorCol extends AnyColumn
// > = PaginationMethod extends 'none'
//   ? {
//       method: 'none';
//     }
//   : PaginationMethod extends 'cursor'
//   ? {
//       method: 'cursor';
//       cursor: GetColumnData<CursorCol> | null;
//       pageSize: number;
//     }
//   : PaginationMethod extends 'limit-offset'
//   ? {
//       method: 'limit-offset';
//       page: number | null;
//       pageSize?: number;
//     }
//   : never;

// export type PaginatedData<
//   PaginationMethod extends 'none' | 'cursor' | 'limit-offset',
//   Row,
//   CursorCol extends AnyColumn
// > = PaginationMethod extends 'none'
//   ? Row[]
//   : PaginationMethod extends 'cursor'
//   ? {
//       data: Row[];
//       pagination: {
//         next: GetColumnData<CursorCol> | null;
//         total: number;
//       };
//     }
//   : PaginationMethod extends 'limit-offset'
//   ? {
//       data: Row[];
//       pagination: {
//         next: number | null;
//         prev: number | null;
//         total: number;
//       };
//     }
//   : never;
// | {
//     method: 'none';
//   }
// | {
//     method: 'cursor';
//     cursor: GetColumnData<CursorCol> | null;
//     pageSize: number;
//   }
// | {
//     method: 'limit-offset';
//     page: number | null;
//     pageSize?: number;
//   };

// export interface PaginationParamsLimitOffset {
//   page?: number;
//   pageSize?: number;
// }

// // TODO: Add cursor pagination in a future PR
// export type PaginationParams<Method extends PaginationMethod> = Method extends 'limit-offset'
//   ? PaginationParamsLimitOffset
//   : Record<string, never>; // Object with no children

// export type PaginatedData<RowShape, Method extends PaginationMethod> = Method extends 'limit-offset'
//   ? {
//       data: RowShape[];
//       pagination: {
//         total: number;
//       };
//     }
//   : RowShape[];
