import React, { forwardRef, useLayoutEffect, useRef } from 'react';
import clsx from 'clsx';
import type { ClassedVariantProps } from 'utils/classed';
import { classed } from 'utils/classed';
import { VisuallyHidden } from 'react-aria';
import { measureElement } from 'utils/measureElement';
import { mergeRefs } from '@react-aria/utils';
import { Input as AriaInput, TextField as AriaTextField } from 'react-aria-components';
import type { InputProps as AriaInputProps } from 'react-aria-components';
import type { InputSizeVariants } from 'components/Input/Input.styles';
import { inputSizeClassName, inputSurfaceClassName } from 'components/Input/Input.styles';
import {
  InputContainer,
  pickInputContainerProps,
} from 'components/Input/components/InputContainer';
import { generatePropPickerFn } from 'utils';
import type { InputFieldContainerVariants } from '../components/BaseInput';
import { BaseInputFieldElement, defaultInputProps } from '../components/BaseInput';
import { useInputWithRefContext } from '../Input.helpers';
import type { AriaTextFieldProps, InputComponentProps } from '../Input.types';

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

type BaseTextAreaVariantProps = ClassedVariantProps<typeof BaseTextAreaElement> &
  Pick<BaseTextAreaProps, 'rows' | 'cols'> &
  Pick<InputComponentProps, 'placeholder'>;

const pickBaseTextAreaProps = generatePropPickerFn<BaseTextAreaVariantProps>({
  filled: '_pick_',
  border: '_pick_',
  shadow: '_pick_',
  cursor: '_pick_',
  roundedFull: '_pick_',
  size: '_pick_',
  fullWidth: '_pick_',
  width: '_pick_',
  minWidth: '_pick_',
  maxWidth: '_pick_',
  hasLeadingAddons: '_pick_',
  hasTrailingAddons: '_pick_',
  resizeable: '_pick_',
  cols: '_pick_',
  rows: '_pick_',
  placeholder: '_pick_',
});

export interface BaseTextAreaProps
  extends Omit<AriaInputProps, 'size' | 'width'>,
    InputSizeVariants,
    InputFieldContainerVariants,
    Pick<React.ComponentProps<typeof BaseTextAreaElement>, 'rows' | 'cols'> {
  resizeable?: boolean | 'x' | 'y';
}

export const BaseTextArea = forwardRef<HTMLTextAreaElement, BaseTextAreaProps>(
  (props, forwardedRef) => {
    const inputContainerProps = pickInputContainerProps(props);

    const baseTextAreaProps = pickBaseTextAreaProps(props, {
      defaultProps: {
        rows: 4,
        border: 'subtle',
        resizeable: false,
        minWidth: false,
        maxWidth: false,
      },
    });

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
          {...inputContainerProps}
          ref={ref}
          {...baseTextAreaProps}
          style={{ minHeight: initialHeight.current }}
        />

        <VisuallyHidden>
          <AriaInput {...(props as object)} />
        </VisuallyHidden>
      </>
    );
  }
);

export type TextAreaFieldProps = React.ComponentProps<typeof TextAreaField>;

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  BaseTextAreaProps & InputComponentProps & AriaTextFieldProps
>(({ placeholder, resizeable, rows, cols, ...props }, forwardedRef) => {
  return (
    <InputContainer {...props} as={AriaTextField}>
      <BaseTextArea
        ref={forwardedRef}
        size={props.size}
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        resizeable={resizeable}
        {...props}
      />
    </InputContainer>
  );
});
