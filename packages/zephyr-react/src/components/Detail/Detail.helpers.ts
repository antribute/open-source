import { textComponentProps } from 'components/Text/textComponentProps';
import type {
  SlotItemProps,
  SlotItemData,
  SlotId,
  SlotItemTextProps,
  SlotItemTextPropsWithChildren,
} from './Detail.old';
import { getByPath } from 'utils/getByPath';
import { twMerge } from 'tailwind-merge';

function isSlotItemProps(item: SlotItemData): item is SlotItemProps {
  return Boolean(item && typeof item === 'object' && 'value' in item);
}

export function normalizeSlotItemData(item: SlotItemData, slotId: SlotId) {
  if (isSlotItemProps(item)) {
    const variantOverride = getByPath(item, 'variant');

    return { ...item, variant: variantOverride ?? slotId } satisfies SlotItemProps;
  }
  return { variant: slotId, value: item } satisfies SlotItemProps;
}

export function getSlotItemTextProps(
  item: SlotItemData,
  slotId: SlotId
): SlotItemTextPropsWithChildren | undefined {
  const {
    value,
    variant,
    className: classNameOverride,
    ...textPropOverrides
  } = normalizeSlotItemData(item, slotId);

  if (!value) return undefined;

  const defaultTextProps = textComponentProps[variant];

  return {
    ...defaultTextProps,
    ...textPropOverrides,
    className: twMerge(defaultTextProps?.className, classNameOverride),
    children: value,
  };
}

export const detailSlotGridAreasClassNames: Record<
  'primary' | 'start' | 'end',
  Record<SlotId, string>
> = {
  primary: {
    overline: 'grid-area-[overline]',
    subtitle: 'grid-area-[subtitle]',
    heading: 'grid-area-[heading]',
    title: 'grid-area-[title]',
    description: 'grid-area-[description]',
    caption: 'grid-area-[caption]',
  },
  start: {
    overline: 'grid-area-[start-overline]',
    subtitle: 'grid-area-[start-subtitle]',
    heading: 'grid-area-[start-heading]',
    title: 'grid-area-[start-title]',
    description: 'grid-area-[start-description]',
    caption: 'grid-area-[start-caption]',
  },
  end: {
    overline: 'grid-area-[end-overline]',
    subtitle: 'grid-area-[end-subtitle]',
    heading: 'grid-area-[end-heading]',
    title: 'grid-area-[end-title]',
    description: 'grid-area-[end-description]',
    caption: 'grid-area-[end-caption]',
  },
};
