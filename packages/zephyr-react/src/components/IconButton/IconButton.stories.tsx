import { PresetButtonStoryVariants } from 'components/Button/preset-button-story-variants';
import { IconButton, IconButtonProps } from 'components/IconButton/IconButton';
import BoltIcon from '@heroicons/react/24/solid/BoltIcon';

export const {
  Default,
  ContainedVariant,
  OutlinedVariant,
  OutlinedRoundedVariant,
  GlassVariant,
  TextVariant,
  SizeVariant,
  RoundedVariant,
  ContainedGradientVariant,
  RoundedSize,
  GhostVariant,
} = PresetButtonStoryVariants<IconButtonProps>(IconButton, {
  props: { children: <BoltIcon className="text-current" /> },
  noDefaultChildren: true,
});