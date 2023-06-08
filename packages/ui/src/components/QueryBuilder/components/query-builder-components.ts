import type { Controls } from 'react-querybuilder';
import { QueryValueEditor } from 'components/QueryBuilder/components/QueryValueEditor';
import { QueryRule } from 'components/QueryBuilder/components/QueryRule';
import { QueryAction } from './QueryAction';
import { QueryValueSelector } from './QueryValueSelector';
import { QueryCombinatorSelector } from './QueryCombinatorSelector';
import { QueryDragHandle } from './QueryDragHandle';

// export { QueryAction, QueryValueSelector };

export const queryBuilderComponents = {
  addGroupAction: QueryAction,
  addRuleAction: QueryAction,
  cloneGroupAction: QueryAction,
  cloneRuleAction: QueryAction,
  combinatorSelector: QueryCombinatorSelector,
  dragHandle: QueryDragHandle,
  fieldSelector: QueryValueSelector,
  // notToggle: ChakraNotToggle,
  operatorSelector: QueryValueSelector,
  lockRuleAction: QueryAction,
  lockGroupAction: QueryAction,
  removeGroupAction: QueryAction,
  removeRuleAction: QueryAction,
  valueEditor: QueryValueEditor,
  valueSourceSelector: QueryValueSelector,
  rule: QueryRule,
} satisfies Partial<Controls>;
