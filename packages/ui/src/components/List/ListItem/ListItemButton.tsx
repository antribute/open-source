import type { Classed } from 'utils/classed';
import { deriveClassed } from 'utils/classed';
import type { ListItemGroupBaseProps } from './ListItem';
import { ListItemGroup } from './ListItem';

export type ListItemButtonProps = React.ComponentProps<typeof ListItemButton>;

export const ListItemButton = deriveClassed<
  Classed.ClassedComponentType<'button', ListItemGroupBaseProps>,
  Omit<ListItemGroupBaseProps, 'as'>
>(({ className, ...props }) => {
  return <ListItemGroup as="button" hoverable type="button" className={className} {...props} />;
});
