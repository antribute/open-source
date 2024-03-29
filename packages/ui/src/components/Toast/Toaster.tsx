import type { Classed } from 'utils/classed';
import { classed } from 'utils/classed';
import React, { useMemo } from 'react';
import type { ButtonProps } from 'components/Button';
import { toastActions, toastState } from 'components/Toast/toast-function';
import { Toast } from 'components/Toast';
import type { ToastData, ToastVariant } from 'components/Toast/Toast.types';
import type { ToastState } from 'components/Toast/toast-function';
import { AnimatePresence, motion } from 'framer-motion';
import type { FlexProps } from 'components/Flex';
import { Flex } from 'components/Flex';
import { CloseButton } from 'components/IconButton';
import { twMerge } from 'tailwind-merge';
import { toArray } from 'utils/toArray';
import { useIsDarkMode } from 'hooks/useDarkMode';
import { useSnapshot } from 'valtio';
import { slice } from 'lodash-es';

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

  return (
    <Flex justify={justify} className="" grow gap="md">
      {actions.length > 0 &&
        actions.map((action, i) => {
          function defaultProps() {
            const indexProps: Record<number, Omit<ButtonProps, 'children'>> = {
              0: { variant: 'glass' },
              1: { variant: 'outlined' },
            };
            return indexProps[i];
          }
          return (
            <Toast.Action
              className={twMerge('grow shrink max-w-[115px]', className)}
              size="xs"
              key={i}
              {...defaultProps()}
              {...action}
              color="inverse"
            />
          );
        })}
    </Flex>
  );
};

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
    <Flex gap justify="between">
      <Flex gap align={align} justify={justify} className="w-full">
        <ToastIcon variant={variant} />
        {children}
      </Flex>
      <div className="-mr-4">
        <CloseButton
          animated
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

  return (
    <ToastContainer {...containerProps} align="center" justify="between">
      <Toast.Title className="mr-8 shrink-0 ">{title}</Toast.Title>
      <ToastActionButtons justify="end" action={action} />
    </ToastContainer>
  );
};

/** @jsxImportSource valtio-signal */

const ToasterToast = motion((props: ToastData) => {
  const { id, defaultOpen, closing, duration, onOpenChange, variant = 'neutral', ...rest } = props;

  const isDarkMode = useIsDarkMode();

  function getColorScheme() {
    if (!isDarkMode && variant === 'neutral') return 'surface';
    if (variant === 'neutral') return 'neutral-dark';
    return variant;
  }

  return (
    <Toast.Container
      open
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      data-color-scheme={getColorScheme()}
      id={id}
      layout
      {...rest}
    >
      {closing && (
        <motion.div
          className="bg-content-ghost absolute left-0 top-0 h-6 w-full origin-right "
          initial={{ opacity: 0 }}
          animate={{ scaleX: 0, opacity: 100 }}
          transition={{ duration: (duration ?? Number.NaN) / 1000 }}
        />
      )}
      <ToasterContent {...props} />
    </Toast.Container>
  );
});

export const Toaster = () => {
  const { toasts, maxToasts, showAllToasts, isStacked } = useSnapshot(
    toastState
  ) as unknown as ToastState;

  const toastsArr = useMemo(() => {
    const arr = isStacked ? [...toasts].reverse() : toasts;
    return showAllToasts ? arr : slice(arr, 0, maxToasts);
  }, [isStacked, maxToasts, showAllToasts, toasts]);

  return (
    <>
      <AnimatePresence mode="popLayout">
        {toastsArr.map(({ id, open, ...props }, index) => {
          return <ToasterToast forceMount open={open} key={id} id={id} {...props} index={index} />;
        })}
      </AnimatePresence>
      <Toast.Viewport layoutRoot />
    </>
  );
};
