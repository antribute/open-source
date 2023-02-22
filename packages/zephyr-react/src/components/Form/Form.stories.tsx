import { createTsForm } from '@ts-react/form';
import { Button } from 'components/Button';
import { fieldSchema, formMapping } from 'components/Form/components/fields';
import { z } from 'zod';

const Form = createTsForm(formMapping);

const SignUpSchema = z.object({
  email: fieldSchema.email, // renders TextField
  password: z.string().describe('Password'),
  address: z.string().describe('Address'),
  // favoriteColor: z.enum(['blue', 'red', 'purple']), // renders DropDownSelect and passed the enum values
  isOver18: fieldSchema.boolean.describe('Is Over 18'), // renders CheckBoxField
});

export const Default = () => {
  const onSubmit = () => {
    // gets typesafe data when form is submitted
  };

  return (
    <Form
      formProps={{ className: 'grid grid-cols-5' }}
      schema={SignUpSchema}
      onSubmit={onSubmit}
      props={{
        address: { beforeElement: <div>Beofre</div>, afterElement: <div>After</div> },
      }}
      renderAfter={() => (
        <div className="col-span-full row-end-auto">
          <Button size="md" type="submit">
            Submit
          </Button>
        </div>
      )}
    />
  );
};
