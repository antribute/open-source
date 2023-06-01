import React, { useContext } from 'react';
import { deriveClassed } from 'utils/classed';
import { InputContext as AriaInputContext } from 'react-aria-components';
import { HoverProps, useHover } from 'react-aria';
import { InputAddonProps } from 'components/Input/components/InputAddonGroup/InputAddon';
import { motion } from 'framer-motion';
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

export interface InputAddonGroupRenderFnOptions {
  hasLeadingAddons: boolean;
  hasTrailingAddons: boolean;
  size: InputAddonGroupProps['size'];
  inputRef: React.ForwardedRef<HTMLInputElement> | undefined;
}

type InputAddonGroupRenderFn = (options: InputAddonGroupRenderFnOptions) => React.ReactNode;

export interface InputAddonGroupProps extends InputGroupElementVariantProps, HoverProps {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  size?: InputComponentProps['size'];
  loading?: boolean;
  inputState?: InputComponentState;
  showValidationMessageInTooltip?: boolean;
  className?: string;
  children?: React.ReactNode;
  defaultInputAddonProps?: Partial<InputAddonProps>;
  renderInput: InputAddonGroupRenderFn;
}

function useInputWithRefContext() {
  const inputContext = useContext(AriaInputContext);
  if (inputContext && 'ref' in inputContext) {
    return inputContext;
  }
  return undefined;
}

const MotionInputGroup = motion(InputGroupElement);

export const InputAddonGroup = deriveClassed<typeof InputGroupElement, InputAddonGroupProps>(
  ({ children, renderInput, defaultInputAddonProps, ...props }, forwardedRef) => {
    const contextProps = useContext(InputContainerContext);

    const inputStateProps = contextProps ? parseInputStateProps(contextProps) : undefined;

    const mergedProps = { ...contextProps, ...props };

    const { leadingIcon, trailingIcon, size, loading, showValidationMessageInTooltip } =
      mergedProps;

    const { ref } = useInputWithRefContext() ?? {};

    const { hoverProps, isHovered: isGroupHovered } = useHover(props);

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
      isGroupHovered,
      defaultInputAddonProps,
    });

    return (
      <MotionInputGroup
        role="button"
        {...props}
        {...pickInputGroupElementVariantProps(mergedProps)}
        ref={forwardedRef}
        layout="preserve-aspect"
        initial={false}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(hoverProps as any)}
      >
        {leadingOutsideAddons}
        {leadingIconAddon}
        {leadingInlineAddons}
        {renderInput({ inputRef: ref, hasLeadingAddons, hasTrailingAddons, size })}
        {trailingInlineAddons}
        {trailingIconAddon}
        {trailingOutsideAddons}
      </MotionInputGroup>
    );
  }
);
