import {
  InputComponentStateMessageProps,
  InputComponentStateMessagePair,
} from 'types/input-component.types';

export function getInputMessageStatePair({
  errorMessage,
  successMessage,
  infoMessage,
  error,
}: InputComponentStateMessageProps): InputComponentStateMessagePair {
  if (error || errorMessage) {
    return {
      error: true,
      inputState: 'error',
      message: errorMessage,
    };
  }
  if (successMessage) {
    return {
      success: true,
      inputState: 'success',
      message: successMessage!,
    };
  }
  if (infoMessage) {
    return {
      message: infoMessage,
    };
  }

  return {};
}
