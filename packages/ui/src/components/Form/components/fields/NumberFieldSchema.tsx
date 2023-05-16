import { createUniqueFormField } from 'components/Form/Form.helpers';
import { Input } from 'components/Input/Input';
import { z } from 'zod';

export const NumberField = createUniqueFormField({
  uniqueId: 'number',
  schema: z.number(),
  component: Input,
});
