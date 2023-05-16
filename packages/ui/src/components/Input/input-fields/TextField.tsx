import { forwardRef } from 'react';
import { TextField as AriaTextField } from 'react-aria-components';
import { AriaTextFieldProps, InputComponentProps } from '../Input.types';
import { InputContainer } from '../components/InputContainer';
import { InputAddonGroup } from '../components/InputAddonGroup/InputAddonGroup';
import { BaseInputField } from '../components/BaseInput';

export type TextFieldProps = React.ComponentProps<typeof TextField>;

export const TextField = forwardRef<HTMLInputElement, AriaTextFieldProps & InputComponentProps>(
  ({ children, placeholder, ...props }, forwardedRef) => {
    return (
      <InputContainer as={AriaTextField} {...props}>
        <InputAddonGroup
          renderInput={({ hasLeadingAddons, hasTrailingAddons }) => (
            <BaseInputField
              ref={forwardedRef}
              size={props.size}
              placeholder={placeholder}
              hasLeadingAddons={hasLeadingAddons}
              hasTrailingAddons={hasTrailingAddons}
            />
          )}
        >
          {children}
        </InputAddonGroup>
      </InputContainer>
    );
  }
);
