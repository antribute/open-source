/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-unused-prop-types */
import * as ComboboxPrimitive from 'ariakit/combobox';
import * as SelectPrimitive from 'ariakit/select';

import { classed } from '@tw-classed/react';
import { List } from 'components/List';
import { BaseListItemElement } from 'components/List/ListItem/BaseListItem';
import { ListItemContainer } from 'components/List/ListItem/ListItemContainer';
import clsx from 'clsx';
import { Text } from 'components/Text';
import { BasicCheckbox } from 'components/BasicCheckbox';
import { ScrollViewport } from 'components/ScrollViewport';
import { ComboboxFooter, ComboboxFooterProps } from 'components/Combobox/ComboboxFooter';
import { useComboboxListVirtualizer } from 'components/Combobox/useComboboxListVirtualizer';
import {
  UseToggleViewAllSelectedOnUnmountProps,
  useToggleViewAllSelectedOnUnmount,
} from 'components/Combobox/useToggleViewAllSelected';
import { Flex } from 'components/Flex';
import { elementHasOverflowY } from 'utils/elementHasOverflow';
import { Input } from 'components/Input';
import { useNearestColorSchemeAttribute } from 'hooks/useNearestColorSchemeAttribute';
import type { ComboboxProps, RenderComboboxOptionFn, SelectOptionMap } from './Combobox.types';

export interface ComboboxListProps
  extends Omit<ComboboxFooterProps, 'optionsCount'>,
    Pick<ComboboxProps<any>, 'multiSelectVariant'>,
    Pick<UseToggleViewAllSelectedOnUnmountProps, 'toggleViewAllSelectedOnPopoverUnmount'> {
  searching?: boolean;
  select: SelectPrimitive.SelectState;
  combobox: ComboboxPrimitive.ComboboxState;
  selectOptionMap: SelectOptionMap;
  isMultiSelect: boolean;
  viewAllSelected?: boolean;
  virtualization?: boolean;
  maxHeight?: React.CSSProperties['height'];
  hasSelected?: boolean;
  renderOption?: RenderComboboxOptionFn<unknown[]>;
}

const ComboboxListItem = (props: React.ComponentProps<typeof ComboboxPrimitive.ComboboxItem>) => (
  <ComboboxPrimitive.ComboboxItem as="li" {...props} />
);

const ComboboxItem = classed(ComboboxListItem, BaseListItemElement, 'font-body');

const ComboboxListContainerElement = classed(List.Container);

export const ComboboxPopover = ({
  combobox,
  selectOptionMap,
  isMultiSelect,
  viewAllSelected,
  searching,
  select,
  hasSearchableOptions,
  setViewAllSelected,
  maxHeight = 500,
  multiSelectVariant,
  toggleViewAllSelectedOnPopoverUnmount,
  renderOption,
  hasSelected,
}: ComboboxListProps) => {
  const { scrollElementRef, virtualizer, getOption, noMatches } = useComboboxListVirtualizer({
    combobox,
    selectOptionMap,
    searching,
    viewAllSelected,
    multiSelectVariant,
  });

  const popoverListHasOverflow = elementHasOverflowY(scrollElementRef.current);

  useToggleViewAllSelectedOnUnmount({
    select,
    setViewAllSelected,
    popoverListHasOverflow,
    multiSelectVariant,
    toggleViewAllSelectedOnPopoverUnmount,
  });

  const hasCheckbox = isMultiSelect && multiSelectVariant !== 'tags';

  const virutalItems = virtualizer.getVirtualItems();

  const colorSchemeAttribute = useNearestColorSchemeAttribute({ element: select.anchorRef });

  return (
    <SelectPrimitive.SelectPopover
      state={select}
      composite={false}
      data-color-scheme={colorSchemeAttribute}
      portal
      className={clsx(
        'z-50 relative',
        'flex flex-col',
        'bg-surface-soft',
        'shadow-lg',
        'border border-highlight-moderate rounded',
        'divide-y divide-highlight-moderate',
        'animate-slide-down'
      )}
      style={{ maxHeight }}
    >
      <div className={clsx('px-4 py-6')}>
        <ComboboxPrimitive.Combobox
          as={Input}
          autoFocus
          noContainer
          state={combobox}
          // width="auto"
          minWidth={false}
          maxWidth={false}
          // autoSelect
          size="sm"
          fullWidth
          border={false}
          filled={false}
          placeholder="Search..."
          loading={searching}
        />
      </div>
      {noMatches && (
        <Flex gap as="div" centerAlign className="p-6">
          <Text className="font-medium opacity-10" color="strong" size="sm">
            {searching ? 'Loading...' : 'No Options'}
          </Text>
        </Flex>
      )}

      {!noMatches && (
        <ScrollViewport.ScrollAreaContainer
          className="grow relative w-full rounded-b-[inherit] bg-transparent"
          style={{ height: virtualizer.getTotalSize() }}
        >
          <ScrollViewport.ScrollAreaViewport ref={scrollElementRef}>
            <div
              style={{
                height: virtualizer.getTotalSize(),
                width: '100%',
                position: 'relative',
              }}
            >
              <ComboboxPrimitive.ComboboxList
                divide
                state={combobox}
                as={ComboboxListContainerElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virutalItems[0]?.start ?? 0}px)`,
                }}
              >
                {virutalItems.map((virtualItem) => {
                  const { label, isSelected, value } = getOption(virtualItem as never)!;

                  const isActive = combobox.activeValue === label;

                  const renderOptionValue = renderOption?.(value);

                  return (
                    <ListItemContainer
                      aria-selected={isSelected}
                      key={virtualItem.key}
                      data-index={virtualItem.index}
                      ref={virtualizer.measureElement}
                    >
                      <ComboboxItem
                        focusOnHover
                        hoverable
                        hideOnClick={false}
                        highlight={isSelected}
                        inactive={!isActive && hasSelected}
                        active={isActive}
                        paddingY="md"
                        paddingX="xs"
                      >
                        {(props) => (
                          <SelectPrimitive.SelectItem {...props} value={label}>
                            <Flex gap="md">
                              {hasCheckbox && (
                                <BasicCheckbox
                                  size="sm"
                                  excludeFromTabOrder
                                  isSelected={isSelected}
                                  pointerEventsNone
                                />
                              )}
                              <span>
                                {!renderOptionValue && <Text className="truncate">{label}</Text>}

                                {renderOptionValue && renderOptionValue}
                              </span>
                            </Flex>
                          </SelectPrimitive.SelectItem>
                        )}
                      </ComboboxItem>
                    </ListItemContainer>
                  );
                })}
              </ComboboxPrimitive.ComboboxList>
            </div>
          </ScrollViewport.ScrollAreaViewport>
        </ScrollViewport.ScrollAreaContainer>
      )}

      <ComboboxFooter
        optionsCount={selectOptionMap.size}
        select={select}
        combobox={combobox}
        scrollElementRef={scrollElementRef}
        hasSearchableOptions={hasSearchableOptions}
        viewAllSelected={viewAllSelected}
        setViewAllSelected={setViewAllSelected}
        multiSelectVariant={multiSelectVariant}
      />
    </SelectPrimitive.SelectPopover>
  );
};
