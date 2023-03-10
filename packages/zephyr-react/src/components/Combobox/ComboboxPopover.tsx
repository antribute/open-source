/* eslint-disable react/no-unused-prop-types */
import * as ComboboxPrimitive from 'ariakit/combobox';
import * as SelectPrimitive from 'ariakit/select';

import { BaseInput } from 'components/BaseInput';
import { classed } from '@tw-classed/react';
import { PaperElementBackground } from 'components/Paper/Paper.styles';

import { Button } from 'components/Button';

import { ComboboxList } from 'components/Combobox/ComboboxList';
import type { ComboboxProps, OptionValueMap, SelectOptionMap } from 'components/Combobox/Combobox';

const SelectPopoverElement = classed(
  SelectPrimitive.SelectPopover,
  PaperElementBackground,
  'p-0',
  'border-highlight',
  'bg-surface-soft',
  'shadow-lg',
  'z-50 flex flex-col rounded border border-solid pb-0.5 transform relative'
);

type ComboboxPopoverProps = {
  select: SelectPrimitive.SelectState;
  combobox: ComboboxPrimitive.ComboboxState;
  optionMap: SelectOptionMap;
  optionValueMap: OptionValueMap;
  viewAllSelected?: boolean;
  setViewAllSelected: React.Dispatch<React.SetStateAction<boolean>>;
} & Pick<ComboboxProps<unknown[]>, 'searching' | 'isMultiSelect'>;

export function ComboboxPopover<TOptions extends unknown[]>({
  searching,
  isMultiSelect,
  select,
  combobox,
  optionMap,
  optionValueMap,
  viewAllSelected,
  setViewAllSelected,
}: ComboboxPopoverProps) {
  return (
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
          // onLastOptionItemScrollReached={onLastOptionItemScrollReached}
          searching={searching}
        />
      )}

      <AllSelectedFilterButton
        select={select}
        viewAllSelected={viewAllSelected}
        setViewAllSelected={setViewAllSelected}
      />
    </SelectPopoverElement>
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
