import InputLabel, { InputLabelProps } from 'components/Input/InputLabel';
import InputMessage from 'components/Input/InputMessage';
import { InvisibleCharacter } from 'components/InvisibleCharacter';
import { InputComponentStateMessagePair } from 'types/input-component.types';

export type InputContainerProps = {
  label?: string;
  hideLabel?: boolean;
  hideMessage?: boolean;
  children: React.ReactNode;
  required?: boolean;
  message?: string;
} & InputComponentStateMessagePair &
  Pick<InputLabelProps, 'htmlFor' | 'optionalLabel'>;

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
  } = props;

  return (
    <>
      <InputLabel
        htmlFor={htmlFor!}
        hidden={hideLabel!}
        optionalLabel={optionalLabel!}
        required={required}
      >
        {label}
      </InputLabel>
      {children}
      {!hideMessage && (
        <InputMessage inputState={inputState!}>
          {message}
          <InvisibleCharacter />
        </InputMessage>
      )}
    </>
  );
};
