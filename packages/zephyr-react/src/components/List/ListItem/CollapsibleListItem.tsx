import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { classed, expandVariant } from 'utils/classed';
import { twMerge } from 'tailwind-merge';
import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import { ListItemContainer } from './ListItemContainer';
import { ListItemButton, ListItemButtonProps } from './ListItemButton';
import { pickProps } from 'utils';
import clsx from 'clsx';
import { Detail, DetailProps } from 'components/Detail';
import { isReactNode } from 'utils/component-is-utils';

const CollapsibleContentElement = classed('ul', '', {
  variants: {
    indented: {
      true: 'pl-16',
      md: 'pl-16',
      lg: 'pl-30',
    },
  },
});

type CollapsibleRootProps = Pick<
  CollapsiblePrimitive.CollapsibleProps,
  'open' | 'defaultOpen' | 'onOpenChange'
>;

type CollapsibleListItemProps = Omit<ListItemButtonProps, 'endIcon' | 'label'> & {
  children: React.ReactNode;
  contentProps?: Omit<CollapsiblePrimitive.CollapsibleContentProps, 'children' | 'asChild'>;
  bottomBorder?: boolean;
  headerBackground?: boolean;
  indentContent?: boolean;
  collapsible?: boolean;
  label?: React.ReactNode | DetailProps;
} & CollapsibleRootProps;

export const CollapsibleListItem = ({
  label,
  startIcon,
  children,
  contentProps,
  className,
  bottomBorder,
  headerBackground,
  indentContent,
  collapsible = true,
  hoverable,
  ...props
}: CollapsibleListItemProps) => {
  const collapsibleRootProps = {
    ...pickProps<CollapsibleRootProps>(props, {
      defaultOpen: !indentContent,
      onOpenChange: '_pick_',
      open: '_pick_',
    }),
    disabled: !collapsible,
  };

  return (
    <CollapsiblePrimitive.Root asChild {...collapsibleRootProps}>
      <ListItemContainer className="group">
        <CollapsiblePrimitive.Trigger asChild>
          <ListItemButton
            className={twMerge(
              className,
              clsx({
                'bg-highlight-ghost': headerBackground ?? !indentContent,
                'radix-state-open:group-data-antribute-list-divide:shadow-border-y': bottomBorder,
                bottomBorder,
              })
            )}
            hoverable={hoverable ?? indentContent}
            label={isReactNode(label) ? label : <Detail {...label} />}
            containerProps={{ fragment: true }}
            startIcon={startIcon}
            endIcon={
              collapsible ? (
                <ChevronDownIcon className="fill-current stroke-current stroke-1 opacity-20" />
              ) : undefined
            }
            {...props}
          />
        </CollapsiblePrimitive.Trigger>
        <CollapsiblePrimitive.CollapsibleContent asChild {...contentProps}>
          <CollapsibleContentElement
            indented={indentContent ? (startIcon ? 'lg' : 'md') : undefined}
          >
            {children}
          </CollapsibleContentElement>
        </CollapsiblePrimitive.CollapsibleContent>
      </ListItemContainer>
    </CollapsiblePrimitive.Root>
  );
};
