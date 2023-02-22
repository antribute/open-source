import * as TabsPrimitive from '@radix-ui/react-tabs';
import {
  TabsListElement,
  TabsListElementProps,
  TabsListItemElement,
  TabsListItemElementProps,
} from 'components/Tabs/Tabs.styles';
import { twMerge } from 'tailwind-merge';
import { getRelativeSizeProp } from 'utils/getRelativeSizeProp';

type TabsRootProps = TabsPrimitive.TabsProps;

const TabsRoot = (props: TabsRootProps) => {
  return <TabsPrimitive.Root {...props} />;
};

type TabsListItemProps = TabsListItemElementProps;

const TabsListItem = (props: TabsListItemProps) => {
  return <TabsListItemElement {...props} />;
};

type TabsListProps = TabsListElementProps;

const TabsList = ({ className, size = 'md', ...props }: TabsListProps) => (
  <TabsListElement
    size={size}
    className={twMerge(className, getRelativeSizeProp(-1, { relativeSize: size }))}
    {...props}
  />
);

type TabsViewProps = TabsPrimitive.TabsContentProps;

const TabsView = (props: TabsViewProps) => {
  return <TabsPrimitive.Content {...props} />;
};

const Root = TabsRoot;
const List = TabsList;
const Tab = TabsListItem;
const View = TabsView;

export { Root, List, Tab, View };