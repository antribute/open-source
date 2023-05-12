import { classed, deriveClassed, expandVariant } from 'utils/classed';

type ListItemContainerElementProps = React.ComponentProps<typeof ListItemContainerElement>;

export const ListItemContainerElement = classed(
  'li',
  'group/li is-list-container',
  'list-inside',
  '',
  'relative',
  expandVariant(`
  group-data-antribute-list-zebra-items:even:(bg-transparent)
  group-data-antribute-list-zebra-items:odd:before:(content-[""],h-full,w-full,absolute,bg-content-tint)
  last:group-data-antribute-list-divide:(shadow-border-t-sm)
  first:group-data-antribute-list-divide:(shadow-border-b-sm)
  group-data-antribute-list-divide:(shadow-border-y-sm)

  `),

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

type ListItemContainerBaseProps = {
  fragment?: boolean;
} & ListItemContainerElementProps;

export const ListItemContainer = deriveClassed<
  typeof ListItemContainerElement,
  ListItemContainerBaseProps
>(({ fragment, children, ...props }, forwardedRef) =>
  fragment ? (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  ) : (
    <ListItemContainerElement ref={forwardedRef} {...props}>
      {children}
    </ListItemContainerElement>
  )
);
