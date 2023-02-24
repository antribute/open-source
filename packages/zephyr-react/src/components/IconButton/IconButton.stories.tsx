import { PresetButtonStoryVariants } from 'components/Button/preset-button-story-variants';
import { IconButton, IconButtonProps } from 'components/IconButton/IconButton';
import BoltIcon from '@heroicons/react/24/solid/BoltIcon';

export const { Default, ContainedVariant, OutlinedVariant, SoftVariant, TextVariant, SizeVariant } =
  PresetButtonStoryVariants<IconButtonProps>(IconButton, {
    props: { children: <BoltIcon className="text-current" /> },
    noDefaultChildren: true,
  });
