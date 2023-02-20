/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-types */

import { get } from 'lodash-es';
import * as React from 'react';
import { ForwardRef, Memo, isElement } from 'react-is';
import { isReactComponent, isReactNode } from 'utils/component-is-utils';

const fnNameMatchRegex = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
export function getFunctionName(fn: Function): string {
  const match = `${fn}`.match(fnNameMatchRegex);
  const name = match && match[1];
  return name || '';
}

function getFunctionComponentName(
  Component: React.FunctionComponent | React.ComponentClass,
  fallback = ''
) {
  return Component.displayName || Component.name || getFunctionName(Component) || fallback;
}

function getWrappedName(outerType: any, innerType: any, wrapperName: string) {
  const functionName = getFunctionComponentName(innerType);
  return (
    outerType.displayName || (functionName !== '' ? `${wrapperName}(${functionName})` : wrapperName)
  );
}

export default function getDisplayName(component: unknown): string | undefined {
  // if (!isElement(component)) {
  //   return undefined;
  // }

  if (component == null) {
    return undefined;
  }

  if (typeof component === 'string') {
    return component;
  }

  const displayName = get(component, 'type.displayName');

  if (displayName) {
    return displayName;
  }

  if (typeof component === 'function') {
    return getFunctionComponentName(component as never, 'Component');
  }

  // TypeScript can't have components as objects but they exist in the form of `memo` or `Suspense`
  if (typeof component === 'object') {
    switch ((component as any).$$typeof) {
      case ForwardRef:
        return getWrappedName(component, (component as any).render, 'ForwardRef');
      case Memo:
        return getWrappedName(component, (component as any).type, 'memo');
      default:
        return undefined;
    }
  }

  return undefined;
}
