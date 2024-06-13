import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { ComponentPropsWithoutRef } from 'react';
import type { ActionWithRulesProps as RQBActionWithRulesProps } from 'react-querybuilder';
import { generatePropPickerFn } from 'utils';

type QueryActionProps = RQBActionWithRulesProps & ComponentPropsWithoutRef<typeof Button>;

const pickRQBActionProps = generatePropPickerFn<RQBActionWithRulesProps>({
  rules: '_pick_',
  label: '_pick_',
  handleOnClick: '_pick_',
  disabledTranslation: '_pick_',
  ruleOrGroup: '_pick_',
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

export const QueryAction = (props: QueryActionProps) => {
  const rqbActionProps = pickRQBActionProps(props);

  const { disabled } = rqbActionProps;

  const { label, title } = getQueryActionText(rqbActionProps);

  const { onClick, ...componentProps } = pickRQBActionProps.omit(props);

  return (
    <Input.Container>
      <Button
        title={title}
        onClick={(e) => {
          props.handleOnClick(e);
          onClick?.(e);
        }}
        disabled={disabled}
        {...componentProps}
      >
        {label}
      </Button>
    </Input.Container>
  );
};

QueryAction.displayName = 'QueryAction';

function getQueryActionText({ disabledTranslation, disabled, label }: RQBActionWithRulesProps) {
  if (disabled && disabledTranslation) {
    return disabledTranslation;
  }

  return { label };
}
