import { z } from 'zod';
import { createUniqueFormField } from 'components/Form/Form.helpers';
import type { ControlledNumberInputProps } from '../ControlledInput';
import { ControlledNumberInput } from '../ControlledInput';

export const NumberFieldComponent = (props: ControlledNumberInputProps) => {
  return <ControlledNumberInput {...props} />;
};

export const NumberField = createUniqueFormField({
  uniqueId: 'numberField',
  component: NumberFieldComponent,
  schema: z.string(),
});
