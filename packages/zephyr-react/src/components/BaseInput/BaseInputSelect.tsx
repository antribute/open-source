import React, { HTMLProps } from 'react';
import { BaseInputContainer } from 'components/BaseInput/BaseInputContainer';
import { Select, SelectArrow, SelectOptions } from 'ariakit';
import { useBaseInputProps } from 'components/BaseInput/useBaseInputProps';
import { OmitHtmlInputComponentProps } from 'types/input-component.types';
import { PlaceholderElement } from './BaseInput.styles';
import { BaseInputBaseProps } from './BaseInput';

export type BaseInputSelectProps = {
  state: SelectOptions['state'];
} & BaseInputBaseProps &
  Omit<OmitHtmlInputComponentProps<HTMLProps<HTMLButtonElement>>, 'label'>;

export const BaseInputSelect = React.forwardRef<HTMLButtonElement, BaseInputSelectProps>(
  ({ state, placeholder = 'Select...', ...props }, ref) => {
    const { inputContainerProps, baseInputElementProps } = useBaseInputProps({
      trailingIcon: <SelectArrow state={state} />,
      ...props,
    });

    const selectValueCommonProps = {
      baseInputElementProps,
      placeholder,
    };

    const { value } = state;

    return (
      <BaseInputContainer
        {...inputContainerProps}
        state={state}
        as={Select}
        ref={ref}
        id={props.id}
        width={props.width ?? 'fixed'}
      >
        {Array.isArray(value) ? (
          <MultiSelectValue {...selectValueCommonProps} value={value} />
        ) : (
          <SingleSelectValue {...selectValueCommonProps} value={value} />
        )}
      </BaseInputContainer>
    );
  }
);

const MultiSelectValue = ({ value, placeholder }: { value: string[]; placeholder?: string }) => {
  return value.length === 0 ? (
    <PlaceholderElement>{placeholder}</PlaceholderElement>
  ) : (
    <div>{value.length} Selected</div>
  );
};

const SingleSelectValue = ({ value, placeholder }: { value: string; placeholder?: string }) => {
  return <div>{value || <PlaceholderElement>{placeholder}</PlaceholderElement>}</div>;
};
