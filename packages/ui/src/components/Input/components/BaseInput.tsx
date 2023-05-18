import { ClassedVariantProps, classed, mergeVariants } from 'utils/classed';
import { sizeVariants } from 'styles/size.variants';
import { primitiveInputClassName } from 'components/Input/Input.styles';

import { Input as AriaInput } from 'react-aria-components';

import type { InputProps as AriaInputProps } from 'react-aria-components';

export type InputFieldContainerVariants = ClassedVariantProps<typeof InputFieldContainer>;

export const InputFieldContainer = classed(
  'div',
  'text-content-intense',
  'border-0',
  'placeholder:select-none',
  'shrink w-full',
  'overflow-hidden',

  {
    variants: {
      size: mergeVariants([sizeVariants.paddingY, sizeVariants.paddingX, sizeVariants.textSize]),
      hasLeadingAddons: {
        false: 'rounded-l-[inherit] pl-8',
        true: 'pl-0',
      },
      hasTrailingAddons: {
        false: 'rounded-none',
        true: 'pr-0',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const defaultInputProps = {
  autoComplete: 'off',
  spellCheck: 'false',
  formNoValidate: true,
} satisfies AriaInputProps;

const BaseInputFieldElement = classed('input', primitiveInputClassName, InputFieldContainer);

BaseInputFieldElement.defaultProps = defaultInputProps;

const BaseInputField = classed(AriaInput, BaseInputFieldElement);

BaseInputField.defaultProps = defaultInputProps;

export { BaseInputField, BaseInputFieldElement, defaultInputProps };
