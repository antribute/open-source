import { useTsController, useFieldInfo } from '@ts-react/form';
import { Input, TextFieldProps } from 'components/Input';
import { O } from 'ts-toolbelt';

export type ControlledInputProps<T = TextFieldProps> = Omit<
  T,
  'value' | 'name' | 'ref' | 'onBlur' | 'onChange' | 'onFocus'
>;

export const useControlledInput = <T,>(props: ControlledInputProps<T>) => {
  const { field, error } = useTsController<string>();

  const { label, placeholder, isOptional } = useFieldInfo();

  const { onChange, value, name, onBlur, ref } = field;

  const handleOnChange = (e: unknown) => {
    onChange(e as string);
  };

  const controlledInputProps = {
    label,
    placeholder,
    value: value ?? '',
    isRequired: !isOptional,
    name,
    onBlur,
    ref,
    onChange: handleOnChange,
    error: Boolean(error),
    errorMessage: error?.errorMessage,
    ...props,
  } satisfies Partial<
    O.Intersect<
      React.ComponentProps<typeof Input>,
      React.ComponentProps<typeof Input.TextAreaField>
    >
  >;

  return controlledInputProps;
};
