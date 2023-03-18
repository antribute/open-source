import { getInputMessageStatePair } from 'components/Input/Input.helpers';
import { useId } from 'react';
import {
  InputComponentStateMessagePair,
  InputComponentStateMessageProps,
} from 'types/input-component.types';
import { SizeProp } from 'types/styles';

interface UseInputIdOptions {
  id?: string;
  name?: string;
}

function useInputId({ id: idProp, name }: UseInputIdOptions) {
  const generatedId = useId();
  const id = idProp ?? [name, generatedId].filter(Boolean).join('-');
  return id;
}

interface UseInputPropsHookOptions extends InputComponentStateMessageProps, UseInputIdOptions {
  size?: SizeProp;
}

interface UseInputPropsReturn {
  id: string;
  size: SizeProp;
  inputStateMessagePair: InputComponentStateMessagePair;
}

export const useInputProps = ({
  id: idProp,
  name,
  size = 'md',
  ...props
}: UseInputPropsHookOptions): UseInputPropsReturn => {
  const id = useInputId({ id: idProp, name });

  const inputStateMessagePair = getInputMessageStatePair({
    errorMessage: props.errorMessage,
    successMessage: props.successMessage,
    infoMessage: props.infoMessage,
    error: props.error,
  });

  return { id, size, inputStateMessagePair };
};
