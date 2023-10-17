import { z } from 'zod';
import { createUniqueFormField } from 'components/Form/Form.helpers';
import type { ControlledInputProps } from '../ControlledInput';
import { ControlledInput } from '../ControlledInput';

export const StringFieldComponent = (props: ControlledInputProps) => {
  return <ControlledInput type="text" {...props} />;
};

export const StringField = createUniqueFormField({
  uniqueId: 'stringField',
  component: StringFieldComponent,
  schema: z.string(),
});
