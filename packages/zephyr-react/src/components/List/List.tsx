import { classed, expandVariant } from 'utils/classed';
import React from 'react';
import { CollapsibleListItem } from 'components/List/ListItem/CollapsibleListItem';
import { ListItemGroup } from 'components/List/ListItem/ListItem';
import { ListItemLink } from 'components/List/ListItem/ListItemLink';
import { ListItemButton } from 'components/List/ListItem/ListItemButton';
import { getDataAttributes } from '@antribute/zephyr-core';
import { listItemSizingClassName } from 'components/List/ListItem/BaseListItem';

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

const Spacing = classed('hr', 'w-full opacity-0', {
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

const Container = ListContainer;

const CollapsibleItem = CollapsibleListItem;

const SectionTitle = ListSectionTitle;

const Item = ListItemGroup;

const LinkItem = ListItemLink;

const ButtonItem = ListItemButton;

export {
  Container,
  Item,
  LinkItem,
  ButtonItem,
  CollapsibleItem,
  Spacing,
  SectionTitle,
  ListSectionItem,
};
