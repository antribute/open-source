import { createUniqueFormField } from 'components/Form/Form.helpers';
import { ControlledInput } from 'components/Form/components/ControlledInput';
import { z } from 'zod';
import { parse as parseColor } from 'culori';

export const StringFieldComponent = () => {
  return <ControlledInput />;
};

function isValidColor(value: string) {
  return Boolean(parseColor(value));
}

export const StringField = createUniqueFormField({
  uniqueId: 'color',
  component: StringFieldComponent,
  schema: z.string().refine(isValidColor, { message: 'Invalid color' }),
});
