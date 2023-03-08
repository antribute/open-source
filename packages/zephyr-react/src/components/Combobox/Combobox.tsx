/* eslint-disable react/no-unused-prop-types */
import * as ComboboxPrimitive from 'ariakit/combobox';
import * as SelectPrimitive from 'ariakit/select';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { BaseInput } from 'components/BaseInput';
import { InputSelect, InputSelectProps } from 'components/Input';
import { classed } from '@tw-classed/react';
import { PaperElementBackground } from 'components/Paper/Paper.styles';
import { useVirtualizer } from '@tanstack/react-virtual';
import { List } from 'components/List';
import { BaseListItem } from 'components/List/ListItem/BaseListItem';
import { ListItemSpan } from 'components/List/ListItem/ListItemSpan';
import { ListItemContainer } from 'components/List/ListItem/ListItemContainer';

import clsx from 'clsx';
import { Text } from 'components/Text';
import { BasicCheckbox } from 'components/Checkbox/Checkbox.styles';

interface ComboboxBaseProps<TOptionType>
  extends Omit<InputSelectProps, 'state' | 'value' | 'defaultValue' | 'as' | 'ref'> {
  options: TOptionType[];
  getOptionLabel: (option: TOptionType) => string;
  getOptionValue?: (option: TOptionType) => unknown;
}

interface SingleSelectComboboxProps<TOptionType> extends ComboboxBaseProps<TOptionType> {
  value?: TOptionType;
  onValueChange?: (value: TOptionType) => void;
  isMultiSelect?: false;
}
interface MultiSelectComboboxProps<TOptionType> extends ComboboxBaseProps<TOptionType> {
  isMultiSelect: true;
  value?: TOptionType[];
  onValueChange?: (value: TOptionType[]) => void;
}

type ComboboxProps<TOptionType> =
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

interface ComboboxListProps {
  select: SelectPrimitive.SelectState;
  combobox: ComboboxPrimitive.ComboboxState;
  optionMap: SelectOptionMap;
  optionValueMap: SelectOptionMap;
  isMultiSelect: boolean;
}

const ComboboxListItem = (props: React.ComponentProps<typeof ComboboxPrimitive.ComboboxItem>) => (
  <ComboboxPrimitive.ComboboxItem as="li" {...props} />
);

const ComboboxItem = classed(ComboboxListItem, BaseListItem);

const ComboboxList = ({
  combobox,
  optionMap,
  optionValueMap,
  isMultiSelect,
}: ComboboxListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { matches } = combobox;

  const virtualizer = useVirtualizer({
    count: matches.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 48,
    scrollingDelay: 300,
    overscan: 10,
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
            const matchId = matches[virtualItem.index]!;

            const isActive = combobox.activeValue === matchId;

            const option = optionMap.get(matchId)!;

            const selectedOption = optionValueMap.get(matchId);

            const isSelected = Boolean(selectedOption);

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
                    <SelectPrimitive.SelectItem {...props} value={option.label}>
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
                        label={
                          <span className={clsx({ '-ml-12': isMultiSelect })}>{option.label}</span>
                        }
                        // description={<span className="-ml-12">Hello</span>}
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

export function Combobox<TOptionType>({
  options,
  getOptionLabel,
  getOptionValue,
  value: valueProp,
  isMultiSelect,
  label,
  ...props
}: ComboboxProps<TOptionType>) {
  const { labelList, optionMap } = useMemo(() => {
    return options.reduce<{ labelList: string[]; optionMap: SelectOptionMap }>(
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
  }, [getOptionLabel, getOptionValue, options]);

  const { selectProps, combobox } = useComboboxProps({ list: labelList });

  const getValuePropStringValue = useCallback(() => {
    if (valueProp === undefined) return isMultiSelect ? [] : '';
    if (Array.isArray(valueProp)) return valueProp.map((v) => getOptionLabel(v));
    return getOptionLabel(valueProp);
  }, [getOptionLabel, isMultiSelect, valueProp]);

  const defaultStringValue = getValuePropStringValue();
  const select = SelectPrimitive.useSelectState({
    ...selectProps,

    defaultValue: defaultStringValue,
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
  }

  return (
    <div className="w-full">
      <InputSelect state={select} {...props} label={label} />
      <SelectPopoverElement state={select} composite={false}>
        <div className="px-4 pt-6 pb-8">
          <ComboboxPrimitive.Combobox
            as={BaseInput}
            state={combobox}
            autoSelect
            size="sm"
            width="full"
            placeholder="Search..."
            shadow={false}
          />
        </div>
        {combobox.mounted && (
          <ComboboxList
            combobox={combobox}
            select={select}
            optionMap={optionMap}
            optionValueMap={optionValueMap}
            isMultiSelect={Boolean(isMultiSelect)}
          />
        )}
      </SelectPopoverElement>
    </div>
  );
}
