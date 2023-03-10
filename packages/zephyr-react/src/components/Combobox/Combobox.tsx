/* eslint-disable react/no-unused-prop-types */
import * as ComboboxPrimitive from 'ariakit/combobox';
import * as SelectPrimitive from 'ariakit/select';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { InputSelect, InputSelectProps } from 'components/Input';
import { Button } from 'components/Button';
import { notEmpty } from 'utils/notEmpty';
import { O } from 'ts-toolbelt';
import { useDebouncedCallback } from 'use-debounce';
import { ComboboxPopover } from 'components/Combobox/ComboboxPopover';
import {
  getOptionMap,
  originalValueToSelectOption,
  originalValueToValueString,
  valueStringToOriginalValue,
} from 'components/Combobox/Combobox.helpers';
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect';
import { useImmer } from 'use-immer';
import { enableMapSet } from 'immer';

enableMapSet();
export interface ComboboxOptionGetters<TOptions extends unknown[]> {
  getOptionLabel: (option: TOptions[number]) => string;
  getOptionValue?: (option: TOptions[number]) => unknown;
}

type ComboboxBasePropsBase<TOptions extends unknown[]> = ComboboxOptionGetters<TOptions> & {
  options: TOptions;
  loadOptions: TOptions;
  onLastOptionItemScrollReached?: () => void;
  searching?: boolean;
  onSearch?: (search: string) => void;
};

interface ComboboxBaseProps<TOptions extends unknown[] = unknown[]>
  extends ComboboxOptionGetters<TOptions>,
    Omit<InputSelectProps, 'state' | 'value' | 'defaultValue' | 'as' | 'ref'> {
  options: TOptions;
  onLastOptionItemScrollReached?: () => void;
  searching?: boolean;
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
}: {
  isSearching?: boolean;
  onSearch: ComboboxBaseProps['onSearch'];
}) {
  const [searchingStarted, setSearchingStarted] = useState(false);

  const searching = Boolean(isSearching) || searchingStarted;

  const debouncedOnSearch = useDebouncedCallback((search: string) => {
    onSearch?.(search);
    setSearchingStarted(() => false);
  }, 300);

  function handleSearch(search: string) {
    if (onSearch) {
      setSearchingStarted(() => true);
      debouncedOnSearch(search);
    }
  }

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
  onLastOptionItemScrollReached,
  onValueChange,
  onSearch,
  ...props
}: ComboboxProps<TOptions>) {
  // const [optionsState, setOptionsState] = useState(options);

  const [optionValueMap, updateOptionValueMap] = useImmer<SelectOptionMap>(new Map());

  useDeepCompareEffectNoCheck(() => {
    // const v = originalValueToValueString({
    //   originalValue: originalValueProp,
    //   getOptionLabel,
    //   isMultiSelect,
    // });

    const { optionMap } = getOptionMap({ data: originalValueProp, getOptionLabel, getOptionValue });

    updateOptionValueMap(optionMap);
  }, [originalValueProp]);

  const value = useMemo(() => {
    const keys = [...optionValueMap.keys()];
    console.log('KEYS', keys);
    return isMultiSelect ? keys : keys[0] ?? '';
  }, [isMultiSelect, optionValueMap]);

  useEffect(() => {}, []);

  const optionsState = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return (options ?? []).filter(notEmpty);
  }, [options]);

  const { optionList, optionMap } = useMemo(() => {
    return getOptionMap({ data: optionsState, getOptionLabel, getOptionValue });
  }, [getOptionLabel, getOptionValue, optionsState]);

  const [viewAllSelected, setViewAllSelected] = useState(false);

  const { searching, handleSearch } = useComboboxSearch({ isSearching: searchingProp, onSearch });

  const { selectProps, combobox } = useComboboxProps({
    list: optionList,

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
    defaultValue: value,
    value,

    setValue: (stringValue) => {
      // const originalValue = valueStringToOriginalValue({ value: v, optionValueMap });

      // const getNewValueMap = ({
      //   stringValue,
      // }: {
      //   stringValue: string | string[];
      //   optionValueMap: OptionValueMap;
      // }) => {
      //   if (Array.isArray(stringValue)) {
      //     const entries = stringValue
      //       .map((str) => {
      //         if (optionValueMap.has(str)) {
      //           return [str, optionValueMap.get(str)!] as [string, SelectOption];
      //         }
      //         return undefined;
      //       })
      //       .filter(notEmpty);

      //     return new Map(entries);
      //   }

      //   if (optionValueMap.has(stringValue)) {
      //     const entry = [stringValue, optionValueMap.get(stringValue)] as [string, SelectOption];
      //     return new Map([entry]);
      //   }

      //   return new Map([]) as OptionValueMap;
      // };

      const newValue = Array.isArray(stringValue)
        ? stringValue.map((str) => optionMap.get(str)?.value ?? optionValueMap.get(str)?.value)
        : optionMap.get(stringValue)?.value || optionValueMap.get(stringValue)?.value;

      const { optionMap: newOptionMap } = getOptionMap({
        data: newValue,
        getOptionLabel,
        getOptionValue,
      });

      updateOptionValueMap(newOptionMap);

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
        optionMap={optionMap}
        optionValueMap={optionValueMap}
        isMultiSelect={isMultiSelect}
        searching={searching}
        viewAllSelected={viewAllSelected}
        setViewAllSelected={setViewAllSelected}
      />
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
