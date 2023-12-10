# Drizzle CRUD

Instant CRUD Methods for Drizzle Models (prototyping has never been faster!)

## Installation

```bash
bun add @antribute/drizzle-crud drizzle-orm
```

## Warning

Due to a lack of `.returning()` support in MySQL, this package does not support MySQL at this time.
This is something we plan on adding in the near future, but as of right now we only support
PostgreSQL and SQLite.

## Usage

```typescript
// This example uses SQLite but works practically the same with Postgres

import { createCrudMethods } from '@antribute/drizzle-crud/sqlite-core';
import { Database } from 'bun:sqlite';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/bun-sqlite';

const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  role: text('role', { enum: ['admin', 'user'] }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

const sqlite = new Database(':memory:');
const db = drizzle(sqlite);

const usersMethods = createCrudMethods(db, users, users.id, { paginationMethod: 'limit-offset' });

// userMethods.createMany() is also available for batch inserts
const newUser = await usersMethods.createOne({
  name: 'My Super Cool User',
  email: 'someone@example.net',
  role: 'user',
});

const user = await usersMethods.readOne(newUser.id);
const allAdmins = await userMethods.readMany(eq(user.role, 'admin'));

// userMethods.updateMany() is also available for batch updates
await userMethods.updateOne(newUser.id, { role: 'admin' });

// userMethods.deleteMany() is also available for batch deletes
await userMethods.deleteOne(newUser.id);
```
