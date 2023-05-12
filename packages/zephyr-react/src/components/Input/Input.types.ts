import type { AriaFieldProps } from 'react-aria';
import type { InputSizeVariants, InputSurfaceVariants } from 'components/Input/Input.styles';
import type { InputAddonGroupProps } from './components/InputAddonGroup/InputAddonGroup';
import type { InputContainerProps } from './components/InputContainer';

export { InputSizeVariants, InputSurfaceVariants };

export type {
  TextFieldProps as AriaTextFieldProps,
  NumberFieldProps as AriaNumberFieldProps,
  InputProps as AriaInputProps,
  CheckboxGroupProps as AriaCheckboxGroupProps,
} from 'react-aria-components';

export interface ResolvedInputComponentStateProps {
  success: boolean;
  error: boolean;
  validationState?: AriaFieldProps['validationState'];
  inputState?: InputComponentState;
  validationMessage?: React.ReactNode;
}

export type InputComponentState = 'error' | 'success';

export interface InputComponentStateProps {
  errorMessage?: React.ReactNode;
  successMessage?: React.ReactNode;
  error?: boolean;
  success?: boolean;
  loading?: boolean;
  isRequired?: boolean;
  showValidationMessageInTooltip?: boolean;
}

interface InputFieldProps {
  placeholder?: string;
}

type AddonGroupProps = Pick<InputAddonGroupProps, 'leadingIcon' | 'trailingIcon'>;

interface IInputComponentProps {
  size: InputSizeVariants;
  surface: InputSurfaceVariants;
  state: InputComponentStateProps;
  container: InputContainerProps;
  field: InputFieldProps;
  addonGroup: AddonGroupProps;
}

export type InputComponentProps = IInputComponentProps['field'] &
  IInputComponentProps['surface'] &
  IInputComponentProps['size'] &
  IInputComponentProps['addonGroup'] &
  IInputComponentProps['field'] &
  IInputComponentProps['surface'] &
  IInputComponentProps['container'];
