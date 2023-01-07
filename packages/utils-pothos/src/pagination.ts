import '@pothos/core';

type TypesWithDefaults = PothosSchemaTypes.ExtendDefaultTypes<any>;

export interface PaginatedObject<Obj = unknown> {
  count: number;
  objects: Obj[];
}

export const createPaginationInputType = (
  builder: PothosSchemaTypes.SchemaBuilder<TypesWithDefaults>
) =>
  builder.inputType('PaginationInput', {
    fields: (t) => ({
      skip: t.int({ required: true }),
      take: t.int({ required: true }),
    }),
  });

export interface PaginationParams {
  skip?: number;
  take?: number;
}

export interface WithPaginationParams {
  skip?: unknown;
  take?: unknown;
}

export const withPagination = (
  params: WithPaginationParams | null | undefined
): PaginationParams => {
  const val: PaginationParams = {};
  if (typeof params?.skip === 'number') {
    val.skip = params.skip;
  }
  if (typeof params?.take === 'number') {
    val.take = params.take;
  }
  return val;
};
