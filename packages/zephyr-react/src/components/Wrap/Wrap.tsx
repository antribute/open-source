import React from 'react';
import { findKey } from 'lodash-es';

export type WrapProps<TCondition> = SingleConditionWrapProps | MultiConditionWrap<TCondition>;

interface BaseWrapProps {
  children: React.ReactNode;
  fallback?: ConditionWrapRenderFn;
}

interface SingleConditionWrapProps extends BaseWrapProps {
  if: unknown;
  wrap: ConditionWrapRenderFn;
}

interface MultiConditionWrap<TCondition> extends BaseWrapProps {
  if: TCondition;
  wrap: Partial<MultiConditionWrapMap<TCondition>>;
}

type MultiConditionWrapMap<
  TCondition,
  T extends NonNullable<TCondition> = NonNullable<TCondition>
> = Record<
  T extends Record<string, unknown> ? keyof T : Extract<TCondition, string>,
  ConditionWrapRenderFn
>;

export type ConditionWrapRenderFn = (children: React.ReactNode) => JSX.Element;

export function Wrap<const TCondition>({
  children,
  if: conditionProp,
  wrap: wrapper,
  fallback,
}: WrapProps<TCondition>) {
  const fallbackWrapperFn: ConditionWrapRenderFn = fallback ?? ((c?: React.ReactNode) => <>{c}</>);

  if (!Boolean(conditionProp)) return fallbackWrapperFn(children);

  const getCondition = () => {
    if (typeof conditionProp === 'object') {
      return findKey(conditionProp, (e) => Boolean(e));
    }
    return conditionProp;
  };

  const condition = getCondition();

  const getWrapperFn = (): ConditionWrapRenderFn => {
    if (typeof wrapper === 'function') return wrapper;

    if (typeof wrapper === 'object' && typeof condition === 'string' && condition in wrapper) {
      return wrapper[condition as unknown as keyof typeof wrapper]!;
    }

    return fallbackWrapperFn;
  };

  const wrapperFn = getWrapperFn();

  if (typeof condition === 'boolean') {
    return Boolean(condition) ? wrapperFn(children) : <>{children}</>;
  }

  return wrapperFn(children);
}
