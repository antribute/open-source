import { RenderSizeVariants } from 'utils/storybook-utils';
import { Checkbox } from './Checkbox';

export const Default = () => {
  return <RenderSizeVariants Component={Checkbox} />;
};

export const Label = () => {
  return <RenderSizeVariants Component={Checkbox} props={{ label: 'Available' }} />;
};
