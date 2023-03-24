import { Spinner } from 'components/Spinner/Spinner';
import { RenderColorVariants, RenderSizeVariants } from 'utils/storybook-utils';

export const Default = () => {
  return <RenderColorVariants Component={Spinner} />;
};

export const Sizes = () => {
  return <RenderSizeVariants Component={Spinner} />;
};
