import { InputContainer, InputContainerProps } from 'components/Input/InputContainer';
import { useInputProps } from 'components/Input/useInputProps';
import { classTheme, classed } from 'utils/classed';
import { BaseInputElement } from 'components/BaseInput/BaseInput.styles';
import { BaseInputContainerElement } from 'components/BaseInput/BaseInputContainer.styles';
import { InputSizeVariant, inputSizeVariants } from 'styles/input-component.variants';
import InputLabel from 'components/Input/InputLabel';
import { CheckboxElement, CheckboxElementProps } from './Checkbox.styles';

type CheckboxProps = Omit<CheckboxElementProps, 'type'> & Omit<InputContainerProps, 'children'>;

const CheckboxInputElement = classed(
  'label',
  BaseInputElement,
  'inline-flex items-center gap-8 cursor-pointer focus-within:ring-2'
);

const CheckboxContainerElement = classed(
  'div',
  'flex gap-8',
  'border-2 border-transparent gap-8',
  {
    variants: { size: inputSizeVariants },
  },
  {
    defaultVariants: {
      size: 'md',
    },
  }
);

export const Checkbox = ({ label, ...props }: CheckboxProps) => {
  const { inputContainerProps, inputComponentProps } = useInputProps(props);

  if (label) {
    return (
      <InputContainer
        hideLabel
        labelSize={props.size}
        orientation="horizontal"
        {...inputContainerProps}
        width="auto"
        asLabel
      >
        <CheckboxContainerElement size={props.size}>
          <CheckboxElement type="checkbox" {...inputComponentProps} focusRing={false} />
          <span>{label}</span>
        </CheckboxContainerElement>
      </InputContainer>
    );
  }

  return <CheckboxElement type="checkbox" {...inputComponentProps} />;
};
