/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import { createTsForm } from '@ts-react/form';
import { Button } from 'components/Button';
import { z } from 'zod';
import { EmailField } from 'components/Form/components/fields/EmailField';
import { StringField } from 'components/Form/components/fields/StringField';
import { CheckboxField } from 'components/Form/components/fields/CheckboxField';
import { createFormSchema } from 'components/Form/createFormSchema';

const { mappings, schemas } = createFormSchema([EmailField, CheckboxField, StringField]);

const Form = createTsForm(mappings);

const meta = {
  args: {},
  title: 'Form/Form',
  component: Form,
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const SignUpSchema = z.object({
  email: schemas.email,
  name: schemas.stringField.describe('User name // Enter username'),
  // checked: schemas.CheckboxField,
});

export const Default: Story = {
  // @ts-expect-error: @Tyler let's actually get storybook 7 setup correctly sometime
  args: {},
  render: () => (
    <Form
      formProps={{ className: 'flex items-center gap-16' }}
      schema={SignUpSchema}
      onSubmit={() => {
        console.log('SUBMIT');
      }}
      props={{
        email: {},
        name: {},
      }}
      renderAfter={() => (
        <div className="col-span-full row-end-auto">
          <Button size="md" type="submit">
            Submit
          </Button>
        </div>
      )}
    />
  ),
};
