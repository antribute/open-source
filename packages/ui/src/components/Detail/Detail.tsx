/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import clsx from 'clsx';
import { Flex } from 'components/Flex';
import { Text } from 'components/Text';
import { textComponentProps } from 'components/Text/textComponentProps';
import { capitalize, get, groupBy, isEmpty, omitBy, orderBy, pick, uniq } from 'lodash-es';
import { CSSProperties, useLayoutEffect, useMemo, useRef, useState, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { objectMap } from 'utils';
import { measureElement } from 'utils/measureElement';
import { Wrap } from 'components/Wrap';
import { SizeProp } from 'types/styles';
import { classed } from 'utils/classed';
import useDimensions from 'react-cool-dimensions';
import { BreakpointKey, useBreakpoints } from 'hooks';
import {
  DetailSlots,
  SlotItemProps,
  SlotItemData,
  SlotData,
  SlotColumn,
  startSlotIds,
  endSlotIds,
  SlotId,
  SlotColumnId,
  mainSlotIds,
  LeadingDetailSlots,
  TrailingDetailSlots,
  LabelDetailSlots,
  labelSlotIds,
} from './Detail.types';

export interface DetailProps extends DetailSlots {
  className?: string;
  style?: React.CSSProperties;
  gapY?: SizeProp;
  gapX?: SizeProp;
  breakpoints?: Record<BreakpointKey, DetailSlots>;
  /** @description Enables responsiveness (WIP) */
  adaptive?: boolean;
}

const DetailContainer = classed('div', 'grid relative w-full', {
  variants: {
    gapX: {
      false: '',
      xs: 'gap-x-4',
      sm: 'gap-x-6',
      md: 'gap-x-16',
      lg: 'gap-x-36',
    },
    gapY: {
      false: '',
      xs: ' gap-y-1',
      sm: 'gap-y-4',
      md: 'gap-y-8',
      lg: 'gap-y-10',
    },
  },
  defaultVariants: {
    gapX: 'md',
    gapY: 'xs',
  },
});

interface DetailSlotPropBuckets {
  startDetailSlots: Partial<DetailSlots>;
  mainDeailSlots: Partial<DetailSlots>;
  endDetailSlots: Partial<DetailSlots>;
  leadingDetailSlots: Partial<LeadingDetailSlots>;
  trailingDetailSlots: Partial<TrailingDetailSlots>;
  labelDetailSlots: Partial<LabelDetailSlots>;
  hasSlots: boolean;
  props: DetailProps;
}

function useDetailSlotProps(props: DetailProps): DetailSlotPropBuckets {
  const { adaptive = false } = props;

  const { $md, $sm } = useBreakpoints();

  const startDetailSlots = pick(props, startSlotIds);
  const mainDeailSlots = pick(props, mainSlotIds);
  const endDetailSlots = pick(props, endSlotIds);
  const labelDetailSlots = pick(props, labelSlotIds);
  const leadingDetailSlots = pick(props, ['start']);
  const trailingDetailSlots = pick(props, ['end']);

  const allSlots = [
    startDetailSlots,
    mainDeailSlots,
    endDetailSlots,
    labelDetailSlots,
    leadingDetailSlots,
    trailingDetailSlots,
  ];

  const hasSlots = !allSlots.every((e) => isEmpty(e));

  const initialSlots: DetailSlotPropBuckets = {
    leadingDetailSlots,
    startDetailSlots,
    mainDeailSlots,
    endDetailSlots,
    trailingDetailSlots,
    labelDetailSlots,
    hasSlots,
    props,
  };

  if (!adaptive) return initialSlots;

  if ($md) {
    return initialSlots;
  }

  if ($sm) {
    return {
      mainDeailSlots: {
        ...leadingDetailSlots,
        ...startDetailSlots,
        ...mainDeailSlots,
      },
      trailingDetailSlots,
      startDetailSlots: {},
      endDetailSlots: {},

      leadingDetailSlots: {},
      labelDetailSlots: {},
      hasSlots,
      props,
    };
  }

  return {
    mainDeailSlots: {
      ...leadingDetailSlots,
      ...startDetailSlots,
      ...endDetailSlots,
      ...trailingDetailSlots,
      ...mainDeailSlots,
    },
    startDetailSlots: {},
    endDetailSlots: {},
    leadingDetailSlots: {},
    trailingDetailSlots: {},
    labelDetailSlots: {},
    hasSlots,
    props,
  };
}

export const Detail = (props: DetailProps) => {
  const detailProps = useDetailSlotProps(props);
  return <>{detailProps.hasSlots ? <DetailComponent {...detailProps} /> : null}</>;
};

export const DetailComponent = ({
  endDetailSlots,
  mainDeailSlots,
  startDetailSlots,
  trailingDetailSlots,
  labelDetailSlots,
  leadingDetailSlots,
  props,
}: ReturnType<typeof useDetailSlotProps>) => {
  const { className, style, gapY, gapX } = props;

  const { start: startSlot, end: endSlot } = { ...leadingDetailSlots, ...trailingDetailSlots };

  const startColumnRef = useRef<HTMLDivElement>(null);
  const mainColumnRef = useRef<HTMLDivElement>(null);
  const endColumnRef = useRef<HTMLDivElement>(null);

  const initialSlotColumns = [
    {
      column: 'start',
      columnRef: startColumnRef,
      gridData: {
        gridTemplateColumn: 'min-content',
        column: { justify: 'start' },
      },
      slotRecord: startDetailSlots,
    },
    {
      column: 'main',
      columnRef: mainColumnRef,
      gridData: {
        gridTemplateColumn: 'auto',
        column: {},
      },
      slotRecord: mainDeailSlots,
    },
    {
      column: 'end',
      columnRef: endColumnRef,
      gridData: {
        gridTemplateColumn: 'min-content',

        column: { justify: 'end' },
      },
      slotRecord: endDetailSlots,
    },
  ] satisfies ({ slotRecord: DetailSlots } & Partial<SlotData>)[];

  const slotColumns: SlotColumn[] = initialSlotColumns.map(({ slotRecord, column, ...rest }) => {
    const record = omitBy(slotRecord, (e) => e === undefined);

    return {
      ...rest,
      column,
      active: !isEmpty(record),
      slotRecord: objectMap(record, ({ key, value }) => {
        const slotId = slotIdToMainSlotId(`${key}`) || key;
        const gridArea = buildGridAreaId(slotId, column);
        const slotData: SlotData = {
          slotId,
          gridArea,
          column,
          ...rest,
          ...normalizeSlotPropData(value),
        };
        return [slotId, slotData];
      }),
    };
  });

  const activeSlotIds = uniq(slotColumns.flatMap((e) => Object.keys(e.slotRecord))) as SlotId[];

  const activeColumns = useMemo(() => {
    const cols = slotColumns.map((e) => {
      if (!e.active && ((startSlot && e.column === 'start') || (endSlot && e.column === 'end'))) {
        e.active = true;
      }

      return e;
    });

    return cols.filter((e) => e.active);
  }, [endSlot, slotColumns, startSlot]);

  const activeColumnIds = activeColumns.map((e) => e.column);

  const transformedSlotColumns = slotColumns.map((e) => {
    const slotRecordWithPlaceholders = activeSlotIds.reduce((acc, activeSlotId) => {
      if (!(activeSlotId in acc) && activeColumnIds.includes(e.column)) {
        const placeholderSlotData: SlotData = {
          ...e,
          slotId: activeSlotId,
          placeholder: buildPlaceholderId(e.column),
          value: undefined,
          column: e.column,
          gridArea: `placeholder-${buildGridAreaId(activeSlotId, e.column)}`,
        };

        acc[activeSlotId] = placeholderSlotData;
      }

      return acc;
    }, e.slotRecord);

    const slots = Object.values(slotRecordWithPlaceholders);

    const orderedSlots = orderBy(slots, (e) => ['start', ...mainSlotIds, 'end'].indexOf(e.slotId));

    return { ...e, slots: orderedSlots };
  });

  const slotRows = Object.values(
    groupBy(transformedSlotColumns.flatMap((e) => e.slots).flat(), (e) => e.slotId)
  );

  const slots = slotRows.flat();

  const gridTemplateAreas = slotRows
    .map((e) => `"${e.map((r) => r.gridArea).join(' ')}"`)
    .join('\n');

  const gridTemplateColumns = activeColumns
    .map(({ gridData }) => gridData.gridTemplateColumn)
    .join(' ');

  // console.log({ slotColumns, slots, slotRows, activeColumnIds, gridTemplateColumns });
  // console.log('gridTemplateAreas', gridTemplateAreas);

  const slotRefs = useSlotRefs();

  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!(startSlot ?? endSlot));

  // This is for preventing the initial layout jumping behavior
  // that's caused by AlignedSlot's width being calculated.
  useLayoutEffect(() => {
    setIsVisible(true);
  }, []);

  const gridHeight = measureElement(gridRef).height;

  return (
    <DetailContainer
      dir="column"
      gapY={gapY}
      gapX={gapX}
      ref={gridRef}
      className={clsx(className, {
        invisible: !isVisible,
      })}
      style={{ gridTemplateAreas, gridTemplateColumns, ...style }}
    >
      <AlignedSlot
        position="start"
        ref={slotRefs.startRef}
        slot={startSlot}
        gridHeight={gridHeight}
        slotRows={slotRows}
        activeSlotIds={activeSlotIds}
        key={`${gridTemplateAreas}-start`}
      />
      {slots.map((slotData) => {
        const { slotId, column, gridArea, gridData, align, columnRef } = slotData;
        const { justify } = gridData.column;

        const floatRight = true;
        return (
          <Flex
            gap
            ref={columnRef}
            className={clsx('relative', {
              'text-left': column === 'start' || column === 'main',
              'text-right': column === 'end',
              'pb-0': slotId === 'overline' && slotRows.length > 1,
              'pt-8': slotId === 'caption' && slotRows.length > 1,
              'pt-0': slotId === 'description' && slotRows.length > 1,
              'pt-2': slotId === 'body' && slotRows.length > 1,
            })}
            key={`${slotId}-${column}`}
            align={align ?? 'center'}
            style={{ gridArea }}
            justify={justify}
          >
            {/* <div className="w-full inline-flex flex-cols items-center justify-between"> */}
            <div
              className={clsx('w-full', {
                'float-right': floatRight,
                'inline-flex items-center': !floatRight,
              })}
            >
              <DetailText
                className={clsx('items-center', {
                  'justify-end': column === 'end',
                  'inline-flex': !floatRight,
                  // grow: true,
                  grow: column === 'end',
                })}
                slotProps={slotData}
                slotId={slotId}
                style={{ gridArea: slotData.gridArea }}
              />
              {column === 'main' && slotData.value && (
                <DetailText
                  className={clsx('text-left shrink-0 grow', {
                    'float-right': floatRight,
                    'pl-8': slotData.value,
                  })}
                  slotProps={{
                    color: 'subtle',
                    size: 'sm',
                    ...normalizeSlotPropData(get(labelDetailSlots, `label${capitalize(slotId)}`)),
                  }}
                />
              )}
            </div>
          </Flex>
        );
      })}
      <AlignedSlot
        position="end"
        ref={slotRefs.endRef}
        slot={endSlot}
        gridHeight={gridHeight}
        slotRows={slotRows}
        activeSlotIds={activeSlotIds}
        key={`${gridTemplateAreas}-end`}
      />
    </DetailContainer>
  );
};

function DetailText(props: {
  slotId?: SlotId;
  slotProps: SlotItemData;
  className?: string;
  style?: CSSProperties;
}) {
  const { slotProps, slotId, className, style } = props;

  const slotData = isSlotItemProps(slotProps) ? slotProps : normalizeSlotPropData(slotProps);

  const { variant, value, className: overrideClassName, ...overrideTextProps } = slotData;
  const textSlotProps = textComponentProps[variant ?? slotId ?? 'body'];

  return (
    <>
      {slotData.value ? (
        <Text
          {...textSlotProps}
          {...overrideTextProps}
          className={twMerge(className, overrideClassName)}
          style={style}
        >
          {value}
        </Text>
      ) : null}
    </>
  );
}

interface AlignSlotProps {
  slot?: SlotItemData;
  position: 'start' | 'end';
  gridArea?: string;
  gridHeight: number;
  slotRows: SlotData[][];
  activeSlotIds: SlotId[];
}

const AlignedSlot = forwardRef<HTMLDivElement, AlignSlotProps>(
  ({ slot, position, slotRows }, forwardedRef) => {
    const rowCount = slotRows.length;

    const innerElDimensions = useDimensions();

    const { value: children, ...textProps } = normalizeSlotPropData(slot);

    const atIndex = position === 'start' ? 0 : -1;

    return (
      <>
        {slot ? (
          <div
            ref={forwardedRef}
            className="relative w-full"
            style={{
              gridArea: slotRows[0]?.at(atIndex)?.gridArea,
              gridRow: '1 / -1',
              minWidth: innerElDimensions.width,
            }}
          >
            <Flex
              gap
              className={clsx('absolute -translate-y-1/2 top-2/4 z-10', {
                'left-0': position === 'start',
                'right-0': position === 'end',
              })}
              justify={position}
              ref={innerElDimensions.observe}
            >
              <Wrap if={rowCount >= 3} wrap={(c) => <div className="translate-y-1/3">{c}</div>}>
                <Text {...textProps}> {children}</Text>
              </Wrap>
            </Flex>
          </div>
        ) : null}
      </>
    );
  }
);

type RefMap<K extends string> = Record<`${K}Ref`, React.RefObject<HTMLDivElement>>;

type UseSlotRefsReturn = RefMap<'start' | 'end'>;

function useSlotRefs(): UseSlotRefsReturn {
  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  return { startRef, endRef };
}
function buildPlaceholderId(column: SlotColumnId) {
  return `placeholder-${column}`;
}
function buildGridAreaId(rowId: string, column: SlotColumnId): string {
  return `${rowId}-${column}`;
}

function slotIdToMainSlotId(propKey: string): SlotId {
  let key = propKey;

  if (key.startsWith('start')) key = key.replace('start', '');
  if (key.startsWith('end')) key = key.replace('end', '');
  if (key.startsWith('placeholder')) key = key.replace('placeholder', '');

  return key.toLowerCase() as SlotId;
}

function normalizeSlotPropData(item: SlotItemData): SlotItemProps {
  if (isSlotItemProps(item)) {
    return item;
  }
  return { value: item };
}

function isSlotItemProps(item: SlotItemData): item is SlotItemProps {
  return Boolean(item && typeof item === 'object' && 'value' in item);
}
