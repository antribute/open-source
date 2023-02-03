import { ButtonElement, ButtonElementProps } from 'components/Button/Button.styles';

export type ButtonProps = ButtonElementProps;

export const Button = ({ variant = 'contained', ...props }: ButtonProps) => {
  return <ButtonElement variant={variant} {...props} />;
};
