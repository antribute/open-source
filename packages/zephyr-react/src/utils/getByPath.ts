import type { Path, PathValue, SearchableObject } from '@clickbar/dot-diver';
import { getByPath as _getByPath } from '@clickbar/dot-diver';

export function getByPath<
  T extends SearchableObject,
  P extends Path<T, TMaxDepth> & string,
  TMaxDepth extends number = 2
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(object: T, path: P, _maxDepth?: TMaxDepth) {
  return _getByPath(object, path) as PathValue<T, P, TMaxDepth>;
}
