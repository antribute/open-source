import { useTsController, useFieldInfo } from '@ts-react/form';
import { Input, TextFieldProps } from 'components/Input';

export type ControlledInputProps = Omit<TextFieldProps, 'value' | 'name' | 'ref' | 'onBlur'>;

export const ControlledInput = ({ onChange: onChangeProp, ...props }: ControlledInputProps) => {
  const { field, error } = useTsController<string>();

  const { label, placeholder, isOptional } = useFieldInfo();

  const { onChange, value, name, onBlur, ref } = field;

  return (
    <>
      <Input
        name={name}
        isRequired={!isOptional}
        value={value ?? ''} // conditional to prevent "uncontrolled to controlled" react warning
        onChange={(e) => {
          onChange(e);
          onChangeProp?.(e);
        }}
        placeholder={placeholder}
        label={label}
        onBlur={onBlur}
        ref={ref}
        error={Boolean(error)}
        errorMessage={error?.errorMessage}
        {...props}
      />
    </>
  );
};
