import clsx from 'clsx';
import { BaseInputProps } from 'components/BaseInput';
import InputLabel, { InputLabelProps } from 'components/Input/InputLabel';
import InputMessage from 'components/Input/InputMessage';
import { InvisibleCharacter } from 'components/InvisibleCharacter';
import {
  InputComponentOrientationVariant,
  InputComponentWidthVariant,
} from 'styles/input-component.variants';
import { InputComponentStateMessagePair } from 'types/input-component.types';
import { Classed, classed } from 'utils/classed';

export interface InputContainerProps
  extends Pick<BaseInputProps, 'size' | 'width'>,
    Classed.VariantProps<typeof InputContainerElement>,
    InputComponentStateMessagePair,
    Pick<
      InputLabelProps,
      'htmlFor' | 'optionalLabel' | 'labelDescription' | 'required' | 'labelSize'
    > {
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
    variants: {
      orientation: {
        // eslint-disable-next-line tailwindcss/no-custom-classname
        horizontal: clsx(
          'inline-flex flex-row items-center',
          // Tailwind Arbitrary Group
          'group/input is-horizontal'
        ),
        // eslint-disable-next-line tailwindcss/no-custom-classname
        vertical: clsx(
          'inline-flex flex-col justify-center',
          // Tailwind Arbitrary Group
          'group/input is-vertical'
        ),
      },
    },
  },
  {
    defaultVariants: {
      width: 'fixed',
      // orientation: 'vertical',
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
    orientation,
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
        labelOrientation={orientation}
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
