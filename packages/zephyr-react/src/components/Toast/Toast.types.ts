import type { ToastProps } from '@radix-ui/react-toast';
import type { ToastActionProps, ToastActionReactElement } from './Toast';

type ToastId = string;

type ActionProps = Pick<
  ToastActionProps,
  'altText' | 'onClick' | 'variant' | 'loading' | 'children' | 'color' | 'hoverBackgroundColor'
>;
export interface ToastData
  extends Pick<ToastProps, 'duration' | 'forceMount' | 'onOpenChange' | 'defaultOpen' | 'open'> {
  id: ToastId;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ActionProps | ActionProps[];
  closing?: boolean;
  variant?: 'success' | 'info' | 'warning' | 'danger';
}

export type ToastItem = Omit<ToastData, 'id'>;

export interface ToastState {
  toasts: ToastData[];
  toastTimeOuts: Map<ToastId, ReturnType<typeof setTimeout>>;
}
