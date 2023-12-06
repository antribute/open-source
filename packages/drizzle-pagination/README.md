# Drizzle CRUD

Instant CRUD Methods for Drizzle Models (prototyping has never been faster!)

## Installation

```bash
bun add @antribute/drizzle-crud drizzle-orm
```

## Usage

```typescript
import { createCrudMethods } from '@antribute/typebox-errors';
import { pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/<adapter>';

const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  role: text('role', { enum: ['admin', 'user'] }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

const { createOne, createMany, readOne, readMany, updateOne, updateMany, deleteOne, deleteMany } =
  createCrudMethods(users, users.id, { pagination: 'cursor' });
```
