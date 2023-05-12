import React from 'react';
import { BasicCheckbox } from 'components/BasicCheckbox';
import { BasicCheckboxProps } from 'components/BasicCheckbox';
import { CheckboxGroup as AriaCheckboxGroup } from 'react-aria-components';
import type { CheckboxGroupProps as AriaCheckboxGroupProps } from 'react-aria-components';
import type { InputComponentProps } from '../Input.types';
import { InputContainer } from 'components/Input/components/InputContainer';
import { InputFieldContainer } from 'components/Input/components/BaseInput';

export type CheckboxGroupFieldProps = React.ComponentProps<typeof CheckboxGroupField>;

export const CheckboxGroupField = ({
  children,
  placeholder,
  label,
  size,
  options,
  ...props
}: InputComponentProps &
  AriaCheckboxGroupProps & {
    options: ({ label: string } & Pick<
      BasicCheckboxProps,
      | 'value'
      | 'isIndeterminate'
      | 'isDisabled'
      | 'isReadOnly'
      | 'excludeFromTabOrder'
      | 'pointerEventsNone'
    >)[];
  }) => {
  return (
    <InputContainer label={label} {...props} as={AriaCheckboxGroup}>
      {options.map(({ label, ...rest }) => (
        <InputFieldContainer className="px-0" size={size}>
          <BasicCheckbox size={size} {...rest}>
            {label}
          </BasicCheckbox>
        </InputFieldContainer>
      ))}
    </InputContainer>
  );
};
