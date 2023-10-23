import './react-querybuilder.css';
import { queryBuilderComponents } from 'components/QueryBuilder/components';
import { merge } from 'lodash-es';
import type {
  QueryBuilderProps,
  RuleGroupType as QueryBuilderRuleGroupType,
  RuleGroupTypeIC as QueryBuilderRuleGroupTypeIC,
  Field as QueryBuilderField,
  Option as QueryBuilderOption,
  Operator as QueryBuilderOperator,
} from 'react-querybuilder';

import {
  QueryBuilder as RQBQueryBuilder,
  getCompatContextProvider as getRQBCompatContextProvider,
} from 'react-querybuilder';

export {
  QueryBuilderRuleGroupType,
  QueryBuilderRuleGroupTypeIC,
  QueryBuilderField,
  QueryBuilderOption,
  QueryBuilderOperator,
  QueryBuilderProps,
};

type QueryBuilderRuleGroupVariant = QueryBuilderRuleGroupType | QueryBuilderRuleGroupTypeIC;

const defaultProps = {
  autoSelectField: true,
  resetOnFieldChange: true,
  enableMountQueryChange: false,
  // addRuleToNewGroups: false,

  // showCombinatorsBetweenRules: true,
  autoSelectOperator: true,
  enableDragAndDrop: true,
  translations: {
    addRule: { label: '+ Add Conditon', title: 'Add Condition' },
  },
} satisfies Partial<QueryBuilderProps<QueryBuilderRuleGroupVariant>>;

export const QueryBuilderProvider = getRQBCompatContextProvider({
  key: 'antribute-query-builder',
  controlElements: queryBuilderComponents,
});

const getQueryBuilderProps = <T extends QueryBuilderProps<QueryBuilderRuleGroupVariant>>(
  props: T
) => merge({}, defaultProps, props);

export const QueryBuilder = <TRuleGroupType extends QueryBuilderRuleGroupVariant>(
  props: QueryBuilderProps<TRuleGroupType>
) => {
  return <RQBQueryBuilder {...getQueryBuilderProps(props)} />;
};
