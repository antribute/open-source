/* eslint-disable react/no-unused-prop-types */
import { useEffect } from 'react';
import * as SelectPrimitive from 'ariakit/select';
import type { MultiSelectVariant } from './Combobox.types';

export interface UseToggleViewAllSelectedOnUnmountProps {
  toggleViewAllSelectedOnPopoverUnmount?: boolean;
  select: SelectPrimitive.SelectState;
  setViewAllSelected: (v: boolean) => void;
  popoverListHasOverflow?: boolean;
  multiSelectVariant?: MultiSelectVariant;
}
/**
 *
 * A hook which that will toggle the "View All Selected" mode if:
 *
 * - Popover is mounted
 * - Multi-selections exist
 * - ComboboxList has an overflow-y
 *
 */
export function useToggleViewAllSelectedOnUnmount({
  select,
  setViewAllSelected,
  popoverListHasOverflow,
  multiSelectVariant,
  toggleViewAllSelectedOnPopoverUnmount = true,
}: UseToggleViewAllSelectedOnUnmountProps) {
  const { value: selectValue } = select;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!select.mounted && toggleViewAllSelectedOnPopoverUnmount) {
      if (
        Array.isArray(selectValue) &&
        selectValue.length > 0 &&
        multiSelectVariant !== 'tags' &&
        popoverListHasOverflow
      ) {
        return setViewAllSelected(true);
      }
    }
  }, [
    multiSelectVariant,
    popoverListHasOverflow,
    select.mounted,
    selectValue,
    setViewAllSelected,
    toggleViewAllSelectedOnPopoverUnmount,
  ]);
}
