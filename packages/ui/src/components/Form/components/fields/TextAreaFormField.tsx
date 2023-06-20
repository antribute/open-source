import { createUniqueFormField } from 'components/Form/Form.helpers';
import { z } from 'zod';
import {
  ControlledTextArea,
  ControlledTextAreaProps,
} from 'components/Form/components/ControlledInput';

export const TextAreaComponent = (props: ControlledTextAreaProps) => {
  return <ControlledTextArea type="text" {...props} />;
};

export const TextAreaFormField = createUniqueFormField({
  uniqueId: 'textAreaField',
  component: TextAreaComponent,
  schema: z.string(),
});
