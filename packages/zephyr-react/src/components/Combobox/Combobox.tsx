/* eslint-disable react/no-unused-prop-types */
import * as ComboboxPrimitive from 'ariakit/combobox';
import * as SelectPrimitive from 'ariakit/select';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { InputSelect, InputSelectProps } from 'components/Input';
import { Button } from 'components/Button';
import { notEmpty } from 'utils/notEmpty';
import { O } from 'ts-toolbelt';
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { ComboboxPopover } from 'components/Combobox/ComboboxPopover';
import {
  getOptionMap,
  originalValueToSelectOption,
  originalValueToValueString,
  valueStringToOriginalValue,
} from 'components/Combobox/Combobox.helpers';
import useDeepCompareEffect, { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect';
import { useImmer } from 'use-immer';
import { enableMapSet } from 'immer';

enableMapSet();
export interface ComboboxOptionGetters<TOptions extends unknown[]> {
  getOptionLabel: (option: TOptions[number]) => string;
  getOptionValue?: (option: TOptions[number]) => unknown;
}

interface ComboboxBaseProps<TOptions extends unknown[] = unknown[]>
  extends ComboboxOptionGetters<TOptions>,
    Omit<InputSelectProps, 'state' | 'value' | 'defaultValue' | 'as' | 'ref'> {
  options: TOptions;
  searchOptions?: TOptions;
  onLastOptionItemScrollReached?: () => void;
  searching?: boolean;
  onSearchDebounceDelay?: number;
  onSearch?: (search: string) => void;
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

export type ComboboxProps<TOptionType extends unknown[]> =
  | SingleSelectComboboxProps<TOptionType>
  | MultiSelectComboboxProps<TOptionType>;

export interface SelectOption {
  label: string;
  value: unknown;
  index: number;
  id: string;
  isSelected?: boolean;
  isSearchResultOption?: boolean;
}

export type SelectOptionMap = Map<string, SelectOption>;

export type OptionValueMap = Map<string, SelectOption>;

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
  const [searchingStarted, setSearchingStarted] = useState(false);

  const [isSearchActive, setIsSearchActive] = useState<boolean | undefined>();

  const searching = isSearchActive;

  useEffect(() => {
    setIsSearchActive(isSearching);
  }, [isSearching]);

  const debouncedOnSearch = useDebouncedCallback((search: string) => {
    onSearch?.(search);
    setSearchingStarted(false);
  }, onSearchDebounceDelay);

  function handleSearch(search: string) {
    if (onSearch && prevSearch.current !== search) {
      setSearchingStarted(true);
      debouncedOnSearch(search);
      prevSearch.current = search;
    }
  }

  console.log({ searching, isSearching, searchingStarted });
  return { searching, handleSearch };
}

export function Combobox<TOptions extends unknown[]>({
  options,
  getOptionLabel,
  getOptionValue,
  value: originalValueProp,
  isMultiSelect,
  label,
  loading,
  onClearValue,
  searching: searchingProp,
  onSearchDebounceDelay,
  onLastOptionItemScrollReached,
  onValueChange,
  onSearch,
  ...props
}: ComboboxProps<TOptions>) {
  // const [optionsState, setOptionsState] = useState(options);

  const [selectOptionMap, updateSelectOptionMap] = useImmer<SelectOptionMap>(new Map([]));

  useDeepCompareEffectNoCheck(() => {
    // const v = originalValueToValueString({
    //   originalValue: originalValueProp,
    //   getOptionLabel,
    //   isMultiSelect,
    // });

    const optionMap = getOptionMap({ data: originalValueProp, getOptionLabel, getOptionValue });

    updateSelectOptionMap((draft) => {
      optionMap.forEach((value, key) => {
        draft.set(key, { ...value, isSelected: true });
      });

      // draft.forEach(({ isSelected }, key) => {
      //   if (!optionMap.has(key) && !isSelected) {
      //     draft.delete(key);
      //   }
      // });
    });
  }, [originalValueProp]);

  useDeepCompareEffect(() => {
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

    console.log({ ...reduced });

    return reduced;
  }, [isMultiSelect, searching, selectOptionMap]);

  useDeepCompareEffect(() => {
    console.log({ selectOptionMap });
  }, [selectOptionMap]);

  // const optionsState = useMemo(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  //   return (options ?? []).filter(notEmpty);
  // }, [options]);

  // const { optionList, optionMap } = useMemo(() => {
  //   return getOptionMap({ data: optionsState, getOptionLabel, getOptionValue });
  // }, [getOptionLabel, getOptionValue, optionsState]);

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

  // const getValuePropStringValue = useCallback(() => {
  //   if (originalValueProp === undefined) return isMultiSelect ? [] : '';
  //   if (Array.isArray(originalValueProp)) return originalValueProp.map((v) => getOptionLabel(v));
  //   return getOptionLabel(originalValueProp);
  // }, [getOptionLabel, isMultiSelect, originalValueProp]);

  // const getOriginalValue = (value?: string | string[]) => {
  //   if (!value) return undefined;
  //   if (Array.isArray(value)) return value.map((v) => optionMap.get(v)).filter(notEmpty);
  //   return optionValueMap.get(value);
  // };

  // const defaultStringValue = getValuePropStringValue();

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

      // console.log({ stringValue, newValue, newOptionMap, optionValueMap, optionMap });

      onValueChange?.(newValue as never);

      if (!stringValue || stringValue.length === 0) {
        setViewAllSelected(false);
      }
    },
    virtualFocus: true,
    flip: false,
    fixed: true,
  });

  const { value: selectValue } = select;

  // const optionValueMap = useMemo(() => {
  //   const valueArr = Array.isArray(selectValue) ? selectValue : [selectValue];

  //   return new Map(valueArr.map((e) => [e, optionMap.get(e)!]));
  // }, [optionMap, selectValue]);

  // console.log('optionValueMap', optionValueMap);
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
      <ComboboxPopover
        combobox={combobox}
        select={select}
        selectOptionMap={selectOptionMap}
        isMultiSelect={isMultiSelect}
        searching={searching}
        viewAllSelected={viewAllSelected}
        setViewAllSelected={setViewAllSelected}
      />
    </div>
  );
}
