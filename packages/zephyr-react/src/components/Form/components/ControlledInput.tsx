import { useDescription, useTsController } from '@ts-react/form';
import { Input, InputProps } from 'components/Input/Input';

export type ControlledInputProps = Omit<
  InputProps,
  'value' | 'name' | 'onChange' | 'onBlue' | 'ref'
>;

export const ControlledInput = (props: ControlledInputProps) => {
  const { field, error } = useTsController<string>();

  const { label, placeholder } = useDescription();

  const { onChange, value, name, onBlur, ref } = field;

  return (
    <Input
      name={name}
      value={value ?? ''} // conditional to prevent "uncontrolled to controlled" react warning
      onChange={(e) => {
        onChange(e.target.value);
      }}
      placeholder={placeholder}
      label={label}
      onBlur={onBlur}
      ref={ref}
      error={Boolean(error)}
      errorMessage={error?.errorMessage}
      {...props}
    />
  );
};
