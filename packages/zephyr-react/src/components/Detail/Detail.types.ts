import type { FlexProps } from 'components/Flex';
import type { TextProps } from 'components/Text';
import { TextComponentType } from 'components/Text/textComponentProps';
import { capitalize } from 'lodash-es';

export type SlotId = (typeof mainSlotIds)[number];

export type SlotColumnId = 'start' | 'main' | 'end';

export const mainSlotIds = [
  'overline',
  'title',
  'heading',
  'subheading',
  'subtitle',
  'body',
  'description',
  'caption',
] satisfies TextComponentType[];

export type StartDetailSlotId = (typeof startSlotIds)[number];

export const startSlotIds = generateSlotIds('start');

export type EndDetailSlotId = (typeof endSlotIds)[number];

export const endSlotIds = generateSlotIds('end');

export type LabelDetailSlotId = (typeof labelSlotIds)[number];

export const labelSlotIds = generateSlotIds('label');

export type LeadingSlotId = 'start';

export type TrailingSlotId = 'end';

type PrefixedMainSlotId<T extends string> = `${T}${Capitalize<SlotId>}`;

function generateSlotIds<T extends string>(prefix: T) {
  return mainSlotIds.map((id) => `${prefix}${capitalize(id)}` as PrefixedMainSlotId<T>);
}

export const slotIdGrid = mainSlotIds.map((mainSlotId, i) => [
  startSlotIds[i]!,
  mainSlotId,
  endSlotIds[i]!,
]);

export const slotIds = slotIdGrid.flat();

export type DetailSlots = MainDetailSlots &
  LabelDetailSlots &
  StartDetailSlots &
  EndDetailSlots &
  LeadingDetailSlots &
  TrailingDetailSlots;

export type MainDetailSlots = SlotRecord<SlotId>;

export type LabelDetailSlots = SlotRecord<LabelDetailSlotId>;

export type StartDetailSlots = SlotRecord<StartDetailSlotId>;

export type EndDetailSlots = SlotRecord<EndDetailSlotId>;

export type LeadingDetailSlots = SlotRecord<LeadingSlotId>;

export type TrailingDetailSlots = SlotRecord<TrailingSlotId>;

export interface SlotItemProps extends SlotItemTextProps {
  value: React.ReactNode | undefined;
  align?: 'start' | 'center' | 'end';
  variant?: TextComponentType;
}

export type SlotItemData = React.ReactNode | null | SlotItemProps;

export type SlotItemTextProps = Pick<
  TextProps,
  | 'noWrap'
  | 'maxLines'
  | 'size'
  | 'italic'
  | 'truncate'
  | 'className'
  | 'leading'
  | 'selectNone'
  | 'spaceY'
  | 'font'
  | 'fontWeight'
  | 'color'
  | 'bold'
>;

export type GridData = {
  gridTemplateColumn: string;
  column: { justify?: FlexProps['justify'] };
  className?: string;
};

export type SlotData = SlotItemProps & {
  placeholder?: string;
  slotId: SlotId;
  column: SlotColumnId;
  gridData: GridData;
  gridArea: string;
  columnRef: React.RefObject<HTMLDivElement>;
};

export type SlotColumn = {
  gridData: GridData;
  column: SlotColumnId;
  slotRecord: Partial<SlotDataRecord>;
  active: boolean;
  columnRef: React.RefObject<HTMLDivElement>;
};

type SlotRecord<K extends string, V = SlotItemProps> = Partial<
  Record<K, React.ReactNode | null | V>
>;

type SlotDataRecord = Record<SlotId, SlotData>;
