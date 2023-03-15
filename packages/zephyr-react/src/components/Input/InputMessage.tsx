import clsx from 'clsx';
import type { HTMLProps, ReactNode } from 'react';
import { classed } from '@tw-classed/react';

export interface InputMessageProps
  extends Omit<HTMLProps<HTMLDivElement>, 'children' | 'role' | 'size' | 'type' | 'color'> {
  inputId: string;
  message?: string | ReactNode;
}

const InputMessage = classed('p', 'text-sm mt-4 ml-2 select-none', {
  variants: {
    inputState: {
      success: clsx('text-success'),
      error: clsx('text-danger'),
    },
    hidden: {
      true: 'src-only',
    },
  },
});

export default InputMessage;
