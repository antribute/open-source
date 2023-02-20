import { placeholderClassName } from 'components/BaseInput/BaseInput.styles';
import React from 'react';
import { InputComponentWidthVariant } from 'styles/input-component.variants';
import { classed } from 'utils/classed';

const PrimitiveBaseInputElement = classed(
  'input',
  InputComponentWidthVariant,
  placeholderClassName,
  'p-0',
  'bg-transparent',
  'border-none',
  'focus:ring-0 ring-0',
  'focus:outline-none outline-none'
);

type PrimitiveBaseInputBaseProps = React.ComponentProps<typeof PrimitiveBaseInputElement>;

export const PrimitiveBaseInput = React.forwardRef<HTMLInputElement, PrimitiveBaseInputBaseProps>(
  (props, ref) => {
    return (
      <PrimitiveBaseInputElement
        autoComplete="off"
        formNoValidate
        onWheel={(e) => {
          // Disables value changing when scrolling over input
          e.currentTarget.blur();
        }}
        {...props}
        ref={ref}
      />
    );
  }
);
