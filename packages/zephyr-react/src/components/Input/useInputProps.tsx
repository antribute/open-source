import { BaseInputBaseProps, BaseInputProps } from 'components/BaseInput/BaseInput';
import { getInputMessageStatePair } from 'components/Input/Input.helpers';
import { useId } from 'react';
import { InputComponentStateMessageProps } from 'types/input-component.types';

type UseInputPropsHookOptions = InputComponentStateMessageProps &
  Pick<BaseInputBaseProps, 'name' | 'error' | 'width' | 'size' | 'id' | 'label'>;

export const useInputProps = ({
  size = 'md',
  width,
  id: idProp,
  ...props
}: UseInputPropsHookOptions) => {
  const generatedId = useId();

  const id = [idProp, props.name, generatedId].filter(Boolean).join('-');

  const inputMessageStatePair = getInputMessageStatePair({
    errorMessage: props.errorMessage,
    successMessage: props.successMessage,
    infoMessage: props.infoMessage,
    error: props.error,
  });

  return {
    inputContainerProps: { ...props, size, width, htmlFor: id, ...inputMessageStatePair },
    inputComponentProps: { ...props, size, width, ...inputMessageStatePair, id },
  };
};
