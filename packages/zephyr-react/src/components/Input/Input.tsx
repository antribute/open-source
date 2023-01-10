import { forwardRef, useId } from 'react';
import { InputContainer, InputContainerProps } from 'components/Input/InputContainer';
import { BaseInput, BaseInputProps } from 'components/BaseInput/BaseInput';
import { getInputMessageStatePair } from 'components/Input/Input.helpers';
import { InputComponentStateMessageProps } from 'types/input-component.types';
import { useInputProps } from 'components/Input/useInputProps';

export type InputProps = InputComponentStateMessageProps &
  Omit<InputContainerProps, 'children'> &
  BaseInputProps;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { inputContainerProps, inputComponentProps } = useInputProps(props);
  return (
    <InputContainer {...props} {...inputContainerProps}>
      <BaseInput {...props} ref={ref} {...inputComponentProps} />
    </InputContainer>
  );
});
