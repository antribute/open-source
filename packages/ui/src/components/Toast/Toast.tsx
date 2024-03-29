import { classed, expandVariant } from 'utils/classed';
import * as ToastPrimitive from '@radix-ui/react-toast';
import React, { forwardRef, useState } from 'react';
import type { ButtonProps } from 'components/Button';
import { Button } from 'components/Button';
import { CloseButton } from 'components/IconButton';
import type { Variant as MotionVariant, Variants as MotionVariants } from 'framer-motion';
import { AnimatePresence, easeIn, interpolate, motion } from 'framer-motion';
import { toastActions, toastState } from 'components/Toast/toast-function';
import clsx from 'clsx';
import { mergeRefs } from 'react-merge-refs';
import useDimensions from 'react-cool-dimensions';
import { useSnapshot } from 'valtio';
import { useIsDarkMode } from 'hooks/useDarkMode';
import { Wrap } from 'components/Wrap';
import * as Tooltip from '@radix-ui/react-tooltip';

const ToastContainerElement = motion(
  classed(
    'div',
    'bg-surface',
    'border border-highlight-moderate',
    'relative',
    'p-10 rounded',
    // 'mb-4 md:mb-8 first:mb-0',
    'mb-4 md:mb-8',
    'active:cursor-grabbing',
    'shadow-lg',
    'w-full max-w-[400px]',
    {
      variants: {
        stacked: {
          true: 'absolute bottom-0',
        },
        firstStackItem: {
          true: 'mb-0',
        },
      },
    }
  )
);

export const ToastViewportElement = motion(
  classed(
    ToastPrimitive.Viewport,
    'fixed bottom-0 z-[100]',
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

const ToastViewportActionButton = ({
  children,
  onClick,
  ...props
}: Pick<ButtonProps, 'children' | 'onClick' | 'color' | 'hoverBackgroundColor'>) => {
  const isDarkMode = useIsDarkMode();
  return (
    <Button
      data-color-scheme={isDarkMode ? undefined : 'default'}
      size="xs"
      rounded
      color="inverse"
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

const ToastViewportActions = ({
  children,
  index,
}: {
  index: number;
  children: React.ReactNode;
}) => {
  const { toasts, showAllToasts, isStacked } = useSnapshot(toastState);

  const isFirstStackItem = isStacked && index === 0;
  const isFirstListItem = !isStacked && index === toasts.length - 1;

  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip.Root
        delayDuration={0}
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal forceMount>
          <Tooltip.Content
            align="end"
            sideOffset={-2}
            className={clsx('pb-8', {
              'gradient-mask-t-90 z-[101]  p-16 pb-8': isStacked,
            })}
          >
            <AnimatePresence>
              {open && (
                <motion.div
                  className={clsx('relative flex w-full min-w-[200px] justify-end gap-6')}
                  initial={{ y: '150%', zIndex: 0, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, zIndex: 200 }}
                  exit={{
                    y: '150%',
                    opacity: [0.5, 0.4, 0],
                    zIndex: 0,
                    transition: { opacity: { duration: 0.2 } },
                  }}
                  style={{ position: 'relative' }}
                  transition={{ y: { damping: 300, duration: 0.3 } }}
                >
                  {isFirstStackItem && (
                    <>
                      <ToastViewportActionButton
                        color="inverse"
                        onClick={() => {
                          toastActions.toggleShowAllToasts(true);
                        }}
                      >
                        {toasts.length} Notifications
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
                  {(isFirstListItem || isFirstStackItem) && (
                    <ToastViewportActionButton
                      hoverBackgroundColor="danger"
                      onClick={() => {
                        toastActions.dismissToasts();
                      }}
                    >
                      Clear All
                    </ToastViewportActionButton>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </>
  );
};

const ToastContainer = React.forwardRef<HTMLLIElement, ToastProps>(
  ({ children, id, index = 0, ...props }, forwardRef) => {
    const { toasts, isStacked } = useSnapshot(toastState);

    const [swipeComplete, setSwipeComplete] = useState(false);

    const { observe } = useDimensions<HTMLLIElement>();

    const ref = mergeRefs([forwardRef, observe]);

    const custom: Custom = { index, count: toasts.length };

    const animate: MotionVariant = {
      opacity: [0, 0.9, 1],
      y: 0,
    };
    const initial: MotionVariant = {
      // opacity: isStacked ? (index === 0 ? 1 : [0, 0.9, 1]) : 0,
      opacity: 0,
      y: isStacked ? 0 : 40,
      position: 'relative',
    };

    const isDarkMode = useIsDarkMode();
    const toastMotionVariants: MotionVariants = {
      initial,
      animate,
      exit: { opacity: 0 },
      exitStacked: { opacity: 0, y: 0 },
      initialStacked: { y: 0, opacity: index === 0 ? 1 : 0 },

      animateStacked: ({ index, count }: Custom) => {
        const input = [0, count - 1];

        const lightModeBrightness = interpolate([0, count], [1, 1.5])(index);
        const darkModeBrightness = interpolate(input, [1, 0.3])(index);
        const brightness = isDarkMode ? darkModeBrightness : lightModeBrightness;

        const zIndex = interpolate(input, [100, 50])(index);
        const opacity = interpolate(input, [1, 0], { ease: easeIn })(index);

        const blur = interpolate(input, [0, 1.2])(index);
        const scaleX = interpolate(input, [1, 0.7])(index);
        const y = interpolate(input, [0, -30])(index);

        return {
          opacity,
          scaleX,
          transition: { bounce: 0, duration: 2, restSpeed: 0.5 },
          x: 0,
          y: index === 0 ? 0 : y,
          zIndex,
          position: 'absolute',
          filter: `brightness(${brightness}) blur(${blur}px)`,
          // backdropFilter: ``,
          // right: 8,
        };
      },
    };

    return (
      <ToastPrimitive.Root
        onSwipeEnd={() => {
          setSwipeComplete(true);
        }}
        onSwipeStart={() => {
          setSwipeComplete(false);
        }}
        {...props}
        forceMount
        id={id}
        asChild
        ref={ref}
      >
        <motion.li layout className="group relative w-full max-w-[400px] px-8">
          <Wrap
            if={isStacked}
            wrap={(c) => (
              <motion.div layout className="relative">
                {c}
              </motion.div>
            )}
          >
            <ToastViewportActions index={index}>
              <ToastContainerElement
                variants={toastMotionVariants}
                custom={custom}
                exit="exit"
                initial="initial"
                animate={isStacked ? 'animateStacked' : 'animate'}
                // initial={isStacked ? 'initialStacked' : 'initial'}
                // exit={isStacked ? 'existStacked' : 'exit'}
                drag="x"
                dragDirectionLock
                dragConstraints={{ left: 0, right: 600 }}
                dragElastic={0.05}
                layoutId={id}
                layout="position"
                className="right-0"
                dragSnapToOrigin={!swipeComplete}
                firstStackItem={isStacked && index === 0}
                stacked={isStacked}
              >
                {children}
              </ToastContainerElement>
            </ToastViewportActions>
          </Wrap>
        </motion.li>
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

const ToastClose = (props: ToastCloseProps) => {
  return (
    <ToastPrimitive.Close asChild>
      <CloseButton {...props} />
    </ToastPrimitive.Close>
  );
};

const ToastTitle = classed(ToastPrimitive.Title, 'font-medium text-content-intense text-sm');

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
