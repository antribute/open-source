/* eslint-disable react/no-unused-prop-types */
import * as ComboboxPrimitive from 'ariakit/combobox';
import * as SelectPrimitive from 'ariakit/select';

import { BaseInput } from 'components/BaseInput';
import { classed } from '@tw-classed/react';
import { PaperElementBackground } from 'components/Paper/Paper.styles';

import { Button } from 'components/Button';

import { ComboboxList } from 'components/Combobox/ComboboxList';
import type { ComboboxProps, SelectOptionMap } from 'components/Combobox/Combobox';
import { getNearestColorSchemeAttribute } from 'utils/getNearestColorSchemeAttribute';

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
  selectOptionMap: SelectOptionMap;
  viewAllSelected?: boolean;
  setViewAllSelected: React.Dispatch<React.SetStateAction<boolean>>;
} & Pick<ComboboxProps<unknown[]>, 'searching' | 'isMultiSelect'>;

export function ComboboxPopover({
  searching,
  isMultiSelect,
  select,
  combobox,
  selectOptionMap,
  viewAllSelected,
  setViewAllSelected,
}: ComboboxPopoverProps) {
  return (
    <SelectPopoverElement
      state={select}
      composite={false}
      data-color-scheme={getNearestColorSchemeAttribute(select.selectRef.current)}
      portal
    >
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
          selectOptionMap={selectOptionMap}
          isMultiSelect={Boolean(isMultiSelect)}
          viewAllSelected={viewAllSelected}
          searching={searching}
        />
      )}

      <AllSelectedFilterButton
        select={select}
        combobox={combobox}
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
  combobox,
}: {
  select: SelectPrimitive.SelectState;
  combobox: ComboboxPrimitive.ComboboxState;
  viewAllSelected?: boolean;
  setViewAllSelected: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { value } = select;

  const show = Array.isArray(value) && value.length > 0 && !viewAllSelected;

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
          combobox.setValue('');
          setViewAllSelected((prev) => !prev);
        }}
      >
        View All Selected
      </Button>
    </div>
  ) : null;
};
