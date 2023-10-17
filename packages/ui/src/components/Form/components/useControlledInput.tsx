import { useFieldInfo, useTsController } from '@ts-react/form';
import type { Input, TextFieldProps } from 'components/Input';
import type { O } from 'ts-toolbelt';

export type ControlledInputProps<T = TextFieldProps> = Omit<
  T,
  'value' | 'name' | 'ref' | 'onBlur' | 'onChange' | 'onFocus'
>;

export const useControlledInput = <T,>(props: T, options?: { fallbackValue?: unknown }) => {
  const { field, error } = useTsController();
  const { fallbackValue } = options ?? {};

  const { label, placeholder, isOptional } = useFieldInfo();

  const { onChange, value, name, onBlur, ref } = field;

  const handleOnChange = (e: unknown) => {
    onChange(e as string);
  };

  const controlledInputProps = {
    label,
    placeholder,
    value: (value ?? fallbackValue) as never,
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
