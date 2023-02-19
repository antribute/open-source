import { Classed, deriveClassed } from 'utils/classed';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import { ListItemGroup, ListItemGroupBaseProps } from './ListItem';

// List Item Link

export type ListItemLinkProps = ListItemGroupBaseProps & {
  showExternalLinkIcon?: boolean;
};

export const ListItemLink = deriveClassed<
  Classed.ClassedComponentType<'a', ListItemLinkProps>,
  Omit<ListItemLinkProps, 'as'>
>(({ showExternalLinkIcon, ...props }) => {
  return (
    <ListItemGroup
      as="a"
      hoverable
      {...props}
      endIcon={showExternalLinkIcon ? <ArrowTopRightOnSquareIcon /> : undefined}
    />
  );
});
