import React, { forwardRef } from 'react';
import { deriveClassed } from '@tw-classed/react';
import { ButtonElement } from 'components/Button/Button.styles';
import { InlineButtonIcon, InlineButtonIconProps } from 'components/Button/InlineButtonIcon';
import type { ComponentProps } from 'react';

type ButtonComponentProps = {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  startIconClassName?: string;
  endIconClassName?: string;
} & ComponentProps<typeof ButtonElement>;

export const ButtonComponent = forwardRef<HTMLButtonElement, ButtonComponentProps>(
  (
    {
      size = 'md',
      startIcon,
      endIcon,
      startIconClassName,
      endIconClassName,
      children,
      variant = 'filled',
      color = 'primary',
      rounded,
      extraRoundedPadding: extraRoundedPaddingProp,
      ...props
    },
    ref
  ) => {
    function getExtraRoundedPaddingProp() {
      if (extraRoundedPaddingProp) return extraRoundedPaddingProp;
      if (variant === 'ghost' || variant === 'text') return false;
      return true;
    }

    const extraRoundedPadding = getExtraRoundedPaddingProp();

    const inlineButtonIconProps: Partial<InlineButtonIconProps> = {
      size,
      offset: Boolean(rounded && extraRoundedPadding),
    };

    return (
      <ButtonElement
        variant={variant}
        color={color}
        extraRoundedPadding={extraRoundedPadding}
        rounded={rounded}
        size={size}
        {...props}
        ref={ref}
      >
        <InlineButtonIcon
          position="left"
          icon={startIcon}
          className={startIconClassName}
          {...inlineButtonIconProps}
        />
        {children}
        <InlineButtonIcon
          position="right"
          icon={endIcon}
          className={endIconClassName}
          {...inlineButtonIconProps}
        />
      </ButtonElement>
    );
  }
);

/**
 * TODO: Whenever Storybook docgen bug is fixed, simply export a single Button component
 *
 * We're separately defining and exporting ButtonComponent due
 * to a bug in storybook@7.0.4 where prop table isn't generated
 */
export type ButtonProps = React.ComponentProps<typeof Button>;

export const Button = deriveClassed<typeof ButtonElement, ButtonComponentProps>((props, ref) => (
  <ButtonComponent {...props} ref={ref} />
));
