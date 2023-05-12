/* eslint-disable react/no-unused-prop-types */
import * as ComboboxPrimitive from 'ariakit/combobox';
import * as SelectPrimitive from 'ariakit/select';
import { Button, ButtonProps } from 'components/Button';
import { RefObject } from 'react';
import { elementHasOverflowY } from 'utils/elementHasOverflow';
import { MultiSelectVariant } from './Combobox.types';

export interface ComboboxFooterProps {
  optionsCount: number;
  select: SelectPrimitive.SelectState;
  combobox: ComboboxPrimitive.ComboboxState;
  viewAllSelected?: boolean;
  scrollElementRef?: RefObject<HTMLDivElement>;
  hasSearchableOptions?: boolean;
  setViewAllSelected: React.Dispatch<React.SetStateAction<boolean>>;
  multiSelectVariant?: MultiSelectVariant;
}

export const ComboboxFooter = ({
  select,
  viewAllSelected,
  setViewAllSelected,
  combobox,
  hasSearchableOptions,
  scrollElementRef,
  optionsCount,
  multiSelectVariant,
}: ComboboxFooterProps) => {
  const { value } = select;

  const isMultiSelect = Array.isArray(value);

  function getSelectedValueCount() {
    if (Array.isArray(value)) {
      return value.length;
    }

    return value ? 1 : 0;
  }

  const popoverListHasOverflow = elementHasOverflowY(scrollElementRef?.current);
  const selectedValueCount = getSelectedValueCount();

  const showViewAllSelectedButton =
    popoverListHasOverflow && isMultiSelect && selectedValueCount > 0 && !viewAllSelected;

  const showViewAllOptionsButton =
    viewAllSelected &&
    !showViewAllSelectedButton &&
    isMultiSelect &&
    optionsCount > 0 &&
    selectedValueCount !== optionsCount;

  const show =
    multiSelectVariant !== 'tags' && (showViewAllSelectedButton || showViewAllOptionsButton);

  return show ? (
    <div className="p-6 w-full animate-slide-up">
      {showViewAllSelectedButton && (
        <PopoverListButton
          onClick={() => {
            combobox.setValue('');
            setViewAllSelected(true);
          }}
        >
          View All Selected
        </PopoverListButton>
      )}

      {showViewAllOptionsButton && (
        <PopoverListButton
          onClick={() => {
            combobox.setValue('');
            setViewAllSelected(false);
          }}
        >
          View All Options {!hasSearchableOptions && <>({optionsCount})</>}
        </PopoverListButton>
      )}
    </div>
  ) : null;
};

const PopoverListButton = (props: ButtonProps) => {
  return (
    <Button
      fullWidth
      size="xs"
      variant="glass"
      color="secondary"
      className="text-content-weak"
      {...props}
    />
  );
};
