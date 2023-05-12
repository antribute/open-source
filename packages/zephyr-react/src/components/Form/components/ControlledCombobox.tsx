import { useDescription, useTsController, useFieldInfo } from '@ts-react/form';
import { Combobox, ComboboxProps } from 'components/Combobox';
import { Input, InputComponentProps } from 'components/Input';

export type ControlledComboboxProps<T extends unknown[] = string[]> = Omit<
  ComboboxProps<T>,
  'value' | 'name' | 'ref' | 'onBlur'
>;

export const ControlledCombobox = <T extends string[]>({
  ...props
}: ControlledComboboxProps<T>) => {
  const { field, error } = useTsController<string>();

  const { label, placeholder, isOptional } = useFieldInfo();

  const { onChange, value, name, onBlur, ref } = field;

  return (
    <>
      <Combobox
        isMultiSelect={false}
        // isRequired={!isOptional}
        value={value ?? ''} // conditional to prevent "uncontrolled to controlled" react warning
        onValueChange={(e) => {
          onChange(e);
        }}
        required={!isOptional}
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
