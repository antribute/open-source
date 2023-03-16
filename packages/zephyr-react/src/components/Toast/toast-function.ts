import { O } from 'ts-toolbelt';
import { proxy } from 'valtio';
import { uniqueId, debounce } from 'lodash-es';
import type { ToastData, ToastId, ToastItem } from 'components/Toast/Toast.types';

export interface ToastState {
  toasts: ToastData[];
  toastTimeOuts: Map<ToastId, ReturnType<typeof setTimeout>>;
  lastToastAddedTime?: number;
  newToastStackCount: number;
  maxToasts: number;
  isStacked: boolean;
  showAllToasts: boolean;
}

export const toastState = proxy<ToastState>({
  toasts: [],
  toastTimeOuts: new Map(),
  newToastStackCount: 1,
  maxToasts: 5,
  isStacked: false,
  showAllToasts: false,
});

// const derivedToastStat = derive

function dismissToast(toastId: string) {
  if (!toastState.toastTimeOuts.has(toastId)) {
    const toast = toastState.toasts.find(({ id }) => id === toastId)!;
    const timeout = setTimeout(() => {
      toastState.toastTimeOuts.delete(toastId);
      toastState.toasts = toastState.toasts.filter((toast) => {
        return toast.id !== toastId;
      });
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
    const { toasts, maxToasts, showAllToasts } = toastState;
    if (toasts.length > maxToasts && !showAllToasts) {
      toastState.isStacked = true;
    }
  },
  removeToast: (toastId: string) => {
    toastState.toasts = toastState.toasts.filter(({ id }) => id !== toastId);
    toastState.toastTimeOuts.delete(toastId);

    const { toasts, maxToasts } = toastState;
    if (toasts.length <= maxToasts) {
      toastState.isStacked = false;
    }
  },
  updateToast,
  dismissToast,
  dismissToasts: () => {
    toastState.toasts.forEach((toast) => {
      dismissToast(toast.id);
    });

    toastState.isStacked = false;
    toastState.showAllToasts = false;
  },
  toggleStacked: (payload?: boolean) => {
    toastState.isStacked = payload === undefined ? toastState.isStacked : payload;
  },

  toggleMaxStacked: () => {
    const { toasts, maxToasts } = toastState;
    toastState.isStacked = toasts.length > maxToasts;
  },
  toggleShowAllToasts: (payload: boolean) => {
    if (payload) {
      toastState.showAllToasts = true;
      toastState.isStacked = false;
    } else {
      const { toasts, maxToasts } = toastState;
      toastState.showAllToasts = false;
      toastState.isStacked = toasts.length > maxToasts;
    }
  },
} satisfies Record<string, (payload: never) => void>;

export function toast({ autoDismiss = true, ...props }: ToastItem) {
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
      if (!open && autoDismiss) {
        dismiss();
      }
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}
