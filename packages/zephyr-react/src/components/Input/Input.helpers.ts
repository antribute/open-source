import { pickProps } from 'utils';
import { useContext } from 'react';
import { InputContext as AriaInputContext } from 'react-aria-components';
import { InputComponentStateProps, ResolvedInputComponentStateProps } from './Input.types';

export function resolveInputComponentStateProps({
  error,
  errorMessage,
  success,
  successMessage,
}: Pick<
  InputComponentStateProps,
  'error' | 'errorMessage' | 'success' | 'successMessage'
>): ResolvedInputComponentStateProps {
  if (error ?? errorMessage) {
    return {
      error: true,
      success: false,
      inputState: 'error',
      validationState: 'invalid',
      validationMessage: errorMessage,
    };
  }

  if (success ?? successMessage) {
    return {
      success: true,
      error: false,
      inputState: 'success',
      validationState: 'valid',
      validationMessage: successMessage,
    };
  }

  return {
    success: false,
    error: false,
    inputState: undefined,
    validationMessage: undefined,
    validationState: undefined,
  };
}

export function parseInputStateProps(
  props: object & ResolvedInputComponentStateProps
): ResolvedInputComponentStateProps {
  return pickProps<ResolvedInputComponentStateProps>(props, {
    error: '_pick_',
    inputState: '_pick_',
    success: '_pick_',
    validationMessage: '_pick_',
    validationState: '_pick_',
  }) as ResolvedInputComponentStateProps;
}

export function useInputWithRefContext() {
  const inputContext = useContext(AriaInputContext);
  if (inputContext && 'ref' in inputContext) {
    return inputContext;
  }
  return undefined;
}
