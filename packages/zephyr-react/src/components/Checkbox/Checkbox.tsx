import { InputContainer, InputContainerProps } from 'components/Input/InputContainer';
import { useInputProps } from 'components/Input/useInputProps';
import { classed } from 'utils/classed';
import { inputSizeVariants } from 'styles/input-component.variants';
import { InputLabelElement } from 'components/Input/InputLabel';
import { BasicCheckbox, CheckboxElementProps } from './Checkbox.styles';

export type CheckboxProps = Omit<CheckboxElementProps, 'type'> &
  Omit<InputContainerProps, 'children'>;

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

export const Checkbox = (props: CheckboxProps) => {
  const { label, name } = props;
  const { id, inputStateMessagePair, size } = useInputProps(props);

  const checkboxProps = {
    name,
    id,
    size,
  };

  if (label) {
    return (
      <InputContainer
        hideLabel
        labelSize={size}
        htmlFor={id}
        width="auto"
        asLabel
        className="!inline-flex cursor-pointer"
        {...inputStateMessagePair}
      >
        <CheckboxContainerElement size={size}>
          <BasicCheckbox {...checkboxProps} focusRing={false} {...props} />
          <InputLabelElement as="div" labelSize={size} labelOrientation="horizontal">
            {label}
          </InputLabelElement>
        </CheckboxContainerElement>
      </InputContainer>
    );
  }

  return <BasicCheckbox {...checkboxProps} />;
};
