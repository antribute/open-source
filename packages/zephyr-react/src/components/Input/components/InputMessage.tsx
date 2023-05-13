import clsx from 'clsx';
import { Text as AriaText } from 'react-aria-components';
import { classed } from '@tw-classed/react';
import { Text } from 'components/Text';
import type { ResolvedInputComponentStateProps } from '../Input.types';

type InputMessageElementProps = React.ComponentProps<typeof InputMessageElement>;

const InputMessageElement = classed(AriaText, 'text-sm mt-[3px] mb-2 ml-2 select-none', {
  variants: {
    inputState: {
      false: '',
      success: clsx('text-success'),
      error: clsx('text-danger'),
    },
    topMargin: {
      true: 'mt-6',
    },
    hideMessage: {
      true: 'src-only',
    },
  },
  defaultVariants: {
    topMargin: 'true',
    inputState: false,
  },
});

const InputValidationMessageElement = classed(AriaText, InputMessageElement, {
  variants: {
    inputState: {
      false: '',
      success: clsx('text-success'),
      error: clsx('text-danger'),
    },
  },
});

export const InputDescription = ({ ...props }: InputMessageElementProps) => {
  return <InputMessageElement {...props} />;
};

export type InputValidationMessageProps<T = InputMessageElementProps> = {
  inputStateProps?: ResolvedInputComponentStateProps;
} & T;

export const InputValidationMessage = ({
  inputStateProps,
  ...props
}: InputValidationMessageProps) => {
  const { inputState, validationMessage } = inputStateProps ?? {};

  return (
    <InputValidationMessageElement inputState={inputState} {...props}>
      {validationMessage}
      <Text.Blank />
    </InputValidationMessageElement>
  );
};
