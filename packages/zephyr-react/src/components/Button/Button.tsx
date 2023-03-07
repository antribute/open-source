import { deriveClassed } from '@tw-classed/react';
import { ButtonElement, ButtonElementVariantProps } from 'components/Button/Button.styles';
import React from 'react';

export type ButtonProps = React.ComponentProps<typeof Button>;

export const Button = deriveClassed<typeof ButtonElement, ButtonElementVariantProps>(
  ({ variant = 'filled', color = 'primary', ...props }, ref) => {
    return (
      <ButtonElement variant={variant} color={color} extraRoundedPadding {...props} ref={ref} />
    );
  }
);
