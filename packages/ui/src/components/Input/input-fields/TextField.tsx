import { forwardRef } from 'react';
import { TextField as AriaTextField } from 'react-aria-components';
import type { AriaTextFieldProps, InputComponentProps } from '../Input.types';
import { InputContainer } from '../components/InputContainer';
import { InputAddonGroup } from '../components/InputAddonGroup/InputAddonGroup';
import type { InputAddonGroupRenderFnOptions } from '../components/InputAddonGroup';
import { BaseInputField } from '../components/BaseInput';

export interface ITextFieldProps extends AriaTextFieldProps, InputComponentProps {
  renderInput?: (
    params: InputAddonGroupRenderFnOptions &
      Pick<InputComponentProps, 'placeholder' | 'size' | 'loading'>
  ) => React.ReactNode;
}

export type TextFieldProps = React.ComponentProps<typeof TextField>;

export const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(
  ({ children, placeholder, renderInput, ...props }, forwardedRef) => {
    return (
      <InputContainer as={AriaTextField} {...props}>
        <InputAddonGroup
          renderInput={(renderProps) => {
            if (renderInput)
              return renderInput({
                ...renderProps,
                placeholder,
                loading: props.loading,
                size: props.size,
              });

            return (
              <BaseInputField
                ref={forwardedRef}
                size={props.size}
                placeholder={placeholder}
                hasLeadingAddons={renderProps.hasLeadingAddons}
                hasTrailingAddons={renderProps.hasTrailingAddons}
              />
            );
          }}
        >
          {children}
        </InputAddonGroup>
      </InputContainer>
    );
  }
);
