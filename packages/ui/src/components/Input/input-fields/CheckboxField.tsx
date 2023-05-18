import React, { forwardRef } from 'react';
import { BasicCheckbox, pickCheckboxProps, BasicCheckboxProps } from 'components/BasicCheckbox';
import { InputGroupElement } from 'components/Input/Input.styles';
import { InputContainer } from 'components/Input/components/InputContainer';
import { InputFieldContainer } from 'components/Input/components/BaseInput';
import type { InputComponentProps } from '../Input.types';

export type CheckboxFieldProps = React.ComponentProps<typeof CheckboxField>;

export const CheckboxField = forwardRef<
  HTMLInputElement,
  InputComponentProps & Omit<BasicCheckboxProps, 'children'>
>(
  (
    {
      children,
      placeholder,
      className,
      label,
      size,
      onChange,
      onFocus,
      onBlur,
      onFocusChange,
      onKeyDown,
      onKeyUp,
      style,
      validationState,
      value,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <InputContainer {...props} hideLabel>
        <InputGroupElement width="auto" cursor="pointer" filled={Boolean(label)} minWidth={false}>
          <BasicCheckbox
            {...pickCheckboxProps(props)}
            ref={forwardedRef}
            onChange={onChange}
            focusVisibleRing={false}
            containerElement={InputFieldContainer}
            size={size}
          >
            {label}
          </BasicCheckbox>
        </InputGroupElement>
      </InputContainer>
    );
  }
);
