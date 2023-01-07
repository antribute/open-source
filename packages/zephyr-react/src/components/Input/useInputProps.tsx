import { BaseInputProps } from 'components/BaseInput/BaseInput';
import { getInputMessageStatePair } from 'components/Input/Input.helpers';
import { useId } from 'react';
import { InputComponentMessageProps } from 'types/input-component.types';

type UseInputPropsHookOptions = InputComponentMessageProps & Pick<BaseInputProps, 'name'>;

export const useInputProps = (props: UseInputPropsHookOptions) => {
  const generatedId = useId();

  const id = [props.name, generatedId].filter(Boolean).join('-');

  const inputMessageStatePair = getInputMessageStatePair({
    errorMessage: props.errorMessage!,
    successMessage: props.successMessage!,
    infoMessage: props.infoMessage!,
  });

  return {
    inputContainerProps: { ...props, htmlFor: id, ...inputMessageStatePair },
    inputComponentProps: { ...props, ...inputMessageStatePair, id },
  };
};
