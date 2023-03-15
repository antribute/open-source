import { classed } from 'utils/classed';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { useMediaQuery } from 'hooks/useMediaQuery';
import React, { useEffect, useState } from 'react';
import { $ as valtioSignal } from 'valtio-signal';
import { ButtonProps } from 'components/Button';
import { toastActions, toastState } from 'components/Toast/toast-function';
import { Toast } from 'components/Toast';
import { ToastData, ToastState } from 'components/Toast/Toast.types';
import { motion, AnimatePresence } from 'framer-motion';
import { Flex } from 'components/Flex';
import clsx from 'clsx';
import { notEmpty } from 'utils/notEmpty';

import { CloseButton } from 'components/IconButton';

const ToastIcon = classed('span', 'h-20 w-20 fill-content-intense mt-2', {
  variants: {
    variant: {
      danger: 'i-heroicons-x-circle',
      info: 'i-heroicons-information-circle-solid',
      success: 'i-heroicons-check-circle-solid',
      warning: 'i-heroicons-exclaimation-triangle-solid',
    } satisfies Record<Extract<ToastData['variant'], string>, string>,
  },
});

/** @jsxImportSource valtio-signal */

const ToasterToast = motion(
  ({
    action,
    id,
    open: openProp,
    defaultOpen,
    title,
    description,
    closing,
    duration,
    onOpenChange,
    variant,
    ...props
  }: ToastData) => {
    const actions = Array.isArray(action) ? action : [action].filter(notEmpty);

    const [open, setOpen] = useState(openProp);

    useEffect(() => {
      setOpen(openProp);
    }, [openProp]);

    return (
      <Toast.Container
        open
        key={id}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        data-color-scheme={variant}
        id={id}
        {...props}
      >
        {closing && (
          <motion.div
            className="bg-content-ghost absolute left-0 top-0 h-6 w-full origin-right "
            initial={{ opacity: 0 }}
            animate={{ scaleX: 0, opacity: 100 }}
            transition={{ duration: (duration ?? NaN) / 1000 }}
          />
        )}
        <Flex justify="between">
          <Flex justify="between" className="w-4/5">
            <div className={clsx({ 'self-center': !true })}>
              <Flex gap="md">
                {variant && <ToastIcon variant={variant} />}
                <div>
                  <Toast.Title>{title}</Toast.Title>
                  <Toast.Description>{description}</Toast.Description>
                </div>
              </Flex>
            </div>
            <div>
              <div className="flex gap-8">
                {actions.map((action, i) => {
                  function defaultProps() {
                    const indexProps: Record<number, Omit<ButtonProps, 'children'>> = {
                      0: { color: 'primary' },
                      1: { color: 'secondary' },
                      // 2: { color: 'secondary' },
                    };
                    return indexProps[i];
                  }
                  return <Toast.Action variant="glass" key={i} {...defaultProps()} {...action} />;
                })}
              </div>
            </div>
          </Flex>

          <div>
            <CloseButton
              onClick={() => {
                // Immediate close
                toastActions.removeToast(id);
              }}
            />
          </div>
        </Flex>
      </Toast.Container>
    );
  }
);

export const Toaster = () => {
  const isMd = useMediaQuery('(min-width: 768px)');

  return (
    <ToastPrimitive.Provider swipeDirection={isMd ? 'right' : 'down'}>
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
