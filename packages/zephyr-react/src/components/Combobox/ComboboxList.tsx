/* eslint-disable react/no-unused-prop-types */
import * as ComboboxPrimitive from 'ariakit/combobox';
import * as SelectPrimitive from 'ariakit/select';

import { useRef } from 'react';
import { classed } from '@tw-classed/react';
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import { List } from 'components/List';
import { BaseListItem } from 'components/List/ListItem/BaseListItem';
import { ListItemSpan } from 'components/List/ListItem/ListItemSpan';
import { ListItemContainer } from 'components/List/ListItem/ListItemContainer';

import clsx from 'clsx';
import { Text } from 'components/Text';
import { BasicCheckbox } from 'components/Checkbox/Checkbox.styles';

import type { ComboboxProps, SelectOptionMap } from './Combobox';

interface ComboboxListProps
  extends Pick<
    ComboboxProps<unknown[]>,
    'onLastOptionItemScrollReached' | 'searching' | 'onSearch'
  > {
  select: SelectPrimitive.SelectState;
  combobox: ComboboxPrimitive.ComboboxState;
  selectOptionMap: SelectOptionMap;
  isMultiSelect: boolean;
  viewAllSelected?: boolean;
  virtualization?: boolean;
}

const ComboboxListItem = (props: React.ComponentProps<typeof ComboboxPrimitive.ComboboxItem>) => (
  <ComboboxPrimitive.ComboboxItem as="li" {...props} />
);

const ComboboxItem = classed(ComboboxListItem, BaseListItem);

export const ComboboxList = ({
  combobox,
  selectOptionMap,
  isMultiSelect,
  viewAllSelected,
  searching,
  virtualization,
  onSearch,
}: ComboboxListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { matches } = combobox;

  function getFilteredMatches() {
    if (searching) return [];
    if (viewAllSelected) {
      return matches.filter((match) => {
        const option = selectOptionMap.get(match);
        return option?.isSelected;
      });
    }
    return matches;
  }

  const filteredMatches = getFilteredMatches();

  const virtualizer = useVirtualizer({
    count: filteredMatches.length,
    // getItemKey: (index) => `${selectOptionMap.get(filteredMatches[index]!)?.id ?? index}`,
    estimateSize: () => 48,

    scrollingDelay: 300,
    getScrollElement: () => listRef.current,
    overscan: 10,
  });

  function getListProps() {
    // There's a bug where somes the scroll infinitely jumps to the top when the list
    // of matches changes. Adding the option to disable virtualization until
    // a solution for this bug is found.
    // if (virtualization ?? !Boolean(onSearch)) {

    const on = virtualization ?? (onSearch ? filteredMatches.length > 50 : true);

    if (on) {
      const virtualItems = virtualizer.getVirtualItems();
      const totalSize = virtualizer.getTotalSize();

      return {
        getOption: (virtualItem: VirtualItem) => {
          const matchId = filteredMatches[virtualItem.index]!;
          return selectOptionMap.get(matchId)!;
        },
        items: virtualItems,
        parentProps: {
          ref: listRef,
        },
        listContainerProps: {
          style: { position: 'relative', height: totalSize, width: '100%' },
        },
        listItemContainerProps: (virtualItem: VirtualItem) =>
          ({
            key: virtualItem.key,
            'data-index': virtualItem.index,
            ref: virtualizer.measureElement,
            style: {
              transform: `translateY(${virtualItem.start - virtualizer.options.scrollMargin}px)`,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
            },
          } as const),

        listItemProps: {
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          },
        },
      } as const;
    }

    return {
      items: filteredMatches,
      getOption: (str: string) => selectOptionMap.get(str),
    };
  }

  const {
    items,
    parentProps,
    listItemProps,
    listContainerProps,
    listItemContainerProps,
    getOption,
  } = getListProps();

  const noMatches = filteredMatches.length === 0;

  return (
    <div
      className="max-h-400  relative w-full overflow-y-auto overflow-x-hidden rounded-b-[3px] pb-1"
      {...parentProps}
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
          {...listContainerProps}
        >
          {items.map((virtualItem) => {
            const { label, isSelected } = getOption(virtualItem as never)!;

            const isActive = combobox.activeValue === label;

            return (
              <ListItemContainer
                {...listItemContainerProps?.(virtualItem as VirtualItem)}
                className=""
              >
                <ComboboxItem
                  focusOnHover
                  hoverable
                  hideOnClick={false}
                  highlight={isSelected}
                  inactive={!isActive}
                  active={isActive}
                  {...listItemProps}
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
