import type { L } from 'ts-toolbelt';
import type { InputComponentProps } from 'components/Input';
import type { UseToggleViewAllSelectedOnUnmountProps } from 'components/Combobox/useToggleViewAllSelected';

type ComboboxOptions = L.List<unknown>;

export type RenderComboboxOptionFn<
  TOptions extends ComboboxOptions = ComboboxOptions,
  T extends TOptions[number] = TOptions[number]
> = (option: T) => React.ReactNode;

export interface ComboboxOptionGetters<TOptions extends ComboboxOptions> {
  getOptionLabel: (option: TOptions[number]) => string;
  getOptionValue?: (option: TOptions[number]) => unknown;
  renderOption?: RenderComboboxOptionFn<TOptions>;
}

export interface ComboboxBaseProps<TOptions extends ComboboxOptions = ComboboxOptions>
  extends InputComponentProps,
    ComboboxOptionGetters<TOptions> {
  options: TOptions;
  searchOptions?: TOptions;
  onLastOptionItemScrollReached?: () => void;
  searching?: boolean;
  onSearchDebounceDelay?: number;
  onSearch?: (search: string) => void;
  maxListHeight?: number;
  clearable?: boolean;
  clearRequiresConfirmation?: boolean;
  onClearValue?: () => void;
}

export interface SingleSelectComboboxProps<TOptions extends ComboboxOptions>
  extends ComboboxBaseProps<TOptions> {
  value?: TOptions[number];
  onValueChange?: (value: TOptions[number]) => void;
  isMultiSelect?: false;
  multiSelectVariant?: never;
  toggleViewAllSelectedOnPopoverUnmount?: never;
}

export type MultiSelectVariant = 'count' | 'tags';

export interface MultiSelectComboboxProps<TOptions extends ComboboxOptions>
  extends ComboboxBaseProps<TOptions> {
  isMultiSelect: true;
  value?: TOptions[number][];
  onValueChange?: (value: TOptions[number][]) => void;
  multiSelectVariant?: MultiSelectVariant;
  toggleViewAllSelectedOnPopoverUnmount?: UseToggleViewAllSelectedOnUnmountProps['toggleViewAllSelectedOnPopoverUnmount'];
}

export type ComboboxProps<TOptionType extends ComboboxOptions> =
  | SingleSelectComboboxProps<TOptionType>
  | MultiSelectComboboxProps<TOptionType>;

export type SelectOptionMap = Map<string, SelectOption>;

export type OptionValueMap = Map<string, SelectOption>;

export interface SelectOption {
  label: string;
  value: unknown;
  index: number;
  id: string;
  isSelected?: boolean;
  isSearchResultOption?: boolean;
}
