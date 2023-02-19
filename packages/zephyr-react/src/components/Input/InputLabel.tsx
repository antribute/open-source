import { classed, Classed } from 'utils/classed';
import { Text } from 'components/Text';
import { BaseInputProps } from 'components/BaseInput';
import { inputComponentVariants } from 'styles/input-component.variants';

export type InputLabelVariantProps = Classed.VariantProps<typeof InputLabelElement>;

export type InputLabelElementProps = React.ComponentProps<typeof InputLabelElement>;

const InputLabelElement = classed(
  'label',
  'text-content-strong dark:text-content-inverse-moderate text-left',
  'mb-6 text-sm inline-block  font-medium select-none text-gray-900 leading-xs',
  {
    variants: {
      hidden: {
        true: 'sr-only',
      },
      labelOrientation: {
        vertical: 'block ',
        horizontal: 'text-md inline-block align-middle',
        horizontalReverse: 'order-1 text-md inline-block align-middle',
      },
      // width: inputComponentVariants.width,
    },

    defaultVariants: {
      hidden: false,
      labelOrientation: 'vertical',
      // width: 'fixed',
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
  width,
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
      width={width}
    >
      <span className="align-middle">
        {children}
        {hasOptionalLabel && <OptionalLabelElement>{optionalLabelText}</OptionalLabelElement>}
        {required && <span className="ml-px text-danger">*</span>}
      </span>
      {labelDescription && (
        <Text as="p" size="xs" className="mt-1 leading-sm" color="weak">
          {labelDescription}
        </Text>
      )}
    </InputLabelElement>
  );
};

const OptionalLabelElement = classed(
  'span',
  'ml-4 px-4 font-medium rounded  inline-block text-xs text-storm-200 bg-surface-dark/50 text-content-weak dark:bg-surface-inverse-light/50 dark:text-content-inverse-weak'
);

export default InputLabel;
