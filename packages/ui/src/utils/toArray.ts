import type { L } from 'ts-toolbelt';
import { notEmpty } from 'utils/notEmpty';

type ToArray<TValue> = TValue extends unknown[] ? TValue : TValue[];

type NotEmpty<T extends unknown[], TNotEmpty extends boolean | undefined> = Exclude<
  TNotEmpty extends true ? L.NonNullable<T> : T,
  never[]
>;

export function toArray<
  TValue,
  TNotEmpty extends boolean | undefined = undefined,
  TReturn extends ToArray<TValue> = ToArray<TValue>,
  TRet extends NotEmpty<TReturn, TNotEmpty> = NotEmpty<TReturn, TNotEmpty>
>(
  v: TValue,
  options?: {
    notEmpty?: TNotEmpty;
  }
): TRet {
  const val = Array.isArray(v) ? v : [v];

  if (options?.notEmpty) return val.filter(notEmpty) as TRet;

  return val as TRet;
}
