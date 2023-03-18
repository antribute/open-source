import { useDescription, useTsController } from '@ts-react/form';
import { Checkbox, CheckboxProps } from 'components/Checkbox/Checkbox';

type ControlledCheckboxProps = Omit<
  CheckboxProps,
  'value' | 'name' | 'onChange' | 'onBlur' | 'ref'
>;

export const ControlledCheckbox = (props: ControlledCheckboxProps) => {
  const { field, error } = useTsController<boolean>();

  const { label } = useDescription();
  const { onChange, value, name, onBlur, ref } = field;
  return (
    <Checkbox
      name={name}
      checked={value} // conditional to prevent "uncontrolled to controlled" react warning
      onBlur={onBlur}
      onCheckedChange={(e) => {
        onChange(Boolean(e));
      }}
      ref={ref}
      error={Boolean(error)}
      message={error?.errorMessage}
      size="md"
      {...props}
      label={label}
    />
  );
};
