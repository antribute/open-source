import clsx from 'clsx';
import { placeholderClassName } from 'components/BaseInput/BaseInput.styles';
import React from 'react';
import {
  InputComponentWidthVariant,
  inputComponentVariants,
  inputSizeVariants,
} from 'styles/input-component.variants';
import { classed, mergeVariants } from 'utils/classed';

const PrimitiveBaseInputElement = classed(
  'input',
  InputComponentWidthVariant,
  placeholderClassName,
  'p-0',
  'bg-transparent',
  'border-none',
  'focus:ring-0 ring-0',
  'focus:outline-none outline-none',
  // Tailwind Arbitrary Group (https://tailwindcss.com/docs/hover-focus-and-other-states#arbitrary-groups)
  // eslint-disable-next-line tailwindcss/no-custom-classname
  clsx('group-[.is-contained]/base-input:!w-full'),
  {
    variants: {
      size: mergeVariants([
        inputComponentVariants.size.textSize,
        inputComponentVariants.size.lineHeight,
      ]),
    },
  },
  {
    defaultVariants: {
      placeholderSelector: true,
    },
  }
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
