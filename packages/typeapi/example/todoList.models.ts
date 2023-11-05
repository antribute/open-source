import { boolean, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  isCompleted: boolean('isCompleted').default(false),
  name: text('name').notNull(),
});
