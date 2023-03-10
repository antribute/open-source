/* eslint-disable react/no-unused-prop-types */
import * as ComboboxPrimitive from 'ariakit/combobox';
import * as SelectPrimitive from 'ariakit/select';

import { createRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BaseInput } from 'components/BaseInput';
import { InputSelect, InputSelectProps } from 'components/Input';
import { classed } from '@tw-classed/react';
import { PaperElementBackground } from 'components/Paper/Paper.styles';
import { useVirtualizer, Virtualizer, VirtualItem } from '@tanstack/react-virtual';
import { List } from 'components/List';
import { BaseListItem } from 'components/List/ListItem/BaseListItem';
import { ListItemSpan } from 'components/List/ListItem/ListItemSpan';
import { ListItemContainer } from 'components/List/ListItem/ListItemContainer';

import clsx from 'clsx';
import { Text } from 'components/Text';
import { BasicCheckbox } from 'components/Checkbox/Checkbox.styles';
import { PopoverArrow } from 'ariakit';
import { Button } from 'components/Button';
import { notEmpty } from 'utils/notEmpty';
import { O } from 'ts-toolbelt';
import { useDebouncedCallback } from 'use-debounce';

import type { ComboboxProps, SelectOption, SelectOptionMap } from './Combobox';

interface ComboboxListProps
  extends Pick<ComboboxProps<unknown[]>, 'onLastOptionItemScrollReached' | 'searching'> {
  select: SelectPrimitive.SelectState;
  combobox: ComboboxPrimitive.ComboboxState;
  optionMap: SelectOptionMap;
  optionValueMap: SelectOptionMap;
  isMultiSelect: boolean;
  viewAllSelected?: boolean;
}

const ComboboxListItem = (props: React.ComponentProps<typeof ComboboxPrimitive.ComboboxItem>) => (
  <ComboboxPrimitive.ComboboxItem as="li" {...props} />
);

const ComboboxItem = classed(ComboboxListItem, BaseListItem);

export const ComboboxList = ({
  combobox,
  optionMap,
  optionValueMap,
  isMultiSelect,
  viewAllSelected,
  searching,
  select,
}: ComboboxListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { matches } = combobox;

  const filteredMatches = useMemo(() => {
    if (viewAllSelected) {
      return matches.filter((match) => Boolean(optionValueMap.get(match)?.value));
    }
    return matches;
  }, [matches, optionValueMap, viewAllSelected]);

  const virtualizer = useVirtualizer({
    count: filteredMatches.length,
    getScrollElement: () => listRef.current,
    getItemKey: viewAllSelected ? undefined : (index) => matches[index] ?? index,

    estimateSize: () => 48,
    scrollingDelay: 300,
    // overscan: 10,
    overscan: 5,
  });

  const noMatches = matches.length === 0;

  return (
    <div
      className="max-h-400 divide-boundary relative w-full overflow-y-auto overflow-x-hidden px-0 py-2"
      ref={listRef}
    >
      {noMatches ? (
        <Text
          className="mt-6 flex w-full items-center justify-center pb-6 font-medium opacity-10"
          color="strong"
          size="sm"
        >
          {searching ? 'Loading...' : 'No Options'}
        </Text>
      ) : (
        <ComboboxPrimitive.ComboboxList
          divide
          state={combobox}
          as={List.Container}
          className="relative"
          style={{ height: virtualizer.getTotalSize() + 2, width: '100%' }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const matchId = filteredMatches[virtualItem.index]!;

            const isActive = combobox.activeValue === matchId;

            const option = optionMap.get(matchId)!;

            const selectedOption = optionValueMap.get(matchId);

            const isSelected = Boolean(selectedOption);

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            const label = option?.label ?? matchId;

            return (
              <ListItemContainer
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={virtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  // transform: `translateY(${virtualItem.start}px)`,
                  transform: `translateY(${
                    virtualItem.start - virtualizer.options.scrollMargin
                  }px)`,
                }}
              >
                <ComboboxItem
                  focusOnHover
                  hoverable
                  highlight={isSelected}
                  inactive={!isActive}
                  active={isActive}
                  className={clsx('absolute top-0 left-0 w-full')}
                >
                  {(props) => (
                    <SelectPrimitive.SelectItem {...props} value={label}>
                      <ListItemSpan
                        className="truncate"
                        startIcon={
                          isMultiSelect && (
                            <BasicCheckbox
                              size="sm"
                              tabIndex={-1}
                              checked={isSelected}
                              className="mr-4"
                              // className={clsx({ '-ml-12': isMultiSelect })}
                            />
                          )
                        }
                        label={<span className={clsx({ '-ml-12': isMultiSelect })}>{label}</span>}
                      />
                    </SelectPrimitive.SelectItem>
                  )}
                </ComboboxItem>
              </ListItemContainer>
            );
          })}
        </ComboboxPrimitive.ComboboxList>
      )}
    </div>
  );
};
