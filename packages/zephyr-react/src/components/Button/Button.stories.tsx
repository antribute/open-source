import { RenderColorVariants, RenderSizeVariants } from 'utils/storybook-utils';
import { Button } from './Button';

export const Default = () => {
  return <RenderColorVariants Component={Button} props={{ children: 'Default' }} />;
};

export const Contained = () => {
  return (
    <RenderSizeVariants
      Component={Button}
      props={{ children: 'Contained', variant: 'contained' }}
    />
  );
};

export const Soft = () => {
  return <RenderSizeVariants Component={Button} props={{ children: 'Soft', variant: 'soft' }} />;
};

export const Outlined = () => {
  return (
    <RenderSizeVariants Component={Button} props={{ children: 'Outlined', variant: 'outlined' }} />
  );
};

export const OutlinedFilled = () => {
  return (
    <RenderSizeVariants
      Component={Button}
      props={{ children: 'Outlined Filled', variant: 'outlined-filled' }}
    />
  );
};

export const Text = () => {
  return <RenderSizeVariants Component={Button} props={{ children: 'Text', variant: 'text' }} />;
};
