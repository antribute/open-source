import { StatusBadgeDot, StatusBadgeElement, StatusBadgeElementProps } from './StatusBadge.styles';

export const StatusBadge = ({
  children,
  size,
  color = 'primary',
  ...props
}: StatusBadgeElementProps) => {
  return (
    <StatusBadgeElement size={size} color={color} {...props}>
      <StatusBadgeDot size={size} color={color} />
      {children}
    </StatusBadgeElement>
  );
};
