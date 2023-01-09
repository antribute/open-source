import { CheckboxElement, CheckboxElementProps } from './Checkbox.styles';
import { InputContainerProps } from 'components/Input/InputContainer';
import { useInputProps } from 'components/Input/useInputProps';
import { classed } from 'utils/classed';
import { BaseInputElement } from 'components/BaseInput/BaseInput.styles';

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
    <CheckboxInputElement width="fixed" htmlFor={htmlFor} size={size}>
      <CheckboxElement type="checkbox" {...inputComponentProps} size={size} />
      {label && (
        <span
          className="font-bold text-type-soft peer-checked:text-dark-gray select-none"
          // className="text-dark-gray pointer-events-none font-bold"
        >
          {label}
        </span>
      )}
    </CheckboxInputElement>
  );
};
