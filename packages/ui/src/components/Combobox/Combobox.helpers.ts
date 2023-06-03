import { notEmpty } from 'utils/notEmpty';
import { toArray } from 'utils/toArray';
import type { ComboboxOptionGetters, SelectOption, SelectOptionMap } from './Combobox.types';

export function isSingleSelectValueString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isMultiSelectValueString(value: unknown): value is string[] {
  return Array.isArray(value);
}

export function getSelectedCount(stringValue: string | string[]) {
  return !stringValue ? 0 : toArray(stringValue).length;
}

export function getHasSelected(stringValue: string | string[]) {
  return getSelectedCount(stringValue) > 0;
}

interface GetOptionMapOptions extends ComboboxOptionGetters<unknown[]> {
  data?: unknown | unknown[];
}
export function getOptionMap({ data = [], getOptionLabel, getOptionValue }: GetOptionMapOptions) {
  const arr = toArray(data);

  const { optionMap } = arr.reduce<{
    optionList: string[];
    optionMap: SelectOptionMap;
  }>(
    (acc, cur, index) => {
      const option = originalValueToSelectOption({
        originalValue: cur,
        index,
        getOptionLabel,
        getOptionValue,
      });

      const { label } = option;
      acc.optionList.push(label);
      acc.optionMap.set(label, option);

      return acc;
    },
    { optionList: [], optionMap: new Map() }
  );

  return optionMap;
}

export function originalValueToSelectOption({
  originalValue,
  index,
  getOptionLabel,
  getOptionValue,
}: ComboboxOptionGetters<unknown[]> & { originalValue: unknown; index: number }) {
  const label = getOptionLabel(originalValue);
  const value = getOptionValue?.(originalValue) ?? originalValue;
  const id = `${label}-${index}`;

  return { label, value, index, id } as SelectOption;
}

export function originalValueToValueString<TOptions extends unknown[]>({
  originalValue,
  isMultiSelect,
  getOptionLabel,
}: {
  originalValue: TOptions[number] | TOptions[number][] | undefined;
  isMultiSelect?: boolean;
} & Pick<ComboboxOptionGetters<TOptions>, 'getOptionLabel'>) {
  if (originalValue === undefined) return isMultiSelect ? [] : '';
  if (Array.isArray(originalValue)) return originalValue.map((v) => getOptionLabel(v));
  return getOptionLabel(originalValue);
}

export function valueStringToOriginalValue<T>(
  value: string | string[],
  {
    selectOptionMap,
    isMultiSelect,
  }: {
    isMultiSelect: boolean | undefined;
    selectOptionMap: SelectOptionMap<T>;
  }
) {
  if (!value) return isMultiSelect ? [] : undefined;
  if (isMultiSelectValueString(value))
    return value.map((v) => selectOptionMap.get(v)?.value).filter(notEmpty);
  return selectOptionMap.get(value)?.value;
}
