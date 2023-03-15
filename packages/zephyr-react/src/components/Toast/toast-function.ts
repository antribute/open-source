import { O } from 'ts-toolbelt';
import { proxy } from 'valtio/vanilla';
import { uniqueId } from 'lodash-es';
import type { ToastData, ToastItem, ToastState } from 'components/Toast/Toast.types';

export const toastState = proxy<ToastState>({ toasts: [], toastTimeOuts: new Map() });

function dismissToast(toastId: string) {
  if (!toastState.toastTimeOuts.has(toastId)) {
    const toast = toastState.toasts.find(({ id }) => id === toastId)!;
    const timeout = setTimeout(() => {
      toastState.toastTimeOuts.delete(toastId);
      toastState.toasts = toastState.toasts.filter((toast) => {
        return toast.id !== toastId;
      });
      // toastState.toasts = toastState.toasts.map((toast) => {
      //   return { ...toast, open: toast.id === toastId ? false : toast.open };
      // });
    }, toast.duration ?? 0);

    updateToast({ id: toastId, closing: true });

    toastState.toastTimeOuts.set(toastId, timeout);
  }
}

function updateToast(toastData: O.Required<Partial<ToastData>, 'id'>) {
  toastState.toasts = toastState.toasts.map((toast) => {
    if (toast.id === toastData.id) {
      return { ...toast, ...toastData };
    }
    return toast;
  });
}

export const toastActions = {
  addToast: (payload: ToastData) => {
    toastState.toasts.push(payload);
  },
  removeToast: (toastId: string) => {
    toastState.toasts = toastState.toasts.filter(({ id }) => id !== toastId);
    toastState.toastTimeOuts.delete(toastId);
  },
  updateToast,
  dismissToast,
  dismissToasts: () => {
    toastState.toasts.forEach((toast) => {
      dismissToast(toast.id);
    });
  },
} satisfies Record<string, (payload: never) => void>;

export function toast({ ...props }: ToastItem) {
  const id = uniqueId('toast');

  function update(props: ToastData) {
    toastActions.updateToast({ ...props, id });
  }

  function dismiss() {
    toastActions.dismissToast(id);
  }

  toastActions.addToast({
    ...props,
    open: true,
    id,
    onOpenChange: (open) => {
      if (!open) dismiss();
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}
