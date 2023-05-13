import { notEmpty } from 'utils/notEmpty';
import { toArray } from 'utils/toArray';
import type { ComboboxOptionGetters, SelectOption, SelectOptionMap } from './Combobox.types';

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

export function valueStringToOriginalValue({
  value,
  optionValueMap,
}: {
  value: string | string[];
  optionValueMap: SelectOptionMap;
}) {
  if (!value) return undefined;
  if (Array.isArray(value)) return value.map((v) => optionValueMap.get(v)).filter(notEmpty);
  return optionValueMap.get(value);
}
