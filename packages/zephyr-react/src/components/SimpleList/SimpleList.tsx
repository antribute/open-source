import { classed, deriveClassed } from 'utils/classed';

// Container
type SimpleListContainerElementProps = React.ComponentProps<typeof SimpleListContainerElement>;

const SimpleListContainerElement = classed('div', 'list-inside space-y-4', {
  variants: {
    variant: {
      bullets: 'list-disc',
      numbers: 'list-decimal',
    },
  },
});

const SimpleListContainer = deriveClassed<
  typeof SimpleListContainerElement,
  Omit<SimpleListContainerElementProps, 'as'>,
  'ul'
>(({ variant, ...props }) => {
  function getAsElement(): 'ul' | 'ol' {
    if (variant === 'numbers') return 'ol';
    if (variant === 'bullets') return 'ul';
    return 'ul';
  }

  const as = getAsElement();

  return <SimpleListContainerElement as={as} variant={variant} {...props} />;
});

// List Item
const SimpleListItem = classed('li');

const Root = SimpleListContainer;

const Item = SimpleListItem;

export { Root, Item };
