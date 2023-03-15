import { classed, expandVariant } from 'utils/classed';
import * as ToastPrimitive from '@radix-ui/react-toast';
import React, { useState } from 'react';
import { Button, ButtonProps } from 'components/Button';
import { CloseButton } from 'components/IconButton';
import { motion, useReducedMotion, VariantLabels, Variants as MotionVariants } from 'framer-motion';
import { toastActions } from 'components/Toast/toast-function';

const ToastContainerElement = classed(
  motion.div,
  // PaperElement,
  'bg-surface',
  // 'radix-state-open:animate-toast-slide-in-bottom md:radix-state-open:animate-toast-slide-in-right',
  // 'radix-state-closed:animate-toast-hide',
  // 'radix-swipe-direction-right:radix-swipe-end:animate-toast-swipe-out-x',
  // 'radix-swipe-direction-right:translate-x-radix-toast-swipe-move-x',
  // 'radix-swipe-direction-down:radix-swipe-end:animate-toast-swipe-out-y',
  // 'radix-swipe-direction-down:translate-y-radix-toast-swipe-move-y',
  // 'radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease]',
  'border border-highlight',
  'relative',
  'p-10 rounded mb-8 last:mb-0',
  'active:cursor-grabbing'
);

export const ToastViewport = motion(
  classed(
    ToastPrimitive.Viewport,
    'fixed top-0 z-[100] p-8',
    'max-h-screen w-full',
    'flex flex-col-reverse',
    expandVariant(`
  md:(max-w-[400px])
  sm:(top-auto,bottom-0,right-0,flex-col)`)
  )
);

export type ToastProps = Omit<
  ToastPrimitive.ToastProps & React.ComponentProps<typeof ToastContainerElement>,
  'asChild' | 'ref'
>;

// const toastMotionVariants = {
//   initial: {}
//   animate: { scale: 0, opacity: [0, 0.9, 1], },
//   shown: { scale: 1 },
// } satisfies MotionVariants;

const toastMotionVariants = {
  initial: { opacity: 0, y: 40, scale: 0 },
  animate: { scale: 0, opacity: 1, y: 0, transition: { staggerChildren: 0.3, delayChildren: 0.5 } },
  exit: { opacity: 0 },
} satisfies MotionVariants;

const ToastContainer = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ children, id, ...props }, ref) => {
    const [swipeComplete, setSwipeComplete] = useState(false);

    return (
      <ToastPrimitive.Root
        onSwipeEnd={() => {
          setSwipeComplete(true);
          if (id) {
            toastActions.removeToast(id);
          }
        }}
        asChild
        {...props}
        forceMount
        id={id}
      >
        <ToastContainerElement
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: [0, 0.9, 1], y: 0 }}
          exit={{ opacity: 0 }}
          ref={ref}
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

const ToastTitle = classed(ToastPrimitive.Title, 'font-medium text-content-intense text-md');

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
