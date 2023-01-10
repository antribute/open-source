import { ControlledCheckbox } from 'components/Form/components/ControlledCheckbox';
import { z } from 'zod';

export type BooleanFieldId = 'boolean';

export const BooleanFieldSchema = z.boolean({ description: 'Checkbox' });

export const BooleanFieldFormMapping = [BooleanFieldSchema, ControlledCheckbox] as const;
