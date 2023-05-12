/* eslint-disable react/no-unused-prop-types */
import { L } from 'ts-toolbelt';
import { Select, SelectArrow } from 'ariakit';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Input } from 'components/Input';
import { pickInputContainerProps } from 'components/Input/components';
import { ComboboxSelectValue } from './ComboboxSelectValue';
import { ComboboxClearValueAction } from './ComboboxClearValueAction';
import { useCombobox } from './useCombobox';
import { ComboboxPopover } from './ComboboxPopover';
import { ComboboxProps } from './Combobox.types';

export function Combobox<TOptions extends L.List<unknown>>(props: ComboboxProps<TOptions>) {
  const { select, combobox, hasSelected, selectOptionMap, viewAllSelected, setViewAllSelected } =
    useCombobox<TOptions>(props);

  const {
    loading,
    isMultiSelect,
    multiSelectVariant,
    maxListHeight,
    placeholder = 'Select...',
    toggleViewAllSelectedOnPopoverUnmount,
    clearable = true,
    clearRequiresConfirmation,
    onClearValue,
    searching,
    onSearch,
    renderOption,
    fullWidth,
    autoWidth,
    size,
  } = props;

  const showClearValueAction = clearable && select.value.length > 0;

  return (
    <Input.Container {...pickInputContainerProps(props)}>
      <Select state={select} toggleOnClick typeahead autoFocus>
        {(props) => {
          return (
            <Input.AddonGroup
              {...props}
              fullWidth={fullWidth}
              autoWidth={autoWidth}
              size={size}
              renderInput={({ hasLeadingAddons, hasTrailingAddons }) => (
                <Input.InputFieldContainer
                  hasLeadingAddons={hasLeadingAddons}
                  hasTrailingAddons={hasTrailingAddons}
                >
                  <ComboboxSelectValue
                    multiSelectVariant={multiSelectVariant}
                    placeholder={placeholder ?? 'Select...'}
                    value={select.value}
                    selectState={select}
                  />
                </Input.InputFieldContainer>
              )}
            >
              <Input.Addon
                grouping="inline"
                invisible={!showClearValueAction}
                focusInputOnClick={false}
              >
                <ComboboxClearValueAction
                  selectState={select}
                  onClearValue={onClearValue}
                  clearAllRequiresConfirmation={clearRequiresConfirmation ?? isMultiSelect}
                />
              </Input.Addon>

              <Input.Addon invisible={loading} grouping="inline">
                <SelectArrow state={select} className="flex items-center justify-center">
                  <ChevronDownIcon className=" h-22 w-22 absolute text-boundary-moderate/60" />
                </SelectArrow>
              </Input.Addon>
            </Input.AddonGroup>
          );
        }}
      </Select>

      {select.mounted && (
        <ComboboxPopover
          combobox={combobox}
          select={select}
          selectOptionMap={selectOptionMap}
          hasSelected={hasSelected}
          isMultiSelect={Boolean(isMultiSelect)}
          searching={searching}
          hasSearchableOptions={Boolean(onSearch)}
          viewAllSelected={viewAllSelected}
          setViewAllSelected={setViewAllSelected}
          maxHeight={maxListHeight}
          multiSelectVariant={multiSelectVariant}
          renderOption={renderOption}
          toggleViewAllSelectedOnPopoverUnmount={toggleViewAllSelectedOnPopoverUnmount}
        />
      )}
    </Input.Container>
  );
}
