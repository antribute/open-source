import { classed, deriveClassed, expandVariant } from 'utils/classed';

type ListItemContainerElementProps = React.ComponentProps<typeof ListItemContainerElement>;

const ListItemContainerElement = classed(
  'li',
  'group/li list-inside',
  'group-data-antribute-list-zebra-items:even:bg-transparent',
  'relative',
  expandVariant(
    'group-data-antribute-list-zebra-items:odd:before:(content-[""],h-full,w-full,absolute,bg-content-tint)'
  ),

  {
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
  }
);

export type ListItemContainerProps = React.ComponentProps<typeof ListItemContainer>;

export const ListItemContainer = deriveClassed<
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
