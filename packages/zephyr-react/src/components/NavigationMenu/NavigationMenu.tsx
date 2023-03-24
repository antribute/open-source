/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import clsx from 'clsx';
import React from 'react';
import { NavigationMenuContentLink } from 'components/NavigationMenu/NavigationMenu.ContentLink';
import {
  NavigationMenuListElement,
  NavigationMenuListElementProps,
  NavigationMenuTriggerElement,
  NavigationMenuContentElement,
  NavigationMenuLinkElement,
  NavigationMenuIndicatorElement,
  NavigationMenuViewPortElement,
  NavigationMenuContentElementProps,
} from './NavigationMenu.styles';

// Root
const NavigationMenuRoot = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={clsx('relative z-10 flex flex-1 items-center justify-center', className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));

// ViewPort
const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={clsx('absolute flex justify-center', 'top-[80%] left-0 w-full')}>
    <NavigationMenuViewPortElement className={className} ref={ref} {...props} />
  </div>
));

NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

// List
type NavigationMenuListProps = NavigationMenuListElementProps;

const NavigationMenuList = (props: NavigationMenuListProps) => {
  return <NavigationMenuListElement {...props} />;
};

// Content
type NavigationMenuContentProps = NavigationMenuContentElementProps;

const NavigationMenuItemContent = (props: NavigationMenuContentProps) => {
  return <NavigationMenuContentElement {...props} />;
};

// Link
type NavigationMenuLinkProps = NavigationMenuPrimitive.NavigationMenuLinkProps;

const NavigationMenuLink = (props: NavigationMenuLinkProps) => {
  return <NavigationMenuLinkElement {...props} />;
};

// Indicator
type NavigationMenuIndicatorProps = NavigationMenuPrimitive.NavigationMenuIndicatorProps;

const NavigationMenuIndicator = (props: NavigationMenuIndicatorProps) => {
  return (
    <NavigationMenuIndicatorElement {...props}>
      <div className="bg-surface-soft relative top-8 h-12 w-12 rotate-45 shadow-sm" />
    </NavigationMenuIndicatorElement>
  );
};

const Root = NavigationMenuRoot;
const List = NavigationMenuList;
const Item = NavigationMenuPrimitive.Item;
const Content = NavigationMenuItemContent;
const ContentLink = NavigationMenuContentLink;
const Link = NavigationMenuLink;
const Trigger = NavigationMenuTriggerElement;
const Indicator = NavigationMenuIndicator;

export { Root, List, Item, Link, ContentLink, Trigger, Content, Indicator, NavigationMenuRoot };
