import '@pothos/core';

type TypesWithDefaults = PothosSchemaTypes.ExtendDefaultTypes<any>;

export interface OperationStatusShape {
  success: boolean;
}

export const createOperationStatusObject = (
  builder: PothosSchemaTypes.SchemaBuilder<TypesWithDefaults>
) => {
  const OperationStatusRef = builder.objectRef<OperationStatusShape>('OperationStatus');
  const OperationStatus = builder.objectType(OperationStatusRef, {
    fields: (t) => ({
      count: t.exposeBoolean('success'),
    }),
  });
  return OperationStatus;
};
