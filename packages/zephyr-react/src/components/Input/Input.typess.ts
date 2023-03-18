import { InputContainerProps } from 'components/Input/InputContainer';

export type SharedInputProps = {
  required?: boolean;
} & SharedInputContainerProps;

type SharedInputContainerProps = Pick<
  InputContainerProps,
  'hideMessage' | 'label' | 'labelDescription' | 'optionalLabel'
>;
