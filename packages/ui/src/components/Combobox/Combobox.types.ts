import type { L } from 'ts-toolbelt';
import type { InputComponentProps } from 'components/Input';
import type { UseToggleViewAllSelectedOnUnmountProps } from 'components/Combobox/useToggleViewAllSelected';
import { ChevronIconVariant } from 'components/Icon/ChevronIcon';

type ComboboxOptions = L.List<unknown>;

export type RenderComboboxOptionFn<
  TOptions extends ComboboxOptions = ComboboxOptions,
  T extends TOptions[number] = TOptions[number]
> = (option: T) => React.ReactNode;

type RenderSelectValueFn<
  TSelected,
  TParams extends Record<string, unknown> = Record<string, unknown>
> = (
  params: {
    selected: TSelected;
    hasSelected: boolean;
    selectedCount: number;
    isDropdownOpen: boolean;
  } & TParams
) => React.ReactNode;

export interface ComboboxOptionGetters<TOptions extends ComboboxOptions> {
  getOptionLabel: (option: TOptions[number]) => string;
  getOptionValue?: (option: TOptions[number]) => unknown;
  renderOption?: RenderComboboxOptionFn<TOptions>;
}

export interface ComboboxBaseProps<TOptions extends ComboboxOptions = ComboboxOptions>
  extends InputComponentProps,
    ComboboxOptionGetters<TOptions> {
  name?: string;
  className?: string;
  options: TOptions;
  showSearchBox?: boolean;
  searchOptions?: TOptions;
  onLastOptionItemScrollReached?: () => void;
  searching?: boolean;
  onSearchDebounceDelay?: number;
  onSearch?: (search: string) => void;
  maxListHeight?: number;
  clearable?: boolean;
  clearRequiresConfirmation?: boolean;
  onClearValue?: () => void;
  chevronIcon?: ChevronIconVariant | false;
  /** For rendering combobox input addons */
  children?: React.ReactNode;
  disableSelectAnimation?: boolean;
  flip?: boolean;
}

export interface SingleSelectComboboxProps<TOptions extends ComboboxOptions>
  extends ComboboxBaseProps<TOptions> {
  value?: TOptions[number];
  isMultiSelect?: false;
  multiSelectVariant?: never;
  toggleViewAllSelectedOnPopoverUnmount?: never;
  onValueChange?: (value: TOptions[number]) => void;
  renderSelectValue?: RenderSelectValueFn<TOptions[number] | undefined>;
}

export type MultiSelectVariant = 'count' | 'tags';

export interface MultiSelectComboboxProps<TOptions extends ComboboxOptions>
  extends ComboboxBaseProps<TOptions> {
  isMultiSelect: true;
  value?: TOptions[number][];
  multiSelectVariant?: MultiSelectVariant;
  toggleViewAllSelectedOnPopoverUnmount?: UseToggleViewAllSelectedOnUnmountProps['toggleViewAllSelectedOnPopoverUnmount'];
  onValueChange?: (value: TOptions[number][]) => void;

  renderSelectValue?: RenderSelectValueFn<TOptions[number][]>;
}

export type ComboboxProps<TOptionType extends ComboboxOptions> =
  | SingleSelectComboboxProps<TOptionType>
  | MultiSelectComboboxProps<TOptionType>;

export type SelectOptionMap<T = unknown> = Map<string, SelectOption<T>>;

export type OptionValueMap<T = unknown> = Map<string, SelectOption<T>>;

export interface SelectOption<T = unknown> {
  label: string;
  value: T;
  index: number;
  id: string;
  isSelected?: boolean;
  isSearchResultOption?: boolean;
}
