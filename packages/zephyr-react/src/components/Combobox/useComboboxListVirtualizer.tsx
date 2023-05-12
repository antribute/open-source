/* eslint-disable react/no-unused-prop-types */
import * as ComboboxPrimitive from 'ariakit/combobox';
import { useRef, useCallback, useMemo } from 'react';
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import type { MultiSelectVariant, SelectOptionMap } from './Combobox.types';

export interface UseComboboxListVirtualizerProps {
  searching?: boolean;
  combobox: ComboboxPrimitive.ComboboxState;
  selectOptionMap: SelectOptionMap;
  viewAllSelected?: boolean;
  multiSelectVariant?: MultiSelectVariant;
}

export const useComboboxListVirtualizer = ({
  combobox,
  selectOptionMap,
  viewAllSelected,
  searching,
  multiSelectVariant,
}: UseComboboxListVirtualizerProps) => {
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const { matches } = combobox;

  const filteredMatches = useMemo(() => {
    if (searching) return [];

    if (multiSelectVariant === 'tags') {
      return matches.filter((match) => {
        const option = selectOptionMap.get(match);
        return !option?.isSelected;
      });
    }
    if (viewAllSelected) {
      return matches.filter((match) => {
        const option = selectOptionMap.get(match);
        return option?.isSelected;
      });
    }
    return matches;
  }, [matches, multiSelectVariant, searching, selectOptionMap, viewAllSelected]);

  const virtualizer = useVirtualizer({
    count: filteredMatches.length,
    estimateSize: () => 48,
    scrollingDelay: 300,
    getScrollElement: () => scrollElementRef.current,
    overscan: 15,
  });

  // const listItemContainerProps = useCallback(
  //   (virtualItem: VirtualItem) =>
  //     ({
  //       key: virtualItem.key,
  //       ref: virtualizer.measureElement,
  //       style: {
  //         transform: `translateY(${virtualItem.start - virtualizer.options.scrollMargin}px)`,
  //         position: 'absolute',
  //         top: 0,
  //         left: 0,
  //         width: '100%',
  //       },
  //     } as const),
  //   [virtualizer.measureElement, virtualizer.options.scrollMargin]
  // );

  const listItemContainerProps = useCallback(
    (virtualItem: VirtualItem) =>
      ({
        key: virtualItem.key,
        ref: virtualizer.measureElement,
        style: {
          transform: `translateY(${virtualItem.start - virtualizer.options.scrollMargin}px)`,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        },
      } as const),
    [virtualizer.measureElement, virtualizer.options.scrollMargin]
  );

  const getOption = useCallback(
    (virtualItem: VirtualItem) => {
      const matchId = filteredMatches[virtualItem.index]!;
      return selectOptionMap.get(matchId)!;
    },
    [filteredMatches, selectOptionMap]
  );

  // const listContainerProps = {
  //   style: {
  //     height: virtualizer.getTotalSize(),
  //     position: 'relative',
  //     width: '100%',
  //   },
  // } satisfies { style: React.CSSProperties };

  const noMatches = filteredMatches.length === 0;

  return {
    scrollElementRef,
    virtualizer,
    noMatches,
    // listContainerProps,
    listItemContainerProps,
    getOption,
  };
};
