import { RenderColorVariants, RenderSizeVariants } from 'utils/storybook-utils';
import { Button } from './Button';

const colors = [
  'neutral',
  'surface',
  'inverse',
  'primary',
  'secondary',
  'positive',
  'caution',
  'danger',
];

export const Default = () => {
  return (
    <RenderColorVariants
      colors={colors}
      showVariantLabel
      Component={Button}
      props={{ children: 'Default' }}
    />
  );
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
  return (
    <RenderColorVariants
      colors={colors}
      Component={Button}
      props={{ children: 'Contained', variant: 'soft' }}
    />
  );
};

export const Outlined = () => {
  return (
    <RenderColorVariants
      colors={colors}
      Component={Button}
      props={{ children: 'Outlined', variant: 'outlined' }}
    />
  );
};

export const OutlinedFilled = () => {
  return (
    <RenderColorVariants
      colors={colors}
      Component={Button}
      props={{ children: 'Outlined', variant: 'outlined-filled' }}
    />
  );
};

export const Text = () => {
  return (
    <RenderColorVariants
      colors={colors}
      Component={Button}
      props={{ children: 'Text', variant: 'text' }}
    />
  );
};
