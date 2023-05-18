/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unused-prop-types */
import { L } from 'ts-toolbelt';
import { Select, SelectArrow } from 'ariakit';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Input, InputComponentProps } from 'components/Input';
import { pickInputContainerProps } from 'components/Input/components';
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { ComboboxSelectValue } from './ComboboxSelectValue';
import { ComboboxClearValueAction } from './ComboboxClearValueAction';
import { useCombobox } from './useCombobox';
import { ComboboxPopover } from './ComboboxPopover';
import { ComboboxProps } from './Combobox.types';

export function ComboboxComponent<TOptions extends L.List<unknown>>(
  props: ComboboxProps<TOptions> & { ref?: any },
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
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
    width: widthProp,
    minWidth: minWidthProp,
    size = 'md',
    name,
  } = props;

  const showClearValueAction = clearable && select.value.length > 0;

  const widthProps: Partial<InputComponentProps> =
    multiSelectVariant === 'tags'
      ? { width: widthProp ?? 'auto', minWidth: minWidthProp ?? 'lg' }
      : { width: undefined };

  return (
    <Input.Container {...pickInputContainerProps(props)}>
      <Select
        state={select}
        toggleOnClick
        typeahead
        autoFocus
        ref={forwardedRef}
        name={name}
        className="cursor-pointer"
        {...widthProps}
      >
        {(props) => {
          return (
            <Input.AddonGroup
              {...props}
              fullWidth={fullWidth}
              size={size}
              {...widthProps}
              renderInput={({ hasLeadingAddons, hasTrailingAddons }) => (
                <Input.InputFieldContainer
                  hasLeadingAddons={hasLeadingAddons}
                  hasTrailingAddons={hasTrailingAddons}
                >
                  <ComboboxSelectValue
                    multiSelectVariant={multiSelectVariant}
                    placeholder={placeholder}
                    value={select.value}
                    selectState={select}
                  />
                </Input.InputFieldContainer>
              )}
            >
              <Input.Addon invisible={loading} grouping="inline" className="pr-6 cursor-pointer">
                <>
                  {showClearValueAction && (
                    <ComboboxClearValueAction
                      selectState={select}
                      className={clsx(
                        'absolute right-6 !pacity-0 pointer-events-none transition-opacity duration-300',
                        {
                          'group-hover:pointer-events-auto group-': select.value.length,
                        }
                      )}
                      onClearValue={onClearValue}
                      clearAllRequiresConfirmation={clearRequiresConfirmation ?? isMultiSelect}
                    />
                  )}
                  <SelectArrow
                    state={select}
                    className={clsx('flex items-center justify-center', {
                      'opacity-100 group-hover:opacity-0 transition-all duration-300 group-hover:delay-0 group-hover:-translate-x-8  delay-300':
                        showClearValueAction,
                    })}
                  >
                    <ChevronDownIcon className=" h-22 w-22 absolute text-boundary-moderate/60" />
                  </SelectArrow>
                </>
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

// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
const Combobox = forwardRef(ComboboxComponent) as unknown as typeof ComboboxComponent;

export { Combobox };
