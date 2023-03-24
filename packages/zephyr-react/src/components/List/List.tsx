import { classed, expandVariant } from 'utils/classed';
import React from 'react';
import { CollapsibleListItem } from 'components/List/ListItem/CollapsibleListItem';
import { ListItemGroup } from 'components/List/ListItem/ListItem';
import { ListItemLink } from 'components/List/ListItem/ListItemLink';
import { ListItemButton } from 'components/List/ListItem/ListItemButton';
import { getDataAttributes } from '@antribute/zephyr-core';

// Container

type ListContainerElementProps = React.ComponentProps<typeof ListContainerElement>;

const ListContainerElement = classed(
  'ul',
  'group',
  'border-boundary flex flex-col gap-4',
  expandVariant('data-antribute-list-divide:(gap-0,divide-y,divide-solid,divide-highlight)'),
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

const ListSectionTitle = classed('div', 'font-medium px-16 opacity-40 select-none mb-8');

// Spacing

const Spacing = classed('hr', 'opacity-0 pb-34');

const Container = ListContainer;

const CollapsibleItem = CollapsibleListItem;

const SectionTitle = ListSectionTitle;

const Item = ListItemGroup;

const LinkItem = ListItemLink;

const ButtonItem = ListItemButton;

export { Container, Item, LinkItem, ButtonItem, CollapsibleItem, Spacing, SectionTitle };
