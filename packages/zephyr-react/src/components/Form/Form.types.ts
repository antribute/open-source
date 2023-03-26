import { RTFSupportedZodTypes } from '@ts-react/form';
import type { z } from 'zod';

export interface FormFieldSchemaData {
  schema: z.ZodBranded<RTFSupportedZodTypes, string>;
  uniqueId: string;
  component: React.ComponentType;
  mapping: readonly [z.ZodBranded<RTFSupportedZodTypes, string>, React.ComponentType];
}
