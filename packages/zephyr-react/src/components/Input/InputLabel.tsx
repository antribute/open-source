import { classed, Classed, mergeVariants } from 'utils/classed';
import { Text } from 'components/Text';
import { BaseInputProps } from 'components/BaseInput';
import { sizeVariants } from 'styles/size.variants';
import { InvisibleCharacter } from 'components/InvisibleCharacter';

export type InputLabelVariantProps = Classed.VariantProps<typeof InputLabelElement>;

export type InputLabelElementProps = React.ComponentProps<typeof InputLabelElement>;

export const InputLabelElement = classed(
  'label',
  'text-content-intense text-left',
  'text-sm inline-block  font-medium select-none',

  {
    variants: {
      labelSize: mergeVariants([sizeVariants.textSize, sizeVariants.lineHeight]),
      hidden: {
        true: 'sr-only',
      },
      labelOrientation: {
        vertical: 'leading-xs mb-6 block',
        horizontal: 'inline-block',
      },
    },

    defaultVariants: {
      hidden: false,
      labelOrientation: 'vertical',
      labelSize: 'sm',
    },
  }
);

export type InputLabelProps = InputLabelElementProps &
  Pick<BaseInputProps, 'width'> & {
    /** @description adds an indicator called "Optional" next to the label */
    optionalLabel?: boolean | string;
    required?: boolean;
    labelDescription?: React.ReactNode;
    /** @description determines whether the label is the same width as the input component */
    sameWidth?: boolean;
  };

const InputLabel = ({
  required = false,
  children,
  optionalLabel,
  htmlFor,
  hidden = false,
  labelOrientation = 'vertical',
  labelDescription,
  ...props
}: InputLabelProps) => {
  const optionalLabelText = typeof optionalLabel === 'string' ? optionalLabel : 'Optional';

  const hasOptionalLabel = !required && optionalLabel;

  return (
    <InputLabelElement
      {...props}
      htmlFor={htmlFor}
      hidden={hidden}
      labelOrientation={labelOrientation}
    >
      <span className="align-middle">
        {children ?? (hidden ? null : <InvisibleCharacter />)}
        {hasOptionalLabel && <OptionalLabelElement>{optionalLabelText}</OptionalLabelElement>}
        {required && <span className="text-danger ml-px">*</span>}
      </span>
      {labelDescription && (
        <Text as="p" size="xs" className="leading-sm mt-2 -mb-4" color="weak">
          {labelDescription}
        </Text>
      )}
    </InputLabelElement>
  );
};

const OptionalLabelElement = classed(
  'span',
  'ml-4 px-4 font-medium rounded  inline-block text-xs text-content-weak bg-highlight'
);

export default InputLabel;
