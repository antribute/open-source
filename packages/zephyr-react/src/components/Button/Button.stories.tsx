import { PresetButtonStoryVariants } from 'components/Button/preset-button-story-variants';
import { Button, ButtonProps } from './Button';

export const {
  Default,
  SizeVariant,
  ContainedVariant,
  OutlinedVariant,
  OutlinedRoundedVariant,
  GlassVariant,
  TextVariant,
  RoundedVariant,
  RoundedSize,
  ContainedGradientVariant,
  GhostVariant,
} = PresetButtonStoryVariants<ButtonProps>(Button);
