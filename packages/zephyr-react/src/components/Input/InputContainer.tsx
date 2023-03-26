import clsx from 'clsx';
import InputLabel, { InputLabelProps } from 'components/Input/InputLabel';
import InputMessage from 'components/Input/InputMessage';
import { InvisibleCharacter } from 'components/InvisibleCharacter';
import { InputComponentWidthVariant } from 'styles/input-component.variants';
import { InputComponentStateMessagePair } from 'types/input-component.types';
import { Classed, classed } from 'utils/classed';

type InputContainerVariantProps = Classed.VariantProps<typeof InputContainerElement>;

type InputContainerLabelProps = Pick<
  InputLabelProps,
  'htmlFor' | 'optionalLabel' | 'labelDescription' | 'required' | 'labelSize'
>;

export interface InputContainerProps
  extends InputContainerVariantProps,
    InputComponentStateMessagePair,
    InputContainerLabelProps {
  label?: React.ReactNode;
  hideLabel?: boolean;
  hideMessage?: boolean;
  children: React.ReactNode;
  message?: string;
  className?: string;
  asLabel?: boolean;
}

const InputContainerElement = classed(
  'div',
  InputComponentWidthVariant,
  // InputComponentOrientationVariant,
  'inline-block',
  // Tailwind Arbitrary Group (https://tailwindcss.com/docs/hover-focus-and-other-states#arbitrary-groups)
  // eslint-disable-next-line tailwindcss/no-custom-classname
  clsx('group/input is-contained'),

  {
    defaultVariants: {
      width: 'fixed',

      size: 'md',
    },
  }
);

export const InputContainer = (props: InputContainerProps) => {
  const {
    label,
    hideLabel,
    htmlFor,
    message,
    inputState,
    hideMessage,
    required = false,
    optionalLabel,
    children,
    labelDescription,
    width,
    labelSize,

    className,
    asLabel,
    size,
  } = props;

  return (
    <InputContainerElement
      as={asLabel ? 'label' : 'div'}
      width={width}
      size={size}
      className={className}
    >
      <InputLabel
        htmlFor={htmlFor}
        hidden={hideLabel}
        optionalLabel={optionalLabel}
        labelDescription={labelDescription}
        labelSize={labelSize}
        required={required}
        width={width}
      >
        {label}
      </InputLabel>
      {children}
      {!hideMessage && (
        <InputMessage inputState={inputState}>
          {message}
          <InvisibleCharacter />
        </InputMessage>
      )}
    </InputContainerElement>
  );
};
