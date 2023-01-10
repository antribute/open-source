import { SizeProp, WidthProp } from 'types/styles';

export type InputComponentFieldType = 'currency' | 'percent' | React.HTMLInputTypeAttribute;

export type InlineInputAddonType = {
  pointerEvents?: boolean;
  className?: string;
  content: React.ReactNode;
};

export type InlineInputAddonSlotProps = {
  inlineLeadingAddonSlot?: InlineInputAddonType[];
  inlineTrailingAddonSlot?: InlineInputAddonType[];
};

export type InputComponentStateMessageProps = {
  infoMessage?: string;
  errorMessage?: string;
  successMessage?: string;
  error?: boolean;
};

export type InputComponentState = 'error' | 'success';

export type InputComponentStateMessagePair = {
  message?: string;
  error?: boolean;
  success?: boolean;
  inputState?: InputComponentState;
};

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

export type InputAddonSlotElement = {
  type?: 'div' | 'button';
  filled?: boolean;
  className?: string;
};

export type InputAddonSlotProps = {
  leadingAddonSlot?: InputAddonSlotElement;
  trailingAddonSlot?: InputAddonSlotElement;
};
