import { notEmpty } from '../../colors/helpers/generateHexAlphaColorGroup';

export function clsx(...args: (string | undefined | false)[]) {
  return args.filter(notEmpty).join(' ');
}

export function prefix<TPrefix extends string, TKey extends string | undefined = undefined>(
  prefix: TPrefix,
  k?: TKey
) {
  return (k ? `${prefix}-${k}` : `${prefix}-`) as TKey extends undefined
    ? `${TPrefix}-`
    : `${TPrefix}-${TKey}`;
}
