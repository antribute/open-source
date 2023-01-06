import { ButtonElement, ButtonElementProps } from 'components/Button/Button.styles';

export const Button = ({ variant = 'contained', ...props }: ButtonElementProps) => {
  return <ButtonElement variant={variant} {...props} />;
};
