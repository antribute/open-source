import { Classed, classed } from 'utils/classed';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { useMediaQuery } from 'hooks/useMediaQuery';
import React from 'react';
import { $ as valtioSignal } from 'valtio-signal';
import { ButtonProps } from 'components/Button';
import { toastActions, toastState } from 'components/Toast/toast-function';
import { Toast } from 'components/Toast';
import type { ToastData, ToastVariant } from 'components/Toast/Toast.types';
import type { ToastState } from 'components/Toast/toast-function';
import { motion, AnimatePresence } from 'framer-motion';
import { Flex, FlexProps } from 'components/Flex';
import { CloseButton } from 'components/IconButton';
import { twMerge } from 'tailwind-merge';
import { toArray } from 'utils/toArray';
import { useIsDarkMode } from 'hooks/useIsDarkMode';
import { useBreakpoint } from 'hooks/useBreakpoints';

const ToastIconElement = classed('span', 'h-24 w-24 text-content-intense', {
  variants: {
    variant: {
      danger: 'i-heroicons-x-circle',
      info: 'i-heroicons-information-circle-solid',
      success: 'i-heroicons-check-circle-solid',
      warning: 'i-heroicons-exclaimation-triangle-solid',
    },
  },
});

type ToastIconProps = { variant?: ToastVariant; className?: string } & Omit<
  Classed.VariantProps<typeof ToastIconElement>,
  'variant'
>;

const ToastIcon = ({ variant, className }: ToastIconProps) => {
  if (variant === 'neutral' || !variant) {
    return null;
  }

  return <ToastIconElement variant={variant} className={className} />;
};

const ToastActionButtons = ({
  action,
  className,
  justify,
}: Pick<ToastData, 'action'> & { className?: string; justify?: FlexProps['justify'] }) => {
  const actions = toArray(action, { notEmpty: true });
  const { md } = useBreakpoint({ md: undefined });

  return (
    <Flex justify={justify} className="" grow gap="md">
      {actions.length > 0 &&
        actions.map((action, i) => {
          function defaultProps() {
            const indexProps: Record<number, Omit<ButtonProps, 'children'>> = {
              0: { color: 'primary' },
              1: { color: 'primary' },
            };
            return indexProps[i];
          }
          return (
            <Toast.Action
              className={twMerge('grow shrink max-w-[115px]', className)}
              variant="glass"
              size={md ? 'sm' : 'xs'}
              key={i}
              {...defaultProps()}
              {...action}
            />
          );
        })}
    </Flex>
  );
};

/** @jsxImportSource valtio-signal */

const ToasterToast = motion((props: ToastData) => {
  const {
    action,
    id,
    open: openProp,
    defaultOpen,
    title,
    description,
    closing,
    duration,
    onOpenChange,
    variant = 'neutral',
    ...rest
  } = props;

  function getColorScheme() {
    if (variant === 'neutral') return 'neutral-dark';
    return variant;
  }

  return (
    <Toast.Container
      open
      key={id}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      data-color-scheme={getColorScheme()}
      id={id}
      {...rest}
    >
      {closing && (
        <motion.div
          className="bg-content-ghost absolute left-0 top-0 h-6 w-full origin-right "
          initial={{ opacity: 0 }}
          animate={{ scaleX: 0, opacity: 100 }}
          transition={{ duration: (duration ?? NaN) / 1000 }}
        />
      )}
      <ToasterContent {...props} />
    </Toast.Container>
  );
});

const ToastContainer = ({
  variant,
  children,
  id,
  align,
  justify,
}: { children: React.ReactNode; align?: FlexProps['align']; justify?: FlexProps['justify'] } & Pick<
  ToastData,
  'variant' | 'id'
>) => {
  return (
    <Flex justify="between">
      <Flex align={align} justify={justify} className="w-full">
        <ToastIcon variant={variant} />
        {children}
      </Flex>
      <div className="-mr-4">
        <CloseButton
          onClick={() => {
            toastActions.removeToast(id);
          }}
        />
      </div>
    </Flex>
  );
};

const ToasterContent = (props: ToastData) => {
  const { title, description, action, variant, id } = props;
  const actions = toArray(action, { notEmpty: true });

  const containerProps = {
    variant,
    id,
  };

  if (description && actions.length > 0) {
    return (
      <ToastContainer {...containerProps}>
        <div className="flex w-full flex-col gap-8">
          <div>
            <Toast.Title>{title}</Toast.Title>
            <Toast.Description>{description}</Toast.Description>
          </div>
          <ToastActionButtons action={action} />
        </div>
      </ToastContainer>
    );
  }

  // if (actions.length > 2) {
  //   return (
  //     <ToastContainer {...containerProps}>
  //       <div>
  //         <Toast.Title>{title}</Toast.Title>
  //         <ToastActionButtons action={action} />
  //       </div>
  //     </ToastContainer>
  //   );
  // }

  return (
    <ToastContainer {...containerProps} align="center" justify="between">
      <Toast.Title className="mr-8 shrink-0 ">{title}</Toast.Title>
      <ToastActionButtons justify="end" action={action} />
    </ToastContainer>
  );
};

export const Toaster = () => {
  const isMd = useMediaQuery('(min-width: 768px)');

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      <AnimatePresence>
        {(valtioSignal(toastState) as unknown as ToastState).toasts.map(
          ({ id, open, ...props }) => {
            return <ToasterToast forceMount open={open} key={id} id={id} {...props} />;
          }
        )}
      </AnimatePresence>
      <Toast.Viewport />
    </ToastPrimitive.Provider>
  );
};
