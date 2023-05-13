import React, { createContext } from 'react';
import { classed, deriveClassed } from 'utils/classed';
import useDimensions from 'react-cool-dimensions';
import { Label as AriaLabel } from 'react-aria-components';
import type { FieldAria } from 'react-aria';
import { generatePropPickerFn } from 'utils';
import clsx from 'clsx';
import { resolveInputComponentStateProps } from '../Input.helpers';
import { InputDescription, InputValidationMessage } from './InputMessage';
import { InputLabel, InputLabelProps } from './InputLabel';
import type {
  InputComponentProps,
  InputComponentStateProps,
  ResolvedInputComponentStateProps,
} from '../Input.types';

export const InputContainerContext = createContext<
  (Omit<InputComponentProps, 'children'> & ResolvedInputComponentStateProps) | null
>(null);

export interface InputContainerProps
  extends Omit<Partial<FieldAria>, 'fieldProps'>,
    InputComponentStateProps {
  label?: React.ReactNode;
  hideLabel?: InputLabelProps['hideLabel'];
  errorMessage?: React.ReactNode;
  hideErrorMessageSlot?: boolean;
  description?: React.ReactNode;
  labelDescription?: string;
  optionalLabelIndicator?: string | boolean;
  inputContainerClassName?: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
}

type InputContainerElementProps = React.ComponentProps<typeof InputContainerElement>;

const InputContainerElement = classed('div', 'inline-block gap-8 flex-wrap', {
  variants: {
    fullWidth: { true: 'w-full' },
  },
});

export const InputContainer = deriveClassed<
  typeof InputContainerElement,
  InputContainerProps & Pick<InputContainerElementProps, 'as'>
>(({ children, ...props }, forwardedRef) => {
  const {
    label,
    labelDescription,
    description,
    optionalLabelIndicator,
    error,
    errorMessage,
    success,
    successMessage,
    inputContainerClassName: className,
    isRequired,
    labelProps,
    hideLabel,
    descriptionProps,
    errorMessageProps,
    showValidationMessageInTooltip,
    hideErrorMessageSlot: hideErrorMessageSlotProp,
    loading,
    ...rest
  } = props;

  const inputStateProps = resolveInputComponentStateProps({
    error,
    errorMessage,
    success,
    successMessage,
  });

  const { observe, width: childrenWidth } = useDimensions();

  const hideErrorMessageSlot = hideErrorMessageSlotProp ?? !showValidationMessageInTooltip;

  return (
    <InputContainerElement className={className} {...rest} ref={forwardedRef}>
      <InputLabel
        as={AriaLabel}
        {...labelProps}
        required={isRequired}
        inputState={inputStateProps.inputState}
        hideLabel={hideLabel}
        optionalLabel={optionalLabelIndicator}
        labelDescription={labelDescription}
        style={{ maxWidth: childrenWidth }}
        className="block"
      >
        {label}
      </InputLabel>

      <InputContainerContext.Provider value={{ ...props, ...inputStateProps }}>
        <div
          ref={observe}
          className={clsx({ 'inline-block': !props.fullWidth, 'w-full': props.fullWidth })}
        >
          {children}
        </div>
      </InputContainerContext.Provider>

      {description && (
        <InputDescription {...descriptionProps} className="block" slot="description">
          {description}
        </InputDescription>
      )}

      {hideErrorMessageSlot && (
        <InputValidationMessage
          {...errorMessageProps}
          inputStateProps={inputStateProps}
          className="block"
          slot="errorMessage"
        >
          {errorMessage}
        </InputValidationMessage>
      )}
    </InputContainerElement>
  );
});

export const pickInputContainerProps = generatePropPickerFn<InputContainerProps>({
  label: '_pick_',
  fullWidth: '_pick_',
  children: '_pick_',
  loading: '_pick_',
  descriptionProps: '_pick_',
  errorMessageProps: '_pick_',
  labelProps: '_pick_',
  hideLabel: '_pick_',
  errorMessage: '_pick_',
  hideErrorMessageSlot: '_pick_',
  description: '_pick_',
  labelDescription: '_pick_',
  optionalLabelIndicator: '_pick_',
  inputContainerClassName: '_pick_',
  successMessage: '_pick_',
  error: '_pick_',
  success: '_pick_',
  isRequired: '_pick_',
  showValidationMessageInTooltip: '_pick_',
});
