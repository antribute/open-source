import { Button } from 'components/Button';
import type { ButtonProps } from 'components/Button';
import { omit } from 'lodash-es';
import { ComponentPropsWithoutRef } from 'react';
import { generatePropPickerFn } from 'utils';
import type { CombinatorSelectorProps as RQBCombinatorSelectorProps } from 'react-querybuilder';
import { ToggleGroup, ToggleGroupProps } from 'components/ToggleGroup';
import { getQueryBuilderOptionsList } from 'components/QueryBuilder/components/helpers';
import { Input } from 'components/Input';

type QueryActionProps = RQBCombinatorSelectorProps & Omit<ToggleGroupProps, 'items'>;

const pickRQBCombinatorSelectorProps = generatePropPickerFn<RQBCombinatorSelectorProps>({
  rules: '_pick_',
  options: '_pick_',
  value: '_pick_',
  handleOnChange: '_pick_',
  className: '_pick_',
  path: '_pick_',
  level: '_pick_',
  title: '_pick_',
  disabled: '_pick_',
  context: '_pick_',
  validation: '_pick_',
  testID: '_pick_',
  schema: '_pick_',
});

export const QueryCombinatorSelector = (props: QueryActionProps) => {
  const rqbActionProps = pickRQBCombinatorSelectorProps(props);

  const { options, disabled } = rqbActionProps;

  const optionsList = getQueryBuilderOptionsList(options);
  const toggleGroupProps = omit(props, pickRQBCombinatorSelectorProps.pickedKeys);

  console.log('COMB', props);

  const path = props.path[props.level - 1];

  const showSelector = path && path > 1;

  return showSelector ? (
    <Input.Container>
      <ToggleGroup
        size="sm"
        items={optionsList.map((e) => ({ label: e.label, value: e.name }))}
        disabled={disabled}
        fullWidth
        className="max-w-96"
        variant="outlined"
        {...toggleGroupProps}
      />
    </Input.Container>
  ) : null;
};

QueryCombinatorSelector.displayName = 'QueryCombinatorSelector';
