import { StatusBadgeElement, StatusBadgeElementProps } from './StatusBadge.styles';

export const StatusBadge = ({
  children,
  size,
  color = 'primary',
  ...props
}: StatusBadgeElementProps) => {
  return (
    <StatusBadgeElement size={size} color={color} {...props}>
      {children}
    </StatusBadgeElement>
  );
};
