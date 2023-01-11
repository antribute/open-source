import { classed, Classed } from 'utils/classed';
import { InvisibleCharacter } from '../InvisibleCharacter';

export type InputLabelVariantProps = Classed.VariantProps<typeof InputLabelElement>;

export type InputLabelElementProps = React.ComponentProps<typeof InputLabelElement>;

const InputLabelElement = classed(
  'label',
  'text-content-strong dark:text-content-inverse-moderate',
  'pb-4 text-sm inline-block  font-medium select-none text-gray-900 leading-xs  font-bold',
  {
    variants: {
      hidden: {
        true: 'sr-only',
      },
      labelOrientation: {
        vertical: 'block mb-sm w-full',
        horizontal: 'text-md inline-block mr-sm align-middle',
        horizontalReverse: 'order-1 text-md inline-block mr-sm align-middle',
      },
    },

    defaultVariants: {
      hidden: false,
      labelOrientation: 'vertical',
    },
  }
);

export type InputLabelProps = InputLabelElementProps & {
  optionalLabel?: boolean | string;
  required?: boolean;
};

const InputLabel = ({
  required = false,
  children,
  optionalLabel,
  htmlFor,
  hidden = false,
  labelOrientation = 'vertical',
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
      {hasOptionalLabel && <OptionalLabelElement>{optionalLabelText}</OptionalLabelElement>}
      {children}
      {required && <span className="ml-px text-danger">*</span>}
      <InvisibleCharacter />
    </InputLabelElement>
  );
};

const OptionalLabelElement = classed(
  'span',
  '"ml-4 float-right px-1 py-px font-medium bg-storm-50 bg-opacity-20 rounded  inline-block text-xs text-storm-200"'
);

export default InputLabel;
