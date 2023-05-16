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
        <InputGroupElement autoWidth filled={Boolean(label)} minWidth={false}>
          <InputFieldContainer size={size}>
            <BasicCheckbox
              {...pickCheckboxProps(props)}
              ref={forwardedRef}
              onChange={onChange}
              focusVisibleRing={false}
            >
              {label}
            </BasicCheckbox>
          </InputFieldContainer>
        </InputGroupElement>
      </InputContainer>
    );
  }
);
