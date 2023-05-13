import React, { useContext } from 'react';
import { deriveClassed } from 'utils/classed';
import { InputContext as AriaInputContext } from 'react-aria-components';
import { parseInputStateProps } from '../../Input.helpers';
import { useInputAddonList } from './useInputAddonList';
import type { InputComponentProps } from '../../Input.types';
import {
  InputGroupElement,
  InputGroupElementVariantProps,
  pickInputGroupElementVariantProps,
} from '../../Input.styles';
import { InputContainerContext } from '../InputContainer';

export type InputComponentState = 'error' | 'success';

type RenderInputFn = (options: {
  hasLeadingAddons: boolean;
  hasTrailingAddons: boolean;
}) => React.ReactNode;

export interface InputAddonGroupProps extends InputGroupElementVariantProps {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  size?: InputComponentProps['size'];
  loading?: boolean;
  inputState?: InputComponentState;
  showValidationMessageInTooltip?: boolean;
  className?: string;
  children?: React.ReactNode;
  renderInput: RenderInputFn;
}

function useInputWithRefContext() {
  const inputContext = useContext(AriaInputContext);
  if (inputContext && 'ref' in inputContext) {
    return inputContext;
  }
  return undefined;
}

export const InputAddonGroup = deriveClassed<typeof InputGroupElement, InputAddonGroupProps>(
  ({ children, renderInput, ...props }) => {
    const contextProps = useContext(InputContainerContext);

    const inputStateProps = contextProps ? parseInputStateProps(contextProps) : undefined;

    const mergedProps = { ...contextProps, ...props };

    const { leadingIcon, trailingIcon, size, loading, showValidationMessageInTooltip } =
      mergedProps;

    const { ref } = useInputWithRefContext() ?? {};

    const {
      leadingInlineAddons,
      leadingOutsideAddons,
      trailingInlineAddons,
      trailingOutsideAddons,
      leadingIconAddon,
      hasLeadingAddons,
      hasTrailingAddons,
      trailingIconAddon,
    } = useInputAddonList({
      leadingIcon,
      trailingIcon,
      size,
      inputStateProps,
      children,
      loading,
      inputRef: ref,
      showValidationMessageInTooltip,
    });

    return (
      <InputGroupElement
        role="button"
        {...props}
        {...pickInputGroupElementVariantProps(mergedProps)}
      >
        {leadingOutsideAddons}
        {leadingIconAddon}
        {leadingInlineAddons}
        {renderInput({ hasLeadingAddons, hasTrailingAddons })}
        {trailingInlineAddons}
        {trailingIconAddon}
        {trailingOutsideAddons}
      </InputGroupElement>
    );
  }
);
