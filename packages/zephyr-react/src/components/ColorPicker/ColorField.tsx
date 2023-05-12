import { useColorField, AriaColorFieldProps } from '@react-aria/color';
import { useColorFieldState } from '@react-stately/color';
import { useRef } from 'react';

interface ColorFieldProps extends AriaColorFieldProps {}

export function BaseColorFieldInput(props: ColorFieldProps) {
  const state = useColorFieldState(props);
  const inputRef = useRef(null);
  const { inputProps } = useColorField(props, state, inputRef);

  return <input {...inputProps} ref={inputRef} />;
}
