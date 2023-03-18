import { forwardRef } from 'react';
import { InputContainer } from 'components/Input/InputContainer';
import { BaseInputSelect, BaseInputSelectProps } from 'components/BaseInput';
import { useInputProps } from 'components/Input/useInputProps';

export type InputSelectProps = BaseInputSelectProps;

export const InputSelect = forwardRef<HTMLButtonElement, BaseInputSelectProps>(
  ({ width = 'fixed', label, labelDescription, optionalLabel, required, ...props }, ref) => {
    const { id, size, inputStateMessagePair } = useInputProps(props);
    return (
      <InputContainer
        label={label}
        width={width}
        required={required}
        labelDescription={labelDescription}
        optionalLabel={optionalLabel}
        htmlFor={id}
        size={size}
        {...inputStateMessagePair}
      >
        <BaseInputSelect {...props} ref={ref} id={id} {...inputStateMessagePair} />
      </InputContainer>
    );
  }
);
