import { Buffer } from 'buffer';
import { join } from 'path';

import { output } from '@antribute/typecli';
import { Type } from '@sinclair/typebox';
import type { Static, TSchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { and, asc, eq, gt, sql } from 'drizzle-orm';
import type {
  AnyColumn,
  AnyTable,
  InferColumnsDataTypes,
  InferInsertModel,
  InferSelectModel,
} from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
// import { withCursorPagination } from 'drizzle-pagination';
import { createInsertSchema } from 'drizzle-typebox';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate as drizzleMigrate } from 'drizzle-orm/postgres-js/migrator';
import { execa } from 'execa';
import { HTTPException } from 'hono/http-exception';
import postgres from 'postgres';

import { DatabaseEngine } from 'config';
import type { Config } from 'config';

// @ts-expect-error: Our type generation process will always ensure that this typing extends the
// appropriate type, but we don't get autocompletion if we explicitly define it that way
export type Db = PostgresJsDatabase<TypeAPI.Schema>;

export const ensureModelInputIsValid = (schema: TSchema, value: unknown) => {
  const isValid = Value.Check(schema, value);

  if (isValid) {
    return;
  }
  const errors = [...Value.Errors(schema, value)];
  const errorMessagesByField: Record<string, string[]> = {};
  errors.forEach(({ message, path }) => {
    const property = path.slice(1);
    if (!errorMessagesByField[property]) {
      errorMessagesByField[property] = [message];
      return;
    }
    errorMessagesByField[property] = [...(errorMessagesByField[property] || []), message];
  });
  const message = Object.entries(errorMessagesByField)
    .map(([property, errors]) => `${property} (${errors.join(', ')})`)
    .join(', ');
  throw new HTTPException(422, { message: `The following fields are invalid: ${message}` });
};

export const ensureTableHasPk = (methodName: string, table: AnyTable, primaryKey: AnyColumn) => {
  if (!primaryKey) {
    throw new HTTPException(500, {
      message: `Field "id" not found on model "${table}" for method ${methodName}, manual configuration is required`,
    });
  }
};

// IDs in SQL can be either strings or numbers. This function takes an ID, attempts to convert it
// to an int, and returns it as a string if the conversion fails. I'm not even sure if this is a
// good idea but fuck it we're doing it
export const parseId = (id: unknown) => {
  const idAsString = String(id);
  const idAsInt = Number.parseInt(idAsString, 10);
  return Number.isNaN(idAsInt) ? idAsString : idAsInt;
};

export interface DataMultiItem<DataShape> {
  data: DataShape[];
  pagination?: {
    count: number;
    next: string | null;
    prev: string | null;
  };
}

export interface DataSingleItem<DataShape> {
  data: DataShape;
}

export const createCrudOperations = <Table extends AnyTable, PrimaryKey extends AnyColumn>(
  config: Config,
  db: Db,
  table: Table,
  primaryKey: PrimaryKey
) => {
  const insertSchema = createInsertSchema(table) as unknown as TSchema;
  const updateSchema = Type.Optional(insertSchema);

  type PrimaryKeyInput = InferColumnsDataTypes<{ primaryKey: PrimaryKey }>['primaryKey'];
  type InsertSchema = InferInsertModel<Table>;
  type UpdateSchema = Partial<InsertSchema>;
  type ReturnSchema = InferSelectModel<Table, { dbColumnNames: true }>;

  // db.query.tasks.findMany({ where: {} });

  const createOne = async (value: InsertSchema): Promise<DataSingleItem<ReturnSchema>> => {
    ensureTableHasPk('createOne', table, primaryKey);
    ensureModelInputIsValid(insertSchema, value);

    const data = await db.insert(table).values(value).returning();
    return { data: data[0]! };
  };

  const deleteOne = async (id: PrimaryKeyInput): Promise<DataSingleItem<ReturnSchema>> => {
    ensureTableHasPk('deleteOne', table, primaryKey);

    const data = await db
      .delete(table)
      .where(eq(primaryKey, parseId(id)))
      .returning();
    return { data: data[0]! };
  };

  const readMany = async (params?: {
    pagination?: {
      cursor?: string;
      pageSize?: number;
    };
  }): Promise<DataMultiItem<ReturnSchema>> => {
    ensureTableHasPk('readMany', table, primaryKey);
    const cursor = params?.pagination?.cursor;

    const pageSize = params?.pagination?.pageSize ?? 10;
    const [data, count] = await Promise.all([
      // TODO: Extend this to support custom orderBys
      db
        .select()
        .from(table)
        .orderBy(asc(primaryKey))
        .limit(pageSize)
        .where(cursor ? gt(primaryKey, cursor) : undefined),
      db.select({ count: sql<number>`count(*)` }).from(table),
    ]);

    if (config.database.pagination === 'disabled') {
      return { data };
    }

    // For some reason count is returned as a string here, we need to cast that to a number
    const parsedCount = count?.[0]?.count ? Number(count?.[0]?.count) : 0;
    const nextCursor =
      data.length === pageSize
        ? Buffer.from(`${data?.[0]?.id}-${data?.[data.length - 1]?.id}`).toString('base64')
        : null;

    return {
      data,
      pagination: {
        count: parsedCount,
        next: nextCursor,
        prev: null, // TODO: Implement
      },
    };
  };

  const readOne = async (id: PrimaryKeyInput): Promise<DataSingleItem<ReturnSchema>> => {
    ensureTableHasPk('readOne', table, primaryKey);

    const data = await db
      .select()
      .from(table)
      .where(eq(primaryKey, parseId(id)));
    return { data };
  };

  const updateOne = async (
    id: PrimaryKeyInput,
    value: UpdateSchema
  ): Promise<DataSingleItem<ReturnSchema>> => {
    ensureTableHasPk('updateOne', table, primaryKey);
    ensureModelInputIsValid(updateSchema, value);

    const data = await db
      .update(table)
      // @ts-expect-error: I think this has something to do with the fact that the input object is
      // partial but I'm not sure. Let's see if we can fix this before our initial release
      .set(value)
      .where(eq(primaryKey, parseId(id)))
      .returning();
    return { data: data[0]! };
  };

  return { createOne, deleteOne, readMany, readOne, updateOne };
};

export const createDbConnection = (config: Config, schema?: TypeAPI.Schema) => {
  switch (config.database.engine) {
    case DatabaseEngine.postgresql: {
      const client = postgres(config.database.connectionString);
      // @ts-expect-error: TODO: The fuck is happening here, this follows docs???
      const db = drizzle<TypeAPI.Schema>(client, { schema });
      return db;
    }
    default:
      throw new Error(`Database engine ${config.database.engine} is unsupported at this time`);
  }
};

// Unfortunately we can't programmatically create Drizzle Kit migrations in TypeScript alone. In
// order to get around this, TypeAPI uses process execution (Bun.spawn in Bun and Execa in Node.js)
// to run drizzle-kit like any other command. Here we also insert some args to automatically
// configure drizzle-kit
export const makeMigrations = async (config: Config) => {
  const outDir = join(process.cwd(), config.server.rootDir, 'migrations');
  const additionalArgs = [
    'generate:pg',
    '--schema',
    join(process.cwd(), config.server.rootDir, '**', '*.models.ts'),
    '--out',
    outDir,
  ];
  output.debug('Executing drizzle-kit');
  if (typeof Bun !== 'undefined') {
    await Bun.spawn(['bunx', 'drizzle-kit', ...additionalArgs]).exited;
  } else {
    await execa('npx', ['drizzle-kit', ...additionalArgs]);
  }
  output.debug(`Migrations written to ${outDir}`);
};

export const migrate = async (config: Config) => {
  const db = createDbConnection(config);
  await drizzleMigrate(db, {
    migrationsFolder: join(process.cwd(), config.server.rootDir, 'migrations'),
  });
};
