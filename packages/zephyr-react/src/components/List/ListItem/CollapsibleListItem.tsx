import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { classed } from 'utils/classed';
import { twMerge } from 'tailwind-merge';
import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import { ListItemContainer } from './ListItemContainer';
import { ListItemButton, ListItemButtonProps } from './ListItemButton';

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

type CollapsibleListItemProps = Omit<ListItemButtonProps, 'endIcon'> & {
  children: React.ReactNode;
  contentProps?: Omit<CollapsiblePrimitive.CollapsibleContentProps, 'children' | 'asChild'>;
};

export const CollapsibleListItem = ({
  label,
  startIcon,
  children,
  contentProps,
  className,
  ...props
}: CollapsibleListItemProps) => {
  return (
    <CollapsiblePrimitive.Root asChild>
      <ListItemContainer>
        <CollapsiblePrimitive.Trigger asChild>
          <ListItemButton
            className={twMerge(className)}
            label={label}
            containerProps={{ fragment: true }}
            startIcon={startIcon}
            endIcon={
              <ChevronDownIcon className="group-radix-state-open:rotate-180 group-radix-state-open:opacity-0 " />
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
