import type { SearchableObject, Path, PathValue } from '@clickbar/dot-diver';
import { notEmpty } from './generateHexAlphaColorGroup';

type ObjectKey<T extends SearchableObject> = Path<T, 1>;

export function objectMap<
  const TNewKey,
  const TNewValue,
  const T extends SearchableObject = SearchableObject,
  K extends ObjectKey<T> = ObjectKey<T>,
  V extends PathValue<T, K> = PathValue<T, K>
>(
  obj: T,
  fn: (options: { key: K; value: V }) => [TNewKey, TNewValue] | undefined
): Record<Extract<TNewKey, string>, TNewValue> {
  return Object.fromEntries(
    Object.entries(obj)
      .map(([k, v]) => fn({ key: k as K, value: v as V }))
      .filter(notEmpty)
  );
}
