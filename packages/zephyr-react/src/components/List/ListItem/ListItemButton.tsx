import { Classed, deriveClassed } from 'utils/classed';
import { ListItemGroup, ListItemGroupBaseProps } from './ListItem';

export type ListItemButtonProps = React.ComponentProps<typeof ListItemButton>;

export const ListItemButton = deriveClassed<
  Classed.ClassedComponentType<'button', ListItemGroupBaseProps>,
  Omit<ListItemGroupBaseProps, 'as'>
>(({ className, ...props }) => {
  return <ListItemGroup as="button" hoverable type="button" className={className} {...props} />;
});
