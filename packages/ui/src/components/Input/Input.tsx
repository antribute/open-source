import {
  BaseInputField,
  InputAddon,
  InputAddonGroup,
  InputContainer,
  InputFieldContainer,
  InputLabel,
} from './components';

import {
  CheckboxField,
  CheckboxGroupField,
  NumberField,
  TextAreaField,
  TextField,
} from './input-fields';

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
