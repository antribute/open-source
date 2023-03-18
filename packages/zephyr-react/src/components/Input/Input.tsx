import { forwardRef } from 'react';
import { InputContainer, InputContainerProps } from 'components/Input/InputContainer';
import { BaseInput, BaseInputProps } from 'components/BaseInput';
import { InputComponentStateMessageProps } from 'types/input-component.types';
import { useInputProps } from 'components/Input/useInputProps';

export type InputProps = InputComponentStateMessageProps &
  Omit<InputContainerProps, 'children'> &
  BaseInputProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, labelDescription, optionalLabel, required, ...props }, ref) => {
    const { id, inputStateMessagePair, size } = useInputProps(props);
    return (
      <InputContainer
        label={label}
        labelDescription={labelDescription}
        optionalLabel={optionalLabel}
        required={required}
        htmlFor={id}
        size={size}
        {...inputStateMessagePair}
      >
        <BaseInput {...props} ref={ref} id={id} {...inputStateMessagePair} />
      </InputContainer>
    );
  }
);
