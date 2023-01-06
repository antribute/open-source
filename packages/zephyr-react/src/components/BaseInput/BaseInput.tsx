import React, { useId } from 'react';
import { BaseInputElement } from './BaseInput.styles';
import { BaseInputContainer } from 'components/BaseInput/BaseInputContainer';
import { getInputComponentFieldTypeProps } from 'constants/input-component-field-type-map';
import { InputAddonSlotProps, InputComponentProps } from 'types/input-component.types';

type BaseInputProps = InputComponentProps & InputAddonSlotProps;

export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
  const {
    size = 'md',
    width = 'fixed',
    type,
    leadingIcon: leadingIconProp,
    trailingIcon: trailingIconProp,
    inlineLeadingAddonSlot,
    inlineTrailingAddonSlot,
  } = props;

  const id = useId();

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
      inlineLeadingAddonSlot={inlineLeadingAddonSlot!}
      inlineTrailingAddonSlot={inlineTrailingAddonSlot!}
    >
      {({ leadingIconWidth: startIconWidth, trailingIconWidth: endIconWidth }) => (
        <BaseInputElement
          id={id}
          autoComplete="off"
          formNoValidate
          {...props}
          {...htmlInputComponentProps}
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
