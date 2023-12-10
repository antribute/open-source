import {
  withCursorPagination,
  withLimitOffsetPagination,
} from '@antribute/drizzle-pagination/sqlite-core';
import { eq, inArray, sql } from 'drizzle-orm';
import type { GetColumnData, SQL } from 'drizzle-orm';
import type { SQLiteTable } from 'drizzle-orm/sqlite-core';
import type { BunSQLiteDatabase } from 'drizzle-orm/bun-sqlite';

import type { ColumnOfTable, PaginatedData, PaginationMethods, PaginationParams } from './shared';

// TODO: Replace BunSQLiteDatabase with generic SQLite
export const createCrudMethods = <
  Db extends BunSQLiteDatabase,
  Table extends SQLiteTable,
  PrimaryKeyCol extends ColumnOfTable<Table>,
  PaginationMethod extends PaginationMethods
>(
  db: Db,
  table: Table,
  primaryKeyCol: PrimaryKeyCol,
  opts: {
    paginationMethod: PaginationMethod;
  }
) => {
  type PrimaryKey = GetColumnData<PrimaryKeyCol>;
  type InsertShape = Table['_']['inferInsert'];
  type UpdateShape = Partial<InsertShape>;
  type ReturnShape = Table['_']['inferSelect'];

  const createOne = async (value: InsertShape): Promise<ReturnShape> => {
    const data = await db.insert(table).values(value).returning();
    return data[0]!;
  };
  const createMany = async (values: InsertShape[]): Promise<ReturnShape[]> => {
    const data = db.insert(table).values(values).returning();

    return data;
  };

  const readOne = async (primaryKey: PrimaryKey): Promise<ReturnShape> => {
    const data = await db.select().from(table).where(eq(primaryKeyCol, primaryKey)).limit(1);
    if (!data[0]) {
      throw new Error('Not Found');
    }
    return data[0];
  };
  const readMany = async (
    where?: SQL,
    pagination?: PaginationParams<PaginationMethod, PrimaryKeyCol>
  ): Promise<PaginatedData<PaginationMethod, ReturnShape, PrimaryKeyCol>> => {
    const query = db.select().from(table).where(where);

    if (opts.paginationMethod === 'cursor') {
      const cPagination = pagination as PaginationParams<'cursor', PrimaryKeyCol>;
      const [rows, count] = await Promise.all([
        withCursorPagination(
          query.$dynamic(),
          primaryKeyCol,
          cPagination?.cursor,
          cPagination?.pageSize
        ),
        db.select({ count: sql<string>`count(*)` }).from(table),
      ]);
      const total = Number(count[0]?.count ?? '0');
      const data = {
        data: rows,
        pagination: {
          next: rows[rows.length - 1]![primaryKeyCol.name],
          total,
        },
      };

      return data as PaginatedData<PaginationMethod, ReturnShape, PrimaryKeyCol>;
    }

    if (opts.paginationMethod === 'limit-offset') {
      const loPagination = pagination as
        | PaginationParams<'limit-offset', PrimaryKeyCol>
        | undefined;
      const [rows, count] = await Promise.all([
        withLimitOffsetPagination(
          query.$dynamic(),
          loPagination?.page ?? null,
          loPagination?.pageSize ?? undefined
        ),
        db.select({ count: sql<string>`count(*)` }).from(table),
      ]);
      const total = Number(count[0]?.count ?? '0');
      const data = {
        data: rows,
        pagination: {
          next:
            loPagination?.page && loPagination.page * (pagination?.pageSize ?? 10) <= total
              ? loPagination.page + 1
              : null,
          prev: loPagination?.page && loPagination.page > 1 ? loPagination.page - 1 : null,
          total,
        },
      };
      return data as PaginatedData<PaginationMethod, ReturnShape, PrimaryKeyCol>;
    }

    const data = await query;
    if (opts.paginationMethod === 'none') {
      return data as PaginatedData<PaginationMethod, ReturnShape, PrimaryKeyCol>;
    }
    throw new Error('Invalid pagination method');
  };

  const updateOne = async (primaryKey: PrimaryKey, value: UpdateShape): Promise<ReturnShape> => {
    const data = await db.update(table).set(value).where(eq(primaryKeyCol, primaryKey)).returning();
    return data[0]!;
  };
  const updateMany = async (
    primaryKeys: PrimaryKey[],
    value: UpdateShape
  ): Promise<ReturnShape[]> => {
    const data = db.update(table).set(value).where(inArray(primaryKeyCol, primaryKeys)).returning();
    return data;
  };

  const deleteOne = async (primaryKey: PrimaryKey): Promise<ReturnShape> => {
    const data = await db.delete(table).where(eq(primaryKeyCol, primaryKey)).returning();
    return data[0]!;
  };
  const deleteMany = async (primaryKeys: PrimaryKey[]): Promise<ReturnShape[]> => {
    const data = await db.delete(table).where(inArray(primaryKeyCol, primaryKeys)).returning();
    return data;
  };

  return {
    createMany,
    createOne,
    deleteMany,
    deleteOne,
    readMany,
    readOne,
    updateMany,
    updateOne,
  };
};
