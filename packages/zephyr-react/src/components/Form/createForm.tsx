import { createTsForm, useTsController } from '@ts-react/form';
import { CheckboxField } from 'components/Form/components/fields/CheckboxField';
import { fields } from './components/fields';
import { createFormSchema } from 'components/Form/createFormSchema';
import { useFormContext } from 'react-hook-form';
import { EmailField } from 'components/Form/components/fields/EmailField';
import { SelectField } from 'components/Form/components/fields/SelectField';
import { twMerge } from 'tailwind-merge';

export function createForm() {
  const { NumberField, StringField, CheckboxField } = fields;
  const { mappings, schemas } = createFormSchema([
    NumberField,
    StringField,
    CheckboxField,
    EmailField,
    SelectField,
  ]);

  const Form = createTsForm(mappings, { FormComponent });

  return { Form, schemas };
}

function FormComponent(props: {
  className?: string;
  onSubmit?: () => void;
  children: React.ReactNode;
  preventDefaultOnSubmit?: boolean;
  resetOnSubmit?: boolean;
}) {
  const {
    children,

    onSubmit,
    className,
    preventDefaultOnSubmit = true,
    resetOnSubmit = true,
    ...rest
  } = props;

  const { formState, reset } = useFormContext();

  return (
    <form
      noValidate
      className={twMerge('flex gap-8 wrap', className)}
      {...rest}
      onSubmit={(e) => {
        if (preventDefaultOnSubmit) {
          e.preventDefault();
        }

        onSubmit?.();

        if (resetOnSubmit) {
          reset();
        }
      }}
    >
      {children}
    </form>
  );
}
