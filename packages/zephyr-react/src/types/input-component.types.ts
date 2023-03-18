export type InputComponentFieldType = 'currency' | 'percent' | React.HTMLInputTypeAttribute;

export interface InputComponentStateMessageProps {
  infoMessage?: string;
  errorMessage?: string;
  successMessage?: string;
  error?: boolean;
}

export type InputComponentState = 'error' | 'success';

export interface InputComponentStateMessagePair {
  message?: string;
  error?: boolean;
  success?: boolean;
  inputState?: InputComponentState;
}

export type OmitHtmlInputComponentProps<T> = Omit<T, 'width' | 'size' | 'as' | 'type' | 'label'>;
