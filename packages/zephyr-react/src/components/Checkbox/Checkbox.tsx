import { CheckboxElement, CheckboxElementProps } from './Checkbox.styles';
import { InputContainerProps } from 'components/Input/InputContainer';
import { useInputProps } from 'components/Input/useInputProps';
import { classed } from 'utils/classed';
import { BaseInputElement } from 'components/BaseInput/BaseInput.styles';

type CheckboxProps = Omit<CheckboxElementProps, 'type'> & Omit<InputContainerProps, 'children'>;

const CheckboxInputElement = classed(
  'label',
  BaseInputElement,
  'inline-flex items-center gap-8 cursor-pointer focus-within:ring-2'
);

export const Checkbox = ({ label, ...props }: CheckboxProps) => {
  const { inputContainerProps, inputComponentProps } = useInputProps(props);

  if (label) {
    return (
      <CheckboxInputElement width="fixed" {...inputContainerProps}>
        <CheckboxElement type="checkbox" {...inputComponentProps} focusRing={false} />
        {label && (
          <span className="font-bold text-type-soft peer-checked:text-dark-gray select-none">
            {label}
          </span>
        )}
      </CheckboxInputElement>
    );
  }

  return <CheckboxElement type="checkbox" {...inputComponentProps} />;
};
