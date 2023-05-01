export interface PothosBuilderTemplate {
  additionalImports: string;
  body: string;
  plugins: { name: string; from: string }[];
  typings: { name: string; value: string }[];
}
export const pothosBuilderTemplate = `//
// Autogenerated by \`@antribute/backend-cli\`
// Any modifications will be overwritten on subsequent runs.
//

import SchemaBuilder from '@pothos/core';
{{#each plugins}}import {{name}} from '{{from}}';\n{{/each}}
{{additionalImports}}

const builder = new SchemaBuilder<{
  {{#each typings}}{{name}}: {{value}};\n{{/each}}
}>({
  plugins: [{{#each plugins}}{{name}}, {{/each}}],
  {{body}}
});

builder.queryType({});
builder.mutationType({});

export default builder;
`;

export interface PothosSchemaTemplate {
  modules: string[];
}
export const pothosSchemaTemplate = `//
// Autogenerated by \`@antribute/backend-cli\`
// Any modifications will be overwritten on subsequent runs.
//

import { writeFile } from 'fs/promises';
import { printSchema, lexicographicSortSchema } from 'graphql';
import { join } from 'path';
import builder from './pothos/builder';

{{#each modules}}import '..{{this}}';{{/each}}

const schema = builder.toSchema();

const schemaAsString = printSchema(lexicographicSortSchema(schema));
writeFile(join('.', 'schema.graphql'), schemaAsString).catch((err) => {
  console.warn('An error occurred while generating your static GraphQL Schema:', err);
});

export default schema;
`;

export interface PothosIndexTemplate {
  usePrisma: boolean;
}
export const pothosIndexTemplate = `//
// Autogenerated by \`@antribute/backend-cli\`
// Any modifications will be overwritten on subsequent runs.
//
import builder from './builder';

{{#if usePrisma}}
export const IDFilter = builder.prismaFilter('String', {
  ops: ['equals', 'not'],
  name: 'IDFilter',
});
export const StringFilter = builder.prismaFilter('String', {
  ops: ['contains', 'equals', 'startsWith', 'not', 'equals'],
  name: 'StringFilter',
});
{{/if}}

export interface PaginatedObject<Obj = unknown> {
  count: number;
  next?: string;
  objects: Obj[];
  prev?: string;
}

export const buildPaginatedObj = <ObjectType>(type: any, description?: string) => {
  const ObjRef = builder.objectRef<PaginatedObject<ObjectType>>(\`Paginated\${type.name}\`);
  return builder.objectType(ObjRef, {
    description,
    fields: (t) => ({
      count: t.exposeInt('count'),
      next: t.exposeString('next', { nullable: true }),
      objects: t.expose('objects', { type: [type] }),
      prev: t.exposeString('prev', { nullable: true }),
    })
  })
}

export const PaginationInput = builder.inputType('PaginationInput', {
  fields: (t) => ({
    cursor: t.string({ required: true }),
    take: t.int({ required: true }),
  }),
});

export interface PaginationParams {
  cursor?: string;
  take?: number;
}

export { builder };
`;
