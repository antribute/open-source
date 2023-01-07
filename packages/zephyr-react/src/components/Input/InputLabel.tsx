import { classed, Classed } from 'utils/classed';
import { InvisibleCharacter } from '../InvisibleCharacter';

export type InputLabelVariantProps = Classed.VariantProps<typeof InputLabelElement>;

export type InputLabelElementProps = React.ComponentProps<typeof InputLabelElement>;

const InputLabelElement = classed(
  'label',
  'block text-sm font-medium select-none text-gray-900 leading-xs w-full mb-sm ml-px font-bold',
  {
    variants: {
      hidden: {
        true: 'sr-only',
      },
    },
    defaultVariants: {
      hidden: false,
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
  ...props
}: InputLabelProps) => {
  const optionalLabelText = typeof optionalLabel === 'string' ? optionalLabel : 'Optional';

  const hasOptionalLabel = !required && optionalLabel;

  return (
    <InputLabelElement {...props} htmlFor={htmlFor} hidden={hidden}>
      {hasOptionalLabel && <OptionalLabelElement>{optionalLabelText}</OptionalLabelElement>}
      {children}
      {required && <span className="ml-0.5 text-danger">*</span>}
      <InvisibleCharacter />
    </InputLabelElement>
  );
};

const OptionalLabelElement = classed(
  'span',
  '"ml-4 float-right px-1 py-px font-medium bg-storm-50 bg-opacity-20 rounded  inline-block text-xs text-storm-200"'
);

export default InputLabel;
