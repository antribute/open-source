import { forwardRef } from 'react';
import { InputContainer, InputContainerProps } from 'components/Input/InputContainer';
import {
  BaseInput,
  BaseInputProps,
  BaseInputSelect,
  BaseInputSelectProps,
} from 'components/BaseInput';
import { InputComponentStateMessageProps } from 'types/input-component.types';
import { useInputProps } from 'components/Input/useInputProps';

export type InputProps = InputComponentStateMessageProps &
  Omit<InputContainerProps, 'children'> &
  BaseInputProps;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { inputContainerProps, inputComponentProps } = useInputProps(props);
  return (
    <InputContainer {...inputContainerProps}>
      <BaseInput {...props} ref={ref} {...inputComponentProps} />
    </InputContainer>
  );
});

export type InputSelectProps = BaseInputSelectProps;

export const InputSelect = forwardRef<HTMLButtonElement, BaseInputSelectProps>(
  ({ width = 'fixed', ...props }, ref) => {
    const { inputContainerProps, inputComponentProps } = useInputProps({ width, ...props });
    return (
      <InputContainer {...inputContainerProps}>
        <BaseInputSelect {...props} ref={ref} {...inputComponentProps} />
      </InputContainer>
    );
  }
);
