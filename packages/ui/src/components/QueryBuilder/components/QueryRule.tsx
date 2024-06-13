import { generatePropPickerFn } from 'utils';
import { ToggleGroupProps } from 'components/ToggleGroup';
import {
  useRule,
  type RuleProps as RQBRuleProps,
  RuleComponents,
  useStopEventPropagation,
  TestID,
} from 'react-querybuilder';

type QueryRuleProps = RQBRuleProps & Omit<ToggleGroupProps, 'items'>;

const pickRQBRuleProps = generatePropPickerFn<RQBRuleProps>({
  isDragging: '_pick_',
  dragMonitorId: '_pick_',
  isOver: '_pick_',
  dropMonitorId: '_pick_',
  dragRef: '_pick_',
  dndRef: '_pick_',
  dropEffect: '_pick_',
  rule: '_pick_',
  field: '_pick_',
  operator: '_pick_',
  value: '_pick_',
  valueSource: '_pick_',
  id: '_pick_',
  path: '_pick_',
  parentDisabled: '_pick_',
  translations: '_pick_',
  schema: '_pick_',
  actions: '_pick_',
  disabled: '_pick_',
  context: '_pick_',
});

export const QueryRule = (props: QueryRuleProps) => {
  const rqbRuleProps = pickRQBRuleProps(props);

  const ruleProps = { ...rqbRuleProps, ...useRule(rqbRuleProps) };

  const {
    cloneRule,
    toggleLockRule,
    removeRule,
    dragMonitorId,
    dropMonitorId,
    dndRef,
    outerClassName,
    id,
    path,
  } = ruleProps;

  const subComponentProps = {
    ...ruleProps,
    ...useStopEventPropagation({ cloneRule, toggleLockRule, removeRule }),
  };

  const { schema } = subComponentProps;

  const { dragHandle: DragHandle } = schema.controls;

  return (
    <div
      ref={dndRef}
      data-testid={TestID.rule}
      data-dragmonitorid={dragMonitorId}
      data-dropmonitorid={dropMonitorId}
      className={outerClassName}
      data-rule-id={id}
      data-level={path.length}
      data-path={JSON.stringify(path)}
    >
      <RuleComponents {...subComponentProps} />
    </div>
  );
};

QueryRule.displayName = 'QueryRule';
