import {
  EmailFieldFormMapping,
  EmailFieldId,
  EmailFieldSchema,
} from 'components/Form/components/fields/EmailField';
import {
  NumberFieldFormMapping,
  NumberFieldId,
} from 'components/Form/components/fields/NumberFieldSchema';
import {
  StringFieldFormMapping,
  StringFieldId,
  StringFieldSchema,
} from 'components/Form/components/fields/StringField';
import {
  BooleanFieldFormMapping,
  BooleanFieldId,
  BooleanFieldSchema,
} from 'components/Form/components/fields/BooleanFieldSchema';

export type FieldId = EmailFieldId | StringFieldId | NumberFieldId | BooleanFieldId;

export const fieldSchema = {
  string: StringFieldSchema,
  number: StringFieldSchema,
  email: EmailFieldSchema,
  boolean: BooleanFieldSchema,
} as const satisfies Record<FieldId, any>;

const formMappingMap = {
  string: StringFieldFormMapping,
  number: NumberFieldFormMapping,
  email: EmailFieldFormMapping,
  boolean: BooleanFieldFormMapping,
} as const satisfies Record<FieldId, any>;

export const formMapping = Object.values(formMappingMap);
