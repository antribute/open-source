import { deriveClassed } from '@tw-classed/react';
import { BaseInput } from 'components/BaseInput/BaseInput';
import { placeholderClassName } from 'components/BaseInput/BaseInput.styles';
import React from 'react';
import { InputComponentWidthVariant } from 'styles/input-component.variants';
import { classed } from 'utils/classed';

const PrimitiveBaseInputElement = classed(
  'input',
  InputComponentWidthVariant,
  placeholderClassName,
  'bg-transparent focus:outline-none focus:ring-0 border-none ring-0 outline-none focus:outline-none p-0'
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
