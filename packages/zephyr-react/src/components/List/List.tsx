import { classed, Classed, deriveClassed } from 'utils/classed';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import { twMerge } from 'tailwind-merge';
import React from 'react';

// Container

const ListContainer = classed(
  'ul',
  'flex flex-col gap-4 bg-surface dark:bg-surface-inverse-soft  space-y-2 p-8'
);

// SectionTitle

const ListSectionTitle = classed(
  'div',
  'font-bold px-16 text-content-weak/50 dark:text-content-inverse-weak  select-none'
);

// Spacing

const Spacing = classed('hr', 'opacity-0 pb-34');

// BaseListItemElement

export type BaseListItemElementProps = Classed.ComponentProps<typeof BaseListItemElement>;

const BaseListItemElement = classed.div(
  'group flex items-center relative',
  'px-16 py-12 rounded-md font-medium  gap-14 flex w-full',
  {
    variants: {
      highlight: {
        true: 'bg-surface-dark/50 dark:bg-surface-inverse-light/80',
        false: 'bg-transparent',
      },
      hoverable: {
        true: 'hover:bg-surface-dark/50 dark:hover:bg-surface-inverse-light/80 cursor-pointer',
      },
    },

    defaultVariants: {
      highlight: false,
      hoverable: true,
    },

    compoundVariants: [{ hoverable: true, class: 'select-none' }],
  }
);

// List Item Container

type ListItemContainerElementProps = React.ComponentProps<typeof ListItemContainerElement>;

const ListItemContainerElement = classed('li', 'list-inside', {
  variants: {
    listStyle: {
      none: 'list-none',
      disc: 'list-disc',
      number: 'list-decimal',
    },
  },
  defaultVariants: {
    listStyle: 'none',
  },
});

type ListItemContainerProps = React.ComponentProps<typeof ListItemContainer>;

const ListItemContainer = deriveClassed<
  typeof ListItemContainerElement,
  ListItemContainerElementProps & { fragment?: boolean }
>(({ fragment, children, ...props }) =>
  fragment ? (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  ) : (
    <ListItemContainerElement {...props}>{children}</ListItemContainerElement>
  )
);

// List Item

type ListItemElementVariantProps = Classed.VariantProps<typeof BaseListItemElement>;

export type ListItemBaseProps = ListItemElementVariantProps & {
  label?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  containerProps?: ListItemContainerProps;
  className?: string;
};

export type ListItemProps = React.ComponentProps<typeof ListItem>;

const ListItem = deriveClassed<typeof BaseListItemElement, ListItemBaseProps>(
  ({ label, startIcon, endIcon, containerProps, ...props }) => {
    return (
      <ListItemContainer {...containerProps}>
        <BaseListItemElement {...props}>
          {startIcon && <span className="h-24 w-24">{startIcon}</span>}
          {label}
          {endIcon && (
            <div className="absolute right-16 flex h-16 w-16 items-center">{endIcon}</div>
          )}
        </BaseListItemElement>
      </ListItemContainer>
    );
  }
);

// Button Item

export type ListItemButtonProps = React.ComponentProps<typeof ListItemButton>;

const ListItemButton = deriveClassed<
  Classed.ClassedComponentType<'button', ListItemBaseProps>,
  Omit<ListItemBaseProps, 'as'>
>(({ className, ...props }) => {
  return <ListItem as="button" className={twMerge('', className)} {...props} />;
});

// Link Item

const ListItemLink = deriveClassed<
  Classed.ClassedComponentType<'a', ListItemBaseProps>,
  Omit<ListItemBaseProps, 'as'>
>((props) => {
  return <ListItem as="a" {...props} />;
});

// Collapsible List Item

const CollapsibleContentElement = classed('ul', '', {
  variants: {
    leftPadding: {
      md: 'pl-16',
      lg: 'pl-30',
    },
  },
  defaultVariants: {
    leftPadding: 'md',
  },
});

type CollapsibleListItemContentProps = Omit<ListItemButtonProps, 'endIcon'> & {
  children: React.ReactNode;
  contentProps?: Omit<CollapsiblePrimitive.CollapsibleContentProps, 'children' | 'asChild'>;
};

const CollapsibleListItemContent = ({
  label,
  startIcon,
  children,
  contentProps,
  ...props
}: CollapsibleListItemContentProps) => {
  return (
    <CollapsiblePrimitive.Root asChild>
      <ListItemContainer>
        <CollapsiblePrimitive.Trigger asChild>
          <ListItemButton
            className={twMerge('')}
            label={label}
            containerProps={{ fragment: true }}
            startIcon={startIcon}
            endIcon={
              <ChevronDownIcon className="text-content-weak group-radix-state-open:rotate-180 dark:text-content-inverse-weak" />
            }
            {...props}
          />
        </CollapsiblePrimitive.Trigger>
        <CollapsiblePrimitive.CollapsibleContent asChild {...contentProps}>
          <CollapsibleContentElement leftPadding={startIcon ? 'lg' : 'md'}>
            {children}
          </CollapsibleContentElement>
        </CollapsiblePrimitive.CollapsibleContent>
      </ListItemContainer>
    </CollapsiblePrimitive.Root>
  );
};

const Container = ListContainer;

const CollapsibleItem = CollapsibleListItemContent;

const SectionTitle = ListSectionTitle;

const LinkItem = ListItemLink;

const ButtonItem = ListItemButton;

const Item = ListItem;

export { Container, Item, LinkItem, ButtonItem, CollapsibleItem, Spacing, SectionTitle };
