import { classed, Classed, deriveClassed, mergeVariants } from 'utils/classed';
import { Text } from 'components/Text';
import { sizeVariants } from 'styles/size.variants';
import clsx from 'clsx';
import type { InputComponentState } from '../Input.types';

export type InputLabelVariantProps = Classed.VariantProps<typeof InputLabelElement>;

export type InputLabelElementProps = React.ComponentProps<typeof InputLabelElement>;

export const InputLabelElement = classed(
  'label',
  'text-content-intense text-left',
  'text-sm inline-block  font-medium select-none',
  'relative',
  'leading-xs',

  {
    variants: {
      labelSize: mergeVariants([sizeVariants.textSize, sizeVariants.lineHeight]),
      hideLabel: {
        true: clsx('!sr-only'),
        srOnly: '!sr-only',
        invisible: '!invisible',
      },

      bottomMargin: {
        true: 'mb-[7px]',
      },
    },

    defaultVariants: {
      hideLabel: false,

      labelSize: 'sm',
    },
  }
);

export type InputLabelProps<T = InputLabelElementProps> = {
  /** adds an "Optional" indicator next to the label */
  optionalLabel?: boolean | string;
  /** shows a required indicated next to label when true */
  required?: boolean;
  /** hides the label but makes it available to screenreaders when true. if null, label will be returned as null */
  hideLabel?: 'srOnly' | 'invisible' | boolean;
  /** small description text shown underneath the label */
  labelDescription?: React.ReactNode;
  inputState?: InputComponentState;
} & InputLabelVariantProps &
  T;

export const InputLabel = deriveClassed<typeof InputLabelElement, InputLabelProps>(
  ({
    required = false,
    hideLabel: hideLabelProp,
    children,
    optionalLabel,
    labelDescription,
    inputState,
    ...props
  }: InputLabelProps) => {
    const optionalLabelText = typeof optionalLabel === 'string' ? optionalLabel : 'Optional';

    const hasOptionalLabel = !required && optionalLabel;

    const hideLabel = hideLabelProp ?? !Boolean(children);

    return (
      <>
        {hideLabel === true ? null : (
          <InputLabelElement {...props} hideLabel={hideLabel} bottomMargin={!labelDescription}>
            <span className="align-middle">
              {children ?? <Text.Blank />}
              {hasOptionalLabel && <OptionalLabelElement>{optionalLabelText}</OptionalLabelElement>}
              {required && (
                <span
                  className={clsx('ml-px', {
                    'text-danger': inputState === 'error',
                    'text-boundary-moderate': inputState !== 'error',
                  })}
                >
                  *
                </span>
              )}
            </span>
            {labelDescription && (
              <Text as="p" size="xs" className="leading-sm my-4" color="weak">
                {labelDescription}
              </Text>
            )}
          </InputLabelElement>
        )}
      </>
    );
  }
);

const OptionalLabelElement = classed(
  'span',
  'ml-4 px-4 font-medium rounded inline-block text-xs text-content-weak bg-highlight absolute'
);

export default InputLabel;
