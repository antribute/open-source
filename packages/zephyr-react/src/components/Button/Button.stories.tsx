import { RenderColorVariants, RenderSizeVariants } from 'utils/storybook-utils';
import { PresetButtonStoryVariants } from 'components/Button/preset-button-story-variants';
import { Button, ButtonProps } from './Button';

export const {
  Default,
  SizeVariant,
  ContainedVariant,
  OutlinedVariant,
  OutlinedFilledVariant,
  SoftVariant,
  TextVariant,
} = PresetButtonStoryVariants<ButtonProps>(Button);
