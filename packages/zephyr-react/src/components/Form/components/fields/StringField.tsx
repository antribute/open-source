import { createUniqueFormField } from 'components/Form/Form.helpers';
import { ControlledInput } from 'components/Form/components/ControlledInput';
import { z } from 'zod';

export const StringFieldComponent = () => {
  return <ControlledInput type="text" />;
};

export const StringField = createUniqueFormField({
  uniqueId: 'stringfield',
  component: StringFieldComponent,
  schema: z.string(),
});
