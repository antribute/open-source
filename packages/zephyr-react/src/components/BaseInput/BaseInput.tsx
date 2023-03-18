import React from 'react';
import { BaseInputContainer, InputAddonProps } from 'components/BaseInput/BaseInputContainer';
import {
  InputComponentFieldType,
  InputComponentStateMessagePair,
  OmitHtmlInputComponentProps,
} from 'types/input-component.types';
import { useBaseInputProps } from 'components/BaseInput/useBaseInputProps';
import { PrimitiveBaseInput } from 'components/BaseInput/PrimitiveBaseInput';
import { WidthProp } from 'types/styles';
import { BaseInputElementVariantProps } from './BaseInput.styles';

type ReactHtmlInputProps = OmitHtmlInputComponentProps<React.InputHTMLAttributes<HTMLInputElement>>;

export type BaseInputBaseProps = {
  loading?: boolean;
  focusElementOnClick?: boolean;
  width?: WidthProp;
  label?: string;
  type?: InputComponentFieldType;
} & InputAddonProps &
  InputComponentStateMessagePair &
  BaseInputElementVariantProps &
  ReactHtmlInputProps;

export type BaseInputProps = React.ComponentProps<typeof BaseInput>;

export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputBaseProps>((props, ref) => {
  const { inputContainerProps, baseInputElementProps } = useBaseInputProps(props);

  return (
    <BaseInputContainer {...inputContainerProps} ref={ref}>
      {({ ref }) => <PrimitiveBaseInput {...baseInputElementProps} ref={ref} />}
    </BaseInputContainer>
  );
});
