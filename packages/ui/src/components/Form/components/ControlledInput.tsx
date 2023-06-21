import { Input } from 'components/Input';
import type { NumberFieldProps, TextAreaFieldProps } from 'components/Input';
import { useControlledInput } from './useControlledInput';
import type { ControlledInputProps } from './useControlledInput';

export type { ControlledInputProps };

export const ControlledInput = (props: ControlledInputProps) => {
  const controlledInputProps = useControlledInput(props, { fallbackValue: '' });
  return <Input {...controlledInputProps} />;
};

export type ControlledNumberInputProps = ControlledInputProps<NumberFieldProps>;

export const ControlledNumberInput = (props: ControlledNumberInputProps) => {
  const controlledInputProps = useControlledInput(props);
  return <Input.NumberField {...controlledInputProps} />;
};

export type ControlledTextAreaProps = ControlledInputProps<TextAreaFieldProps>;

export const ControlledTextArea = (props: ControlledTextAreaProps) => {
  const controlledInputProps = useControlledInput(props);
  return <Input.TextAreaField {...controlledInputProps} />;
};
