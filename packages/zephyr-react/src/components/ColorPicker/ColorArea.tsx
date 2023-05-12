import { useColorArea, AriaColorAreaOptions } from '@react-aria/color';
import { useColorAreaState } from '@react-stately/color';
import { useFocusRing } from '@react-aria/focus';
import React, { CSSProperties } from 'react';
import { classed } from 'utils/classed';

interface ColorAreaProps
  extends Omit<AriaColorAreaOptions, 'inputXRef' | 'inputYRef' | 'containerRef'> {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  minWidth?: CSSProperties['minWidth'];
  minHeight?: CSSProperties['minHeight'];
  focusedThumbSize?: CSSProperties['width'];
  thumbSize?: CSSProperties['width'];
  borderRadius?: CSSProperties['borderRadius'];
  className?: string;
  style?: CSSProperties;
}

const ColorAreaContainerElement = classed('div', 'min-w-[40px]  min-h-[40px]', {
  variants: {
    disabled: {
      true: 'opacity-30',
    },
  },
});
const ColorAreaGradientElement = classed('div', 'h-full w-full', {
  variants: {
    disabled: {
      true: 'bg-highlight-ghost',
    },
  },
});

const ColorAreaThumbStyle = classed(
  'div',
  'border-box rounded-[50%]  transform absolute -translate-x-1/4 -translate-y-1/4',
  // 'shadow-inner',
  'ring-2 ring-palette-white/80',
  // 'cursor-grab active:cursor-grabbing',

  {
    variants: {
      isDisabled: {
        true: 'bg-highlight-ghost border-highlight-ghost',
        false: 'border-base',
      },
    },
  }
);

export function ColorArea({
  height = 192,
  width = '100%',
  focusedThumbSize = 28,
  thumbSize = 20,
  borderRadius = 4,
  className,
  style,
  ...props
}: ColorAreaProps) {
  const { isDisabled } = props;

  const inputXRef = React.useRef(null);
  const inputYRef = React.useRef(null);
  const containerRef = React.useRef(null);

  const state = useColorAreaState(props);

  const { colorAreaProps, gradientProps, xInputProps, yInputProps, thumbProps } = useColorArea(
    { ...props, inputXRef, inputYRef, containerRef },
    state
  );

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <ColorAreaContainerElement
      ref={containerRef}
      {...colorAreaProps}
      disabled={isDisabled}
      className={className}
      style={{
        ...colorAreaProps.style,
        width,
        height,
        borderRadius,
        ...style,
      }}
    >
      <ColorAreaGradientElement
        disabled={isDisabled}
        {...gradientProps}
        style={{
          ...gradientProps.style,
          borderRadius,
          // height,
          // width,
        }}
      />
      <ColorAreaThumbStyle
        {...thumbProps}
        style={{
          ...thumbProps.style,
          background: isDisabled ? undefined : state.getDisplayColor().toString('css'),
          // border: `2px solid ${isDisabled ? 'rgb(142, 142, 142)' : 'white'}`,
          borderRadius: '50%',
          // boxSizing: 'border-box',
          transform: 'translate(-50%, -50%)',
          // boxShadow: '0 0 0 1px black, inset 0 0 0 1px black',
          height: isFocusVisible ? `calc(${focusedThumbSize} + 4px)` : thumbSize,
          width: isFocusVisible ? `calc(${focusedThumbSize} + 4px)` : thumbSize,
        }}
      >
        <input ref={inputXRef} {...xInputProps} {...focusProps} />
        <input ref={inputYRef} {...yInputProps} {...focusProps} />
      </ColorAreaThumbStyle>
    </ColorAreaContainerElement>
  );
}
