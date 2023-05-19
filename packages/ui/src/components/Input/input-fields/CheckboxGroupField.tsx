import React from 'react';
import { BasicCheckbox, BasicCheckboxProps } from 'components/BasicCheckbox';
import { CheckboxGroup as AriaCheckboxGroup } from 'react-aria-components';
import type { CheckboxGroupProps as AriaCheckboxGroupProps } from 'react-aria-components';
import { InputContainer } from 'components/Input/components/InputContainer';
import { InputFieldContainer } from 'components/Input/components/BaseInput';
import clsx from 'clsx';
import type { InputComponentProps } from '../Input.types';

export type CheckboxGroupFieldProps = React.ComponentProps<typeof CheckboxGroupField>;

const gridColumns = {
  '1': 'grid-cols-1',
  '2': 'grid-cols-2',
  '3': 'grid-cols-3',
  '4': 'grid-cols-4',
  '5': 'grid-cols-5',
  '6': 'grid-cols-6',
  '7': 'grid-cols-7',
  '8': 'grid-cols-8',
  '9': 'grid-cols-9',
  '10': 'grid-cols-10',
  '11': 'grid-cols-11',
  '12': 'grid-cols-12',
};

export const CheckboxGroupField = ({
  children,
  placeholder,
  label,
  size,
  options,
  columns = '1',
  ...props
}: {
  columns?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
} & InputComponentProps &
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
      <div className={clsx('grid grid-cols-2 gap-x-8', gridColumns[columns])}>
        {options.map(({ label, ...rest }) => (
          <InputFieldContainer className="px-0" size={size}>
            <BasicCheckbox size={size} {...rest}>
              {label}
            </BasicCheckbox>
          </InputFieldContainer>
        ))}
      </div>
    </InputContainer>
  );
};
