import React from 'react';
import { BaseInputContainer } from 'components/BaseInput/BaseInputContainer';
import {
  InputAddonSlotProps,
  InputComponentProps,
  InputComponentStateMessagePair,
} from 'types/input-component.types';

import { useBaseInputProps } from 'components/BaseInput/useBaseInputProps';
import { PrimitiveBaseInput } from 'components/BaseInput/PrimitiveBaseInput';
import { BaseInputElementVariantProps } from './BaseInput.styles';

export type BaseInputBaseProps = { focusElementOnClick?: boolean } & InputComponentProps &
  InputAddonSlotProps &
  Omit<InputComponentStateMessagePair, 'message'> &
  BaseInputElementVariantProps;

export type BaseInputProps = React.ComponentProps<typeof BaseInput>;

export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputBaseProps>((props, ref) => {
  const { inputContainerProps, baseInputElementProps } = useBaseInputProps(props);

  return (
    <BaseInputContainer
      {...inputContainerProps}
      width={baseInputElementProps.width === 'full' ? 'full' : 'auto'}
      ref={ref}
    >
      {({ ref }) => <PrimitiveBaseInput {...baseInputElementProps} ref={ref} />}
    </BaseInputContainer>
  );
});
