import { Input } from 'components/Input/Input';
import { z } from 'zod';

export type NumberFieldId = 'number';

export const NumberFieldSchema = z.number();

export const NumberFieldFormMapping = [NumberFieldSchema, Input] as const;
