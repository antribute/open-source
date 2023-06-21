import { createUniqueFormField } from 'components/Form/Form.helpers';
import {
  ControlledCombobox,
  ControlledComboboxProps,
} from 'components/Form/components/ControlledCombobox';
import { z } from 'zod';

export const SelectFieldComponent = (props: ControlledComboboxProps) => {
  return <ControlledCombobox {...props} isMultiSelect={false} />;
};

export const SelectField = createUniqueFormField({
  uniqueId: 'selectField',
  schema: z.string(),
  component: SelectFieldComponent,
});
