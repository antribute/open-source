import { gt } from 'drizzle-orm';
import type { GetColumnData } from 'drizzle-orm';
import type { PgColumn, PgSelect } from 'drizzle-orm/pg-core';

/**
 * Wraps a Drizzle query and returns a cursor paginated result
 */
export const withCursorPagination = <QbType extends PgSelect, CursorCol extends PgColumn>(
  qb: QbType,
  cursorCol: CursorCol,
  cursor: GetColumnData<CursorCol> | null,
  pageSize: number = 10
) => {
  // TODO: We need to support multi-cursor values for fallback pagination / sorting. This will be
  // required for the TypeAPI MVP but I'm fine skipping this to get this first PR in. I'll write a
  // Linear ticket for this to remember to get it done
  if (cursor !== null) {
    qb.orderBy(cursorCol).limit(pageSize).where(gt(cursorCol, cursor));
  }
  return qb.orderBy(cursorCol).limit(pageSize);
};

/**
 * Wraps a Drizzle query and returns a limit / offset paginated result
 */
export const withLimitOffsetPagination = <QbType extends PgSelect>(
  qb: QbType,
  page: number | null,
  pageSize = 10
) => {
  if (page !== null && page > 1) {
    return qb.limit(pageSize).offset(page * pageSize);
  }
  return qb.limit(pageSize);
};
