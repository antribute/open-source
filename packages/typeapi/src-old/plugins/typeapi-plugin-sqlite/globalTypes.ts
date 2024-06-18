import type { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core';

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var TypeApiPluginSqlite: {
    db: BaseSQLiteDatabase<'sync', unknown>;
  };
}
