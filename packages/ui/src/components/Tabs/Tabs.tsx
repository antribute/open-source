import * as TabsPrimitive from '@radix-ui/react-tabs';
import {
  TabsContainerElement,
  TabsListElement,
  TabsListElementProps,
  TabsListItemElement,
  TabsListItemElementProps,
  TabsViewContainerElement,
  TabsViewContainerElementProps,
} from 'components/Tabs/Tabs.styles';
import React, { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { ButtonProps } from 'components/Button';
import { Classed, classed } from 'utils/classed';
import { motion } from 'framer-motion';
import { Wrap } from 'components/Wrap';
import { IconButton } from 'components/IconButton';
import { useScrollIntoView } from 'hooks/useScrollIntoView';

type TabsRootProps = TabsPrimitive.TabsProps;

const TabsRoot = (props: TabsRootProps & Classed.VariantProps<typeof TabsContainerElement>) => {
  return <TabsContainerElement {...props} />;
};

type TabsListItemProps = TabsListItemElementProps;

const TabsListItem = (props: TabsListItemProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current?.ariaSelected === 'true') {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <TabsListItemElement
      {...props}
      ref={ref}
      initial={false}
      className={twMerge(props.className)}
      onClick={() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      {props.children}
    </TabsListItemElement>
  );
};

type TabsListProps = TabsListElementProps;

const TabsList = ({ children, className, size = 'md', ...props }: TabsListProps) => {
  const tabListRef = useRef<HTMLDivElement>(null);

  const leftButtonRef = useRef<HTMLButtonElement>(null);

  const rightButtonRef = useRef<HTMLButtonElement>(null);

  const {
    handleScroll,
    viewportRef,

    viewportOverflowData,
  } = useScrollIntoView({
    elements: tabListRef.current ? Array.from(tabListRef.current.children) : undefined,
    // viewportElement,
  });

  const { hasOverflow, isScrollAtLeftBoundary, isScrollAtRightBoundary } = viewportOverflowData;

  return (
    <Wrap
      if={hasOverflow}
      wrap={(c) => (
        <motion.div className="flex items-center gap-x-8" initial={false}>
          <OverflowScrollButton
            position="left"
            enabled={!isScrollAtLeftBoundary}
            ref={leftButtonRef}
            onClick={() => {
              handleScroll('left');
            }}
          />
          {c}
          <OverflowScrollButton
            enabled={!isScrollAtRightBoundary}
            position="right"
            ref={rightButtonRef}
            onClick={() => {
              handleScroll('right');
            }}
          />
        </motion.div>
      )}
    >
      <>
        <motion.div
          key="viewport"
          className="group-radix-orientation-horizontal:overflow-hidden rounded-[0.185rem] relative"
          // ref={observe}
          ref={viewportRef}
          initial={false}
          layout
          transition={{ bounce: 0 }}
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <TabsListElement
            size={size}
            ref={tabListRef}
            {...props}
            transition={{ bounce: 0 }}
            loop={false}
            layout="preserve-aspect"
          >
            {children}
          </TabsListElement>
        </motion.div>
      </>
    </Wrap>
  );
};

const Chevron = classed('span', 'h-full w-full', {
  variants: {
    position: {
      right: 'i-heroicons-chevron-right-20-solid',
      left: 'i-heroicons-chevron-left-20-solid',
    },
  },
});

const OverflowScrollButton = React.forwardRef<
  HTMLButtonElement,
  {
    position: 'left' | 'right';
    enabled: boolean;
  } & Omit<ButtonProps, 'as' | 'children'>
>(({ position, enabled, ...props }, ref) => {
  return (
    <IconButton
      color="secondary"
      className="group-radix-orientation-vertical:hidden"
      variant="ghost"
      size="sm"
      disabled={!enabled}
      ref={ref}
      {...props}
    >
      <Chevron position={position} />
    </IconButton>
  );
});

type TabsViewProps = TabsPrimitive.TabsContentProps;

const TabsView = (props: TabsViewProps) => {
  return <TabsPrimitive.Content {...props} />;
};

type TabsViewContainerProps = TabsViewContainerElementProps;

const TabsViewContainer = (props: TabsViewContainerProps) => {
  return <TabsViewContainerElement {...props} />;
};

const Root = TabsRoot;
const List = TabsList;
const Tab = TabsListItem;
const View = TabsView;
const ViewContainer = TabsViewContainer;

export { Root, List, Tab, View, ViewContainer };
