import { SizeProp, WidthProp } from 'types/styles';

export type InputComponentFieldType = 'currency' | 'percent' | React.HTMLInputTypeAttribute;

export interface InlineInputAddonType {
  pointerEvents?: boolean;
  className?: string;
  content: React.ReactNode;
}

export interface InlineInputAddonSlotProps {
  inlineLeadingAddonSlot?: InlineInputAddonType[];
  inlineTrailingAddonSlot?: InlineInputAddonType[];
}

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

export type OmitHtmlInputComponentProps<T> = Omit<T, 'width' | 'size' | 'as' | 'type'>;

export type InputComponentProps = {
  size?: SizeProp;
  width?: WidthProp;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  type?: InputComponentFieldType;
  placeholder?: string;
  label?: string;
  className?: string;
} & InlineInputAddonSlotProps;

export interface InputAddonSlotElement {
  type?: 'div' | 'button';
  filled?: boolean;
  className?: string;
}

export interface InputAddonSlotProps {
  leadingAddonSlot?: InputAddonSlotElement;
  trailingAddonSlot?: InputAddonSlotElement;
}
