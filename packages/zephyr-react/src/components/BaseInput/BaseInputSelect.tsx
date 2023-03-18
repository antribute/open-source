import React from 'react';
import { BaseInputContainer } from 'components/BaseInput/BaseInputContainer';
import { Select, SelectArrow, SelectOptions, SelectState } from 'ariakit';
import { useBaseInputProps } from 'components/BaseInput/useBaseInputProps';
import { OmitHtmlInputComponentProps } from 'types/input-component.types';
import { IconButton } from 'components/IconButton/IconButton';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { SharedInputProps } from 'components/Input/Input.typess';
import { PlaceholderElement } from './BaseInput.styles';
import { BaseInputBaseProps } from './BaseInput';

type ReactHtmlButtonProps = OmitHtmlInputComponentProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export type BaseInputSelectProps = {
  state: SelectOptions['state'];
  clearable?: boolean;

  onClearValue?: ClearValueActionProps['onClearValue'];
} & BaseInputBaseProps &
  SharedInputProps &
  ReactHtmlButtonProps;

interface ClearValueActionProps {
  selectState: SelectState;
  onClearValue?: () => void;
}

const ClearValueAction = ({ selectState, onClearValue }: ClearValueActionProps) => {
  return selectState.value.length > 0 ? (
    <IconButton
      size="xs"
      variant="ghost"
      color="secondary"
      className="opacity-0  transition-opacity group-hover:opacity-100"
      onClick={() => {
        if (Array.isArray(selectState.value)) {
          selectState.setValue([]);
        } else {
          selectState.setValue('');
        }

        onClearValue?.();
      }}
    >
      <XMarkIcon className="text-content-weak stroke-current stroke-2 " />
    </IconButton>
  ) : null;
};

export const BaseInputSelect = React.forwardRef<HTMLButtonElement, BaseInputSelectProps>(
  ({ state, onClearValue, placeholder = 'Select...', clearable = true, ...props }, ref) => {
    const { inputContainerProps } = useBaseInputProps({
      trailingIcon: (
        <SelectArrow state={state}>
          <ChevronDownIcon className="text-content stroke-content stroke-1 opacity-30" />
        </SelectArrow>
      ),
      inlineTrailingAddonSlot: [
        clearable && {
          content: <ClearValueAction selectState={state} onClearValue={onClearValue} />,
          focusInputOnClick: false,
        },
      ],
      ...props,
    });

    const { value } = state;

    return (
      <BaseInputContainer
        {...inputContainerProps}
        state={state}
        as={Select}
        ref={ref}
        id={props.id}
        toggleOnClick
        width={props.width ?? 'fixed'}
        placeholderShown={!(value.length > 0)}
      >
        <InputSelectValue placeholder={placeholder} value={value} />
      </BaseInputContainer>
    );
  }
);

interface InputSelectValueProps {
  placeholder?: string;
  value: string | string[];
}
const InputSelectValue = ({ value, ...props }: InputSelectValueProps) => {
  return (
    <div className="font-body relative z-0 min-w-0 shrink whitespace-nowrap font-medium">
      {Array.isArray(value) ? (
        <MultiSelectValue {...props} value={value} />
      ) : (
        <SingleSelectValue {...props} value={value} />
      )}
    </div>
  );
};

const MultiSelectValue = ({ value, placeholder }: { value: string[]; placeholder?: string }) => {
  return value.length > 0 ? (
    <div className="overflow-y-visible truncate">{value.length} Selected</div>
  ) : (
    <PlaceholderElement>{placeholder}</PlaceholderElement>
  );
};

const SingleSelectValue = ({ value, placeholder }: { value: string; placeholder?: string }) => {
  return (
    <div className="font-regular  truncate">
      {value || <PlaceholderElement>{placeholder}</PlaceholderElement>}
    </div>
  );
};
