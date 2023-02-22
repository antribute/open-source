import { deriveClassed } from '@tw-classed/react';
import { Classed } from 'utils/classed';
import { BaseListItem } from './BaseListItem';
import { ListItemContainer, ListItemContainerProps } from './ListItemContainer';
import { ListItemSpan } from './ListItemSpan';

type ListItemElementVariantProps = Classed.VariantProps<typeof BaseListItem>;

export type ListItemBaseProps = ListItemElementVariantProps & {
  label?: React.ReactNode;
  description?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
};

export type ListItemGroupBaseProps = ListItemBaseProps & {
  label?: React.ReactNode;
  description?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  containerProps?: ListItemContainerProps;
  className?: string;
};

export type ListItemProps = React.ComponentProps<typeof ListItemGroup>;

export const ListItem = deriveClassed<typeof BaseListItem, ListItemBaseProps>(
  ({ label, startIcon, endIcon, description, ...props }) => {
    return (
      <BaseListItem {...props}>
        <ListItemSpan
          label={label}
          startIcon={startIcon}
          endIcon={endIcon}
          description={description}
        />
      </BaseListItem>
    );
  }
);

export const ListItemGroup = deriveClassed<typeof BaseListItem, ListItemGroupBaseProps>(
  ({ containerProps, ...props }) => {
    return (
      <ListItemContainer {...containerProps}>
        <ListItem {...props} />
      </ListItemContainer>
    );
  }
);
