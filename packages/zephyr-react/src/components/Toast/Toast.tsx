import { classed, expandVariant } from 'utils/classed';
import * as ToastPrimitive from '@radix-ui/react-toast';
import React, { useState, forwardRef } from 'react';
import { Button, ButtonProps } from 'components/Button';
import { CloseButton } from 'components/IconButton';
import { motion, useReducedMotion, VariantLabels, Variants as MotionVariants } from 'framer-motion';
import { toastActions } from 'components/Toast/toast-function';

const ToastContainerElement = motion(
  classed(
    'li',
    // PaperElement,
    // 'bg-surface',
    // 'radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right',
    // 'radix-state-closed:animate-toast-hide',
    // 'radix-swipe-direction-right:radix-swipe-end:animate-toast-swipe-out-x',
    // 'radix-swipe-direction-right:translate-x-radix-toast-swipe-move-x',
    // 'radix-swipe-direction-down:radix-swipe-end:animate-toast-swipe-out-y',
    // 'radix-swipe-direction-down:translate-y-radix-toast-swipe-move-y',
    // 'radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]',
    'bg-surface-dark/95',
    'border border-highlight-moderate',
    // 'before-absolute-content backdrop-blur-sm backdrop-brightness-[0.3]',
    'backdrop-blur-[1.5px]',
    'relative',
    'p-10 rounded mb-8 md:last:mb-0',
    'active:cursor-grabbing',
    'shadow-2xl'
  )
);

export const ToastViewportElement = motion(
  classed(
    ToastPrimitive.Viewport,
    'fixed bottom-0 z-[100] p-8',
    'list-none',
    'max-h-screen',
    'flex flex-col-reverse',
    'right-0 w-full',

    // expandVariant('md:(max-w-[400px])'),
    // expandVariant('sm:(top-auto,bottom-0,right-0,flex-col,w-full)'),
    // expandVariant('xs:(w-full)')
    expandVariant(`
      md:(max-w-[400px])
      sm:(top-auto,bottom-0,right-0,flex-col)`)
  )
);

type ViewportProps = React.ComponentProps<typeof ToastViewportElement>;

const ToastViewport = forwardRef<HTMLDivElement, ViewportProps>((props, ref) => {
  return <ToastViewportElement {...props} ref={ref} />;
});

export type ToastProps = Omit<
  ToastPrimitive.ToastProps & React.ComponentProps<typeof ToastContainerElement>,
  'asChild' | 'ref'
>;

const ToastContainer = React.forwardRef<HTMLLIElement, ToastProps>(
  ({ children, id, ...props }, ref) => {
    const [swipeComplete, setSwipeComplete] = useState(false);

    return (
      <ToastPrimitive.Root
        onSwipeEnd={() => {
          setSwipeComplete(true);
          console.log('SWIPE END');
          if (id) {
            toastActions.removeToast(id);
          }
        }}
        onSwipeStart={() => {
          console.log('SWIPE START');
        }}
        {...props}
        forceMount
        id={id}
        asChild
        ref={ref}
      >
        <ToastContainerElement
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 1] }}
          exit={{ opacity: 0 }}
          drag="x"
          dragDirectionLock
          dragConstraints={{ left: 0, right: 600 }}
          dragElastic={0.05}
          layout="position"
          dragSnapToOrigin={!swipeComplete}
        >
          {children}
        </ToastContainerElement>
      </ToastPrimitive.Root>
    );
  }
);

export type ToastActionProps = Pick<ToastPrimitive.ToastActionProps, 'altText'> & ButtonProps;

export type ToastActionReactElement = React.ReactElement<typeof ToastAction>;

export const ToastAction = ({ altText, ...props }: ToastActionProps) => {
  return (
    <ToastPrimitive.Action altText={altText} asChild>
      <Button size="sm" variant="glass" color="primary" {...props} />
    </ToastPrimitive.Action>
  );
};

export type ToastCloseProps = ButtonProps;

const ToastClose = ({ ...props }: ToastCloseProps) => {
  return (
    <ToastPrimitive.Close asChild>
      <CloseButton {...props} />
    </ToastPrimitive.Close>
  );
};

const ToastTitle = classed(ToastPrimitive.Title, ' text-content-intense text-sm');

const ToastDescriptionElement = classed(
  ToastPrimitive.Description,
  'font-body text-content-high mt-1 text-md'
);

const ToastDescription = ({
  children,
  ...props
}: React.ComponentProps<typeof ToastDescriptionElement>) => {
  return children ? (
    <ToastDescriptionElement {...props}> {children}</ToastDescriptionElement>
  ) : null;
};

const Container = ToastContainer;

const Viewport = ToastViewport;

const Title = ToastTitle;

const Description = ToastDescription;

const Close = ToastClose;

const Action = ToastAction;

export { Viewport, Container, Title, Description, Close, Action };
