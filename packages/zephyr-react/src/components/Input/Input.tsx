import { forwardRef, useId } from 'react';
import { InputContainer, InputContainerProps } from 'components/Input/InputContainer';
import { BaseInput, BaseInputProps } from 'components/BaseInput/BaseInput';
import { getInputMessageStatePair } from 'components/Input/Input.helpers';
import { InputComponentMessageProps } from 'types/input-component.types';

type InputProps = InputComponentMessageProps &
  Omit<InputContainerProps, 'children'> &
  BaseInputProps;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const generatedId = useId();

  const id = [props.name, generatedId].filter(Boolean).join('-');

  const inputMessageStatePair = getInputMessageStatePair({
    errorMessage: props.errorMessage!,
    successMessage: props.successMessage!,
    infoMessage: props.infoMessage!,
  });

  return (
    <InputContainer htmlFor={id} {...props} {...inputMessageStatePair}>
      <BaseInput id={id} {...props} ref={ref} {...inputMessageStatePair} />
    </InputContainer>
  );
});
