/* eslint-disable @typescript-eslint/no-floating-promises */
import { classed, expandVariant } from 'utils/classed';
import * as ToastPrimitive from '@radix-ui/react-toast';
import React, { useState, forwardRef, useEffect } from 'react';
import { Button, ButtonProps } from 'components/Button';
import { CloseButton } from 'components/IconButton';
import {
  motion,
  Variants as MotionVariants,
  Variant as MotionVariant,
  useAnimation,
  interpolate,
  easeOut,
  easeIn,
  easeInOut,
  useAnimationControls,
  AnimatePresence,
} from 'framer-motion';
import { toastActions, toastState } from 'components/Toast/toast-function';
import clsx from 'clsx';
import { mergeRefs } from 'react-merge-refs';
import useDimensions from 'react-cool-dimensions';
import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';

const ToastContainerElement = motion(
  classed(
    'li',
    'bg-surface',
    'group',
    'border border-highlight-moderate',
    'relative',
    'p-10 rounded',
    // 'mb-4 md:mb-8 first:mb-0',
    'mb-4 md:mb-8',
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
    expandVariant(`
      md:(max-w-[400px])
      sm:(top-auto,bottom-0,right-0)`)
  )
);

type ViewportProps = React.ComponentProps<typeof ToastViewportElement>;

const ToastViewport = forwardRef<HTMLDivElement, ViewportProps>((props, ref) => {
  return <ToastViewportElement {...props} ref={ref} />;
});

export type ToastProps = { index?: number; isStacked?: boolean } & Omit<
  ToastPrimitive.ToastProps & React.ComponentProps<typeof ToastContainerElement>,
  'asChild' | 'ref'
>;

interface Custom {
  index: number;
  count: number;
}

const ToastContainer = React.forwardRef<HTMLLIElement, ToastProps>(
  ({ children, id, index = 0, ...props }, forwardRef) => {
    const { toasts, maxToasts, showAllToasts, isStacked } = useSnapshot(toastState);

    const [swipeComplete, setSwipeComplete] = useState(false);

    const { observe } = useDimensions<HTMLLIElement>();

    const ref = mergeRefs([forwardRef, observe]);

    const count = Math.min(toasts.length, 5);

    const custom: Custom = { index, count: toasts.length };

    const animate: MotionVariant = {
      opacity: [0, 0.9, 1],
      y: 0,
    };
    const initial: MotionVariant = {
      opacity: 0,
      y: 40,
      position: 'relative',
    };

    const toastMotionVariants: MotionVariants = {
      initial,
      animate,
      exit: { opacity: 0 },
      initialStacked: { ...initial, opacity: 1, scaleX: 'unset' },
      exitFirstStacked: { opacity: 1 },
      animateStacked: ({ index, count }: Custom) => {
        // const brightnessRatio = 1 - (index * 0.3) / count;
        // const blurRatio = 1 * (index / count);
        // const opacity = 1 - index / count;

        const input = [0, count - 1];

        const zIndex = interpolate(input, [100, 50])(index);
        const opacity = interpolate(input, [1, 0], { ease: easeIn })(index);
        const brightness = interpolate(input, [1, 0.3])(index);
        const blur = interpolate(input, [0, 1.2])(index);
        const scaleX = interpolate(input, [1, 0.7])(index);
        const y = interpolate(input, [0, -30])(index);

        return {
          opacity,
          scaleX,
          x: 0,
          y: index === 0 ? 0 : y,
          zIndex,
          position: 'absolute',
          filter: `brightness(${brightness}) blur(${blur}px)`,
          // backdropFilter: ``,
          right: 8,
        };
      },
    };

    const [hovering, setHovering] = useState(false);

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
          variants={toastMotionVariants}
          custom={custom}
          // initial={isStacked ? 'initialFirstStacked' : 'initial'}
          // initial={isStacked ? 'initial' : 'initialStacked'}
          initial="initial"
          animate={isStacked ? 'animateStacked' : 'animate'}
          exit="exit"
          drag="x"
          dragDirectionLock
          onMouseEnter={() => {
            setHovering(true);
          }}
          onMouseLeave={() => {
            setHovering(false);
          }}
          dragConstraints={{ left: 0, right: 600 }}
          dragElastic={0.05}
          // layoutId={id}
          layout="position"
          dragSnapToOrigin={!swipeComplete}
          className={clsx('w-full max-w-[400px]', { 'mb-0': isStacked && index === 0 })}
        >
          {children}

          <ToastViewportActions index={index} hovering={hovering} />

          {/* {isStacked && index === 0 && (
            <motion.div
              onMouseEnter={() => {
                setHovering(true);
              }}
              className={clsx(
                'absolute top-[-115%] bottom-0 left-0 -mb-28 flex h-[115%] w-full items-center overflow-hidden pt-24'
              )}
              layout
            >
              <AnimatePresence>
                {hovering && (
                  <motion.div
                    className="flex w-full justify-end gap-6"
                    initial={{ y: '150%', zIndex: -10 }}
                    animate={{ y: 0, zIndex: 0 }}
                  >
                    <Button
                      size="xs"
                      rounded
                      color="primary"
                      variant="glass"
                      onDrag={(e) => {
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('CLICK');
                        toastActions.toggleShowAllToasts(true);
                      }}
                    >
                      Show All
                    </Button>
                    <Button
                      size="xs"
                      rounded
                      color="primary"
                      variant="glass"
                      hoverBackgroundColor="danger"
                      onDrag={(e) => {
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      Clear All
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )} */}
        </ToastContainerElement>
      </ToastPrimitive.Root>
    );
  }
);

const ToastViewportActionButton = ({
  children,
  onClick,
  ...props
}: Pick<ButtonProps, 'children' | 'onClick' | 'hoverBackgroundColor'>) => {
  return (
    <Button
      size="xs"
      rounded
      color="primary"
      variant="glass"
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
    >
      {children}
    </Button>
  );
};

const ToastViewportActions = ({ hovering, index }: { index: number; hovering: boolean }) => {
  const { toasts, maxToasts, showAllToasts, isStacked } = useSnapshot(toastState);

  const isFirstStackItem = isStacked && index === 0;
  const isFirstListItem = !isStacked && index === toasts.length - 1;
  return (
    <ToastViewportActionsContainer hovering={hovering}>
      {isFirstStackItem && (
        <>
          <ToastViewportActionButton
            onClick={() => {
              toastActions.toggleShowAllToasts(true);
            }}
          >
            Show All
          </ToastViewportActionButton>
        </>
      )}
      {isFirstListItem && (
        <>
          {showAllToasts && (
            <ToastViewportActionButton
              onClick={() => {
                toastActions.toggleShowAllToasts(false);
              }}
            >
              Collapse
            </ToastViewportActionButton>
          )}
        </>
      )}
      {(isFirstListItem || isFirstListItem) && (
        <ToastViewportActionButton
          hoverBackgroundColor="danger"
          onClick={() => {
            toastActions.dismissToasts();
          }}
        >
          Clear All
        </ToastViewportActionButton>
      )}
    </ToastViewportActionsContainer>
  );
};

const ToastViewportActionsContainer = ({
  hovering: hoveringProp,
  children,
}: {
  hovering: boolean;
  children?: React.ReactNode;
}) => {
  const [mouseEnter, setMouseEnter] = useState(hoveringProp);

  const hovering = mouseEnter || hoveringProp;
  return (
    <motion.div
      onMouseEnter={() => {
        setMouseEnter(true);
      }}
      onMouseLeave={() => {
        setMouseEnter(false);
      }}
      className={clsx(
        'absolute top-[-115%] bottom-0 left-0 -mb-28 flex h-[115%] w-full items-center overflow-hidden pt-24'
      )}
      layout
    >
      <AnimatePresence>
        {hovering && (
          <motion.div
            className="flex w-full justify-end gap-6"
            initial={{ y: '150%', zIndex: -10 }}
            animate={{ y: 0, zIndex: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

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

const ToastClose = ({ className, ...props }: ToastCloseProps) => {
  return (
    <ToastPrimitive.Close asChild>
      <CloseButton {...props} />
    </ToastPrimitive.Close>
  );
};

const ToastTitle = classed(ToastPrimitive.Title, ' text-content-intense text-sm');

const ToastDescriptionElement = classed(
  ToastPrimitive.Description,
  'font-body text-content-high mt-1 text-sm'
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
