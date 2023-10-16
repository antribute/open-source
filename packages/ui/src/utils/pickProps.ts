import { get, omit, pick } from 'lodash-es';
import type { O } from 'ts-toolbelt';
import type { LiteralUnion } from 'type-fest';
import type { IsUnion } from 'types/typeUtilities';
import { isDevelopment } from 'utils/environment-utils';
import { objectMap } from 'utils/objectMap';

export function generatePropPickerFn<T extends object>(
  pickedRecord: Partial<Record<keyof T, '_pick_'>>
) {
  const pickedKeys = Object.keys(pickedRecord) as (keyof T)[];

  const pickerFn = <TProps extends object & T, TDefaultProps extends Partial<T>>(
    props: TProps,
    options?: { defaultProps?: TDefaultProps }
  ) => {
    const { defaultProps } = options ?? {};
    return { ...defaultProps, ...pick(props, pickedKeys) } as O.Merge<T, TDefaultProps>;
  };

  pickerFn.pickedKeys = pickedKeys;

  pickerFn.pickedRecord = pickedRecord;

  pickerFn.omit = <const TProps extends object>(props: TProps) =>
    omit(props, pickedKeys) as Omit<TProps, keyof T>;

  return pickerFn;
}

/** A special string that indicates the property should be picked without a default value */
const NO_DEFAULT_VALUE = '_pick_' as const;

/**
 * Picks specified properties from the given `props` object and optionally sets their default values in a type-safe manner.
 *
 * @param {T} props The object containing the properties to pick.
 * @param {TPicked} pickedProps An object specifying which properties to pick and their default values. To pick a property without a default value, use the special '_pick_' string.
 *
 * @returns {TResult} An object containing the picked properties with their values or default values.
 * 
 * @example
 * ${comment}
```tsx
import { BaseComponentProps, Component1Props, Component2Props, Component3Props} from './types'

type ComponentProps = BaseComponentProps & Component1Props & Component2Props & Component3Props;

const MycComponent = (props: ComponentProps) => {
  const { prop1, prop2, prop3 } = pickProps(props, {
    prop1: 'a',
    prop2: 'default value',
    prop3: '_pick_',
  });
  // Type: { prop1: "a" | "b" | "c"; prop2: string; prop3: string | undefined; }

  const component1Props = pickProps<Component1Props>(props, { a: 'A', b: 'B', c: 'C' });
  // Type: { a?: string | undefined; b?: string | undefined; c?: string | undefined; }

  const component2Props = pickProps<Component2Props>(props, {
    one: '_pick_',
    two: '_pick_',
    three: '_pick_',
  });
  // Type: { one?: number | undefined; two?: number | undefined; three?: number | undefined; }

  const component3Props = pickProps(props, { foo: 'FOO', baz: '_pick_', biz: '_pick_' });
  // Type: { foo: string; baz: string | undefined; biz: { e: string; f: string; g: string; }; }

  return (
    <div>
      <Component1Props {...component1Props} />
      <Component2Props {...component2Props} />
      <Component3Props {...component3Props} />
    </div>
  );
};

// types.ts

interface Component1Props {
  a: string;
  b: string;
  c: string;
}

interface Component2Props {
  one: number;
  two: number;
  three: number;
}

interface Component3Props {
  foo?: string;
  baz?: string;
  biz: { e: string; f: string; g: string };
}

type BaseComponentProps = {
  prop1?: 'a' | 'b' | 'c';
  prop2?: string;
  prop3?: string;
};

```
 */
export function pickProps<
  const TProps extends Record<any, any>,
  TPicked extends { [K in keyof TProps]?: ExtractProp<TProps[K]> } = {
    [K in keyof TProps]?: ExtractProp<TProps[K]>;
  }
>(props: TProps, pickedProps: TPicked, options?: { shouldValidatePickProp?: boolean }) {
  type TResult = O.Writable<{
    [K in keyof TPicked]: TPicked[K] extends typeof NO_DEFAULT_VALUE
      ? TProps[K]
      : Extract<TProps[K], NonNullable<TProps[K]>>;
  }>;

  const { shouldValidatePickProp = true } = options ?? {};

  const entries = Object.entries(pickedProps).map(([path, defaultValue]) => {
    const prop = get(props, path);

    if (defaultValue === NO_DEFAULT_VALUE) {
      return [path, prop];
    }
    if (shouldValidatePickProp) {
      validatePickProp(defaultValue, pickedProps);
    }
    return [path, prop ?? defaultValue];
  });

  return Object.fromEntries(entries) as TResult;
}

/**
 *
 *  Used to catch cases where a typo was possibly made when using `_pick_` as a value in `pickProps`
 *
 */
function validatePickProp(input: unknown, pickedProps: object) {
  if (isDevelopment()) {
    const startsWith = ['_p', 'pick'];

    const isLikelyTypo =
      typeof input === 'string' && startsWith.some((typo) => input.startsWith(typo));

    if (isLikelyTypo) {
      const functionName = '`pickProps`';

      throw new Error(`
      Error thrown from ${functionName}
      
      A possible typo was detected in the arguments passed to the ${functionName} function.

      Expected value: "${NO_DEFAULT_VALUE}"

      Received value: "${input}" ❌

      ${JSON.stringify(
        objectMap(pickedProps, ({ key, value }) => [
          key,
          value === input ? `${value as string} ❌` : value,
        ]),
        null,
        2
      )}
 
      If this is intended, add \`shouldValidatePickProp: true\` to the options.

      Note: This error is thrown only during development.

      `);
    }
  }
}

type ExtractProp<T> = T extends object
  ? T | typeof NO_DEFAULT_VALUE
  : NonNullable<T> extends string
  ? IsUnion<T, string> extends true
    ? LiteralUnion<typeof NO_DEFAULT_VALUE | NonNullable<T>, string>
    : LiteralUnion<typeof NO_DEFAULT_VALUE, string>
  : typeof NO_DEFAULT_VALUE | T;
