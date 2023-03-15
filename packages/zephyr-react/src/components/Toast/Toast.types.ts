import type { ToastProps } from '@radix-ui/react-toast';
import type { ToastActionProps, ToastActionReactElement } from './Toast';

export type ToastId = string;

type ActionProps = Pick<
  ToastActionProps,
  'altText' | 'onClick' | 'variant' | 'loading' | 'children' | 'color' | 'hoverBackgroundColor'
>;

export type ToastVariant = 'neutral' | 'success' | 'info' | 'warning' | 'danger';
export interface ToastData
  extends Pick<ToastProps, 'duration' | 'forceMount' | 'onOpenChange' | 'defaultOpen' | 'open'> {
  id: ToastId;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ActionProps | ActionProps[];
  closing?: boolean;
  variant?: ToastVariant;
}

export type ToastItem = Omit<ToastData, 'id'>;
