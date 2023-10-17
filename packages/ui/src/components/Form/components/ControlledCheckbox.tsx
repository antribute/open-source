import { useDescription, useTsController } from '@ts-react/form';
import type { CheckboxFieldProps } from 'components/Input';
import { Input } from 'components/Input';

export type ControlledCheckboxProps = Omit<
  CheckboxFieldProps,
  'value' | 'name' | 'onChange' | 'onBlur' | 'ref'
>;

export const ControlledCheckbox = (props: ControlledCheckboxProps) => {
  const { field, error } = useTsController<boolean>();

  const { label } = useDescription();
  const { onChange, value, name, onBlur, ref } = field;
  return (
    <Input.CheckboxField
      name={name}
      isSelected={value} // conditional to prevent "uncontrolled to controlled" react warning
      onBlur={onBlur}
      onChange={(e) => {
        onChange(e);
      }}
      ref={ref}
      error={Boolean(error)}
      errorMessage={error?.errorMessage}
      size="md"
      {...props}
      label={label}
    />
  );
};
