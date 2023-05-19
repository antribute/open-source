import React from 'react';
import { classed, expandVariant } from 'utils/classed';
import { getDataAttributes } from 'config';
import {
  listItemSizingClassName,
  ListItemGroup,
  ListItemButton,
  ListItemLink,
  CollapsibleListItem,
} from './ListItem';

export type {
  CollapsibleListItemProps,
  ListItemBaseProps,
  ListItemLinkProps,
  ListItemProps,
  ListItemContainerProps,
} from './ListItem';

// Container

type ListContainerElementProps = React.ComponentProps<typeof ListContainerElement>;

const ListContainerElement = classed(
  'ul',
  'group',
  'border-boundary flex flex-col gap-4',
  expandVariant(`
  data-antribute-list-divide:(gap-0)
  data-antribute-list-zebra:(gap-0)
  data-antribute-list-zera:(gap-0)
  data-antribute-list-no-gap:(!gap-0)
  `),
  {
    variants: {
      border: {
        true: 'border border-solid',
      },
    },
    defaultVariants: {
      border: false,
    },
  }
);

type ListContainerProps = {
  title?: React.ReactNode;
  zebraItems?: boolean;
  noItemGutters?: boolean;
  noGap?: boolean;
  roundedItems?: boolean;
  divide?: boolean;
} & ListContainerElementProps;

const ListContainer = ({
  title,
  children,
  divide,
  zebraItems,
  noItemGutters,
  roundedItems,
  noGap,
  ...props
}: ListContainerProps) => {
  return (
    <>
      {title && <ListSectionTitle>{title}</ListSectionTitle>}
      <ListContainerElement
        {...getDataAttributes({
          'data-antribute-list': {
            divide,
            'zebra-items': zebraItems,
            'no-item-gutters': noItemGutters,
            'rounded-items': roundedItems,
            'no-gap': noGap,
          },
        })}
        {...props}
      >
        {children}
      </ListContainerElement>
    </>
  );
};

// SectionTitle

const ListSectionTitle = classed(
  'div',
  listItemSizingClassName,
  'font-medium text-content-subtle select-none text-sm',
  'py-8',
  {
    variants: {
      bottomGutter: {
        true: 'mb-8',
      },
    },
    defaultVariants: {
      bottomGutter: false,
    },
  }
);

// SectionItem
const ListSectionItemContainer = classed(
  'div',
  listItemSizingClassName,
  'block bg-highlight text-content-intense',
  'select-none',
  {
    variants: {},
  }
);

const ListSectionItem = ({ title }: { title: string }) => {
  return <ListSectionItemContainer>{title}</ListSectionItemContainer>;
};

// Spacing

const ListSpacing = classed('hr', 'w-full opacity-0', {
  variants: {
    size: {
      xs: 'pb-8',
      sm: 'pb-16',
      md: 'pb-32',
      lg: 'pb-64',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const List = Object.assign(ListContainer, {
  Container: ListContainer,
  Item: ListItemGroup,
  LinkItem: ListItemLink,
  ButtonItem: ListItemButton,
  CollapsibleItem: CollapsibleListItem,
  Spacing: ListSpacing,
  SectionTitle: ListSectionTitle,
  SectionItem: ListSectionItem,
});
