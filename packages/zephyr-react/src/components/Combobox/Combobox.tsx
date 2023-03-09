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

interface ComboboxBaseProps<TOptions extends unknown[]>
  extends Omit<InputSelectProps, 'state' | 'value' | 'defaultValue' | 'as' | 'ref'> {
  options: TOptions;
  getOptionLabel: (option: TOptions[number]) => string;
  getOptionValue?: (option: TOptions[number]) => unknown;
  onLastOptionItemScrollReached?: () => void;
  searching?: boolean;
}

interface SingleSelectComboboxProps<TOptions extends unknown[]>
  extends ComboboxBaseProps<TOptions> {
  value?: TOptions;
  onValueChange?: (value: TOptions[number]) => void;
  isMultiSelect?: false;
}
interface MultiSelectComboboxProps<TOptions extends unknown[]> extends ComboboxBaseProps<TOptions> {
  isMultiSelect: true;
  value?: TOptions[number][];
  onValueChange?: (value: TOptions[number][]) => void;
}

type ComboboxProps<TOptionType extends unknown[]> =
  | SingleSelectComboboxProps<TOptionType>
  | MultiSelectComboboxProps<TOptionType>;

interface SelectOption {
  label: string;
  value: unknown;
  index: number;
  id: string;
}

type SelectOptionMap = Map<string, SelectOption>;

const SelectPopoverElement = classed(
  SelectPrimitive.SelectPopover,
  PaperElementBackground,
  'p-0',
  'border-highlight',
  'bg-surface-soft',
  'shadow-lg',
  'z-50 flex flex-col rounded border border-solid pb-0.5 transform relative'
);

interface ComboboxListProps
  extends Pick<ComboboxBaseProps<unknown[]>, 'onLastOptionItemScrollReached' | 'searching'> {
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

interface InfiniteSearchProps {
  itemCount: number;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
}

function useFetchNextPage({
  virtualizer,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  itemCount,
}: {
  virtualizer: Virtualizer<any, Element>;
  disable?: boolean;
} & InfiniteSearchProps) {
  const prevLastItem = useRef<VirtualItem | undefined>();
  useEffect(() => {
    if (!fetchNextPage) {
      return;
    }
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    const lastItemIndex = lastItem.index;

    if (
      lastItemIndex >= itemCount - 1 &&
      !isFetchingNextPage &&
      lastItem.key !== prevLastItem.current?.key
    ) {
      prevLastItem.current = lastItem;

      // fetchNextPage();
    }
    // if (lastItem.index >= itemCount - 1 && hasNextPage && !isFetchingNextPage) {
    //   fetchNextPage();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hasNextPage,
    fetchNextPage,
    itemCount,
    isFetchingNextPage,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    virtualizer.getVirtualItems(),
  ]);
}

const ComboboxList = ({
  combobox,
  optionMap,
  optionValueMap,
  isMultiSelect,
  viewAllSelected,
  select,
  searching,
  onLastOptionItemScrollReached: onOptionsListScrollEndReached,
}: ComboboxListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { matches: comboboxMatches } = combobox;

  const matches = useMemo(() => {
    const selectMatches = Array.isArray(select.value) ? select.value : [];
    return [...new Set([...comboboxMatches, ...selectMatches])];
  }, [comboboxMatches, select.value]);

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
    overscan: 0,
  });

  useFetchNextPage({
    virtualizer,
    itemCount: matches.length,
    disable: viewAllSelected,
    isFetchingNextPage: searching,
    fetchNextPage: onOptionsListScrollEndReached,
  });

  const noMatches = matches.length === 0;

  return (
    <div
      className="max-h-400 divide-boundary relative w-full overflow-y-auto overflow-x-hidden px-0 py-2"
      ref={listRef}
    >
      {noMatches ? (
        <Text
          className="flex w-full items-center justify-center pb-6 font-medium opacity-10"
          color="strong"
          size="sm"
        >
          No Options
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

const useComboboxProps = (props: ComboboxPrimitive.ComboboxStateProps) => {
  const combobox = ComboboxPrimitive.useComboboxState({
    gutter: 4,
    sameWidth: true,

    ...props,
  });

  // value and setValue shouldn't be passed to the select state because the
  // select value and the combobox value are different things.
  const { value, setValue, ...selectProps } = combobox;

  return { selectProps, combobox };
};

export function Combobox<TOptions extends unknown[]>({
  options,
  getOptionLabel,
  getOptionValue,
  value: valueProp,
  isMultiSelect,
  label,
  loading,
  onClearValue,
  searching,
  onLastOptionItemScrollReached,
  onValueChange,
  ...props
}: ComboboxProps<TOptions>) {
  // const [optionsState, setOptionsState] = useState(options);
  const optionsState = options;

  const { labelList, optionMap } = useMemo(() => {
    return optionsState.reduce<{ labelList: string[]; optionMap: SelectOptionMap }>(
      (acc, cur, index) => {
        const label = getOptionLabel(cur);
        const value = getOptionValue?.(cur) ?? cur;
        const id = `${label}-${index}`;
        const option: SelectOption = { label, value, index, id };

        acc.labelList.push(label);
        acc.optionMap.set(label, option);

        return acc;
      },
      { labelList: [], optionMap: new Map() }
    );
  }, [getOptionLabel, getOptionValue, optionsState]);

  const [viewAllSelected, setViewAllSelected] = useState(false);

  const { selectProps, combobox } = useComboboxProps({
    list: labelList,

    setValue: (value) => {
      if (value.length > 0) {
        setViewAllSelected(false);
      }
    },
  });

  const getValuePropStringValue = useCallback(() => {
    if (valueProp === undefined) return isMultiSelect ? [] : '';
    if (Array.isArray(valueProp)) return valueProp.map((v) => getOptionLabel(v));
    return getOptionLabel(valueProp);
  }, [getOptionLabel, isMultiSelect, valueProp]);

  const getOriginalValue = (value?: string | string[]) => {
    if (!value) return undefined;
    if (Array.isArray(value)) return value.map((v) => optionMap.get(v)).filter(notEmpty);
    return optionValueMap.get(value);
  };

  const defaultStringValue = getValuePropStringValue();

  const select = SelectPrimitive.useSelectState({
    ...selectProps,
    defaultValue: defaultStringValue,
    setValue: (value) => {
      const originalValue = getOriginalValue(value);

      onValueChange?.(originalValue as never);

      if (value.length === 0) {
        setViewAllSelected(false);
      }
    },
    virtualFocus: true,
    flip: false,
    fixed: true,
  });

  const { value: selectValue, setValue } = select;

  useEffect(() => {
    if (valueProp) {
      const valuePropStringValue = getValuePropStringValue();

      setValue(valuePropStringValue);
    }
  }, [getValuePropStringValue, setValue, valueProp]);

  const optionValueMap = useMemo(() => {
    const valueArr = Array.isArray(selectValue) ? selectValue : [selectValue];

    return new Map(valueArr.map((e) => [e, optionMap.get(e)!]));
  }, [optionMap, selectValue]);

  // Resets combobox value when popover is collapsed
  if (!select.mounted && combobox.value) {
    combobox.setValue('');
    setViewAllSelected(false);
  }

  // Enable "View All Selected" when mounted if multi-selections exist
  useEffect(() => {
    if (!select.mounted && Array.isArray(selectValue) && selectValue.length > 0) {
      setViewAllSelected(true);
    }
  }, [select.mounted, selectValue]);

  return (
    <div className="w-full">
      <InputSelect
        state={select}
        {...props}
        label={label}
        loading={loading}
        onClearValue={() => {
          onClearValue?.();
          setViewAllSelected(false);
        }}
      />
      <SelectPopoverElement state={select} composite={false}>
        <div className="border-boundary-tint space-y-8 border-b px-4 pt-6 pb-8">
          <ComboboxPrimitive.Combobox
            as={BaseInput}
            state={combobox}
            autoSelect
            size="sm"
            width="full"
            placeholder="Search..."
            shadow={false}
            loading={searching}
          />
        </div>
        {combobox.mounted && (
          <ComboboxList
            combobox={combobox}
            select={select}
            optionMap={optionMap}
            optionValueMap={optionValueMap}
            isMultiSelect={Boolean(isMultiSelect)}
            viewAllSelected={viewAllSelected}
            onLastOptionItemScrollReached={onLastOptionItemScrollReached}
            searching={searching}
          />
        )}

        <AllSelectedFilterButton
          select={select}
          viewAllSelected={viewAllSelected}
          setViewAllSelected={setViewAllSelected}
        />
      </SelectPopoverElement>
    </div>
  );
}

const AllSelectedFilterButton = ({
  select,
  viewAllSelected,
  setViewAllSelected,
}: {
  select: SelectPrimitive.SelectState;
  viewAllSelected?: boolean;
  setViewAllSelected: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { value } = select;

  const show = Array.isArray(value) && value.length > 0;
  return show ? (
    <div className="border-boundary-tint border-t p-8">
      <Button
        fullWidth
        size="xs"
        variant="glass"
        color="secondary"
        className="text-content-weak"
        fontWeight="body"
        onClick={() => {
          setViewAllSelected((prev) => !prev);
        }}
      >
        {viewAllSelected ? 'View All Results' : 'View All Selected'}
      </Button>
    </div>
  ) : null;
};
