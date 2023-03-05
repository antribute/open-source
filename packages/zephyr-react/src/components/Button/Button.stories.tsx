import { PresetButtonStoryVariants } from 'components/Button/preset-button-story-variants';
import { Button, ButtonProps } from './Button';

export const {
  Default,
  SizeVariant,
  ContainedVariant,
  OutlinedVariant,
  SoftVariant,
  TextVariant,
  RoundedVariant,
  RoundedSize,
  ContainedGradientVariant,
} = PresetButtonStoryVariants<ButtonProps>(Button);
