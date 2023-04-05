import { List } from 'ts-toolbelt';
import { keyBy, mapValues } from 'lodash-es';
import { FormFieldSchemaData } from 'components/Form/Form.types';

type ArrTransform<T extends Readonly<FormFieldSchemaData[]>> = {
  [I in keyof T]: T[I] extends { mapping: infer V } ? V : never;
};

type ToObj<T extends readonly FormFieldSchemaData[]> = { [K in keyof T]: T[K]['uniqueId'] };

export function createFormSchema<T extends readonly FormFieldSchemaData[]>(fieldType: T) {
  type UniqueIdArr = { [K in keyof ToObj<T>]: ToObj<T>[K] };

  const schemas = mapValues(
    keyBy(fieldType, (e) => e.uniqueId),
    (e) => e.schema
  );

  return {
    mappings: fieldType.map((e) => e.mapping),
    schemas,
  } as unknown as {
    schemas: List.ZipObj<UniqueIdArr, { [K in keyof T]: T[K]['schema'] }>;
    mappings: ArrTransform<T>;
  };
}
