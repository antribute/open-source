import { SizeProp, WidthProp } from 'types/styles';

export type InputComponentFieldType = 'currency' | 'percent' | React.HTMLInputTypeAttribute;

export type InlineInputAddonType = { pointerEvents?: boolean; content: React.ReactNode };

export type InlineInputAddonSlotProps = {
  inlineLeadingAddonSlot?: InlineInputAddonType[];
  inlineTrailingAddonSlot?: InlineInputAddonType[];
};

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
