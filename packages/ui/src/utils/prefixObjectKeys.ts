import { changeCase } from 'utils/changeCase';
import { objectMap } from 'utils/objectMap';

export function prefix<T extends Record<string, unknown>, TPrefix extends string>(
  obj: T,
  prefix: TPrefix
) {
  return objectMap(obj, ({ key, value }) => {
    return [`${prefix}${changeCase(key, 'capitalize')}`, value];
  });
}
