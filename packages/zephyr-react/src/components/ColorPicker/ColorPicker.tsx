import { ColorArea } from 'components/ColorPicker/ColorArea';

interface ColorPickerProps {
  variant?: 'area' | 'wheel' | 'slider';
}
export const ColorPicker = (props: ColorPickerProps) => {
  return <ColorArea />;
};
