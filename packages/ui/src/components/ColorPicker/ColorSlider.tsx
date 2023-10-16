// @tyler please fix the underlying typings and remove the following comments
// eslint-disable-next-line ts/ban-ts-comment
// @ts-nocheck

import { useColorSlider } from '@react-aria/color';
import { useColorSliderState } from '@react-stately/color';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useLocale } from '@react-aria/i18n';
import { useFocusRing } from '@react-aria/focus';
import type { ColorSliderStateOptions } from '@react-stately/color';
import React from 'react';
import { classed } from 'utils/classed';
import { Flex } from 'components/Flex';
import type { O } from 'ts-toolbelt';
import { Input } from 'components/Input';
import { Label } from 'react-aria-components';

interface ColorSliderProps extends O.Optional<ColorSliderStateOptions, 'locale'> {
  trackingThickness?: number;
  thumbSize?: number;
  className?: string;
}

const SliderContainerElement = classed('div', 'inline-flex flex-col items-center', 'text-xs');

const ThumbElement = classed(
  'div',
  'rounded-[50%] box-border',
  // 'border-2 border-palette-white',
  'border-[3.5px]  border-palette-white ring-palette-white/10',
  'transition-[colors,background-color,width,height,box-shadow]',
  'shadow'
);

const TrackElement = classed('div', 'rounded-full w-full cursor-pointer');

export function ColorSlider({
  className,
  trackingThickness = 13,
  thumbSize = 20,
  ...props
}: ColorSliderProps) {
  const { locale } = useLocale();

  const state = useColorSliderState({ ...props, locale });
  const trackRef = React.useRef(null);
  const inputRef = React.useRef(null);

  // Default label to the channel name in the current locale
  const label = props.label ?? state.value.getChannelName(props.channel, locale);

  const { trackProps, thumbProps, inputProps, labelProps } = useColorSlider(
    {
      ...props,
      label,
      trackRef,
      inputRef,
    },
    state
  );

  const { focusProps, isFocusVisible } = useFocusRing();

  const thumbDiameter = isFocusVisible ? thumbSize + 3.5 : thumbSize;

  // <output
  //   class="flex flex-none gap-0 text-end"
  //   for="react-aria3261206793-137-0"
  //   aria-live="off"
  //   style="flex: 1 0 auto; text-align: end;"
  // >
  //   0
  // </output>;

  // <output
  //   as="output"
  //   class="text-end"
  //   for="react-aria3261206793-137-0"
  //   aria-live="off"
  //   style="flex: 1 0 auto; text-align: end;"
  // >
  //   0
  // </output>;

  const minValue = state.getThumbMinValue(0);
  const maxValue = state.getThumbMaxValue(0);

  // const maxInputLen = String(maxValue).length;
  // const minInputLen = String(minValue).length;

  return (
    <SliderContainerElement className={className}>
      {/* Create a flex container for the label and output element. */}
      <Flex justify="between" fullWidth className="select-none">
        <Label className="mb-2 font-medium grow" {...labelProps}>
          {label}
        </Label>
        {/* <output {...outputProps} className="w-[10ch] font-mono text-right active:select-text">
          {state.value.formatChannelValue(props.channel, locale)}
        </output> */}
        <div>
          {/* <AriaNumberField
            minValue={minValue}
            maxValue={maxValue}
            step={state.step}
            // value={state.getThumbValue(0)}
            // formatOptions={{}}
            // onChange={(value) => {
            //   state.
            //   setInputValue(value);
            // }}
            {...inputProps}
            
          >
            {({}) => (
              <PrimitiveInputElement
                maxLength={maxInputLen}
                minLength={minInputLen}
                style={{
                  maxWidth: `${maxInputLen + 2}ch`,
                  minWidth: `${minInputLen + 2}ch`,
                }}
                className="text-right pr-[1ch] rounded-md bg-surface-soft mb-4 text-sm"
                as={AriaInput}
              />
            )}
          </AriaNumberField> */}
          {/* <PrimitiveInputElement
            ref={inputRef}
            {...inputProps}
            {...focusProps}
            type="number"
            className="text-right pr-[1ch] rounded-md bg-surface-soft mb-4 text-sm"
          /> */}

          <Input.NumberField
            // as={AriaInput}
            // {...inputProps}
            ref={inputRef}
            {...inputProps}
            {...focusProps}
            // minLength={minInputLen}

            minValue={minValue}
            maxValue={maxValue}
            onChange={() => {
              // console.log('ON CHANGE', e.target.value);
              // if (e.target.value.startsWith('0')) {
              //   e.target.value = e.target.value.replace('0', '');
              // }
              // if (isNaN(e.target.valueAsNumber)) {
              //   e.target.value = '0';
              // }
              // inputProps.onChange?.();
              // }
            }}
            // value={
            //   showFormattedValue
            //     ? state.value.formatChannelValue(props.channel, locale)
            //     : inputProps.value
            // }
            // onFocus={(e) => {
            //   focusProps?.onFocus?.(e);

            //   setShowFormattedValue(false);
            // }}

            // onBlur={() => {
            //   setShowFormattedValue(true);
            // }}
            // type={showFormattedValue ? 'text' : 'number'}

            style={{
              maxWidth: `${(inputProps.maxLength ?? 3) + 3}ch`,
              minWidth: `${(inputProps.minLength ?? 3) + 3}ch`,
              paddingRight: '1.5ch',
            }}
            className="text-right pr-[1ch] bg-highlight-tint rounded focus-visible::bg-highlight-ghost mb-4 text-sm"
          />
        </div>
      </Flex>
      {/* The track element holds the visible track line and the thumb. */}
      <TrackElement
        {...trackProps}
        ref={trackRef}
        style={{
          ...trackProps.style,
          height: trackingThickness,
        }}
      >
        <ThumbElement
          {...thumbProps}
          style={{
            // border: '2px solid white',
            borderRadius: '50%',
            // boxSizing: 'border-box',
            // boxShadow: '0 0 0 1px black, inset 0 0 0 1px black',
            ...thumbProps.style,
            top: trackingThickness / 2,
            width: thumbDiameter,
            height: thumbDiameter,

            background: state.getDisplayColor().toString('css'),
          }}
        >
          <VisuallyHidden>
            <input ref={inputRef} {...inputProps} {...focusProps} />
          </VisuallyHidden>
        </ThumbElement>
      </TrackElement>
    </SliderContainerElement>
  );
}
