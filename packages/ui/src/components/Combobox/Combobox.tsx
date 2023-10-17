import type { L } from 'ts-toolbelt';
import type { ComboboxState, SelectState } from 'ariakit';
import { Select, SelectArrow } from 'ariakit';
import type { InputComponentProps } from 'components/Input';
import { Input } from 'components/Input';
import { pickInputContainerProps } from 'components/Input/components';
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { ChevronIcon } from 'components/Icon/ChevronIcon';
import { twMerge } from 'tailwind-merge';
import { createCtx } from 'utils/createContext';
import { ComboboxSelectValue } from './ComboboxSelectValue';
import { ComboboxClearValueAction } from './ComboboxClearValueAction';
import { useCombobox } from './useCombobox';
import { ComboboxPopover } from './ComboboxPopover';
import type { ComboboxProps } from './Combobox.types';
import { ComboboxFooterButton } from './ComboboxFooter';

export const { Provider: ComboboxProvider, useContext: useComboboxContext } = createCtx<{
  combobox: ComboboxState;
  select: SelectState<string | string[]>;
}>();

function ComboboxComponent<TOptions extends L.List<unknown>>(
  props: ComboboxProps<TOptions> & { ref?: any },
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  const {
    select,
    selectedValue,
    selectedCount,
    hasSelected,
    combobox,
    selectOptionMap,
    viewAllSelected,
    setViewAllSelected,
  } = useCombobox<TOptions>(props);

  const {
    loading: loadingProp,
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
    renderSelectValue,
    fullWidth,
    width: widthProp,
    minWidth: minWidthProp,
    size = 'md',
    name,
    showSearchBox: showSearchBoxProp = true,
    chevronIcon = 'up-down',
    disableSelectAnimation,
    children,
  } = props;

  const showSearchBox = Boolean(props.searchOptions ?? props.onSearch ?? showSearchBoxProp);

  const loading = loadingProp || searching;

  const showClearValueAction = clearable && select.value.length > 0;

  const widthProps: Partial<InputComponentProps> =
    multiSelectVariant === 'tags'
      ? { width: widthProp ?? 'auto', minWidth: minWidthProp ?? 'lg' }
      : { width: undefined };

  return (
    <ComboboxProvider value={{ combobox, select }}>
      <Input.Container {...pickInputContainerProps(props)}>
        <Select
          state={select}
          toggleOnClick
          typeahead
          autoFocus
          ref={forwardedRef}
          name={name}
          {...widthProps}
        >
          {(selectProps) => {
            return (
              <Input.AddonGroup
                {...selectProps}
                fullWidth={fullWidth}
                size={size}
                defaultInputAddonProps={{ clickable: true }}
                {...props}
                className={twMerge('cursor-pointer select-none', props.className)}
                {...widthProps}
                renderInput={({ hasLeadingAddons, hasTrailingAddons }) => (
                  <Input.InputFieldContainer
                    hasLeadingAddons={hasLeadingAddons}
                    hasTrailingAddons={hasTrailingAddons}
                  >
                    {renderSelectValue ? (
                      renderSelectValue({
                        selected: selectedValue as any,
                        selectedCount,
                        hasSelected,
                        isDropdownOpen: select.open,
                      })
                    ) : (
                      <ComboboxSelectValue
                        multiSelectVariant={multiSelectVariant}
                        placeholder={placeholder}
                        value={select.value}
                        selectState={select}
                      />
                    )}
                  </Input.InputFieldContainer>
                )}
              >
                {children}
                {!loading && (
                  <Input.Addon grouping="inline" className="pr-8 cursor-pointer" focusInputOnClick>
                    <>
                      {showClearValueAction && (
                        <ComboboxClearValueAction
                          selectState={select}
                          className={clsx('absolute right-6 !p-0 pointer-events-none', {
                            'transition-opacity duration-300': !disableSelectAnimation,
                            'group-hover:pointer-events-auto': select.value.length,
                          })}
                          onClearValue={onClearValue}
                          clearAllRequiresConfirmation={clearRequiresConfirmation ?? isMultiSelect}
                        />
                      )}
                      {chevronIcon && (
                        <SelectArrow
                          state={select}
                          className={clsx('flex items-center justify-center', {
                            'transition-all duration-300 group-hover:delay-0 group-hover:-translate-x-8 delay-300':
                              !disableSelectAnimation && clearable && hasSelected,
                            'opacity-100 group-hover:opacity-0': showClearValueAction,
                          })}
                        >
                          <ChevronIcon />
                        </SelectArrow>
                      )}
                    </>
                  </Input.Addon>
                )}
              </Input.AddonGroup>
            );
          }}
        </Select>

        {select.mounted && (
          <ComboboxPopover
            combobox={combobox}
            comboboxChildren={children}
            select={select}
            showSearchBox={showSearchBox}
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
    </ComboboxProvider>
  );
}

const Combobox = forwardRef(ComboboxComponent) as unknown as typeof ComboboxComponent;

const _Combobbox = Object.assign(Combobox, {
  Addon: Input.Addon,
  FooterButton: ComboboxFooterButton,
});

export { _Combobbox as Combobox };
