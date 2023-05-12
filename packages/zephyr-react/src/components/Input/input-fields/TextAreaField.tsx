import React, { useRef, forwardRef } from 'react';
import clsx from 'clsx';
import { Classed, classed } from 'utils/classed';
import { useInputWithRefContext } from '../Input.helpers';
import { VisuallyHidden } from 'react-aria';
import { measureElement } from 'utils/measureElement';
import { mergeRefs } from '@react-aria/utils';
import { useLayoutEffect } from 'react';
import { Input as AriaInput } from 'react-aria-components';
import type { InputProps as AriaInputProps } from 'react-aria-components';
import { inputSizeClassName, inputSurfaceClassName } from 'components/Input/Input.styles';
import { BaseInputFieldElement, defaultInputProps } from '../components/BaseInput';
import { InputContainer } from 'components/Input/components/InputContainer';
import { TextField as AriaTextField } from 'react-aria-components';
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
    Classed.VariantProps<typeof BaseTextAreaElement>,
    Pick<React.ComponentProps<typeof BaseTextAreaElement>, 'rows' | 'cols'> {
  disallowNewlineInput?: boolean;
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
      minWidth = 'lg',
      maxWidth = false,
      disallowNewlineInput = true,
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
            inputProps?.onChange?.(e as any);
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
          // style={{ minHeight: `calc(${rows}ch + 8px)` }}
          style={{ minHeight: initialHeight.current }}
        />

        <VisuallyHidden>
          <AriaInput {...props} />
        </VisuallyHidden>
      </>
    );
  }
);
