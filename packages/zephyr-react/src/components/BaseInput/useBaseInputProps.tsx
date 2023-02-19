import { BaseInputBaseProps, BaseInputProps } from 'components/BaseInput/BaseInput';
import { BaseInputContainerProps } from 'components/BaseInput/BaseInputContainer';
import { getInputComponentFieldTypeProps } from 'constants/input-component-field-type-map';

type UseBaseInputPropsOptions = BaseInputBaseProps;

export function useBaseInputProps(props: UseBaseInputPropsOptions) {
  const {
    size = 'md',
    width = 'fixed',
    inputState,
    inlineLeadingAddonSlot,
    inlineTrailingAddonSlot,
    focusElementOnClick,
    type,
    leadingIcon: leadingIconProp,
    trailingIcon: trailingIconProp,
    label,
    ...baseInputProps
  } = props;

  const { leadingIcon, trailingIcon, htmlInputComponentProps } = getInputComponentFieldTypeProps({
    type: props.type,
    leadingIcon: props.leadingIcon,
    trailingIcon: props.trailingIcon,
  });

  const baseInputElementProps = {
    ...htmlInputComponentProps,
    ...baseInputProps,
    width,
    size,
  };

  const inputContainerProps: Omit<BaseInputContainerProps, 'children'> = {
    leadingIcon,
    trailingIcon,
    size,
    width,
    inputState,
    inlineLeadingAddonSlot,
    inlineTrailingAddonSlot,
    focusElementOnClick,
    type,
    label,
  };

  return {
    baseInputElementProps,
    inputContainerProps,
  };
}

export interface MyProps {
  zebra: boolean;
  label: boolean;

  unknowon: string;
}
