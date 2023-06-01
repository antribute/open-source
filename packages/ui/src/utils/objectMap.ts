import { getByPath } from 'utils/getByPath';
import { notEmpty } from 'utils/notEmpty';
import type { Path, PathValue, SearchableObject } from '@clickbar/dot-diver';

type ObjectKey<T extends SearchableObject> = Path<T, 1>;

export function objectMap<
  const TNewKey,
  const TNewValue,
  const T extends SearchableObject = SearchableObject,
  TPath extends ObjectKey<T> = ObjectKey<T>,
  TKey extends Extract<TPath, keyof T> = Extract<TPath, keyof T>,
  V extends PathValue<T, TPath> = PathValue<T, TPath>
>(
  obj: T,
  fn: (options: {
    key: TKey;
    value: V;
    get: typeof getByPath;
    index: number;
  }) => [TNewKey, TNewValue] | undefined
): Record<Extract<TNewKey, string>, TNewValue> {
  return Object.fromEntries(
    Object.entries(obj)
      .map(([k, v], index) => fn({ key: k as TKey, value: v as V, index, get: getByPath }))
      .filter(notEmpty)
  );
}

export function transformKeys<T extends SearchableObject, TNewKey extends string>(
  obj: T,
  transformKey: (params: { key: keyof T }) => TNewKey
) {
  return objectMap(obj, ({ key, value }) => {
    return [transformKey({ key }), value];
  });
}
