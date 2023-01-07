import { CheckboxElement, CheckboxElementProps } from './Checkbox.styles';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import CheckIcon from '@heroicons/react/20/solid/CheckIcon';
import { InputContainer, InputContainerProps } from 'components/Input/InputContainer';
import { useInputProps } from 'components/Input/useInputProps';
import InputLabel from 'components/Input/InputLabel';
import { classed } from 'utils/classed';
import { BaseInput } from 'components/BaseInput/BaseInput';
import { BaseInputContainer } from 'components/BaseInput/BaseInputContainer';
import { BaseInputElement } from 'components/BaseInput/BaseInput.styles';
import { InvisibleCharacter } from 'components/InvisibleCharacter';

type CheckboxProps = CheckboxElementProps & Omit<InputContainerProps, 'children'>;

const CheckboxInputElement = classed(
  'label',
  BaseInputElement,
  'inline-flex items-center gap-8 cursor-pointer'
);

export const Checkbox = ({ label, size, ...props }: CheckboxProps) => {
  const { inputContainerProps, inputComponentProps } = useInputProps(props);

  const { htmlFor } = inputContainerProps;
  return (
    <CheckboxInputElement width="fixed" size={'md'} htmlFor={htmlFor} size={size}>
      <CheckboxElement type="checkbox" {...inputComponentProps} size={size} />
      {label && (
        <span
          labelOrientation="horizontalReverse"
          className="font-bold text-type-soft peer-checked:text-dark-gray select-none"
          // className="text-dark-gray pointer-events-none font-bold"
        >
          {label}
        </span>
      )}
    </CheckboxInputElement>
  );
};
