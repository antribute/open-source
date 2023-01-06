import { InputComponentFieldType, InputComponentProps } from 'types/input-component.types';
import { get, merge } from 'lodash-es';

type InputComponentFieldTypeOptions = Pick<
  InputComponentProps,
  'leadingIcon' | 'trailingIcon' | 'placeholder' | 'type'
>;

type InputComponentFieldTypeProps = Omit<InputComponentFieldTypeOptions, 'type'> & {
  htmlInputComponentProps: Partial<Pick<HTMLInputElement, 'type' | 'step' | 'placeholder'>>;
};

type InputComponentFieldTypeMap = Partial<
  Record<InputComponentFieldType, InputComponentFieldTypeProps>
>;

const inputComponentFieldTypeMap: InputComponentFieldTypeMap = {
  currency: {
    leadingIcon: '$',
    htmlInputComponentProps: { type: 'number' },
  },
  percent: {
    trailingIcon: '%',
    htmlInputComponentProps: { type: 'number' },
  },
  url: {
    htmlInputComponentProps: { type: 'url' },
  },
  float: {
    htmlInputComponentProps: { type: 'number', step: '0.1' },
  },
  date: {
    htmlInputComponentProps: { type: 'date' },
  },
  phoneNumber: {
    htmlInputComponentProps: { type: 'tel' },
  },
  number: {
    htmlInputComponentProps: { type: 'number' },
  },
  text: {
    htmlInputComponentProps: { type: 'text' },
  },
  count: {
    htmlInputComponentProps: { type: 'number', step: '1' },
  },
  integer: {
    htmlInputComponentProps: { type: 'number', step: '1' },
  },
  email: {
    htmlInputComponentProps: { type: 'email' },
  },
  singlelineText: {
    htmlInputComponentProps: { type: 'text' },
  },
};

export const getInputComponentFieldTypeProps = ({
  type,
  ...props
}: {
  type: InputComponentFieldType | undefined;
} & Pick<InputComponentProps, 'leadingIcon' | 'trailingIcon'>) => {
  const inputComponentFieldTypeProps = get(inputComponentFieldTypeMap, type || '');

  const { htmlInputComponentProps, ...rest } = inputComponentFieldTypeProps ?? {};

  return {
    ...merge(rest, props),
    htmlInputComponentProps: htmlInputComponentProps ?? { type },
  };
};
