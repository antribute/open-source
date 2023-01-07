import { SizeProp, WidthProp } from 'types/styles';

export type InputComponentFieldType = 'currency' | 'percent' | React.HTMLInputTypeAttribute;

export type InlineInputAddonType = { pointerEvents?: boolean; content: React.ReactNode };

export type InlineInputAddonSlotProps = {
  inlineLeadingAddonSlot?: InlineInputAddonType[];
  inlineTrailingAddonSlot?: InlineInputAddonType[];
};

export type InputComponentMessageProps = {
  infoMessage?: string;
  errorMessage?: string;
  successMessage?: string;
};

export type InputComponentState = 'error' | 'success';

export type InputComponentStateMessagePair = {
  message?: string;
  error?: boolean;
  success?: boolean;
  inputState?: InputComponentState;
};

export type HtmlInputComponentProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  'width' | 'size' | 'as'
>;
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
