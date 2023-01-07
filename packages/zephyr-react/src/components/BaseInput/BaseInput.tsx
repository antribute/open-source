import React, { useId } from 'react';
import { BaseInputElement, BaseInputElementVariantProps } from './BaseInput.styles';
import { BaseInputContainer } from 'components/BaseInput/BaseInputContainer';
import { getInputComponentFieldTypeProps } from 'constants/input-component-field-type-map';
import {
  HtmlInputComponentProps,
  InputAddonSlotProps,
  InputComponentProps,
  InputComponentStateMessagePair,
} from 'types/input-component.types';

export type BaseInputProps = {
  id?: string;
  name?: string;
  inputProps?: HtmlInputComponentProps;
} & InputComponentProps &
  InputAddonSlotProps &
  BaseInputElementVariantProps &
  Omit<InputComponentStateMessagePair, 'message'>;

export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
  const {
    name,
    type,
    id: idProp,
    size = 'md',
    width = 'fixed',
    leadingIcon: leadingIconProp,
    trailingIcon: trailingIconProp,
    inlineLeadingAddonSlot,
    inlineTrailingAddonSlot,
    inputProps,
  } = props;

  const generatedId = useId();

  const id = idProp ?? generatedId;

  const { leadingIcon, trailingIcon, htmlInputComponentProps } =
    getInputComponentFieldTypeProps({
      type,
      leadingIcon: leadingIconProp,
      trailingIcon: trailingIconProp,
    }) ?? {};

  return (
    <BaseInputContainer
      size={size}
      width={width}
      leadingIcon={leadingIcon}
      trailingIcon={trailingIcon}
      inputState={props.inputState!}
      inlineLeadingAddonSlot={inlineLeadingAddonSlot!}
      inlineTrailingAddonSlot={inlineTrailingAddonSlot!}
    >
      {({ leadingIconWidth: startIconWidth, trailingIconWidth: endIconWidth }) => (
        <BaseInputElement
          name={name}
          id={id}
          size={size}
          autoComplete="off"
          formNoValidate
          {...props}
          {...htmlInputComponentProps}
          {...inputProps}
          ref={ref}
          style={{
            paddingLeft: startIconWidth(5),
            paddingRight: endIconWidth(5),
          }}
          onWheel={(e: any) => {
            // Disables value changing when scrolling over input
            e.currentTarget.blur();
          }}
        />
      )}
    </BaseInputContainer>
  );
});
