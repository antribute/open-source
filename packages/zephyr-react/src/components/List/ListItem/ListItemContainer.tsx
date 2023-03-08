// List Item Container

import { surfaceGroupTextVariants } from 'styles/surface-colors.variants';
import { classTheme, classed, deriveClassed } from 'utils/classed';

type ListItemContainerElementProps = React.ComponentProps<typeof ListItemContainerElement>;

const ListItemContainerElement = classed(
  'li',
  'group/li list-inside',
  'group-data-[zebra=true]:even::bg-transparent',
  'group-data-[zebra=true]:odd:bg-highlight-subtle',
  'dark:group-data-[zebra=true]:odd:bg-highlight-subtle',

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
