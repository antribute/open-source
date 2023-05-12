import {
  BaseInputField,
  InputFieldContainer,
  InputAddon,
  InputAddonGroup,
  InputContainer,
  InputLabel,
} from './components';

import {
  TextField,
  TextAreaField,
  NumberField,
  CheckboxField,
  CheckboxGroupField,
} from './input-fields';


export type { InputContainerProps } from './components'

export type { InputComponentProps } from './Input.types'

export type * from './input-fields';

export const Input = Object.assign(TextField, {
  TextField,
  NumberField,
  TextAreaField,
  CheckboxField,
  CheckboxGroupField,
  Container: InputContainer,
  Addon: InputAddon,
  AddonGroup: InputAddonGroup,
  BaseInputField,
  Label: InputLabel,
  InputFieldContainer,
});
