import { createUniqueFieldSchema, RTFSupportedZodTypes } from '@ts-react/form';

export function createFormField<
  TSchema extends RTFSupportedZodTypes,
  TComponent extends React.ComponentType
>({ schema, component }: { schema: TSchema; component: TComponent }) {
  return {
    schema,
    component,
    mapping: [schema, component] as const,
  };
}

export function createUniqueFormField<
  TSchema extends RTFSupportedZodTypes,
  TComponent extends React.ComponentType,
  TUniqueId extends string
>(options: { schema: TSchema; component: TComponent; uniqueId: TUniqueId }) {
  const { schema, component, uniqueId } = options;

  const fieldSchema = createUniqueFieldSchema(schema, uniqueId);

  return {
    schema: fieldSchema,
    uniqueId: uniqueId!,
    component,
    mapping: [fieldSchema, component] as const,
  };
}
