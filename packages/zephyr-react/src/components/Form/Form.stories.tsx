import { createTsForm } from '@ts-react/form';
import { Button } from 'components/Button';
import { z } from 'zod';
import { EmailField } from 'components/Form/components/fields/EmailField';
import { StringField } from 'components/Form/components/fields/StringField';
import { CheckboxField } from 'components/Form/components/fields/CheckboxField';
import { createFormSchema } from 'components/Form/createFormSchema';

const { mappings, schemas } = createFormSchema([EmailField, CheckboxField, StringField]);

const Form = createTsForm(mappings);

const SignUpSchema = z.object({
  email: schemas.email,
  name: schemas.stringfield.describe('User name // Enter username'),
  // checked: schemas.CheckboxField,
});

export const Default = () => {
  return (
    <Form
      formProps={{ className: 'flex items-center gap-16' }}
      schema={SignUpSchema}
      onSubmit={(d) => {
        console.log('SUBMIT');
      }}
      props={{
        email: {},
        name: {},
        checked: { hideLabel: false, hideMessage: false, className: 'inline-block' },
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
