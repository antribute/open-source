import React, { createContext } from 'react';
import { classed, deriveClassed } from 'utils/classed';
import useDimensions from 'react-cool-dimensions';
import { Label as AriaLabel } from 'react-aria-components';
import type { FieldAria } from 'react-aria';
import { generatePropPickerFn } from 'utils';
import clsx from 'clsx';
import { Tooltip } from 'components/Tooltip';
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
  hideMessageSlots?: boolean;
  description?: React.ReactNode;
  labelDescription?: string;
  optionalLabelIndicator?: string | boolean;
  inputContainerClassName?: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
  noContainer?: boolean;
}

type InputContainerElementProps = React.ComponentProps<typeof InputContainerElement>;

const InputContainerElement = classed('div', 'group inline-block gap-8 flex-wrap', {
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
    hideMessageSlots,
    loading,
    noContainer,
    ...rest
  } = props;

  const inputStateProps = resolveInputComponentStateProps({
    error,
    errorMessage,
    success,
    successMessage,
  });

  const { observe, width: childrenWidth } = useDimensions();

  const showDescriptionSlot = hideMessageSlots ?? Boolean(description);

  const showErrorMessageSlot = hideMessageSlots ?? !showValidationMessageInTooltip;

  const ctxProps = {
    value: { ...props, ...inputStateProps },
  };

  if (noContainer) {
    return (
      <InputContainerContext.Provider {...ctxProps}>{children}</InputContainerContext.Provider>
    );
  }

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

      <InputContainerContext.Provider {...ctxProps}>
        <div
          ref={observe}
          className={clsx({ 'inline-block': !props.fullWidth, 'w-full': props.fullWidth })}
        >
          {children}
        </div>
      </InputContainerContext.Provider>

      {showDescriptionSlot && (
        <InputDescription {...descriptionProps} className="block" slot="description">
          {description}
        </InputDescription>
      )}

      {showErrorMessageSlot && (
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
  hideMessageSlots: '_pick_',
  noContainer: '_pick_',
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
