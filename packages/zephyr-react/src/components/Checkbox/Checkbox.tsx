import { InputContainerProps } from 'components/Input/InputContainer';
import { useInputProps } from 'components/Input/useInputProps';
import { classTheme, classed } from 'utils/classed';
import { BaseInputElement } from 'components/BaseInput/BaseInput.styles';
import { CheckboxElement, CheckboxElementProps } from './Checkbox.styles';

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
          <span
            className={classTheme({
              class: 'font-bold select-none',
              light: 'text-content-strong peer-checked:text-content-weak',
              dark: 'dark:text-content-inverse-strong  dark:peer-checked:text-content-inverse-weak',
            })}
          >
            {label}
          </span>
        )}
      </CheckboxInputElement>
    );
  }

  return <CheckboxElement type="checkbox" {...inputComponentProps} />;
};
