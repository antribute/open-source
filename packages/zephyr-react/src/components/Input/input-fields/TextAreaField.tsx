import React, { useRef, forwardRef, useLayoutEffect } from 'react';
import clsx from 'clsx';
import { classed } from 'utils/classed';
import { VisuallyHidden } from 'react-aria';
import { measureElement } from 'utils/measureElement';
import { mergeRefs } from '@react-aria/utils';
import { Input as AriaInput, TextField as AriaTextField } from 'react-aria-components';
import type { InputProps as AriaInputProps } from 'react-aria-components';
import {
  InputSizeVariants,
  inputSizeClassName,
  inputSurfaceClassName,
} from 'components/Input/Input.styles';
import { InputContainer } from 'components/Input/components/InputContainer';
import {
  BaseInputFieldElement,
  InputFieldContainerVariants,
  defaultInputProps,
} from '../components/BaseInput';
import { useInputWithRefContext } from '../Input.helpers';
import type { InputComponentProps, AriaTextFieldProps } from '../Input.types';

export type TextAreaFieldProps = React.ComponentProps<typeof TextAreaField>;

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  BaseTextAreaProps & InputComponentProps & AriaTextFieldProps
>(({ children, placeholder, resizeable, rows, cols, ...props }, forwardedRef) => {
  return (
    <InputContainer {...props} as={AriaTextField}>
      <BaseTextArea
        ref={forwardedRef}
        size={props.size}
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        resizeable={resizeable}
      />
    </InputContainer>
  );
});

const BaseTextAreaElement = classed(
  'textarea',
  BaseInputFieldElement,
  inputSurfaceClassName,
  inputSizeClassName,
  'p-8 text-content',
  'overflow-auto',
  {
    variants: {
      resizeable: {
        false: clsx('resize-none'),
        true: clsx('resize-none hover:resize focus:resize active:resize'),
        y: clsx('resize-none hover:resize-y focus:resize-y active:resize-y'),
        x: clsx('resize-none hover:resize-x focus:resize-x active:resize-x'),
      },
    },
  }
);

BaseTextAreaElement.defaultProps = defaultInputProps;

interface BaseTextAreaProps
  extends Omit<AriaInputProps, 'size' | 'width'>,
    InputSizeVariants,
    InputFieldContainerVariants,
    Pick<React.ComponentProps<typeof BaseTextAreaElement>, 'rows' | 'cols'> {
  resizeable?: boolean | 'x' | 'y';
}

export const BaseTextArea = forwardRef<HTMLTextAreaElement, BaseTextAreaProps>(
  (
    {
      rows = 4,
      cols,
      resizeable = false,
      size,
      hasLeadingAddons,
      hasTrailingAddons,
      minWidth = false,
      maxWidth = false,
      ...props
    },
    forwardedRef
  ) => {
    const inputProps = useInputWithRefContext() ?? {};

    const innerRef = useRef<HTMLTextAreaElement>(null);

    const ref = mergeRefs(
      inputProps.ref as React.RefObject<HTMLTextAreaElement>,
      innerRef,
      forwardedRef
    );

    const initialHeight = useRef<number | undefined>();

    useLayoutEffect(() => {
      if (!initialHeight.current && innerRef.current) {
        const { height } = measureElement(innerRef);
        initialHeight.current = height;
      }
    }, []);

    return (
      <>
        <BaseTextAreaElement
          {...(inputProps as object)}
          onChange={(e) => {
            inputProps.onChange?.(e as never);
          }}
          ref={ref}
          {...{
            minWidth,
            maxWidth,
            rows,
            cols,
            size,
            resizeable,
            hasLeadingAddons,
            hasTrailingAddons,
          }}
          style={{ minHeight: initialHeight.current }}
        />

        <VisuallyHidden>
          <AriaInput {...props} />
        </VisuallyHidden>
      </>
    );
  }
);
