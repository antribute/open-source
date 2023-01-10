import { createTsForm } from '@ts-react/form';
import { fieldSchema, formMapping } from 'components/Form/components/fields';
import { z } from 'zod';

const Form = createTsForm(formMapping);

const SignUpSchema = z.object({
  email: fieldSchema.email, // renders TextField
  password: z.string(),
  address: z.string(),
  // favoriteColor: z.enum(['blue', 'red', 'purple']), // renders DropDownSelect and passed the enum values
  isOver18: fieldSchema.boolean.describe('Is Over 18'), // renders CheckBoxField
});

export const Default = () => {
  function onSubmit(data: z.infer<typeof SignUpSchema>) {
    // gets typesafe data when form is submitted
  }

  return (
    <Form
      schema={SignUpSchema}
      onSubmit={onSubmit}
      renderAfter={() => <button type="submit">Submit</button>}
    />
  );
};
