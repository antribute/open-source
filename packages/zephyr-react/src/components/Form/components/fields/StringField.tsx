import { ControlledInput } from 'components/Form/components/ControlledInput';
import { z } from 'zod';

export type StringFieldId = 'string';

const StringField = () => {
  return <ControlledInput type="text" />;
};

export const StringFieldSchema = z.string();

export const StringFieldFormMapping = [StringFieldSchema, StringField] as const;
