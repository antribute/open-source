import { classed } from 'utils/classed';
import React from 'react';
import { CollapsibleListItem } from 'components/List/ListItem/CollapsibleListItem';
import { ListItemGroup } from 'components/List/ListItem/ListItem';
import { ListItemLink } from 'components/List/ListItem/ListItemLink';
import { ListItemButton } from 'components/List/ListItem/ListItemButton';

// Container

type ListContainerElementProps = React.ComponentProps<typeof ListContainerElement>;

const ListContainerElement = classed(
  'ul',
  'group',
  'border-divider-weak/50 dark:border-divider-inverse-weak/50',
  {
    variants: {
      border: {
        true: 'border border-solid',
      },

      divide: {
        // true: '',

        true: 'divide-y divide-solid divide-divider-weak/50 dark:divide-divider-inverse-weak/50',
      },
    },
    defaultVariants: {
      divide: false,
      border: false,
    },
  }
);

type ListContainerProps = {
  title?: React.ReactNode;
  zebraItems?: boolean;
  removeItemGutters?: boolean;
  roundedItems?: boolean;
} & ListContainerElementProps;

const ListContainer = ({
  title,
  children,
  zebraItems = false,
  removeItemGutters = false,
  roundedItems = false,
  ...props
}: ListContainerProps) => {
  return (
    <>
      {title && <ListSectionTitle>{title}</ListSectionTitle>}
      <ListContainerElement
        data-zebra={zebraItems}
        data-no-gutters={removeItemGutters}
        data-rounded-items={roundedItems}
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
  'font-bold px-16 text-content-weak/50 dark:text-content-inverse-weak select-none mb-8'
);

// Spacing

const Spacing = classed('hr', 'opacity-0 pb-34');

const Container = ListContainer;

const CollapsibleItem = CollapsibleListItem;

const SectionTitle = ListSectionTitle;

const Item = ListItemGroup;

const LinkItem = ListItemLink;

const ButtonItem = ListItemButton;

export { Container, Item, LinkItem, ButtonItem, CollapsibleItem, Spacing, SectionTitle };
