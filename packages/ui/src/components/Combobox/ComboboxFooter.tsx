import type * as ComboboxPrimitive from 'ariakit/combobox';
import type * as SelectPrimitive from 'ariakit/select';
import type { ButtonProps } from 'components/Button';
import { Button } from 'components/Button';
import type { RefObject } from 'react';
import React from 'react';
import { elementHasOverflowY } from 'utils/elementHasOverflow';
import getDisplayName from 'utils/getDisplayName';
import { useComboboxContext } from 'components/Combobox/Combobox';
import type { MultiSelectVariant } from './Combobox.types';

export interface ComboboxFooterProps {
  optionsCount: number;
  select: SelectPrimitive.SelectState;
  combobox: ComboboxPrimitive.ComboboxState;
  viewAllSelected?: boolean;
  scrollElementRef?: RefObject<HTMLDivElement>;
  hasSearchableOptions?: boolean;
  setViewAllSelected: React.Dispatch<React.SetStateAction<boolean>>;
  multiSelectVariant?: MultiSelectVariant;
  comboboxChildren?: React.ReactNode;
}

export const ComboboxFooterButton = ({
  onClick,
  closePopoverOnClick = true,
  ...props
}: ButtonProps & {
  closePopoverOnClick?: boolean;
}) => {
  const { combobox } = useComboboxContext();
  return (
    <Button
      fullWidth
      size="xs"
      variant="glass"
      color="secondary"
      className="text-content-weak"
      onClick={(e) => {
        if (closePopoverOnClick) {
          combobox.hide();
        }

        onClick?.(e);
      }}
      {...props}
    />
  );
};

ComboboxFooterButton.displayName = 'ComboboxFooterButton';

export const ComboboxFooter = ({
  select,
  viewAllSelected,
  setViewAllSelected,
  combobox,
  hasSearchableOptions,
  scrollElementRef,
  optionsCount,
  multiSelectVariant,
  comboboxChildren,
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

  const footerChildren = React.Children.toArray(comboboxChildren).filter((node) => {
    return getDisplayName(node) === 'ComboboxFooterButton';
  });

  const showViewAllSelectedButtons =
    multiSelectVariant !== 'tags' && (showViewAllSelectedButton || showViewAllOptionsButton);

  const showFooter = footerChildren.length > 0 || showViewAllSelectedButtons;

  return showFooter ? (
    <div className="w-full animate-slide-up p-6 divide-y divide-highlight space-y-8">
      {footerChildren}

      {showViewAllSelectedButton && (
        <ComboboxFooterButton
          onClick={() => {
            combobox.setValue('');
            setViewAllSelected(true);
          }}
        >
          View All Selected
        </ComboboxFooterButton>
      )}

      {showViewAllOptionsButton && (
        <ComboboxFooterButton
          onClick={() => {
            combobox.setValue('');
            setViewAllSelected(false);
          }}
        >
          View All Options {!hasSearchableOptions && <>({optionsCount})</>}
        </ComboboxFooterButton>
      )}
    </div>
  ) : null;
};
