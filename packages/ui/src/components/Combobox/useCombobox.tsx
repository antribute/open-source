/* eslint-disable react/no-unused-prop-types */
import * as ComboboxPrimitive from 'ariakit/combobox';
import * as SelectPrimitive from 'ariakit/select';
import { useEffect, useMemo, useState, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { getOptionMap } from 'components/Combobox/Combobox.helpers';
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect';
import { useImmer } from 'use-immer';
import { L } from 'ts-toolbelt';
import { toArray } from 'utils';
import { enableMapSet } from 'immer';
import type {
  ComboboxProps,
  ComboboxBaseProps,
  SelectOptionMap,
  SelectOption,
} from './Combobox.types';

enableMapSet();

export function useCombobox<TOptions extends L.List<unknown>>({
  options,
  getOptionLabel = (v) => String(v),
  getOptionValue,
  value: originalValueProp,
  isMultiSelect,
  loading,
  searching: searchingProp,
  onSearchDebounceDelay,
  onValueChange,
  onSearch,
  renderOption,
  maxListHeight = 500,
  multiSelectVariant,
  toggleViewAllSelectedOnPopoverUnmount,
}: ComboboxProps<TOptions>) {
  const [selectOptionMap, updateSelectOptionMap] = useImmer<SelectOptionMap>(new Map([]));

  useDeepCompareEffectNoCheck(() => {
    const optionMap = getOptionMap({ data: originalValueProp, getOptionLabel, getOptionValue });

    updateSelectOptionMap((draft) => {
      optionMap.forEach((value, key) => {
        draft.set(key, { ...value, isSelected: true });
      });
    });
  }, [originalValueProp]);

  useDeepCompareEffectNoCheck(() => {
    const optionMap = getOptionMap({ data: options, getOptionLabel, getOptionValue });

    updateSelectOptionMap((draft) => {
      optionMap.forEach((value, key) => {
        const oldDraft = draft.get(key);
        draft.set(key, { isSelected: oldDraft?.isSelected, ...value });
      });
    });
  }, [options]);

  const { searching, handleSearch } = useComboboxSearch({
    isSearching: searchingProp,
    onSearch,
    onSearchDebounceDelay,
  });

  const { selectStringValue, comboboxStringList } = useMemo(() => {
    const entries = [...selectOptionMap.entries()];

    const reduced = entries.reduce<{
      selectStringValue: string | string[];
      comboboxStringList: string[];
      selectedOptions: SelectOption[];
    }>(
      (acc, cur) => {
        const [key, value] = cur;

        const { isSelected } = value;

        if (isSelected) {
          if (Array.isArray(acc.selectStringValue)) {
            acc.selectStringValue.push(key);
          } else {
            acc.selectStringValue = key;
          }
          acc.selectedOptions.push(value);
        }

        if (!searching) {
          acc.comboboxStringList.push(key);
        }

        return acc;
      },
      {
        selectStringValue: isMultiSelect ? [] : '',
        comboboxStringList: [],
        selectedOptions: [],
      }
    );

    return reduced;
  }, [isMultiSelect, searching, selectOptionMap]);

  const [viewAllSelected, setViewAllSelected] = useState(false);

  const { selectProps, combobox } = useComboboxProps({
    list: comboboxStringList,

    setValue: (value) => {
      handleSearch(value);

      if (value.length > 0) {
        setViewAllSelected(false);
      }
    },
  });

  const select = SelectPrimitive.useSelectState({
    ...selectProps,
    defaultValue: selectStringValue,
    value: selectStringValue,

    setValue: (stringValue) => {
      const newValue = Array.isArray(stringValue)
        ? stringValue.map((str) => selectOptionMap.get(str)?.value)
        : selectOptionMap.get(stringValue)?.value;

      const optionMap = getOptionMap({
        data: newValue,
        getOptionLabel,
        getOptionValue,
      });

      updateSelectOptionMap((draft) => {
        optionMap.forEach((value, key) => {
          draft.set(key, { ...value, isSelected: true });
        });

        draft.forEach((value, key) => {
          if (!optionMap.has(key)) {
            draft.set(key, { ...value, isSelected: false });
          }
        });
      });

      onValueChange?.(newValue as never);

      if (!stringValue || stringValue.length === 0) {
        setViewAllSelected(false);
      }
    },
    virtualFocus: true,
    flip: false,
    fixed: true,
  });

  // Resets combobox value when popover is collapsed
  if (!select.mounted && combobox.value) {
    combobox.setValue('');
  }

  const hasSelected = useMemo(() => {
    return toArray(selectStringValue).length > 0;
  }, [selectStringValue]);

  return {
    hasSelected,
    select,
    loading,
    combobox,
    selectOptionMap,
    isMultiSelect,
    searching,
    onSearch,
    viewAllSelected,
    setViewAllSelected,
    maxListHeight,
    multiSelectVariant,
    renderOption,
    toggleViewAllSelectedOnPopoverUnmount,
  };
}

function useComboboxProps(props: ComboboxPrimitive.ComboboxStateProps) {
  const combobox = ComboboxPrimitive.useComboboxState({
    gutter: 4,
    sameWidth: true,
    ...props,
  });

  // value and setValue shouldn't be passed to the select state because the
  // select value and the combobox value are different things.
  const { value, setValue, ...selectProps } = combobox;

  return { selectProps, combobox };
}

function useComboboxSearch({
  isSearching,
  onSearch,
  onSearchDebounceDelay = 300,
}: {
  isSearching?: boolean;
  onSearch: ComboboxBaseProps['onSearch'];
  onSearchDebounceDelay?: number;
}) {
  const prevSearch = useRef<string | undefined>('');
  // const [searchingStarted, setSearchingStarted] = useState(false);

  const [isSearchActive, setIsSearchActive] = useState<boolean | undefined>();

  const searching = isSearchActive;

  useEffect(() => {
    setIsSearchActive(isSearching);
  }, [isSearching]);

  const debouncedOnSearch = useDebouncedCallback((search: string) => {
    onSearch?.(search);
    // setSearchingStarted(false);
  }, onSearchDebounceDelay);

  function handleSearch(search: string) {
    if (onSearch && prevSearch.current !== search) {
      // setSearchingStarted(true);
      debouncedOnSearch(search);
      prevSearch.current = search;
    }
  }

  return { searching, handleSearch };
}