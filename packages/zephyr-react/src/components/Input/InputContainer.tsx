import { BaseInputProps } from 'components/BaseInput';
import InputLabel, { InputLabelProps } from 'components/Input/InputLabel';
import InputMessage from 'components/Input/InputMessage';
import { InvisibleCharacter } from 'components/InvisibleCharacter';
import { InputComponentWidthVariant } from 'styles/input-component.variants';
import { InputComponentStateMessagePair } from 'types/input-component.types';
import { classed } from 'utils/classed';

export interface InputContainerProps
  extends Pick<BaseInputProps, 'size' | 'width'>,
    InputComponentStateMessagePair,
    Pick<
      InputLabelProps,
      'htmlFor' | 'optionalLabel' | 'labelDescription' | 'required' | 'labelOrientation'
    > {
  label?: React.ReactNode;
  hideLabel?: boolean;
  hideMessage?: boolean;
  children: React.ReactNode;
  message?: string;
}

const InputContainerElement = classed('div', InputComponentWidthVariant, {
  defaultVariants: {
    size: 'xs',
    width: 'fixed',
  },
});

export const InputContainer = (props: InputContainerProps) => {
  const {
    label,
    hideLabel,
    htmlFor,
    message,
    inputState,
    hideMessage,
    required = false,
    optionalLabel,
    children,
    labelDescription,
    labelOrientation = 'vertical',
    width,

    size,
  } = props;

  return (
    <InputContainerElement size={size} width={width}>
      <InputLabel
        htmlFor={htmlFor}
        hidden={hideLabel}
        optionalLabel={optionalLabel}
        labelDescription={labelDescription}
        required={required}
        labelOrientation={labelOrientation}
        width={width}
      >
        {label}
      </InputLabel>
      {children}
      {!hideMessage && (
        <InputMessage inputState={inputState}>
          {message}
          <InvisibleCharacter />
        </InputMessage>
      )}
    </InputContainerElement>
  );
};
