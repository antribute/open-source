// If we don't import this with a variable name, get a "duplicate implementation" error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _unused from '@pothos/plugin-prisma-utils';

// eslint-disable-next-line import/prefer-default-export
export const createCommonFilters = (builder: PothosSchemaTypes.SchemaBuilder<any>) => ({
  IDFilter: builder.prismaFilter('String', {
    ops: ['equals', 'not'],
    name: 'IDFilter',
  }),
  StringFilter: builder.prismaFilter('String', {
    ops: ['contains', 'equals', 'startsWith', 'not', 'equals'],
    name: 'StringFilter',
  }),
});
