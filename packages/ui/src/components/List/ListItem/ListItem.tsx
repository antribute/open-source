import { deriveClassed } from '@tw-classed/react';
import type { Classed } from 'utils/classed';
import { Detail } from 'components/Detail';
import { BaseListItemElement } from './BaseListItem';
import type { ListItemContainerProps } from './ListItemContainer';
import { ListItemContainer } from './ListItemContainer';

type ListItemElementVariantProps = Classed.VariantProps<typeof BaseListItemElement>;

export type ListItemBaseProps = ListItemElementVariantProps & {
  label?: React.ReactNode;
  description?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
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

export const ListItem = deriveClassed<typeof BaseListItemElement, ListItemBaseProps>(
  ({ label, startIcon, endIcon, description, children, ...props }, forwardedRef) => {
    return (
      <BaseListItemElement {...props} ref={forwardedRef}>
        <Detail
          className="w-full"
          subtitle={{ color: 'inherit', value: label }}
          startSubtitle={startIcon}
          endSubtitle={endIcon}
          description={description}
        />
        {children}
      </BaseListItemElement>
    );
  }
);

export const ListItemGroup = deriveClassed<typeof BaseListItemElement, ListItemGroupBaseProps>(
  ({ containerProps, ...props }, forwardedRef) => {
    return (
      <ListItemContainer {...containerProps} ref={forwardedRef as never}>
        <ListItem {...props} />
      </ListItemContainer>
    );
  }
);
