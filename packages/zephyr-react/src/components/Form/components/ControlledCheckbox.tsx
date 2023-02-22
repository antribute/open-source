import { useDescription, useTsController } from '@ts-react/form';
import { Checkbox } from 'components/Checkbox/Checkbox';
import { InputProps } from 'components/Input/Input';

type ControlledCheckboxProps = Omit<InputProps, 'value' | 'name' | 'onChange' | 'onBlue' | 'ref'>;

export const ControlledCheckbox = (props: ControlledCheckboxProps) => {
  const { field, error } = useTsController<boolean>();

  const { label } = useDescription();
  const { onChange, value, name, onBlur, ref } = field;
  return (
    <Checkbox
      name={name}
      checked={value} // conditional to prevent "uncontrolled to controlled" react warning
      onBlur={onBlur}
      ref={ref}
      error={Boolean(error)}
      errorMessage={error?.errorMessage}
      size="md"
      {...props}
      label={label}
    />
  );
};
