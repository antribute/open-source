import { classed } from 'utils/classed';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';

// List
export type NavigationMenuListElementProps = React.ComponentProps<typeof NavigationMenuListElement>;

export const NavigationMenuListElement = classed(
  NavigationMenuPrimitive.List,
  'flex flex-row items-center  rounded-lg bg-surface-soft dark:bg-surface-inverse-soft p-8 space-x-4',
  {
    variants: {},
  }
);

// Trigger
export type NavigationMenuTriggerElementProps = React.ComponentProps<
  typeof NavigationMenuTriggerElement
>;

export const NavigationMenuTriggerElement = classed(
  NavigationMenuPrimitive.Trigger,
  'px-16 py-2 rounded-full hover:bg-surface-dark/50 dark:hover:bg-surface-inverse-light',
  'text-md font-medium',
  'text-content-moderate dark:text-gray-100',
  'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
  {
    variants: {},
  }
);

// Content
export type NavigationMenuContentElementProps = React.ComponentProps<
  typeof NavigationMenuContentElement
>;

export const NavigationMenuContentElement = classed(
  NavigationMenuPrimitive.Content,
  'absolute w-auto p-20 top-0 left-0 rounded-lg',
  'radix-motion-from-start:animate-enter-from-left',
  'radix-motion-from-end:animate-enter-from-right',
  'radix-motion-to-start:animate-exit-to-left',
  'radix-motion-to-end:animate-exit-to-right',

  {
    variants: {},
  }
);

// Link
export type NavigationMenuLinkElementProps = React.ComponentProps<typeof NavigationMenuLinkElement>;

export const NavigationMenuLinkElement = classed(
  NavigationMenuPrimitive.Link,
  NavigationMenuTriggerElement,
  'py-4 cursor-pointer hover:underline underline-offset-4 decoration-1',
  {
    variants: {},
  }
);

// Indicator
export type NavigationMenuIndicatorElementProps = React.ComponentProps<
  typeof NavigationMenuIndicatorElement
>;

export const NavigationMenuIndicatorElement = classed(
  NavigationMenuPrimitive.Indicator,
  'z-10',
  'top-[80%] flex items-end justify-center h-12 overflow-hidden',
  'radix-state-visible:animate-fade-in',
  'radix-state-hidden:animate-fade-out',
  'transition-[width_transform] duration-[250ms] ease-[ease]',

  {
    variants: {},
  }
);

// ViewPort
export type NavigationMenuViewPortElementProps = React.ComponentProps<
  typeof NavigationMenuViewPortElement
>;

export const NavigationMenuViewPortElement = classed(
  NavigationMenuPrimitive.Viewport,
  'relative mt-16  overflow-hidden rounded-lg bg-surface-50 shadow-2xl shadow-surface-light/30 dark:shadow-surface-inverse-light/30 dark:bg-surface-inverse-soft',
  'border border-boundary-weak/25 dark:border-boundary-inverse-moderate/25',
  // 'max-w-screen-xl',
  // 'min-w-[30vw]',
  'w-full',
  'w-radix-navigation-menu-viewport',
  'h-radix-navigation-menu-viewport',
  'radix-state-open:animate-scale-in-content',
  'radix-state-closed:animate-scale-out-content',
  'origin-[top_center] transition-[width_height] duration-300 ease-[ease]',

  {
    variants: {},
  }
);
