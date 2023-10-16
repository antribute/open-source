import { useFieldInfo, useTsController } from '@ts-react/form';
import type { ComboboxProps } from 'components/Combobox';
import { Combobox } from 'components/Combobox';

export type ControlledComboboxProps<T extends unknown[] = string[]> = Omit<
  ComboboxProps<T>,
  'value' | 'name' | 'ref' | 'onBlur'
>;

export const ControlledCombobox = <T extends string[]>({
  ...props
}: ControlledComboboxProps<T>) => {
  const { field, error } = useTsController<string>();

  const { label, placeholder, isOptional } = useFieldInfo();

  const { onChange, value, name, ref } = field;

  return (
    <>
      <Combobox<string[]>
        {...(props as any)}
        name={name}
        isRequired={!isOptional}
        getOptionLabel={(e) => e}
        value={value ?? ''} // conditional to prevent "uncontrolled to controlled" react warning
        onValueChange={(e) => {
          onChange(e);
        }}
        placeholder={placeholder}
        label={label}
        ref={ref}
        error={Boolean(error)}
        errorMessage={error?.errorMessage}
        isMultiSelect={false}
        // onBlur={onBlur}
      />
    </>
  );
};
