import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { classed } from 'utils/classed';
import { Button as AriaButton, NumberField as AriaNumberField } from 'react-aria-components';
import type { NumberFieldProps as AriaNumberFieldProps } from 'react-aria-components';
import type { IntlNumberFormatPreset } from '../intlFormatOptionPresets';
import { getIntlNumberFormatOptions } from '../intlFormatOptionPresets';
import type { InputComponentProps } from '../Input.types';
import { BaseInputField, InputAddon, InputAddonGroup, InputContainer } from '../components';

const NumberIncrementorButtonElement = classed(
  AriaButton,
  'flex items-center justify-center grow bg-surface-soft hover:bg-surface-dark',
  'min-w-[28px]',
  'relative',
  'transition-colors',
  'hover:text-boundary-moderate active:text-boundary-high',
  'before:w-2/3',
  'before:content-[""]',
  'before:absolute',
  'before:top-1/2 before:left-1/2',

  'before:transform before:-translate-x-1/2 before:-translate-y-1/2',
  {
    variants: {
      variant: {
        increment: 'before:i-heroicons-chevron-up-20-solid',
        decrement: 'relative before:i-heroicons-chevron-down-20-solid',
      },
    },
  }
);

const NumberIncrementorButtonGroup = () => {
  return (
    <div
      className={clsx(
        'flex flex-col justify-between',
        'w-full  grow h-full',
        // 'py-1 pr-1',
        'border-r border-y',
        'rounded-[inherit] overflow-hidden',
        'divide-y divide-boundary-weak'
      )}
    >
      <NumberIncrementorButtonElement slot="increment" variant="increment" />
      <NumberIncrementorButtonElement slot="decrement" variant="decrement" />
    </div>
  );
};

export type NumberFieldProps = React.ComponentProps<typeof NumberField>;

export const NumberField = forwardRef<
  HTMLInputElement,
  InputComponentProps &
    Omit<AriaNumberFieldProps, 'children'> & {
      type?: IntlNumberFormatPreset;
      name?: string;
    }
>(({ children, placeholder, name, ...props }, forwardedRef) => {
  return (
    <InputContainer
      {...props}
      as={AriaNumberField}
      formatOptions={getIntlNumberFormatOptions({
        type: props.type,
        formatOptions: props.formatOptions,
      })}
    >
      <InputAddonGroup
        renderInput={({ hasLeadingAddons, hasTrailingAddons }) => (
          <BaseInputField
            ref={forwardedRef}
            name={name}
            size={props.size}
            placeholder={placeholder}
            hasLeadingAddons={hasLeadingAddons}
            hasTrailingAddons={hasTrailingAddons}
          />
        )}
      >
        {children}
        <InputAddon position="trailing" grouping="outside" noPadding as="div" fullHeight>
          <NumberIncrementorButtonGroup />
        </InputAddon>
      </InputAddonGroup>
    </InputContainer>
  );
});
