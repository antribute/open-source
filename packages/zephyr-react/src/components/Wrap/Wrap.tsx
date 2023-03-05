import React from 'react';
import { getByPath } from 'dot-path-value';
import { LiteralUnion } from 'type-fest';
import { findKey } from 'lodash-es';

type WrapFn = (children: React.ReactNode) => JSX.Element;

type ConditionMap = Record<string, boolean | undefined | null>;

type ConditionType = boolean | undefined | null | string | ConditionMap;

type WrapMatchMap<T extends string = string> = Partial<Record<LiteralUnion<T, string>, WrapFn>>;

type ConditionKey<T extends ConditionType> = T extends ConditionMap ? keyof T : T;

type ConditionMatcher<TCondition extends ConditionType> = TCondition extends string
  ? WrapFn | WrapMatchMap<TCondition>
  : WrapFn | WrapMatchMap;

interface WrapProps<
  TCondition extends ConditionType,
  TConditionKey extends ConditionKey<TCondition> = ConditionKey<TCondition>,
  TMatch extends ConditionMatcher<TConditionKey> = ConditionMatcher<TConditionKey>
> {
  if: TCondition;
  children?: React.ReactNode;
  wrap: TMatch;
  fallback?: WrapFn;
}

export function Wrap<TCondition extends ConditionType>({
  children,
  if: conditionProp,
  wrap: wrapper,
  fallback,
}: WrapProps<TCondition>) {
  const getCondition = () => {
    if (typeof conditionProp === 'object') {
      return findKey(conditionProp, (e) => Boolean(e));
    }
    return conditionProp;
  };

  const condition = getCondition();

  const getWrapperFn = (): WrapFn => {
    if (typeof wrapper === 'function') return wrapper;

    if (typeof wrapper === 'object' && typeof condition === 'string' && condition in wrapper) {
      return wrapper[condition as unknown as keyof typeof wrapper] as WrapFn;
    }

    return fallback ?? (((c?: React.ReactNode) => c) as WrapFn);
  };

  const wrapperFn = getWrapperFn();

  return Boolean(condition) ? wrapperFn(children) : <>{children}</>;
}
