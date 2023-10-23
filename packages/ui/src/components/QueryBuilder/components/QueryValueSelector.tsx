/* eslint-disable @typescript-eslint/unbound-method */
import {
  type VersatileSelectorProps,
  type OptionList,
  isOptionGroupArray,
} from 'react-querybuilder';
// import  { toOptions } from 'react-querybuilder';
import { Combobox, ComboboxProps } from 'components/Combobox';
import { generatePropPickerFn } from 'utils';
import { omit } from 'lodash-es';
import { getQueryBuilderOptionsList } from 'components/QueryBuilder/components/helpers';

type QueryValueSelectorComboboxProps = Omit<
  ComboboxProps<unknown[]>,
  | 'options'
  | 'value'
  | 'getOptionLabel'
  | 'onValueChange'
  | 'isMultiSelect'
  | 'renderOption'
  | 'getOptionValue'
>;

type QueryValueSelectorProps = VersatileSelectorProps & QueryValueSelectorComboboxProps;

const pickRQBValueSelectorProps = generatePropPickerFn<VersatileSelectorProps>({
  value: '_pick_',
  field: '_pick_',
  title: '_pick_',
  path: '_pick_',
  className: '_pick_',
  disabled: '_pick_',
  multiple: '_pick_',
  options: '_pick_',
  operator: '_pick_',
  rules: '_pick_',
  handleOnChange: '_pick_',
  level: '_pick_',
  context: '_pick_',
  validation: '_pick_',
  testID: '_pick_',
  schema: '_pick_',
  fieldData: '_pick_',
  listsAsArrays: '_pick_',
});

export const QueryValueSelector = (props: QueryValueSelectorProps) => {
  const { title, multiple, value, options, handleOnChange } = pickRQBValueSelectorProps(props);

  console.log('PROPS', props);
  const optionList = getQueryBuilderOptionsList(options);

  const comboboxProps = pickRQBValueSelectorProps.omit(props);

  const isFieldSelector = props.testID === 'fields';

  const fieldSelectorProps = isFieldSelector
    ? ({
        border: false,
        clearable: false,
        filled: false,
        shadow: false,
      } satisfies Partial<QueryValueSelectorComboboxProps>)
    : undefined;

  const common = {
    placeholder: title,
    clearable: false,
    ...fieldSelectorProps,

    ...(comboboxProps as object),
  } satisfies Partial<QueryValueSelectorComboboxProps>;

  if (multiple) {
    const multiValue = value ? value.split(',') : undefined;

    return (
      <Combobox
        // {...common}
        value={multiValue}
        isMultiSelect
        options={optionList.map((e) => e.label)}
        getOptionLabel={(e) => e}
        onValueChange={(e) => {
          handleOnChange(e.join(','));
        }}
      />
    );
  }

  return (
    <Combobox
      {...common}
      value={value}
      getOptionLabel={(e) => e}
      options={optionList.map((e) => e.label)}
      onValueChange={(e) => {
        handleOnChange(e);
      }}
    />
  );
};
