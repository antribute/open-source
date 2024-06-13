import { OptionList, isOptionGroupArray } from 'react-querybuilder';

export function getQueryBuilderOptionsList(arr: OptionList) {
  if (isOptionGroupArray(arr)) {
    return [];
  }

  return arr;
}
