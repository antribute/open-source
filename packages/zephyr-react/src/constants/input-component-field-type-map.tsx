import { InputComponentFieldType } from 'types/input-component.types';
import { get, merge } from 'lodash-es';
import EmailIcon from '@heroicons/react/24/solid/EnvelopeIcon';
import UrlIcon from '@heroicons/react/24/solid/LinkIcon';
import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon';
import PasswordIcon from '@heroicons/react/24/solid/LockClosedIcon';
import { InputAddonProps } from 'components/BaseInput';

type HeroIconType = typeof EmailIcon;

type InputComponentFieldTypeOptions = {
  placeholder?: string;
  type: InputComponentFieldType;
} & Pick<InputAddonProps, 'leadingIcon' | 'trailingIcon'>;

type InputComponentFieldTypeProps = Omit<InputComponentFieldTypeOptions, 'type'> & {
  htmlInputComponentProps: Partial<Pick<HTMLInputElement, 'type' | 'step' | 'placeholder'>>;
};

type InputComponentFieldTypeMap = Partial<
  Record<InputComponentFieldType, InputComponentFieldTypeProps>
>;

const InputIcon = ({
  Icon,
  ...props
}: { Icon: string | HeroIconType } & Parameters<HeroIconType>[0]) =>
  // eslint-disable-next-line react/jsx-no-useless-fragment
  typeof Icon === 'string' ? <>{Icon}</> : <Icon height="20" width="20" {...props} />;

const inputComponentFieldTypeMap: InputComponentFieldTypeMap = {
  currency: {
    leadingIcon: <InputIcon Icon="$" />,
    htmlInputComponentProps: { type: 'number' },
  },
  percent: {
    trailingIcon: <InputIcon Icon="%" />,
    htmlInputComponentProps: { type: 'number' },
  },
  url: {
    leadingIcon: <InputIcon Icon={UrlIcon} />,
    htmlInputComponentProps: { type: 'url' },
  },
  float: {
    htmlInputComponentProps: { type: 'number', step: '0.1' },
  },
  date: {
    htmlInputComponentProps: { type: 'date' },
  },
  phoneNumber: {
    leadingIcon: <InputIcon Icon={PhoneIcon} />,
    htmlInputComponentProps: { type: 'tel' },
  },
  tel: {
    leadingIcon: <InputIcon Icon={PhoneIcon} />,
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
    leadingIcon: <InputIcon Icon={EmailIcon} />,
    htmlInputComponentProps: { type: 'email' },
  },
  singlelineText: {
    htmlInputComponentProps: { type: 'text' },
  },
  password: {
    leadingIcon: <InputIcon Icon={PasswordIcon} />,
    htmlInputComponentProps: { type: 'password' },
  },
};

export type GetInputComponentFieldTypePropsOptions = {
  type: InputComponentFieldType | undefined;
} & Pick<InputAddonProps, 'leadingIcon' | 'trailingIcon'>;

export const getInputComponentFieldTypeProps = ({
  type,
  ...props
}: {
  type: InputComponentFieldType | undefined;
} & Pick<InputAddonProps, 'leadingIcon' | 'trailingIcon'>) => {
  const inputComponentFieldTypeProps = get(inputComponentFieldTypeMap, type ?? '');

  const { htmlInputComponentProps, ...rest } = inputComponentFieldTypeProps ?? {};

  return {
    ...merge(rest, props),
    htmlInputComponentProps: htmlInputComponentProps ?? { type },
  };
};
