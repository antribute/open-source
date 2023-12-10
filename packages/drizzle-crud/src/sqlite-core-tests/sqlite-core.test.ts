import { join } from 'path';

import { Database } from 'bun:sqlite';
import { beforeAll, describe, expect, it } from 'bun:test';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';

import { eq } from 'drizzle-orm';
import { createCrudMethods } from '../sqlite-core';
import { users } from './sqlite-core.schema';

describe.only('createCrudMethods', () => {
  const sqlite = new Database(':memory:');
  const db = drizzle(sqlite);
  const methods = createCrudMethods(db, users, users.id, { paginationMethod: 'none' });

  // Unfortunately apply migrations before we can test because SQL is the way it is
  beforeAll(async () => {
    await migrate(db, { migrationsFolder: join(import.meta.dir, 'migrations') });
  });

  it('should create CRUD methods for singular and multiple items', () => {
    expect(methods).toHaveProperty('createOne');
    expect(methods).toHaveProperty('createMany');
    expect(methods).toHaveProperty('readOne');
    expect(methods).toHaveProperty('readMany');
    expect(methods).toHaveProperty('updateOne');
    expect(methods).toHaveProperty('updateMany');
    expect(methods).toHaveProperty('deleteOne');
    expect(methods).toHaveProperty('deleteMany');
  });

  it('should insert a single record when createOne is called', async () => {
    const data = await methods.createOne({
      id: 0,
      email: 'karlach@example.net',
      name: 'Karlach',
      role: 'user',
    });

    expect(() => methods.readOne(0)).not.toThrow();
    expect(data.id).toEqual(0);
    expect(new Date(data.createdAt)).toBeDate();
    expect(data.email).toEqual('karlach@example.net');
    expect(data.name).toEqual('Karlach');
    expect(data.role).toEqual('user');
  });

  it('should insert multiple records when createMany is called', async () => {
    const data = await methods.createMany([
      {
        id: 1,
        email: 'astarion@example.net',
        name: 'Astarion',
        role: 'user',
      },
      {
        id: 2,
        email: 'minthara@example.net',
        name: 'Minthara',
        role: 'admin',
      },
    ]);

    expect(data[0]!.id).toEqual(1);
    expect(new Date(data[0]!.createdAt)).toBeDate();
    expect(data[0]!.email).toEqual('astarion@example.net');
    expect(data[0]!.name).toEqual('Astarion');
    expect(data[0]!.role).toEqual('user');

    expect(data[1]!.id).toEqual(2);
    expect(new Date(data[1]!.createdAt)).toBeDate();
    expect(data[1]!.email).toEqual('minthara@example.net');
    expect(data[1]!.name).toEqual('Minthara');
    expect(data[1]!.role).toEqual('admin');

    const allData = await methods.readMany();
    expect(allData).toHaveLength(3);
  });

  it('should fetch a single record when readOne is called with a valid primary key', async () => {
    const data = await methods.readOne(0);
    expect(data.id).toEqual(0);
    expect(new Date(data.createdAt)).toBeDate();
    expect(data.email).toEqual('karlach@example.net');
    expect(data.name).toEqual('Karlach');
    expect(data.role).toEqual('user');
  });

  it('should throw when readOne is called with an invalid primary key', () => {
    expect(() => methods.readOne(-1)).toThrow(new Error('Not Found'));
  });

  it('should fetch multiple records with no pagination when readMany is called with pagination method none', async () => {
    const data = await methods.readMany();
    expect(data).toHaveLength(3);
  });

  it('should fetch multiple records with limit/offset pagination when readMany is called with pagination method limit-offset', async () => {
    const loMethods = createCrudMethods(db, users, users.id, { paginationMethod: 'limit-offset' });
    const { data, pagination } = await loMethods.readMany(undefined, {
      page: 2,
      pageSize: 1,
    });
    expect(data).toHaveLength(1);
    expect(data[0]!.id).toBe(2);
    expect(pagination.next).toBe(3);
  });

  it('should fetch multiple records with cursor pagination when readMany is called with pagination method cursor', async () => {
    const cursorMethods = createCrudMethods(db, users, users.id, { paginationMethod: 'cursor' });
    const { data, pagination } = await cursorMethods.readMany(undefined, {
      cursor: 1,
      pageSize: 1,
    });
    expect(data).toHaveLength(1);
    expect(data[0]!.id).toBe(2);
    expect(pagination.next).toBe(2);
  });

  it('should filter data when where parameter is passed to readMany', async () => {
    const data = await methods.readMany(eq(users.role, 'admin'));
    expect(data).toHaveLength(1);
  });

  it('should update when updateOne is called with a valid primary key', async () => {
    const data = await methods.updateOne(2, { role: 'user' });
    expect(data.role).toEqual('user');

    const allAdmins = await methods.readMany(eq(users.role, 'admin'));
    expect(allAdmins).toHaveLength(0);
  });

  it('should update many when updateMany is called with a valid array of primary keys', async () => {
    const data = await methods.updateMany([0, 1, 2], { role: 'admin' });
    expect(data[0]!.role).toEqual('admin');
    expect(data[1]!.role).toEqual('admin');
    expect(data[2]!.role).toEqual('admin');

    const allAdmins = await methods.readMany(eq(users.role, 'admin'));
    expect(allAdmins).toHaveLength(3);
  });

  it('should delete when deleteOne is called with a valid primary key', async () => {
    const data = await methods.deleteOne(0);
    expect(data.id).toEqual(0);
    expect(() => methods.readOne(0)).toThrow(new Error('Not Found'));

    const allData = await methods.readMany();
    expect(allData).toHaveLength(2);
  });

  it('should delete many when deleteMany is called with a valid array of primary keys', async () => {
    const data = await methods.deleteMany([1, 2]);
    expect(data[0]!.id).toEqual(1);
    expect(data[1]!.id).toEqual(2);

    const allData = await methods.readMany();
    expect(allData).toHaveLength(0);
  });
});
