import { createUniqueFormField } from 'components/Form/Form.helpers';
import type { ControlledInputProps } from 'components/Form/components/ControlledInput';
import { ControlledInput } from 'components/Form/components/ControlledInput';
import { z } from 'zod';

export const EmailFieldComponent = (props: Omit<ControlledInputProps, 'type'>) => {
  return <ControlledInput type="email" {...props} />;
};

export const EmailField = createUniqueFormField({
  uniqueId: 'email',
  schema: z
    .string()
    .describe('Email // example@mail.com')
    .email({ message: 'Enter a valid email' }),
  component: EmailFieldComponent,
});
