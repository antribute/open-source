import { FloatGroup, FloatGroupProps } from 'components/Detail/FloatGroup';
import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { classed } from 'utils/classed';
import { Text, TextProps } from 'components/Text';
import { TextComponentType } from 'components/Text/textComponentProps';
import { notEmpty, pickProps } from 'utils';
import { get, orderBy, uniq } from 'lodash-es';
import { Flex } from 'components/Flex';
import {
  detailSlotGridAreasClassNames,
  getSlotItemTextProps,
  normalizeSlotItemData,
} from 'components/Detail/Detail.helpers';
import useDimensions from 'react-cool-dimensions';
import clsx from 'clsx';
import { mergeRefs } from 'react-merge-refs';
import { useRef } from 'react';
import { CSSProperties } from 'react';

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
>;

export type SlotItemTextPropsWithChildren = SlotItemTextProps & {
  children?: React.ReactNode;
};

export interface BaseSlotProps extends SlotItemTextProps {
  value: React.ReactNode | undefined;
  align?: 'start' | 'center' | 'end';
}

export interface PrimarySlotItemProps extends BaseSlotProps {}

export interface StartOrEndSlotItemProps extends BaseSlotProps {
  variant?: TextComponentType;
}

export interface SecondarySlotItemProps extends BaseSlotProps {
  variant?: TextComponentType;
}

export type SlotItemProps = PrimarySlotItemProps | SecondarySlotItemProps | StartOrEndSlotItemProps;

export type SlotItemData = React.ReactNode | null | SlotItemProps;

export const slotIds = [
  'overline',
  'heading',
  'title',
  'subtitle',
  'description',
  'caption',
] as const;

export type SlotId = (typeof slotIds)[number];

type SecondaryDetailSlotId = `secondary${Capitalize<SlotId>}`;

type StartDetailSlotId = `start${Capitalize<SlotId>}`;

type EndDetailSlotId = `end${Capitalize<SlotId>}`;

export type SlotRecord<K extends string, V> = Partial<Record<K, React.ReactNode | null | V>>;

export type PrimaryDetailSlots = SlotRecord<SlotId, PrimarySlotItemProps>;

export type SecondaryDetailSlots = SlotRecord<SecondaryDetailSlotId, SlotItemProps>;

export type StartDetailSlots = SlotRecord<StartDetailSlotId, SlotItemProps>;

export type EndDetailSlots = SlotRecord<EndDetailSlotId, SlotItemProps>;

export type CenterDetailSlots = SlotRecord<'start' | 'end', React.ReactNode>;

type DetailSlots = PrimaryDetailSlots &
  SecondaryDetailSlots &
  StartDetailSlots &
  EndDetailSlots &
  CenterDetailSlots;

interface DetailItemSlots extends DetailSlots {
  orderByPropKeyOrder?: boolean;
  justifyCenter?: boolean;
}

export interface DetailProps extends DetailItemSlots {
  className?: string;
  style?: CSSProperties;
}

export const Detail = React.memo((props: DetailProps) => {
  const { className, style, orderByPropKeyOrder } = props;

  const primaryDetailSlots = filterSlotProps(
    pickProps<PrimaryDetailSlots>(props, {
      caption: '_pick_',
      description: '_pick_',
      heading: '_pick_',
      overline: '_pick_',
      subtitle: '_pick_',
      title: '_pick_',
    })
  );

  const { start, end } = pickProps<CenterDetailSlots>(props, {
    start: '_pick_',
    end: '_pick_',
  });

  const secondaryDetailSlotProps = filterSlotProps(
    pickProps<SecondaryDetailSlots>(props, {
      secondaryOverline: '_pick_',
      secondarySubtitle: '_pick_',
      secondaryHeading: '_pick_',
      secondaryTitle: '_pick_',
      secondaryDescription: '_pick_',
      secondaryCaption: '_pick_',
    })
  );

  const startDetailSlotProps = filterSlotProps(
    pickProps<StartDetailSlots>(props, {
      startOverline: '_pick_',
      startSubtitle: '_pick_',
      startHeading: '_pick_',
      startTitle: '_pick_',
      startDescription: '_pick_',
      startCaption: '_pick_',
    })
  );

  const endDetailSlotProps = filterSlotProps(
    pickProps<EndDetailSlots>(props, {
      endOverline: '_pick_',
      endSubtitle: '_pick_',
      endHeading: '_pick_',
      endTitle: '_pick_',
      endDescription: '_pick_',
      endCaption: '_pick_',
    })
  );

  const floatGroups = useMemo(() => {
    return slotIds
      .map((slotId): (FloatGroupProps & { slotId: SlotId }) | undefined => {
        const primarySlot = primaryDetailSlots[slotId];
        const secondarySlot = secondaryDetailSlotProps[slotId];

        if (!primarySlot && !secondarySlot) return undefined;

        const left = primarySlot ?? secondarySlot;
        const right = primarySlot ? secondarySlot : undefined;

        const slotContainerClasses: Partial<Record<SlotId, string>> = {
          overline: 'pb-4',
          caption: 'pt-4',
          description: 'pt-4',
        };

        return {
          slotId,
          left: left?.textProps!,
          right: right?.textProps!,
          className: twMerge(slotContainerClasses[slotId], left?.gridAreaClassName),
        };
      })
      .filter(notEmpty);
  }, []);

  const {
    gridTemplateAreas,
    startGridAreaColumn,
    endGridAreaColumn,
    gridTemplateColumns,
    rowCount,
  } = useMemo(() => {
    const midDetailSlotProps = { ...primaryDetailSlots, ...secondaryDetailSlotProps };

    const slots = [startDetailSlotProps, midDetailSlotProps, endDetailSlotProps];

    const slotKeys = slots.map((e) => Object.keys(e) as SlotId[]);

    const getActiveSlots = () => {
      const activeSlots = uniq(slotKeys.flat()) as SlotId[];

      const slotOrder = orderByPropKeyOrder ? Object.keys(props) : slotIds;

      return orderBy(activeSlots, (k) => {
        if (k === 'overline') return -Infinity;
        if (k === 'caption') return Infinity;
        return slotOrder.indexOf(k);
      });
    };

    const activeSlots = getActiveSlots();

    const slotColumnFlags = slotKeys.map((e) => e.length > 0);

    const [hasStartColumn, _, hasEndColumn] = slotKeys.map((e) => e.length > 0);

    const rows = activeSlots.map((slotId) => {
      const slotColumnAreas = [`start-${slotId}`, slotId, `end-${slotId}`];

      const row = slots
        .map((slotColumn, index) => {
          const columnExists = slotColumnFlags[index];

          const slotExists = slotColumn[slotId];

          if (slotExists) return slotColumnAreas[index];

          if (columnExists) return '.';

          return undefined;
        })
        .filter(notEmpty);

      if (start && !hasStartColumn) {
        row.unshift('start');
      }

      if (end && !hasEndColumn) {
        row.push('end');
      }

      return row;
    });

    function getStartOrEndArea(position: 'start' | 'end') {
      return rows
        .map((row) => {
          const index = position === 'start' ? 0 : row.length - 1;
          return row[index];
        })
        .filter((e) => e !== '.')[0];
    }

    const gridTemplateColumns = () => {
      const row = rows[0];
      if (row?.length === 3) {
        return 'min-content auto min-content';
      }

      if (slotColumnFlags[0] || start) {
        return 'min-content auto';
      }

      if (slotColumnFlags[2] || end) {
        return 'auto min-content';
      }

      return 'auto';
    };

    return {
      gridTemplateAreas: rows.map((row) => `"${row.join(' ')}"`).join('\n'),
      startGridAreaColumn: getStartOrEndArea('start'),
      endGridAreaColumn: getStartOrEndArea('end'),
      gridTemplateColumns: gridTemplateColumns(),
      rowCount: rows.length,
    };
  }, []);

  console.log(gridTemplateAreas);

  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  return (
    <DetailContainer className={className} style={{ gridTemplateAreas, gridTemplateColumns }}>
      <CenterSlot
        rowCount={rowCount}
        ref={startRef}
        position="start"
        gridArea={startGridAreaColumn}
      >
        {start}
      </CenterSlot>

      {Object.values(startDetailSlotProps).map((props) => (
        <SlotItem {...props} position="start" centerSlotRef={startRef} />
      ))}

      {floatGroups.map(({ left, right, slotId, className }, index) => {
        return (
          <FloatGroup key={`${slotId}-${index}`} left={left} right={right} className={className} />
        );
      })}

      {Object.values(endDetailSlotProps).map((props) => (
        <SlotItem {...props} position="end" centerSlotRef={endRef} />
      ))}

      <CenterSlot rowCount={rowCount} ref={endRef} position="end" gridArea={endGridAreaColumn}>
        {end}
      </CenterSlot>
    </DetailContainer>
  );
});

const DetailContainer = classed('div', 'grid gap-x-16 relative z-auto w-full', {
  variants: {
    gapX: {
      false: 'gap-x-0',
      xs: 'gap-x-6',
      sm: 'gap-x-10',
      md: 'gap-x-16',
      lg: 'gap-x-20',
    },
    gapY: {
      false: 'gap-y-0',
      md: 'gap-y-8',
      sm: 'gap-x-6',
      xs: 'gap-x-4',
    },
  },
});

const CenterSlot = React.memo(
  React.forwardRef<
    HTMLDivElement,
    {
      gridArea?: string;
      className?: string;
      position: 'start' | 'end';
      children?: React.ReactNode;
      rowCount: number;
    }
  >(({ children, position, gridArea, rowCount }, forwardedRef) => {
    const { observe, width } = useDimensions();

    const ref = mergeRefs([forwardedRef, observe]);

    return (
      <div
        className="relative "
        style={{
          minWidth: width,
          gridArea,
          gridRow: '1 / -1',
        }}
      >
        {children ? (
          <Flex
            className={clsx('@ absolute -translate-y-1/2 top-2/4 z-10 right-0', {
              'left-0': position === 'start',
              'right-0': position === 'end',
            })}
            align="center"
            justify={'end'}
          >
            <div className={clsx({ 'translate-y-1/3': rowCount > 2 })} ref={ref}>
              <div className="min-h-[24px] min-w-[24px]"> {children}</div>
            </div>
          </Flex>
        ) : null}
      </div>
    );
  })
);

const SlotItem = React.memo(
  ({
    position,
    gridAreaClassName,
    slotId,
    textProps,
    align: alignProp,
    centerSlotRef,
  }: ResolvedSlotItemData & {
    position: 'start' | 'end';
    style?: React.CSSProperties;
    centerSlotRef: React.RefObject<HTMLDivElement>;
  }) => {
    const align = useMemo(() => {
      const defaultAlignMap = {
        // caption: 'end',
        // overline: 'start',
      };

      const defaultAlign = get(defaultAlignMap, slotId);

      const alignSlot = alignProp ?? defaultAlign ?? 'center';

      return alignSlot as BaseSlotProps['align'];
    }, [slotId]);

    const slotDimensions = useDimensions();

    const containerDimensions = useDimensions();

    const { width: centerSlotWidth } = centerSlotRef.current?.getBoundingClientRect() ?? {};

    const maxWidth = centerSlotWidth ? centerSlotWidth : undefined;
    return (
      <div
        key={containerDimensions.width}
        className={twMerge('relative w-full', gridAreaClassName)}
        style={{
          minWidth:
            maxWidth && maxWidth > 10
              ? Math.min(slotDimensions.width, maxWidth)
              : slotDimensions.width,
          maxWidth,
          height: containerDimensions.height || slotDimensions.height,
        }}
        ref={containerDimensions.observe}
      >
        <Flex
          className={clsx('absolute top-0 h-full', {
            'left-0': position === 'start',
            'right-0': position === 'end',
          })}
          // style={{ height: containerDimensions.height || undefined }}
          ref={slotDimensions.observe}
          align={align}
          justify={position}
        >
          <Text noWrap {...textProps} align={position} />
        </Flex>
      </div>
    );
  }
);

type ResolvedSlotItemData = {
  align?: BaseSlotProps['align'];
  textProps: SlotItemTextPropsWithChildren;
  gridAreaClassName: string;
  key: string;
  slotId: SlotId;
};

function filterSlotProps<T extends object>(slotProps: T) {
  const entries = Object.entries(slotProps)
    .map(([key, value]) => {
      const slotId = getPrimarySlotId(key);

      const getGridAreaClassName = () => {
        if (key.startsWith('start')) return detailSlotGridAreasClassNames.start[slotId];
        if (key.startsWith('end')) return detailSlotGridAreasClassNames.end[slotId];
        if (Boolean(slotIds.find((e) => e === key)))
          return detailSlotGridAreasClassNames.primary[slotId];
        return undefined;
      };

      const { align } = normalizeSlotItemData(value, slotId);
      const textProps = getSlotItemTextProps(value, slotId);

      const gridAreaClassName = getGridAreaClassName();

      return [
        slotId,
        textProps
          ? {
              align,
              textProps,
              slotId,
              key,
              gridAreaClassName,
            }
          : undefined,
      ];
    })
    .filter(([_, v]) => Boolean(v));

  return Object.fromEntries(entries) as Partial<Record<SlotId, ResolvedSlotItemData>>;
}

function getPrimarySlotId(key: string) {
  if (key.startsWith('start')) key = key.replace('start', '');
  if (key.startsWith('end')) key = key.replace('end', '');
  if (key.startsWith('secondary')) key = key.replace('secondary', '');
  return key.toLowerCase() as SlotId;
}
