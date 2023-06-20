import { Input, TextAreaFieldProps } from 'components/Input';
import { ControlledInputProps, useControlledInput } from './useControlledInput';

export type { ControlledInputProps };

export const ControlledInput = (props: ControlledInputProps) => {
  const controlledInputProps = useControlledInput(props);
  return <Input {...controlledInputProps} />;
};

export type ControlledTextAreaProps = ControlledInputProps<TextAreaFieldProps>;

export const ControlledTextArea = (props: ControlledTextAreaProps) => {
  const controlledInputProps = useControlledInput(props);
  return <Input.TextAreaField {...controlledInputProps} />;
};
