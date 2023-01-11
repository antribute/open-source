import { RenderColorVariants, RenderSizeVariants } from 'utils/storybook-utils';
import { StatusBadge } from './StatusBadge';

export const Default = () => {
  return <RenderColorVariants Component={StatusBadge} props={{ children: 'Default' }} />;
};

export const Sizes = () => {
  return <RenderSizeVariants Component={StatusBadge} props={{ children: 'Default' }} />;
};
