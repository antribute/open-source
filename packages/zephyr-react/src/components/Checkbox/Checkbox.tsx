import { InputContainer, InputContainerProps } from 'components/Input/InputContainer';
import { useInputProps } from 'components/Input/useInputProps';
import { classed } from 'utils/classed';
import { inputSizeVariants } from 'styles/input-component.variants';
import { InputLabelElement } from 'components/Input/InputLabel';
import { BasicCheckbox, CheckboxElementProps } from './Checkbox.styles';

type CheckboxProps = Omit<CheckboxElementProps, 'type'> & Omit<InputContainerProps, 'children'>;

const CheckboxContainerElement = classed(
  'div',
  'inline-flex gap-8',
  'border-2 items-center border-transparent gap-8 hover:bg-highlight-ghost rounded',
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
        {...inputContainerProps}
        width="auto"
        asLabel
        className="!inline-flex cursor-pointer"
      >
        <CheckboxContainerElement size={props.size}>
          <BasicCheckbox
            id={inputComponentProps.id}
            size={inputComponentProps.size}
            focusRing={false}
            {...props}
          />
          <InputLabelElement as="div" labelSize={props.size} labelOrientation="horizontal">
            {label}
          </InputLabelElement>
        </CheckboxContainerElement>
      </InputContainer>
    );
  }

  return <BasicCheckbox {...inputComponentProps} />;
};
