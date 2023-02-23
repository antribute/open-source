import { ControlledCheckbox } from 'components/Form/components/ControlledCheckbox';
import { z } from 'zod';
import { createUniqueFormField } from 'components/Form/Form.helpers';

export const CheckboxField = createUniqueFormField({
  uniqueId: 'CheckboxField',
  schema: z.boolean({ description: 'Checkbox' }),
  component: ControlledCheckbox,
});
